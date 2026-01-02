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
            className="mb-2 block text-sm font-medium text-[#ffffff]"
          >
            {label}
            {props.required && <span className="ml-1 text-[#d4af37]">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full rounded-none border-2 border-[#2d3748] bg-[#1a1a1a] px-4 py-3 text-[#ffffff]',
            'placeholder:text-[#666666]',
            'focus:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'min-h-[48px]', // Accessibilité tactile
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
