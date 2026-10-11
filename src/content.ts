// All site copy and links live here. Swap a URL or line without touching layout.
// TODO(voice) marks placeholder copy Terrence will rewrite in his own words.

export type Link = { label: string; href: string; note?: string }

export const profile = {
  name: 'Tianle (Terrence) Liang',
  tagline: 'AI @ UPenn, 5x published researcher, building agentic systems for energy and ML in general.',
  email: 'ttliang@engineering.upenn.edu',
  personalEmail: 'tianle.liang16@gmail.com',
  github: 'https://github.com/tianleliang',
  linkedin: 'https://www.linkedin.com/in/tianle-liang/',
  resume: '/Terrence Liang - Tech Resume Oct A.docx.pdf',
}

export const highlights = [
  '5 publications',
  "Top 6 int'l finalist, MathWorks M3 Challenge",
  'Coolidge Senator',
  'Prev. scaled a platform to 3 continents',
]

export type Visual = 'frontier' | 'outage-map' | 'rayfield' | 'bgg' | 'playbook' | 'agents'

export type Project = {
  id: string
  title: string
  context: string
  body: string
  result: string
  bullets?: string[]
  links: Link[]
  pending?: string
  visual: Visual
}

export const projects: Project[] = [
  {
    id: 'stanford',
    title: 'ERCOT Resilience Optimization',
    context: 'Stanford Systems Optimization Lab, with Prof. Michael Saunders',
    // TODO(voice)
    body:
      'Texas faces about $43B in modeled climate losses to its power plants through 2050. I built a nonlinear model that splits a resilience budget across 18 plant clusters and solved it with SNOPT. The optimizer decides where to invest and when to protect capacity across a high-dimensional energy system under climate and outage uncertainty.',
    result: 'A $5B plan avoids $10.4B in losses (2.1×), above 1× in all 300 Monte Carlo trials.',
    links: [{ label: 'Live simulator', href: 'https://tianle-liang-ercot-optimization.vercel.app/' }],
    pending: 'code public after lab approval',
    visual: 'frontier',
  },
  {
    id: 'agents',
    title: 'Various Agentic Systems',
    context: 'Personal AI operating system',
    // TODO(voice)
    body:
      'A second brain that runs itself. I extended an open-source Obsidian + Claude Code template into one system where agents ingest what I read, remember what matters, and do research on a schedule. Instead of one-off prompts, I can turn a reading habit into a durable knowledge graph and daily briefing loop.',
    bullets: [
      'Memory layer: routes durable facts into category indexes, logs, and atomic notes, with change-scanning ingestion so edits get picked up automatically.',
      'LLM wiki (Karpathy pattern): raw sources stay untouched while agents compile them into an interlinked wiki of summaries, maps, and open questions.',
      'Semantic indexing: hybrid lexical + vector search over the whole vault, exposed to agents as an MCP tool.',
      'Research pipelines: a daily AI brief (4 discovery agents in parallel, then a verifier) and a daily investing brief built from ~3,000 news emails.',
      'Opportunity scanner: 4 bounded model calls with checkpoints and telemetry, run weekly.',
      'Scheduler: process locks, catch-up runs, retry caps, and usage-limit backoff.',
    ],
    result: '137 briefs shipped since June across ~480 working notes.',
    links: [],
    pending: 'writeup coming soon',
    visual: 'agents',
  },
  {
    id: 'outage',
    title: 'Forecasting Grid Outages from Climate Projections',
    context: 'Independent research, published in Elsevier Energy Reports',
    // TODO(voice)
    body:
      'A three-stage pipeline on GFDL-CM4 climate projections: classify storms, predict outage probability, then predict severity. Keeping the stages separate kept each one interpretable.',
    result: 'Projects annual outage losses rising from $1.4B to $1.58B by 2030.',
    links: [{ label: 'Paper', href: 'https://doi.org/10.1016/j.egyr.2025.108985' }],
    visual: 'outage-map',
  },
  {
    id: 'rayfield',
    title: 'Wind Power Forecasting & Fault Detection',
    context: 'Rayfield Systems, Harvard Undergraduate Ventures TECH',
    // TODO(voice)
    body:
      'I led 8 interns on 43,800 hourly records. A naive model leaks future data, so I built two passes: weather predicts a 6-hour power trend, which feeds an hourly XGBoost model. An Isolation Forest compares forecast error to a trained baseline to flag abnormal behavior.',
    result: 'R² 0.94, with 85% of hourly predictions within ±0.10.',
    links: [],
    pending: 'notebook going public soon',
    visual: 'rayfield',
  },
  {
    id: 'bgg',
    title: 'Predicting Board Game Success',
    context: 'UChicago Summer Session, published in Springer LNCS',
    // TODO(voice)
    body:
      'I scraped 20,000 games with 50+ variables from BoardGameGeek and trained a 5-class random forest to predict how much a game gets played. Social features like comments and ratings mattered more than many expected design features.',
    result: '0.71 accuracy, up from 0.39 for the regression baseline. Presented at ICEC 2025 in Tokyo.',
    links: [{ label: 'Paper', href: 'https://link.springer.com/chapter/10.1007/978-3-032-02555-5_18' }],
    visual: 'bgg',
  },
  {
    id: 'playbook',
    title: 'Playbook',
    context: 'Personal, in development',
    // TODO(voice)
    body:
      'A second brain for hitting a goal. You set a goal, it maps your leverage, scans for opportunities that fit, and asks you to pick before it acts.',
    result: 'V0 live: goal → plan → leverage → scan → select → act → review.',
    links: [
      { label: 'Code', href: 'https://github.com/tianleliang/alpha_playbook' },
      { label: 'Live V0', href: 'https://playbook-e8xd.onrender.com/welcome', note: 'takes a minute to wake' },
    ],
    visual: 'playbook',
  },
]

