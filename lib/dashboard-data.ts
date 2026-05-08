export type DashboardStat = {
  title: string
  value: number
  prefix?: string
  change: number
  changeType: "positive" | "negative"
  description: string
  icon: "dollar" | "calendar" | "alert" | "brain"
}

export type Appointment = {
  time: string
  patient: string
  type: string
  status: "confirmed" | "at-risk" | "pending"
}

export type ActivityItem = {
  action: string
  patient: string
  time: string
  type: "reminder" | "recovery" | "booking" | "alert"
}

export type RiskPatient = {
  name: string
  risk: number
  time: string
}

export type DashboardOverview = {
  greetingName: string
  stats: DashboardStat[]
  revenueChartData: number[]
  projectedRevenue: number
  lostRevenue: number
  recoveredRevenue: number
  appointmentsTotal: number
  riskCounts: {
    low: number
    medium: number
    high: number
  }
  highRiskPatients: RiskPatient[]
  upcomingAppointments: Appointment[]
  recentActions: ActivityItem[]
}

const patientNames = [
  "Sarah Johnson",
  "Michael Chen",
  "Emily Davis",
  "James Wilson",
  "Lisa Anderson",
  "Emma White",
  "David Lee",
  "Robert Kim",
]

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(values: T[]): T {
  return values[randomInt(0, values.length - 1)]
}

export function createDashboardOverview(): DashboardOverview {
  const todayRevenue = randomInt(10200, 15900)
  const appointmentsTotal = randomInt(36, 58)
  const atRiskRevenue = randomInt(250, 980)
  const aiRecovered = randomInt(1400, 3100)

  const low = Math.max(0, appointmentsTotal - randomInt(8, 16))
  const medium = randomInt(6, 12)
  const high = Math.max(1, appointmentsTotal - low - medium)

  const chartBaseline = randomInt(26, 40)
  const revenueChartData = Array.from({ length: 12 }, (_, i) =>
    Math.min(100, chartBaseline + i * randomInt(4, 7) + randomInt(-8, 10))
  )

  return {
    greetingName: "Dr. Doe",
    stats: [
      {
        title: "Today's Revenue",
        value: todayRevenue,
        prefix: "$",
        change: randomInt(7, 16),
        changeType: "positive",
        description: "vs. yesterday",
        icon: "dollar",
      },
      {
        title: "Appointments",
        value: appointmentsTotal,
        change: randomInt(3, 12),
        changeType: "positive",
        description: "scheduled today",
        icon: "calendar",
      },
      {
        title: "At Risk Revenue",
        value: atRiskRevenue,
        prefix: "$",
        change: randomInt(1, 7),
        changeType: "negative",
        description: "high-risk slots",
        icon: "alert",
      },
      {
        title: "AI Recovered",
        value: aiRecovered,
        prefix: "$",
        change: randomInt(14, 29),
        changeType: "positive",
        description: "this week",
        icon: "brain",
      },
    ],
    revenueChartData,
    projectedRevenue: todayRevenue + randomInt(1100, 2500),
    lostRevenue: -atRiskRevenue,
    recoveredRevenue: randomInt(450, 900),
    appointmentsTotal,
    riskCounts: { low, medium, high },
    highRiskPatients: Array.from({ length: 3 }, (_, idx) => ({
      name: patientNames[(idx + 1) % patientNames.length],
      risk: randomInt(72, 93),
      time: `${randomInt(9, 4 + 12)}:${pick(["00", "30"])} ${pick(["AM", "PM"])}`,
    })),
    upcomingAppointments: [
      { time: "09:00", patient: "Sarah Johnson", type: "Checkup", status: "confirmed" },
      { time: "09:30", patient: "Michael Chen", type: "Follow-up", status: "at-risk" },
      { time: "10:00", patient: "Emily Davis", type: "Consultation", status: "pending" },
      { time: "10:30", patient: "James Wilson", type: "Procedure", status: "confirmed" },
      { time: "11:00", patient: "Lisa Anderson", type: "Checkup", status: "confirmed" },
    ],
    recentActions: [
      { action: "AI sent reminder", patient: "Michael Chen", time: "2 min ago", type: "reminder" },
      { action: "Slot recovered", patient: "Empty 2:30 PM", time: "15 min ago", type: "recovery" },
      { action: "New booking", patient: "Robert Kim", time: "30 min ago", type: "booking" },
      { action: "Risk detected", patient: "Emma White", time: "1 hour ago", type: "alert" },
    ],
  }
}
