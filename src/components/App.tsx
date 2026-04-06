import {IntervalTimer} from './IntervalTimer';

export function App() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center p-2 sm:p-4">
      {/* Soft Gradient Background Bubbles */}
      <div className="bg-neon-purple/30 pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full blur-[100px]" />
      <div className="bg-neon-blue/20 pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full blur-[120px]" />
      <div className="bg-neon-pink/20 pointer-events-none absolute top-1/4 right-1/4 h-64 w-64 rounded-full blur-[90px]" />
      <div className="bg-neon-green/10 pointer-events-none absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full blur-[100px]" />

      <div className="z-10 flex w-full flex-col items-center justify-center">
        <h1 className="font-press-start-2p text-neon-pink mb-4 text-center text-xl font-bold tracking-widest uppercase drop-shadow-[0_0_15px_rgba(255,0,255,0.8)] sm:mb-8 sm:text-4xl">
          Interval Timer
        </h1>
        <IntervalTimer />
      </div>
    </div>
  );
}
