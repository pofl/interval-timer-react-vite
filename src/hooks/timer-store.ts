import { createStore } from '@xstate/store';
import { useSelector } from '@xstate/store/react';
import { storageKeyRestTime, storageKeyWorkTime } from './settings-store';

// const sound = new Audio('https://cdn.freesound.org/previews/351/351550_3450800-lq.mp3'); // ding
const sound = new Audio('https://cdn.freesound.org/previews/366/366102_6687700-lq.mp3'); // gentle clong
// https://cdn.freesound.org/previews/446/446114_758593-lq.mp3 // jingly clong
// https://cdn.freesound.org/previews/394/394795_6887623-lq.mp3 // glass ding
// https://cdn.freesound.org/previews/615/615949_13086280-lq.mp3 // cash ding
// https://cdn.freesound.org/previews/187/187306_2094213-lq.mp3 // train door

export const modes = ['work', 'rest'] as const;

export type Mode = (typeof modes)[number];

export const timerStore = createStore({
  context: {
    workTime: parseInt(localStorage.getItem(storageKeyWorkTime) || '25'),
    restTime: parseInt(localStorage.getItem(storageKeyRestTime) || '5'),
    mode: 'rest' as Mode,
    isPlaying: false,
    interval: 0,
    remainingTime: 0,
    playSound: (localStorage.getItem('playSound') || 'true') === 'true',
  },
  // emits: {
  //   started: () => {},
  //   paused: () => {},
  // },
  on: {
    toggle: (context) => {
      const nextIsPlaying = !context.isPlaying;
      let nextInterval = context.interval;
      if (nextIsPlaying) {
        nextInterval = setInterval(tick, 1000);
      } else {
        clearInterval(context.interval);
        nextInterval = 0;
      }

      return {
        ...context,
        isPlaying: nextIsPlaying,
        interval: nextInterval,
      };
    },
    tick: (context) => {
      const newRemainingTime = context.remainingTime - 1;
      let nextInterval = context.interval;
      if (newRemainingTime <= 0) {
        if (context.playSound) {
          sound.play();
        }
        clearInterval(nextInterval);
        nextInterval = 0;
        setTimeout(() => {
          timerStore.send({type: 'switchToNextMode'});
        }, 500);
      }
      return {
        ...context,
        interval: nextInterval,
        remainingTime: newRemainingTime,
      };
    },
    switchToNextMode: (context) => {
      const nextModeIndex = (modes.indexOf(context.mode) + 1) % modes.length;
      const nextMode = modes[nextModeIndex];
      const nextRemainingTime = getModeTime(context, nextMode);
      return {
        ...context,
        interval: setInterval(tick, 1000),
        isPlaying: true,
        mode: modes[nextModeIndex],
        remainingTime: nextRemainingTime,
      };
    },
    reset: (context, event: {mode: Mode; workTime: number; restTime: number}) => {
      clearInterval(context.interval);
      return {
        ...context,
        isPlaying: false,
        interval: 0,
        mode: event.mode,
        remainingTime: getModeTime(event, event.mode),
        workTime: event.workTime,
        restTime: event.restTime,
      };
    },
    setPlaySound: (context, event: {playSound: boolean}) => {
      localStorage.setItem('playSound', String(event.playSound));
      return {
        ...context,
        playSound: event.playSound,
      };
    },
  },
});

export function getModeTime(obj: {workTime: number; restTime: number}, mode: Mode): number {
  const lookup = {
    work: obj.workTime,
    rest: obj.restTime,
  };
  return lookup[mode];
}

export const setPlaySound = (playSound: boolean) => timerStore.send({type: 'setPlaySound', playSound});
const tick = () => timerStore.send({type: 'tick'});
export const useIsPlaying = () => useSelector(timerStore, (state) => state.context.isPlaying);
export const useRemainingTime = () => useSelector(timerStore, (state) => state.context.remainingTime);
export const useMode = () => useSelector(timerStore, (state) => state.context.mode);
export const usePlaySound = () => useSelector(timerStore, (state) => state.context.playSound);
export const useAppliedWorkTime = () => useSelector(timerStore, (state) => state.context.workTime);
export const useAppliedRestTime = () => useSelector(timerStore, (state) => state.context.restTime);
