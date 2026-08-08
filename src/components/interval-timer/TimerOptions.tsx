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
    <div className="grid w-full grid-cols-2 gap-x-3 border-3 border-ink bg-blue px-3 py-1">
      <div>
        <CheckboxField
          checked={startWithRest}
          label="Start with Rest"
          onChange={(event) => setStartWithRest(event.target.checked)}
        />
      </div>
      <div>
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
