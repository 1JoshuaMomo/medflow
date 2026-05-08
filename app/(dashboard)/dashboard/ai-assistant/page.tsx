"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bot,
  User,
  Send,
  Sparkles,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Clock,
  RefreshCw,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  actions?: { label: string; action: string }[]
}

const suggestedPrompts = [
  { icon: Calendar, label: "Show today's high-risk appointments" },
  { icon: TrendingUp, label: "How can I increase revenue this week?" },
  { icon: AlertTriangle, label: "Which patients need reminders?" },
  { icon: Lightbulb, label: "Suggest schedule optimizations" },
]

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello Dr. Doe! I'm your AI assistant, ready to help you optimize your clinic operations. I can help you with appointment management, no-show predictions, revenue insights, and automated actions. How can I assist you today?",
    timestamp: new Date(),
  },
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const messageIdRef = useRef(initialMessages.length + 1)

  const nextMessageId = () => {
    const id = messageIdRef.current
    messageIdRef.current += 1
    return id.toString()
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: nextMessageId(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      const response = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: content }),
      })

      if (!response.ok) {
        throw new Error("AI service is currently unavailable.")
      }

      const payload = (await response.json()) as {
        content: string
        actions?: { label: string; action: string }[]
        timestamp?: string
      }

      const assistantMessage: Message = {
        id: nextMessageId(),
        role: "assistant",
        content: payload.content,
        timestamp: payload.timestamp ? new Date(payload.timestamp) : new Date(),
        actions: payload.actions,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const fallbackMessage: Message = {
        id: nextMessageId(),
        role: "assistant",
        content:
          "I could not reach the AI endpoint right now. Please retry in a moment, or continue with dashboard insights while the service reconnects.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, fallbackMessage])
      console.error(error)
    } finally {
      setIsTyping(false)
    }
  }

  const handlePromptClick = (prompt: string) => {
    handleSend(prompt)
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-6 animate-fade-in">
      <div className="lg:hidden grid sm:grid-cols-2 gap-2">
        {suggestedPrompts.map((prompt) => {
          const Icon = prompt.icon
          return (
            <button
              key={prompt.label}
              onClick={() => handlePromptClick(prompt.label)}
              className="w-full flex items-center gap-2 p-3 rounded-lg bg-secondary/40 hover:bg-secondary/60 transition-colors text-left text-xs sm:text-sm"
            >
              <Icon className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">{prompt.label}</span>
            </button>
          )
        })}
      </div>
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 min-h-[60vh] flex flex-col overflow-hidden">
          {/* Chat Header */}
          <CardHeader className="flex flex-row items-center gap-3 border-b">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center glow-sm">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">MedFlow AI Assistant</CardTitle>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                Online - Powered by GPT-5
              </p>
            </div>
          </CardHeader>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${message.role === "user" ? "order-first" : ""}`}>
                    <div
                      className={`p-4 rounded-2xl ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-secondary rounded-bl-none"
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    </div>
                    {message.actions && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs hover:bg-primary/10 hover:border-primary/50"
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground mt-1 px-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
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
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-secondary p-4 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend(input)
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your clinic..."
                className="flex-1"
              />
              <Button type="submit" className="glow-sm hover:glow transition-all" disabled={isTyping}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:block w-80 shrink-0 space-y-6">
        {/* Quick Prompts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {suggestedPrompts.map((prompt, index) => {
              const Icon = prompt.icon
              return (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt.label)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors text-left text-sm"
                >
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{prompt.label}</span>
                </button>
              )
            })}
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium">Revenue Opportunity</span>
              </div>
              <p className="text-xs text-muted-foreground">
                3 empty slots detected. AI can help fill $450 in potential revenue.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">High-Risk Alert</span>
              </div>
              <p className="text-xs text-muted-foreground">
                2 patients with 70%+ no-show probability tomorrow.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Optimization Ready</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Schedule optimization could improve efficiency by 15%.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Recent AI Activity</CardTitle>
            <Button variant="ghost" size="icon" className="w-6 h-6">
              <RefreshCw className="w-3 h-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              {[
                { action: "Sent reminder", patient: "Michael Chen", time: "2m ago" },
                { action: "Filled slot", patient: "New patient", time: "15m ago" },
                { action: "Predicted risk", patient: "3 patients", time: "1h ago" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{item.action}</div>
                    <div className="text-xs text-muted-foreground">{item.patient}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
