import { useEffect, useState } from "react";
import ReactWakeLock from "./ReactWakeLock";
import { SettingControl } from "./SettingControl";

// const sound = new Audio('https://cdn.freesound.org/previews/351/351550_3450800-lq.mp3'); // ding
const sound = new Audio('https://cdn.freesound.org/previews/366/366102_6687700-lq.mp3'); // gentle clong
// https://cdn.freesound.org/previews/446/446114_758593-lq.mp3 // jingly clong
// https://cdn.freesound.org/previews/394/394795_6887623-lq.mp3 // glass ding
// https://cdn.freesound.org/previews/615/615949_13086280-lq.mp3 // cash ding
// https://cdn.freesound.org/previews/187/187306_2094213-lq.mp3 // train door

export function IntervalTimer() {
  const [storageKeyWorkTime, storageKeyRestTime, storageKeyPlaySound, storageKeyStartWithRest] = ['workTime', 'restTime', 'playSound', 'startWithRest'];

  const [workTime, setWorkTime] = useState(parseInt(localStorage.getItem(storageKeyWorkTime) || '25'));
  useEffect(() => { localStorage.setItem(storageKeyWorkTime, String(workTime)) }, [workTime])

  const [restTime, setRestTime] = useState(parseInt(localStorage.getItem(storageKeyRestTime) || '5'));
  useEffect(() => { localStorage.setItem(storageKeyRestTime, String(restTime)) }, [restTime])

  const [playSound, setPlaySound] = useState((localStorage.getItem(storageKeyPlaySound) || 'true') == 'true');
  useEffect(() => { localStorage.setItem(storageKeyPlaySound, String(playSound)) }, [playSound])

  const [startWithRest, setStartWithRest] = useState((localStorage.getItem(storageKeyStartWithRest) || 'true') == 'true');
  useEffect(() => { localStorage.setItem(storageKeyStartWithRest, String(startWithRest)) }, [startWithRest])

  const modes = ['work', 'rest'];
  const texts = ['Work Time', 'Rest Time'];
  const getModeTime = [() => workTime, () => restTime];

  const initialMode = startWithRest ? 'rest' : 'work'

  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState(modes.indexOf(initialMode));
  const [timer, setTimer] = useState(getModeTime[mode]());
  const [maxTime, setMaxTime] = useState(getModeTime[mode]());

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    if (timer <= 0) {
      if (playSound) { sound.play(); }
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
    const newMaxTime = getModeTime[newMode]()
    setMode(newMode);
    setMaxTime(newMaxTime);
    setTimer(newMaxTime);
  }

  const switchMode = () => {
    const newMode = (mode + 1) % modes.length;
    enterMode(newMode);
  }

  return (
    <div style={{ padding: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ReactWakeLock />
      <hr style={{ width: '100%' }} />
      <SettingControl value={workTime} label="Work Time" onChange={(value: number) => setWorkTime(value)} />
      <SettingControl value={restTime} label="Rest Time" onChange={(value: number) => setRestTime(value)} />
      <div style={{ width: '100%' }}>
        <b>Settings</b>
        <br />
        Work Time: {workTime}
        <br />
        Rest Time: {restTime}
        <br />
        <label>
          <input
            type="checkbox"
            checked={startWithRest}
            onChange={(e) => setStartWithRest(e.target.checked)}
          />
          Start with Rest
        </label>
      </div>
      <hr style={{ width: '100%' }} />
      <div>
        <button className='pad-l marg' onClick={() => setIsPlaying(!isPlaying)}>
          {!isPlaying && timer > 0 ? "Start" : "Pause"}
        </button>
        <button className='pad-l marg' onClick={() => reset()}>Reset</button>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={playSound}
            onChange={(e) => setPlaySound(e.target.checked)}
          />
          Play sound
        </label>
        <div>Now: {texts[mode]}</div>
        <div>Remaining: {timer}</div>
        <div>Total: {maxTime}</div>
      </div>
    </div>
  );
}
