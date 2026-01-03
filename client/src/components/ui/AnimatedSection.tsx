import { useRef, ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'fade-in-scale';
  delay?: number;
  className?: string;
}

export default function AnimatedSection({
  children,
  animation = 'fade-in',
  delay = 0,
  className = '',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1, triggerOnce: true });

  const animationClass = {
    'fade-in': 'animate-fade-in',
    'slide-in-left': 'animate-slide-in-left',
    'slide-in-right': 'animate-slide-in-right',
    'fade-in-scale': 'animate-fade-in-scale',
  }[animation];

  const delayClass = delay > 0 ? `delay-${delay}` : '';

  return (
    <div
      ref={ref}
      className={`${className} ${isInView ? animationClass : 'opacity-0'} ${delayClass}`}
    >
      {children}
    </div>
  );
}
