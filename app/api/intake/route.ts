import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/scan/db";
import { ipLimiet, hashIp } from "@/lib/scan/ratelimit";

// Het antwoordrecord van de trainingsvragenlijst (02-modules/future-content-training/intake).
// De pagina bepaalt de vorm, dus we eisen alleen wat we als kolom nodig hebben
// en laten de rest ongemoeid doorlopen naar `record`. Een nieuwe vraag mag deze
// route nooit laten weigeren.
const schema = z
  .object({
    naam: z.string().min(1).max(200),
    email: z.string().email().max(200),
    punten: z.number().int().min(0).max(100),
    band: z.string().min(1).max(60),
    spoor: z.string().min(1).max(60),
    weging_versie: z.number().int(),
    antwoorden: z.record(z.string(), z.unknown()),
  })
  .passthrough();

export async function POST(req: NextRequest) {
  // Eigen prefix, anders deelt de vragenlijst zijn teller met de scan en het
  // contactformulier. Twintig per uur per IP: ruim voor één invuller, en ook
  // voor een kantoor waar iedereen achter dezelfde router zit.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "0.0.0.0";
  const limiet = await ipLimiet.limit(`intake:${hashIp(ip)}`);
  if (!limiet.success) {
    return NextResponse.json(
      { ok: false, fout: "Te veel inzendingen vanaf dit adres. Probeer het over een uur nog eens." },
      { status: 429 },
    );
  }

  try {
    const data = schema.parse(await req.json());
    const naamblok = (data.antwoorden as { naam?: { bedrijf?: string } }).naam;

    await db.intakeAntwoord.create({
      data: {
        naam: data.naam,
        email: data.email,
        bedrijf: (naamblok?.bedrijf || "").trim(),
        punten: data.punten,
        band: data.band,
        spoor: data.spoor,
        wegingVersie: data.weging_versie,
        record: data as object,
        ipHash: hashIp(ip),
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: err.issues }, { status: 400 });
    }
    console.error("[intake] opslaan mislukt:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// De antwoorden weer ophalen, want anders staan ze opgesloten in de database
// terwijl de presentatie ze uit losse JSON-bestanden leest. Zelfde slot als
// /os: de cookie die /api/os/login zet, of het token als header zodat een
// script erbij kan.
export async function GET(req: NextRequest) {
  const token = process.env.ADMIN_TOKEN;
  const meegegeven =
    req.cookies.get("fc_os")?.value ||
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token || meegegeven !== token) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const bedrijf = req.nextUrl.searchParams.get("bedrijf");
  const rijen = await db.intakeAntwoord.findMany({
    where: bedrijf ? { bedrijf: { contains: bedrijf, mode: "insensitive" } } : undefined,
    orderBy: { createdAt: "asc" },
    select: { id: true, bedrijf: true, createdAt: true, record: true },
  });

  return NextResponse.json({ ok: true, aantal: rijen.length, rijen });
}
