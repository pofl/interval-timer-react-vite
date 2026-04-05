import { IntervalTimer } from "./IntervalTimer";

export function App() {
  return (
    <div className="flex flex-col items-center text-gray-850">
      <h1 className="font-press-start-2p mb-8 text-4xl font-bold text-gray-700">Interval Timer</h1>
      <IntervalTimer />
    </div>
  );
}
