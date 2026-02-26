import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
}

export function AnimatedSection({ children, delay = 0, className, direction = 'up' }: Props) {
  const initial = direction === 'up' ? { opacity: 0, y: 24 }
    : direction === 'left' ? { opacity: 0, x: -24 }
    : direction === 'right' ? { opacity: 0, x: 24 }
    : { opacity: 0 };
  const animate = direction === 'up' ? { opacity: 1, y: 0 }
    : direction === 'left' ? { opacity: 1, x: 0 }
    : direction === 'right' ? { opacity: 1, x: 0 }
    : { opacity: 1 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
