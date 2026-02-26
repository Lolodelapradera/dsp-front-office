import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  className?: string;
  alt?: boolean;
  id?: string;
}

export function SectionWrapper({ children, className, alt = false, id }: Props) {
  return (
    <section
      id={id}
      className={cn(
        'py-24 px-6 sm:px-8',
        alt && 'bg-[var(--bg-secondary)]',
        !alt && 'bg-[var(--bg)]',
        className
      )}
    >
      <div className="mx-auto max-w-7xl">
        {children}
      </div>
    </section>
  );
}
