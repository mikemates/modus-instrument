import { Field } from '@base-ui/react/field';
import { Tabs } from '@base-ui/react/tabs';
import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { Slider as BaseSlider } from '@base-ui/react/slider';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { Toggle } from '@base-ui/react/toggle';
import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Moon, Search, Sun } from './icons';

/* ---------- TextField ---------- */
export interface TextFieldProps {
  label: string;
  /** Hide the label visually but keep it for screen readers (e.g. a search box with an icon). */
  hideLabel?: boolean;
  placeholder?: string;
  description?: string;
  error?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  /** Adds a search icon and a ⌘K hint. */
  search?: boolean;
  className?: string;
}

/** A labelled input on Base UI Field. Errors sit under the field, say what to do, and keep the input. */
export function TextField({ label, hideLabel, placeholder, description, error, defaultValue, value, onValueChange, search, className }: TextFieldProps) {
  return (
    <Field.Root invalid={!!error} className={cn('flex max-w-[var(--layout-measure)] flex-col gap-1.5', className)}>
      <Field.Label className={cn('font-medium text-ink-2', hideLabel && 'sr-only')}>{label}</Field.Label>
      <span className="flex h-9 items-center gap-2 rounded-control border border-control-edge bg-panel px-3 text-ink-3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus data-[invalid]:border-negative">
        {search ? <Search /> : null}
        <Field.Control
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onValueChange={onValueChange ? (v: string) => onValueChange(v) : undefined}
          className="min-w-0 flex-1 bg-transparent text-ui-s text-ink outline-none placeholder:text-ink-3"
        />
        {search ? <kbd className="rounded-tag border border-hairline-strong px-1.5 font-body text-[11px] font-semibold text-ink-3">⌘K</kbd> : null}
      </span>
      {description && !error ? <Field.Description className="text-ink-3">{description}</Field.Description> : null}
      {error ? <span role="alert" className="font-medium text-negative">{error}</span> : null}
    </Field.Root>
  );
}

/* ---------- SegmentedTabs ---------- */
export interface TabItem {
  value: string;
  label: string;
  content?: ReactNode;
}
export interface SegmentedTabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  /** Accessible name for the tab list. */
  label: string;
  className?: string;
}

