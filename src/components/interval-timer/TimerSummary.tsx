interface TimerSummaryProps {
  appliedRestTime: number;
  appliedWorkTime: number;
}

export function TimerSummary({appliedRestTime, appliedWorkTime}: TimerSummaryProps) {
  return (
    <table className="w-full border-collapse border-3 border-ink bg-paper text-xs sm:text-sm">
      <tbody>
        <tr className="border-b-3 border-ink">
          <td className="px-3 py-2 font-bold tracking-wide uppercase">Work</td>
          <td className="bg-mint px-3 py-2 text-right text-base font-bold sm:text-lg">
            {appliedWorkTime}
          </td>
        </tr>
        <tr className="border-b-3 border-ink">
          <td className="px-3 py-2 font-bold tracking-wide uppercase">Rest</td>
          <td className="bg-blue px-3 py-2 text-right text-base font-bold sm:text-lg">
            {appliedRestTime}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
