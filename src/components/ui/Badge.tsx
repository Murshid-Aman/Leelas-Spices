import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'premium' | 'new';
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: 'bg-spice-100 text-spice-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  premium: 'bg-gradient-to-r from-saffron-500 to-curry-500 text-white',
  new: 'bg-saffron-100 text-saffron-700',
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
