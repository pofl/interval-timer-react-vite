import type {ButtonHTMLAttributes} from 'react';
import {cn} from '../../lib/utils';

type ButtonSize = 'default' | 'sm';

const sizeClassName: Record<ButtonSize, string> = {
  default: 'px-4 py-1.5',
  sm: 'px-2 py-1.5 text-xs',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
}

export function Button({className, size = 'default', type = 'button', ...props}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn('bg-sand-500 rounded-sm text-gray-950', sizeClassName[size], className)}
      {...props}
    />
  );
}
