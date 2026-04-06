import {Progress} from '../Progress';

interface TimerProgressDisplayProps {
  maxTime: number;
  remainingTime: number;
}

export function TimerProgressDisplay({maxTime, remainingTime}: TimerProgressDisplayProps) {
  return (
    <div className="flex w-full items-center justify-between gap-6 mt-4 p-4 bg-black/60 border border-neon-blue/40 rounded-xl shadow-[inset_0_0_20px_rgba(0,255,255,0.1)]">
      <Progress value={remainingTime} max={maxTime} className="flex-1 h-8" />
      <span className="tabular-nums font-press-start-2p text-3xl sm:text-5xl text-neon-green drop-shadow-[0_0_15px_rgba(57,255,20,0.8)]">
        {remainingTime}
      </span>
    </div>
  );
}
