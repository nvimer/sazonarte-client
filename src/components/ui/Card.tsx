import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
}

/**
 * Card component
 *
 * Container component with background, rounded corners, and shadow.
 *
 * @example
 * <Card padding='md' shadow='md'>
 *  <h2>Title</h2>
 *  <p>Content Here</p>
 * </Card>
 */
export const Card = ({
  children,
  padding = "md",
  shadow = "md",
  className = "",
  ...props
}: CardProps) => {
  // Base styles
  const baseStyles = "bg-white rounded-lg";

  // Padding styles
  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  // Shadow styles
  const shadowStyles = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  // Combine styles
  const cardStyles = [
    baseStyles,
    paddingStyles[padding],
    shadowStyles[shadow],
    className,
  ].join(" ");

  return (
    <div className={cardStyles} {...props}>
      {children}
    </div>
  );
};
