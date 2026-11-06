// 開発中の確認用：指定した状態を 1440/390 で撮る（本番の撮影は brief/scripts/capture.mjs）
import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)('playwright')
const [, , outDir, ...pairs] = process.argv
const browser = await chromium.launch()
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, locale: 'ja-JP' })
  page.on('console', (m) => m.type() === 'error' && console.log('console', m.text()))
  page.on('pageerror', (e) => console.log('pageerror', e.message))
  for (const p of pairs) {
    const [id, path] = p.split('=', 2).length === 2 ? [p.slice(0, p.indexOf('=')), p.slice(p.indexOf('=') + 1)] : [p, p]
    await page.goto(`http://localhost:5173${path}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(400)
    await page.screenshot({ path: `${outDir}/${id}-${width}.png`, fullPage: true })
  }
  await page.close()
}
await browser.close()
