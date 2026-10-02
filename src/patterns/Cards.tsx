import type { ReactNode } from 'react';
import { cn } from '../lib/cn';
import { ArrowRight, BuildNew, Check, Evolve } from '../components/icons';
import { EvidenceMeter, Label, Tag } from '../components/Primitives';

/* ---------- InsightCard ---------- */
export interface Insight {
  id: string;
  stage: string;
  /** 1–5, see EvidenceMeter. */
  evidence: 1 | 2 | 3 | 4 | 5;
  evidenceDetail: string;
  /** One sentence, written as a claim. */
  statement: string;
  quote?: string;
  quoteBy?: string;
  tags?: string[];
  /** e.g. "2 linked opportunities" */
  linkLabel?: string;
  href?: string;
}
export interface InsightCardProps {
  insight: Insight;
  /** Shows the violet ring and an "Added to the brief" confirmation. */
  selected?: boolean;
  selectedNote?: string;
  className?: string;
}

/** A research insight: the claim, how well it is evidenced, the voice behind it, and where it leads. */
export function InsightCard({ insight: it, selected, selectedNote = 'Added to the brief', className }: InsightCardProps) {
  return (
    <article
      className={cn(
        'flex flex-col gap-4 rounded-panel border bg-panel p-[22px] transition-colors',
        selected ? 'border-transparent ring-2 ring-signal' : 'border-hairline hover:border-hairline-strong hover:bg-raised/40',
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <Label className="whitespace-nowrap">
          {it.id} · {it.stage}
        </Label>
        <EvidenceMeter level={it.evidence} detail={it.evidenceDetail} />
      </div>
      <p className="m-0 text-statement text-ink">{it.statement}</p>
      {it.quote ? (
        <p className="m-0 border-l border-hairline-strong pl-3.5 text-sm text-ink-2">
          “{it.quote}”{it.quoteBy ? ` — ${it.quoteBy}` : ''}
        </p>
      ) : null}
      <div className="mt-auto flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">{it.tags?.map((t) => <Tag key={t}>{t}</Tag>)}</div>
        {it.linkLabel ? (
          <a href={it.href ?? '#'} className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold text-ink no-underline hover:text-signal-text">
            {it.linkLabel}
            <ArrowRight size={12} />
          </a>
        ) : null}
      </div>
      {selected ? (
        <div className="flex items-center gap-2 border-t border-hairline pt-3 text-[13px] text-ink">
          <Check className="text-signal-text" />
          {selectedNote}
        </div>
      ) : null}
    </article>
  );
}

/* ---------- OpportunityCard ---------- */
export interface Opportunity {
  id: string;
  /** build = new technology built with us; evolve = AI-assisted ways of working. */
  kind: 'build' | 'evolve';
  title: string;
  today: string;
  future: string;
  metrics: { value: string; label: string }[];
  /** 1 Emerging · 2 Medium · 3 High */
  confidence: 1 | 2 | 3;
  timeToValue: string;
  insights?: string[];
  href?: string;
}
const CONFIDENCE = ['Emerging', 'Medium', 'High'] as const;
const KIND = { build: { label: 'Build new', Icon: BuildNew, tint: 'bg-tint-violet' }, evolve: { label: 'Evolve ways of working', Icon: Evolve, tint: 'bg-tint-mist' } };

/** An opportunity vignette in brief: today → with us, the value, the confidence and the time to value. */
export function OpportunityCard({ opportunity: op, className }: { opportunity: Opportunity; className?: string }) {
  const kind = KIND[op.kind];
  return (
    <article className={cn('flex flex-col overflow-hidden rounded-panel border border-hairline bg-panel', className)}>
      <div className={cn('flex flex-col gap-3.5 px-6 pb-5 pt-6', kind.tint)}>
        <div className="flex items-center justify-between gap-3">
          <Label tone="strong">{op.id}</Label>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink">
            <kind.Icon />
            {kind.label}
          </span>
        </div>
        <h3 className="m-0 text-title text-ink">{op.title}</h3>
      </div>
      <dl className="m-0 grid grid-cols-[64px_minmax(0,1fr)] gap-x-3 gap-y-2.5 border-t border-hairline px-6 py-5 text-sm">
        <dt className="mi-label pt-0.5 text-ink-3">Today</dt>
        <dd className="m-0 text-ink-2">{op.today}</dd>
        <dt className="mi-label pt-0.5 text-ink-3">With us</dt>
        <dd className="m-0 text-ink">{op.future}</dd>
      </dl>
      <div className="grid grid-cols-3 gap-3 px-6 pb-5">
        {op.metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-1.5 border-t border-hairline pt-3.5">
            <span className="whitespace-nowrap text-[22px] font-normal leading-none tracking-[-0.03em] text-ink">{m.value}</span>
            <span className="text-xs leading-snug text-ink-2">{m.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-3 border-t border-hairline px-6 py-4">
        <div className="flex items-center justify-between gap-3 text-[13px] text-ink-2">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="flex gap-0.5">
              {[1, 2, 3].map((i) => (
                <span key={i} className={cn('h-1.5 w-3.5 rounded-[2px]', i <= op.confidence ? 'bg-ink' : 'bg-hairline-strong')} />
              ))}
            </span>
            Confidence: {CONFIDENCE[op.confidence - 1]}
          </span>
          <span>{op.timeToValue}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-1.5">{op.insights?.map((i) => <Tag key={i}>{i}</Tag>)}</div>
          <a href={op.href ?? '#'} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink no-underline hover:text-signal-text">
            Open vignette
            <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </article>
  );
}

/* ---------- Figure ---------- */
/** A titled exhibit with a FIG label. Wrap every chart, map and matrix in one. */
export function Figure({ title, fig, source, children, className }: { title: string; fig?: string; source?: string; children: ReactNode; className?: string }) {
  return (
    <figure className={cn('m-0 flex flex-col gap-4 rounded-panel border border-hairline bg-panel p-[22px]', className)}>
      <figcaption className="flex items-baseline justify-between gap-3">
        <span className="text-[15px] font-semibold text-ink">{title}</span>
        {fig ? <Label>{fig}</Label> : null}
      </figcaption>
      {children}
      {source ? <span className="text-caption text-ink-3">{source}</span> : null}
    </figure>
  );
}
