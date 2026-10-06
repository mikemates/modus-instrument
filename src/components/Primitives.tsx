import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

/** Uppercase annotation: eyebrows, FIG numbers, table heads. `tone="strong"` for labels on tinted fills. */
export function Label({ children, tone = 'muted', className, ...rest }: HTMLAttributes<HTMLSpanElement> & { tone?: 'muted' | 'strong' }) {
  return (
    <span className={cn('mi-label', tone === 'muted' ? 'text-ink-3' : 'text-ink-2', className)} {...rest}>
      {children}
    </span>
  );
}

/** A small uppercase tag for personas, stages and categories. Never a status on its own. */
export function Tag({ children, className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-tag border border-hairline bg-raised px-[7px] py-[3px] text-tag uppercase text-ink-2',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

/** The panel every content block sits on: hairline border, 10px radius, no shadow. */
export function Card({ children, className, as: As = 'div', ...rest }: HTMLAttributes<HTMLElement> & { as?: 'div' | 'article' | 'section' | 'figure' }) {
  return (
    <As className={cn('rounded-panel border border-hairline bg-panel', className)} {...rest}>
      {children}
    </As>
  );
}

export interface EvidenceMeterProps {
  /** 1 Anecdote · 2 Emerging · 3 Moderate · 4 Strong · 5 Validated */
  level: 1 | 2 | 3 | 4 | 5;
  /** What the evidence is, e.g. "9 of 12 interviews". */
  detail?: string;
  className?: string;
}
export const EVIDENCE_LEVELS = ['Anecdote', 'Emerging', 'Moderate', 'Strong', 'Validated'] as const;

/** Five bars for how well an insight is supported. Always shows the word too, never bars alone. */
export function EvidenceMeter({ level, detail, className }: EvidenceMeterProps) {
  const word = EVIDENCE_LEVELS[level - 1];
  return (
    <span className={cn('inline-flex items-center gap-2 text-ink-2', className)}>
      <span aria-hidden="true" className="flex items-end gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={cn('h-3 w-1 rounded-[1px]', i <= level ? 'bg-ink' : 'bg-hairline-strong')} />
        ))}
      </span>
      <span>
        {word}
        {detail ? ` · ${detail}` : ''}
      </span>
    </span>
  );
}

export interface StatTileProps {
  label: string;
  value: ReactNode;
  /** Unit set smaller after the value, e.g. "days". */
  unit?: string;
  note?: string;
  /** A signed comparison. Direction is shown by icon and words, never colour alone. */
  delta?: { text: string; direction: 'up' | 'down'; good: boolean };
  size?: 'm' | 'l' | 'xl';
  highlight?: boolean;
  className?: string;
}

/** A headline number with its label and source. One tile per view, unless it reads a model's results. */
export function StatTile({ label, value, unit, note, delta, size = 'l', highlight, className }: StatTileProps) {
  const fig = size === 'xl' ? 'text-figure-xl' : size === 'l' ? 'text-figure-l' : 'text-figure-m';
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label>{label}</Label>
      <span className={cn(fig, highlight ? 'text-signal-text' : 'text-ink')}>
        {value}
        {unit ? <span className="ml-1 text-[0.32em] tracking-[-0.01em] text-ink-2">{unit}</span> : null}
      </span>
      {note ? <span className="text-ui-s text-ink-2">{note}</span> : null}
      {delta ? (
        <span className="inline-flex items-center gap-1.5 text-ui-s text-ink-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true" className={delta.good ? 'stroke-positive' : 'stroke-negative'}>
            {delta.direction === 'up' ? <path d="M7 11V3M3.5 6.5 7 3l3.5 3.5" /> : <path d="M7 3v8M3.5 7.5 7 11l3.5-3.5" />}
          </svg>
          <span className="font-semibold text-ink">{delta.text}</span>
        </span>
      ) : null}
    </div>
  );
}
