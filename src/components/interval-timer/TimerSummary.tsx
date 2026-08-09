interface TimerSummaryProps {
  appliedRestTime: number;
  appliedWorkTime: number;
}

export function TimerSummary({appliedRestTime, appliedWorkTime}: TimerSummaryProps) {
  return (
    <table className="w-full border-collapse border-2 border-line bg-surface text-xs sm:text-sm">
      <caption className="sr-only">Current interval durations in seconds</caption>
      <tbody>
        <tr className="border-b-2 border-line">
          <th scope="row" className="px-4 py-3 text-left font-bold uppercase tracking-wide">Work</th>
          <td className="px-4 py-3 text-right text-base font-bold sm:text-lg">
            {appliedWorkTime}<span className="ml-1 text-[9px] uppercase text-muted">sec</span>
          </td>
        </tr>
        <tr>
          <th scope="row" className="px-4 py-3 text-left font-bold uppercase tracking-wide">Rest</th>
          <td className="px-4 py-3 text-right text-base font-bold sm:text-lg">
            {appliedRestTime}<span className="ml-1 text-[9px] uppercase text-muted">sec</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
