import { NextResponse } from "next/server"
import { addAppointment, listAppointments } from "@/lib/platform-data"

export async function GET() {
  const appointments = listAppointments()
  return NextResponse.json({
    data: appointments,
    total: appointments.length,
  })
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    time?: string
    endTime?: string
    type?: string
    notes?: string
    patient?: { name?: string; email?: string; phone?: string }
  }

  if (!body.time || !body.endTime || !body.type || !body.patient?.name || !body.patient?.email || !body.patient?.phone) {
    return NextResponse.json(
      { error: "time, endTime, type, and patient name/email/phone are required" },
      { status: 400 }
    )
  }

  const created = addAppointment({
    time: body.time,
    endTime: body.endTime,
    type: body.type,
    notes: body.notes ?? "",
    patient: {
      name: body.patient.name,
      email: body.patient.email,
      phone: body.patient.phone,
    },
  })

  return NextResponse.json({ data: created }, { status: 201 })
}
