import { NextResponse } from "next/server"
import { createDashboardOverview } from "@/lib/dashboard-data"

export async function GET() {
  const data = createDashboardOverview()
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  })
}
