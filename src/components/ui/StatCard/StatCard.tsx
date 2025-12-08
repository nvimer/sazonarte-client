import { TrendingUp, TrendingUpDown } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "../Card";

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: ReactNode;
    change?: {
        value: string;
        type: "increase" | "decrease";
    };
    description?: string;
}

export function StatCard({
    title,
    value,
    change,
    icon,
    description,
}: StatCardProps) {
    const trendColors = {
        up: "text-primary-600",
        down: "text-red-600",
        neutral: "text-neutral-600",
    };

    return (
        <Card variant="elevated" padding="lg" hover>
            <div className="flex items-start justify-between">
                {/* Left content */}
                <div className="flex-1">
                    {/* Title */}
                    <p className="text-sm font-medium text-carbon-500 mb-2">{title}</p>

                    {/* Value */}
                    <h3 className="text-3xl font-bold text-carbon-900 mb-2">{value}</h3>

                    {/* Change indicator  */}
                    {change && (
                        <div className="flex items-center gap-1">
                            <span
                                className={`text-sm font-medium ${change.type === "increase"
                                        ? "text-sage-green-600"
                                        : "text-red-600"
                                    }`}
                            >
                                {change.type === "increase" ? "↑" : "↓"}
                                {change.value}
                            </span>
                            {description && (
                                <span className="text-sm text-carbon-500">{description}</span>
                            )}
                        </div>
                    )}
                </div>

                {/* Icon  */}
                {icon && (
                    <div className="flex-shrink-0 w-12 h-12 bg-sage-green-50 rounded-xl flex items-center justify-center text-sage-green-600">
                        {icon}
                    </div>
                )}
            </div>
        </Card>
    );
}
