import { Fragment } from 'react';
import { cn } from '../lib/cn';
import { ArrowRight, Queue, Star, Warning } from '../components/icons';
import { Label } from '../components/Primitives';

/* ---------- ValueStream ---------- */
export interface ValueStep {
  name: string;
  owner: string;
  systems?: string;
  /** Process (work) time as people say it: "25 min", "6 h". */
  processTime: string;
  /** Process time in working days, for the to-scale bar (8h = 1 day). */
  processDays: number;
  /** Queue time before this step, in days. */
  waitDays: number;
  /** The step whose queue is the story. One per map. */
  bottleneck?: boolean;
}
export interface ValueStreamProps {
  steps: ValueStep[];
  className?: string;
}

export function valueStreamSummary(steps: ValueStep[]) {
  const wait = steps.reduce((n, s) => n + s.waitDays, 0);
  const work = steps.reduce((n, s) => n + s.processDays, 0);
  const lead = wait + work;
  return { wait, work, lead, flowEfficiency: work / lead };
}

/** Value stream map: process boxes, the wait-and-work ladder, and the same lead time drawn to scale. */
export function ValueStream({ steps, className }: ValueStreamProps) {
  const { work, lead, flowEfficiency } = valueStreamSummary(steps);
  const hot = steps.find((s) => s.bottleneck);
  const pct = (d: number) => `${(d / lead) * 100}%`;
  return (
    <div className={cn('flex flex-col gap-8', className)}>
      {/* Focusable so keyboards can scroll it (WCAG 2.1.1); named for screen readers. */}
      <div tabIndex={0} role="region" aria-label="Value stream. Scroll sideways for more steps." className="overflow-x-auto outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus">
        <div className="min-w-[980px]">
          <div className="grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
            {steps.map((s, i) => (
              <div key={s.name} className="relative pr-[26px]">
                <div className={cn('flex min-h-[148px] flex-col gap-1.5 rounded-panel p-3.5', s.bottleneck ? 'bg-signal-soft ring-[1.5px] ring-signal ring-inset' : 'border border-hairline bg-panel')}>
                  <Label>{String(i + 1).padStart(2, '0')}</Label>
                  <span className="font-semibold leading-tight text-ink [overflow-wrap:anywhere]">{s.name}</span>
                  <span className="flex-1" />
                  <span className="text-ink-2">{s.owner}</span>
                  {s.systems ? <span className="text-ink-2">{s.systems}</span> : null}
                  <span className="tabular font-semibold text-ink">PT {s.processTime}</span>
                </div>
                {i < steps.length - 1 ? <ArrowRight size={16} className="absolute right-[5px] top-[66px] text-ink-3" /> : null}
              </div>
            ))}
          </div>
          <div role="img" aria-label="Ladder: waiting time above the line, work time below, for each step" className="mt-11 grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
            {steps.map((s, i) => (
              <div key={s.name} className="flex h-[52px]">
                <div className={cn('relative flex-[45] border-r-2 border-t-2 border-r-ink-3', s.bottleneck ? 'border-t-signal' : 'border-t-ink-3')}>
                  <span className={cn('tabular absolute -top-[26px] left-0 inline-flex items-center gap-1.5 whitespace-nowrap', s.bottleneck ? 'font-semibold text-signal-text' : 'text-ink-2')}>
                    <Queue size={11} />
                    {s.waitDays.toFixed(1)} d
                  </span>
                </div>
                <div className={cn('relative flex-[55] border-b-2 border-b-ink', i < steps.length - 1 && 'border-r-2 border-r-ink-3')}>
                  <span className="tabular absolute -bottom-6 left-2 whitespace-nowrap text-ink-2">{s.processTime}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-9 flex justify-between text-ink-2">
            <span>Above the line: waiting in a queue (days)</span>
            <span>Below the line: someone working on it</span>
          </div>
        </div>
      </div>
      <figure className="m-0 flex flex-col gap-3.5 border-t border-hairline pt-7">
        <figcaption className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="text-ui-l font-semibold text-ink">The same {lead.toFixed(1)} days, to scale</span>
          <Label>Waiting by step, then total work time</Label>
        </figcaption>
        <div role="img" aria-label={`Lead time ${lead.toFixed(1)} days: waiting ${((1 - flowEfficiency) * 100).toFixed(1)} percent${hot ? `, of which ${hot.name} ${((hot.waitDays / lead) * 100).toFixed(1)} percent` : ''}; work ${(flowEfficiency * 100).toFixed(1)} percent`} className="flex h-10 gap-0.5">
          {steps.map((s, i) => (
            <div key={s.name} className={cn('flex items-center overflow-visible px-2.5', s.bottleneck ? 'bg-signal' : 'bg-mark', i === 0 && 'rounded-l-tag')} style={{ width: pct(s.waitDays) }}>
              {s.bottleneck ? <span className="tabular hidden whitespace-nowrap font-semibold text-on-signal md:inline">{s.name} queue · {s.waitDays.toFixed(1)} d</span> : null}
            </div>
          ))}
          <div className="flex items-center rounded-r-tag bg-ink px-2.5" style={{ width: pct(work) }}>
            <span className="hidden font-semibold text-ground lg:inline">Work</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 text-ui-s text-ink-2">
          <span className="inline-flex items-center gap-2"><span className="size-3 rounded-[3px] bg-mark" />Waiting · {((1 - flowEfficiency) * 100).toFixed(1)}%</span>
          {hot ? <span className="inline-flex items-center gap-2"><span className="size-3 rounded-[3px] bg-signal" />Bottleneck: {hot.name.toLowerCase()} queue · {((hot.waitDays / lead) * 100).toFixed(1)}%</span> : null}
          <span className="inline-flex items-center gap-2"><span className="size-3 rounded-[3px] bg-ink" />Work · {(flowEfficiency * 100).toFixed(1)}%</span>
        </div>
      </figure>
    </div>
  );
}

/* ---------- ServiceBlueprint ---------- */
export interface BlueprintCell {
  text: string;
  /** pain = a numbered pain point; moment = a moment that matters. */
  kind?: 'pain' | 'moment';
  /** "P1 · Re-keying" for pains; "Moment that matters" for moments. */
  badge?: string;
}
export interface BlueprintLane {
  name: string;
  description: string;
  cells: BlueprintCell[];
}
export interface ServiceBlueprintProps {
  phases: { name: string; time?: string }[];
  /** Customer actions, frontstage, backstage, support systems — in that order. */
  lanes: BlueprintLane[];
  /** Labels for the lines between lanes, e.g. "Line of visibility". */
  lines?: string[];
  className?: string;
}

/** Service blueprint as a lane × phase grid, with the lines of interaction and visibility between lanes. */
export function ServiceBlueprint({ phases, lanes, lines = ['Line of interaction', 'Line of visibility', 'Line of internal interaction'], className }: ServiceBlueprintProps) {
  const cols = { gridTemplateColumns: `168px repeat(${phases.length}, minmax(0, 1fr))` };
  return (
    <div tabIndex={0} role="region" aria-label="Service blueprint. Scroll sideways for more phases." className={cn('overflow-x-auto outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus', className)}>
      <div className="flex min-w-[960px] flex-col gap-2.5">
        <div className="mb-1 flex flex-wrap gap-6 text-ui-s text-ink-2">
          <span className="inline-flex items-center gap-2"><Star className="text-signal-text" />Moment that matters</span>
          <span className="inline-flex items-center gap-2"><Warning className="text-negative" />Pain point, numbered by impact</span>
        </div>
        <div className="grid gap-x-3" style={cols}>
          <span />
          {phases.map((p, i) => (
            <div key={p.name} className="flex flex-col gap-1 border-b-2 border-ink pb-3">
              <Label>{String(i + 1).padStart(2, '0')}</Label>
              <span className="text-ui-l font-semibold text-ink">{p.name}</span>
              {p.time ? <span className="text-ink-2">{p.time}</span> : null}
            </div>
          ))}
        </div>
        {lanes.map((lane, li) => (
          <Fragment key={lane.name}>
            <div className="grid items-stretch gap-x-3" style={cols}>
              <div className="flex flex-col gap-1 pt-2.5">
                <span className="font-semibold text-ink">{lane.name}</span>
                <span className="leading-snug text-ink-2">{lane.description}</span>
              </div>
              {lane.cells.map((c, ci) => (
                <div
                  key={ci}
                  className={cn(
                    'flex min-h-[84px] flex-col gap-1.5 rounded-panel px-3.5 py-3 text-ui-s leading-snug',
                    c.kind === 'pain' && 'bg-panel ring-[1.5px] ring-negative ring-inset',
                    c.kind === 'moment' && 'bg-signal-soft ring-[1.5px] ring-signal ring-inset',
                    !c.kind && 'border border-hairline bg-panel',
                  )}
                >
                  {c.kind === 'pain' ? <span className="inline-flex items-center gap-1.5 font-semibold text-negative"><Warning size={12} />{c.badge}</span> : null}
                  {c.kind === 'moment' ? <span className="inline-flex items-center gap-1.5 font-semibold text-signal-text"><Star size={12} />{c.badge ?? 'Moment that matters'}</span> : null}
                  <span className="text-ink">{c.text}</span>
                </div>
              ))}
            </div>
            {li < lanes.length - 1 && lines[li] ? (
              <div className="flex items-center gap-3 py-0.5">
                <Label className="whitespace-nowrap">{lines[li]}</Label>
                <span className="h-0 flex-1 border-t border-hairline-strong" />
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
