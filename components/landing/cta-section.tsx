"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Check } from "lucide-react"

const benefits = [
  "14-day free trial, no credit card required",
  "Setup in under 5 minutes",
  "Cancel anytime, no questions asked",
  "Dedicated onboarding support",
]

export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px] -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Card */}
          <div className="relative rounded-3xl overflow-hidden border border-primary/30 bg-card/50 p-12 md:p-16 text-center glass">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Limited Time Offer</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
              Ready to Stop
              <br />
              <span className="gradient-text text-glow">Losing Revenue?</span>
            </h2>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
              Join 500+ clinics that increased their revenue by 10-30% with MedFlow AI. 
              Your patients are waiting — and so is your profit.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link href="/register">
                <Button size="lg" className="text-lg px-10 py-7 glow hover:glow-lg transition-all group">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg" className="text-lg px-10 py-7">
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
