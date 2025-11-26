import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChefHat, Menu, X } from "lucide-react";
import { Button } from "@/components";

/**
 * Navbar Component
 *
 * Sticky navigation bar with scroll animation
 *
 * Features /
 * - Transparent when at top
 * - White background on scroll
 * - Mobile menu
 * - Smooth animations
 */
export function Navbar() {
  // ============= STATE ===============
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ================== SCROLL DETECTION ==================
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // =============== NAVIDATION ITEMS ===================
  const navItems = [
    { label: "Inicio", href: "#home" },
    { label: "Características", href: "#features" },
    { label: "Beneficios", href: "#benefits" },
    { label: "Contacto", href: "#contact" },
  ];

  // =============== RENDER ===============
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-smooth"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ============ LOGO ============ */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Logo Icon  */}
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center group-hover:bg-primary-600 transition-colors">
              <ChefHat className="w-6 h-6 text-white" />
            </div>

            {/* Brand Name */}
            <div>
              <span className="text-xl font-bold text-neutral-900">
                Sazonarte
              </span>
              <span className="block text-xs text-neutral-600 font-light">
                Restaurant Management
              </span>
            </div>
          </Link>

          {/* ======== DESKTOP MENU ========== */}
          <div className="hidden md:flex items-center gap-8">
            {/* Navigation Links */}
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-neutral-700 hover:to-primary-600 font-medium text-[15-px] transition-colors"
              >
                {item.label}
              </a>
            ))}

            {/* CTA Buttons  */}
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="primary" size="md">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>

          {/* ============== MOBILE MENU BUTTON =============== */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* =========== MOBILE MENU ============ */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white border-t border-neutral-100"
        >
          <div className="px-6 py-6 space-y-4 flex flex-col items-center">
            {/* Mobile Nav Links */}
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className=" text-neutral-700 hover:text-primary-600 font-medium text-[-15] py-2"
              >
                {item.label}
              </a>
            ))}

            {/* Mobile CTA Buttons */}
            <div className="pt-6 space-y-3 ">
              <Link to="/login" className="block">
                <Button variant="ghost" size="md" fullWidth>
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
