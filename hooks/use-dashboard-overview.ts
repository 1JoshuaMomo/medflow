"use client"

import { useCallback, useEffect, useState } from "react"
import type { DashboardOverview } from "@/lib/dashboard-data"

export function useDashboardOverview() {
  const [data, setData] = useState<DashboardOverview | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOverview = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/dashboard/overview", { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Unable to load dashboard data.")
      }
      const payload = (await response.json()) as DashboardOverview
      setData(payload)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error while loading dashboard.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchOverview()
  }, [fetchOverview])

  return { data, isLoading, error, refresh: fetchOverview }
}
