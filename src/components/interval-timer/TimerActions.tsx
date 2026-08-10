import type { TimerState } from '../../hooks/timer-store';
import { Button } from '../ui/Button';

interface TimerActionsProps {
  timerState: TimerState;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}

export function TimerActions({timerState, onPlay, onPause, onStop}: TimerActionsProps) {
  if (timerState === 'settings') {
    return (
      <Button className="w-full bg-pink text-ink" onClick={onPlay}>
        Play
      </Button>
    );
  }

  return (
    <div className="grid w-full grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] gap-3">
      <Button
        className="bg-surface"
        onClick={onStop}
      >
        Stop
      </Button>
      <Button
        className="bg-pink text-ink"
        onClick={timerState === 'playing' ? onPause : onPlay}
      >
        {timerState === 'playing' ? 'Pause' : 'Play'}
      </Button>
    </div>
  );
}
