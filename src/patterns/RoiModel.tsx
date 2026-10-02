import { useMemo, useState } from 'react';
import { cn } from '../lib/cn';
import { Info } from '../components/icons';
import { Button } from '../components/Button';
import { Slider } from '../components/Controls';
import { Label } from '../components/Primitives';
import { computeRoi, formatMoney, type RoiInputs } from './roi';

export interface RoiModelProps {
  /** Workshop values the model opens with and resets to. */
  defaults: RoiInputs;
  className?: string;
}

const W = 1000;
const H = 280;

function niceStep(range: number) {
  const rough = range / 5 || 1;
  const mag = 10 ** Math.floor(Math.log10(rough));
  return [1, 2, 2.5, 5, 10].map((f) => f * mag).find((x) => x >= rough) ?? mag * 10;
}
function tickLabel(v: number) {
  if (Math.abs(v) < 1) return '$0';
  const sign = v < 0 ? '−' : '';
  const a = Math.abs(v);
  return a >= 1e6 ? `${sign}$${Math.round(a / 1e5) / 10}M` : `${sign}$${Math.round(a / 1e3)}K`;
}

/** A live ROI model: drag the assumptions, see payback move. The assumptions are always on screen. */
export function RoiModel({ defaults, className }: RoiModelProps) {
  const [v, setV] = useState<RoiInputs>(defaults);
  const [hover, setHover] = useState<number | null>(null);
  const r = useMemo(() => computeRoi(v), [v]);
  const set = (k: keyof RoiInputs) => (n: number) => setV((s) => ({ ...s, [k]: n }));

  const lo0 = Math.min(0, ...r.cumulative);
  const hi0 = Math.max(0, ...r.cumulative);
  const step = niceStep(hi0 - lo0);
  const lo = Math.floor(lo0 / step) * step;
  const hi = Math.ceil(hi0 / step) * step || step;
  const months = r.cumulative.length - 1;
  const X = (m: number) => (m / months) * W;
  const Y = (val: number) => ((hi - val) / (hi - lo)) * H;
  const path = r.cumulative.map((c, m) => `${m ? 'L' : 'M'}${X(m).toFixed(1)} ${Y(c).toFixed(1)}`).join(' ');
  const area = `${path} L${W} ${Y(0).toFixed(1)} L0 ${Y(0).toFixed(1)} Z`;
  const ticks: number[] = [];
  for (let t = lo; t <= hi + step / 2; t += step) ticks.push(t);
  const pb = r.paybackMonth;
  const shown = hover ?? pb;

  return (
    <div className={cn('grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]', className)}>
      <div className="flex flex-col gap-5 rounded-panel border border-hairline bg-panel p-6">
        <div className="flex items-center justify-between gap-3">
          <Label>Assumptions</Label>
          <Button variant="ghost" size="sm" onClick={() => setV(defaults)}>Reset to workshop values</Button>
        </div>
        <Slider label="Claims a year" value={v.claimsPerYear} onValueChange={set('claimsPerYear')} min={10000} max={100000} step={1000} format={(n) => n.toLocaleString('en-US')} />
        <Slider label="Share eligible (low severity)" value={v.eligiblePct} onValueChange={set('eligiblePct')} min={10} max={60} format={(n) => `${n}%`} />
        <Slider label="Auto-approved without review" value={v.autoPct} onValueChange={set('autoPct')} min={50} max={95} format={(n) => `${n}%`} />
        <Slider label="Handling cost saved per claim" value={v.savedPerClaim} onValueChange={set('savedPerClaim')} min={50} max={250} step={5} format={(n) => `$${n}`} />
        <Slider label="Build cost" value={v.buildCost} onValueChange={set('buildCost')} min={300000} max={1500000} step={50000} format={formatMoney} />
        <Slider label="Run cost a year" value={v.runCostPerYear} onValueChange={set('runCostPerYear')} min={50000} max={400000} step={10000} format={formatMoney} />
      </div>

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 border-y border-hairline sm:grid-cols-3">
          <div className="flex flex-col gap-2 py-4 sm:pr-4"><Label>Annual benefit, gross</Label><span className="text-figure-l text-ink">{formatMoney(r.annualBenefit)}</span><span className="text-xs text-ink-2">once adoption is complete</span></div>
          <div className="flex flex-col gap-2 py-4 sm:border-l sm:border-hairline sm:px-4"><Label>Payback</Label><span className={cn('text-figure-l', pb ? 'text-ink' : 'text-negative')}>{pb ? `Month ${pb}` : 'Over 3 yrs'}</span><span className="text-xs text-ink-2">{pb ? `including the ${v.buildMonths ?? 3}-month build` : 'not within 36 months at these inputs'}</span></div>
          <div className="flex flex-col gap-2 py-4 sm:border-l sm:border-hairline sm:pl-4"><Label>Net value, 3 years</Label><span className="text-figure-l text-ink">{formatMoney(r.netAtHorizon)}</span><span className="text-xs text-ink-2">after build and run costs</span></div>
        </div>

        <figure className="m-0 flex flex-col gap-3">
          <figcaption className="flex flex-wrap justify-between gap-x-4 gap-y-1">
            <span className="text-base font-semibold text-ink">Cumulative net value by month</span>
            <span aria-live="polite" className="tabular text-xs font-semibold text-ink">
              {hover !== null ? `Month ${hover} · ${r.cumulative[hover] >= 0 ? '+' : ''}${formatMoney(r.cumulative[hover])}` : 'Hover the chart for any month'}
            </span>
          </figcaption>
          <div className="grid grid-cols-[56px_minmax(0,1fr)] grid-rows-[260px_24px]">
            <div className="relative">
              {ticks.map((t) => (
                <span key={t} className="tabular absolute right-2.5 -translate-y-1/2 whitespace-nowrap text-[11px] text-ink-3" style={{ top: `${((hi - t) / (hi - lo)) * 100}%` }}>{tickLabel(t)}</span>
              ))}
            </div>
            <div className="relative border-l border-hairline" onMouseLeave={() => setHover(null)}>
              {ticks.map((t) => (
                <span key={t} className={cn('absolute inset-x-0 h-0 border-t', Math.abs(t) < 1 ? 'border-ink-3' : 'border-hairline')} style={{ top: `${((hi - t) / (hi - lo)) * 100}%` }} />
              ))}
              <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 size-full overflow-visible">
                <path d={area} className="fill-signal opacity-10" />
                <path d={path} fill="none" className="stroke-signal" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
              {shown !== null ? (
                <>
                  {hover !== null ? <span className="absolute inset-y-0 w-0 border-l border-ink-3" style={{ left: `${(hover / months) * 100}%` }} /> : null}
                  <span className="absolute -ml-1.5 -mt-1.5 size-3 rounded-full bg-signal ring-2 ring-ground" style={{ left: `${(shown / months) * 100}%`, top: `${(Y(r.cumulative[shown]) / H) * 100}%` }} />
                  {hover === null && pb ? (
                    <span className="absolute -translate-y-[30px] translate-x-2.5 whitespace-nowrap rounded-tag bg-ground px-1.5 py-0.5 text-xs text-ink" style={{ left: `${(pb / months) * 100}%`, top: `${(Y(r.cumulative[pb]) / H) * 100}%` }}>
                      Pays back in month {pb}
                    </span>
                  ) : null}
                </>
              ) : null}
              {r.cumulative.slice(1).map((_, i) => (
                <span key={i} onMouseEnter={() => setHover(i + 1)} className="absolute inset-y-0" style={{ left: `${((i + 0.5) / months) * 100}%`, width: `${100 / months}%` }} />
              ))}
            </div>
            <span />
            <div className="tabular relative text-[11px] text-ink-3">
              {[0, 12, 24, 36].filter((m) => m <= months).map((m) => (
                <span key={m} className="absolute top-2 whitespace-nowrap" style={{ left: `${(m / months) * 100}%`, transform: m === 0 ? 'none' : m === months ? 'translateX(-100%)' : 'translateX(-50%)' }}>
                  {m === 0 ? 'Start' : `Year ${m / 12}`}
                </span>
              ))}
            </div>
          </div>
        </figure>

        <table className="w-full border-collapse text-[13px]">
          <caption className="mi-label pb-2 text-left text-ink-3">Cumulative net value · table view</caption>
          <thead>
            <tr>
              <th scope="col" className="border-b border-hairline-strong py-2 text-left font-semibold">End of</th>
              {r.yearEnds.map((y) => <th key={y.year} scope="col" className="border-b border-hairline-strong py-2 text-right font-semibold">Year {y.year}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="py-2 text-left font-normal text-ink-2">Net value</th>
              {r.yearEnds.map((y) => <td key={y.year} className="tabular py-2 text-right">{formatMoney(y.value)}</td>)}
            </tr>
          </tbody>
        </table>

        <p className="m-0 flex gap-2 text-[13px] text-ink-2">
          <Info className="mt-[3px] shrink-0" />
          <span>Illustrative model. Build runs months 1–{v.buildMonths ?? 3} with no benefit; adoption ramps to full over the next {v.rampMonths ?? 3} months. Benefit = claims ÷ 12 × eligible share × auto-approval rate × handling cost saved. Replace every input with validated client data before sharing.</span>
        </p>
      </div>
    </div>
  );
}
