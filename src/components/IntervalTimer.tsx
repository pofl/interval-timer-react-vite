import { useEffect, useMemo, useState } from 'react';
import { Mode, modeStore, useMode } from '../hooks/mode-store';
import { settingsStore, useRestTime, useStartWithRest, useWorkTime } from '../hooks/settings-store';
import { timerStore, useIsPlaying, useRemainingTime } from '../hooks/timer-store';
import { useWakeLock } from '../hooks/use-wake-lock';
import { SettingControl } from './SettingControl';

// const sound = new Audio('https://cdn.freesound.org/previews/351/351550_3450800-lq.mp3'); // ding
const sound = new Audio('https://cdn.freesound.org/previews/366/366102_6687700-lq.mp3'); // gentle clong
// https://cdn.freesound.org/previews/446/446114_758593-lq.mp3 // jingly clong
// https://cdn.freesound.org/previews/394/394795_6887623-lq.mp3 // glass ding
// https://cdn.freesound.org/previews/615/615949_13086280-lq.mp3 // cash ding
// https://cdn.freesound.org/previews/187/187306_2094213-lq.mp3 // train door

export function IntervalTimer() {
  const workTime = useWorkTime();
  const restTime = useRestTime();
  const startWithRest = useStartWithRest();
  const setWorkTime = (value: number) => settingsStore.send({type: 'set', workTime: value});
  const setRestTime = (value: number) => settingsStore.send({type: 'set', restTime: value});
  const setStartWithRest = (startWithRest: boolean) => settingsStore.send({type: 'set', startWithRest});

  const storageKeyPlaySound = 'playSound';
  const [playSound, setPlaySound] = useState((localStorage.getItem(storageKeyPlaySound) || 'true') == 'true');
  useEffect(() => {
    localStorage.setItem(storageKeyPlaySound, String(playSound));
  }, [playSound]);

  const initialMode = startWithRest ? 'rest' : ('work' as Mode);
  const getModeTime: Record<Mode, () => number> = {
    work: () => workTime,
    rest: () => restTime,
  };
  const mode = useMode();
  useEffect(() => {
    const newMaxTime = getModeTime[mode]();
    setMaxTime(newMaxTime);
    timerStore.send({type: 'setRemainingTime', time: newMaxTime});
  }, [mode]);

  const isPlaying = useIsPlaying();
  const remainingTime = useRemainingTime();

  const [maxTime, setMaxTime] = useState(getModeTime[mode]());

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    if (remainingTime <= 0) {
      if (playSound) {
        sound.play();
      }
      const interval = setInterval(() => modeStore.send({type: 'switch'}), 500);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => timerStore.send({type: 'tick'}), 1000);
      return () => clearInterval(interval);
    }
  }, [remainingTime, isPlaying]);

  const reset = () => {
    timerStore.send({type: 'setIsPlaying', isPlaying: false});
    modeStore.send({type: 'setMode', mode: initialMode});
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

  const handlewakeLockToggle = async () => {
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

      <table className="mb-2 border-collapse">
        <tbody>
          <tr>
            <td className="px-2">Work Time</td>
            <td className="px-2">{workTime}</td>
          </tr>
          <tr>
            <td className="px-2">Rest Time</td>
            <td className="px-2">{restTime}</td>
          </tr>
          <tr>
            <td className="px-2">Mode</td>
            <td className="px-2">{mode}</td>
          </tr>
          <tr>
            <td className="px-2">Remaining</td>
            <td className="px-2">
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
              <input type="checkbox" checked={wakeLockLocked} onChange={handlewakeLockToggle} />
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
