import { createStore } from '@xstate/store';
import { useSelector } from '@xstate/store/react';

export const timerState = createStore({
  context: {
    remainingTime: 0,
    isPlaying: false,
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
    }
    // reset: (context, event: {time: number, isPlaying: boolean}) => {
    //   context.remainingTime = event.time;
    //   context.isPlaying = event.isPlaying;
    // },
  },
});

export const useIsPlaying = () => useSelector(timerState, (state) => state.context.isPlaying);
export const useRemainingTime = () => useSelector(timerState, (state) => state.context.remainingTime);
