"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Search, Plus, RefreshCw, Users, Activity } from "lucide-react"
import type { PlatformPatient } from "@/lib/platform-data"

type PatientPayload = {
  data: PlatformPatient[]
  total: number
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<PlatformPatient[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<PlatformPatient | null>(null)
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    nextVisit: "",
    riskLevel: "low" as "low" | "medium" | "high",
  })

  const fetchPatients = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/patients", { cache: "no-store" })
      if (!response.ok) throw new Error("Failed to load patients.")
      const payload = (await response.json()) as PatientPayload
      setPatients(payload.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchPatients()
  }, [])

  const filteredPatients = useMemo(
    () =>
      patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.email.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [patients, searchQuery]
  )

  const createPatient = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          nextVisit: form.nextVisit || null,
          riskLevel: form.riskLevel,
        }),
      })
      if (!response.ok) throw new Error("Failed to create patient.")
      await fetchPatients()
      setIsNewPatientOpen(false)
      setForm({ name: "", email: "", phone: "", nextVisit: "", riskLevel: "low" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error")
    } finally {
      setIsSaving(false)
    }
  }

  const activePatients = patients.filter((patient) => patient.status === "active").length

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Patients</h2>
          <p className="text-muted-foreground">Unified patient intelligence with live API sync.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => void fetchPatients()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={isNewPatientOpen} onOpenChange={setIsNewPatientOpen}>
            <DialogTrigger asChild>
              <Button className="glow-sm hover:glow transition-all">
                <Plus className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
                <DialogDescription>Create a patient profile for scheduling and analytics.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <Field><FieldLabel>Name</FieldLabel><Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} /></Field>
                <Field><FieldLabel>Email</FieldLabel><Input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} /></Field>
                <Field><FieldLabel>Phone</FieldLabel><Input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} /></Field>
                <Field><FieldLabel>Next Visit</FieldLabel><Input type="date" value={form.nextVisit} onChange={(e) => setForm((p) => ({ ...p, nextVisit: e.target.value }))} /></Field>
                <Field><FieldLabel>Risk Level</FieldLabel><Input value={form.riskLevel} onChange={(e) => setForm((p) => ({ ...p, riskLevel: e.target.value as "low" | "medium" | "high" }))} /></Field>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewPatientOpen(false)}>Cancel</Button>
                <Button onClick={() => void createPatient()} disabled={isSaving}>{isSaving ? "Saving..." : "Create"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="flex items-center justify-between"><Users className="w-5 h-5 text-primary" /><span className="text-2xl font-bold">{patients.length}</span></div><div className="text-xs text-muted-foreground mt-1">Total Patients</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center justify-between"><Activity className="w-5 h-5 text-green-500" /><span className="text-2xl font-bold">{activePatients}</span></div><div className="text-xs text-muted-foreground mt-1">Active Patients</div></CardContent></Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input className="pl-10" placeholder="Search patients..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      {error && <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">{error}</div>}

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Patient Directory</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {isLoading && <div className="text-sm text-muted-foreground">Loading patients...</div>}
              {!isLoading &&
                filteredPatients.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className="w-full p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-secondary/40 transition-colors text-left"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-xs text-muted-foreground">{patient.email}</div>
                      </div>
                      <Badge variant="outline">{patient.riskLevel}</Badge>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">{patient.phone}</div>
                  </button>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Patient Details</CardTitle></CardHeader>
          <CardContent>
            {selectedPatient ? (
              <div className="space-y-3 text-sm">
                <div className="font-semibold">{selectedPatient.name}</div>
                <div className="text-muted-foreground break-all">{selectedPatient.email}</div>
                <div>{selectedPatient.phone}</div>
                <div>Total visits: {selectedPatient.totalVisits}</div>
                <div>No-show rate: {selectedPatient.noShowRate}%</div>
                <div>Status: {selectedPatient.status}</div>
                <div>Next visit: {selectedPatient.nextVisit ?? "Not scheduled"}</div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">Select a patient from the directory.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
