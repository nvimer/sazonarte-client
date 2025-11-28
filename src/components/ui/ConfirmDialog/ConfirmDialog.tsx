import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "../Button";

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "warning" | "info";
    isLoading?: boolean;
}

/**
 * ConfirmDialog Component
 */
export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    variant = "danger",
    isLoading = false,
}: ConfirmDialogProps) {
    // ================== VARIANT STYLES ===================
    const variantStyles = {
        danger: {
            icon: "bg-red-100 text-red-600",
            button: "primary",
        },
        warning: {
            icon: "bg-yellow-100 text-yellow-600",
            button: "primary",
        },
        info: {
            icon: "bg-blue-100 text-blue-600",
            button: "primary",
        },
    };

    const currentVariant = variantStyles[variant];

    // ================== HANDLE CONFIRM ==================
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    // ================== RENDER ===================
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* ================= BACKDROP ================ */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* ======== MODAL ======== */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 20 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
                        >
                            {/* Close Button  */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Icon  */}
                            <div
                                className={`w-14 h-14 ${currentVariant.icon} rounded-full flex items-center justify-center mb-4`}
                            >
                                <AlertTriangle className="w-7 h-7" />
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
                                {title}
                            </h2>

                            {/* Description */}
                            <p className="text-neutral-600 font-light mb-6 leading-relaxed">
                                {description}
                            </p>

                            {/* Actions */}
                            <div className=" flex gap-3">
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    onClick={onClose}
                                    disabled={isLoading}
                                    fullWidth
                                >
                                    {cancelText}
                                </Button>
                                <Button
                                    variant={currentVariant.button as any}
                                    size="lg"
                                    onClick={handleConfirm}
                                    isLoading={isLoading}
                                    disabled={isLoading}
                                    fullWidth
                                >
                                    {confirmText}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
