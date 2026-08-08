import {Button} from './ui/Button';

interface SettingControlProps {
  value: number;
  onChange: (newValue: number) => void;
  label: string;
}

export function SettingControl({value, onChange, label}: SettingControlProps) {
  return (
    <div className="grid w-full grid-cols-[1fr_auto] gap-2 border-3 border-ink bg-paper p-2">
      <span className="self-center text-xs font-bold tracking-wide uppercase">
        {label}
      </span>
      <div className="flex items-center gap-1">
        <Button className="bg-yellow" size="sm" aria-label={`Decrease ${label} by five`} onClick={() => onChange(value - 5)}>-5</Button>
        <Button size="sm" aria-label={`Decrease ${label} by one`} onClick={() => onChange(value - 1)}>-1</Button>
        <input
          className="h-9 w-12 border-3 border-ink bg-mint text-center text-sm font-bold outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue"
          type="number"
          aria-label={label}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
        <Button size="sm" aria-label={`Increase ${label} by one`} onClick={() => onChange(value + 1)}>+1</Button>
        <Button className="bg-yellow" size="sm" aria-label={`Increase ${label} by five`} onClick={() => onChange(value + 5)}>+5</Button>
      </div>
    </div>
  );
}
