"use client"

import { useRouter } from "next/navigation"
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"

interface IdleTimerContextType {
  timeLeft: number
  isActive: boolean
  resetTimer: () => void
  pauseTimer: () => void
  resumeTimer: () => void
}

const IdleTimerContext = createContext<IdleTimerContextType | null>(null)

export const useIdleTimer = () => {
  const context = useContext(IdleTimerContext)
  if (!context) {
    throw new Error("useIdleTimer must be used within an IdleTimerProvider")
  }
  return context
}

interface IdleTimerProviderProps {
  children: ReactNode
  timeout?: number
  warningTime?: number
  checkInterval?: number
}

export function IdleTimerProvider({
  children,
  timeout = 5 * 60 * 1000, // 5 minutes
  warningTime = 1 * 60 * 1000, // 1 minute
  checkInterval = 1000, // 1 second
}: IdleTimerProviderProps) {
  const [timeLeft, setTimeLeft] = useState(timeout)
  const [isActive, setIsActive] = useState(true)
  const [showWarning, setShowWarning] = useState(false)

  const router = useRouter()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastActivityRef = useRef<number>(Date.now())

  // Events that should reset the timer
  const events = [
    "mousedown",
    "mousemove",
    "keypress",
    "scroll",
    "touchstart",
    "click",
  ]

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now()
    setTimeLeft(timeout)
    setShowWarning(false)
    if (!isActive) {
      setIsActive(true)
    }
  }, [timeout, isActive])

  const pauseTimer = useCallback(() => {
    setIsActive(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const resumeTimer = useCallback(() => {
    setIsActive(true)
  }, [])

  const handleLogout = useCallback(async () => {
    try {
      await authClient.signOut()
      toast.success("You have been automatically logged out due to inactivity")
      router.push("/signin")
    } catch (error) {
      console.error("Sign out error:", error)
      toast.error("An unknown error occurred during sign out")
    }
  }, [router])

  const startTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      const now = Date.now()
      const timeSinceLastActivity = now - lastActivityRef.current
      const remaining = Math.max(0, timeout - timeSinceLastActivity)

      setTimeLeft(remaining)

      // Show warning when approaching timeout
      if (remaining <= warningTime && remaining > 0 && !showWarning) {
        setShowWarning(true)
        toast.warning(
          `You will be logged out in ${Math.ceil(remaining / 1000)} seconds due to inactivity`,
          {
            duration: 5000,
          }
        )
      }

      // Logout when timeout is reached
      if (remaining === 0) {
        handleLogout()
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }, checkInterval)
  }, [timeout, warningTime, showWarning, handleLogout, checkInterval])

  const handleActivity = useCallback(() => {
    resetTimer()
  }, [resetTimer])

  useEffect(() => {
    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true)
    })

    // Start the timer
    if (isActive) {
      startTimer()
    }

    // Cleanup
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true)
      })
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [isActive, handleActivity, startTimer])

  // Handle visibility change (e.g., tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab became hidden - could pause timer or continue running
        // For banking apps, usually continue running for security
      } else {
        // Tab became visible - reset timer for user activity
        resetTimer()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [resetTimer])

  const contextValue: IdleTimerContextType = {
    timeLeft,
    isActive,
    resetTimer,
    pauseTimer,
    resumeTimer,
  }

  return (
    <IdleTimerContext.Provider value={contextValue}>
      {children}
    </IdleTimerContext.Provider>
  )
}
