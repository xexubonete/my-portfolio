// Turns the memoji portraits into the book's engravings: one ink, no greys,
// tone carried by the thickness of hatched lines, the way a burin does it.
//
//   node scripts/engrave.mjs
//
// Run by hand when a source portrait changes; the plates it writes under
// public/plates/ are committed, and so is the favicon made from the first.
// Each plate is ink on a transparent ground and is used as a CSS mask, so the
// page prints it in whatever ink the theme has.
import { mkdir } from 'node:fs/promises'
import sharp from 'sharp'

// Rendered at twice the output size and scaled down, which is what smooths
// the edges of the lines.
const SUPERSAMPLE = 2

const PLATES = [
  {
    // The frontispiece: the author in an oval, on a ruled ground.
    source: 'public/me.png',
    out: 'public/plates/author.png',
    width: 800,
    height: 1000,
    figure: { scale: 1.02, top: 0.2 },
    oval: { rx: 0.43, ry: 0.455 },
    period: 7,
    gamma: 0.8,
    edge: 0.09,
  },
  {
    // The tailpiece: no frame, the figure alone on the bare page.
    source: 'public/me_chillin.png',
    out: 'public/plates/tailpiece.png',
    width: 640,
    height: 640,
    figure: { scale: 1, top: 0 },
    oval: null,
    period: 8,
    gamma: 1.15,
    edge: 0.1,
  },
]

const rad = (deg) => (deg * Math.PI) / 180

/** Distance, in periods, from the nearest line of a hatch: 0 on it, 1 between. */
function hatch(x, y, angle, period, wobble = 0) {
  const a = rad(angle)
  const along = x * Math.cos(a) + y * Math.sin(a)
  const across = -x * Math.sin(a) + y * Math.cos(a)
  const v = (across + wobble * Math.sin(along / (period * 4.2))) / period
  return Math.abs(2 * (v - Math.floor(v)) - 1)
}

async function engrave(plate) {
  const W = plate.width * SUPERSAMPLE
  const H = plate.height * SUPERSAMPLE
  const period = plate.period * SUPERSAMPLE

  // The portrait, scaled onto the plate and slightly softened so the lines
  // follow the volumes and not the pixels of a 420px source.
  const size = Math.round(W * plate.figure.scale)
  const left = Math.round((W - size) / 2)
  const top = Math.round(H * plate.figure.top)
  const figure = await sharp(plate.source)
    .resize(size, size, { kernel: 'lanczos3' })
    .blur(1.2 * SUPERSAMPLE)
    .ensureAlpha()
    .raw()
    .toBuffer()

  const light = new Float32Array(W * H).fill(1) // luminance, paper = 1
  const tone = new Float32Array(W * H) // 0 = bare paper, 1 = solid ink
  const body = new Uint8Array(W * H) // 1 where the figure covers the ground
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const fx = x - left
      const fy = y - top
      if (fx < 0 || fy < 0 || fx >= size || fy >= size) continue
      const i = (fy * size + fx) * 4
      const alpha = figure[i + 3] / 255
      if (alpha < 0.5) continue
      const luminance =
        (0.2126 * figure[i] + 0.7152 * figure[i + 1] + 0.0722 * figure[i + 2]) /
        255
      // A gamma under 1 keeps the skin almost bare and still darkens the hair.
      light[y * W + x] = luminance
      tone[y * W + x] = Math.pow(1 - luminance, plate.gamma)
      body[y * W + x] = 1
    }
  }

  const ink = Buffer.alloc(W * H)
  const cx = W / 2
  const cy = H / 2
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const p = y * W + x
      let on = false

      // Position against the oval: 1 is its edge.
      let r = 0
      if (plate.oval) {
        const dx = (x - cx) / (W * plate.oval.rx)
        const dy = (y - cy) / (H * plate.oval.ry)
        r = Math.sqrt(dx * dx + dy * dy)
      }

      if (body[p] && r <= 1) {
        const d = tone[p]
        // First cut: one diagonal, thickening with the tone.
        on = hatch(x, y, 38, period, period * 0.35) < d * 1.08 - 0.09
        // Second cut, across the first, only where the shadow asks for it.
        if (!on && d > 0.42) {
          on = hatch(x, y, -52, period) < (d - 0.42) * 1.25
        }
        // The contour: a plain line where the figure meets the ground, and
        // wherever the light breaks sharply inside it (a jaw, a lapel, a lid).
        if (!on) {
          const reach = Math.round(1.1 * SUPERSAMPLE)
          const step = 2 * SUPERSAMPLE
          on =
            !body[p - reach] ||
            !body[p + reach] ||
            !body[p - reach * W] ||
            !body[p + reach * W] ||
            Math.hypot(
              light[p + step] - light[p - step],
              light[p + step * W] - light[p - step * W],
            ) > plate.edge
        }
      } else if (plate.oval) {
        if (r <= 1) {
          // The ground inside the oval: level ruling, darker towards the rim.
          on = hatch(x, y, 0, period * 1.15) < 0.16 + 0.34 * Math.pow(r, 2.4)
        } else {
          // The frame: one heavy rule and one hairline around it.
          on = r <= 1.022 || (r >= 1.04 && r <= 1.046)
        }
      }
      ink[p] = on ? 255 : 0
    }
  }

  // The ink layer becomes the alpha of a black image: a mask the CSS can tint.
  const alpha = await sharp(ink, { raw: { width: W, height: H, channels: 1 } })
    .resize(plate.width, plate.height, { kernel: 'lanczos3' })
    .extractChannel(0)
    .raw()
    .toBuffer()
  const rgba = Buffer.alloc(plate.width * plate.height * 4)
  // Four levels of ink are enough to keep the edges smooth, and they let the
  // PNG be a tiny palette file. The ground is forced to exactly nothing so no
  // trace of the plate's rectangle shows on the page.
  const LEVELS = [0, 104, 180, 255]
  for (let i = 0; i < alpha.length; i++) {
    const value = alpha[i]
    rgba[i * 4 + 3] = LEVELS.reduce((best, level) =>
      Math.abs(level - value) < Math.abs(best - value) ? level : best,
    )
  }

  await mkdir('public/plates', { recursive: true })
  const info = await sharp(rgba, {
    raw: { width: plate.width, height: plate.height, channels: 4 },
  })
    .png({ palette: true, colours: 4, dither: 0, effort: 10 })
    .toFile(plate.out)
  console.log(`✓ ${plate.out} (${(info.size / 1024).toFixed(1)} kB)`)
}

for (const plate of PLATES) await engrave(plate)

// The favicon is the frontispiece again, printed small on the book's paper.
const icon = await sharp('public/plates/author.png')
  .resize(160, 160, { fit: 'contain', background: '#f5efe200' })
  .flatten({ background: '#f5efe2' })
  .png({ palette: true, colours: 16, effort: 10 })
  .toFile('public/favicon.png')
console.log(`✓ public/favicon.png (${(icon.size / 1024).toFixed(1)} kB)`)
