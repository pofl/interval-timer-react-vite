import type { Mode } from '../../hooks/timer-store';
import { Progress } from '../Progress';

interface TimerProgressDisplayProps {
  maxTime: number;
  remainingTime: number;
  mode: Mode;
}

export function TimerProgressDisplay({maxTime, remainingTime, mode}: TimerProgressDisplayProps) {
  return (
    <div className="grid gap-3 sm:gap-4">
      <div className="flex min-h-24 items-end justify-between gap-3 sm:min-h-36">
        <span className="font-display text-[clamp(5rem,24vw,9rem)] leading-[0.8] tracking-normal tabular-nums">
          {remainingTime}
        </span>
        <span className="pb-1 text-[10px] font-bold uppercase text-muted sm:pb-2 sm:text-xs">Seconds</span>
      </div>
      <Progress
        value={remainingTime}
        max={maxTime}
        className="h-5 w-full sm:h-6"
        fillClassName={mode === 'work' ? 'bg-mint' : 'bg-blue'}
      />
    </div>
  );
}
