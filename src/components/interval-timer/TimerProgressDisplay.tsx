import {Progress} from '../Progress';

interface TimerProgressDisplayProps {
  maxTime: number;
  remainingTime: number;
}

export function TimerProgressDisplay({maxTime, remainingTime}: TimerProgressDisplayProps) {
  return (
    <div className="border-neon-blue/40 mt-2 flex w-full flex-col items-center justify-between gap-4 rounded-xl border bg-black/60 p-3 shadow-[inset_0_0_20px_rgba(0,255,255,0.1)] sm:mt-4 sm:flex-row sm:gap-6 sm:p-4">
      <Progress value={remainingTime} max={maxTime} className="h-6 w-full sm:h-8 sm:flex-1" />
      <span className="font-press-start-2p text-neon-green text-4xl tabular-nums drop-shadow-[0_0_15px_rgba(57,255,20,0.8)] sm:text-5xl">
        {remainingTime}
      </span>
    </div>
  );
}
