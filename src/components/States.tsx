import type { ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Search, Warning } from './icons';

/** Card-shaped placeholder shown only after ~400ms of loading, so fast loads never flash. */
export function Skeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div aria-busy="true" aria-label="Loading" className={cn('flex flex-col gap-3.5 rounded-panel border border-hairline bg-panel p-6', className)}>
      <div className="flex justify-between">
        <span className="h-2.5 w-28 rounded-tag bg-raised" />
        <span className="h-2.5 w-16 rounded-tag bg-raised" />
      </div>
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} className="h-[18px] rounded-tag bg-raised" style={{ width: `${[100, 86, 60, 92, 70][i % 5]}%` }} />
      ))}
    </div>
  );
}

export interface EmptyStateProps {
  title: string;
  /** Say what belongs here and how to get it. */
  description: string;
  actions?: ReactNode;
  className?: string;
}

/** Never a blank area: what belongs here, why it is empty, and the next action. */
export function EmptyState({ title, description, actions, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col gap-3.5 rounded-panel bg-raised p-7', className)}>
      <Search size={28} className="text-ink-3" />
      <p className="m-0 text-statement text-ink">{title}</p>
      <p className="m-0 text-sm text-ink-2">{description}</p>
      {actions ? <div className="mt-1 flex flex-wrap gap-2.5">{actions}</div> : null}
    </div>
  );
}

export interface ErrorStateProps {
  /** Short, factual: "Couldn't load interview excerpts". */
  what: string;
  /** One sentence: why, and whether anything was lost. */
  detail: string;
  title?: string;
  actions?: ReactNode;
  className?: string;
}

/** What happened → why → what to do → whether data was saved. Announced to screen readers. */
export function ErrorState({ what, title, detail, actions, className }: ErrorStateProps) {
  return (
    <div role="alert" className={cn('flex flex-col gap-3.5 rounded-panel border border-hairline bg-panel p-7', className)}>
      <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-negative">
        <Warning size={16} />
        {what}
      </span>
      {title ? <p className="m-0 text-statement text-ink">{title}</p> : null}
      <p className="m-0 text-sm text-ink-2">{detail}</p>
      {actions ? <div className="mt-1 flex flex-wrap gap-2.5">{actions}</div> : null}
    </div>
  );
}
