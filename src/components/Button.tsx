import { Button as BaseButton } from '@base-ui/react/button';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ComponentProps<typeof BaseButton>, 'className' | 'children'> {
  /** primary = the one main action in a view; secondary = alternatives; ghost = low-emphasis links-as-buttons. */
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
  sm: 'h-8 px-3.5 text-[13px]',
  md: 'h-10 px-[18px] text-sm',
  lg: 'h-12 px-6 text-[15px]',
};

/** Pill button on Base UI's Button. Labels are verb + object: "Export brief", not "Submit". */
export function Button({ variant = 'primary', size = 'md', iconEnd, className, children, ...rest }: ButtonProps) {
  return (
    <BaseButton
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-pill font-body font-semibold transition-colors duration-150',
        'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus',
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
