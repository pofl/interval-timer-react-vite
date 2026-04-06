import {cn} from '../lib/utils';

interface ProgressProps {
  value: number;
  max: number;
  className?: string;
}

export function Progress({value, max, className = ''}: ProgressProps) {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className={cn('relative h-8 overflow-hidden rounded-md border-2 border-neon-blue bg-dark-bg/80 shadow-[0_0_15px_rgba(0,255,255,0.4)]', className)}>
      <div
        className="h-full bg-gradient-to-r from-neon-purple via-neon-pink to-neon-green transition-all duration-300 ease-linear shadow-[0_0_20px_rgba(57,255,20,0.8)]"
        style={{width: `${percentage}%`}}
      />
    </div>
  );
}
