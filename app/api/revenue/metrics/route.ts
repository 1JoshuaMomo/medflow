import { NextResponse } from "next/server"
import { getRevenueMetrics } from "@/lib/platform-data"

export async function GET() {
  return NextResponse.json(getRevenueMetrics())
}
