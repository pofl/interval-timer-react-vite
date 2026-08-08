import { IntervalTimer } from './IntervalTimer';

export function App() {
  return (
    <main className="flex min-h-[100dvh] w-full items-center justify-center px-3 py-3 sm:p-6">
      <div className="w-full max-w-xl">
        <header className="mb-3 flex items-end justify-between border-b-4 border-ink pb-2 sm:mb-4">
          <h1 className="font-display text-2xl leading-none uppercase sm:text-3xl">Interval<br />Timer</h1>
          <span className="mb-0.5 bg-yellow px-2 py-1 text-[10px] font-bold uppercase shadow-[3px_3px_0_#171717]">Go Mode</span>
        </header>
        <IntervalTimer />
      </div>
    </main>
  );
}
