import { Button } from './ui/Button';

interface SettingControlProps {
  value: number;
  appliedValue: number;
  mode: 'work' | 'rest';
  isFirst: boolean;
  isPlaying: boolean;
  onChange: (newValue: number) => void;
  onSelectFirst: () => void;
  label: string;
}

export function SettingControl({
  value,
  appliedValue,
  mode,
  isFirst,
  isPlaying,
  onChange,
  onSelectFirst,
  label,
}: SettingControlProps) {
  const updateValue = (nextValue: number) => {
    if (Number.isFinite(nextValue)) {
      onChange(Math.max(1, Math.round(nextValue)));
    }
  };

  return (
    <div className={`grid w-full gap-2 border-2 border-line bg-surface p-2 sm:p-3 ${isPlaying ? 'grid-cols-[minmax(0,1fr)_auto]' : 'grid-cols-[3.25rem_minmax(0,1fr)] sm:grid-cols-[1fr_auto]'}`}>
      <div className="flex min-h-11 flex-col justify-center">
        <span className={`flex items-center gap-1.5 ${isPlaying ? 'font-display text-lg uppercase' : 'text-xs font-bold uppercase tracking-wide'}`}>
          <span className={`h-3 w-3 shrink-0 border-2 border-ink ${mode === 'work' ? 'bg-mint' : 'bg-blue'}`} aria-hidden="true" />
          {label}
        </span>
        {!isPlaying ? (
          <label className="mt-1 flex cursor-pointer items-center gap-1.5 text-[9px] font-bold uppercase text-muted">
            <input
              type="radio"
              name="first-interval"
              checked={isFirst}
              className="h-3.5 w-3.5 cursor-pointer accent-pink"
              onChange={onSelectFirst}
            />
            First
          </label>
        ) : null}
      </div>
      {isPlaying ? (
        <div className="flex min-h-11 items-center justify-end">
          <span className="font-display text-2xl leading-none">{appliedValue}</span>
          <span className="ml-1.5 text-[9px] font-bold uppercase text-muted">sec</span>
        </div>
      ) : (
        <div className="grid grid-cols-[auto_auto_minmax(3.25rem,1fr)_auto_auto] items-center gap-1">
          <Button className="bg-paper" size="sm" aria-label={`Decrease ${label} by five seconds`} onClick={() => updateValue(value - 5)}>-5</Button>
          <Button className="bg-paper" size="sm" aria-label={`Decrease ${label} by one second`} onClick={() => updateValue(value - 1)}>−1</Button>
          <input
            className="h-11 min-w-0 border-2 border-ink bg-paper text-center text-sm font-bold outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue"
            type="number"
            aria-label={`${label} seconds`}
            min="1"
            value={value}
            onChange={(event) => updateValue(event.target.valueAsNumber)}
          />
          <Button className="bg-paper" size="sm" aria-label={`Increase ${label} by one second`} onClick={() => updateValue(value + 1)}>+1</Button>
          <Button className="bg-paper" size="sm" aria-label={`Increase ${label} by five seconds`} onClick={() => updateValue(value + 5)}>+5</Button>
        </div>
      )}
    </div>
  );
}
