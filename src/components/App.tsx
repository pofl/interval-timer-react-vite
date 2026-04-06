import {IntervalTimer} from './IntervalTimer';

export function App() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <h1 className="font-press-start-2p mb-8 text-2xl sm:text-4xl font-bold text-neon-pink uppercase tracking-widest text-center shadow-neon-pink drop-shadow-[0_0_15px_rgba(255,0,255,0.8)]">
        Interval Timer
      </h1>
      <IntervalTimer />
    </div>
  );
}
