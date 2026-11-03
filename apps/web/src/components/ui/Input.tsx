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
            className="block text-xs font-medium text-slate-700"
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
            "flex h-11 min-h-[44px] w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-base sm:text-sm text-slate-900 shadow-sm transition-colors",
            "placeholder:text-slate-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent",
            "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 disabled:opacity-50",
            hasError &&
              "border-red-500 text-red-900 focus-visible:ring-red-500 focus-visible:border-red-500",
            className
          )}
          {...props}
        />
        {helperText && !hasError && (
          <p id={helperId} className="text-xs text-slate-500">
            {helperText}
          </p>
        )}
        {errorMessage && (
          <p id={errorId} className="text-xs font-medium text-red-600" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
