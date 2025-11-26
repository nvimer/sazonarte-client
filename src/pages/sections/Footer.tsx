import { ChefHat, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-7 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* ============== COMPANY INFO ============ */}
          <div>
            {/* Logo  */}
            <div className="flex items-center gap-3 mb-6 ">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Sazonarte</span>
                <span className=" block text-xs text-neutral-500">
                  Restaurant Management
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-neutral-400 font-light mb-6">
              El sistema de gestión más completo y fácil de usar para tu
              negocio.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary-400" />
                <a
                  href="mailto:info@sazonarte.com"
                  className="hover:text-primary-400 transition-colors"
                >
                  info@sazonarte.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary-400" />
                <a
                  href="tel:+1233456778"
                  className="hover:text-primary-400 transition-colors"
                >
                  +123 123 3456
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span>Ipiales, Colombia</span>
              </div>
            </div>
          </div>
          {/* ============ PRODUCT LINKS ================= */}
          <div>
            <h5 className="text-white font-semibold mb-4">Producto </h5>
            <ul className="space-y-3">
              {[
                "Características",
                "Precios",
                "Demo",
                "Casos de Éxito",
                "Integraciones",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm font-light"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* ================ COMPANY LINKS =============== */}
          <div>
            <h5 className="text-white font-semibold mb-4">Empresa</h5>
            <ul className="space-y-3">
              {["Sobre Nosotros", "Blog", "Prensa", "Contacto"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm font-light"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* =============== LEGAL LINKS ================= */}
          <div>
            <h5 className="text-white font-semibold mb-4">Legal</h5>
            <ul className="space-y-3">
              {[
                "Términos de Servicio",
                "Política de Privacidad",
                "Cookies",
                "Licencias",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm font-light"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ============== BOTTOM BAR ============== */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-neutral-500 text-sm font-light">
            © 2025 SazonArte. Todos los derechos reservados.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {["Twitter", "Facebook", "Instagram"].map((social) => (
              <a
                key={social}
                href="#"
                className=" text-neutral-500 hover:text-primary-400"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
