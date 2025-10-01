"use client"

import { Shield, ShieldAlert } from "lucide-react"
import { useIdleTimer } from "@/components/providers/idle-timer-provider"
import { cn } from "@/lib/utils"

export function IdleTimer() {
  const { timeLeft, isActive } = useIdleTimer()

  const formatTime = (ms: number) => {
    const totalSeconds = Math.ceil(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (!isActive) {
    return null
  }

  const isWarning = timeLeft <= 60000 // Less than 1 minute

  return (
    <div
      className={cn(
        "flex items-center gap-2 font-mono text-sm pointer-events-none select-none",
        isWarning && "animate-pulse"
      )}
    >
      {isWarning ? (
        <ShieldAlert size={16} className="text-yellow-500" />
      ) : (
        <Shield size={16} />
      )}
      <span>{formatTime(timeLeft)}</span>
    </div>
  )
}
