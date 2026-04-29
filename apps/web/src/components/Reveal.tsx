import type { ReactNode, ElementType, CSSProperties } from 'react';
import { useReveal } from '../lib/useReveal';
import { cn } from '../lib/utils';

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  threshold?: number;
  id?: string;
  style?: CSSProperties;
}

export function Reveal({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  threshold = 0.12,
  id,
  style,
  ...rest
}: RevealProps) {
  const ref = useReveal<HTMLElement>(threshold);

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={cn('reveal', className)}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
