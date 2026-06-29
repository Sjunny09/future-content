import { Resend } from "resend"

const VAN = "Future Content <scan@futurecontent.nl>"

let clientSingleton: Resend | null = null
function client(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  if (!clientSingleton) clientSingleton = new Resend(key)
  return clientSingleton
}

// "Morgen stuur ik 'm" — 20u na afloop van de scan, als John nog geen Loom
// heeft verstuurd. Kort, eerlijk, in John's stem. Geen excuus, geen uitleg.
export async function stuurLoomHerinnering(ctx: {
  email: string
  naam: string | null
}): Promise<boolean> {
  const resend = client()
  if (!resend) {
    console.info("[mail:herinnering] RESEND_API_KEY ontbreekt — overgeslagen")
    return false
  }

  try {
    await resend.emails.send({
      from: VAN,
      to: ctx.email,
      subject: "Korte heads-up over je video",
      text: bouwHerinneringsmail(ctx.naam),
    })
    return true
  } catch (err) {
    console.error("[mail:herinnering] faalde", { email: ctx.email, err })
    return false
  }
}

function bouwHerinneringsmail(naam: string | null): string {
  const voornaam = naam?.split(" ")[0]
  const aanhef = voornaam ? `Hoi ${voornaam},` : `Hoi,`
  return [
    aanhef,
    ``,
    `Even een korte heads-up: ik heb je video nog niet af, maar ik stuur 'm morgen.`,
    ``,
    `Geen stress van mijn kant, geen stilte van jouw kant. Je hoort mij morgen.`,
    ``,
    `John`,
    ``,
    `—`,
    `Future Content · futurecontent.nl`,
  ].join("\n")
}
