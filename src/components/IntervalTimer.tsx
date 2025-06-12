import { useEffect, useMemo, useState } from 'react';
import {
  setRestTime,
  setStartWithRest,
  setWorkTime,
  useRestTime,
  useStartWithRest,
  useWorkTime,
} from '../hooks/settings-store';
import {
  getModeTime,
  setPlaySound,
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

  const wakeLockLocked = useMemo(() => {
    if (wakeLockReleased === undefined) return false;
    return !wakeLockReleased;
  }, [wakeLockReleased]);

  const handleWakeLockToggle = async () => {
    if (wakeLockLocked) {
      await releaseWakeLock();
    } else {
      await requestWakeLock();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      requestWakeLock();
    }
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center p-1">
      <h1 className="mb-4 text-2xl font-bold">Interval Timer</h1>
      <SettingControl value={workTime} label="Work Time" onChange={(value: number) => setWorkTime(value)} />
      <SettingControl value={restTime} label="Rest Time" onChange={(value: number) => setRestTime(value)} />
      <div>
        <label className="space-x-1">
          <input type="checkbox" checked={startWithRest} onChange={(e) => setStartWithRest(e.target.checked)} />
          <span>Start with Rest</span>
        </label>
      </div>
      <div>
        <button className="bg-sand-500 m-1 rounded-sm px-4 py-1.5" onClick={reset}>
          Reset
        </button>
      </div>

      <hr className="border-sand-500 my-3 w-[85%] border" />

      <table className="mb-2 table-auto border-collapse">
        <tbody>
          <tr>
            <td className="px-2">Work Time</td>
            <td className="px-2">{appliedWorkTime}</td>
          </tr>
          <tr>
            <td className="px-2">Rest Time</td>
            <td className="px-2">{appliedRestTime}</td>
          </tr>
          <tr>
            <td className="px-2">Mode</td>
            <td className="px-2">{mode}</td>
          </tr>
          <tr>
            <td className="px-2">Remaining</td>
            <td className="min-w-[8ex] px-2">
              <b>
                {remainingTime} / {maxTime}
              </b>
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <div>
          {wakeLockError ? (
            <span>Screen Lock Prevention Error: {wakeLockError}</span>
          ) : !wakeLockSupported ? (
            'Screen Lock Prevention Not Supported'
          ) : (
            <label className="space-x-1">
              <input type="checkbox" checked={wakeLockLocked} onChange={handleWakeLockToggle} />
              <span>Keep Screen On</span>
            </label>
          )}
        </div>
        <div>
          <label className="space-x-1">
            <input type="checkbox" checked={playSound} onChange={(e) => setPlaySound(e.target.checked)} />
            <span>Play sound</span>
          </label>
        </div>
      </div>
      <div>
        <button className="bg-sand-500 m-1 rounded-sm px-4 py-1.5" onClick={() => timerStore.send({type: 'toggle'})}>
          {!isPlaying && remainingTime > 0 ? 'Start' : 'Pause'}
        </button>
      </div>
    </div>
  );
}
