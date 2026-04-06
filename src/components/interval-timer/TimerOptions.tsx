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
    <div className="flex flex-col gap-2 w-full my-2 bg-black/40 p-3 rounded-lg border border-neon-purple/30 shadow-[0_0_10px_rgba(176,38,255,0.2)]">
      <div>
        <CheckboxField
          checked={startWithRest}
          label="Start with Rest"
          onChange={(event) => setStartWithRest(event.target.checked)}
        />
      </div>
      <div>
        {wakeLockError ? (
          <span className="text-neon-pink text-xs uppercase shadow-neon-pink">Screen Lock Prevention Error: {wakeLockError}</span>
        ) : !wakeLockSupported ? (
          <span className="text-gray-500 text-xs uppercase">Screen Lock Prevention Not Supported</span>
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
