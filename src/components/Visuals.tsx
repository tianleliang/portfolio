import frontier from '../data/frontier.json'
import type { Visual } from '../content'

type Series = [number, number][]
const data = frontier as Record<'Pessimistic' | 'Moderate' | 'Optimistic', Series>

function FrontierChart() {
  const W = 520
  const H = 320
  const m = { t: 20, r: 20, b: 44, l: 48 }
  const xMax = 40
  const yMax = 30
  const x = (v: number) => m.l + (v / xMax) * (W - m.l - m.r)
  const y = (v: number) => H - m.b - (v / yMax) * (H - m.t - m.b)
  const path = (s: Series) => s.map(([b, a], i) => `${i ? 'L' : 'M'}${x(b).toFixed(1)},${y(a).toFixed(1)}`).join('')
  const xTicks = [0, 10, 20, 30, 40]
  const yTicks = [0, 10, 20, 30]
  const px = x(5)
  const py = y(10.39)

  return (
    <figure className="viz viz-frontier">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Budget versus avoided loss across three scenarios. A $5B budget avoids $10.4B in the moderate case.">
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} className="gridline" />
            <text x={m.l - 10} y={y(t)} className="tick" textAnchor="end" dominantBaseline="middle">${t}B</text>
          </g>
        ))}
        {xTicks.map((t) => (
          <text key={t} x={x(t)} y={H - m.b + 20} className="tick" textAnchor="middle">${t}B</text>
        ))}
        <text x={(m.l + W - m.r) / 2} y={H - 4} className="axis" textAnchor="middle">Resilience budget</text>
        <line x1={x(0)} y1={y(0)} x2={x(30)} y2={y(30)} className="parity" />
        <text x={x(27)} y={y(28.4)} className="parity-label" textAnchor="end">1× return</text>
        <path d={path(data.Optimistic)} className="line faint" />
        <path d={path(data.Pessimistic)} className="line faint" />
        <path d={path(data.Moderate)} className="line main" />
        <line x1={px} x2={px} y1={py} y2={y(0)} className="drop" />
        <circle cx={px} cy={py} r={6} className="pick" />
        <text x={px + 12} y={py - 12} className="callout">$5B → $10.4B avoided</text>
        <text x={x(40) - 4} y={y(28.17) - 8} className="series" textAnchor="end">optimistic</text>
        <text x={x(40) - 4} y={y(23.91) - 8} className="series strong" textAnchor="end">moderate</text>
        <text x={x(40) - 4} y={y(20.0) + 16} className="series" textAnchor="end">pessimistic</text>
      </svg>
      <figcaption>Avoided loss vs. budget, solved with SNOPT across 60 budgets and 3 scenarios.</figcaption>
    </figure>
  )
}

function Image({ src, alt, caption, w, h }: { src: string; alt: string; caption: string; w: number; h: number }) {
  return (
    <figure className="viz viz-image">
      <div className="plate">
        <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function PlaybookLoop() {
  const stages = ['Goal', 'Plan', 'Leverage', 'Scan', 'Select', 'Act', 'Review']
  const cx = 160
  const cy = 120
  const r = 88
  return (
    <figure className="viz viz-diagram">
      <svg viewBox="0 0 320 240" role="img" aria-label="Playbook loop: goal, plan, leverage, scan, select, act, review, then back to goal.">
        <circle cx={cx} cy={cy} r={r} className="ring" />
        {stages.map((s, i) => {
          const a = -Math.PI / 2 + (i / stages.length) * Math.PI * 2
          const nx = cx + r * Math.cos(a)
          const ny = cy + r * Math.sin(a)
          const gate = s === 'Select'
          return (
            <g key={s}>
              <circle cx={nx} cy={ny} r={gate ? 7 : 5} className={gate ? 'node gate' : 'node'} />
              <text
                x={cx + (r + 18) * Math.cos(a)}
                y={cy + (r + 18) * Math.sin(a)}
                className={gate ? 'label strong' : 'label'}
                textAnchor={Math.abs(Math.cos(a)) < 0.2 ? 'middle' : Math.cos(a) > 0 ? 'start' : 'end'}
                dominantBaseline="middle"
              >
                {s}
              </text>
            </g>
          )
        })}
        <text x={cx} y={cy - 6} className="center" textAnchor="middle">you approve</text>
        <text x={cx} y={cy + 12} className="center dim" textAnchor="middle">before it acts</text>
      </svg>
      <figcaption>The loop. The highlighted step is a human approval gate.</figcaption>
    </figure>
  )
}

function AgentPipeline() {
  const lanes = ['Major releases', 'Community tools', 'Landscape gaps', 'Unknown unknowns']
  const laneY = (i: number) => 34 + i * 46
  return (
    <figure className="viz viz-diagram">
      <svg viewBox="0 0 360 230" role="img" aria-label="Four discovery agents feed one verifier, which produces a daily brief.">
        {lanes.map((l, i) => (
          <g key={l}>
            <rect x={6} y={laneY(i) - 15} width={128} height={30} rx={6} className="box" />
            <text x={70} y={laneY(i)} className="label" textAnchor="middle" dominantBaseline="middle">{l}</text>
            <path d={`M134,${laneY(i)} C170,${laneY(i)} 170,103 200,103`} className="edge" />
          </g>
        ))}
        <rect x={200} y={83} width={78} height={40} rx={6} className="box accent" />
        <text x={239} y={103} className="label strong" textAnchor="middle" dominantBaseline="middle">Verifier</text>
        <path d="M278,103 L304,103" className="edge" markerEnd="url(#arrow)" />
        <rect x={304} y={88} width={50} height={30} rx={6} className="box" />
        <text x={329} y={103} className="label" textAnchor="middle" dominantBaseline="middle">Brief</text>
        <text x={70} y={222} className="label dim" textAnchor="middle">4 agents in parallel</text>
        <text x={239} y={146} className="label dim" textAnchor="middle">checks every claim</text>
        <defs>
          <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" className="arrowhead" />
          </marker>
        </defs>
      </svg>
      <figcaption>Daily research brief: discovery fans out, verification fans in.</figcaption>
    </figure>
  )
}

export function ProjectVisual({ kind }: { kind: Visual }) {
  switch (kind) {
    case 'frontier':
      return <FrontierChart />
    case 'outage-map':
      return (
        <Image
          src="/figures/outage-map.webp"
          alt="Map of Texas showing total outages by region, 2018 to 2022, concentrated in the central and eastern grid cells."
          caption="Outages by region, 2018–2022, on the 200-km grid the models use."
          w={1000}
          h={838}
        />
      )
    case 'rayfield':
      return (
        <Image
          src="/figures/rayfield-forecast.webp"
          alt="Actual vs. predicted wind power with a two-week forecast and flagged anomalies."
          caption="Validation fit, then a 336-hour forecast with flagged anomalies."
          w={945}
          h={390}
        />
      )
    case 'playbook':
      return <PlaybookLoop />
    case 'agents':
      return <AgentPipeline />
  }
}
