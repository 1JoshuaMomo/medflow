import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LifeBuoy, BookOpenText, MessageSquare, Rocket } from "lucide-react"

const resources = [
  { title: "Quick Start Guide", description: "Launch your first AI no-show workflow in under 10 minutes.", icon: Rocket },
  { title: "Platform Docs", description: "Understand dashboards, APIs, and automation modules.", icon: BookOpenText },
  { title: "Contact Support", description: "Chat with the MedFlow product team for setup help.", icon: MessageSquare },
]

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Help Center</h2>
        <p className="text-muted-foreground">Documentation and support resources for your team.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <Card key={resource.title}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <resource.icon className="w-5 h-5 text-primary" />
                {resource.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{resource.description}</CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-primary/5 border-primary/30">
        <CardContent className="py-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <LifeBuoy className="w-4 h-4 text-primary" />
            Need onboarding support for your clinic staff?
          </div>
          <Button>Book Training Session</Button>
        </CardContent>
      </Card>
    </div>
  )
}
