import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center rounded-none font-semibold transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]',
          'disabled:pointer-events-none disabled:opacity-50',
          // Variants
          variant === 'primary' &&
            'bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c4a137] active:scale-95',
          variant === 'secondary' &&
            'border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] active:scale-95',
          variant === 'outline' &&
            'bg-white/10 backdrop-blur-sm text-white font-bold border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300',
          variant === 'ghost' &&
            'text-[#ffffff] hover:bg-[#2d3748] active:scale-95',
          // Sizes - min 44px pour accessibilité tactile
          size === 'sm' && 'px-4 py-2 text-sm min-h-[44px]',
          size === 'md' && 'px-6 py-3 text-base min-h-[48px]',
          size === 'lg' && 'px-8 py-4 text-lg min-h-[52px]',
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
