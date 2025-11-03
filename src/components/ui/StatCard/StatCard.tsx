import { TrendingUp, TrendingUpDown } from "lucide-react";
import type { ReactNode } from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    change?: string;
    trend?: "up" | "down" | "neutral";
    icon?: ReactNode;
    description?: string;
}

export function StatCard({
    title,
    value,
    change,
    trend = "neutral",
    icon,
    description,
}: StatCardProps) {
    const trendColors = {
        up: "text-primary-600",
        down: "text-red-600",
        neutral: "text-neutral-600",
    };

    return (
        <div className="bg-white border border-neutral-100 rounded-2xl p-8 shadow-smooth hover:shadow-smooth-lg transition-all duration-400">
            <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                    {/* Title */}
                    <p className="text-sm font-medium text-neutral-500 tracking-wide mb-3">
                        {title}
                    </p>

                    {/* Value */}
                    <p className="text-4xl font-light text-neutral-900 tracking-tight mb-3">
                        {value}
                    </p>

                    {/* Change  */}
                    {change && (
                        <div className="flex items-center gap-1.5">
                            {trend === "up" && <TrendingUp className="w-3.5 h-3.5" />}
                            {trend === "down" && <TrendingUpDown className="w-3.5 h-3.5" />}
                            <span className={`text-sm font-medium ${trendColors[trend]}`}>
                                {change}
                            </span>
                            {description && (
                                <span className="text-sm text-neutral-400 font-light">
                                    {description}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {icon && <div className="p-3 bg-primary-50 rounded-xl">{icon}</div>}
            </div>
        </div>
    );
}
