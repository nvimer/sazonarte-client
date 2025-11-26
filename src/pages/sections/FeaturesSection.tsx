import { Card } from "@/components";
import { motion } from "framer-motion";
import {
  BarChart3,
  ClipboardList,
  Clock,
  Menu,
  Table2,
  Users,
} from "lucide-react";

/**
 * FeaturesSection Component
 *
 * Showcase main features of the system
 *
 * Features
 * - 6 feature cards with icons
 * - Grid layout responsive
 * - Staggeres animations
 */
export function FeaturesSection() {
  // ================= FEATURES DATA ===================
  const features = [
    {
      icon: Table2,
      title: "Gestión de Mesas",
      description:
        "Controla el estado de tus mesas en tiempo real. Disponible, ocupada o en limpieza",
      color: "primary",
    },
    {
      icon: Menu,
      title: "Menú Digital",
      description:
        "Actualiza el menú al instante. Categorías, productos, precios y disponibilidad",
      color: "blue",
    },
    {
      icon: ClipboardList,
      title: "Órdenes Centralizadas",
      description:
        "Gestiona todas las órdenes desde un solo lugar. Sin confusiones, sin errores.",
      color: "green",
    },
    {
      icon: BarChart3,
      title: "Reportes y Estadísticas",
      description:
        "Analiza el rendimiento de tu restaurante con dashboards y gráficas detalladas.",
      color: "purple",
    },
    {
      icon: Users,
      title: "Gestión de Personal",
      description:
        "Controla roles, permisos y accesos de tu equipo de forma segura.",
      color: "orange",
    },
    {
      icon: Clock,
      title: "Operación en Tiempo Real",
      description:
        "Sincronización instantánea entre todos los dispositivos de tu restaurante.",
      color: "red",
    },
  ];

  // ================ COLOR MAPPING ===================
  const colorClasses = {
    primary: "bg-primary-100 text-primary-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
  };

  // ============== RENDER ===============
  return (
    <section id="features" className=" py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* =========== SECTION HEADER ===========  */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Section Badge  */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-medium mb-6">
            Características
          </div>

          {/* Section Title  */}
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Todo lo que Necesitas en{" "}
            <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              un Solo Lugar
            </span>
          </h2>

          {/* Section Description */}
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto font-light">
            Sazonarte integra todas las herramientas esenciales para gestionar
            tu restaurante de manera efidciente y profesional.
          </p>
        </motion.div>

        {/* ========== FEATURES GRID ============ */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  variant="elevated"
                  padding="xl"
                  className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  {/* Feature Icon  */}
                  <div
                    className={`w-14 h-14 ${colorClasses[feature.color as keyof typeof colorClasses]
                      } rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Feature Title  */}
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {feature.title}
                  </h3>

                  {/* Feature Description  */}
                  <p className="text-neutral-600 font-light leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
