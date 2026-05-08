import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, PlugZap, ShieldCheck } from "lucide-react"

const integrations = [
  { name: "Stripe Billing", status: "connected", description: "Revenue reconciliation and payment events." },
  { name: "Twilio SMS", status: "connected", description: "Automated no-show reminders and confirmations." },
  { name: "Google Calendar", status: "available", description: "Bi-directional slot and event sync." },
]

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Integrations Hub</h2>
        <p className="text-muted-foreground">Connect mission-critical tools to extend your clinic operating system.</p>
      </div>
      <div className="grid gap-4">
        {integrations.map((item) => (
          <Card key={item.name}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <PlugZap className="w-5 h-5 text-primary" />
                {item.name}
              </CardTitle>
              {item.status === "connected" ? (
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                </span>
              ) : (
                <Button size="sm">Connect</Button>
              )}
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{item.description}</CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-primary/5 border-primary/30">
        <CardContent className="py-5 flex items-center gap-2 text-sm">
          <ShieldCheck className="w-4 h-4 text-primary" />
          Enterprise integration controls support audit logs and scoped API keys.
        </CardContent>
      </Card>
    </div>
  )
}
