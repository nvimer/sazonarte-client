import type { LucideIcon } from "lucide-react";
import { Button } from "../Button";

// ============ TYPES ===========
interface EmptyStateProps {
    icon: LucideIcon;
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
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            {/* Icon Container  */}
            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
                <Icon className="w-12 h-12 text-neutral-400" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-semibold text-neutral-900 mb-2">{title}</h3>

            {/* Description */}
            <p className="text-neutral-600 font-light text-center max-w-md mb-8">
                {description}
            </p>

            {/* Action Button  */}
            {actionLabel && onAction && (
                <Button variant="primary" size="lg" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
