import { useEffect, useState } from 'react'
import { experience, honors, lead, profile, projects, publications, stats, type Project } from './content'
import { ProjectVisual } from './components/Visuals'

type Theme = 'light' | 'dark'

function readStoredTheme(): Theme | null {
  try {
    const t = localStorage.getItem('theme')
    return t === 'light' || t === 'dark' ? t : null
  } catch {
    return null
  }
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(readStoredTheme)

  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme
  }, [theme])

  const toggle = () => {
    const current = theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    const next: Theme = current === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage unavailable */
    }
  }

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle color theme">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="12" cy="12" r="5" className="sun" />
        <path d="M12 7a5 5 0 0 0 0 10z" className="moon" />
      </svg>
    </button>
  )
}

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
      <path d="M3 9L9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function ProjectLinks({ p }: { p: Project }) {
  if (!p.links.length && !p.pending) return null
  return (
    <div className="links">
      {p.links.map((l, i) => (
        <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={i === 0 ? 'btn primary' : 'btn'}>
          {l.label} <Arrow />
          {l.note && <span className="btn-note">{l.note}</span>}
        </a>
      ))}
      {p.pending && <span className="pending">{p.pending}</span>}
    </div>
  )
}

function Metric({ p }: { p: Project }) {
  return (
    <p className="metric">
      <span className="metric-value">{p.metric.value}</span>
      <span className="metric-label">{p.metric.label}</span>
    </p>
  )
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="stack" aria-label="Tools">
      {items.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  )
}

function LeadCard() {
  return (
    <article className="card lead" id={lead.id}>
      <div className="lead-text">
        <p className="kicker">{lead.kicker}</p>
        <h3>{lead.title}</h3>
        <p className="body">{lead.body}</p>
        <Metric p={lead} />
        <Stack items={lead.stack} />
        <ProjectLinks p={lead} />
      </div>
      <ProjectVisual kind={lead.visual} />
    </article>
  )
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className={`card project v-${p.visual}`} id={p.id}>
      <ProjectVisual kind={p.visual} />
      <div className="card-text">
        <p className="kicker">{p.kicker}</p>
        <h3>{p.title}</h3>
        <p className="body">{p.body}</p>
        <Metric p={p} />
        <Stack items={p.stack} />
        <ProjectLinks p={p} />
      </div>
    </article>
  )
}

export default function App() {
  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a href="#top" className="mark">TL</a>
          <nav aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#publications">Papers</a>
            <a href={profile.resume} target="_blank" rel="noreferrer">Résumé</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main id="top">
        <section className="hero wrap">
          <h1>
            {profile.name}
            <span className="aka"> ({profile.legalName})</span>
          </h1>
          <p className="tagline">{profile.tagline}</p>
          <p className="school">{profile.school}</p>
          <div className="hero-links">
            <a className="btn primary" href={`mailto:${profile.email}`}>Email me</a>
            <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">Résumé <Arrow /></a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
          </div>
          <dl className="stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="wrap section" id="work">
          <h2 className="section-title">Selected work</h2>
          <LeadCard />
          <div className="grid">
            {projects.map((p) => (
              <ProjectCard key={p.id} p={p} />
            ))}
          </div>
        </section>

        <section className="wrap section" id="experience">
          <h2 className="section-title">Experience</h2>
          <ol className="rows">
            {experience.map((e) => (
              <li key={e.org} className="row">
                <span className="row-when">{e.when}</span>
                <div>
                  <p className="row-title">
                    {e.href ? (
                      <a href={e.href} target="_blank" rel="noreferrer">{e.org} <Arrow /></a>
                    ) : (
                      e.org
                    )}
                    {e.note && <span className="tag">{e.note}</span>}
                  </p>
                  <p className="row-sub">{e.role}</p>
                  <p className="row-line">{e.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="wrap section" id="publications">
          <h2 className="section-title">Publications</h2>
          <ol className="rows">
            {publications.map((p) => (
              <li key={p.href} className="row">
                <span className={p.status === 'Published' ? 'row-when' : 'row-when review'}>{p.status}</span>
                <div>
                  <p className="row-title">
                    <a href={p.href} target="_blank" rel="noreferrer">{p.title} <Arrow /></a>
                  </p>
                  <p className="row-sub">
                    {p.venue}
                    {p.linkLabel && <span className="tag">{p.linkLabel}</span>}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="wrap section" id="honors">
          <h2 className="section-title">Honors</h2>
          <ol className="rows">
            {honors.map((h) => (
              <li key={h.title} className="row">
                <span className="row-when">{h.year}</span>
                <div>
                  <p className="row-title">
                    {h.href ? (
                      <a href={h.href} target="_blank" rel="noreferrer">{h.title} <Arrow /></a>
                    ) : (
                      h.title
                    )}
                  </p>
                  <p className="row-line">{h.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <div>
            <p className="footer-head">Get in touch</p>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`mailto:${profile.personalEmail}`}>{profile.personalEmail}</a>
          </div>
          <div className="footer-links">
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={profile.resume} target="_blank" rel="noreferrer">Résumé</a>
          </div>
        </div>
      </footer>
    </>
  )
}
