import type {Mode} from '../../hooks/timer-store';

interface TimerSummaryProps {
  appliedRestTime: number;
  appliedWorkTime: number;
  mode: Mode;
}

export function TimerSummary({appliedRestTime, appliedWorkTime, mode}: TimerSummaryProps) {
  return (
    <table className="mb-4 w-full table-auto border-collapse text-sm bg-black/40 border border-neon-purple/30 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(176,38,255,0.2)]">
      <tbody>
        <tr className="border-b border-neon-purple/30">
          <td className="px-4 py-3 text-neon-blue uppercase tracking-widest font-bold">Work Time</td>
          <td className="px-4 py-3 text-neon-pink font-bold text-right text-lg">{appliedWorkTime}</td>
        </tr>
        <tr className="border-b border-neon-purple/30">
          <td className="px-4 py-3 text-neon-blue uppercase tracking-widest font-bold">Rest Time</td>
          <td className="px-4 py-3 text-neon-pink font-bold text-right text-lg">{appliedRestTime}</td>
        </tr>
        <tr>
          <td className="px-4 py-3 text-neon-blue uppercase tracking-widest font-bold">Mode</td>
          <td className="min-w-[8ex] px-4 py-3 text-neon-green font-bold text-right text-lg uppercase tracking-widest animate-pulse shadow-neon-green">
            {mode}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