/** Pill-shaped tabs on Base UI Tabs, for switching content type (Insights · Maps · Opportunities). */
export function SegmentedTabs({ items, defaultValue, value, onValueChange, label, className }: SegmentedTabsProps) {
  return (
    <Tabs.Root
      defaultValue={defaultValue ?? items[0]?.value}
      value={value}
      onValueChange={onValueChange ? (v: unknown) => onValueChange(String(v)) : undefined}
      className={cn('flex flex-col gap-4', className)}
    >
      <Tabs.List aria-label={label} className="inline-flex w-fit gap-0.5 rounded-pill border border-hairline bg-panel p-[3px]">
        {items.map((it) => (
          <Tabs.Tab
            key={it.value}
            value={it.value}
            className="h-[30px] cursor-pointer rounded-pill px-3.5 text-ui-s font-medium text-ink-2 transition-colors hover:text-ink data-[active]:bg-raised data-[active]:font-semibold data-[active]:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {it.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {items.some((i) => i.content)
        ? items.map((it) => (
            <Tabs.Panel key={it.value} value={it.value} className="outline-none">
              {it.content}
            </Tabs.Panel>
          ))
        : null}
    </Tabs.Root>
  );
}

/* ---------- Switch ---------- */
export interface SwitchProps {
  label: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

/** On/off setting on Base UI Switch, e.g. Presenter mode or Site motion. The label is always visible. */
export function Switch({ label, defaultChecked, checked, onCheckedChange, className }: SwitchProps) {
  return (
    <label className={cn('inline-flex cursor-pointer items-center gap-2.5 text-ui-s text-ink-2', className)}>
      <BaseSwitch.Root
        defaultChecked={defaultChecked}
        checked={checked}
        onCheckedChange={onCheckedChange ? (c: boolean) => onCheckedChange(c) : undefined}
        className="relative h-[18px] w-[30px] shrink-0 rounded-pill bg-hairline-strong transition-colors data-[checked]:bg-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        <BaseSwitch.Thumb className="block size-3.5 translate-x-0.5 rounded-full bg-panel shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-transform data-[checked]:translate-x-[14px] data-[checked]:bg-on-signal" />
      </BaseSwitch.Root>
      {label}
    </label>
  );
}

/* ---------- Slider ---------- */
export interface SliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  /** How the current value reads, e.g. v => `${v}%`. */
  format?: (value: number) => string;
  className?: string;
}

/** A labelled single-value slider on Base UI Slider, with the formatted value and the range ends shown. */
export function Slider({ label, value, onValueChange, min, max, step = 1, format = String, className }: SliderProps) {
  return (
    <BaseSlider.Root
      value={value}
      onValueChange={(v: number | readonly number[]) => onValueChange(Array.isArray(v) ? (v[0] as number) : (v as number))}
      min={min}
      max={max}
      step={step}
      className={cn('flex flex-col gap-2', className)}
    >
      <div className="flex items-baseline justify-between gap-3">
        <BaseSlider.Label className="text-ink">{label}</BaseSlider.Label>
        <span className="tabular text-ui-s font-semibold text-ink">{format(value)}</span>
      </div>
      <BaseSlider.Control className="flex h-6 w-full cursor-pointer touch-none items-center">
        <BaseSlider.Track className="relative h-1 w-full rounded-pill bg-hairline-strong">
          <BaseSlider.Indicator className="rounded-pill bg-signal" />
          <BaseSlider.Thumb
            aria-label={label}
            getAriaValueText={(_formatted: string, v: number) => format(v)}
            className="size-[18px] rounded-full border-2 border-signal bg-panel shadow-[0_1px_3px_rgba(0,0,0,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          />
        </BaseSlider.Track>
      </BaseSlider.Control>
      <div className="flex justify-between text-ink-3">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </BaseSlider.Root>
  );
}

/* ---------- ThemeToggle ---------- */
export type ThemeId = 'paper' | 'ink';

/** Sets `data-theme` on <html>. Paper is the default; Ink is for big-screen workshop rooms. */
export function setTheme(theme: ThemeId) {
  if (typeof document !== 'undefined') document.documentElement.dataset.theme = theme;
}

export function ThemeToggle({ defaultTheme = 'paper', className }: { defaultTheme?: ThemeId; className?: string }) {
  const [theme, set] = useState<ThemeId>(defaultTheme);
  useEffect(() => setTheme(theme), [theme]);
  return (
    <ToggleGroup
      value={[theme]}
      onValueChange={(v: unknown[]) => v[0] && set(v[0] as ThemeId)}
      aria-label="Theme"
      className={cn('inline-flex gap-0.5 rounded-pill border border-hairline bg-panel p-[3px]', className)}
    >
      {(['paper', 'ink'] as const).map((id) => (
        <Toggle
          key={id}
          value={id}
          className="h-7 cursor-pointer rounded-pill px-3 font-semibold capitalize text-ink-2 data-[pressed]:bg-raised data-[pressed]:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          {id}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}

/* ---------- ModeSwitch ---------- */
/** Light/dark as one on/off switch with a sun and a moon, cut to a small secondary button (32px, pill, control edge) so it
    sits beside one in a bar. Named "Dark mode": on means Ink. Give it `theme` and `onThemeChange` to keep your own state
    (and remember the choice); otherwise it starts at `defaultTheme` and sets data-theme itself. */
export function ModeSwitch({ defaultTheme = 'paper', theme, onThemeChange, className }: {
  defaultTheme?: ThemeId;
  theme?: ThemeId;
  onThemeChange?: (theme: ThemeId) => void;
  className?: string;
}) {
  const [own, setOwn] = useState<ThemeId>(defaultTheme);
  const current = theme ?? own;
  useEffect(() => { if (theme === undefined) setTheme(own); }, [own, theme]);
  const dark = current === 'ink';
  const change = (on: boolean) => {
    const next: ThemeId = on ? 'ink' : 'paper';
    if (theme === undefined) setOwn(next);
    onThemeChange?.(next);
  };
  // A 60 × 32px track (58 × 30 inside its border). The 24px thumb sits 3px in, so it travels 28px; the faint icons sit at
  // its two resting places, and the thumb carries the current mode's icon.
  return (
    <BaseSwitch.Root
      checked={dark}
      onCheckedChange={(on: boolean) => change(on)}
      nativeButton
      render={<button type="button" />}
      aria-label="Dark mode"
      title={dark ? 'Dark mode is on' : 'Dark mode is off'}
      className={cn(
        'relative inline-flex h-8 w-[60px] shrink-0 cursor-pointer rounded-pill border border-control-edge transition-colors duration-150 hover:bg-raised',
        'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus',
        className,
      )}
    >
      <Sun className="absolute left-[8px] top-[8px] text-ink-3" />
      <Moon className="absolute left-[36px] top-[8px] text-ink-3" />
      <BaseSwitch.Thumb className="absolute left-[3px] top-[3px] grid size-6 place-items-center rounded-full bg-ink text-ground transition-transform duration-150 ease-out data-[checked]:translate-x-[28px]">
        {dark ? <Moon /> : <Sun />}
      </BaseSwitch.Thumb>
    </BaseSwitch.Root>
  );
}
