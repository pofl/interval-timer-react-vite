import type { ChangeEventHandler, InputHTMLAttributes } from 'react';

interface CheckboxFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export function CheckboxField({label, onChange, ...props}: CheckboxFieldProps) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-2 py-1.5 text-[11px] font-bold uppercase">
      <input
        type="checkbox"
        className="h-5 w-5 shrink-0 cursor-pointer accent-pink"
        onChange={onChange}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
