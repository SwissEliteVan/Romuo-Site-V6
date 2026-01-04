import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-[#ffffff] transition-colors"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-[#d4af37] animate-pulse">*</span>
            )}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'w-full rounded-none border-2 bg-[#1a1a1a] px-4 py-3 text-[#ffffff]',
              'placeholder:text-[#666666]',
              'transition-all duration-300',
              'min-h-[48px]', // Accessibilité tactile
              'disabled:cursor-not-allowed disabled:opacity-50',
              // Border states
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-[#2d3748] focus:border-[#d4af37]',
              // Focus effects
              'focus:outline-none',
              error
                ? 'focus:ring-2 focus:ring-red-500/20 focus:shadow-lg focus:shadow-red-500/10'
                : 'focus:ring-2 focus:ring-[#d4af37]/20 focus:shadow-lg focus:shadow-[#d4af37]/10',
              // Hover state
              !error && 'hover:border-[#d4af37]/50',
              className
            )}
            {...props}
          />
          {/* Success indicator (when no error and has value) */}
          {!error && props.value && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[#d4af37] animate-pulse"></div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-400 flex items-center gap-1 animate-fadeInUp" role="alert">
            <span className="inline-block h-1 w-1 rounded-full bg-red-400"></span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
