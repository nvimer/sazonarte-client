import type { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    variant?: "primary" | "success" | "warning" | "error" | "info" | "neutral";
    size?: "sm" | "md";
    className?: string;
}

export function Badge({
    children,
    variant = "primary",
    size = "md",
    className = "",
}: BadgeProps) {
    const baseStyles =
        "inline-flex items-center font-normal tracking-wide rounded-full border";

    const variants = {
        primary: "bg-primary-50 text-primary-700 border-primary-100",
        success: "bg-green-50 text-green-700 border-green-100",
        warning: "bg-amber-50 text-amber-700 border-amber-100",
        error: "bg-red-50 text-red-700 border-red-100",
        info: "bg-blue-50 text-blue-700 border-blue-100",
        neutral: "bg-neutral-50 text-neutral-700 border-neutral-100",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
    };

    return (
        <span
            className={`
                ${baseStyles} 
                ${variants[variant]} 
                ${sizes[size]} 
                ${className}
            `}
        >
            {children}
        </span>
    );
}
