import {Progress} from '../Progress';

interface TimerProgressDisplayProps {
  maxTime: number;
  remainingTime: number;
}

export function TimerProgressDisplay({maxTime, remainingTime}: TimerProgressDisplayProps) {
  return (
    <div className="flex items-center gap-4">
      <Progress value={remainingTime} max={maxTime} className="w-64" />
      <span className="tabular-nums">{remainingTime}</span>
    </div>
  );
}
