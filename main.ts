// make.fun bounty entry: "Sum up 21 November's world news in one image".
// A working news-image-daily entry (Node 22, standard library only): its image is the entry.png beside this file,
// and the program copies it to /output/entry.png. The gate takes a whole PNG or JPEG of at most 1 MiB and 1024
// by 1024 pixels, and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// This entry is a 1024x1024 front page ("THE WORLD TODAY — SATURDAY 21 NOVEMBER 2026") that sums up the day's
// world news: Riyadh missile interceptions (lead), Iran tankers vs US blockade, Kyiv strikes, European
// cost-of-living protests, UN killer-weapons treaty talks, Bolsonaro hospitalization, Peru earthquake, FBI hack,
// and India Meta office protest. Built with render/page.html + render/render.mjs (Playwright).

import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

copyFileSync(new URL('./entry.png', import.meta.url), join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'));
