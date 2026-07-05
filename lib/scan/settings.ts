import { db } from "@/lib/scan/db"

// Kleine OS-instellingen die John in /os kan omzetten zonder redeploy.
// Nu alleen de mail-schakelaar; makkelijk uit te breiden.

const KEY_MAILS = "mails_naar_leads"

// Standaard AAN. Alleen een expliciete "uit" zet de automatische mails naar
// leads uit. Fail-open: bij een DB-hik gewoon mailen zoals altijd, zodat een
// storing nooit stilletjes alle leads afsnijdt.
export async function mailsNaarLeadsAan(): Promise<boolean> {
  try {
    const row = await db.setting.findUnique({ where: { key: KEY_MAILS } })
    return row?.waarde !== "uit"
  } catch {
    return true
  }
}

export async function zetMailsNaarLeads(aan: boolean): Promise<void> {
  await db.setting.upsert({
    where: { key: KEY_MAILS },
    update: { waarde: aan ? "aan" : "uit" },
    create: { key: KEY_MAILS, waarde: aan ? "aan" : "uit" },
  })
}
