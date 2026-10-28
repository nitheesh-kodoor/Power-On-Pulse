@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --bg: #07141f;
  --bg-alt: #0d1d2b;
  --panel: rgba(14, 28, 42, 0.95);
  --panel-strong: rgba(9, 18, 26, 1);
  --border: rgba(140, 170, 192, 0.2);
  --text: #ebf4ff;
  --muted: #9bb5ca;
  --healthy: #34d399;
  --faulted: #f87171;
  --isolated: #fbbf24;
  --restored: #60a5fa;
  --warning: #f59e0b;
  --critical: #f87171;
  --info: #7dd3fc;
  --shadow: 0 10px 24px rgba(3, 7, 18, 0.28);
}

* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  background: radial-gradient(circle at top, #0e2132, var(--bg) 55%);
  color: var(--text);
  font-family: 'Inter', sans-serif;
}

body {
  min-height: 100vh;
}

button {
  font: inherit;
}

.page-shell {
  max-width: 1500px;
  margin: 0 auto;
  padding: 28px 20px 40px;
}

.topbar, .header-cards, .content-grid, .panel-header, .tabset, .plan-grid, .resource-grid, .bottom-grid, .report-grid, .mini-grid, .approval-panel, .approval-actions {
  display: flex;
}

.topbar {
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding-bottom: 18px;
}

h1, h2, h3, h4, p {
  margin: 0;
}

h1 {
  font-size: clamp(2.1rem, 2.8vw, 3.1rem);
  letter-spacing: -0.04em;
}

.eyebrow {
  color: var(--info);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.status-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.pill {
  display: inline-flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.pill.warning,
.pill.faulted,
.pill.critical {
  background: rgba(248, 113, 113, 0.12);
  color: #fecaca;
  border-color: rgba(248, 113, 113, 0.32);
}

.pill.info,
.pill.restored {
  background: rgba(96, 165, 250, 0.12);
  color: #bfdbfe;
  border-color: rgba(96, 165, 250, 0.3);
}

.pill.muted,
.pill.healthy,
.pill.isolated {
  background: rgba(148, 163, 184, 0.12);
  color: #dbeafe;
  border-color: rgba(148, 163, 184, 0.25);
}

.pill.pending {
  background: rgba(245, 158, 11, 0.12);
  color: #fcd34d;
  border-color: rgba(245, 158, 11, 0.35);
}

.pill.recommended,
.pill.approved {
  background: rgba(52, 211, 153, 0.12);
  color: #a7f3d0;
  border-color: rgba(52, 211, 153, 0.3);
}

.pill.blocked {
  background: rgba(248, 113, 113, 0.12);
  color: #fee2e2;
  border-color: rgba(248, 113, 113, 0.3);
}

.header-cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 14px;
  margin: 18px 0 20px;
}

.metric-card, .panel, .plan-card, .resource-card, .report-box, .approval-card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: var(--shadow);
}

