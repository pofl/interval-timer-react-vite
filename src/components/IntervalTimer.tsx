import { useState } from 'react';
import { setRestTime, setWorkTime, useRestTime, useStartWithRest, useWorkTime } from '../hooks/settings-store';
import {
  getModeTime,
  timerStore,
  useAppliedRestTime,
  useAppliedWorkTime,
  useIsPlaying,
  useMode,
  usePlaySound,
  useRemainingTime,
} from '../hooks/timer-store';
import { useWakeLock } from '../hooks/use-wake-lock';
import { SettingControl } from './SettingControl';
import { TimerActions } from './interval-timer/TimerActions';
import { TimerOptions } from './interval-timer/TimerOptions';
import { TimerProgressDisplay } from './interval-timer/TimerProgressDisplay';
import { TimerSummary } from './interval-timer/TimerSummary';

export function IntervalTimer() {
  const workTime = useWorkTime();
  const restTime = useRestTime();
  const appliedWorkTime = useAppliedWorkTime();
  const appliedRestTime = useAppliedRestTime();
  const startWithRest = useStartWithRest();
  const playSound = usePlaySound();
  const mode = useMode();
  const isPlaying = useIsPlaying();
  const remainingTime = useRemainingTime();

  const initialMode = startWithRest ? 'rest' : 'work';

  const maxTime = getModeTime({workTime: appliedWorkTime, restTime: appliedRestTime}, mode);

  const reset = () => {
    timerStore.send({type: 'reset', mode: initialMode, workTime, restTime});
  };

  const [wakeLockError, setError] = useState<string | null>(null);
  const {
    isSupported: wakeLockSupported,
    released: wakeLockReleased,
    request: requestWakeLock,
    release: releaseWakeLock,
  } = useWakeLock({
    onError: (error) => {
      alert('error in wake lock: ' + error.message);
      setError(error.message || 'An unknown error occurred');
    },
    reacquireOnPageVisible: true,
  });

  const wakeLockLocked = wakeLockReleased === undefined ? false : !wakeLockReleased;

  const handleWakeLockToggle = async () => {
    if (wakeLockLocked) {
      await releaseWakeLock();
    } else {
      await requestWakeLock();
    }
  };

  return (
    <div className="flex w-full flex-col gap-3 tabular-nums sm:gap-4">
      <section className="brutal-shadow border-3 border-ink bg-surface p-3 sm:p-6" aria-label={`${mode} timer`}>
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide sm:text-sm">
            <span className={`h-3 w-3 border-2 border-ink ${mode === 'work' ? 'bg-mint' : 'bg-blue'}`} aria-hidden="true" />
            {mode}
          </span>
          <span className="text-[10px] font-bold uppercase text-muted sm:text-xs">{isPlaying ? 'Running' : 'Ready'}</span>
        </div>
        <TimerProgressDisplay maxTime={maxTime} remainingTime={remainingTime} mode={mode} />
      </section>

      <TimerActions
        isPlaying={isPlaying}
        onReset={reset}
        onToggle={() => timerStore.send({type: 'toggle'})}
      />

      {isPlaying ? (
        <TimerSummary appliedRestTime={appliedRestTime} appliedWorkTime={appliedWorkTime} />
      ) : (
        <section className="border-t-3 border-ink pt-3 sm:pt-4" aria-labelledby="session-settings-heading">
          <div className="mb-2 flex items-baseline justify-between gap-3 sm:mb-3">
            <h2 id="session-settings-heading" className="font-display text-base uppercase sm:text-lg">Session setup</h2>
            <span className="text-[9px] font-bold uppercase text-muted sm:text-[10px]">Seconds</span>
          </div>
          <div className="grid gap-2">
            <SettingControl value={workTime} label="Work" onChange={(value: number) => setWorkTime(value)} />
            <SettingControl value={restTime} label="Rest" onChange={(value: number) => setRestTime(value)} />
          </div>
          <TimerOptions
            playSound={playSound}
            startWithRest={startWithRest}
            wakeLockError={wakeLockError}
            wakeLockLocked={wakeLockLocked}
            wakeLockSupported={wakeLockSupported}
            onWakeLockToggle={handleWakeLockToggle}
          />
        </section>
      )}
    </div>
  );
}
