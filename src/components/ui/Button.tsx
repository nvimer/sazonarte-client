import { forwardRef, type ButtonHTMLAttributes } from "react";

/**
 * Button variants
 * primary: Main action button (blue)
 * secondary: Secondary Action (gray)
 * danger: Desctructive action (red)
 * ghost: Minimal style
 */
type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

/**
 * Button sizes
 */
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

/**
 * Button Component
 *
 *Reusable button with varians, sizes and loading state.
 *
 * @example
 * <Button variant='primary' size='sm' onClick={handleClick}>
 *  Click me
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    // Base styles
    // These apply to all buttons
    const baseStyles =
      "font-semibold rounded-lg transition/colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-alowed";

    // Variant styles
    const variantStyles = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary:
        "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 ",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      ghost:
        "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    };

    // Size variants
    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    // Width styles
    const widhtStyles = fullWidth ? "w-full" : "";

    // Combine all styles
    const buttonStyles = [
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      widhtStyles,
      className,
    ].join(" ");

    return (
      <button
        ref={ref}
        className={buttonStyles}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Loading spinner*/}
        {isLoading && (
          <svg
            className="inline-block w-4 h-4 mr-2 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
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
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l30-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
