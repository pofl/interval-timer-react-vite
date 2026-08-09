import { Button } from './ui/Button';

interface SettingControlProps {
  value: number;
  onChange: (newValue: number) => void;
  label: string;
}

export function SettingControl({value, onChange, label}: SettingControlProps) {
  const updateValue = (nextValue: number) => {
    if (Number.isFinite(nextValue)) {
      onChange(Math.max(1, Math.round(nextValue)));
    }
  };

  return (
    <div className="grid w-full grid-cols-[3.25rem_minmax(0,1fr)] gap-2 border-2 border-line bg-surface p-2 sm:grid-cols-[1fr_auto] sm:p-3">
      <span className="self-center text-xs font-bold uppercase tracking-wide">
        {label}
      </span>
      <div className="grid grid-cols-[auto_auto_minmax(3.25rem,1fr)_auto_auto] items-center gap-1">
        <Button className="bg-paper" size="sm" aria-label={`Decrease ${label} by five seconds`} onClick={() => updateValue(value - 5)}>-5</Button>
        <Button className="bg-paper" size="sm" aria-label={`Decrease ${label} by one second`} onClick={() => updateValue(value - 1)}>−1</Button>
        <input
          className="h-11 min-w-0 border-2 border-ink bg-paper text-center text-sm font-bold outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue"
          type="number"
          aria-label={label}
          min="1"
          value={value}
          onChange={(event) => updateValue(event.target.valueAsNumber)}
        />
        <Button className="bg-paper" size="sm" aria-label={`Increase ${label} by one second`} onClick={() => updateValue(value + 1)}>+1</Button>
        <Button className="bg-paper" size="sm" aria-label={`Increase ${label} by five seconds`} onClick={() => updateValue(value + 5)}>+5</Button>
      </div>
    </div>
  );
}
