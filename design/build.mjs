// Renders the static mockups from content.mjs.
//
//   node design/build.mjs
//
// Writes home / work / cv / 404 in English and Spanish next to this file. The
// output is plain HTML that loads src/styles/*.css with no build step; this
// script only exists so the two languages are rendered from the very same
// markup and never drift apart. Run it after editing a template or content.

import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CONTENT, PROJECTS, TAPE, groupByCompany } from './content.mjs'

const here = dirname(fileURLToPath(import.meta.url))

/* Helpers ────────────────────────────────────────────────────────────────── */

/** Every link that leaves the page opens in a new tab. */
const EXT = 'target="_blank" rel="noopener noreferrer"'
const arrow = (cls = 'arrow') =>
  `<svg class="${cls}" aria-hidden="true"><use href="#arrow" /></svg>`
const tags = (items) =>
  items.map((i) => `<span class="tag">${i}</span>`).join('')
const years = (roles) => `${roles[roles.length - 1].start} – ${roles[0].end}`

const SYMBOLS = `
    <svg width="0" height="0" style="position: absolute" aria-hidden="true">
      <symbol id="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9" /></symbol>
      <symbol id="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></symbol>
      <symbol id="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></symbol>
      <symbol id="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></symbol>
      <symbol id="pin" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" /></symbol>
      <symbol id="mail" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" /></symbol>
      <symbol id="phone" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1l-2.23 2.2z" /></symbol>
      <symbol id="globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></symbol>
    </svg>`

/* Mockup-only scripts: what the frontend's inline scripts do for real. */
const THEME_BOOT = `
    <script>
      // Mockup-only. With no ?theme the page follows the OS colour scheme
      // through the media query in tokens.css; ?theme=dark|light forces one,
      // exactly like the stored choice the real site writes to <html>.
      const forced = new URLSearchParams(location.search).get('theme')
      if (forced) document.documentElement.dataset.theme = forced
    </script>`

const PAGE_SCRIPT = `
    <script>
      function toggleTheme() {
        const html = document.documentElement
        const dark = html.dataset.theme === 'dark' || (!html.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches)
        html.classList.add('theme-transition')
        html.dataset.theme = dark ? 'light' : 'dark'
        setTimeout(() => html.classList.remove('theme-transition'), 400)
      }
    </script>`

const HOME_SCRIPT = `
    <script>
      // Reveal on scroll: one IntersectionObserver, fires once per block.
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
      }, { rootMargin: '0px 0px -10% 0px' })
      document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))

      // Scale the embedded A4 CV (794px wide) to the preview box.
      const sheet = document.querySelector('.cv__sheet')
      const fitCv = () => sheet.style.setProperty('--cv-scale', sheet.clientWidth / 794)
      fitCv()
      new ResizeObserver(fitCv).observe(sheet)
    </script>`

/* Chrome: header and footer ───────────────────────────────────────────── */

function head(c, page, extraCss = '', extraHead = '') {
  return `<!doctype html>
<html lang="${c.lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${c.titles[page]}</title>
    <link rel="stylesheet" href="./mockup.css" />${extraCss}${THEME_BOOT}${extraHead}
  </head>
  <body>${SYMBOLS}`
}

function header(c, page) {
  const other = CONTENT[c.other]
  return `
    <header class="site-header">
      <div class="wrap">
        <a class="brand" href="${c.pages.home}"><span class="brand__label">${c.header.label}</span></a>
        <nav class="site-nav" aria-label="${c.header.nav}">
          <a class="link-arrow" href="https://github.com/xexubonete" ${EXT}>GitHub ${arrow()}</a>
          <a class="link-arrow" href="https://www.linkedin.com/in/jesus-bonete-sanchez/" ${EXT}>LinkedIn ${arrow()}</a>
          <span class="lang-switch" aria-label="${c.header.language}">
            ${c.lang === 'en' ? `<span aria-current="true">en</span><a href="${other.pages[page]}" lang="es">es</a>` : `<a href="${other.pages[page]}" lang="en">en</a><span aria-current="true">es</span>`}
          </span>
          <button class="theme-toggle" type="button" aria-label="${c.header.theme}" onclick="toggleTheme()">
            <svg class="icon-sun"><use href="#sun" /></svg>
            <svg class="icon-moon"><use href="#moon" /></svg>
          </button>
        </nav>
      </div>
    </header>`
}

