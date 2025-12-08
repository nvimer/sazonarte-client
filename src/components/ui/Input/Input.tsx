import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

/**
 * Input Component
 *
 * Reusable input with label, error state, helper text and fullWidth
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    // Width Styles
    const widthClass = fullWidth ? "w-full" : "";

    // Base input styles
    const inputStyles = `
w-full px-4 py-2.5 text-carbon-900 text-base bg-white border-2 rounded-xl transition-all duration-200 ${error ? "border-red-300 focus:border-red-500 focus:ring-200 focus:ring-red-200" : "border-sage-border-subtle focus:border-sage-green-300 focus:ring-2 focus:ring-sage-green-100"} placeholder:text-carbon-300 disabled:bg-sage-50 disabled:text-carbon-500 disabled:cursor-not-allowed ${className}`
      .trim()
      .replace(/\s+/g, "");

    return (
      <div className={widthClass}>
        {/* Label*/}
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-carbon-700 mb-2 tracking-wide"
          >
            {label}
          </label>
        )}

        {/*Input field*/}
        <input ref={ref} id={id} className={inputStyles} {...props} />

        {/* Error message*/}
        {error && (
          <p className="mt-1.5 text-sm text-red-600 font-light">{error}</p>
        )}

        {/* Helper text*/}
        {!error && helperText && (
          <p className="mt-1.5 text-xs text-carbon-500 font-light">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
