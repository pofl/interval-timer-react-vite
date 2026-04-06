import {Button} from '../ui/Button';

interface TimerActionsProps {
  isPlaying: boolean;
  remainingTime: number;
  onReset: () => void;
  onToggle: () => void;
}

export function TimerActions({isPlaying, remainingTime, onReset, onToggle}: TimerActionsProps) {
  return (
    <div className="mt-1 flex w-full justify-center gap-2 sm:mt-2 sm:gap-4">
      <Button
        className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-dark-bg max-w-[150px] flex-1 bg-transparent shadow-[0_0_10px_rgba(255,0,255,0.4)]"
        onClick={onReset}
      >
        Reset
      </Button>
      <Button
        className="bg-neon-blue border-neon-blue text-dark-bg hover:text-neon-blue max-w-[150px] flex-1 shadow-[0_0_15px_rgba(0,255,255,0.6)] hover:bg-transparent"
        onClick={onToggle}
      >
        {!isPlaying && remainingTime > 0 ? 'Start' : 'Pause'}
      </Button>
    </div>
  );
}
