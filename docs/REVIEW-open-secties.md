# Open secties — visual & video inventaris

> Doel: overzicht van waar op de site nog een foto, video, screenshot of screen-recording moet komen. Per slot staat: wat er nu staat, wat er moet komen, type en prioriteit. John vult de assets later aan, dan zetten we ze erin.

Laatst bijgewerkt: 2026-05-27

Legenda type: 📷 foto · 🎬 video · 🖥️ screen-recording (scherm) · 🔲 screenshot · ⚙️ technische actie (geen visual)
Prioriteit: 🔴 hoog (raakt geloofwaardigheid kern) · 🟡 midden · ⚪ optioneel/nice-to-have

---

## Homepage (`app/page.tsx`)

| Sectie | Nu | Open / nodig | Type | Prio |
|---|---|---|---|---|
| Hero | Portretfoto John (PhotoSessions) ✓ | Eventueel subtiele motion of korte loop i.p.v. stilstaand beeld | 🎬 | ⚪ |
| Diensten (6 kaarten) | Lucide-iconen, geen beeld (bewust) | — | — | — |
| **Bewijs / "Wat ik gebouwd heb"** | **6 projecten, 100% tekst** | **Per project een beeld dat het bewijst: restaurant-chatbot (demo), Koningsdag-ticketsysteem, AI-Quickscan (live op site), eigen bedrijfssysteem, voice-orchestrator, agency-platform.** Dit is het hart: "ik bouw het" moet je kunnen zíen. | 🖥️ / 🔲 | 🔴 |
| Trainingen | Tekst + checklist | Foto van John die op locatie training geeft aan een team | 📷 | 🟡 |
| Videografie-teaser | Verdonkerde stilstaande foto als achtergrond | Echte showreel (autoplay, muted, loop) maakt dit veel sterker | 🎬 | 🟡 |
| Reviews | Echte Google-reviews ✓ | — | — | — |
| Over John (blok) | Portretfoto ✓ | — | — | — |
| Final CTA | Tekst ✓ | — | — | — |

## Over (`app/over/page.tsx`)

| Sectie | Nu | Open / nodig | Type | Prio |
|---|---|---|---|---|
| Hero | Portretfoto ✓ | — | — | — |
| Verhaal "Van video naar systemen" | Alleen tekst | 1-2 sfeerfoto's: John aan tafel bij klant, achter de laptop aan het bouwen, of een persoonlijk element (de camper) | 📷 | 🟡 |
| Principes | Icoon-kaarten ✓ | — | — | — |

## Boek (`app/boek/page.tsx`)

| Item | Nu | Open / nodig | Type | Prio |
|---|---|---|---|---|
| Cal.com boeking | **Niet gekoppeld** (`BOOKING.calUser` is leeg → placeholder) | Cal.com-account koppelen aan Google Agenda, dan `calUser` invullen in `lib/constants.ts`. De hoofd-CTA "Plan een gesprek" boekt nu nog niet echt. | ⚙️ | 🔴 |

## Videografie-pagina's (videografie, makelaars, social-media, trouwen, portfolio)

| Item | Nu | Open / nodig | Type | Prio |
|---|---|---|---|---|
| Vastgoedvideo's | 9 echte objectvideo's ✓ | — | — | — |
| Foto's | PhotoSessions-set ✓ | — | — | — |
| Embeds (trouwen / social-media / portfolio iframes) | YouTube-embeds aanwezig | Controleren of elke embed naar de juiste, gewenste video wijst | ⚙️ | 🟡 |
| Showreel | Ontbreekt als losse asset | 1 sterke showreel (vastgoed + bedrijf) inzetbaar op homepage én videografie | 🎬 | 🟡 |

---

## Beschikbare assets (al aanwezig)

- `/public/photos/` — 14 PhotoSessions-foto's van John
- `/public/videos/` — 9 vastgoedvideo's (Pit Makelaars)
- `/public/blog/` — 10 blog-afbeeldingen

## Wat nog gemaakt/aangeleverd moet worden (samenvatting)

1. 🔴 **Bewijs-beelden**: screenshots of korte schermopnames van de 6 gebouwde projecten
2. 🔴 **Cal.com koppelen** zodat boeken echt werkt
3. 🟡 **Trainingsfoto** (John lesgevend op locatie)
4. 🟡 **Showreel** (homepage + videografie)
5. 🟡 **Sfeerfoto's** voor Over-pagina (klant aan tafel / aan het bouwen / camper)
