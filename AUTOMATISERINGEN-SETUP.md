# Automatiseringen — launch-checklist

Twee automatiseringen rond de scan-funnel. De code staat klaar; dit zijn de
handmatige stappen die John nog moet zetten voordat ze live werken.

## 1. Telegram-ping bij nieuwe scan-lead (code = klaar)

Bij een afgeronde quickscan en bij een afgeronde uitgebreide scan stuurt de site
een Telegram-bericht naar John (naast de mail). De uitgebreide-scan-ping bevat
het bouw/training/zelf-advies.

Code: `lib/scan/notifyTelegram.ts`, ingehaakt in:
- `app/api/scan/[jobId]/compleet/route.ts` (quickscan)
- `app/api/scan/[jobId]/diepte/afronden/route.ts` (uitgebreide scan, na diagnose)

**Nog te doen — twee env-vars in Vercel (Production), hergebruikt bot @Futurecntnt_bot:**
- `TELEGRAM_BOT_TOKEN` — staat in `~/.claude-mem/settings.json`
- `TELEGRAM_CHAT_ID` — staat daar ook

Zonder deze twee slaat de ping zichzelf fail-soft over (geen crash).

## 2. Meeting-mails via Cal.com Workflows (handmatig in Cal.com)

Twee mails rond de geboekte kennismaking: 24u vooraf een voorbereidingsmail,
1u vooraf een korte reminder. Cal.com kent de boekingstijd en blijft kloppen bij
verzetten/annuleren, dus dit hoort in Cal.com, niet in code.

### Stappen (per workflow)
1. cal.com → linksonder **Workflows** → **+ Nieuwe / Create**.
2. Geef 'm een naam (bv. "Voorbereiding 24u vooraf").
3. Koppel aan event type: **30 min kennismaking** (`futurecontent/30min`).
4. Trigger: **Before event starts** → tijd instellen (24 uur, resp. 1 uur).
5. Actie: **Send email** → **to Attendees**.
6. Template op **Custom** zetten. Afzendernaam: **John / Future Content**.
7. Onderwerp + tekst plakken (zie hieronder). Variabelen via de knop
   **Add variable** kiezen, zodat de exacte token wordt ingevoegd
   (`{ATTENDEE}` = naam van degene die boekt; mag ook weg → "Hoi,").
8. **Save** en de workflow **activeren** (toggle aan).

Daarna nog één keer hetzelfde voor de 1u-reminder.

### Mail 24u vooraf
Onderwerp: `Tot morgen, even dit vooraf`

```
Hoi {ATTENDEE},

Morgen spreken we elkaar. Om er een goed gesprek van te maken helpt het als je
vooraf heel kort over drie dingen nadenkt:

- Waar lekt in jullie week de meeste tijd weg?
- Wat zou je het liefst makkelijker of vanzelf willen hebben?
- Wie beslist er bij jullie over zoiets mee?

Je hoeft niks uit te zoeken of voor te bereiden, een paar gedachten zijn genoeg.
De rest doen we samen.

Tot morgen,
John

Future Content · futurecontent.nl
```

### Mail 1u vooraf
Onderwerp: `Over een uur spreken we elkaar`

```
Hoi {ATTENDEE},

Kleine reminder: over een uur staan we ingepland, ik kijk ernaar uit.

Lukt het toch niet? Laat het me even weten, dan plannen we het zo om.

Tot zo,
John
```

> Zie je geen Workflows in Cal.com, dan is het plan-gated. In dat geval bouwen
> we het alsnog in n8n (Cal.com-trigger + verzet/annuleer-afvang).
