import type {Mode} from '../../hooks/timer-store';

interface TimerSummaryProps {
  appliedRestTime: number;
  appliedWorkTime: number;
  mode: Mode;
}

export function TimerSummary({appliedRestTime, appliedWorkTime, mode}: TimerSummaryProps) {
  return (
    <table className="border-neon-purple/30 mb-2 w-full table-auto border-collapse overflow-hidden rounded-lg border bg-black/40 text-xs shadow-[0_0_15px_rgba(176,38,255,0.2)] sm:mb-4 sm:text-sm">
      <tbody>
        <tr className="border-neon-purple/30 border-b">
          <td className="text-neon-blue px-2 py-2 font-bold tracking-widest uppercase sm:px-4 sm:py-3">Work Time</td>
          <td className="text-neon-pink px-2 py-2 text-right text-base font-bold sm:px-4 sm:py-3 sm:text-lg">
            {appliedWorkTime}
          </td>
        </tr>
        <tr className="border-neon-purple/30 border-b">
          <td className="text-neon-blue px-2 py-2 font-bold tracking-widest uppercase sm:px-4 sm:py-3">Rest Time</td>
          <td className="text-neon-pink px-2 py-2 text-right text-base font-bold sm:px-4 sm:py-3 sm:text-lg">
            {appliedRestTime}
          </td>
        </tr>
        <tr>
          <td className="text-neon-blue px-2 py-2 font-bold tracking-widest uppercase sm:px-4 sm:py-3">Mode</td>
          <td className="text-neon-green shadow-neon-green min-w-[8ex] animate-pulse px-2 py-2 text-right text-base font-bold tracking-widest uppercase sm:px-4 sm:py-3 sm:text-lg">
            {mode}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
