import { useEffect, useState } from 'react';
import { IntervalTimer } from './IntervalTimer';

type ThemePreference = 'system' | 'light' | 'dark';

const themeStorageKey = 'themePreference';

function getThemePreference(): ThemePreference {
  const savedTheme = localStorage.getItem(themeStorageKey);
  return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'system';
}

export function App() {
  const [themePreference, setThemePreference] = useState<ThemePreference>(getThemePreference);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      const theme = themePreference === 'system' ? (mediaQuery.matches ? 'dark' : 'light') : themePreference;
      document.documentElement.dataset.theme = theme;
    };

    applyTheme();
    localStorage.setItem(themeStorageKey, themePreference);

    if (themePreference === 'system') {
      mediaQuery.addEventListener('change', applyTheme);
      return () => mediaQuery.removeEventListener('change', applyTheme);
    }
  }, [themePreference]);

  return (
    <main className="flex min-h-[100dvh] w-full items-center justify-center px-3 py-3 sm:p-6">
      <div className="w-full max-w-xl">
        <header className="mb-3 flex items-end justify-between border-b-4 border-ink pb-2 sm:mb-4">
          <h1 className="font-display text-2xl leading-none uppercase sm:text-3xl">Interval<br />Timer</h1>
          <div className="flex flex-col items-end gap-2">
            <span className="brutal-shadow-sm bg-yellow px-2 py-1 text-[10px] font-bold uppercase">Go Mode</span>
            <div className="flex border-2 border-ink text-[9px] font-bold uppercase">
              {(['system', 'light', 'dark'] as const).map((theme) => (
                <button
                  key={theme}
                  type="button"
                  aria-pressed={themePreference === theme}
                  className={`min-h-7 border-r-2 border-ink px-1.5 last:border-r-0 ${themePreference === theme ? 'bg-pink' : 'bg-paper'}`}
                  onClick={() => setThemePreference(theme)}
                >
                  {theme === 'system' ? 'Auto' : theme}
                </button>
              ))}
            </div>
          </div>
        </header>
        <IntervalTimer />
      </div>
    </main>
  );
}
