import { createStore } from '@xstate/store';
import { useSelector } from '@xstate/store/react';

export const modes = ['work', 'rest'] as const;

export type Mode = (typeof modes)[number];

export const timerStore = createStore({
  context: {
    remainingTime: 0,
    isPlaying: false,
    mode: 'rest' as Mode,
  },
  // emits: {
  //   started: () => {},
  //   paused: () => {},
  // },
  on: {
    toggle: (context) => ({
      ...context,
      isPlaying: !context.isPlaying,
    }),
    tick: (context) => {
      context.remainingTime -= 1;
    },
    setRemainingTime: (context, event: {time: number}) => {
      context.remainingTime = event.time;
    },
    setIsPlaying: (context, event: {isPlaying: boolean}) => {
      context.isPlaying = event.isPlaying;
    },
    // reset: (context, event: {time: number, isPlaying: boolean}) => {
    //   context.remainingTime = event.time;
    //   context.isPlaying = event.isPlaying;
    // },
    switch: (context) => {
      const nextModeIndex = (modes.indexOf(context.mode) + 1) % modes.length;
      return {
        ...context,
        mode: modes[nextModeIndex],
      };
    },
    setMode: (context, event: {mode: Mode}) => ({
      ...context,
      mode: event.mode,
    }),
  },
});

export const useIsPlaying = () => useSelector(timerStore, (state) => state.context.isPlaying);
export const useRemainingTime = () => useSelector(timerStore, (state) => state.context.remainingTime);
export const useMode = () => useSelector(timerStore, (state) => state.context.mode);
