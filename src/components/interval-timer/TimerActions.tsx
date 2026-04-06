import {Button} from '../ui/Button';

interface TimerActionsProps {
  isPlaying: boolean;
  remainingTime: number;
  onReset: () => void;
  onToggle: () => void;
}

export function TimerActions({isPlaying, remainingTime, onReset, onToggle}: TimerActionsProps) {
  return (
    <div className="flex w-full gap-4 mt-2 justify-center">
      <Button className="flex-1 max-w-[150px] bg-transparent border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-dark-bg shadow-[0_0_10px_rgba(255,0,255,0.4)]" onClick={onReset}>
        Reset
      </Button>
      <Button className="flex-1 max-w-[150px] bg-neon-blue border-neon-blue text-dark-bg hover:bg-transparent hover:text-neon-blue shadow-[0_0_15px_rgba(0,255,255,0.6)]" onClick={onToggle}>
        {!isPlaying && remainingTime > 0 ? 'Start' : 'Pause'}
      </Button>
    </div>
  );
}
