import { chromium } from '/tmp/pw-tools/node_modules/playwright-core/index.mjs';
import { mkdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const pagePath = path.join(__dirname, 'page.html');
const entryPath = path.join(root, 'entry.png');
const previewPath = path.join(__dirname, 'preview300.png');

const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
try {
  const context = await browser.newContext({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(`file://${pagePath}`, { waitUntil: 'load' });
  await page.waitForTimeout(500);

  // Layout checks
  const checks = await page.evaluate(() => {
    const problems = [];
    const sel = ['.masthead', '.lead', '.card', '.tile', '.brand', '.date', '.lead-headline h2', '.lead-headline p', '.card h3', '.card p', '.tile h4', '.tag'];
    for (const s of sel) {
      for (const el of document.querySelectorAll(s)) {
        const r = el.getBoundingClientRect();
        if (r.right > 1025 || r.bottom > 1025 || r.left < -1 || r.top < -1) {
          problems.push({ s, text: el.textContent.slice(0,40), r: {l:r.left,t:r.top,r:r.right,b:r.bottom} });
        }
      }
    }
    // font sizes
    const fontIssues = [];
    for (const el of document.querySelectorAll('.card h3, .lead-headline h2')) {
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs < 26) fontIssues.push({ t: el.textContent.slice(0,30), fs });
    }
    for (const el of document.querySelectorAll('.card p, .lead-headline p')) {
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs < 17) fontIssues.push({ t: el.textContent.slice(0,30), fs });
    }
    // overlap between major panels
    const majors = [...document.querySelectorAll('.lead, .card, .tile')].map(el => ({ t: el.textContent.slice(0,20), r: el.getBoundingClientRect() }));
    for (let i=0;i<majors.length;i++) for (let j=i+1;j<majors.length;j++) {
      const a=majors[i].r, b=majors[j].r;
      const ox = Math.max(0, Math.min(a.right,b.right)-Math.max(a.left,b.left));
      const oy = Math.max(0, Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
      if (ox*oy > 1) problems.push({ overlap: [majors[i].t, majors[j].t], area: ox*oy });
    }
    return { problems, fontIssues };
  });
  console.log('CHECKS', JSON.stringify(checks));

  await page.screenshot({ path: entryPath, type: 'png' });
  await context.close();

  // preview 300px wide via python resize
  try {
    execFileSync('python3', ['-c', `
from PIL import Image
img = Image.open('${entryPath}')
img.resize((300,300), Image.LANCZOS).save('${previewPath}', 'PNG', optimize=True)
print('ok')
`], { stdio: 'inherit' });
  } catch (e) {
    // fallback: render at 300px viewport with transform
    const ctx2 = await browser.newContext({ viewport: { width: 300, height: 300 }, deviceScaleFactor: 1 });
    const p2 = await ctx2.newPage();
    await p2.goto(`file://${pagePath}`, { waitUntil: 'load' });
    await p2.waitForTimeout(300);
    await p2.evaluate(() => {
      document.documentElement.style.transform = 'scale(0.29296875)';
      document.documentElement.style.transformOrigin = 'top left';
      document.documentElement.style.width = '1024px';
      document.documentElement.style.height = '1024px';
      document.body.style.width = '1024px';
      document.body.style.height = '1024px';
      document.body.style.overflow = 'hidden';
    });
    await p2.waitForTimeout(200);
    await p2.screenshot({ path: previewPath, type: 'png' });
    await ctx2.close();
  }

  const st = statSync(entryPath);
  console.log('SIZE', st.size);
} finally {
  await browser.close();
}
