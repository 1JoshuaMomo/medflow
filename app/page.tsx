import { Navigation } from "@/components/landing/navigation"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { DashboardPreview } from "@/components/landing/dashboard-preview"
import { AIChatPreview } from "@/components/landing/ai-chat-preview"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"
import { ParticleBackground } from "@/components/effects/particle-background"

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Dashboard Preview */}
      <DashboardPreview />
      
      {/* AI Chat Preview */}
      <AIChatPreview />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
    </main>
  )
}
