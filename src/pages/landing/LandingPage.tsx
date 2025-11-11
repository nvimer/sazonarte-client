import {
  FeaturesSection,
  HeroSection,
  Navbar,
  StatsSection,
} from "../sections";

/**
 * LandingPage Component
 *
 * Main landing page combining all sections
 *
 * Structure /
 * - Navbar (sticky)
 * - Hero Section
 * - Features Section
 * - Stats Section
 * - CTA Section
 * - Footer
 */
export function LandingPage() {
  return (
    <div>
      {/* ================= NAVIGATION ================ */}
      <Navbar />

      {/* ============== MAIN CONTENT ================= */}
      <main>
        {/* Hero  */}
        <HeroSection />

        {/* Features */}
        <FeaturesSection />

        {/* Stats */}
        <StatsSection />
      </main>

      {/* =========== FOOTER ===========  */}
    </div>
  );
}
