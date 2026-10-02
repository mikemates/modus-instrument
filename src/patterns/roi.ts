/** Inputs to the straight-through-processing ROI model. Money in dollars. */
export interface RoiInputs {
  claimsPerYear: number;
  /** Share of claims eligible, 0–100. */
  eligiblePct: number;
  /** Share of eligible claims approved without review, 0–100. */
  autoPct: number;
  /** Handling cost saved per auto-approved claim. */
  savedPerClaim: number;
  buildCost: number;
  runCostPerYear: number;
  /** Months of build with no benefit. */
  buildMonths?: number;
  /** Months to ramp linearly to full benefit after build. */
  rampMonths?: number;
  horizonMonths?: number;
}

export interface RoiResult {
  /** Gross benefit per year at full adoption. */
  annualBenefit: number;
  /** First month cumulative net value is ≥ 0, or null within the horizon. */
  paybackMonth: number | null;
  /** Cumulative net value by month, index 0 = start (0). */
  cumulative: number[];
  netAtHorizon: number;
  yearEnds: { year: number; value: number }[];
}

/**
 * Cumulative net value by month. Build cost is spread over the build months with no benefit;
 * adoption then ramps to full over `rampMonths` (month 1 of the ramp = 1/ramp of full benefit);
 * run cost accrues from the first month after build.
 */
export function computeRoi(i: RoiInputs): RoiResult {
  const buildMonths = i.buildMonths ?? 3;
  const rampMonths = i.rampMonths ?? 3;
  const horizon = i.horizonMonths ?? 36;
  const fullMonthly = (i.claimsPerYear / 12) * (i.eligiblePct / 100) * (i.autoPct / 100) * i.savedPerClaim;
  const cumulative = [0];
  let cum = 0;
  let paybackMonth: number | null = null;
  for (let m = 1; m <= horizon; m++) {
    let benefit = 0;
    let cost = 0;
    if (m <= buildMonths) {
      cost = i.buildCost / buildMonths;
    } else {
      const k = m - buildMonths;
      benefit = fullMonthly * Math.min(1, k / rampMonths);
      cost = i.runCostPerYear / 12;
    }
    cum += benefit - cost;
    cumulative.push(cum);
    if (paybackMonth === null && m > buildMonths && cum >= 0) paybackMonth = m;
  }
  const yearEnds = [];
  for (let y = 1; y * 12 <= horizon; y++) yearEnds.push({ year: y, value: cumulative[y * 12] });
  return { annualBenefit: fullMonthly * 12, paybackMonth, cumulative, netAtHorizon: cum, yearEnds };
}

/** $1.72M · $164K · −$850K */
export function formatMoney(v: number) {
  const sign = v < 0 ? '−' : '';
  const a = Math.abs(v);
  if (a >= 1e6) return `${sign}$${(a / 1e6).toFixed(2)}M`;
  if (a >= 1e3) return `${sign}$${Math.round(a / 1e3)}K`;
  return `${sign}$${Math.round(a)}`;
}
