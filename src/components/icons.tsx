import type { SVGProps } from 'react';

/* A small stroke icon set drawn on a 14px grid, so icons match Manrope's weight at UI sizes.
   Decorative by default (aria-hidden); pass aria-label + role="img" when an icon carries meaning alone. */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 14, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden={rest['aria-label'] ? undefined : true} {...rest}>
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => <Icon {...p}><path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" /></Icon>;
export const ArrowDown = (p: IconProps) => <Icon {...p}><path d="M7 3v8M3.5 7.5 7 11l3.5-3.5" /></Icon>;
export const ArrowUp = (p: IconProps) => <Icon {...p}><path d="M7 11V3M3.5 6.5 7 3l3.5 3.5" /></Icon>;
export const Search = (p: IconProps) => <Icon {...p}><circle cx="6" cy="6" r="4.2" /><path d="m9.2 9.2 3 3" /></Icon>;
export const Close = (p: IconProps) => <Icon {...p}><path d="m3.5 3.5 7 7m0-7-7 7" /></Icon>;
export const Check = (p: IconProps) => <Icon {...p}><path d="m3 7.5 2.5 2.5L11 4.5" /></Icon>;
export const Warning = (p: IconProps) => <Icon {...p}><path d="M7 1.8 13 12.2H1L7 1.8Z" /><path d="M7 5.8v3M7 10.6v.01" /></Icon>;
export const Info = (p: IconProps) => <Icon {...p}><circle cx="7" cy="7" r="5.5" /><path d="M7 4.2v3.2M7 9.6v.01" /></Icon>;
export const Star = (p: IconProps) => (
  <Icon {...p} stroke="none"><path d="M7 1.5 8.6 5.2l4 .3-3 2.6.9 3.9L7 9.9l-3.5 2.1.9-3.9-3-2.6 4-.3L7 1.5Z" fill="currentColor" /></Icon>
);
export const Queue = (p: IconProps) => <Icon {...p} strokeWidth={1.3}><path d="M7 1.5 12.5 11.5h-11L7 1.5Z" /></Icon>;
export const BuildNew = (p: IconProps) => <Icon {...p} strokeWidth={1.4}><rect x="1.5" y="1.5" width="11" height="11" rx="1.5" /><path d="M7 4.5v5M4.5 7h5" /></Icon>;
export const Evolve = (p: IconProps) => (
  <Icon {...p} strokeWidth={1.4}><path d="M11.5 5.5A4.6 4.6 0 0 0 3 4.2M2.5 8.5A4.6 4.6 0 0 0 11 9.8" /><path d="M3 1.8v2.6h2.6M11 12.2V9.6H8.4" /></Icon>
);
export const ChevronDown = (p: IconProps) => <Icon {...p}><path d="m3.5 5.5 3.5 3.5 3.5-3.5" /></Icon>;

/** The Insight Center mark: a lens with a violet point of focus. */
export function Mark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="9.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="8" r="3" fill="var(--color-signal)" />
    </svg>
  );
}
