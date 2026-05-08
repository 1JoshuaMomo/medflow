"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypingAnimationProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
}

export function TypingAnimation({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className,
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentText = texts[currentIndex]

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseDuration)
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting) {
      if (displayText === "") {
        const resetTimeout = setTimeout(() => {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }, 0)
        return () => clearTimeout(resetTimeout)
      } else {
        const deleteTimeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1))
        }, deletingSpeed)
        return () => clearTimeout(deleteTimeout)
      }
    } else {
      if (displayText === currentText) {
        const pauseStartTimeout = setTimeout(() => {
          setIsPaused(true)
        }, 0)
        return () => clearTimeout(pauseStartTimeout)
      } else {
        const typeTimeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(typeTimeout)
      }
    }
  }, [displayText, currentIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={cn("inline-flex items-center", className)}>
      {displayText}
      <span className="ml-1 inline-block w-[3px] h-[1em] bg-primary animate-blink" />
    </span>
  )
}
