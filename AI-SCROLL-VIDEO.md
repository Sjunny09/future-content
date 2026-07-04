# AI scroll-video — jouw eigen video erin zetten

De AI-pagina (`/ai`) draait nu op een **placeholder** (`/public/logo/Logo AI.mp4`).
Zo vervang je die door je eigen video.

## In 2 stappen

1. Zet je video hier neer:
   `public/videos/ai-hero.mp4`

2. Wijs ScrollStory ernaar in [app/ai/page.tsx](app/ai/page.tsx), één regel:
   ```tsx
   <ScrollStory beats={AI_BEATS} src="/videos/ai-hero.mp4" />
   ```
   (nu staat er nog geen `src`, dus pakt hij de placeholder)

Klaar. De rest werkt automatisch.

## Hoe de scroll werkt

De scrollpositie stuurt de video: naar beneden scrollen = de video vooruit spoelen.
Er faden drie teksten overheen, gekoppeld aan de scrollpositie:

- **begin (0%)** → "Dit ben ik." (jij komt in beeld)
- **midden (50%)** → "Eerst een idee."
- **eind (100%)** → "En ik bouw het."

Film je video dus zó dat die drie momenten ongeveer op begin / midden / eind vallen.
De teksten pas je aan in de `AI_BEATS`-lijst bovenin [app/ai/page.tsx](app/ai/page.tsx).

## Video-tip voor soepel spoelen

Scroll-spoelen is zwaarder dan gewoon afspelen. Houd 'm **kort (15-30 sec)** en
exporteer web-geoptimaliseerd. Met ffmpeg (dichte keyframes + faststart):

```bash
ffmpeg -i bron.mov -an -vf "scale=-2:1080" \
  -c:v libx264 -preset slow -crf 22 -g 12 -keyint_min 12 \
  -movflags +faststart public/videos/ai-hero.mp4
```

`-g 12` = elke ~halve seconde een keyframe, zodat het spoelen scherp blijft.
Geen audio nodig (`-an`): de video staat toch muted.
