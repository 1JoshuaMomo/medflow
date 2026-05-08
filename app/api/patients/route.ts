import { NextResponse } from "next/server"
import { addPatient, listPatients } from "@/lib/platform-data"

export async function GET() {
  const patients = listPatients()
  return NextResponse.json({
    data: patients,
    total: patients.length,
  })
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string
    email?: string
    phone?: string
    nextVisit?: string | null
    riskLevel?: "low" | "medium" | "high"
  }

  if (!body.name || !body.email || !body.phone) {
    return NextResponse.json({ error: "name, email, and phone are required" }, { status: 400 })
  }

  const created = addPatient({
    name: body.name,
    email: body.email,
    phone: body.phone,
    nextVisit: body.nextVisit,
    riskLevel: body.riskLevel,
  })

  return NextResponse.json({ data: created }, { status: 201 })
}
