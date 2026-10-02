import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeRoi, formatMoney } from '../src/patterns/roi.ts';

const workshop = { claimsPerYear: 42000, eligiblePct: 38, autoPct: 80, savedPerClaim: 135, buildCost: 850000, runCostPerYear: 180000 };

test('workshop values reproduce the figures shown in the brief', () => {
  const r = computeRoi(workshop);
  assert.equal(Math.round(r.annualBenefit), 1723680);
  assert.equal(r.paybackMonth, 11);
  assert.equal(Math.round(r.netAtHorizon), 3251480);
  assert.deepEqual(r.yearEnds.map((y) => formatMoney(y.value)), ['$164K', '$1.71M', '$3.25M']);
  assert.equal(formatMoney(r.cumulative[3]), '−$850K');
});

test('no payback within the horizon is reported as null', () => {
  const r = computeRoi({ ...workshop, eligiblePct: 10, autoPct: 50, savedPerClaim: 50, buildCost: 1500000, runCostPerYear: 400000 });
  assert.equal(r.paybackMonth, null);
});
