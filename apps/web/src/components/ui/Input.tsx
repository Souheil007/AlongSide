import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  label?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, label, helperText, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const errorMessage = typeof error === "string" ? error : undefined;
    const hasError = Boolean(error);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-[#111413]"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          aria-invalid={hasError}
          aria-describedby={
            errorMessage ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            "flex h-11 min-h-[44px] w-full rounded-[5px] border border-[#E3E3DC] bg-white px-3.5 py-2 text-base sm:text-sm text-[#111413] shadow-[0_1px_2px_rgba(17,20,19,0.04)] transition-colors",
            "placeholder:text-[#858C88]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:border-transparent",
            "disabled:cursor-not-allowed disabled:bg-[#F4F4F0] disabled:text-[#858C88] disabled:opacity-50",
            hasError &&
              "border-[#DC2626] text-[#DC2626] focus-visible:ring-[#DC2626] focus-visible:border-[#DC2626]",
            className
          )}
          {...props}
        />
        {helperText && !hasError && (
          <p id={helperId} className="text-xs text-[#858C88]">
            {helperText}
          </p>
        )}
        {errorMessage && (
          <p id={errorId} className="text-xs font-semibold text-[#DC2626]" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
