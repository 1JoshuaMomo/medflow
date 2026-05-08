import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, CalendarCheck2, TrendingUp, ArrowRight } from "lucide-react"

const demoHighlights = [
  {
    title: "Live Revenue Pulse",
    description: "Watch real-time clinic revenue movement and recovery opportunities.",
    icon: TrendingUp,
  },
  {
    title: "AI Risk Detection",
    description: "Identify likely no-shows early and trigger automated interventions.",
    icon: Brain,
  },
  {
    title: "Smart Scheduling",
    description: "Fill gaps instantly with matching patient waitlist suggestions.",
    icon: CalendarCheck2,
  },
]

export default function DemoPage() {
  return (
    <main className="min-h-screen container mx-auto px-6 py-16 space-y-10">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight gradient-text">MedFlow Live Product Demo</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          A modern operations workspace built for clinics that want speed, automation, and measurable growth.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/register"><Button size="lg">Start Free Trial</Button></Link>
          <Link href="/dashboard"><Button variant="outline" size="lg">Open Dashboard</Button></Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-5">
        {demoHighlights.map(({ title, description, icon: Icon }) => (
          <Card key={title} className="glass border-border/50">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-2">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{description}</CardContent>
          </Card>
        ))}
      </section>

      <section className="rounded-xl border border-border/60 p-6 md:p-8 bg-card/70">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Ready to run the full experience?</h2>
            <p className="text-muted-foreground">Open the app workspace and explore all dashboard modules.</p>
          </div>
          <Link href="/dashboard">
            <Button className="glow-sm">
              Launch Platform
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
