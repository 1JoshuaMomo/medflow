import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "medflow-platform",
    timestamp: new Date().toISOString(),
    uptimeHint: "healthy",
  })
}
