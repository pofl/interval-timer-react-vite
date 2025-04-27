interface SettingControlProps {
  value: number;
  onChange: (newValue: number) => void;
  label: string;
}

export function SettingControl({value, onChange, label}: SettingControlProps) {
  return (
    <div className="m-1 flex flex-wrap items-center gap-1">
      <span className="w-25">{label}</span>
      <button className="bg-sand-500 rounded-sm px-2 py-1.5 text-xs" onClick={() => onChange(value - 5)}>
        -5
      </button>
      <button className="bg-sand-500 rounded-sm px-2 py-1.5 text-xs" onClick={() => onChange(value - 1)}>
        -1
      </button>
      <input
        className="border-sand-500 max-w-25 min-w-[2em] grow basis-0 rounded-sm border-1 px-2 py-1.5 text-xs"
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
      <button className="bg-sand-500 rounded-sm px-2 py-1.5 text-xs" onClick={() => onChange(value + 1)}>
        +1
      </button>
      <button className="bg-sand-500 rounded-sm px-2 py-1.5 text-xs" onClick={() => onChange(value + 5)}>
        +5
      </button>
    </div>
  );
}
