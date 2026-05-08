import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Server, ActivitySquare } from "lucide-react"

const endpoints = [
  { method: "GET", path: "/api/health", status: "live" },
  { method: "GET", path: "/api/dashboard/overview", status: "live" },
  { method: "GET/POST", path: "/api/patients", status: "live" },
  { method: "GET/POST", path: "/api/appointments", status: "live" },
  { method: "POST", path: "/api/ai/assistant", status: "live" },
]

export default function ApiCenterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">API Center</h2>
        <p className="text-muted-foreground">Operational API catalog for integrations, automation, and AI workflows.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Card><CardContent className="p-5"><div className="flex items-center justify-between"><Server className="w-5 h-5 text-primary" /><span className="text-xl font-bold">5</span></div><div className="text-xs text-muted-foreground mt-1">Active endpoints</div></CardContent></Card>
        <Card><CardContent className="p-5"><div className="flex items-center justify-between"><ActivitySquare className="w-5 h-5 text-green-500" /><span className="text-xl font-bold">99.9%</span></div><div className="text-xs text-muted-foreground mt-1">Target uptime</div></CardContent></Card>
        <Card><CardContent className="p-5"><div className="flex items-center justify-between"><Code2 className="w-5 h-5 text-blue-400" /><span className="text-xl font-bold">v1</span></div><div className="text-xs text-muted-foreground mt-1">API version</div></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Endpoint Catalog</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {endpoints.map((endpoint) => (
            <div key={endpoint.path} className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg border border-border">
              <div className="text-sm"><span className="font-medium">{endpoint.method}</span> {endpoint.path}</div>
              <Badge variant="outline" className="text-green-400 border-green-500/30">{endpoint.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
