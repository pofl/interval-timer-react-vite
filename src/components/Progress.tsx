interface ProgressProps {
  value: number;
  max: number;
  className?: string;
}

export function Progress({ value, max, className = '' }: ProgressProps) {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className={`bg-stone-300 relative h-6 overflow-hidden rounded-lg ${className}`}>
      <div
        className="bg-stone-500 h-full transition-all duration-300 ease-linear"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
