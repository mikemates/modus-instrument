import type { ComponentProps } from 'react';
import { cn } from '../lib/cn';
import { GLYPH, WORDMARK } from './logo-paths';

export type LogoVariant = 'wordmark' | 'glyph';

export interface LogoProps extends Omit<ComponentProps<'svg'>, 'children' | 'viewBox'> {
  /** `wordmark` = glyph + MODUS CREATE (default); `glyph` = the symbol alone, for tight spaces. */
  variant?: LogoVariant;
  /** Accessible name. Pass `null` when a visible name sits right beside it. */
  label?: string | null;
}

/**
 * The Modus Create logo, drawn from the official artwork in `color-logo`:
 * black on Paper, white on Ink, switching with the theme. Size it by height.
 */
export function Logo({ variant = 'wordmark', label = 'Modus Create', className, ...rest }: LogoProps) {
  const art = variant === 'glyph' ? GLYPH : WORDMARK;
  const a11y = label ? { role: 'img' as const, 'aria-label': label } : { 'aria-hidden': true as const };
  // Default height only when the caller hasn't set one (cn() doesn't resolve conflicting utilities).
  const sized = /(^|\s)(\w+:)*(h|size)-/.test(className ?? '');
  return (
    <svg
      viewBox={art.viewBox}
      fill="currentColor"
      focusable="false"
      className={cn('block w-auto shrink-0 text-logo', !sized && (variant === 'glyph' ? 'h-6' : 'h-5'), className)}
      {...a11y}
      {...rest}
    >
      {art.paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}
