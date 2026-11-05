import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'accent'
    | 'forest'
    | 'pill'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles: Record<string, string> = {
      default:
        'bg-[#111413] text-white hover:bg-[#232826] shadow-sm active:bg-[#000000] border border-[#111413]',
      forest:
        'bg-[#143D2B] text-white hover:bg-[#0E2B1E] shadow-sm active:bg-[#081C15] border border-[#143D2B]',
      pill:
        'bg-[#111413] text-white hover:bg-[#000000] shadow-sm hover:shadow-md rounded-full border border-[#111413]',
      secondary:
        'bg-white text-[#111413] border border-[#E3E3DC] hover:bg-[#F4F4F0] hover:border-[#CFCFC5] active:bg-[#EDEDEA]',
      outline:
        'border border-[#E3E3DC] bg-white text-[#111413] hover:border-[#111413] hover:bg-[#FBFBF9] active:bg-[#F4F4F0]',
      ghost:
        'text-[#494F4C] hover:bg-[#F4F4F0] hover:text-[#111413] active:bg-[#EDEDEA]',
      destructive:
        'bg-[#DC2626] text-white hover:bg-[#B91C1C] shadow-sm active:bg-[#991B1B] border border-[#DC2626]',
      accent:
        'bg-[#B45309] text-white hover:bg-[#92400E] shadow-sm active:bg-[#78350F] border border-[#B45309]',
      link:
        'text-[#143D2B] underline-offset-4 hover:underline p-0 h-auto font-medium',
    };

    const sizeStyles: Record<string, string> = {
      default: 'h-11 px-5 py-2.5 text-sm min-h-[44px]',
      sm: 'h-9 px-3.5 text-xs min-h-[36px]',
      lg: 'h-12 px-7 text-base min-h-[48px]',
      icon: 'h-11 w-11 min-h-[44px] min-w-[44px] p-0 flex items-center justify-center',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-[5px] font-semibold transition-all duration-150 select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
