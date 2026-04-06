import {Button} from '../ui/Button';

interface TimerActionsProps {
  isPlaying: boolean;
  remainingTime: number;
  onReset: () => void;
  onToggle: () => void;
}

export function TimerActions({isPlaying, remainingTime, onReset, onToggle}: TimerActionsProps) {
  return (
    <div>
      <Button className="m-1" onClick={onReset}>
        Reset
      </Button>
      <Button className="m-1" onClick={onToggle}>
        {!isPlaying && remainingTime > 0 ? 'Start' : 'Pause'}
      </Button>
    </div>
  );
}
