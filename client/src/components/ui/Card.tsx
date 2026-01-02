import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'glass';
}

export default function Card({ className, variant = 'default', children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-sm p-6',
        variant === 'default' && 'bg-[#1a1a1a] border border-[#2d3748]',
        variant === 'outline' && 'border-2 border-[#d4af37] bg-transparent',
        variant === 'glass' && 'bg-[#ffffff]/5 backdrop-blur-md border border-[#ffffff]/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
