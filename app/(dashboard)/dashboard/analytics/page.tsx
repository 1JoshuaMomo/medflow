import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Target, Users, Timer } from "lucide-react"

const kpis = [
  { label: "Patient Retention", value: 82, icon: Users },
  { label: "On-Time Starts", value: 91, icon: Timer },
  { label: "No-Show Prevention", value: 78, icon: Target },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Advanced Analytics</h2>
        <p className="text-muted-foreground">Track operational performance across every patient journey touchpoint.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Performance Benchmarks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <kpi.icon className="w-4 h-4 text-primary" />
                  {kpi.label}
                </span>
                <span className="font-medium">{kpi.value}%</span>
              </div>
              <Progress value={kpi.value} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