function footer(c, page) {
  const other = CONTENT[c.other]
  return `
    <footer class="site-footer">
      <div class="wrap">
        <span>${c.footer.copy}</span>
        <span>${c.footer.built}</span>
        <span class="site-footer__links">
          <a href="https://github.com/xexubonete" ${EXT}>GitHub</a>
          <a href="https://www.linkedin.com/in/jesus-bonete-sanchez/" ${EXT}>LinkedIn</a>
          <a href="${other.pages[page]}" lang="${c.other}">${c.other.toUpperCase()}</a>
        </span>
      </div>
    </footer>${PAGE_SCRIPT}`
}

const colHead = (s) => `
            <header class="section-head">
              <span class="section-num">${s.num}</span>
              <h2 class="section-title">${s.title}</h2>
              ${s.meta ? `<span class="section-head__meta">${s.meta}</span>` : ''}
            </header>`

/* Home ──────────────────────────────────────────────────────────────────── */

function home(c) {
  const groups = groupByCompany(c.experience.roles)
  const tape = TAPE.map((t) => `<span>${t}</span>`).join('')
  const studyRow = (s) =>
    s.link
      ? `<li><a href="${s.link}" ${EXT}>${s.institution}${s.date ? ` <span class="mono">${s.date.replace(' - ', ' – ')}</span>` : ''} ${arrow()}</a></li>`
      : `<li>${s.institution}</li>`

  return `${head(c, 'home')}${header(c, 'home')}

    <main>
      <!-- 00 · Hero: name, portrait, title block and the intro, in one viewport. -->
      <section class="hero" id="hero">
        <div class="wrap">
          <div class="hero__top">
            <div class="hero__name-block">
              <p class="eyebrow eyebrow--accent rise">${c.hero.eyebrow}</p>
              <h1 class="hero__name">
                <span class="rise" style="--reveal-delay: 80ms">${c.hero.name[0]}</span>
                <span class="accent-line rise" style="--reveal-delay: 160ms">${c.hero.name[1]}</span>
              </h1>
            </div>
            <div class="hero__portrait rise" style="--reveal-delay: 280ms">
              <img src="../public/me.png" alt="${c.hero.portraitAlt}" width="420" height="420" />
            </div>
          </div>

          <dl class="title-block rise" style="--reveal-delay: 360ms">${c.hero.block
            .map(
              ([dt, dd], i) => `
            <div class="title-block__field">
              <dt class="eyebrow">${dt}</dt>
              <dd class="title-block__value">${i === 3 ? `<span class="beacon">${dd}</span>` : dd}</dd>
            </div>`,
            )
            .join('')}
          </dl>

          <div class="hero__intro rise" style="--reveal-delay: 440ms">
            <p class="lead">${c.hero.lead}</p>
            ${c.hero.paragraphs.map((p) => `<p class="prose">${p}</p>`).join('\n            ')}
          </div>
        </div>
      </section>

      <!-- 00b · Tape -->
      <div class="tape" aria-hidden="true">
        <div class="tape__track display tape__text">${tape}</div>
        <div class="tape__track display tape__text">${tape}</div>
      </div>

      <!-- Sheet 1: CV | 01 Experience | 02 Stack -->
      <section class="band band--sheet" data-reveal id="sheet-1">
        <div class="wrap band__grid">
          <div class="col col--cv reveal" id="cv">
            <header class="section-head">
              <h2 class="section-title">${c.cv.title}</h2>
            </header>
            <div class="cv-plate">
              <a class="cv__sheet" href="${c.pages.cv}" ${EXT} aria-label="${c.cv.open}">
                <iframe src="./${c.pages.cv}?embed=1" title="${c.cv.preview}" tabindex="-1" loading="lazy"></iframe>
              </a>
              <div class="cv-plate__copy">
                <p>${c.cv.caption}</p>
                <a class="btn btn--accent" href="${c.pages.cv}" ${EXT}>${c.cv.button} ${arrow('arrow btn__arrow')}</a>
              </div>
            </div>
          </div>

          <div class="col col--exp reveal" style="--reveal-delay: 100ms" id="experience">${colHead(c.experience)}
            <div class="exp">${groups
              .map(
                (g, i) => `
              <article class="exp__row">
                <div class="exp__year">${g.roles[0].end.slice(3)}</div>
                <div class="exp__head">
                  <a class="exp__company link-arrow" href="${g.link}" ${EXT}>${g.company} ${arrow()}</a>
                  <div class="exp__position">${g.roles[0].position}${g.roles.length > 1 ? ` <span class="exp__count">· ${g.roles.length} ${c.experience.rolesWord}</span>` : ''}</div>
                  <div class="exp__dates">${years(g.roles)} · ${g.location}</div>
                  <p class="exp__body">${g.roles[0].description}</p>
                </div>
                ${i === 0 ? `<img class="exp__logo" src="../public/cafler-logo.png" alt="" width="40" height="40" />` : ''}
              </article>`,
              )
              .join('')}
            </div>
            <p class="col__foot"><a class="btn btn--outline" href="${c.pages.work}">${c.experience.more} ${arrow('arrow btn__arrow')}</a></p>
          </div>

          <div class="col col--stack reveal" style="--reveal-delay: 200ms" id="stack">${colHead(c.stack)}
            <div class="stack">${c.stack.groups
              .map(
                (g, i) => `
              <div class="stack__group">
                <h3 class="stack__label"><span class="section-num">${c.stack.num}.${i + 1}</span>${g.label}</h3>
                <div class="stack__items">${tags(g.items)}</div>
              </div>`,
              )
              .join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- Sheet 2: 03 Projects | 04 Goals | 05 Profile -->
      <section class="band band--sheet" data-reveal id="sheet-2">
        <div class="wrap band__grid band__grid--second">
          <div class="col col--projects reveal" id="projects">${colHead(c.projects)}
            <div class="projects">${PROJECTS.map(
              (p, i) => `
              <a class="project" href="${p.href}" ${EXT}${p.live ? ` title="${c.projects.here}"` : ''}>
                <span class="project__index">0${i + 1}</span>
                <span class="project__name">${p.live ? '<span class="live-dot" aria-hidden="true"></span>' : ''}${p.label}${p.live ? ` <span class="project__note">${c.projects.here}</span>` : ''}</span>
                ${arrow()}
              </a>`,
            ).join('')}
            </div>
            <p class="col__foot"><a class="btn btn--outline" href="https://github.com/xexubonete?tab=repositories" ${EXT}>${c.projects.all} ${arrow('arrow btn__arrow')}</a></p>
          </div>

          <div class="col col--goals reveal" style="--reveal-delay: 100ms" id="goals">${colHead(c.goals)}
            <p class="goals__intro">${c.goals.intro}</p>
            <div class="goals">${c.goals.items
              .map(
                ([t, d], i) => `
              <div class="goal">
                <span class="section-num">0${i + 1}</span>
                <h3 class="goal__title">${t}</h3>
                <p class="goal__text">${d}</p>
              </div>`,
              )
              .join('')}
            </div>
          </div>

          <div class="col col--profile reveal" style="--reveal-delay: 200ms" id="profile">${colHead(c.profile)}
            <div class="profile">
              <div class="profile__about">
                <h3 class="profile__title">${c.profile.aboutTitle}</h3>
                ${c.profile.about.map((p) => `<p>${p}</p>`).join('\n                ')}
              </div>
              <div>
                <h3 class="profile__title">${c.profile.studyTitle}</h3>
                <ul class="chips">${c.profile.studies.map(studyRow).join('')}</ul>
              </div>
              <div>
                <h3 class="profile__title">${c.profile.languagesTitle}</h3>
                <ul class="chips">${c.profile.languages.map(([l, v]) => `<li>${l} <span class="mono">${v}</span></li>`).join('')}</ul>
              </div>
              <div>
                <h3 class="profile__title">${c.profile.softTitle}</h3>
                <ul class="chips">${c.profile.soft.map((s) => `<li><svg class="check" aria-hidden="true"><use href="#check" /></svg>${s}</li>`).join('')}</ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Quote -->
      <section class="quote-band" data-reveal id="quote">
        <div class="wrap">
          <figure class="reveal">
            <blockquote>“${c.quote.text} <span class="accent-word">${c.quote.accent}</span>”</blockquote>
            <figcaption>— ${c.quote.by}</figcaption>
          </figure>
        </div>
      </section>

      <!-- 06 Contact -->
      <section class="band" data-reveal id="contact">
        <div class="wrap contact reveal">
          <div class="contact__main">${colHead(c.contact)}
            <ul class="contact__links">${c.contact.links
              .map(
                ([label, small, href]) => `
              <li><a href="${href}" ${EXT}><span class="contact__label">${label}</span><small>${small}</small>${arrow()}</a></li>`,
              )
              .join('')}
            </ul>
          </div>
          <div class="contact__aside">
            <img class="contact__portrait" src="../public/me_chillin.png" alt="${c.contact.portraitAlt}" width="420" height="420" />
          </div>
        </div>
      </section>
    </main>
${footer(c, 'home')}${HOME_SCRIPT}
  </body>
</html>
`
}

