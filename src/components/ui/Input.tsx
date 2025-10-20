import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Input Component
 *
 * Reusable input with label, error state, and helper text
 *
 * @example
 * <Input label='Email' type='email' error='Invalid email' placeholder='tucorreo@mail.com' />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    // Generate unique ID if noot provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    // Base input styles
    const baseStyles =
      "w-full px-4 py-2 text-gray-900 placeholder-gray-400 border rounded-lg transtiion-colors focus:outline-none disable:bg-gray-100 disabled:cursor-not-allowed";

    // Error or normal state
    const stateStyles = error
      ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent"
      : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transaparent";

    // Combine styles
    const inputStyles = [baseStyles, stateStyles, className].join(" ");

    return (
      <div>
        {/* Label*/}
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        {/*Input field*/}
        <input ref={ref} id={inputId} className={inputStyles} {...props} />

        {/* Error message*/}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

        {/* Helper text*/}
        {!error && helperText && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
