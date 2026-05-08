"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Bell,
  Calendar,
  User,
  ArrowRight,
  Zap,
  Target,
  Shield,
} from "lucide-react"

const predictions = [
  {
    id: 1,
    patient: "Michael Chen",
    time: "Tomorrow 09:30 AM",
    type: "Follow-up",
    riskScore: 87,
    factors: ["3 no-shows in 6 months", "Frequently reschedules", "No reminder response"],
    recommendation: "Send personalized reminder + SMS confirmation",
    status: "action-needed",
  },
  {
    id: 2,
    patient: "Robert Kim",
    time: "Tomorrow 02:00 PM",
    type: "Consultation",
    riskScore: 75,
    factors: ["History of afternoon cancellations", "Recent life changes noted", "Payment pending"],
    recommendation: "Call to confirm + offer morning alternative",
    status: "action-needed",
  },
  {
    id: 3,
    patient: "Emma White",
    time: "Wed 10:00 AM",
    type: "Checkup",
    riskScore: 55,
    factors: ["New patient anxiety", "Transportation noted as concern"],
    recommendation: "Send location/parking info + gentle reminder",
    status: "monitoring",
  },
  {
    id: 4,
    patient: "David Lee",
    time: "Thu 03:30 PM",
    type: "Procedure",
    riskScore: 72,
    factors: ["First major procedure", "Asked many questions", "No deposit collected"],
    recommendation: "Pre-appointment call + collect deposit",
    status: "action-needed",
  },
  {
    id: 5,
    patient: "Sarah Johnson",
    time: "Tomorrow 09:00 AM",
    riskScore: 15,
    type: "Checkup",
    factors: ["Excellent attendance history", "Always confirms", "Regular patient"],
    recommendation: "Standard reminder sufficient",
    status: "confirmed",
  },
]

const stats = [
  { label: "Prediction Accuracy", value: 94, icon: Target, color: "text-primary" },
  { label: "No-Shows Prevented", value: 156, icon: Shield, color: "text-green-400" },
  { label: "Revenue Saved", value: "$23,400", icon: TrendingUp, color: "text-primary" },
  { label: "Active Predictions", value: 47, icon: Brain, color: "text-yellow-400" },
]

const modelInsights = [
  { factor: "Historical no-show rate", importance: 28 },
  { factor: "Appointment time of day", importance: 22 },
  { factor: "Days since booking", importance: 18 },
  { factor: "Reminder response rate", importance: 15 },
  { factor: "Weather conditions", importance: 10 },
  { factor: "Payment history", importance: 7 },
]

export default function PredictionsPage() {
  const getRiskColor = (score: number) => {
    if (score < 30) return "text-green-400"
    if (score < 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getRiskBg = (score: number) => {
    if (score < 30) return "bg-green-500"
    if (score < 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">No-Show Predictions</h2>
          <p className="text-muted-foreground">
            AI-powered predictions to help you reduce missed appointments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Filter by Date
          </Button>
          <Button className="glow-sm hover:glow transition-all">
            <Bell className="w-4 h-4 mr-2" />
            Send All Reminders
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">
                  {typeof stat.value === "number" && stat.label.includes("Accuracy") 
                    ? `${stat.value}%` 
                    : stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Predictions List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Active Predictions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {predictions.map((prediction) => (
                <div
                  key={prediction.id}
                  className={`p-4 rounded-xl border transition-all hover:border-primary/30 ${
                    prediction.status === "action-needed"
                      ? "bg-red-500/5 border-red-500/20"
                      : prediction.status === "monitoring"
                      ? "bg-yellow-500/5 border-yellow-500/20"
                      : "bg-secondary/30 border-border"
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                        {prediction.patient.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-semibold">{prediction.patient}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {prediction.time}
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">
                            {prediction.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getRiskColor(prediction.riskScore)}`}>
                        {prediction.riskScore}%
                      </div>
                      <div className="text-xs text-muted-foreground">Risk Score</div>
                    </div>
                  </div>

                  {/* Risk Bar */}
                  <div className="mb-4">
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${getRiskBg(prediction.riskScore)}`}
                        style={{ width: `${prediction.riskScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Risk Factors */}
                  <div className="mb-4">
                    <div className="text-xs font-medium text-muted-foreground mb-2">RISK FACTORS</div>
                    <div className="flex flex-wrap gap-2">
                      {prediction.factors.map((factor, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-secondary/50">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-sm">{prediction.recommendation}</span>
                    </div>
                    <Button size="sm" className="glow-sm">
                      Take Action
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Model Insights */}
        <div className="space-y-6">
          {/* Risk Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Risk Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Low Risk (0-30%)
                    </span>
                    <span className="text-sm font-medium">33 patients</span>
                  </div>
                  <Progress value={70} className="h-2 bg-green-500/20" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      Medium Risk (30-60%)
                    </span>
                    <span className="text-sm font-medium">10 patients</span>
                  </div>
                  <Progress value={21} className="h-2 bg-yellow-500/20" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      High Risk (60%+)
                    </span>
                    <span className="text-sm font-medium">4 patients</span>
                  </div>
                  <Progress value={9} className="h-2 bg-red-500/20" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Model Factors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                Model Factor Importance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {modelInsights.map((insight, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{insight.factor}</span>
                      <span className="text-xs text-muted-foreground">{insight.importance}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${insight.importance}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <div className="text-xs font-medium text-primary mb-1">AI Learning Update</div>
                <div className="text-xs text-muted-foreground">
                  Model accuracy improved by 2.3% this month based on 847 new data points.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-2" />
                Send High-Risk Reminders
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                View Patient History
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Follow-ups
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
