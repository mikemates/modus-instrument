/* Illustrative sample engagement (commercial property claims) used by the demo and the Design System previews.
   Every figure is made up. Replace with a real engagement's data; keep "[Prospect]" until a client is named. */
import type { Insight, Opportunity } from '../patterns/Cards';
import type { Chapter, AskItem, AskAnswer } from '../patterns/Navigation';
import type { ValueStep, BlueprintLane } from '../patterns/Maps';
import type { RoiInputs } from '../patterns/roi';

export const insights: Insight[] = [
  { id: 'INS-04', stage: 'Intake', evidence: 4, evidenceDetail: '9 of 12 interviews', statement: 'Adjusters re-key the same loss details into three systems before their first call with the insured.', quote: 'By the time I call the insured I’ve typed their address four times.', quoteBy: 'Field adjuster, Midwest', tags: ['Field adjuster', 'FNOL'], linkLabel: '2 linked opportunities' },
  { id: 'INS-07', stage: 'Investigation', evidence: 4, evidenceDetail: '14 of 18 policyholders', statement: 'Policyholders judge a claim by its longest silence, not by its total length.', quote: 'Nobody told me anything for nine days. That’s the part I remember.', quoteBy: 'Policyholder, small business', tags: ['Policyholder', 'Status'], linkLabel: '1 linked opportunity' },
  { id: 'INS-11', stage: 'Triage', evidence: 5, evidenceDetail: 'interviews + data', statement: 'Low-severity claims follow the same path as complex ones, so simple claims queue behind hard ones.', quote: 'A cracked window gets the same file as a warehouse fire.', quoteBy: 'Claims supervisor', tags: ['Supervisor', 'Routing'], linkLabel: '3 linked opportunities' },
];

export const opportunities: Opportunity[] = [
  { id: 'OPP-01', kind: 'build', title: 'Straight-through processing for low-severity claims', today: 'Every claim takes the full path — 22 days on average, whatever its size.', future: 'Claims under a threshold are verified, estimated and paid automatically in under 48 hours.', metrics: [{ value: '$1.7M', label: 'a year in handling cost, gross' }, { value: '−6 d', label: 'average cycle time, all claims' }, { value: '38%', label: 'of claims eligible' }], confidence: 2, timeToValue: '12-week pilot', insights: ['INS-11', 'INS-04'] },
  { id: 'OPP-02', kind: 'evolve', title: 'Adjuster copilot for intake and documentation', today: 'Adjusters re-key each loss into three systems — about 25 minutes a claim.', future: 'A copilot drafts the claim file from the call, photos and policy; the adjuster reviews and signs.', metrics: [{ value: '≈14K h', label: 'adjuster hours a year returned' }, { value: '−20 min', label: 'per claim at intake' }, { value: '1', label: 'system of entry, not three' }], confidence: 3, timeToValue: '8-week pilot', insights: ['INS-04'] },
  { id: 'OPP-03', kind: 'build', title: 'Proactive status, so no claim goes silent', today: 'Policyholders hear from us only when they call to ask.', future: 'Every step change sends an update; no claim goes more than three days without news.', metrics: [{ value: '−30%', label: '“where’s my claim?” calls, to validate' }, { value: '≤3 d', label: 'longest silence, down from 9' }, { value: '[X] pts', label: 'satisfaction lift, to measure' }], confidence: 1, timeToValue: '6-week build', insights: ['INS-07'] },
];

export const valueStream: ValueStep[] = [
  { name: 'Intake', owner: 'Broker or agent', systems: '2 systems', processTime: '25 min', processDays: 25 / 480, waitDays: 0.5 },
  { name: 'Triage and coverage', owner: 'Claims handler', systems: '2 systems', processTime: '40 min', processDays: 40 / 480, waitDays: 2.0 },
  { name: 'Assignment', owner: 'Supervisor', systems: '1 system', processTime: '10 min', processDays: 10 / 480, waitDays: 1.5 },
  { name: 'Investigation', owner: 'Field adjuster', systems: '3 systems', processTime: '6 h', processDays: 360 / 480, waitDays: 8.0, bottleneck: true },
  { name: 'Estimate and reserve', owner: 'Adjuster', systems: '2 systems', processTime: '3 h', processDays: 180 / 480, waitDays: 4.0 },
  { name: 'Approval', owner: 'Claims manager', systems: '1 system', processTime: '30 min', processDays: 30 / 480, waitDays: 3.0 },
  { name: 'Payment', owner: 'Finance', systems: '1 system', processTime: '20 min', processDays: 20 / 480, waitDays: 2.0 },
];

