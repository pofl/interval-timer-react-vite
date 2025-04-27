import { useEffect, useMemo, useState } from 'react';
import { useWakeLock } from '../hooks/use-wake-lock';
import { SettingControl } from './SettingControl';

// const sound = new Audio('https://cdn.freesound.org/previews/351/351550_3450800-lq.mp3'); // ding
const sound = new Audio('https://cdn.freesound.org/previews/366/366102_6687700-lq.mp3'); // gentle clong
// https://cdn.freesound.org/previews/446/446114_758593-lq.mp3 // jingly clong
// https://cdn.freesound.org/previews/394/394795_6887623-lq.mp3 // glass ding
// https://cdn.freesound.org/previews/615/615949_13086280-lq.mp3 // cash ding
// https://cdn.freesound.org/previews/187/187306_2094213-lq.mp3 // train door

export function IntervalTimer() {
  const [storageKeyWorkTime, storageKeyRestTime, storageKeyPlaySound, storageKeyStartWithRest] = [
    'workTime',
    'restTime',
    'playSound',
    'startWithRest',
  ];

  const [workTime, setWorkTime] = useState(parseInt(localStorage.getItem(storageKeyWorkTime) || '25'));
  useEffect(() => {
    localStorage.setItem(storageKeyWorkTime, String(workTime));
  }, [workTime]);

  const [restTime, setRestTime] = useState(parseInt(localStorage.getItem(storageKeyRestTime) || '5'));
  useEffect(() => {
    localStorage.setItem(storageKeyRestTime, String(restTime));
  }, [restTime]);

  const [playSound, setPlaySound] = useState((localStorage.getItem(storageKeyPlaySound) || 'true') == 'true');
  useEffect(() => {
    localStorage.setItem(storageKeyPlaySound, String(playSound));
  }, [playSound]);

  const [startWithRest, setStartWithRest] = useState(
    (localStorage.getItem(storageKeyStartWithRest) || 'true') == 'true'
  );
  useEffect(() => {
    localStorage.setItem(storageKeyStartWithRest, String(startWithRest));
  }, [startWithRest]);

  const modes = ['work', 'rest'];
  const getModeTime = [() => workTime, () => restTime];

  const initialMode = startWithRest ? 'rest' : 'work';

  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState(modes.indexOf(initialMode));
  const [timer, setTimer] = useState(getModeTime[mode]());
  const [maxTime, setMaxTime] = useState(getModeTime[mode]());

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    if (timer <= 0) {
      if (playSound) {
        sound.play();
      }
      const interval = setInterval(switchMode, 500);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => setTimer((prevTimer) => prevTimer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, isPlaying]);

  const reset = () => {
    setIsPlaying(false);
    enterMode(modes.indexOf(initialMode));
  };

  const enterMode = (newMode: number) => {
    const newMaxTime = getModeTime[newMode]();
    setMode(newMode);
    setMaxTime(newMaxTime);
    setTimer(newMaxTime);
  };

  const switchMode = () => {
    const newMode = (mode + 1) % modes.length;
    enterMode(newMode);
  };

  const [error, setError] = useState<string | null>(null);
  const {isSupported, released, request, release} = useWakeLock({
    onError: (error) => {
      alert('error in wake lock: ' + error.message);
      setError(error.message || 'An unknown error occurred');
    },
    reacquireOnPageVisible: true,
  });

  const isLocked = useMemo(() => {
    if (released === undefined) return false;
    return !released;
  }, [released]);

  const handleToggle = async () => {
    if (isLocked) {
      await release();
    } else {
      await request();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      request();
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
        <button className="bg-sand-500 m-1 rounded-sm px-4 py-1.5" onClick={() => reset()}>
          Reset
        </button>
      </div>

      <hr className="my-3 w-[85%] border-sand-500 border" />

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
            <td className="px-2">{modes[mode]}</td>
          </tr>
          <tr>
            <td className="px-2">Remaining</td>
            <td className="px-2">
              <b>
                {timer} / {maxTime}
              </b>
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <div>
          {error ? (
            <span>Screen Lock Prevention Error: {error}</span>
          ) : !isSupported ? (
            'Screen Lock Prevention Not Supported'
          ) : (
            <label className="space-x-1">
              <input type="checkbox" checked={isLocked} onChange={handleToggle} />
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
        <button className="bg-sand-500 m-1 rounded-sm px-4 py-1.5" onClick={() => setIsPlaying(!isPlaying)}>
          {!isPlaying && timer > 0 ? 'Start' : 'Pause'}
        </button>
      </div>
    </div>
  );
}
