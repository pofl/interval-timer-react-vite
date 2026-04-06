import {useEffect, useState} from 'react';
import {setRestTime, setWorkTime, useRestTime, useStartWithRest, useWorkTime} from '../hooks/settings-store';
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
import {useWakeLock} from '../hooks/use-wake-lock';
import {SettingControl} from './SettingControl';
import {TimerActions} from './interval-timer/TimerActions';
import {TimerOptions} from './interval-timer/TimerOptions';
import {TimerProgressDisplay} from './interval-timer/TimerProgressDisplay';
import {TimerSummary} from './interval-timer/TimerSummary';

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

  useEffect(() => {
    if (isPlaying) {
      void requestWakeLock();
    }
  }, [isPlaying, requestWakeLock]);

  return (
    <div className="bg-dark-bg border-neon-purple/80 z-10 flex w-full max-w-lg flex-col items-center gap-2 rounded-xl border p-4 tabular-nums shadow-[0_0_20px_rgba(176,38,255,0.6)] transition-shadow sm:gap-4 sm:rounded-2xl sm:border-2 sm:p-6">
      <SettingControl value={workTime} label="Work Time" onChange={(value: number) => setWorkTime(value)} />
      <SettingControl value={restTime} label="Rest Time" onChange={(value: number) => setRestTime(value)} />
      <TimerOptions
        playSound={playSound}
        startWithRest={startWithRest}
        wakeLockError={wakeLockError}
        wakeLockLocked={wakeLockLocked}
        wakeLockSupported={wakeLockSupported}
        onWakeLockToggle={handleWakeLockToggle}
      />
      <TimerActions
        isPlaying={isPlaying}
        remainingTime={remainingTime}
        onReset={reset}
        onToggle={() => timerStore.send({type: 'toggle'})}
      />

      <hr className="border-neon-purple/50 my-2 w-full border shadow-[0_0_8px_rgba(176,38,255,0.6)]" />

      <TimerSummary appliedRestTime={appliedRestTime} appliedWorkTime={appliedWorkTime} mode={mode} />
      <TimerProgressDisplay maxTime={maxTime} remainingTime={remainingTime} />
    </div>
  );
}
