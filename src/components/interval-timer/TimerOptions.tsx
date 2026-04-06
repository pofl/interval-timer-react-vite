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
    <div>
      <div>
        <CheckboxField
          checked={startWithRest}
          label="Start with Rest"
          onChange={(event) => setStartWithRest(event.target.checked)}
        />
      </div>
      <div>
        {wakeLockError ? (
          <span>Screen Lock Prevention Error: {wakeLockError}</span>
        ) : !wakeLockSupported ? (
          'Screen Lock Prevention Not Supported'
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
