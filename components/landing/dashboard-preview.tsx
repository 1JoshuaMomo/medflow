"use client"

import { AnimatedCounter } from "@/components/effects/animated-counter"
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  Users,
  DollarSign,
  Activity
} from "lucide-react"

const revenueData = [30, 45, 35, 50, 65, 55, 75, 85, 70, 90, 95, 100]
const appointmentData = [
  { time: "09:00", patient: "Sarah Johnson", type: "Checkup", risk: "low" },
  { time: "09:30", patient: "Michael Chen", type: "Follow-up", risk: "high" },
  { time: "10:00", patient: "Emily Davis", type: "Consultation", risk: "medium" },
  { time: "10:30", patient: "James Wilson", type: "Procedure", risk: "low" },
]

export function DashboardPreview() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Real-Time Intelligence
            <br />
            <span className="gradient-text">At Your Fingertips</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance">
            See exactly how much revenue you&apos;re losing and how AI is recovering it — live.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-border bg-card/50 p-1">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 rounded-t-xl">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-background/50 text-xs text-muted-foreground">
                  dashboard.medflow.ai
                </div>
              </div>
            </div>
            
            {/* Dashboard content */}
            <div className="p-6 bg-background rounded-b-xl">
              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <span className="flex items-center gap-1 text-xs text-green-400">
                      <TrendingUp className="w-3 h-3" /> +12%
                    </span>
                  </div>
                  <div className="text-2xl font-bold">
                    <AnimatedCounter end={12450} prefix="$" duration={2000} />
                  </div>
                  <div className="text-xs text-muted-foreground">Today&apos;s Revenue</div>
                </div>
                
                <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="flex items-center gap-1 text-xs text-green-400">
                      <TrendingUp className="w-3 h-3" /> +8%
                    </span>
                  </div>
                  <div className="text-2xl font-bold">
                    <AnimatedCounter end={47} duration={1500} />
                  </div>
                  <div className="text-xs text-muted-foreground">Appointments Today</div>
                </div>
                
                <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <span className="flex items-center gap-1 text-xs text-red-400">
                      <TrendingDown className="w-3 h-3" /> 3
                    </span>
                  </div>
                  <div className="text-2xl font-bold">
                    <AnimatedCounter end={320} prefix="$" duration={1800} />
                  </div>
                  <div className="text-xs text-muted-foreground">At Risk Revenue</div>
                </div>
                
                <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <Activity className="w-5 h-5 text-green-400" />
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold">
                    <AnimatedCounter end={190} prefix="$" duration={2000} />
                  </div>
                  <div className="text-xs text-muted-foreground">AI Recovered</div>
                </div>
              </div>

              {/* Charts and Appointments */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Revenue Trend</h3>
                    <span className="text-xs text-muted-foreground">Last 12 months</span>
                  </div>
                  <div className="h-40 flex items-end gap-2">
                    {revenueData.map((value, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-primary/20 rounded-t-md relative overflow-hidden group"
                        style={{ height: `${value}%` }}
                      >
                        <div 
                          className="absolute inset-0 bg-primary opacity-60 transition-opacity group-hover:opacity-100"
                          style={{ height: `${value}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Jan</span>
                    <span>Dec</span>
                  </div>
                </div>

                {/* Appointments List */}
                <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Upcoming Appointments</h3>
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-3">
                    {appointmentData.map((apt, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-medium text-primary">{apt.time}</div>
                          <div>
                            <div className="text-sm font-medium">{apt.patient}</div>
                            <div className="text-xs text-muted-foreground">{apt.type}</div>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          apt.risk === "low" 
                            ? "bg-green-500/20 text-green-400"
                            : apt.risk === "medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}>
                          {apt.risk === "high" ? "High Risk" : apt.risk === "medium" ? "Medium" : "Confirmed"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-10 bg-primary/10 blur-[100px] -z-10 rounded-full" />
        </div>
      </div>
    </section>
  )
}
