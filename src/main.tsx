import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { IntervalTimer } from './components/IntervalTimer.tsx';
import { initSettingsStore } from './hooks/settings-store.ts';
import './interval.css';

initSettingsStore();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntervalTimer />
  </StrictMode>
);