/* Work ──────────────────────────────────────────────────────────────────── */

function work(c) {
  const groups = groupByCompany(c.work.roles)
  return `${head(c, 'work')}${header(c, 'work')}

    <main>
      <div class="wrap">
        <header class="page-title">
          <p class="eyebrow eyebrow--accent">${c.work.eyebrow}</p>
          <h1>${c.work.title} <span class="accent-word">${c.work.years}</span></h1>
          <p>${c.work.description}</p>
        </header>
${groups
  .map(
    (g, i) => `
        <section class="work-group">
          <div class="work-group__company">
            <span class="section-num">0${i + 1}</span>
            <a class="exp__company link-arrow" href="${g.link}" ${EXT}>${g.company} ${arrow()}</a>
            <span class="exp__dates">${years(g.roles)} · ${g.location}</span>
          </div>
          <div>${g.roles
            .map(
              (r) => `
            <article class="role">
              <div class="exp__dates">${r.start} – ${r.end}</div>
              <h3 class="role__title">${r.position}</h3>
              <p class="role__summary">${r.description}</p>
              <ul class="role__tasks">${r.responsibilities.map((t) => `<li>${t}</li>`).join('')}</ul>
              <div class="role__stack">${tags(r.stack)}</div>
            </article>`,
            )
            .join('')}
          </div>
        </section>`,
  )
  .join('')}
        <p class="page-foot"><a class="btn btn--outline" href="${c.pages.home}">${c.work.back}</a></p>
      </div>
    </main>
${footer(c, 'work')}
  </body>
</html>
`
}

