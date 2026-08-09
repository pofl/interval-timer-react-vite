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
    <main className="flex min-h-[100dvh] w-full justify-center px-3 py-2 sm:px-6 sm:py-10">
      <div className="w-full max-w-2xl">
        <header className="mb-3 flex items-center justify-between gap-4 border-b-3 border-ink pb-3 sm:mb-7 sm:pb-4">
          <h1 className="font-display text-[clamp(1.5rem,6vw,2.5rem)] leading-none uppercase">Interval Timer</h1>
          <div
            className="flex shrink-0 border-2 border-ink bg-surface text-[10px] font-bold uppercase sm:text-xs"
            role="group"
            aria-label="Color theme"
          >
              {(['system', 'light', 'dark'] as const).map((theme) => (
                <button
                  key={theme}
                  type="button"
                  aria-pressed={themePreference === theme}
                  className={`min-h-9 border-r-2 border-ink px-2 transition-colors last:border-r-0 sm:px-3 ${themePreference === theme ? 'bg-ink text-paper' : 'hover:bg-line'}`}
                  onClick={() => setThemePreference(theme)}
                >
                  {theme === 'system' ? 'Auto' : theme}
                </button>
              ))}
          </div>
        </header>
        <IntervalTimer />
      </div>
    </main>
  );
}
