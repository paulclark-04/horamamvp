"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, error, className = "", ...props }, ref) => {
        return (
            <div className="flex flex-col gap-2">
                <label
                    htmlFor={props.id}
                    className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                    ref={ref}
                    className={`
            w-full px-4 py-3
            rounded-xl
            bg-white dark:bg-zinc-800
            border border-zinc-200 dark:border-zinc-700
            text-zinc-900 dark:text-zinc-100
            placeholder:text-zinc-400 dark:placeholder:text-zinc-500
            focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500
            transition-all duration-200
            ${error ? "border-red-500 focus:ring-red-500/50 focus:border-red-500" : ""}
            ${className}
          `}
                    {...props}
                />
                {error && (
                    <p className="text-sm text-red-500 animate-pulse">{error}</p>
                )}
            </div>
        );
    }
);

FormInput.displayName = "FormInput";
