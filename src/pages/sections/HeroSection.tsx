import { Button } from "@/components";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Play } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * HeroSection Component
 *
 * Main hero section with headline, description, and CTA
 *
 * Features /
 * - Large headline with gradient
 * - Two CTA buttons
 * - Feature bullets
 * - Animated entrance
 */
export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-neutral-50 pt-20"
    >
      {/* className="relative max-h-screen flex items-center" */}

      {/* ============== BACKGROUND DECORATION ============= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Blob 1  */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>
        {/* Gradient Blob 2 */}
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-primary-300/2 rounded-full blur-3xl"></div>
      </div>

      {/* ========= CONTENT ========== */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ============= LEFT COLUMN - TEXT ============ */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-8"
            >
              <CheckCircle className="w-4 h-4" />
              Gestión de Restaurantes Simplificada
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
              Gestiona tu{" "}
              <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Restaurante
              </span>{" "}
              con Elegancia
            </h1>

            {/* Description  */}
            <p className="text-lg lg:text-xl text-neutral-600 mb-8 leading-relaxed font-light">
              Sazonarte es el sistema de gestión que tu restaurante necesita.
              Controla mesas, menú, órdenes y más, todo en una plataforma
              moderna y fácil de usar.
            </p>

            {/* Feature Bullets */}
            <ul className="space-y-3 mb-10">
              {[
                "Gestión de mesas en tiempo real",
                "Menú digital actualizable al instante",
                "Órdenes centralizadas y eficientes",
                "Dashboard con estadísticas detalladas",
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 text-neutral-700"
                >
                  <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span className="font-light">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* Primary CTA */}
              <Link to="/login">
                <Button variant="primary" size="lg" className="group">
                  Comenzar Ahora
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              {/* Secondary CTO   */}
              <Button variant="ghost" size="lg" className="group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Ver Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* ================== RIGHT COLUMN =================== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Mockup Image Container  */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-gradient-to-br from-primary-50 to-primary-100">
              {/* Placeholder for Dashboard Screenshot */}
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-white flex items-center justify-center p-12">
                <div className="w-full h-full bg-white rounded-2xl shadow-xl p-8 overflow-hidden">
                  {/* Simulated Dashboard Content */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="h-12 bg-primary-50 rounded-lg"></div>
                    {/* Stats  */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-20 bg-primary-100 rounded-lg"></div>
                      <div className="h-20 bg-green-100 rounded-lg"></div>
                      <div className="h-20 bg-blue-100 rounded-lg"></div>
                    </div>
                    {/* Content */}
                    <div className="h-32 bg-neutral-100 rounded-lg"></div>
                    <div className="h-32 bg-neutral-100 rounded-lg"></div>
                    <div className="h-32 bg-neutral-100 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-neutral-100"
            >
              <div className="flex items-center gap-3">
                <div className=" w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900">98%</div>
                  <div className="text-xs text-neutral-600 font-light">
                    Satisfaccion
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
