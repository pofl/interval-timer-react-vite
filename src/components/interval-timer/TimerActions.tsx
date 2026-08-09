import {Button} from '../ui/Button';

interface TimerActionsProps {
  isPlaying: boolean;
  onReset: () => void;
  onToggle: () => void;
}

export function TimerActions({isPlaying, onReset, onToggle}: TimerActionsProps) {
  return (
    <div className="flex w-full gap-3">
      <Button
        className="flex-1 bg-paper"
        onClick={onReset}
      >
        Reset
      </Button>
      <Button
        className="flex-1 bg-pink"
        onClick={onToggle}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
    </div>
  );
}
