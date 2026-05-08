import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Bot, BellRing, CalendarClock, Sparkles } from "lucide-react"

const flows = [
  { name: "At-risk appointment reminders", description: "Send AI-personalized reminders 24h and 2h before appointment.", enabled: true, icon: BellRing },
  { name: "Waitlist auto-fill", description: "Backfill canceled slots with best-fit patient from waitlist.", enabled: true, icon: CalendarClock },
  { name: "AI follow-up summary", description: "Generate post-visit summary and follow-up instructions automatically.", enabled: false, icon: Bot },
]

export default function AutomationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Automation Center</h2>
        <p className="text-muted-foreground">Activate autonomous workflows to reduce no-shows and improve throughput.</p>
      </div>
      <div className="grid gap-4">
        {flows.map((flow) => (
          <Card key={flow.name}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <flow.icon className="w-5 h-5 text-primary" />
                  {flow.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{flow.description}</p>
              </div>
              <Switch checked={flow.enabled} aria-label={flow.name} />
            </CardHeader>
          </Card>
        ))}
      </div>
      <Card className="bg-primary/5 border-primary/30">
        <CardContent className="py-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <p className="text-sm">Workflow simulations suggest a 17% uplift in recovered appointments.</p>
          </div>
          <Button>Apply Recommendations</Button>
        </CardContent>
      </Card>
    </div>
  )
}
