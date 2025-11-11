import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * StatsSection Component
 *
 * Display impressive statistics with animated numbers.
 *
 * Features /
 * - Animate counting numbers
 * - Responsive grid
 * - Grid background
 */
export function StatsSection() {
  // =============== STATS DATA ==================
  const stats = [
    {
      number: 500,
      suffix: "+",
      label: "Restaurante Activos",
      description: "Confían en Sazonarte",
    },
    {
      number: 50,
      suffix: "K+",
      label: "Órdenes Procesadas",
      description: "Cada mes",
    },
    {
      number: 99,
      suffix: "%",
      label: "Uptime",
      description: "Disponibilidad garantizada",
    },
    {
      number: 24,
      suffix: "/7",
      label: "Soporte",
      description: "Siempre disponible",
    },
  ];

  // ============= RENDER ===============
  return (
    <section
      id="benefits"
      className="py-24 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 relative overflow-hidden"
    >
      {/* ============== BACKGROUND PATTERN ================= */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* ========= CONTENT ======= */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* =========== SECTION HEADER =========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Números que hablan por sí solos
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto font-light">
            Miles de restaurantes ya están transformando su gestión con
            Sazonarte
          </p>
        </motion.div>

        {/* ============= STATS GRID ================ */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              {/* Animated Number  */}
              <div className="text-5xl lg:text-6xl font-bold text-white mb-2">
                <AnimatedNumber value={stat.number} />
                {stat.suffix}
              </div>

              {/* Stat Label */}
              <div className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </div>

              {/* Stat Description */}
              <div className="text-primary-100 font-light">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * AnimatedNumber Component
 *
 * Animated a number from 0 to target value
 */
function AnimatedNumber({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);
  return <span>{count}</span>;
}
