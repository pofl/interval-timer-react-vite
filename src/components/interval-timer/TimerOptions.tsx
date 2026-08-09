import { setStartWithRest } from '../../hooks/settings-store';
import { setPlaySound } from '../../hooks/timer-store';
import { CheckboxField } from '../ui/CheckboxField';

interface TimerOptionsProps {
  playSound: boolean;
  startWithRest: boolean;
  wakeLockError: string | null;
  wakeLockLocked: boolean;
  wakeLockSupported: boolean;
  onWakeLockToggle: () => Promise<void>;
}

export function TimerOptions({
  playSound,
  startWithRest,
  wakeLockError,
  wakeLockLocked,
  wakeLockSupported,
  onWakeLockToggle,
}: TimerOptionsProps) {
  return (
    <div className="mt-2 grid w-full grid-cols-2 gap-x-3 border-2 border-line bg-surface px-3 py-1 sm:grid-cols-3 sm:gap-x-4 sm:py-2">
      <div className="border-r border-b border-line sm:border-b-0">
        <CheckboxField
          checked={startWithRest}
          label="Start with Rest"
          onChange={(event) => setStartWithRest(event.target.checked)}
        />
      </div>
      <div className="border-b border-line sm:border-r sm:border-b-0">
        {wakeLockError ? (
          <span className="text-xs font-bold uppercase text-ink">
            Screen lock error: {wakeLockError}
          </span>
        ) : !wakeLockSupported ? (
          <span className="text-xs font-bold uppercase">Screen lock unsupported</span>
        ) : (
          <CheckboxField
            checked={wakeLockLocked}
            label="Keep Screen On"
            onChange={() => {
              void onWakeLockToggle();
            }}
          />
        )}
      </div>
      <div className="col-span-2 sm:col-span-1">
        <CheckboxField
          checked={playSound}
          label="Play sound"
          onChange={(event) => setPlaySound(event.target.checked)}
        />
      </div>
    </div>
  );
}
