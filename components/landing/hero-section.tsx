"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TypingAnimation } from "@/components/effects/typing-animation"
import { AnimatedCounter } from "@/components/effects/animated-counter"
import { ArrowRight, Play, TrendingUp, Calendar, Brain, Shield } from "lucide-react"

const stats = [
  { value: 30, suffix: "%", label: "Revenue Increase" },
  { value: 85, suffix: "%", label: "No-Show Reduction" },
  { value: 10, suffix: "K+", label: "Appointments Optimized" },
  { value: 500, suffix: "+", label: "Clinics Trust Us" },
]

const features = [
  { icon: Brain, label: "AI-Powered Predictions" },
  { icon: Calendar, label: "Smart Scheduling" },
  { icon: TrendingUp, label: "Revenue Analytics" },
  { icon: Shield, label: "HIPAA Compliant" },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 right-20 w-4 h-4 rounded-full bg-primary/40 animate-float" />
      <div className="absolute top-40 left-20 w-3 h-3 rounded-full bg-primary/30 animate-float delay-500" />
      <div className="absolute bottom-40 right-40 w-5 h-5 rounded-full bg-primary/20 animate-float delay-1000" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm text-muted-foreground">
              Now with GPT-5 Integration
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-slide-up">
            <span className="text-balance">Turn Missed</span>
            <br />
            <span className="text-balance">Appointments Into</span>
            <br />
            <span className="gradient-text text-glow">
              <TypingAnimation
                texts={["Revenue", "Growth", "Success", "Profit"]}
                typingSpeed={80}
                pauseDuration={3000}
              />
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-slide-up stagger-2 text-balance">
            AI predicts no-shows, fills empty slots, and automates your clinic operations in real time. Join 500+ clinics already maximizing their revenue.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up stagger-3">
            <Link href="/demo">
              <Button size="lg" className="text-lg px-8 py-6 glow hover:glow-lg transition-all group">
                See Live Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 group">
                <Play className="mr-2 w-5 h-5" />
                Start Free Trial
              </Button>
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16 animate-slide-up stagger-4">
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border"
              >
                <Icon className="w-4 h-4 text-primary" />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-slide-up stagger-5">
            {stats.map(({ value, suffix, label }) => (
              <div key={label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  <AnimatedCounter end={value} suffix={suffix} duration={2500} />
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-2.5 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  )
}
