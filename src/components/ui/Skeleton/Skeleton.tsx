/**
 * Skeleton Component
 *
 * Loading placeholder with shimmer animation
 */
export function Skeleton({ className = "" }: { className?: string }) {
    return (
        <div
            className={`animate-pulse bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-100 bg-[length:200%_100%] rounded-xl ${className}`}
            style={{
                animation: "shimmer 2s infinite",
            }}
        />
    );
}
