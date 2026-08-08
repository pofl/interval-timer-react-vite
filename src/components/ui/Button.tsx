import type {ButtonHTMLAttributes} from 'react';
import {cn} from '../../lib/utils';

type ButtonSize = 'default' | 'sm';

const sizeClassName: Record<ButtonSize, string> = {
  default: 'min-h-12 px-5 py-2 text-sm',
  sm: 'min-h-9 px-2 text-xs',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
}

export function Button({className, size = 'default', type = 'button', ...props}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'cursor-pointer border-3 border-ink bg-paper font-bold uppercase shadow-[3px_3px_0_#171717] transition-transform',
        'hover:-translate-y-0.5 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none',
        'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue',
        sizeClassName[size],
        className
      )}
      {...props}
    />
  );
}
