import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertTriangle, CheckCircle2, Info } from "lucide-react"

const notifications = [
  { title: "High no-show risk detected", type: "warning", detail: "Michael Chen has 87% no-show risk for 09:30 AM." },
  { title: "Recovery successful", type: "success", detail: "AI refill workflow recovered a 2:30 PM cancellation." },
  { title: "System insight", type: "info", detail: "Tuesday afternoons show strongest conversion from waitlist." },
]

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
        <p className="text-muted-foreground">Operational alerts and AI outcomes in one stream.</p>
      </div>
      <div className="space-y-3">
        {notifications.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                {item.type === "warning" ? <AlertTriangle className="w-4 h-4 text-yellow-500" /> : item.type === "success" ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Info className="w-4 h-4 text-blue-500" />}
                {item.title}
              </CardTitle>
              <Badge variant="outline" className="capitalize">{item.type}</Badge>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{item.detail}</CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-secondary/40">
        <CardContent className="py-5 text-sm flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" />
          Configure per-team channels and quiet hours from Settings.
        </CardContent>
      </Card>
    </div>
  )
}
