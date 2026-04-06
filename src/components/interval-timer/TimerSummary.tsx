import type {Mode} from '../../hooks/timer-store';

interface TimerSummaryProps {
  appliedRestTime: number;
  appliedWorkTime: number;
  mode: Mode;
}

export function TimerSummary({appliedRestTime, appliedWorkTime, mode}: TimerSummaryProps) {
  return (
    <table className="mb-2 table-auto border-collapse">
      <tbody>
        <tr>
          <td className="px-2">Work Time</td>
          <td className="px-2">{appliedWorkTime}</td>
        </tr>
        <tr>
          <td className="px-2">Rest Time</td>
          <td className="px-2">{appliedRestTime}</td>
        </tr>
        <tr>
          <td className="px-2">Mode</td>
          <td className="min-w-[8ex] px-2">{mode}</td>
        </tr>
      </tbody>
    </table>
  );
}
