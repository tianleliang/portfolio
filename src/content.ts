// All site copy and links live here. Swap a URL or line without touching layout.
// TODO(voice) marks placeholder copy Terrence will rewrite in his own words.

export type Link = { label: string; href: string; note?: string }

export const profile = {
  name: 'Terrence Liang',
  legalName: 'Tianle',
  // TODO(voice): hero line
  tagline:
    'I build optimization and forecasting models for the power grid, and agent systems that do research.',
  school: 'Penn Engineering · B.S.E. Artificial Intelligence · 2030',
  email: 'ttliang@engineering.upenn.edu',
  personalEmail: 'tianle.liang16@gmail.com',
  github: 'https://github.com/tianleliang',
  linkedin: 'https://www.linkedin.com/in/tianle-liang/',
  resume: '/Terrence-Liang-Resume.pdf',
}

export const stats = [
  { value: '$10.4B', label: 'modeled losses avoided on a $5B plan' },
  { value: 'R² 0.94', label: 'hourly wind-power forecast' },
  { value: '4 + 1', label: 'papers published + in review' },
  { value: 'Top 6', label: 'international, M3 Challenge' },
]

export type Visual = 'frontier' | 'outage-map' | 'rayfield' | 'playbook' | 'agents'

export type Project = {
  id: string
  kicker: string
  title: string
  body: string
  metric: { value: string; label: string }
  stack: string[]
  links: Link[]
  pending?: string
  visual: Visual
}

export const lead: Project = {
  id: 'stanford',
  kicker: 'Stanford Systems Optimization Lab · with Prof. Michael Saunders',
  title: 'ERCOT Resilience Optimization',
  // TODO(voice)
  body:
    'Texas faces about $43B in modeled climate losses to its power plants through 2050. I built a nonlinear model that splits a resilience budget across 18 plant clusters and solved it with SNOPT. Then I ported the whole pipeline to a solver that runs in your browser and matches SNOPT to within $0.001M per cluster.',
  metric: { value: '$5B → $10.4B', label: 'losses avoided, 2.1× return, held above 1× in 300 of 300 Monte Carlo trials' },
  stack: ['AMPL', 'SNOPT', 'TypeScript', 'React', 'Monte Carlo'],
  links: [{ label: 'Open the live simulator', href: 'https://tianle-liang-ercot-optimization.vercel.app/' }],
  pending: 'Code public after lab approval',
  visual: 'frontier',
}

export const projects: Project[] = [
  {
    id: 'outage',
    kicker: 'Elsevier · Energy Reports',
    title: 'Forecasting Grid Outages from Climate Projections',
    // TODO(voice)
    body:
      'A three-stage pipeline on GFDL-CM4 projections: classify storms, predict outage probability, then predict severity. Keeping the stages separate kept each one interpretable.',
    metric: { value: '$1.4B → $1.58B', label: 'projected annual outage losses by 2030' },
    stack: ['Random forest', 'Logistic regression', 'Gradient boosting'],
    links: [{ label: 'Read the paper', href: 'https://doi.org/10.1016/j.egyr.2025.108985' }],
    visual: 'outage-map',
  },
  {
    id: 'rayfield',
    kicker: 'Rayfield Systems · Harvard Undergraduate Ventures',
    title: 'Wind Power Forecasting & Fault Detection',
    // TODO(voice)
    body:
      'I led 8 interns on 43,800 hourly records. A naive model leaks future data, so I built two passes: weather predicts a 6-hour power trend, which feeds an hourly XGBoost model. An Isolation Forest flags turbine faults.',
    metric: { value: 'R² 0.94', label: '85% of hourly predictions within ±0.10' },
    stack: ['XGBoost', 'scikit-learn', 'Isolation Forest', 'SHAP'],
    links: [],
    pending: 'Notebook going public this weekend',
    visual: 'rayfield',
  },
  {
    id: 'playbook',
    kicker: 'Personal project · in development',
    title: 'Playbook',
    // TODO(voice)
    body:
      'A second brain for hitting a goal. You set a goal, it maps your leverage, scans for opportunities that fit, and asks you to pick before it acts.',
    metric: { value: '7-stage', label: 'goal → plan → leverage → scan → select → act → review' },
    stack: ['Next.js', 'TypeScript', 'Supabase', 'LLM agents'],
    links: [
      { label: 'Code', href: 'https://github.com/tianleliang/alpha_playbook' },
      { label: 'Live V0', href: 'https://playbook-e8xd.onrender.com/welcome', note: 'may take a minute to wake' },
    ],
    visual: 'playbook',
  },
  {
    id: 'agents',
    kicker: 'Personal project',
    title: 'Agentic Research System',
    // TODO(voice)
    body:
      'I extended an open-source Claude Code framework into my own operating system across 600+ notes. I built scheduled research pipelines where four discovery agents run in parallel and a separate agent verifies their claims before anything reaches me.',
    metric: { value: '4 → 1', label: 'parallel discovery agents into one verifier, run daily' },
    stack: ['Claude Code', 'MCP', 'TypeScript', 'PowerShell'],
    links: [],
    pending: 'Writeup coming soon',
    visual: 'agents',
  },
]

