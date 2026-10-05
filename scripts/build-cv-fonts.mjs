// Cuts the CV's static fonts out of the site's variable fonts and writes them
// to public/fonts/cv/. Run with `pnpm cv:fonts` after changing a font file or
// the list in scripts/lib/cv-fonts.mjs, then regenerate the PDFs.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import subsetFont from 'subset-font'
import { CV_FONTS, LATIN_RANGES, charset } from './lib/cv-fonts.mjs'

const text = charset(LATIN_RANGES)
await mkdir('public/fonts/cv', { recursive: true })

for (const font of CV_FONTS) {
  const source = await readFile(`public/fonts/${font.source}.woff2`)
  const instance = await subsetFont(source, text, {
    targetFormat: 'woff2',
    variationAxes: font.axes,
  })
  const out = `public/fonts/cv/${font.out}.woff2`
  await writeFile(out, instance)
  console.log(`✓ ${out} (${(instance.length / 1024).toFixed(1)} KB)`)
}
