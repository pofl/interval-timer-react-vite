import {IntervalTimer} from './IntervalTimer';

export function App() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center p-4">
      {/* Soft Gradient Background Bubbles */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-neon-purple/30 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 -right-20 h-80 w-80 rounded-full bg-neon-blue/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-neon-pink/20 blur-[90px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full bg-neon-green/10 blur-[100px]" />

      <div className="z-10 flex w-full flex-col items-center justify-center">
        <h1 className="font-press-start-2p mb-8 text-2xl sm:text-4xl font-bold text-neon-pink uppercase tracking-widest text-center drop-shadow-[0_0_15px_rgba(255,0,255,0.8)]">
          Interval Timer
        </h1>
        <IntervalTimer />
      </div>
    </div>
  );
}
