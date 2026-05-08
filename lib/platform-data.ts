export type PlatformPatient = {
  id: number
  name: string
  email: string
  phone: string
  lastVisit: string
  nextVisit: string | null
  totalVisits: number
  noShowRate: number
  status: "active" | "inactive"
  riskLevel: "low" | "medium" | "high"
}

export type PlatformAppointment = {
  id: number
  time: string
  endTime: string
  patient: {
    name: string
    email: string
    phone: string
  }
  type: string
  status: "confirmed" | "at-risk" | "pending"
  risk: number
  notes: string
}

const patientStore: PlatformPatient[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah@email.com", phone: "+1 234 567 890", lastVisit: "2024-01-15", nextVisit: "2024-02-20", totalVisits: 12, noShowRate: 5, status: "active", riskLevel: "low" },
  { id: 2, name: "Michael Chen", email: "michael@email.com", phone: "+1 234 567 891", lastVisit: "2024-01-10", nextVisit: "2024-02-18", totalVisits: 8, noShowRate: 35, status: "active", riskLevel: "high" },
  { id: 3, name: "Emily Davis", email: "emily@email.com", phone: "+1 234 567 892", lastVisit: "2024-01-08", nextVisit: null, totalVisits: 3, noShowRate: 20, status: "active", riskLevel: "medium" },
  { id: 4, name: "James Wilson", email: "james@email.com", phone: "+1 234 567 893", lastVisit: "2024-01-05", nextVisit: "2024-02-25", totalVisits: 25, noShowRate: 2, status: "active", riskLevel: "low" },
  { id: 5, name: "Lisa Anderson", email: "lisa@email.com", phone: "+1 234 567 894", lastVisit: "2023-12-20", nextVisit: null, totalVisits: 6, noShowRate: 15, status: "inactive", riskLevel: "medium" },
  { id: 6, name: "Robert Kim", email: "robert@email.com", phone: "+1 234 567 895", lastVisit: "2024-01-12", nextVisit: "2024-02-19", totalVisits: 4, noShowRate: 45, status: "active", riskLevel: "high" },
]

const appointmentStore: PlatformAppointment[] = [
  { id: 1, time: "09:00", endTime: "09:30", patient: { name: "Sarah Johnson", email: "sarah@email.com", phone: "+1 234 567 890" }, type: "Checkup", status: "confirmed", risk: 15, notes: "Regular checkup, first visit" },
  { id: 2, time: "09:30", endTime: "10:00", patient: { name: "Michael Chen", email: "michael@email.com", phone: "+1 234 567 891" }, type: "Follow-up", status: "at-risk", risk: 87, notes: "Post-surgery follow-up" },
  { id: 3, time: "10:00", endTime: "10:30", patient: { name: "Emily Davis", email: "emily@email.com", phone: "+1 234 567 892" }, type: "Consultation", status: "pending", risk: 45, notes: "New patient consultation" },
  { id: 4, time: "10:30", endTime: "11:30", patient: { name: "James Wilson", email: "james@email.com", phone: "+1 234 567 893" }, type: "Procedure", status: "confirmed", risk: 8, notes: "Minor procedure - 1 hour slot" },
  { id: 5, time: "11:30", endTime: "12:00", patient: { name: "Lisa Anderson", email: "lisa@email.com", phone: "+1 234 567 894" }, type: "Checkup", status: "confirmed", risk: 12, notes: "Annual checkup" },
  { id: 6, time: "14:00", endTime: "14:30", patient: { name: "Robert Kim", email: "robert@email.com", phone: "+1 234 567 895" }, type: "Follow-up", status: "at-risk", risk: 75, notes: "History of cancellations" },
]

export function getRevenueMetrics() {
  const todayRevenue = 12850
  const recovered = 620
  const atRisk = 540
  return {
    todayRevenue,
    recovered,
    atRisk,
    projectedWeeklyRevenue: 70200,
    noShowRate: 9.3,
    fillRate: 91,
  }
}

export function listPatients() {
  return patientStore
}

export function addPatient(
  payload: Pick<PlatformPatient, "name" | "email" | "phone"> & {
    nextVisit?: string | null
    riskLevel?: PlatformPatient["riskLevel"]
  }
) {
  const nextId = patientStore.length ? Math.max(...patientStore.map((p) => p.id)) + 1 : 1
  const patient: PlatformPatient = {
    id: nextId,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    lastVisit: new Date().toISOString().slice(0, 10),
    nextVisit: payload.nextVisit ?? null,
    totalVisits: 0,
    noShowRate: 0,
    status: "active",
    riskLevel: payload.riskLevel ?? "low",
  }
  patientStore.unshift(patient)
  return patient
}

export function listAppointments() {
  return appointmentStore
}

export function addAppointment(
  payload: Pick<PlatformAppointment, "time" | "endTime" | "type" | "notes"> & {
    patient: PlatformAppointment["patient"]
    status?: PlatformAppointment["status"]
    risk?: number
  }
) {
  const nextId = appointmentStore.length ? Math.max(...appointmentStore.map((a) => a.id)) + 1 : 1
  const appointment: PlatformAppointment = {
    id: nextId,
    time: payload.time,
    endTime: payload.endTime,
    patient: payload.patient,
    type: payload.type,
    notes: payload.notes,
    status: payload.status ?? "pending",
    risk: payload.risk ?? 35,
  }
  appointmentStore.push(appointment)
  return appointment
}

