import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  variant?: "default" | "elevated" | "bordered";
  padding?: "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Card({
  children,
  variant = "default",
  padding = "lg",
  hover = false,
  className = "",
  onClick,
}: CardProps) {
  const baseStyles = "rounded-2xl transition-all duration-400";
  const variants = {
    default: "bg-white border border-neutral-100 shadow-smooth",
    elevated: "bg-white shadow-smooth-lg",
    bordered: "bg-white border-2 border-neutral-200",
  };

  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-11",
  };

  const hoverStyles = hover
    ? "hover:shadow-smooth-lg hover:-traslate-y-1 cursor-pointer"
    : "";

  return (
    <div
      onClick={onClick}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${paddings[padding]} 
        ${hoverStyles} 
        ${className}
      `}
    >
      {children}
    </div>
  );
}
