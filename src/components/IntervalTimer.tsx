import { useState } from 'react';
import { setRestTime, setStartWithRest, setWorkTime, useRestTime, useStartWithRest, useWorkTime } from '../hooks/settings-store';
import {
  getModeTime,
  timerStore,
  useAppliedRestTime,
  useAppliedWorkTime,
  useMode,
  usePlaySound,
  useRemainingTime,
  useTimerState,
} from '../hooks/timer-store';
import { useWakeLock } from '../hooks/use-wake-lock';
import { SettingControl } from './SettingControl';
import { TimerActions } from './interval-timer/TimerActions';
import { TimerOptions } from './interval-timer/TimerOptions';
import { TimerProgressDisplay } from './interval-timer/TimerProgressDisplay';

export function IntervalTimer() {
  const workTime = useWorkTime();
  const restTime = useRestTime();
  const appliedWorkTime = useAppliedWorkTime();
  const appliedRestTime = useAppliedRestTime();
  const startWithRest = useStartWithRest();
  const playSound = usePlaySound();
  const mode = useMode();
  const timerState = useTimerState();
  const remainingTime = useRemainingTime();

  const initialMode = startWithRest ? 'rest' : 'work';

  const maxTime = getModeTime({workTime: appliedWorkTime, restTime: appliedRestTime}, mode);

  const reset = () => {
    timerStore.send({type: 'reset', mode: initialMode, workTime, restTime});
  };

  const start = () => {
    timerStore.send({type: 'start', mode: initialMode, workTime, restTime});
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
          <span className="text-[10px] font-bold uppercase text-muted sm:text-xs">{timerState === 'playing' ? 'Running' : timerState === 'paused' ? 'Paused' : 'Settings'}</span>
        </div>
        <TimerProgressDisplay maxTime={maxTime} remainingTime={remainingTime} mode={mode} />
      </section>

      <TimerActions
        timerState={timerState}
        onPlay={timerState === 'paused' ? () => timerStore.send({type: 'resume'}) : start}
        onPause={() => timerStore.send({type: 'pause'})}
        onStop={reset}
      />

      <section className="border-t-3 border-ink pt-3 sm:pt-4" aria-labelledby="session-settings-heading">
        <div className="mb-2 flex items-baseline justify-between gap-3 sm:mb-3">
          <h2 id="session-settings-heading" className="font-display text-base uppercase sm:text-lg">Session</h2>
          <span className="text-right text-[9px] font-bold uppercase text-muted sm:text-[10px]">
            {timerState === 'settings' ? 'Choose duration and first interval' : 'Locked during a session'}
          </span>
        </div>
        <div className="grid gap-2">
          <SettingControl
            value={workTime}
            appliedValue={appliedWorkTime}
            mode="work"
            isFirst={!startWithRest}
            isPlaying={timerState !== 'settings'}
            label="Work"
            onChange={setWorkTime}
            onSelectFirst={() => setStartWithRest(false)}
          />
          <SettingControl
            value={restTime}
            appliedValue={appliedRestTime}
            mode="rest"
            isFirst={startWithRest}
            isPlaying={timerState !== 'settings'}
            label="Rest"
            onChange={setRestTime}
            onSelectFirst={() => setStartWithRest(true)}
          />
        </div>
        <TimerOptions
          playSound={playSound}
          wakeLockError={wakeLockError}
          wakeLockLocked={wakeLockLocked}
          wakeLockSupported={wakeLockSupported}
          onWakeLockToggle={handleWakeLockToggle}
        />
      </section>
    </div>
  );
}
