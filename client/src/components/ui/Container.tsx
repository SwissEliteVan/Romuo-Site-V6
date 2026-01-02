import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export default function Container({ className, size = 'lg', children, ...props }: ContainerProps) {
  return (
    <div
      className={clsx(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        size === 'sm' && 'max-w-3xl',
        size === 'md' && 'max-w-5xl',
        size === 'lg' && 'max-w-7xl',
        size === 'full' && 'max-w-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
