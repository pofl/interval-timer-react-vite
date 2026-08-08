import {Button} from '../ui/Button';

interface TimerActionsProps {
  isPlaying: boolean;
  remainingTime: number;
  onReset: () => void;
  onToggle: () => void;
}

export function TimerActions({isPlaying, remainingTime, onReset, onToggle}: TimerActionsProps) {
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
        {!isPlaying && remainingTime > 0 ? 'Start' : 'Pause'}
      </Button>
    </div>
  );
}
