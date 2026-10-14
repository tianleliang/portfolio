import { useEffect, useState } from 'react'
import { experience, highlights, honors, profile, projects, publications, type Project } from './content'
import { figureSrc, ProjectVisual } from './components/Visuals'

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
    <button className="icon-btn" onClick={toggle} aria-label="Toggle color theme">
      <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" />
      </svg>
    </button>
  )
}

const icons = {
  github: (
    <path
      fill="currentColor"
      d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.9.1-.7.4-1.26.73-1.54-2.56-.29-5.25-1.28-5.25-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.7 5.39-5.27 5.67.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"
    />
  ),
  x: (
    <path
      fill="currentColor"
      d="M18.9 3h3.5l-7.6 8.8L23 21h-6.9l-5.4-7.4L4.7 21H1.2l8.2-9.4L1 3h7.1l4.9 6.8L18.9 3zm-1.1 16h1.9L7.1 4.9H5.1l12.7 14.1z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.75H3zM9.5 9.75h3.83v1.6h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13v6.08h-4v-5.39c0-1.29-.02-2.94-1.79-2.94-1.8 0-2.02 1.4-2.02 2.84v5.49h-4V9.75z"
    />
  ),
  mail: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </g>
  ),
}

function Icon({ name, href, label }: { name: keyof typeof icons; href: string; label: string }) {
  const external = !href.startsWith('mailto:')
  return (
    <a className="icon-btn" href={href} aria-label={label} title={label} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
        {icons[name]}
      </svg>
    </a>
  )
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

function ProjectCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false)
  const bodyId = `${p.id}-details`
  const fig = figureSrc[p.visual]
  return (
    <article className={open ? 'card open' : 'card'} id={p.id}>
      <button className="card-head" aria-expanded={open} aria-controls={bodyId} onClick={() => setOpen((o) => !o)}>
        <div className="card-fig">
          <ProjectVisual kind={p.visual} />
        </div>
        <div className="card-title">
          <p className="meta">{p.context}</p>
          <h3>{p.title}</h3>
          <p className="result">{p.result}</p>
          <span className="toggle" aria-hidden="true">
            <span className="toggle-label">{open ? 'Less' : 'More'}</span>
            <svg viewBox="0 0 12 12" width="11" height="11">
              <path d="M2 4.5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
        </div>
      </button>
      <div className="card-body" id={bodyId}>
        <div className="card-body-inner">
          <p className="summary">{p.body}</p>
          {p.bullets && (
            <ul className="bullets">
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {(p.links.length > 0 || p.pending || fig) && (
            <p className="entry-links">
              {p.links.map((l) => (
                <span key={l.href}>
                  <ExtLink href={l.href}>{l.label} ↗</ExtLink>
                  {l.note && <span className="note"> ({l.note})</span>}
                </span>
              ))}
              {fig && <ExtLink href={fig}>Full figure ↗</ExtLink>}
              {p.pending && <span className="note">{p.pending}</span>}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

export default function App() {
  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a href="#top" className="wordmark">Tianle Liang</a>
          <nav aria-label="Links">
            <ExtLink href={profile.resume}>Résumé</ExtLink>
            <Icon name="github" href={profile.github} label="GitHub" />
            <Icon name="x" href={profile.x} label="X" />
            <Icon name="linkedin" href={profile.linkedin} label="LinkedIn" />
            <Icon name="mail" href={`mailto:${profile.email}`} label="Email" />
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="top" className="wrap">
        <section className="intro">
          <h1>{profile.name}</h1>
          <p className="lede">{profile.tagline}</p>
          <ul className="highlights">
            {highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <div className="cards">
            {projects.map((p) => (
              <ProjectCard key={p.id} p={p} />
            ))}
          </div>
        </section>

        <section id="experience">
          <h2>Experience</h2>
          {experience.map((e) => (
            <article key={e.org} className="entry">
              <p className="meta">{e.when}</p>
              <h3>{e.href ? <ExtLink href={e.href}>{e.org}</ExtLink> : e.org}</h3>
              <p className="role">{e.role}</p>
              <ul className="bullets">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section id="publications">
          <h2>Publications</h2>
          <ol className="plain">
            {publications.map((p) => (
              <li key={p.href}>
                <ExtLink href={p.href}>{p.title}</ExtLink>
                <span className="note">
                  {' '}
                  {p.venue}
                  {p.linkLabel && `, ${p.linkLabel}`}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section id="honors">
          <h2>Honors</h2>
          <ul className="plain honors">
            {honors.map((h) => (
              <li key={h.title}>
                <span className="year">{h.year}</span>
                <span>
                  {h.href ? <ExtLink href={h.href}>{h.title}</ExtLink> : h.title}
                  {h.detail && <span className="note">, {h.detail}</span>}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="wrap footer">
        <p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span className="sep">·</span>
          <a href={`mailto:${profile.personalEmail}`}>{profile.personalEmail}</a>
        </p>
      </footer>
    </>
  )
}
