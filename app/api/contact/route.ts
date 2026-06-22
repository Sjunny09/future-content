import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Zod schema validates and types the request body in one step.
// If a required field is missing or wrong type, schema.parse() throws a
// ZodError which we catch below and return as a 400 with field-level errors.
const schema = z.object({
  naam: z.string().min(2, "Naam is verplicht"),
  bedrijf: z.string().optional(),
  email: z.string().email("Ongeldig e-mailadres"),
  telefoon: z.string().optional(),
  type: z.string().min(1, "Selecteer een type shoot"),
  locatie: z.string().optional(),
  datum: z.string().optional(),
  bericht: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body); // throws ZodError on invalid input

    // If RESEND_API_KEY is missing (local dev), log and pretend success.
    // In production, add RESEND_API_KEY to Vercel environment variables.
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? "info@future-content.nl";

    if (!apiKey) {
      // Dev mode: log and return success
      console.log("Contact form submission:", data);
      return NextResponse.json({ ok: true, mode: "dev" });
    }

    const html = `
      <h2>Nieuw contactformulier | Future Content</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Naam</td><td style="padding:8px;border:1px solid #eee">${data.naam}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Bedrijf</td><td style="padding:8px;border:1px solid #eee">${data.bedrijf ?? "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">E-mail</td><td style="padding:8px;border:1px solid #eee"><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Telefoon</td><td style="padding:8px;border:1px solid #eee">${data.telefoon ?? "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Type shoot</td><td style="padding:8px;border:1px solid #eee">${data.type}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Locatie</td><td style="padding:8px;border:1px solid #eee">${data.locatie ?? "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Datum voorkeur</td><td style="padding:8px;border:1px solid #eee">${data.datum ?? "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Bericht</td><td style="padding:8px;border:1px solid #eee">${data.bericht ?? "—"}</td></tr>
      </table>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Future Content <noreply@future-content.nl>",
        to: [toEmail],
        reply_to: data.email,
        subject: `Nieuw contactverzoek van ${data.naam}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      console.error("Resend error:", await resendRes.text());
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: err.issues }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
