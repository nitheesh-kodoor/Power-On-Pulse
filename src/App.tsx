import { useMemo, useState } from 'react';

type FeederState = 'healthy' | 'faulted' | 'isolated' | 'restored';
type PlanStatus = 'recommended' | 'pending' | 'blocked' | 'approved';

type NetworkFeeder = {
  id: string;
  name: string;
  state: FeederState;
  loadMw: number;
  customers: number;
  criticalCustomers: number;
  color: string;
  x: number;
  y: number;
  sections: { id: string; label: string; from: string; to: string; status: FeederState }[];
};

type Incident = {
  id: string;
  feeder: string;
  section: string;
  summary: string;
  customers: number;
  criticalServices: number;
  interruptedMw: number;
  durationMinutes: number;
  priority: string;
  status: 'Active' | 'Isolated' | 'Restoring' | 'Restored';
};

type Plan = {
  id: string;
  name: string;
  status: PlanStatus;
  restoredMw: number;
  remainingMw: number;
  customerImpact: number;
  criticalServices: number;
  crew: string[];
  generator: string;
  etaMinutes: number;
  score: number;
  blocked: string[];
  notes: string;
};

type Resource = {
  id: string;
  name: string;
  role: string;
  qualification: string;
  status: 'Available' | 'Assigned' | 'Traveling' | 'On-site';
  incidents: string[];
};

type Generator = {
  id: string;
  name: string;
  capacityMw: number;
  eligibleBy: string[];
  status: 'Available' | 'Deploying' | 'Running';
  approval: 'Pending' | 'Approved' | 'Not required';
};

type TimelineEntry = {
  time: string;
  actor: string;
  event: string;
  severity: 'info' | 'warning' | 'success' | 'critical';
};

const feeders: NetworkFeeder[] = [
  {
    id: 'F1',
    name: 'Feeder F1',
    state: 'faulted',
    loadMw: 21,
    customers: 2800,
    criticalCustomers: 18,
    color: '#f97316',
    x: 170,
    y: 140,
    sections: [
      { id: 'F1-S1', label: 'F1-S1', from: 'R1', to: 'T1', status: 'healthy' },
      { id: 'F1-S2', label: 'F1-S2', from: 'T1', to: 'T2', status: 'faulted' },
      { id: 'F1-S3', label: 'F1-S3', from: 'T2', to: 'L1', status: 'isolated' },
      { id: 'F1-S4', label: 'F1-S4', from: 'L1', to: 'L2', status: 'healthy' },
    ],
  },
  {
    id: 'F2',
    name: 'Feeder F2',
    state: 'isolated',
    loadMw: 18,
    customers: 2200,
    criticalCustomers: 11,
    color: '#f59e0b',
    x: 320,
    y: 260,
    sections: [
      { id: 'F2-S1', label: 'F2-S1', from: 'R1', to: 'T3', status: 'healthy' },
      { id: 'F2-S2', label: 'F2-S2', from: 'T3', to: 'T4', status: 'isolated' },
      { id: 'F2-S3', label: 'F2-S3', from: 'T4', to: 'L3', status: 'isolated' },
      { id: 'F2-S4', label: 'F2-S4', from: 'L3', to: 'L4', status: 'healthy' },
    ],
  },
  {
    id: 'F3',
    name: 'Feeder F3',
    state: 'healthy',
    loadMw: 24,
    customers: 3100,
    criticalCustomers: 21,
    color: '#22c55e',
    x: 500,
    y: 150,
    sections: [
      { id: 'F3-S1', label: 'F3-S1', from: 'R2', to: 'T5', status: 'healthy' },
      { id: 'F3-S2', label: 'F3-S2', from: 'T5', to: 'T6', status: 'healthy' },
      { id: 'F3-S3', label: 'F3-S3', from: 'T6', to: 'L5', status: 'healthy' },
      { id: 'F3-S4', label: 'F3-S4', from: 'L5', to: 'L6', status: 'healthy' },
    ],
  },
];

