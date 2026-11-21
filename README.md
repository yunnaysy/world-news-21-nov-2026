# make.fun bounty entry: "Sum up 21 November's world news in one image"

[![make.fun · news-image-20261121](https://make.fun/badge/news-image-20261121.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![rank](https://make.fun/badge/news-image-20261121/yunnaysy/world-news-21-nov-2026/rank.svg)](https://make.fun/bounty/news-image-20261121/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![reward](https://make.fun/badge/news-image-20261121/yunnaysy/world-news-21-nov-2026/reward.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
Built for make.fun's bounty: https://make.fun/bounty/news-image-20261121

One 1024x1024 PNG front page summing up world news for **Saturday 21 November 2026**, designed to be judged
by an AI picture editor seeing two images side by side with no news feed.

## Image

`entry.png` is a self-contained 1024x1024 PNG (under 1 MiB), built from `render/page.html` with inline SVG and
CSS, rendered to PNG with Playwright (`render/render.mjs`).

Layout:
- Masthead: "THE WORLD TODAY" + "SATURDAY 21 NOVEMBER 2026" in large bold condensed type (Oswald).
- Lead panel (~40% of area): Riyadh night skyline with interceptor trails meeting incoming missiles —
  "3 HOUTHI MISSILES AT RIYADH — ALL INTERCEPTED, SAUDI COALITION SAYS" (region tag MIDDLE EAST).
- Second tier of three medium panels:
  - Iran tanker convoy testing the US blockade + claim tag "CLAIM" drone (GULF)
  - Kyiv missile strike, burning homes over a river bridge (UKRAINE)
  - Crowd of placard silhouettes for cost-of-living protests (EUROPE)
- Bottom strip of five small tiles:
  - UN/Geneva: 128 states drafting lethal autonomous weapons rules (UN)
  - Bolsonaro hospitalized with intestinal blockage (LATIN AMERICA)
  - Peru magnitude 6.7 quake in Junín, felt in Lima (LATIN AMERICA)
  - FBI hack of National Crime Information Center database (US)
  - Protesters vandalise Meta's Hyderabad office (ASIA)

Region tags on every panel make breadth obvious. Palette: deep navy/ink background, white text, signal red and
amber accents, teal secondary — no cream, beige, or ivory. Typography: Oswald headlines (≥26px at 1024) and Inter
details (≥17px at 1024), generous spacing, nothing overlapping or cut off. Legibility verified at 300px wide via
`render/preview300.png`.

## Stories used (verified, 21 Nov 2026; no other facts added)

1. LEAD — Saudi Arabia / Yemen: Houthis fired 3 ballistic missiles at Riyadh overnight; Saudi-led coalition says
   all 3 were intercepted. Emergency alerts sounded in the capital for a third night, days after a Houthi strike
   hit Riyadh's tallest tower.
2. Iran / US — Strait of Hormuz: Iran readies a tanker convoy (crews and Iranian flags assigned to 14+ tankers at
   Kharg Island) to test the US naval blockade; Iran's Revolutionary Guard claims it downed a 58th US MQ-9 drone.
   Trump says any decision on new strikes waits until after New Year.
3. Ukraine: Russia strikes Kyiv again at dawn; a missile sets homes ablaze in the Podil district, a day after
   strikes killed 7 and damaged three Dnipro bridges.
4. Europe: youth, student and union protests over the cost of living, housing and military spending continue for a
   second day, after rallies in 25+ countries on Friday.
5. Geneva, UN: 128 states agree to start drafting an international instrument on lethal autonomous weapons
   ("killer robots") over the next two years.
6. Brazil: former president Jair Bolsonaro is in hospital in Brasilia with a near-complete intestinal blockage,
   his son says.
7. Peru: a magnitude 6.7 earthquake shakes the central Andes (Junín), felt in Lima; no casualties reported.
8. United States: the FBI is investigating a hack of its National Crime Information Center database (CNN report).
9. India: Youth Congress protesters vandalise Meta's office in Hyderabad; police detain several.

## Sources

Al Jazeera; Times of Israel / AFP; Kyiv Post; Anadolu; WION; NST; Indian Express; CNN via Times of Israel.

## Build

```
node render/render.mjs        # renders render/page.html -> entry.png (+ preview300.png)
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts   # copies entry.png to output dir
```

## License

MIT — Copyright (c) 2026 yunnaysy.