.metric-card {
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metric-card strong {
  font-size: clamp(1.4rem, 2vw, 2.2rem);
  letter-spacing: -0.04em;
}

.metric-card small,
.label,
.role-tag,
.resource-card p,
.report-box p,
.approval-card p,
.timeline-item p,
.ai-block p,
.plan-card p,
.incident-box li {
  color: var(--muted);
}

.label {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.content-grid {
  gap: 18px;
  align-items: stretch;
}

.panel {
  padding: 18px;
}

.large-panel {
  flex: 1.7;
}

.side-panel {
  flex: 0.9;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.panel-header {
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-bottom: 14px;
}

.panel-header.compact {
  padding-bottom: 10px;
}

.legend-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--muted);
  font-size: 0.75rem;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  display: inline-block;
}

.dot.healthy { background: var(--healthy); }
.dot.faulted { background: var(--faulted); }
.dot.isolated { background: var(--isolated); }
.dot.restored { background: var(--restored); }

.diagram-wrap {
  background: rgba(12, 20, 30, 0.75);
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
}

.sld {
  width: 100%;
  min-height: 320px;
  display: block;
}

.line {
  fill: none;
  stroke-width: 4;
  stroke-linecap: round;
}

.line.overhead {
  stroke: rgba(154, 212, 255, 0.95);
  stroke-dasharray: 10 8;
  marker-end: url(#arrow);
}

.line.cable {
  stroke: rgba(121, 145, 164, 0.92);
}

.node-box {
  fill: rgba(18, 28, 38, 0.9);
  stroke: rgba(149, 164, 184, 0.4);
  stroke-width: 1.4;
  cursor: pointer;
}

.node-box.selected {
  stroke: #7dd3fc;
  filter: drop-shadow(0 0 10px rgba(125, 211, 252, 0.65));
}

.node-box.source {
  fill: rgba(25, 55, 74, 0.9);
}

.status-healthy, .status-restored {
  fill: var(--healthy);
  stroke: rgba(255, 255, 255, 0.5);
  stroke-width: 1.5;
}

.status-faulted {
  fill: var(--faulted);
  stroke: rgba(255, 255, 255, 0.5);
  stroke-width: 1.5;
}

.status-isolated {
  fill: var(--isolated);
  stroke: rgba(255, 255, 255, 0.5);
  stroke-width: 1.5;
}

.node-box text, .sld text {
  fill: var(--text);
  font-size: 14px;
  font-weight: 600;
  text-anchor: middle;
}

.feeder-tag {
  cursor: pointer;
  fill: var(--text);
  font-size: 12px;
  font-weight: 700;
  text-anchor: start;
}

.incident-box {
  padding: 14px 14px 10px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: rgba(7, 20, 31, 0.8);
}

.incident-title {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 10px;
}

.incident-box ul {
  padding-left: 16px;
  margin: 0;
  display: grid;
  gap: 6px;
}

.mini-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  gap: 12px;
}

.mini-grid > div {
  padding: 12px 10px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(12, 20, 30, 0.8);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lower-panel {
  margin-top: 18px;
}

.tabs-row {
  align-items: center;
}

.tabset {
  gap: 8px;
  flex-wrap: wrap;
}

.tab {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: rgba(18, 28, 38, 0.7);
  color: var(--text);
  cursor: pointer;
}

.tab.active {
  background: rgba(125, 211, 252, 0.12);
  border-color: rgba(125, 211, 252, 0.35);
  color: #d7f3ff;
}

.plan-grid, .resource-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 18px;
}

.plan-card, .resource-card, .report-box, .approval-card {
  padding: 16px;
  text-align: left;
  color: var(--text);
}

.plan-card {
  background: rgba(8, 19, 29, 0.94);
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.plan-card:hover, .resource-card:hover {
  transform: translateY(-1px);
}

.plan-card.selected {
  border-color: rgba(125, 211, 252, 0.45);
  box-shadow: 0 0 0 1px rgba(125, 211, 252, 0.4);
}

.plan-header, .resource-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.stats-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 0.82rem;
  margin: 10px 0;
  color: var(--text);
}

.stats-row.small {
  font-size: 0.72rem;
  color: var(--muted);
}

.line-tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 8px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(9, 18, 26, 0.8);
  color: var(--text);
  font-size: 0.7rem;
}

.resource-card p,
.role-tag {
  margin-bottom: 8px;
}

.role-tag {
  display: inline-flex;
  align-items: center;
  background: rgba(14, 28, 42, 0.9);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 5px 8px;
  font-size: 0.7rem;
}

.approval-panel {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 18px;
  margin-top: 18px;
}

.approval-card ul {
  margin: 12px 0 0;
  padding-left: 16px;
  display: grid;
  gap: 8px;
}

.approval-actions {
  flex-direction: column;
  gap: 12px;
  justify-content: center;
}

.primary, .secondary, .ghost {
  border-radius: 12px;
  padding: 12px 14px;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 600;
}

.primary {
  background: linear-gradient(135deg, rgba(34,197,94,0.9), rgba(22,163,74,0.8));
  color: white;
}

.secondary {
  background: rgba(248, 113, 113, 0.12);
  color: #fecaca;
  border-color: rgba(248, 113, 113, 0.25);
}

.ghost {
  background: rgba(125, 211, 252, 0.08);
  color: #d9f2ff;
  border-color: rgba(125, 211, 252, 0.25);
}

.bottom-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 18px;
  margin-top: 18px;
}

.ai-box {
  margin-top: 16px;
  display: grid;
  gap: 12px;
}

.ai-block {
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(8, 18, 28, 0.9);
  padding: 12px 14px;
}

.ai-block h4 {
  margin-bottom: 8px;
  color: #dff6ff;
}

.timeline-list {
  margin-top: 16px;
  display: grid;
  gap: 12px;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(8, 18, 28, 0.9);
}

.severity {
  min-width: 72px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  border-radius: 999px;
  text-transform: uppercase;
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.severity.info { background: rgba(125, 211, 252, 0.12); color: #bae6fd; }
.severity.warning { background: rgba(245, 158, 11, 0.12); color: #fcd34d; }
.severity.success { background: rgba(52, 211, 153, 0.12); color: #bbf7d0; }
.severity.critical { background: rgba(248, 113, 113, 0.12); color: #fecaca; }

.muted-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.report-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 18px;
}

@media (max-width: 980px) {
  .header-cards, .plan-grid, .resource-grid, .bottom-grid, .report-grid, .approval-panel, .content-grid {
    grid-template-columns: 1fr;
    display: grid;
  }

  .content-grid {
    display: grid;
  }

  .tabset {
    justify-content: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