const incidents: Incident[] = [
  {
    id: 'INC-2045',
    feeder: 'F1',
    section: 'T1-T2',
    summary: 'Feeder F1 earth fault detected near transformer T2 corridor.',
    customers: 940,
    criticalServices: 6,
    interruptedMw: 7.4,
    durationMinutes: 18,
    priority: 'Critical',
    status: 'Active',
  },
  {
    id: 'INC-2049',
    feeder: 'F2',
    section: 'T3-T4',
    summary: 'Multiple breaker trip on F2 after lightning event near rural section.',
    customers: 820,
    criticalServices: 4,
    interruptedMw: 6.9,
    durationMinutes: 26,
    priority: 'High',
    status: 'Isolated',
  },
];

const plans: Plan[] = [
  {
    id: 'A',
    name: 'Plan A — Transfer via Tie 2',
    status: 'recommended',
    restoredMw: 11.2,
    remainingMw: 2.7,
    customerImpact: 520,
    criticalServices: 4,
    crew: ['Crew 3', 'Crew 8'],
    generator: 'LVDG-02',
    etaMinutes: 58,
    score: 92,
    blocked: [],
    notes: 'Feeder F1 restored through tie with F3 while keeping F2 isolated for the fault current check.',
  },
  {
    id: 'B',
    name: 'Plan B — LVDG support + partial restoration',
    status: 'pending',
    restoredMw: 8.6,
    remainingMw: 5.3,
    customerImpact: 650,
    criticalServices: 3,
    crew: ['Crew 4', 'Crew 7'],
    generator: 'G-17',
    etaMinutes: 72,
    score: 81,
    blocked: ['Generator travel delay', 'No stable tie path to F2'],
    notes: 'Alternative that reduces customer impact but delays restoration by more than 15 minutes.',
  },
  {
    id: 'C',
    name: 'Plan C — Delayed network restoration',
    status: 'blocked',
    restoredMw: 5.1,
    remainingMw: 8.8,
    customerImpact: 710,
    criticalServices: 2,
    crew: ['Crew 2'],
    generator: 'G-09',
    etaMinutes: 96,
    score: 68,
    blocked: ['Insufficient supply path after faulted section validation', 'Crew qualification mismatch on F2'],
    notes: 'Conventional option keeps radiality and avoids a high-risk tie but does not meet the target recovery window.',
  },
];

const staff: Resource[] = [
  { id: 'S1', name: 'N. Alhammadi', role: 'Control Engineer', qualification: 'Control', status: 'Available', incidents: ['INC-2045'] },
  { id: 'S2', name: 'M. Salem', role: 'Field Supervisor', qualification: 'FOE', status: 'Traveling', incidents: ['INC-2049'] },
  { id: 'S3', name: 'A. Yousif', role: 'Switching Crew', qualification: 'Switching', status: 'Available', incidents: [] },
  { id: 'S4', name: 'F. Rashid', role: 'Switching Crew', qualification: 'Switching', status: 'Assigned', incidents: ['INC-2045'] },
  { id: 'S5', name: 'K. Badr', role: 'Protection Technician', qualification: 'Protection', status: 'On-site', incidents: ['INC-2049'] },
];

const generators: Generator[] = [
  { id: 'G-17', name: 'G-17', capacityMw: 5.5, eligibleBy: ['F1'], status: 'Available', approval: 'Pending' },
  { id: 'LVDG-02', name: 'LVDG-02', capacityMw: 8.0, eligibleBy: ['F1', 'F2'], status: 'Deploying', approval: 'Approved' },
  { id: 'G-09', name: 'G-09', capacityMw: 4.2, eligibleBy: ['F2'], status: 'Available', approval: 'Not required' },
];

const timeline: TimelineEntry[] = [
  { time: '07:42', actor: 'SCADA', event: 'Feeder F1 trip event recorded at 07:42 local time.', severity: 'critical' },
  { time: '07:44', actor: 'AI Monitor', event: 'Likely fault section narrowed to T1-T2 segment using protective device pattern.', severity: 'warning' },
  { time: '07:46', actor: 'Control Engineer', event: 'Switching approval request raised for isolation at T1 and tie validation.', severity: 'info' },
  { time: '07:52', actor: 'Field Crew', event: 'Crew confirmed site access and validated circuit status.', severity: 'success' },
  { time: '07:55', actor: 'Resource Desk', event: 'LVDG-02 recommended for restoration support; approval pending.', severity: 'warning' },
];

