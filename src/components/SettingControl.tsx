import {Button} from './ui/Button';

interface SettingControlProps {
  value: number;
  onChange: (newValue: number) => void;
  label: string;
}

export function SettingControl({value, onChange, label}: SettingControlProps) {
  return (
    <div className="m-0 flex w-full flex-wrap items-center justify-between gap-1 sm:m-1">
      <span className="text-neon-pink w-full text-xs font-bold tracking-wider uppercase drop-shadow-[0_0_5px_rgba(255,0,255,0.6)] sm:w-25 sm:text-sm">
        {label}
      </span>
      <Button size="sm" onClick={() => onChange(value - 5)}>
        -5
      </Button>
      <Button size="sm" onClick={() => onChange(value - 1)}>
        -1
      </Button>
      <input
        className="text-neon-green border-neon-blue focus:border-neon-pink max-w-25 min-w-[2em] grow basis-0 rounded-md border-2 bg-black/60 px-2 py-1 text-center text-sm font-bold shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all focus:shadow-[0_0_15px_rgba(255,0,255,0.6)] focus:outline-none"
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
      <Button size="sm" onClick={() => onChange(value + 1)}>
        +1
      </Button>
      <Button size="sm" onClick={() => onChange(value + 5)}>
        +5
      </Button>
    </div>
  );
}
