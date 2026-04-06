import {Button} from './ui/Button';

interface SettingControlProps {
  value: number;
  onChange: (newValue: number) => void;
  label: string;
}

export function SettingControl({value, onChange, label}: SettingControlProps) {
  return (
    <div className="m-1 flex flex-wrap items-center gap-1 w-full justify-between">
      <span className="w-25 text-neon-pink text-sm font-bold uppercase tracking-wider drop-shadow-[0_0_5px_rgba(255,0,255,0.6)]">
        {label}
      </span>
      <Button size="sm" onClick={() => onChange(value - 5)}>
        -5
      </Button>
      <Button size="sm" onClick={() => onChange(value - 1)}>
        -1
      </Button>
      <input
        className="bg-black/60 text-neon-green border-neon-blue shadow-[0_0_10px_rgba(0,255,255,0.3)] max-w-25 min-w-[2em] grow basis-0 rounded-md border-2 px-2 py-1 text-center text-sm font-bold focus:outline-none focus:border-neon-pink focus:shadow-[0_0_15px_rgba(255,0,255,0.6)] transition-all"
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
