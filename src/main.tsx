import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App.tsx';
import { initSettingsStore } from './hooks/settings-store.ts';
import './interval.css';

initSettingsStore();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
