import { Dialog } from '@base-ui/react/dialog';
import { useEffect, useId, useMemo, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Info, Search } from '../components/icons';
import { Logo } from '../components/Logo';
import { Label, Tag } from '../components/Primitives';

/* ---------- TopBar ---------- */
export interface TopBarProps {
  /** The product name set beside the Modus Create logo. Default "Insight Center". On phones a long name wraps onto two lines. */
  product?: string;
  /** A tag set after the product name on every page, e.g. "Example" or "Draft". Below 768px it sits under the name.
      Decorative: put its word in `brandLabel` too. */
  badge?: ReactNode;
  /** The brand link's accessible name. Default "Modus Create" + the product name. */
  brandLabel?: string;
  /** Who it's for, e.g."Prepared for [Prospect] · Commercial claims POV", when the product name doesn't already say. */
  context?: string;
  sections?: { label: string; href?: string; current?: boolean }[];
  /** Right-hand slot: Ask, Share, presenter switch. */
  actions?: ReactNode;
  className?: string;
}

/** The product bar: Modus Create logo + product name, context, section links and actions. Wraps on narrow screens rather than scrolling. */
export function TopBar({ product = 'Insight Center', badge, brandLabel, context, sections = [], actions, className }: TopBarProps) {
  return (
    <header className={cn('flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-hairline bg-ground px-4 py-2.5 sm:px-8', className)}>
      <div className="flex min-w-0 items-center gap-3.5">
        <a href="#" aria-label={brandLabel ?? `Modus Create ${product}`} className="inline-flex items-center gap-3 text-ui-m font-semibold text-ink no-underline sm:whitespace-nowrap">
          <Logo variant="glyph" label={null} className="h-[22px] sm:hidden" />
          <Logo label={null} className="hidden h-[18px] sm:block" />
          <span aria-hidden="true" className="h-5 w-px shrink-0 bg-hairline-strong" />
          <span aria-hidden="true" className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-3">
            <span className="max-w-[10rem] leading-[1.15] max-[359px]:max-w-[7rem] sm:max-w-none sm:leading-normal">{product}</span>
            {badge}
          </span>
        </a>
        {context ? <span className="hidden truncate text-ui-s text-ink-2 md:inline">{context}</span> : null}
      </div>
      {sections.length ? (
        <nav aria-label="Sections" className="flex flex-wrap gap-1">
          {sections.map((s) => (
            <a
              key={s.label}
              href={s.href ?? '#'}
              aria-current={s.current ? 'page' : undefined}
              className={cn('flex h-[34px] items-center rounded-pill px-3 text-ui-s no-underline', s.current ? 'bg-raised font-semibold text-ink' : 'text-ink-2 hover:text-ink')}
            >
              {s.label}
            </a>
          ))}
        </nav>
      ) : null}
      {actions ? <div className="flex items-center gap-2.5">{actions}</div> : null}
    </header>
  );
}

/* ---------- ChapterRail ---------- */
export interface Chapter {
  n: string;
  title: string;
  meta?: string;
  status: 'done' | 'current' | 'next';
  /** 0–1, current chapter only. */
  progress?: number;
  href?: string;
}