export const experience = [
  {
    org: 'Stanford Systems Optimization Laboratory',
    role: 'Energy Optimization Researcher',
    when: 'Jul 2025 – Present',
    line: 'Resilience-investment model for ERCOT, mentored by Prof. Michael Saunders.',
    href: 'https://tianle-liang-ercot-optimization.vercel.app/',
  },
  {
    org: 'Rayfield Systems',
    role: 'Technical Intern, team lead',
    when: 'Jun – Jul 2025',
    line: 'Led 8 interns on wind forecasting and fault detection. Presented to the CEO.',
  },
  {
    org: 'NextGen Research Institute',
    role: 'Chief Technology Officer',
    when: 'Nov 2024 – Jun 2025',
    line: 'Research-matching platform for students and labs. 2K+ users across 3 continents.',
    href: 'https://ngresearch-kohl.vercel.app/',
    note: 'on hiatus',
  },
]

export const publications = [
  {
    title: 'A Multi-Stage Probabilistic Infrastructure for Outage Forecasting in the ERCOT Grid Using GFDL-CM4 Climate Projections',
    venue: 'Energy Reports (Elsevier)',
    status: 'Published',
    href: 'https://doi.org/10.1016/j.egyr.2025.108985',
  },
  {
    title: 'Ensemble Forecasting of ERCOT Efficiency and Residual Price Variability Using GFDL-CM4 Climate Projections',
    venue: 'Energy Reports (Elsevier)',
    status: 'In review',
    href: 'https://ssrn.com/abstract=5400605',
    linkLabel: 'Preprint',
  },
  {
    title: 'Optimizing Random Forest Multi-classification and Gini-Based Feature Analysis of Board Game Success via BGG Characteristic Data',
    venue: 'Springer LNCS · IFIP ICEC 2025, Tokyo',
    status: 'Published',
    href: 'https://link.springer.com/chapter/10.1007/978-3-032-02555-5_18',
  },
  {
    title: 'Applications of Machine Learning: Classifying Wheat Seeds through Neural Networks',
    venue: 'Scholarly Review',
    status: 'Published',
    href: 'https://doi.org/10.70121/001c.123777',
  },
  {
    title: 'Bridging the STEM Divide: Addressing Educational Disparity in Indiana',
    venue: 'Scholarly Review',
    status: 'Published',
    href: 'https://www.scholarlyreview.org/article/154601-bridging-the-stem-divide-addressing-educational-disparity-in-indiana',
  },
]

// Add `href` to any honor once a proof link exists.
export const honors: { title: string; detail: string; year: string; href?: string }[] = [
  { title: 'Top 6 International Finalist, MathWorks M3 Challenge', detail: 'Top 0.76%. $5K. Presented at Jane Street HQ.', year: '2025' },
  { title: 'Top 3 National Finalist, Sempra Foundation Climate Resilience Award', detail: 'Texas grid climate risk.', year: '2025' },
  { title: '3rd of 1,500+ teams, Innovate WithIN', detail: '$4.5K in startup grants.', year: '2025' },
  { title: '2nd Place, TSA National Conference', detail: 'Debating Technological Issues.', year: '2025' },
  { title: 'National Merit Scholar', detail: 'Ranked 5 of 575 in high school.', year: '' },
]
