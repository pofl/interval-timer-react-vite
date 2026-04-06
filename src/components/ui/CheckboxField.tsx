import type {ChangeEventHandler, InputHTMLAttributes} from 'react';

interface CheckboxFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export function CheckboxField({label, onChange, ...props}: CheckboxFieldProps) {
  return (
    <label className="flex items-center space-x-3 cursor-pointer group py-1">
      <input
        type="checkbox"
        className="w-5 h-5 accent-neon-pink cursor-pointer shadow-[0_0_8px_rgba(255,0,255,0.6)] rounded-sm transition-all"
        onChange={onChange}
        {...props}
      />
      <span className="text-neon-blue group-hover:text-neon-pink transition-colors text-sm uppercase font-bold tracking-wider drop-shadow-[0_0_5px_rgba(0,255,255,0.5)] group-hover:drop-shadow-[0_0_8px_rgba(255,0,255,0.6)]">
        {label}
      </span>
    </label>
  );
}
