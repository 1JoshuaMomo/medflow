import { NextRequest, NextResponse } from "next/server"

type AssistantAction = { label: string; action: string }

function generateAssistantReply(prompt: string): { content: string; actions?: AssistantAction[] } {
  const normalized = prompt.toLowerCase().trim()

  if (normalized.includes("high-risk") || normalized.includes("no-show")) {
    return {
      content:
        "Detected 3 high-risk appointments for the next 24 hours. I recommend sending SMS and email reminders now, then enabling automated waitlist refill for at-risk slots.",
      actions: [
        { label: "Send Reminders", action: "send_reminders" },
        { label: "Enable Waitlist Refill", action: "enable_waitlist_refill" },
      ],
    }
  }

  if (normalized.includes("revenue")) {
    return {
      content:
        "Revenue momentum is positive. You can recover an estimated $620 this week by auto-filling cancellations and prioritizing reminder campaigns for afternoon slots.",
      actions: [
        { label: "Open Revenue Dashboard", action: "open_revenue" },
        { label: "Apply Recovery Plan", action: "apply_recovery" },
      ],
    }
  }

  if (normalized.includes("optimiz")) {
    return {
      content:
        "Optimization plan prepared: group similar procedures, reserve a 15-minute buffer for complex visits, and move high-probability no-shows into smart confirmation flow.",
      actions: [
        { label: "Preview Plan", action: "preview_plan" },
        { label: "Apply Optimization", action: "apply_optimization" },
      ],
    }
  }

  return {
    content:
      "I can help with clinic growth, no-show prevention, scheduling optimization, and revenue recovery. Ask me for a specific action and I will generate a guided plan.",
    actions: [
      { label: "Analyze Revenue", action: "analyze_revenue" },
      { label: "Analyze No-Show Risk", action: "analyze_noshow" },
    ],
  }
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { prompt?: string }
  const prompt = body.prompt?.trim()

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 })
  }

  const reply = generateAssistantReply(prompt)
  return NextResponse.json({
    ...reply,
    timestamp: new Date().toISOString(),
  })
}
