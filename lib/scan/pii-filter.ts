// PII-filter: draait vóór elke Claude-call. Vervangt persoonsgegevens door
// [REDACTED_*] zodat Claude ze nooit ziet. Zie 03_ceo_synthese.md §4.1.

const EMAIL = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi

// NL telefoonnummers: +31..., 0031..., 06-..., 020 ..., met of zonder streepje/spatie
const TELEFOON = /(?:(?:\+31|0031)[\s-]?|0)[\s-]?(?:\d[\s-]?){8,9}\d/g

// NL postcode: 1234 AB of 1234AB
const POSTCODE = /\b\d{4}\s?[A-Z]{2}\b/gi

// BSN: 9 cijfers (gevoelig — kan ook een willekeurig nummer zijn, dus conservatief:
// alleen als er "BSN" vlakbij staat of als het een losstaand 9-cijferig nummer is)
const BSN = /\b(?:BSN[:\s]*)?\d{9}\b/gi

// IBAN NL: NL00 XXXX 0000 0000 00
const IBAN = /\bNL\d{2}\s?[A-Z]{4}\s?\d{4}\s?\d{4}\s?\d{2}\b/gi

export function stripPII(tekst: string): string {
  return tekst
    .replace(EMAIL, "[REDACTED_EMAIL]")
    .replace(IBAN, "[REDACTED_IBAN]")
    .replace(TELEFOON, "[REDACTED_TEL]")
    .replace(POSTCODE, "[REDACTED_POSTCODE]")
    .replace(BSN, "[REDACTED_BSN]")
}
