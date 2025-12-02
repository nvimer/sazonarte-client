import type { ReactNode } from "react";
import { Button } from "../Button";

// ============ TYPES ===========
interface EmptyStateProps {
    icon: ReactNode;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

/**
 * EmptyState Component
 *
 * Empty State with icon and CTA
 */
export function EmptyState({
    icon,
    title,
    description,
    actionLabel,
    onAction,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            {/* Icon Container  */}
            {icon && (
                <div className="w-16 h-16 bg-sage-50 rounded-2xl flex items-center justify-center text-carbon-500 mb-4">
                    {icon}
                </div>
            )}

            {/* Title */}
            <h3 className="text-xl font-semibold text-carbon-900 mb-2">{title}</h3>

            {/* Description */}
            <p className="text-carbon-700 max-w-md mb-6">{description}</p>

            {/* Action Button  */}
            {actionLabel && onAction && (
                <Button variant="primary" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
