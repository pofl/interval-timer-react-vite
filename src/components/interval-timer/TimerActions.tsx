import { Button } from '../ui/Button';

interface TimerActionsProps {
  isPlaying: boolean;
  onReset: () => void;
  onToggle: () => void;
}

export function TimerActions({isPlaying, onReset, onToggle}: TimerActionsProps) {
  return (
    <div className="grid w-full grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] gap-3">
      <Button
        className="bg-surface"
        onClick={onReset}
      >
        Reset
      </Button>
      <Button
        className="bg-pink text-ink"
        onClick={onToggle}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
    </div>
  );
}
