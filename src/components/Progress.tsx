import {cn} from '../lib/utils';

interface ProgressProps {
  value: number;
  max: number;
  className?: string;
  fillClassName?: string;
}

export function Progress({value, max, className = '', fillClassName = 'bg-pink'}: ProgressProps) {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className={cn('relative overflow-hidden border-3 border-ink bg-paper', className)}>
      <div
        className={cn('h-full transition-[width] duration-300 ease-linear', fillClassName)}
        style={{width: `${percentage}%`}}
      />
    </div>
  );
}
