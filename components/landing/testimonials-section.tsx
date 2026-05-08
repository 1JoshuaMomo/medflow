"use client"

import { GlowCard } from "@/components/effects/glow-card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Director, City Dental Clinic",
    image: "/testimonials/sarah.jpg",
    content: "MedFlow AI reduced our no-show rate by 78% in the first month. We recovered over $15,000 in previously lost revenue. This is the future of clinic management.",
    rating: 5,
    metrics: "+78% show rate",
  },
  {
    name: "Dr. James Rodriguez",
    role: "Founder, Premier Physiotherapy",
    image: "/testimonials/james.jpg",
    content: "The AI receptionist handles 80% of our booking queries automatically. My staff can finally focus on patient care instead of phone calls.",
    rating: 5,
    metrics: "80% automation",
  },
  {
    name: "Dr. Emily Chen",
    role: "CEO, HealthFirst Medical Group",
    image: "/testimonials/emily.jpg",
    content: "We rolled out MedFlow to all 12 of our clinics. The revenue analytics alone paid for the subscription 10x over. Absolutely essential.",
    rating: 5,
    metrics: "12 clinics deployed",
  },
  {
    name: "Dr. Michael O'Brien",
    role: "Owner, Dublin GP Practice",
    image: "/testimonials/michael.jpg",
    content: "I was skeptical about AI, but MedFlow proved me wrong. The no-show predictions are incredibly accurate. It feels like having a crystal ball.",
    rating: 5,
    metrics: "95% prediction accuracy",
  },
]

const logos = [
  "HealthFirst",
  "MedGroup",
  "CareConnect",
  "VitalClinics",
  "WellnessHub",
  "PrimeCare",
]

export function TestimonialsSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Trusted by Leading
            <br />
            <span className="gradient-text">Healthcare Providers</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance">
            Join 500+ clinics already maximizing their revenue with AI-powered operations.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {testimonials.map((testimonial, index) => (
            <GlowCard
              key={testimonial.name}
              className="p-8 opacity-0 animate-slide-up"
            >
              <div style={{ animationDelay: `${index * 100}ms` }}>
                {/* Quote icon */}
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                
                {/* Content */}
                <p className="text-lg mb-6 leading-relaxed">{testimonial.content}</p>
                
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {testimonial.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {testimonial.metrics}
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* Logo Cloud */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-8">Trusted by healthcare organizations worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {logos.map((logo) => (
              <div
                key={logo}
                className="text-xl md:text-2xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
