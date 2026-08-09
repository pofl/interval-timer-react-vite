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
    <div className="flex w-full flex-col gap-3 tabular-nums">
      <section className="brutal-shadow border-4 border-ink bg-coral p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-display text-sm uppercase">{mode} block</span>
          <span className="bg-ink px-2 py-1 text-[10px] font-bold uppercase text-paper">{isPlaying ? 'In Progress' : 'Ready'}</span>
        </div>
        <TimerProgressDisplay maxTime={maxTime} remainingTime={remainingTime} mode={mode} />
      </section>

      <TimerActions
        isPlaying={isPlaying}
        remainingTime={remainingTime}
        onReset={reset}
        onToggle={() => timerStore.send({type: 'toggle'})}
      />

      <div className={isPlaying ? 'hidden' : 'grid gap-3'}>
        <section className="grid gap-2">
          <SettingControl value={workTime} label="Work Seconds" onChange={(value: number) => setWorkTime(value)} />
          <SettingControl value={restTime} label="Rest Seconds" onChange={(value: number) => setRestTime(value)} />
        </section>
        <TimerOptions
          playSound={playSound}
          startWithRest={startWithRest}
          wakeLockError={wakeLockError}
          wakeLockLocked={wakeLockLocked}
          wakeLockSupported={wakeLockSupported}
          onWakeLockToggle={handleWakeLockToggle}
        />
      </div>

      <div className={isPlaying ? 'grid gap-3' : 'hidden'}>
        <TimerSummary appliedRestTime={appliedRestTime} appliedWorkTime={appliedWorkTime} />
      </div>
    </div>
  );
}
