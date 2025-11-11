import { Button } from "@/components";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * CTASection Component
 *
 * Final call-to-action section
 *
 * Features /
 * - Large CTA with gradient background
 * - Two action buttons
 * - Animated entrance
 */
export function CTASection() {
  return (
    <section id="CTA" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-12 lg:p-16 overflow-hidden"
        >
          {/* =========== BACKGROUND DECORATION ============ */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          {/* ============= CONTENT =========== */}
          <div className="relative text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              Comienza tu Prueba Gratuita
            </motion.div>

            {/* Headline */}
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
              ¿Listo para Transformar tu Restaurante?
            </h2>

            {/* Description */}
            <p className="text-lg lg:text-xl text-primary-100 mb-10 max-w-3xl mx-auto font-light">
              Únete a cientos de restaurantes que ya están optimizando su
              operación con Sazonarte. Sin contratos, sin complicaciones
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Primary CTA  */}
              <Link to="/login">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary-600 hover:bg-primary-50 group"
                >
                  Comenzar Ahora Gratis
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              {/* Secondary CTA  */}
              <Button
                variant="primary"
                size="lg"
                className="text-white border-white hover:bg-white/10"
              >
                Hablar con Ventas
              </Button>
            </div>

            {/* Trust Badge */}
            <p className="mt-8 text-primary-100 text-sm font-light">
              ✓ 14 días de prueba gratis · ✓ Sin tarjeta de crédito · ✓ Cancela
              cuando quieras
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
