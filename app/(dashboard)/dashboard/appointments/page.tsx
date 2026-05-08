"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Calendar, Search, Plus, Bell, AlertTriangle, RefreshCw } from "lucide-react"
import type { PlatformAppointment } from "@/lib/platform-data"

type AppointmentPayload = {
  data: PlatformAppointment[]
  total: number
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<PlatformAppointment[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState<PlatformAppointment | null>(null)
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    patientName: "",
    email: "",
    phone: "",
    time: "",
    endTime: "",
    type: "",
    notes: "",
  })

  const fetchAppointments = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/appointments", { cache: "no-store" })
      if (!response.ok) throw new Error("Failed to load appointments.")
      const payload = (await response.json()) as AppointmentPayload
      setAppointments(payload.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchAppointments()
  }, [])

  const filteredAppointments = useMemo(
    () =>
      appointments.filter(
        (apt) =>
          apt.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          apt.type.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [appointments, searchQuery]
  )

  const createAppointment = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          time: form.time,
          endTime: form.endTime,
          type: form.type,
          notes: form.notes,
          patient: {
            name: form.patientName,
            email: form.email,
            phone: form.phone,
          },
        }),
      })
      if (!response.ok) throw new Error("Failed to create appointment.")
      await fetchAppointments()
      setIsNewAppointmentOpen(false)
      setForm({ patientName: "", email: "", phone: "", time: "", endTime: "", type: "", notes: "" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
          <p className="text-muted-foreground">Live scheduling center powered by API data.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => void fetchAppointments()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
            <DialogTrigger asChild>
              <Button className="glow-sm hover:glow transition-all">
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
                <DialogDescription>Create a new slot and sync it instantly.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <Field><FieldLabel>Patient Name</FieldLabel><Input value={form.patientName} onChange={(e) => setForm((p) => ({ ...p, patientName: e.target.value }))} /></Field>
                <Field><FieldLabel>Email</FieldLabel><Input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} /></Field>
                <Field><FieldLabel>Phone</FieldLabel><Input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} /></Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field><FieldLabel>Start</FieldLabel><Input type="time" value={form.time} onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))} /></Field>
                  <Field><FieldLabel>End</FieldLabel><Input type="time" value={form.endTime} onChange={(e) => setForm((p) => ({ ...p, endTime: e.target.value }))} /></Field>
                </div>
                <Field><FieldLabel>Type</FieldLabel><Input value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))} /></Field>
                <Field><FieldLabel>Notes</FieldLabel><Input value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} /></Field>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>Cancel</Button>
                <Button onClick={() => void createAppointment()} disabled={isSaving}>{isSaving ? "Saving..." : "Create"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input className="pl-10" placeholder="Search appointments..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      {error && <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">{error}</div>}

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-lg">Today&apos;s Schedule</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {isLoading && <div className="text-sm text-muted-foreground">Loading appointments...</div>}
              {!isLoading &&
                filteredAppointments.map((appointment) => (
                  <button
                    key={appointment.id}
                    onClick={() => setSelectedAppointment(appointment)}
                    className="w-full text-left p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-secondary/40 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="font-medium">{appointment.patient.name}</div>
                        <div className="text-xs text-muted-foreground">{appointment.type}</div>
                      </div>
                      <Badge variant="outline">{appointment.status}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {appointment.time} - {appointment.endTime}
                      <span className={appointment.risk > 60 ? "text-red-400" : appointment.risk > 30 ? "text-yellow-400" : "text-green-400"}>
                        {appointment.risk}% risk
                      </span>
                    </div>
                  </button>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Appointment Details</CardTitle></CardHeader>
          <CardContent>
            {selectedAppointment ? (
              <div className="space-y-4">
                <div>
                  <div className="font-semibold">{selectedAppointment.patient.name}</div>
                  <div className="text-xs text-muted-foreground">{selectedAppointment.patient.email}</div>
                </div>
                <div className="text-sm space-y-1">
                  <div>{selectedAppointment.patient.phone}</div>
                  <div>{selectedAppointment.time} - {selectedAppointment.endTime}</div>
                  <div>{selectedAppointment.type}</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/40 text-sm">{selectedAppointment.notes || "No notes provided."}</div>
                <Button className="w-full"><Bell className="w-4 h-4 mr-2" />Send Reminder</Button>
                {selectedAppointment.risk >= 60 && (
                  <div className="text-xs text-yellow-300 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    High-risk appointment - prioritize confirmation.
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">Select an appointment from the schedule.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
