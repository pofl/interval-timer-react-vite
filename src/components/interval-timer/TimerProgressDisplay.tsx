import {Progress} from '../Progress';
import type {Mode} from '../../hooks/timer-store';

interface TimerProgressDisplayProps {
  maxTime: number;
  remainingTime: number;
  mode: Mode;
}

export function TimerProgressDisplay({maxTime, remainingTime, mode}: TimerProgressDisplayProps) {
  return (
    <div className="flex w-full items-stretch gap-2">
      <Progress
        value={remainingTime}
        max={maxTime}
        className="h-16 min-w-0 flex-1 sm:h-20"
        fillClassName={mode === 'work' ? 'bg-mint' : 'bg-blue'}
      />
      <span className="font-display flex min-w-27 items-center justify-center border-3 border-ink bg-yellow px-2 text-4xl tabular-nums shadow-[4px_4px_0_#171717] sm:min-w-35 sm:text-5xl">
        {remainingTime}
      </span>
    </div>
  );
}
