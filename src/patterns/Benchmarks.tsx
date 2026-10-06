import { cn } from '../lib/cn';

/* ---------- HarveyBall ---------- */
const BALL = ['', 'M9 9 L9 1 A8 8 0 0 1 17 9 Z', 'M9 9 L9 1 A8 8 0 0 1 9 17 Z', 'M9 9 L9 1 A8 8 0 1 1 1 9 Z', 'M9 1 A8 8 0 1 1 9 17 A8 8 0 1 1 9 1 Z'];
export const SCORE_NAMES = ['None', 'Basic', 'Partial', 'Strong', 'Leading'] as const;

/** A 0–4 score as a quarter-filled circle. Shape, not colour, carries the value; the name is announced. */
export function HarveyBall({ score, size = 18 }: { score: 0 | 1 | 2 | 3 | 4; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" role="img" aria-label={`${SCORE_NAMES[score]}, ${score} of 4`}>
      <circle cx="9" cy="9" r="8" fill="none" className="stroke-ink" strokeWidth="1.2" />
      {score > 0 ? <path d={BALL[score]} className="fill-ink" /> : null}
    </svg>
  );
}

/* ---------- CapabilityMatrix ---------- */
export interface CapabilityMatrixProps {
  caption: string;
  players: string[];
  rows: { capability: string; scores: (0 | 1 | 2 | 3 | 4)[] }[];
  /** Index of the column to highlight, usually the prospect (0). */
  highlight?: number;
  className?: string;
}

/** Capabilities × players, scored 0–4 with Harvey balls. A real table, so it reads row by row. */
export function CapabilityMatrix({ caption, players, rows, highlight = 0, className }: CapabilityMatrixProps) {
  return (
    <div tabIndex={0} role="region" aria-label={`${caption}. Scroll sideways for more players.`}
      className={cn('flex flex-col gap-4 overflow-x-auto outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus', className)}>
      <table className="w-full min-w-[640px] border-collapse">
        <caption className="pb-3.5 text-left text-ui-l font-semibold text-ink">{caption}</caption>
        <thead>
          <tr>
            <th scope="col" className="mi-label min-w-[200px] border-b border-hairline-strong py-2.5 pr-3 text-left text-ink-3">Capability</th>
            {players.map((p, i) => (
              <th key={p} scope="col" className={cn('w-[84px] border-b border-hairline-strong px-1.5 py-2.5 text-center text-ui-s', i === highlight ? 'bg-signal-soft font-semibold text-ink' : 'font-normal text-ink-2')}>
                {p}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.capability}>
              <th scope="row" className="border-b border-hairline py-3.5 pr-3 text-left font-normal text-ink">{r.capability}</th>
              {r.scores.map((s, i) => (
                <td key={i} className={cn('border-b border-hairline px-1.5 py-2.5 text-center', i === highlight && 'bg-signal-soft')}>
                  <span className="inline-flex"><HarveyBall score={s} /></span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-wrap gap-5 text-ui-s text-ink-2">
        {SCORE_NAMES.map((n, i) => (
          <span key={n} className="inline-flex items-center gap-2"><HarveyBall score={i as 0} size={14} />{i} {n}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- BenchmarkBars ---------- */
export interface BenchmarkBarsProps {
  title: string;
  source?: string;
  unit?: string;
  items: { label: string; value: number; highlight?: boolean }[];
  /** Axis maximum; defaults to the next multiple of 5 above the largest value. */
  max?: number;
  className?: string;
}

/** One measure across a few comparators: the story bar in violet, the rest in the neutral mark colour, every value labelled. */
export function BenchmarkBars({ title, source, unit, items, max, className }: BenchmarkBarsProps) {
  const top = max ?? Math.ceil(Math.max(...items.map((i) => i.value)) / 5) * 5;
  const ticks = Array.from({ length: Math.floor(top / 5) + 1 }, (_, i) => i * 5);
  return (
    <figure className={cn('m-0 flex flex-col gap-4', className)}>
      <figcaption className="flex flex-col gap-1.5">
        <span className="text-ui-l font-semibold text-ink">{title}</span>
        {source ? <span className="text-ui-s text-ink-2">{source}</span> : null}
      </figcaption>
      <div className="flex flex-col gap-3.5">
        {items.map((it) => (
          <div key={it.label} className="grid grid-cols-[116px_minmax(0,1fr)] items-center gap-3">
            <span className={cn(it.highlight ? 'font-semibold text-ink' : 'text-ink-2')}>{it.label}</span>
            <div className="flex items-center gap-2.5">
              <span className={cn('h-[18px] rounded-r-tag', it.highlight ? 'bg-signal' : 'bg-mark')} style={{ width: `${(it.value / top) * 80}%` }} />
              <span className={cn('tabular whitespace-nowrap', it.highlight ? 'font-semibold text-ink' : 'text-ink-2')}>
                {it.value.toFixed(1)}
                {unit ? ` ${unit}` : ''}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[116px_minmax(0,1fr)] gap-3">
        <span />
        <div className="tabular flex w-4/5 justify-between border-t border-hairline pt-1.5 text-[11px] text-ink-3">
          {ticks.map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>
    </figure>
  );
}