export const blueprintPhases = [
  { name: 'Report the loss', time: 'Day 0–1' },
  { name: 'Triage', time: 'Day 1–4' },
  { name: 'Investigate', time: 'Day 4–12' },
  { name: 'Settle', time: 'Day 12–19' },
  { name: 'Pay', time: 'Day 19–22' },
];
export const blueprintLanes: BlueprintLane[] = [
  { name: 'Customer actions', description: 'What the policyholder does', cells: [{ text: 'Calls their broker or files online' }, { text: 'Waits for a callback, often 2+ days' }, { text: 'Emails photos, invoices and receipts' }, { text: 'Reviews and questions the estimate' }, { text: 'Receives payment by cheque or transfer' }] },
  { name: 'Frontstage', description: 'What they see and hear from us', cells: [{ text: 'Broker or agent captures first notice' }, { text: 'Adjuster’s first call', kind: 'moment' }, { text: 'Site inspection and photos' }, { text: 'Adjuster explains the estimate', kind: 'moment' }, { text: 'Payment notice letter' }] },
  { name: 'Backstage', description: 'What happens out of sight', cells: [{ text: 'Details re-keyed into the claims core', kind: 'pain', badge: 'P1 · Re-keying' }, { text: 'Manual coverage check', kind: 'pain', badge: 'P2 · Waiting' }, { text: 'Documents chased by email' }, { text: 'Reserve sits in an approval queue', kind: 'pain', badge: 'P3 · No owner' }, { text: 'Weekly batch payment run' }] },
  { name: 'Support systems', description: 'Tools and data underneath', cells: [{ text: 'Policy admin · CRM' }, { text: 'Claims core' }, { text: 'Shared inbox · document store' }, { text: 'Estimating tool' }, { text: 'Finance ledger' }] },
];

export const matrix = {
  caption: 'Digital claims capability, scored 0–4',
  players: ['[Prospect]', 'Peer A', 'Peer B', 'Peer C', 'Digital-native'],
  rows: [
    { capability: 'Digital first notice with photo and video', scores: [2, 3, 2, 3, 4] },
    { capability: 'Automated triage and routing', scores: [1, 2, 3, 2, 4] },
    { capability: 'Proactive status updates', scores: [1, 2, 1, 3, 4] },
    { capability: 'Straight-through for low severity', scores: [0, 1, 2, 1, 4] },
    { capability: 'Adjuster mobile workbench', scores: [2, 3, 2, 2, 3] },
    { capability: 'Instant digital payment', scores: [1, 2, 2, 3, 4] },
  ] as { capability: string; scores: (0 | 1 | 2 | 3 | 4)[] }[],
};

export const benchmark = {
  title: 'Days from first notice to first payment',
  source: 'Median, property claims under $25K · [Benchmark source, year]',
  items: [
    { label: '[Prospect]', value: 22.4, highlight: true },
    { label: 'Peer median', value: 12.8 },
    { label: 'Top quartile', value: 7.5 },
    { label: 'Digital-native', value: 3.1 },
  ],
};

export const chapters: Chapter[] = [
  { n: '01', title: 'What we heard', meta: '24 insights · 5 min', status: 'done' },
  { n: '02', title: 'How it works today', meta: 'Blueprint and value stream · 8 min', status: 'current', progress: 0.4 },
  { n: '03', title: 'Where value leaks', meta: '3 bottlenecks · 4 min', status: 'next' },
  { n: '04', title: 'How you compare', meta: '6 capabilities, 4 peers · 3 min', status: 'next' },
  { n: '05', title: 'What to build', meta: '3 opportunities · 6 min', status: 'next' },
];

export const askItems: AskItem[] = [
  { id: 'INS-12', title: 'Reserve approvals wait for a weekly committee review', where: 'Settle', group: 'Insights' },
  { id: 'INS-09', title: 'Managers approve from email on their phones, then re-key', where: 'Settle', group: 'Insights' },
  { id: 'VSM 06', title: 'Value stream · Approval step, 3.0 days waiting', where: 'Chapter 03', group: 'Maps' },
  { id: 'SB P3', title: 'Service blueprint · Reserve sits in an approval queue', where: 'Chapter 02', group: 'Maps' },
  { id: 'OPP-01', title: 'Straight-through processing for low-severity claims', where: 'Chapter 05', group: 'Opportunities' },
];
export const askAnswer: AskAnswer = {
  text: 'Reserve approvals wait for a weekly committee review. The median wait is 3.0 days, and no single role owns the queue.',
  provenance: 'Drafted from 3 sources',
  reviewed: false,
  sources: ['INS-12', 'P3', 'VSM 06'],
};

export const roiDefaults: RoiInputs = {
  claimsPerYear: 42000,
  eligiblePct: 38,
  autoPct: 80,
  savedPerClaim: 135,
  buildCost: 850000,
  runCostPerYear: 180000,
};
