import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage clinic profile, notifications, and automation defaults.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Clinic Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Clinic Name</FieldLabel>
            <Input defaultValue="City Clinic" />
          </Field>
          <Field>
            <FieldLabel>Primary Email</FieldLabel>
            <Input defaultValue="john@cityclinic.com" />
          </Field>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>System Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Enable AI auto-reminders</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Daily summary digest</span>
            <Switch defaultChecked />
          </div>
          <Button className="mt-2">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}
