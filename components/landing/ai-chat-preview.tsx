"use client"

import { useState, useEffect } from "react"
import { Bot, User, Sparkles, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

const chatMessages = [
  {
    role: "user",
    content: "Book me an appointment for tomorrow morning",
  },
  {
    role: "assistant",
    content: "I found 3 available slots for tomorrow morning. Dr. Smith has openings at 9:00 AM, 10:30 AM, and 11:00 AM. Which time works best for you?",
    typing: true,
  },
  {
    role: "user",
    content: "9:00 AM please",
  },
  {
    role: "assistant",
    content: "Perfect! I&apos;ve booked your appointment with Dr. Smith for tomorrow at 9:00 AM. You'll receive a confirmation SMS shortly. Is there anything else I can help with?",
    typing: true,
  },
]

const suggestedPrompts = [
  "Show risky appointments",
  "How can I increase revenue?",
  "Optimize my schedule",
  "Send reminders to high-risk patients",
]

export function AIChatPreview() {
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (visibleMessages < chatMessages.length) {
      const timeout = setTimeout(() => {
        const nextMessage = chatMessages[visibleMessages]
        if (nextMessage.role === "assistant") {
          setIsTyping(true)
          setTimeout(() => {
            setIsTyping(false)
            setVisibleMessages((prev) => prev + 1)
          }, 1500)
        } else {
          setVisibleMessages((prev) => prev + 1)
        }
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [visibleMessages])

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Powered by GPT-5</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
              Your AI Receptionist
              <br />
              <span className="gradient-text">Never Sleeps</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 text-balance">
              Patients can book appointments, reschedule, and ask questions 24/7. 
              Our AI handles it all with human-like conversation and instant action.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Natural language booking and rescheduling",
                "Instant answers to clinic questions",
                "Smart follow-ups for high-risk appointments",
                "Seamless handoff to human staff when needed",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Suggested Prompts */}
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <div
                  key={prompt}
                  className="px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm hover:border-primary/50 transition-colors cursor-pointer"
                >
                  {prompt}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Preview */}
          <div className="order-1 lg:order-2">
            <div className="relative max-w-md mx-auto">
              {/* Chat Window */}
              <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-2xl">
                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-secondary/30">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center glow-sm">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">MedFlow AI</div>
                    <div className="text-xs text-green-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      Online
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-4 space-y-4 min-h-[400px] max-h-[400px] overflow-y-auto">
                  {chatMessages.slice(0, visibleMessages).map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""} animate-fade-in`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "bg-secondary rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-3 animate-fade-in">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-secondary p-3 rounded-2xl rounded-bl-none">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-100" />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-200" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 rounded-full bg-secondary border border-border text-sm focus:outline-none focus:border-primary/50"
                    />
                    <Button size="icon" className="rounded-full glow-sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-10 bg-primary/10 blur-[80px] -z-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