/** The walkthrough's sticky chapter index, with what has been read and where you are. */
export function ChapterRail({ chapters, className }: { chapters: Chapter[]; className?: string }) {
  const current = chapters.findIndex((c) => c.status === 'current');
  return (
    <nav aria-label="Chapters" className={cn('flex flex-col', className)}>
      <Label className="pb-4">
        Chapters{current >= 0 ? ` · ${current + 1} of ${chapters.length}` : ''}
      </Label>
      <ol className="m-0 flex list-none flex-col p-0">
        {chapters.map((c, i) => (
          <li key={c.n} className="grid grid-cols-[20px_minmax(0,1fr)] gap-3.5">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  'mt-[5px] size-3 shrink-0 rounded-full',
                  c.status === 'done' && 'bg-ink',
                  c.status === 'current' && 'bg-signal ring-4 ring-signal-soft',
                  c.status === 'next' && 'border-2 border-hairline-strong',
                )}
              />
              {i < chapters.length - 1 ? <span className={cn('w-0.5 flex-1', c.status === 'done' ? 'bg-ink' : 'bg-hairline-strong')} /> : null}
            </div>
            <a href={c.href ?? '#'} aria-current={c.status === 'current' ? 'step' : undefined} className="flex flex-col gap-1 pb-5 no-underline">
              <Label>
                {c.n} · {c.status === 'done' ? 'Read' : c.status === 'current' ? 'Reading now' : 'Up next'}
              </Label>
              <span className={cn('font-semibold', c.status === 'next' ? 'text-ink-2' : 'text-ink')}>{c.title}</span>
              {c.meta ? <span className="text-ui-s text-ink-2">{c.meta}</span> : null}
              {c.status === 'current' && c.progress !== undefined ? (
                <span className="mt-1.5 block h-1 overflow-hidden rounded-pill bg-hairline-strong" role="progressbar" aria-valuenow={Math.round(c.progress * 100)} aria-valuemin={0} aria-valuemax={100} aria-label={`${c.title} progress`}>
                  <span className="block h-1 bg-signal" style={{ width: `${c.progress * 100}%` }} />
                </span>
              ) : null}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ---------- SectionRail ---------- */
/** The sticky index beside a long page you dip into rather than read in order: ChapterRail's line of dots, the current
    one in violet, under one label ("On this page"), without its read/reading/up-next words. */
export function SectionRail({ label = 'On this page', items, current, className }: {
  label?: string;
  items: { id: string; name: string; href: string }[];
  /** Index of the section the reader is in. */
  current: number;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={cn('flex flex-col', className)}>
      <Label className="pb-4">{label}</Label>
      <ol className="m-0 flex list-none flex-col p-0">
        {items.map((it, i) => {
          const status = i < current ? 'done' : i === current ? 'current' : 'next';
          return (
            <li key={it.id} className="grid grid-cols-[14px_minmax(0,1fr)] gap-3.5">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    'mt-[5px] size-3 shrink-0 rounded-full',
                    status === 'done' && 'bg-ink',
                    status === 'current' && 'bg-signal ring-4 ring-signal-soft',
                    status === 'next' && 'border-2 border-hairline-strong',
                  )}
                />
                {i < items.length - 1 ? <span className={cn('w-0.5 flex-1', status === 'done' ? 'bg-ink' : 'bg-hairline-strong')} /> : null}
              </div>
              <a
                href={it.href}
                aria-current={status === 'current' ? 'location' : undefined}
                className={cn('pb-5 leading-snug no-underline', status === 'current' ? 'font-semibold text-ink' : 'text-ink-2 hover:text-ink')}
              >
                {it.name}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ---------- AskPalette ---------- */
export interface AskItem {
  id: string;
  title: string;
  where: string;
  group: string;
  href?: string;
}
export interface AskAnswer {
  text: string;
  /** e.g. "Drafted from 3 sources". */
  provenance: string;
  /** False until a person on the team has checked it; shown to the viewer. */
  reviewed: boolean;
  sources: string[];
}
export interface AskPaletteProps {
  items: AskItem[];
  /** An AI-drafted answer to the current query, if any. */
  answer?: AskAnswer;
  defaultQuery?: string;
  /** Render the panel inline (for docs and previews) instead of in a dialog. */
  inline?: boolean;
  onSelect?: (item: AskItem) => void;
  className?: string;
}

function AskPanel({ items, answer, defaultQuery = '', onSelect, onClose }: AskPaletteProps & { onClose?: () => void }) {
  const [query, setQuery] = useState(defaultQuery);
  const [active, setActive] = useState(0);
  const listId = useId();
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => `${i.id} ${i.title} ${i.where}`.toLowerCase().includes(q)) : items;
  }, [items, query]);
  const groups = useMemo(() => Array.from(new Set(filtered.map((i) => i.group))), [filtered]);
  const choose = (i: AskItem) => { onSelect?.(i); onClose?.(); };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    if (e.key === 'Enter' && filtered[active]) { e.preventDefault(); choose(filtered[active]); }
  };
  return (
    <div className="flex flex-col overflow-hidden rounded-panel border border-hairline-strong bg-panel shadow-overlay">
      <label className="flex h-[60px] items-center gap-3 border-b border-hairline px-5">
        <Search size={18} className="text-ink-2" />
        <span className="sr-only">Ask or jump to</span>
        <input
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={filtered[active] ? `${listId}-${filtered[active].id}` : undefined}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActive(0); }}
          onKeyDown={onKey}
          placeholder="Ask a question or jump to an insight, map or opportunity"
          className="min-w-0 flex-1 bg-transparent font-body text-ink outline-none placeholder:text-ink-3"
        />
        <kbd className="rounded-tag border border-hairline-strong px-1.5 font-body text-[11px] font-semibold text-ink-3">esc</kbd>
      </label>
      {answer && query ? (
        <div className="flex flex-col gap-2.5 border-b border-hairline bg-signal-soft px-5 py-4">
          <Label>Answer</Label>
          <p className="m-0 text-ink">{answer.text}</p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-ink-2">
              <Info size={13} />
              {answer.provenance} · {answer.reviewed ? 'reviewed by the team' : 'not yet reviewed by the team'}
            </span>
            <div className="flex gap-1.5">{answer.sources.map((s) => <Tag key={s}>{s}</Tag>)}</div>
          </div>
        </div>
      ) : null}
      <div id={listId} role="listbox" aria-label="Results" className="flex max-h-[340px] flex-col overflow-y-auto px-2 py-2.5">
        {filtered.length === 0 ? (
          <p className="m-0 px-3 py-6 text-ink-2">Nothing matches “{query}”. Try a stage (Triage), a persona (adjuster) or an ID (OPP-01).</p>
        ) : (
          groups.map((g) => (
            <div key={g} role="group" aria-label={g} className="flex flex-col py-1.5">
              <Label className="px-3 py-1.5">{g}</Label>
              {filtered.filter((i) => i.group === g).map((i) => {
                const idx = filtered.indexOf(i);
                return (
                  <div
                    key={i.id}
                    id={`${listId}-${i.id}`}
                    role="option"
                    aria-selected={idx === active}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => choose(i)}
                    className={cn('grid cursor-pointer grid-cols-[76px_minmax(0,1fr)_auto] items-center gap-3 rounded-control px-3 py-2.5', idx === active && 'bg-raised')}
                  >
                    <span className="text-[11px] font-semibold text-ink-3">{i.id}</span>
                    <span className="truncate text-ink">{i.title}</span>
                    <span className="text-ink-2">{i.where}</span>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
      <div className="flex flex-wrap justify-between gap-4 border-t border-hairline px-5 py-3 text-ink-2">
        <span className="flex gap-4"><span>↑ ↓ to move</span><span>↵ to open</span><span>esc to close</span></span>
        <span>Answers cite their sources</span>
      </div>
    </div>
  );
}

/** "Ask the Insight Center": search plus an AI answer that is labelled as unreviewed until a person checks it. Opens with ⌘K. */
export function AskPalette(props: AskPaletteProps) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (props.inline) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [props.inline]);
  if (props.inline) return <div className={cn('w-full max-w-[720px]', props.className)}><AskPanel {...props} /></div>;
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="inline-flex h-8 cursor-pointer items-center gap-2 rounded-pill border border-control-edge px-3.5 text-ui-s font-semibold text-ink hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus">
        Ask
        <kbd className="rounded-tag border border-hairline-strong px-1 font-body text-[11px] text-ink-3">⌘K</kbd>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-ink/30 backdrop-blur-[2px]" />
        <Dialog.Popup className="fixed left-1/2 top-[12vh] w-[min(720px,calc(100vw-32px))] -translate-x-1/2 outline-none">
          <Dialog.Title className="sr-only">Ask or jump to</Dialog.Title>
          <AskPanel {...props} onClose={() => setOpen(false)} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
