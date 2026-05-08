"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/effects/animated-counter"
import {
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  AlertTriangle,
  CheckCircle,
  Download,
} from "lucide-react"

const monthlyData = [
  { month: "Jan", revenue: 42500, recovered: 3200, lost: 1800 },
  { month: "Feb", revenue: 45200, recovered: 4100, lost: 2100 },
  { month: "Mar", revenue: 48900, recovered: 3800, lost: 1500 },
  { month: "Apr", revenue: 52100, recovered: 4500, lost: 1900 },
  { month: "May", revenue: 49800, recovered: 3900, lost: 2400 },
  { month: "Jun", revenue: 55400, recovered: 5200, lost: 1700 },
  { month: "Jul", revenue: 58200, recovered: 4800, lost: 1400 },
  { month: "Aug", revenue: 61500, recovered: 5500, lost: 1600 },
  { month: "Sep", revenue: 59800, recovered: 4200, lost: 1800 },
  { month: "Oct", revenue: 63200, recovered: 5800, lost: 1300 },
  { month: "Nov", revenue: 67500, recovered: 6100, lost: 1500 },
  { month: "Dec", revenue: 72400, recovered: 6800, lost: 1200 },
]

const revenueBreakdown = [
  { type: "Consultations", amount: 28500, percentage: 38 },
  { type: "Procedures", amount: 22400, percentage: 30 },
  { type: "Checkups", amount: 15200, percentage: 20 },
  { type: "Follow-ups", amount: 8900, percentage: 12 },
]

const recentTransactions = [
  { patient: "Sarah Johnson", type: "Consultation", amount: 150, time: "10:30 AM" },
  { patient: "Michael Chen", type: "Procedure", amount: 450, time: "09:45 AM" },
  { patient: "Emily Davis", type: "Checkup", amount: 85, time: "09:00 AM" },
  { patient: "James Wilson", type: "Follow-up", amount: 75, time: "Yesterday" },
  { patient: "Lisa Anderson", type: "Consultation", amount: 150, time: "Yesterday" },
]

export default function RevenuePage() {
  const [period, setPeriod] = useState<"week" | "month" | "year">("month")
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue))

  const totalRevenue = monthlyData.reduce((acc, curr) => acc + curr.revenue, 0)
  const totalRecovered = monthlyData.reduce((acc, curr) => acc + curr.recovered, 0)
  const totalLost = monthlyData.reduce((acc, curr) => acc + curr.lost, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Revenue Analytics</h2>
          <p className="text-muted-foreground">
            Track your clinic&apos;s financial performance and AI recovery impact
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <div className="flex rounded-lg border border-border overflow-hidden">
            {(["week", "month", "year"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  period === p ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                <TrendingUp className="w-4 h-4" />
                +18%
              </span>
            </div>
            <div className="text-3xl font-bold mb-1">
              $<AnimatedCounter end={totalRevenue} duration={2000} />
            </div>
            <div className="text-sm text-muted-foreground">Total Revenue (YTD)</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Brain className="w-5 h-5 text-green-500" />
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                <ArrowUpRight className="w-4 h-4" />
                +32%
              </span>
            </div>
            <div className="text-3xl font-bold mb-1 text-green-500">
              $<AnimatedCounter end={totalRecovered} duration={2200} />
            </div>
            <div className="text-sm text-muted-foreground">AI Recovered Revenue</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-red-500/10">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                <ArrowDownRight className="w-4 h-4" />
                -15%
              </span>
            </div>
            <div className="text-3xl font-bold mb-1 text-red-500">
              $<AnimatedCounter end={totalLost} duration={2400} />
            </div>
            <div className="text-sm text-muted-foreground">Lost to No-Shows</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                <TrendingUp className="w-4 h-4" />
                +5%
              </span>
            </div>
            <div className="text-3xl font-bold mb-1">
              <AnimatedCounter end={92} duration={2000} />%
            </div>
            <div className="text-sm text-muted-foreground">Collection Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Revenue Trend</CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-muted-foreground">Recovered</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72 flex items-end gap-2">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col gap-1">
                  <div 
                    className="w-full bg-primary/80 rounded-t-md relative group cursor-pointer hover:bg-primary transition-colors"
                    style={{ height: `${(data.revenue / maxRevenue) * 200}px` }}
                  >
                    {/* Recovered portion */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-green-500/50 rounded-t-md"
                      style={{ height: `${(data.recovered / data.revenue) * 100}%` }}
                    />
                    {/* Tooltip */}
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 px-3 py-2 bg-popover rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg border border-border">
                      <div className="font-medium">{data.month}</div>
                      <div className="text-muted-foreground">Revenue: ${data.revenue.toLocaleString()}</div>
                      <div className="text-green-400">Recovered: ${data.recovered.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="text-xs text-center text-muted-foreground">{data.month}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue by Service</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {revenueBreakdown.map((item, index) => (
                <div key={item.type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.type}</span>
                    <span className="text-sm font-bold">${item.amount.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-primary transition-all duration-1000"
                      style={{ 
                        width: `${item.percentage}%`,
                        animationDelay: `${index * 150}ms`
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{item.percentage}% of total</div>
                </div>
              ))}
            </div>

            {/* AI Impact */}
            <div className="mt-8 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-primary" />
                <span className="font-medium">AI Revenue Impact</span>
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                +${totalRecovered.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                Revenue recovered through AI predictions and automated reminders
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
          <Button variant="ghost" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium text-sm">
                    {transaction.patient.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-medium">{transaction.patient}</div>
                    <div className="text-sm text-muted-foreground">{transaction.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-500">+${transaction.amount}</div>
                  <div className="text-xs text-muted-foreground">{transaction.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
