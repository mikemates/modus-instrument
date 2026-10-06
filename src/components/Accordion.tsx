import { useState, type ReactNode } from 'react';
import { ChevronDown } from './icons';
import { cn } from '../lib/cn';

/* Accordion rows are actions, so they carry the violet: a white chevron in a filled violet disc, the same fill as a
   primary button, so filled violet always means "you can act here". The name stays in ink and turns violet on hover.
   The disc and its gap take 24px, so what sits under the name lines up with it at `pl-6`. */

/** The mark at the start of an accordion row: the chevron points right while closed and down while open.
    `size` "sm" suits a 14px row name (dense grids), "md" a 15px one. Put `group` on the row so hover reaches it. */
export function RowMark({ open, size = 'md' }: { open: boolean; size?: 'sm' | 'md' }) {
  return (
    <span aria-hidden="true" className={cn('grid size-[18px] shrink-0 place-items-center rounded-full bg-action text-on-action transition-colors duration-150 group-hover:bg-action-hover', size === 'md' && 'mt-px')}>
      <ChevronDown size={12} className={cn('transition-transform duration-150', !open && '-rotate-90')} />
    </span>
  );
}

export interface AccordionItem {
  id: string;
  title: ReactNode;
  /** Sits after the title, e.g. a Tag. */
  tag?: ReactNode;
  /** One line shown while closed, cut off with an ellipsis, so the row reads as more to come. */
  preview: string;
  content: ReactNode;
}

/** Closed rows that open in place: the name after its violet mark, and a one-line preview of what's inside. While a
    row is closed a click anywhere on it opens it; the button carries the state for keyboards and screen readers. */
export function AccordionList({ items, idPrefix, className }: { items: AccordionItem[]; idPrefix: string; className?: string }) {
  return (
    <div className={cn('flex flex-col border-b border-hairline', className)}>
      {items.map((it) => <AccordionRow key={it.id} item={it} panelId={`${idPrefix}-${it.id}`} />)}
    </div>
  );
}

function AccordionRow({ item, panelId }: { item: AccordionItem; panelId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={open ? undefined : () => setOpen(true)} className={cn('flex flex-col gap-2 border-t border-hairline py-4', !open && 'group cursor-pointer')}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        className="flex w-full cursor-pointer items-start gap-1.5 text-left text-ui-m font-semibold leading-snug text-ink group-hover:text-signal-text focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
      >
        <RowMark open={open} />
        <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">{item.title}{item.tag}</span>
      </button>
      <div id={panelId} className="pl-6">
        {open ? <div className="pt-1">{item.content}</div> : <span className="block truncate text-ui-s leading-5 text-ink-3">{item.preview}</span>}
      </div>
    </div>
  );
}
