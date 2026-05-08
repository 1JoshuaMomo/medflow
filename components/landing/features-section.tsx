"use client"

import { GlowCard } from "@/components/effects/glow-card"
import { 
  Brain, 
  Calendar, 
  TrendingUp, 
  MessageSquare, 
  Bell, 
  Workflow,
  BarChart3,
  Users,
  Clock
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "No-Show Prediction Engine",
    description: "AI analyzes patient history, booking behavior, and time patterns to predict no-shows with 95% accuracy.",
    highlight: "Killer Feature",
    metrics: "95% Accuracy",
  },
  {
    icon: Calendar,
    title: "Smart Slot Optimization",
    description: "Automatically detect empty slots, suggest fill opportunities, and prioritize high-value appointments.",
    highlight: "Revenue Maximizer",
    metrics: "30% More Bookings",
  },
  {
    icon: MessageSquare,
    title: "AI Receptionist",
    description: "Patients can book, reschedule, and ask questions via chat. Powered by GPT-5 with function calling.",
    highlight: "24/7 Automation",
    metrics: "80% Query Resolution",
  },
  {
    icon: Bell,
    title: "Smart Reminder System",
    description: "Automated SMS, email, and WhatsApp reminders with frequency based on patient risk level.",
    highlight: "Multi-Channel",
    metrics: "60% Response Rate",
  },
  {
    icon: TrendingUp,
    title: "Revenue Intelligence",
    description: "Real-time dashboards showing daily revenue, missed revenue impact, and AI-powered forecasting.",
    highlight: "Business Critical",
    metrics: "Live Analytics",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Visual builder for custom automations. If patient misses appointment, trigger follow-up sequences.",
    highlight: "No-Code Builder",
    metrics: "50+ Templates",
  },
]

const capabilities = [
  { icon: BarChart3, label: "Predictive Analytics" },
  { icon: Users, label: "Patient Segmentation" },
  { icon: Clock, label: "Time Optimization" },
]

export function FeaturesSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Platform</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Everything You Need to
            <br />
            <span className="gradient-text">Maximize Revenue</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance">
            A complete revenue optimization layer for your clinic. Not just scheduling — intelligent automation that makes you money.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <GlowCard 
                key={feature.title} 
                className="p-8 opacity-0 animate-slide-up"
                glowColor="rgba(0, 255, 178, 0.1)"
              >
                <div style={{ animationDelay: `${index * 100}ms` }}>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 glow-sm">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                    {feature.highlight}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Metric */}
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-primary font-medium">{feature.metrics}</span>
                  </div>
                </div>
              </GlowCard>
            )
          })}
        </div>

        {/* Capabilities Row */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {capabilities.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-6 py-3 rounded-full glass"
            >
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
