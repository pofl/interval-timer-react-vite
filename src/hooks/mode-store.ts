import { createStore } from '@xstate/store';
import { useSelector } from '@xstate/store/react';

export const modes = ["work", "rest"] as const;

export type Mode = typeof modes[number];

export const modeStore = createStore({
  context: {
    mode: "rest" as Mode
  },
  on: {
    switch: (context) => {
      const nextModeIndex = (modes.indexOf(context.mode) + 1) % modes.length;
      return {
        ...context,
        mode: modes[nextModeIndex]
      };
    },
    setMode: (context, event: {mode: Mode}) => ({
      ...context,
      mode: event.mode,
    }),
  },
});

export const useMode = () => useSelector(modeStore, (state) => state.context.mode);