export const experience = [
  {
    org: 'Stanford Systems Optimization Laboratory',
    href: 'https://stanford.edu/group/SOL/',
    role: 'Energy Optimization Researcher',
    when: 'Jul 2025 – Present',
    bullets: [
      'Built a nonlinear AMPL model allocating resilience investment across 18 ERCOT plant clusters (7 fuel sources, 10 grid cells) against $43.1B in modeled 2025–2050 losses.',
      'Solved with SNOPT: a $5B budget avoids $10.4B in losses (2.1× ROI), and a 300-trial Monte Carlo held above 1× in every trial.',
      'Mentored by Prof. Michael Saunders. Shipped a public simulator, now being added to the SOL site.',
    ],
  },
  {
    org: 'Rayfield Systems',
    role: 'Technical Intern',
    when: 'Jun – Jul 2025',
    bullets: [
      'Led an 8-intern team building an ML pipeline for wind generation and anomaly forecasting, out to a 336-hour horizon, on 43K hourly records (2017–2021).',
      'Hourly model reached R² 0.94, with 85% of predictions within ±0.10.',
      'Presented directly to CEO Pranav Kulkarni (Stanford SAIL researcher).',
    ],
  },
  {
    org: 'NextGen Research Institute',
    href: 'https://ngresearch-kohl.vercel.app/',
    role: 'Chief Technology Officer',
    when: 'Nov 2024 – Jun 2025',
    bullets: [
      'Designed a research-matching platform for students and labs, scaled to 2K+ users across 3 continents and 20+ US states.',
      'Secured $6.5K in grants (STARTedUP Foundation) and helped grow to $38K in revenue in 8 months.',
    ],
  },
]

export const publications = [
  {
    title: 'A Multi-Stage Probabilistic Infrastructure for Outage Forecasting in the ERCOT Grid Using GFDL-CM4 Climate Projections',
    venue: 'Energy Reports (Elsevier)',
    href: 'https://doi.org/10.1016/j.egyr.2025.108985',
  },
  {
    title: 'Ensemble Forecasting of ERCOT Efficiency and Residual Price Variability Using GFDL-CM4 Climate Projections',
    venue: 'Energy Reports (Elsevier), in review',
    href: 'https://ssrn.com/abstract=5400605',
    linkLabel: 'preprint',
  },
  {
    title: 'Optimizing Random Forest Multi-classification and Gini-Based Feature Analysis of Board Game Success via BGG Characteristic Data',
    venue: 'Springer LNCS, IFIP ICEC 2025, Tokyo',
    href: 'https://link.springer.com/chapter/10.1007/978-3-032-02555-5_18',
  },
  {
    title: 'Applications of Machine Learning: Classifying Wheat Seeds through Neural Networks',
    venue: 'Scholarly Review',
    href: 'https://doi.org/10.70121/001c.123777',
  },
  {
    title: 'Bridging the STEM Divide: Addressing Educational Disparity in Indiana',
    venue: 'Scholarly Review',
    href: 'https://www.scholarlyreview.org/article/154601-bridging-the-stem-divide-addressing-educational-disparity-in-indiana',
  },
]

// Add `href` to any honor once a proof link exists.
export const honors: { title: string; detail?: string; year: string; href?: string }[] = [
  { title: "Top 6 Int'l Finalist, MathWorks M3 Challenge", detail: 'top 0.76%, $5K, presented at Jane Street HQ', year: '2025' },
  { title: "Top 3 Nat'l Finalist, Sempra Foundation Climate Resilience Award", year: '2025' },
  { title: '3rd of 1,500+ teams, Innovate WithIN', detail: '$4.5K in startup grants', year: '2025' },
  { title: '2nd Place, TSA National Conference', detail: 'Debating Technological Issues', year: '2025' },
  { title: 'Coolidge Senator', year: '2025' },
  { title: 'National Merit Scholar', year: '2026' },
]
