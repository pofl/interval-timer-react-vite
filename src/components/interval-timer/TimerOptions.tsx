import { setPlaySound } from '../../hooks/timer-store';
import { CheckboxField } from '../ui/CheckboxField';

interface TimerOptionsProps {
  playSound: boolean;
  wakeLockError: string | null;
  wakeLockLocked: boolean;
  wakeLockSupported: boolean;
  onWakeLockToggle: () => Promise<void>;
}

export function TimerOptions({
  playSound,
  wakeLockError,
  wakeLockLocked,
  wakeLockSupported,
  onWakeLockToggle,
}: TimerOptionsProps) {
  const wakeLockControl = wakeLockError ? (
    <span className="flex min-h-11 items-center text-[10px] font-bold uppercase text-ink">
      Screen lock error: {wakeLockError}
    </span>
  ) : !wakeLockSupported ? (
    <span className="flex min-h-11 items-center text-[10px] font-bold uppercase text-muted">Screen lock unsupported</span>
  ) : (
    <CheckboxField
      checked={wakeLockLocked}
      label="Keep Screen On"
      onChange={() => {
        void onWakeLockToggle();
      }}
    />
  );

  return (
    <div className="mt-2 grid w-full grid-cols-2 divide-x-2 divide-line border-2 border-line bg-surface px-2 sm:px-3">
      <div className="pr-2 sm:pr-4">{wakeLockControl}</div>
      <div className="pl-2 sm:pl-4">
        <CheckboxField
          checked={playSound}
          label="Play sound"
          onChange={(event) => setPlaySound(event.target.checked)}
        />
      </div>
    </div>
  );
}
