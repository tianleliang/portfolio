import frontier from '../data/frontier.json'
import type { Visual } from '../content'

type Series = [number, number][]
const data = frontier as Record<'Pessimistic' | 'Moderate' | 'Optimistic', Series>

function FrontierChart() {
  const W = 240
  const H = 180
  const m = { t: 10, r: 8, b: 24, l: 30 }
  const xMax = 40
  const yMax = 30
  const x = (v: number) => m.l + (v / xMax) * (W - m.l - m.r)
  const y = (v: number) => H - m.b - (v / yMax) * (H - m.t - m.b)
  const path = (s: Series) => s.map(([b, a], i) => `${i ? 'L' : 'M'}${x(b).toFixed(1)},${y(a).toFixed(1)}`).join('')
  const px = x(5)
  const py = y(10.39)

  return (
    <figure className="viz">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Avoided loss versus budget across three scenarios. A $5B budget avoids $10.4B in the moderate case.">
        {[0, 10, 20, 30].map((t) => (
          <g key={t}>
            <line x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} className="gridline" />
            <text x={m.l - 5} y={y(t)} className="tick" textAnchor="end" dominantBaseline="middle">${t}B</text>
          </g>
        ))}
        {[0, 20, 40].map((t) => (
          <text key={t} x={x(t)} y={H - 8} className="tick" textAnchor={t === 40 ? 'end' : t === 0 ? 'start' : 'middle'}>${t}B</text>
        ))}
        <line x1={x(0)} y1={y(0)} x2={x(30)} y2={y(30)} className="parity" />
        <path d={path(data.Optimistic)} className="line faint" />
        <path d={path(data.Pessimistic)} className="line faint" />
        <path d={path(data.Moderate)} className="line main" />
        <line x1={px} x2={px} y1={py} y2={y(0)} className="drop" />
        <circle cx={px} cy={py} r={4} className="pick" />
        <text x={px + 8} y={py - 8} className="callout">$5B → $10.4B</text>
      </svg>
      <figcaption>Losses avoided vs. budget across 3 scenarios, solved with SNOPT. Dashed line is 1× return.</figcaption>
    </figure>
  )
}

function Figure({ src, alt, caption, w, h }: { src: string; alt: string; caption: string; w: number; h: number }) {
  return (
    <figure className="viz">
      <div className="plate">
        <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function PlaybookLoop() {
  const stages = ['Goal', 'Plan', 'Leverage', 'Scan', 'Select', 'Act', 'Review']
  const cx = 120
  const cy = 92
  const r = 58
  return (
    <figure className="viz">
      <svg viewBox="0 0 240 184" role="img" aria-label="Playbook loop: goal, plan, leverage, scan, select, act, review, then back to goal.">
        <circle cx={cx} cy={cy} r={r} className="ring" />
        {stages.map((s, i) => {
          const a = -Math.PI / 2 + (i / stages.length) * Math.PI * 2
          const gate = s === 'Select'
          const c = Math.cos(a)
          return (
            <g key={s}>
              <circle cx={cx + r * c} cy={cy + r * Math.sin(a)} r={gate ? 5 : 3.5} className={gate ? 'node gate' : 'node'} />
              <text
                x={cx + (r + 12) * c}
                y={cy + (r + 12) * Math.sin(a)}
                className={gate ? 'label strong' : 'label'}
                textAnchor={Math.abs(c) < 0.2 ? 'middle' : c > 0 ? 'start' : 'end'}
                dominantBaseline="middle"
              >
                {s}
              </text>
            </g>
          )
        })}
        <text x={cx} y={cy - 2} className="center" textAnchor="middle">you approve</text>
        <text x={cx} y={cy + 14} className="center dim" textAnchor="middle">before it acts</text>
      </svg>
      <figcaption>The loop. "Select" is a human approval gate.</figcaption>
    </figure>
  )
}

function AgentSystem() {
  const sources = ['Documents', 'News email', 'Web']
  const agents = ['Wiki compiler', 'Research briefs', 'Opportunity scan']
  const memory = ['Memory layer', 'Semantic index']
  const col = (items: string[], x: number, w: number, top: number, gap: number, cls = 'box') =>
    items.map((t, i) => (
      <g key={t}>
        <rect x={x} y={top + i * gap} width={w} height={24} rx={4} className={cls} />
        <text x={x + w / 2} y={top + i * gap + 12} className="label" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 10 }}>
          {t}
        </text>
      </g>
    ))
  const sy = (i: number) => 30 + i * 40 + 12
  const ay = (i: number) => 30 + i * 40 + 12
  const my = (i: number) => 50 + i * 40 + 12
  return (
    <figure className="viz">
      <svg viewBox="0 0 300 160" role="img" aria-label="Sources feed agents, which write into a memory layer and semantic index.">
        <text x={34} y={14} className="label dim" textAnchor="middle">sources</text>
        <text x={150} y={14} className="label dim" textAnchor="middle">agents</text>
        <text x={262} y={14} className="label dim" textAnchor="middle">memory</text>
        {sources.map((_, i) =>
          agents.map((__, j) => (
            <path key={`${i}${j}`} d={`M68,${sy(i)} C88,${sy(i)} 92,${ay(j)} 108,${ay(j)}`} className="edge faint-edge" />
          )),
        )}
        {agents.map((_, j) =>
          memory.map((__, k) => (
            <path key={`${j}${k}`} d={`M192,${ay(j)} C210,${ay(j)} 210,${my(k)} 226,${my(k)}`} className="edge faint-edge" />
          )),
        )}
        {col(sources, 0, 68, 30, 40)}
        {col(agents, 108, 84, 30, 40, 'box strong')}
        {col(memory, 226, 74, 50, 40)}
      </svg>
      <figcaption>Sources in, agents in the middle, durable memory out.</figcaption>
    </figure>
  )
}

export function ProjectVisual({ kind }: { kind: Visual }) {
  switch (kind) {
    case 'frontier':
      return <FrontierChart />
    case 'outage-map':
      return (
        <Figure
          src="/figures/outage-map.webp"
          alt="Map of Texas showing total outages by region, 2018 to 2022."
          caption="Outages by region, 2018–2022."
          w={1000}
          h={838}
        />
      )
    case 'rayfield':
      return (
        <Figure
          src="/figures/rayfield-forecast.webp"
          alt="Actual vs. predicted wind power, then a forecast with flagged anomalies."
          caption="Validation fit, then forecast with flagged anomalies."
          w={945}
          h={390}
        />
      )
    case 'bgg':
      return (
        <Figure
          src="/figures/bgg-confusion.webp"
          alt="Confusion matrix for the 5-class board game popularity model."
          caption="Confusion matrix across 5 popularity levels."
          w={1208}
          h={511}
        />
      )
    case 'playbook':
      return <PlaybookLoop />
    case 'agents':
      return <AgentSystem />
  }
}

export const figureSrc: Partial<Record<Visual, string>> = {
  'outage-map': '/figures/outage-map.webp',
  rayfield: '/figures/rayfield-forecast.webp',
  bgg: '/figures/bgg-confusion.webp',
}
