import type {ButtonHTMLAttributes} from 'react';
import {cn} from '../../lib/utils';

type ButtonSize = 'default' | 'sm';

const sizeClassName: Record<ButtonSize, string> = {
  default: 'px-6 py-3 text-sm tracking-widest',
  sm: 'px-3 py-1.5 text-xs font-bold',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
}

export function Button({className, size = 'default', type = 'button', ...props}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'bg-transparent border-2 border-neon-pink text-neon-pink uppercase',
        'hover:bg-neon-pink hover:text-dark-bg hover:shadow-[0_0_15px_rgba(255,0,255,0.8)]',
        'active:scale-95 transition-all duration-200 cursor-pointer rounded-md font-bold focus:outline-none focus:ring-2 focus:ring-neon-purple focus:ring-offset-2 focus:ring-offset-dark-bg',
        sizeClassName[size],
        className
      )}
      {...props}
    />
  );
}
