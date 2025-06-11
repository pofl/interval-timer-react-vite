import { createStore } from '@xstate/store';
import { useSelector } from '@xstate/store/react';

const [storageKeyWorkTime, storageKeyRestTime, storageKeyStartWithRest] = ['workTime', 'restTime', 'startWithRest'];
export const settingsStore = createStore({
  context: {
    workTime: parseInt(localStorage.getItem(storageKeyWorkTime) || '25'),
    restTime: parseInt(localStorage.getItem(storageKeyRestTime) || '5'),
    startWithRest: (localStorage.getItem(storageKeyStartWithRest) || 'true') == 'true',
  },
  on: {
    set: (context, event: {workTime?: number; restTime?: number; startWithRest?: boolean}) => {
      Object.assign(context, event);
      return context;
    },
  },
});

export const useWorkTime = () => useSelector(settingsStore, (state) => state.context.workTime);
export const useRestTime = () => useSelector(settingsStore, (state) => state.context.restTime);
export const useStartWithRest = () => useSelector(settingsStore, (state) => state.context.startWithRest);
export const setWorkTime = (value: number) => settingsStore.send({type: 'set', workTime: value});
export const setRestTime = (value: number) => settingsStore.send({type: 'set', restTime: value});
export const setStartWithRest = (startWithRest: boolean) => settingsStore.send({type: 'set', startWithRest});

export function initSettingsStore() {
  console.log('Initializing settings store');
  settingsStore.subscribe((snapshot) => {
    localStorage.setItem(storageKeyWorkTime, String(snapshot.context.workTime));
    localStorage.setItem(storageKeyRestTime, String(snapshot.context.restTime));
    localStorage.setItem(storageKeyStartWithRest, String(snapshot.context.startWithRest));
  });
}
