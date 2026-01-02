import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'dark' | 'light';
  spacing?: 'sm' | 'md' | 'lg';
}

export default function Section({
  className,
  variant = 'default',
  spacing = 'lg',
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={clsx(
        'w-full',
        variant === 'default' && 'bg-[#0a0a0a] text-[#ffffff]',
        variant === 'dark' && 'bg-[#000000] text-[#ffffff]',
        variant === 'light' && 'bg-[#1a1a1a] text-[#ffffff]',
        spacing === 'sm' && 'py-12',
        spacing === 'md' && 'py-16 md:py-20',
        spacing === 'lg' && 'py-20 md:py-28',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
