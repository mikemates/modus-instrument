import { Button as BaseButton } from '@base-ui/react/button';
import type { AnchorHTMLAttributes, ComponentProps, ReactNode } from 'react';
import { cn } from '../lib/cn';
import { ArrowRight } from './icons';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ComponentProps<typeof BaseButton>, 'className' | 'children'> {
  /** primary = a main action (filled violet: "you can act here"); secondary = an alternative beside it; ghost = low emphasis. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Optional icon after the label (ArrowRight for "go"). */
  iconEnd?: ReactNode;
  className?: string;
  children?: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-action text-on-action hover:bg-action-hover',
  secondary: 'border border-control-edge text-ink hover:bg-raised',
  ghost: 'text-ink-2 hover:bg-raised hover:text-ink',
};
const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3.5 text-ui-s',
  md: 'h-10 px-[18px] text-body',
  lg: 'h-12 px-6 text-ui-m',
};

const BASE = 'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-pill font-body font-semibold no-underline transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus';

/** Pill button on Base UI's Button. Labels are verb + object: "Export brief", not "Submit". */
export function Button({ variant = 'primary', size = 'md', iconEnd, className, children, ...rest }: ButtonProps) {
  return (
    <BaseButton
      className={cn(
        BASE,
        'data-[disabled]:cursor-not-allowed data-[disabled]:border data-[disabled]:border-dashed data-[disabled]:border-hairline-strong data-[disabled]:bg-transparent data-[disabled]:text-ink-3',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
      {iconEnd}
    </BaseButton>
  );
}

export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconEnd?: ReactNode;
}

/** A link drawn as a Button, for actions that go somewhere ("Plan the workshop", "Read the brief"). Base UI keeps links
    out of Button so they stay links for keyboards and screen readers; this shares Button's classes, so the two can't drift. */
export function LinkButton({ variant = 'primary', size = 'md', iconEnd, className, children, ...rest }: LinkButtonProps) {
  return (
    <a className={cn(BASE, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {iconEnd}
    </a>
  );
}

export interface GoLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  /** Puts the arrow before the text, pointing back ("All opportunities"). */
  back?: boolean;
  /** Marks the page you're on. */
  current?: boolean;
}

/** The second-tier action: words and an arrow, in ink, violet on hover. Internal links only; mark external ones with ↗. */
export function GoLink({ back, current, className, children, ...rest }: GoLinkProps) {
  const arrow = <ArrowRight size={12} className={cn('shrink-0 transition-transform duration-150', back ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5')} />;
  return (
    <a
      aria-current={current ? 'page' : undefined}
      className={cn('group inline-flex items-center gap-1.5 whitespace-nowrap text-ui-s font-semibold text-ink no-underline hover:text-signal-text focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus', className)}
      {...rest}
    >
      {back ? arrow : null}
      {children}
      {back ? null : arrow}
    </a>
  );
}
