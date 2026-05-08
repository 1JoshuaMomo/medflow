"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { AnimatedCounter } from "@/components/effects/animated-counter"
import { GlowCard } from "@/components/effects/glow-card"
import { useDashboardOverview } from "@/hooks/use-dashboard-overview"
import {
  DollarSign,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Brain,
  Zap,
  Activity,
  RotateCw,
} from "lucide-react"

const iconMap = {
  dollar: DollarSign,
  calendar: Calendar,
  alert: AlertTriangle,
  brain: Brain,
}

export default function DashboardPage() {
  const [selectedPeriod] = useState("today")
  const [health, setHealth] = useState<"checking" | "ok" | "degraded">("checking")
  const { data, isLoading, error, refresh } = useDashboardOverview()
  const statsData = data?.stats ?? []
  const recentActions = data?.recentActions ?? []
  const upcomingAppointments = data?.upcomingAppointments ?? []
  const revenueChartData = data?.revenueChartData ?? []

  const riskTotal = useMemo(
    () => (data ? data.riskCounts.low + data.riskCounts.medium + data.riskCounts.high : 0),
    [data]
  )

  useEffect(() => {
    async function checkHealth() {
      try {
        const response = await fetch("/api/health", { cache: "no-store" })
        setHealth(response.ok ? "ok" : "degraded")
      } catch {
        setHealth("degraded")
      }
    }
    void checkHealth()
  }, [])

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Good morning, {data?.greetingName ?? "Doctor"}</h2>
          <p className="text-muted-foreground">Live clinic snapshot with API-powered operational metrics.</p>
          <div className="mt-2 text-xs">
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 border ${
                health === "ok"
                  ? "border-green-500/40 bg-green-500/10 text-green-400"
                  : health === "degraded"
                  ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-300"
                  : "border-border bg-secondary/60 text-muted-foreground"
              }`}
            >
              Platform status: {health === "checking" ? "Checking" : health === "ok" ? "Operational" : "Degraded"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => void refresh()} disabled={isLoading}>
            <RotateCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Link href="/dashboard/ai-assistant">
            <Button className="glow-sm hover:glow transition-all">
              <Brain className="w-4 h-4 mr-2" />
              Ask AI Assistant
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading &&
          Array.from({ length: 4 }).map((_, idx) => (
            <GlowCard key={idx} className="p-6">
              <Skeleton className="h-5 w-20 mb-4" />
              <Skeleton className="h-9 w-28 mb-2" />
              <Skeleton className="h-4 w-32" />
            </GlowCard>
          ))}
        {statsData.map((stat, index) => {
          const Icon = iconMap[stat.icon]
          return (
            <GlowCard key={stat.title} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.changeType === "negative" ? "bg-destructive/10" : "bg-primary/10"}`}>
                  <Icon className={`w-5 h-5 ${stat.changeType === "negative" ? "text-destructive" : "text-primary"}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${stat.changeType === "positive" ? "text-green-500" : "text-red-500"}`}>
                  {stat.changeType === "positive" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.changeType === "positive" ? "+" : ""}
                  {stat.change}%
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">
                <AnimatedCounter end={stat.value} prefix={stat.prefix ?? ""} duration={2000 + index * 200} />
              </div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
            </GlowCard>
          )
        })}
      </div>

      {error && <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className={selectedPeriod === "today" ? "bg-secondary" : ""}>Today</Button>
              <Button variant="ghost" size="sm">Week</Button>
              <Button variant="ghost" size="sm">Month</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end gap-2">
              {revenueChartData.map((value, index) => (
                <div key={index} className="flex-1 bg-primary/20 rounded-t-md relative overflow-hidden group cursor-pointer transition-all hover:bg-primary/30" style={{ height: `${value}%` }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-primary transition-all" style={{ height: `${value}%` }} />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${Math.round(value * 125)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-muted-foreground">
              <span>8 AM</span>
              <span>12 PM</span>
              <span>4 PM</span>
              <span>8 PM</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
              <div>
                <div className="text-sm text-muted-foreground">Projected</div>
                <div className="text-xl font-bold text-primary">${data?.projectedRevenue.toLocaleString() ?? "0"}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Lost (No-shows)</div>
                <div className="text-xl font-bold text-destructive">${data?.lostRevenue.toLocaleString() ?? "0"}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">AI Recovered</div>
                <div className="text-xl font-bold text-green-500">${data?.recoveredRevenue.toLocaleString() ?? "0"}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              AI Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActions.map((action, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className={`p-1.5 rounded-full ${action.type === "alert" ? "bg-yellow-500/20" : action.type === "recovery" ? "bg-green-500/20" : "bg-primary/20"}`}>
                    {action.type === "alert" ? <AlertTriangle className="w-3.5 h-3.5 text-yellow-500" /> : action.type === "recovery" ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <Activity className="w-3.5 h-3.5 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{action.action}</div>
                    <div className="text-xs text-muted-foreground truncate">{action.patient}</div>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">{action.time}</div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/ai-assistant">
              <Button variant="ghost" className="w-full mt-4" size="sm">
                View All Activity
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Upcoming Appointments</CardTitle>
            <Link href="/dashboard/appointments">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.map((apt, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-bold text-primary w-12">{apt.time}</div>
                    <div>
                      <div className="text-sm font-medium">{apt.patient}</div>
                      <div className="text-xs text-muted-foreground">{apt.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {apt.status === "at-risk" && <div className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium flex items-center gap-1"><AlertTriangle className="w-3 h-3" />At Risk</div>}
                    {apt.status === "confirmed" && <div className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3" />Confirmed</div>}
                    {apt.status === "pending" && <div className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium flex items-center gap-1"><Clock className="w-3 h-3" />Pending</div>}
                  </div>
                </div>
              ))}
              {!isLoading && upcomingAppointments.length === 0 && (
                <div className="text-sm text-muted-foreground">No upcoming appointments available.</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">No-Show Risk Analysis</CardTitle>
            <Link href="/dashboard/predictions">
              <Button variant="ghost" size="sm">
                Details
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Risk Distribution</span>
                  <span className="text-sm text-muted-foreground">{data?.appointmentsTotal ?? 0} appointments</span>
                </div>
                <div className="flex gap-1 h-3 rounded-full overflow-hidden">
                  <div className="bg-green-500" style={{ width: `${riskTotal ? (100 * (data?.riskCounts.low ?? 0)) / riskTotal : 0}%` }} />
                  <div className="bg-yellow-500" style={{ width: `${riskTotal ? (100 * (data?.riskCounts.medium ?? 0)) / riskTotal : 0}%` }} />
                  <div className="bg-red-500" style={{ width: `${riskTotal ? (100 * (data?.riskCounts.high ?? 0)) / riskTotal : 0}%` }} />
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />Low ({data?.riskCounts.low ?? 0})</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" />Medium ({data?.riskCounts.medium ?? 0})</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />High ({data?.riskCounts.high ?? 0})</span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-3">High Risk Patients</div>
                <div className="space-y-2">
                  {(data?.highRiskPatients ?? []).map((patient, index) => (
                    <div key={index} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{patient.name}</span>
                        <span className="text-xs text-red-400">{patient.risk}% risk</span>
                      </div>
                      <Progress value={patient.risk} className="h-1.5 bg-red-500/20" />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{patient.time}</span>
                        <Button size="sm" variant="ghost" className="h-6 text-xs text-primary">Send Reminder</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
