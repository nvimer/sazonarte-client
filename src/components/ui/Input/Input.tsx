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
 *
 * @example
 * <Input label='Email' type='email' error='Invalid email' placeholder='tucorreo@mail.com' />
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
    // // Generate unique ID if noot provided
    // const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    // Base input styles
    const baseStyles =
      "px-4 py-3 bg-white border rounded-xl text-[15px] font-light placeholder:text-neutral-400 transition-all duration-300";

    // Error or normal state
    const stateStyles = error
      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
      : "border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20";

    const widthClass = fullWidth ? "w-full" : "";

    // Combine styles
    const inputStyles = [baseStyles, stateStyles, className].join(" ");

    return (
      <div className={widthClass}>
        {/* Label*/}
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-2 tracking-wide">
            {label}
          </label>
        )}

        {/*Input field*/}
        <input ref={ref} className={inputStyles} {...props} />

        {/* Error message*/}
        {error && (
          <p className="mt-1.5 text-sm text-red-600 font-light">{error}</p>
        )}

        {/* Helper text*/}
        {!error && helperText && (
          <p className="mt-1.5 text-sm text-neutral-500 font-light">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
