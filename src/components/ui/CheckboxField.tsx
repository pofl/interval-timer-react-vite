import type {ChangeEventHandler, InputHTMLAttributes} from 'react';

interface CheckboxFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export function CheckboxField({label, onChange, ...props}: CheckboxFieldProps) {
  return (
    <label className="space-x-1">
      <input type="checkbox" onChange={onChange} {...props} />
      <span>{label}</span>
    </label>
  );
}