/* CV ────────────────────────────────────────────────────────────────────── */

function cv(c) {
  const r = c.resume
  const groups = groupByCompany(r.roles)
  const job = (role) => `
                <p class="cv-job-summary">${role.description}</p>
                <ul>${role.responsibilities.map((t) => `<li>${t}</li>`).join('')}</ul>
                <div class="cv-stack">${role.stack.map((s) => `<span>${s}</span>`).join('')}</div>`
  const embedCss = `
    <link rel="stylesheet" href="../src/styles/cv.css" />
    <style>
      .is-embed .cv-page { padding: 0; }
      .is-embed .cv-toolbar { display: none; }
      .is-embed .cv-sheet { box-shadow: none; }
    </style>`
  const embedBoot = `
    <script>
      if (new URLSearchParams(location.search).get('embed')) document.documentElement.classList.add('is-embed')
    </script>`

  return `${head(c, 'cv', embedCss, embedBoot)}

    <div class="cv-page">
      <div class="cv-toolbar">
        <a class="btn btn--accent" href="${r.pdf}" download>${r.download} ${arrow('arrow btn__arrow')}</a>
        <a class="btn btn--ghost" href="${c.pages.home}">${r.back}</a>
      </div>

      <article class="cv-sheet">
        <aside class="cv-aside">
          <div>
            <img class="cv-photo" src="../public/me.png" alt="Jesús Bonete" />
            <h1 class="cv-name">Jesús <span>Bonete Sánchez</span></h1>
            <p class="cv-role">${r.role}</p>
          </div>

          <section>
            <h2>${r.contactTitle}</h2>
            <div class="cv-contact"><svg><use href="#pin" /></svg><span>${r.location}</span></div>
            <div class="cv-contact"><svg><use href="#mail" /></svg><a href="mailto:xexubonete@gmail.com">xexubonete@gmail.com</a></div>
            <div class="cv-contact"><svg><use href="#phone" /></svg><span>(+34) 722 243 881</span></div>
            <div class="cv-contact"><svg><use href="#globe" /></svg><a href="https://xexubonete.dev" ${EXT}>xexubonete.dev</a></div>
            <div class="cv-contact"><svg><use href="#globe" /></svg><a href="https://www.linkedin.com/in/jesus-bonete-sanchez/" ${EXT}>linkedin.com/in/jesus-bonete-sanchez</a></div>
            <div class="cv-contact"><svg><use href="#globe" /></svg><a href="https://github.com/xexubonete" ${EXT}>github.com/xexubonete</a></div>
          </section>

          <section>
            <h2>${r.dataTitle}</h2>
            <div class="cv-field"><span class="label">${r.nat}</span>${r.natValue}</div>
            <div class="cv-field"><span class="label">${r.license}</span>B</div>
          </section>

          <section>
            <h2>${r.langTitle}</h2>
            ${r.languages.map(([l, v]) => `<div class="cv-field"><span class="label">${l}</span>${v}</div>`).join('\n            ')}
          </section>

          <section>
            <h2>${r.skillsTitle}</h2>
            <div class="cv-chips">${r.soft.map((s) => `<span class="cv-chip">${s}</span>`).join('')}</div>
          </section>
        </aside>

        <main class="cv-main">
          <section>
            <h2 data-num="01">${r.profileTitle}</h2>
            <p class="cv-summary">${r.profile}</p>
          </section>

          <section>
            <h2 data-num="02">${r.expTitle}</h2>${groups
              .map((g) =>
                g.roles.length === 1
                  ? `
            <div class="cv-job">
              <div class="cv-job-head">
                <span class="cv-job-title">${g.roles[0].position} · <a class="cv-job-company" href="${g.link}" ${EXT}>${g.company}</a></span>
                <span class="cv-job-period">${g.roles[0].start} – ${g.roles[0].end}</span>
              </div>
              <div class="cv-job-place">${g.location}</div>${job(g.roles[0])}
            </div>`
                  : `
            <div class="cv-job">
              <div class="cv-job-head">
                <a class="cv-job-title cv-job-company" href="${g.link}" ${EXT}>${g.company}</a>
                <span class="cv-job-period">${years(g.roles)}</span>
              </div>
              <div class="cv-job-place">${g.location}</div>
              <div class="cv-roles">${g.roles
                .map(
                  (role) => `
                <div>
                  <div class="cv-job-head"><span class="cv-job-title">${role.position}</span><span class="cv-job-period">${role.start} – ${role.end}</span></div>${job(role)}
                </div>`,
                )
                .join('')}
              </div>
            </div>`,
              )
              .join('')}
          </section>

          <section>
            <h2 data-num="03">${r.eduTitle}</h2>
            <div class="cv-job">
              <div class="cv-job-head">
                <span class="cv-job-title">${r.eduName} · <span class="cv-job-company">IES Mare Nostrum</span></span>
                <span class="cv-job-period">2020 – 2022</span>
              </div>
              <div class="cv-job-place">${r.eduPlace}</div>
            </div>
          </section>
        </main>
      </article>
    </div>
  </body>
</html>
`
}

