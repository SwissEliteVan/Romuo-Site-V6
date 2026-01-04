import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'glass';
}

export default function Card({ className, variant = 'default', children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-sm p-6 transition-all duration-300',
        // Default variant with elevation
        variant === 'default' && [
          'bg-[#1a1a1a] border border-[#2d3748]',
          'shadow-lg shadow-black/20',
          'hover:shadow-2xl hover:shadow-[#d4af37]/10',
          'hover:-translate-y-1',
          'hover:border-[#d4af37]/40'
        ],
        // Outline variant with glow
        variant === 'outline' && [
          'border-2 border-[#d4af37] bg-transparent',
          'shadow-md shadow-[#d4af37]/10',
          'hover:shadow-xl hover:shadow-[#d4af37]/20',
          'hover:-translate-y-1',
          'hover:border-[#e4bf47]',
          'hover:bg-[#d4af37]/5'
        ],
        // Glass variant enhanced
        variant === 'glass' && [
          'bg-[#ffffff]/5 backdrop-blur-xl',
          '-webkit-backdrop-filter backdrop-filter',
          'border border-[#ffffff]/10',
          'shadow-xl shadow-black/30',
          'hover:shadow-2xl hover:shadow-[#d4af37]/10',
          'hover:-translate-y-1',
          'hover:bg-[#ffffff]/8',
          'hover:border-[#d4af37]/20',
          // Subtle inner glow
          'relative',
          'before:absolute before:inset-0 before:rounded-sm',
          'before:bg-gradient-to-br before:from-[#d4af37]/5 before:to-transparent',
          'before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300'
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
