import {cn} from '../lib/utils';

interface ProgressProps {
  value: number;
  max: number;
  className?: string;
}

export function Progress({value, max, className = ''}: ProgressProps) {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className={cn('relative h-6 overflow-hidden rounded-lg bg-stone-300', className)}>
      <div className="h-full bg-stone-500 transition-all duration-300 ease-linear" style={{width: `${percentage}%`}} />
    </div>
  );
}