/* 404 ───────────────────────────────────────────────────────────────────── */

function notFound(c) {
  const n = c.notFound
  return `${head(c, 'notFound')}${header(c, 'notFound')}

    <main class="hero not-found">
      <div class="wrap not-found__grid">
        <div>
          <p class="eyebrow eyebrow--accent">${n.eyebrow}</p>
          <p class="display-hero display not-found__code">404</p>
          <h1 class="not-found__title">${n.title}</h1>
          <p class="not-found__text">${n.text}</p>
          <p class="not-found__action"><a class="btn" href="${c.pages.home}">${n.button}</a></p>
        </div>
        <img class="not-found__portrait" src="../public/me_chillin.png" alt="${n.alt}" width="420" height="420" />
      </div>
    </main>
${footer(c, 'notFound')}
  </body>
</html>
`
}

/* Write ─────────────────────────────────────────────────────────────────── */

for (const c of Object.values(CONTENT)) {
  writeFileSync(join(here, c.pages.home), home(c))
  writeFileSync(join(here, c.pages.work), work(c))
  writeFileSync(join(here, c.pages.cv), cv(c))
  writeFileSync(join(here, c.pages.notFound), notFound(c))
  console.log(`${c.lang}: ${Object.values(c.pages).join(', ')}`)
}