const weather = {
  label: 'Hot-dry, gusting crosswind',
  temperature: '42°C',
  humidity: '22%',
  wind: '24 km/h',
  effect: 'Limited personnel heat stress management required for extended field work.',
};

const viewOptions = ['Overview', 'Feeds', 'Resources', 'Approval', 'Report'];

function formatState(label: FeederState) {
  const map: Record<FeederState, string> = {
    healthy: 'Healthy',
    faulted: 'Faulted',
    isolated: 'Isolated',
    restored: 'Restored',
  };
  return map[label] ?? label;
}

function App() {
  const [selectedFeeder, setSelectedFeeder] = useState<string>('F1');
  const [selectedPlan, setSelectedPlan] = useState<string>('A');
  const [approvalState, setApprovalState] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [activeTab, setActiveTab] = useState<string>('Overview');

  const selectedFeederData = feeders.find((feeder) => feeder.id === selectedFeeder) ?? feeders[0];
  const selectedPlanData = plans.find((plan) => plan.id === selectedPlan) ?? plans[0];

  const totalInterruptedMw = useMemo(
    () => incidents.reduce((sum, incident) => sum + incident.interruptedMw, 0),
    [],
  );

  const totalCustomers = useMemo(
    () => incidents.reduce((sum, incident) => sum + incident.customers, 0),
    [],
  );

  function exportScenario() {
    const rows = [
      ['Incident ID', 'Feeder', 'Section', 'Interrupted MW', 'Customers', 'Priority', 'Status'],
      ...incidents.map((item) => [
        item.id,
        item.feeder,
        item.section,
        String(item.interruptedMw),
        String(item.customers),
        item.priority,
        item.status,
      ]),
    ];

    const csv = rows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'power-on-pulse-scenario.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <div>
          <div className="eyebrow">Synthetic Offline Demonstration</div>
          <h1>Power On Pulse</h1>
        </div>
        <div className="status-cluster">
          <span className="pill warning">2 active incidents</span>
          <span className="pill info">Approval pending</span>
          <span className="pill muted">No live SCADA/DMS</span>
        </div>
      </header>

      <section className="header-cards">
        <article className="metric-card">
          <span className="label">Interrupted load</span>
          <strong>{totalInterruptedMw.toFixed(1)} MW</strong>
          <small>Across F1 and F2</small>
        </article>
        <article className="metric-card">
          <span className="label">Affected customers</span>
          <strong>{totalCustomers}</strong>
          <small>Estimated in outage area</small>
        </article>
        <article className="metric-card">
          <span className="label">Critical services</span>
          <strong>10</strong>
          <small>Hospitals, pumping and telecom</small>
        </article>
        <article className="metric-card">
          <span className="label">Restoration queue</span>
          <strong>Plan A</strong>
          <small>ETA 58 minutes</small>
        </article>
      </section>

      <main className="content-grid">
        <section className="panel large-panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Network / SLD</span>
              <h2>Distribution state</h2>
            </div>
            <div className="legend-row">
              <span className="legend-item"><i className="dot healthy" />Healthy</span>
              <span className="legend-item"><i className="dot faulted" />Faulted</span>
              <span className="legend-item"><i className="dot isolated" />Isolated</span>
              <span className="legend-item"><i className="dot restored" />Restored</span>
            </div>
          </div>

          <div className="diagram-wrap">
            <svg viewBox="0 0 700 420" className="sld" aria-label="Synthetic single line diagram">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#9ad4ff" />
                </marker>
              </defs>

              <line x1="120" y1="90" x2="250" y2="90" className="line overhead" />
              <line x1="250" y1="90" x2="360" y2="160" className="line overhead" />
              <line x1="360" y1="160" x2="510" y2="120" className="line overhead" />
              <line x1="250" y1="90" x2="330" y2="280" className="line cable" />

              <g className="node-block">
                <rect x="70" y="70" width="56" height="42" rx="8" className="node-box source" />
                <text x="98" y="95">Source</text>
              </g>

              <g className="node-block">
                <rect x="250" y="70" width="70" height="42" rx="8" className={selectedFeeder === 'F1' ? 'node-box selected' : 'node-box'} onClick={() => setSelectedFeeder('F1')} />
                <text x="285" y="95">T1</text>
              </g>

              <g className="node-block">
                <rect x="330" y="250" width="70" height="42" rx="8" className={selectedFeeder === 'F2' ? 'node-box selected' : 'node-box'} onClick={() => setSelectedFeeder('F2')} />
                <text x="365" y="275">T3</text>
              </g>

              <g className="node-block">
                <rect x="500" y="100" width="70" height="42" rx="8" className={selectedFeeder === 'F3' ? 'node-box selected' : 'node-box'} onClick={() => setSelectedFeeder('F3')} />
                <text x="534" y="125">T5</text>
              </g>

              {feeders.map((feeder) => (
                <g key={feeder.id} className="feeder-group">
                  <circle cx={feeder.x} cy={feeder.y} r="9" className={`status-${feeder.state}`} />
                  <text x={feeder.x + 16} y={feeder.y + 5} className="feeder-tag" onClick={() => setSelectedFeeder(feeder.id)}>
                    {feeder.name}
                  </text>
                </g>
              ))}

              <g>
                <path d="M 150 200 L 240 200 M 240 200 L 250 200" className="line cable" />
                <circle cx="250" cy="200" r="6" className="status-faulted" />
                <text x="255" y="180">Faulted section</text>
              </g>
            </svg>
          </div>
        </section>

        <aside className="panel side-panel">
          <div className="panel-header compact">
            <div>
              <span className="eyebrow">Active incident</span>
              <h2>{selectedFeederData.name}</h2>
            </div>
            <span className={`pill ${selectedFeederData.state}`}>{formatState(selectedFeederData.state)}</span>
          </div>

          <div className="incident-box">
            <p className="incident-title">{incidents[0].summary}</p>
            <ul>
              <li><strong>Likely fault section:</strong> {incidents[0].section}</li>
              <li><strong>Affected load:</strong> {incidents[0].interruptedMw.toFixed(1)} MW</li>
              <li><strong>Customers:</strong> {incidents[0].customers}</li>
              <li><strong>Critical services:</strong> {incidents[0].criticalServices}</li>
            </ul>
          </div>

          <div className="mini-grid">
            <div>
              <span className="label">Crew availability</span>
              <strong>4/5</strong>
            </div>
            <div>
              <span className="label">Weather</span>
              <strong>{weather.temperature}</strong>
            </div>
            <div>
              <span className="label">Generator</span>
              <strong>LVDG-02</strong>
            </div>
            <div>
              <span className="label">Approval</span>
              <strong>{approvalState === 'approved' ? 'Approved' : 'Pending'}</strong>
            </div>
          </div>
        </aside>
      </main>

      <section className="panel lower-panel">
        <div className="panel-header tabs-row">
          <div>
            <span className="eyebrow">Operational workflow</span>
            <h2>Restoration and approvals</h2>
          </div>
          <div className="tabset">
            {viewOptions.map((option) => (
              <button
                key={option}
                className={activeTab === option ? 'tab active' : 'tab'}
                onClick={() => setActiveTab(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'Overview' && (
          <div className="plan-grid">
            {plans.map((plan) => (
              <button
                key={plan.id}
                className={selectedPlan === plan.id ? 'plan-card selected' : 'plan-card'}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="plan-header">
                  <strong>{plan.name}</strong>
                  <span className={`pill ${plan.status}`}>{plan.status}</span>
                </div>
                <div className="stats-row">
                  <span>Restore {plan.restoredMw.toFixed(1)} MW</span>
                  <span>ETA {plan.etaMinutes} min</span>
                </div>
                <div className="stats-row small">
                  <span>Score {plan.score}</span>
                  <span>{plan.customers ?? 'Customers'} affected</span>
                </div>
                <p>{plan.notes}</p>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'Feeds' && (
          <div className="resource-grid">
            {feeders.map((feeder) => (
              <div key={feeder.id} className="resource-card">
                <div className="resource-head">
                  <strong>{feeder.name}</strong>
                  <span className={`pill ${feeder.state}`}>{formatState(feeder.state)}</span>
                </div>
                <div className="stats-row small">
                  <span>{feeder.loadMw} MW</span>
                  <span>{feeder.customers} customers</span>
                </div>
                <div className="timeline-list muted-list">
                  {feeder.sections.map((section) => (
                    <span key={section.id} className="line-tag">
                      {section.label}: {formatState(section.status)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Resources' && (
          <div className="resource-grid">
            {staff.map((member) => (
              <div key={member.id} className="resource-card">
                <div className="resource-head">
                  <strong>{member.name}</strong>
                  <span className="role-tag">{member.qualification}</span>
                </div>
                <p>{member.role}</p>
                <div className="stats-row small">
                  <span>{member.status}</span>
                  <span>{member.incidents.length} active incidents</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Approval' && (
          <div className="approval-panel">
            <div className="approval-card">
              <h3>Selected plan: {selectedPlanData.name}</h3>
              <p>{selectedPlanData.notes}</p>
              <ul>
                <li>Required staff: {selectedPlanData.crew.join(', ')}</li>
                <li>Generator support: {selectedPlanData.generator}</li>
                <li>Estimation: {selectedPlanData.etaMinutes} minutes</li>
                <li>Blocked checks: {selectedPlanData.blocked.length ? selectedPlanData.blocked.join('; ') : 'None'}</li>
              </ul>
            </div>
            <div className="approval-actions">
              <button className="primary" onClick={() => setApprovalState('approved')}>Approve simulated switching</button>
              <button className="secondary" onClick={() => setApprovalState('rejected')}>Reject plan</button>
              <button className="ghost" onClick={() => exportScenario()}>Export CSV</button>
            </div>
          </div>
        )}

        {activeTab === 'Report' && (
          <div className="report-grid">
            <div className="report-box">
              <h3>Executive review</h3>
              <p>Restoration target remains achievable through controlled tie transfer with generator support. The recommended path keeps the faulted section isolated and reduces critical-service interruption to the minimum viable window.</p>
              <p>Deterministic simulation only: this is not a validated field safety study or a production protection-coordination case.</p>
            </div>
            <div className="report-box">
              <h3>Weather and logistics</h3>
              <p>{weather.label}</p>
              <p>Wind: {weather.wind} | Humidity: {weather.humidity}</p>
              <p>{weather.effect}</p>
            </div>
          </div>
        )}
      </section>

      <section className="bottom-grid">
        <div className="panel">
          <div className="panel-header compact">
            <div>
              <span className="eyebrow">AI Incident Copilot</span>
              <h2>Ask Power On Pulse</h2>
            </div>
          </div>
          <div className="ai-box">
            <div className="ai-block">
              <h4>Observed simulated facts</h4>
              <p>Feeder F1 remains faulted in the T1-T2 corridor. Feeder F2 remains isolated after a lightning-related trip. Both incidents are within the synthetic network model.</p>
            </div>
            <div className="ai-block">
              <h4>Calculated results</h4>
              <p>Plan A yields the highest feasibility score and fastest estimated restoration time while keeping the faulted section isolated and preserving radiality constraints.</p>
            </div>
            <div className="ai-block">
              <h4>Assumptions</h4>
              <p>Weather and crew travel assumptions are synthetic and intended for a demonstration only. The system does not connect to live operational data or field communication channels.</p>
            </div>
            <div className="ai-block">
              <h4>Suggestions</h4>
              <p>Approve the tie transfer once the control engineer confirms breaker readiness and generator support remains available.</p>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header compact">
            <div>
              <span className="eyebrow">Timeline</span>
              <h2>Approval and event log</h2>
            </div>
          </div>
          <div className="timeline-list">
            {timeline.map((entry) => (
              <div key={`${entry.time}-${entry.event}`} className="timeline-item">
                <span className={`severity ${entry.severity}`}>{entry.severity}</span>
                <div>
                  <strong>{entry.time}</strong>
                  <div>{entry.actor}</div>
                  <p>{entry.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
