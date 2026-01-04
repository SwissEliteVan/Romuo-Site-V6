import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'relative inline-flex items-center justify-center rounded-none font-semibold transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]',
          'disabled:pointer-events-none disabled:opacity-50',
          'overflow-hidden',
          // Variants
          variant === 'primary' && [
            'bg-gradient-to-r from-[#d4af37] via-[#e4bf47] to-[#d4af37]',
            'bg-[length:200%_100%] bg-left',
            'text-[#0a0a0a] font-bold',
            'hover:bg-right hover:shadow-2xl hover:shadow-[#d4af37]/40',
            'active:scale-95',
            'shadow-lg shadow-[#d4af37]/20',
            // Shimmer effect on hover
            'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
            'before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700'
          ],
          variant === 'secondary' && [
            'border-2 border-[#d4af37] text-[#d4af37]',
            'hover:bg-gradient-to-r hover:from-[#d4af37] hover:via-[#e4bf47] hover:to-[#d4af37]',
            'hover:text-[#0a0a0a] hover:border-[#e4bf47]',
            'hover:shadow-xl hover:shadow-[#d4af37]/30',
            'active:scale-95',
            'bg-[#0a0a0a]'
          ],
          variant === 'ghost' && [
            'text-[#ffffff] hover:bg-[#2d3748]',
            'hover:shadow-md hover:shadow-[#d4af37]/10',
            'active:scale-95'
          ],
          // Sizes - min 44px pour accessibilité tactile
          size === 'sm' && 'px-4 py-2 text-sm min-h-[44px]',
          size === 'md' && 'px-6 py-3 text-base min-h-[48px]',
          size === 'lg' && 'px-8 py-4 text-lg min-h-[52px]',
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
