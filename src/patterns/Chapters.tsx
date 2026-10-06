import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

/** Keeps an em dash with the word before it (a word joiner), so a wrapped line never starts with "—". */
export const keepDash = (t: ReactNode) => (typeof t === 'string' ? t.replace(/\s?—/g, '⁠—') : t);

/** A chapter's opening: one plain claim at display-m, in one tone, then one sentence of intro at reading measure. No
    eyebrow above it: the top bar or the rail already says where the reader is. The two-tone line belongs to the page's
    point of view (display-l), not to chapter titles. `children` sits under the intro. */
export function ChapterHeader({ claim, intro, children, className }: {
  claim: string;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn('flex flex-col gap-5', className)}>
      <h1 className="m-0 max-w-[30ch] text-display-m font-normal text-ink">{keepDash(claim)}</h1>
      {intro ? <p className="m-0 mi-measure text-body-l text-ink-2">{intro}</p> : null}
      {children}
    </header>
  );
}

/** The end of a chapter: its own question for the reader's team, with the main action beside it and the way on.
    A hairline above it; no band, no dots, no label. Write the question for this chapter: a closing line that would fit
    every page is a template talking. */
export function ChapterClose({ question, action, next, label = 'A question for your team', className }: {
  question: string;
  /** The main action, usually a LinkButton. */
  action?: ReactNode;
  /** The way on, usually a GoLink to the next chapter. */
  next?: ReactNode;
  /** The region's accessible name. */
  label?: string;
  className?: string;
}) {
  return (
    <section aria-label={label} className={cn('flex flex-col gap-6 border-t border-hairline pt-8 lg:flex-row lg:items-end lg:justify-between', className)}>
      <p className="m-0 max-w-[30ch] text-title text-ink">{question}</p>
      {action || next ? (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {action}
          {next}
        </div>
      ) : null}
    </section>
  );
}
