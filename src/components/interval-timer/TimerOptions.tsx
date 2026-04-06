import {setStartWithRest} from '../../hooks/settings-store';
import {setPlaySound} from '../../hooks/timer-store';
import {CheckboxField} from '../ui/CheckboxField';

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
    <div className="border-neon-purple/30 my-1 flex w-full flex-col gap-1 rounded-lg border bg-black/40 p-2 shadow-[0_0_10px_rgba(176,38,255,0.2)] sm:my-2 sm:gap-2 sm:p-3">
      <div>
        <CheckboxField
          checked={startWithRest}
          label="Start with Rest"
          onChange={(event) => setStartWithRest(event.target.checked)}
        />
      </div>
      <div>
        {wakeLockError ? (
          <span className="text-neon-pink shadow-neon-pink text-xs uppercase">
            Screen Lock Prevention Error: {wakeLockError}
          </span>
        ) : !wakeLockSupported ? (
          <span className="text-xs text-gray-500 uppercase">Screen Lock Prevention Not Supported</span>
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
      <div>
        <CheckboxField
          checked={playSound}
          label="Play sound"
          onChange={(event) => setPlaySound(event.target.checked)}
        />
      </div>
    </div>
  );
}
