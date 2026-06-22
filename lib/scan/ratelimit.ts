import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { createHash } from "node:crypto"

// Rate-limit-strategie (docs/quickscan/03_ceo_synthese.md §4.2):
//   - 20 scan-starts per IP per uur
//   - 2 scans per URL per 10 minuten (anti-probe)
//
// Als Upstash niet is geconfigureerd (dev zonder .env) gebruiken we een
// in-memory fallback die per process-instance werkt — ruim voldoende voor
// lokale ontwikkeling, maar NOOIT genoeg voor productie.

const heeftUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN

const inProductie = process.env.NODE_ENV === "production"

const redis = heeftUpstash ? Redis.fromEnv() : null

// Dev-bypass: zonder Upstash én buiten productie staan beide limieten open
// zodat John dezelfde site meerdere keren per minuut kan testen. In prod
// (of zodra Upstash is geconfigureerd) gelden de echte limieten.
const devBypass = !heeftUpstash && !inProductie

export const ipLimiet = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "1 h"),
      analytics: true,
      prefix: "scan:ip",
    })
  : devBypass
    ? geenLimiet()
    : maakGeheugenLimiet(20, 60 * 60 * 1000)

export const urlLimiet = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(2, "10 m"),
      analytics: true,
      prefix: "scan:url",
    })
  : devBypass
    ? geenLimiet()
    : maakGeheugenLimiet(2, 10 * 60 * 1000)

function geenLimiet(): GeheugenLimiet {
  return {
    async limit() {
      return { success: true, remaining: 999, reset: Date.now() + 60_000 }
    },
  }
}

// ─────────────────────────────────────────
// Hashing: we slaan nooit rauwe IP's op (AVG, data-minimalisatie).
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "fc-scan-v1"
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32)
}

// ─────────────────────────────────────────
// Geheugen-fallback — zelfde interface als Upstash `Ratelimit`.
interface GeheugenLimiet {
  limit: (key: string) => Promise<{ success: boolean; remaining: number; reset: number }>
}

function maakGeheugenLimiet(maxPerVenster: number, vensterMs: number): GeheugenLimiet {
  const store = new Map<string, number[]>()
  return {
    async limit(key: string) {
      const nu = Date.now()
      const eerder = store.get(key) ?? []
      const binnenVenster = eerder.filter((t) => nu - t < vensterMs)
      if (binnenVenster.length >= maxPerVenster) {
        return {
          success: false,
          remaining: 0,
          reset: binnenVenster[0] + vensterMs,
        }
      }
      binnenVenster.push(nu)
      store.set(key, binnenVenster)
      return {
        success: true,
        remaining: maxPerVenster - binnenVenster.length,
        reset: nu + vensterMs,
      }
    },
  }
}
