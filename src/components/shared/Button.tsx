import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary' && 'bg-[var(--primary)] text-[var(--primary-fg)] hover:bg-[var(--primary-light)] shadow-sm',
        variant === 'outline' && 'border border-[var(--border)] text-[var(--fg)] hover:border-[var(--primary)] hover:text-[var(--primary)] bg-transparent',
        variant === 'ghost' && 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] bg-transparent',
        size === 'sm' && 'text-sm px-3 py-1.5',
        size === 'md' && 'text-sm px-5 py-2.5',
        size === 'lg' && 'text-base px-7 py-3.5',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
