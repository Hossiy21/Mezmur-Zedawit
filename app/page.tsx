"use client"

import { useState, useEffect, useCallback } from "react"
import { Header } from "@/components/header"
import { DaySelector } from "@/components/day-selector"
import { PsalmDisplay } from "@/components/psalm-display"
import { ReadingStreak } from "@/components/reading-streak"
import { EthiopianCross } from "@/components/ethiopian-cross"
import { WelcomePopup } from "@/components/welcome-popup"
import { getTodaySchedule, WEEKLY_SCHEDULE, type DaySchedule, type PsalmsData } from "@/lib/types"
import psalmsData from "@/data/psalms.json"

const STORAGE_KEY = "mezmure-dawit-progress"

interface ReadingProgress {
  readChapters: number[]
  lastReadDate: string
  streak: number
}

function getStoredProgress(): ReadingProgress {
  if (typeof window === "undefined") {
    return { readChapters: [], lastReadDate: "", streak: 0 }
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // Ignore parsing errors
  }
  return { readChapters: [], lastReadDate: "", streak: 0 }
}

function saveProgress(progress: ReadingProgress) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

function getTodayString(): string {
  return new Date().toISOString().split("T")[0]
}

function getCurrentDayIndex(): number {
  const dayOfWeek = new Date().getDay()
  // Convert JS day (0=Sun) to our schedule index (0=Mon, 6=Sun)
  return dayOfWeek === 0 ? 6 : dayOfWeek - 1
}

export default function PsalmsPage() {
  const [selectedDay, setSelectedDay] = useState<DaySchedule>(getTodaySchedule())
  const [readChapters, setReadChapters] = useState<number[]>([])
  const [streak, setStreak] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [reloaded, setReloaded] = useState(false)
  const [showReloadNotice, setShowReloadNotice] = useState(true)
  const [firstVisit, setFirstVisit] = useState(false)
  const currentDayIndex = getCurrentDayIndex()

  const data = psalmsData as PsalmsData

  // Load progress from localStorage on mount
  useEffect(() => {
    setMounted(true)
    try {
      const navEntries = (performance.getEntriesByType &&
        performance.getEntriesByType('navigation')) as PerformanceNavigationTiming[]
      const navType = navEntries && navEntries[0] && (navEntries[0] as any).type
      // fallback for older browsers
      const isReload = navType === 'reload' || (performance as any).navigation?.type === 1
      if (isReload) {
        setReloaded(true)
      }
    } catch {
      // ignore
    }
    try {
      const seen = localStorage.getItem('mezmure-first-visit')
      if (!seen) {
        setFirstVisit(true)
        setShowReloadNotice(true)
        localStorage.setItem('mezmure-first-visit', '1')
      }
    } catch {}
    const progress = getStoredProgress()
    const today = getTodayString()
    
    // Check if streak should be reset (missed a day)
    if (progress.lastReadDate) {
      const lastDate = new Date(progress.lastReadDate)
      const todayDate = new Date(today)
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
      
      if (diffDays > 1) {
        // Reset streak if more than 1 day passed
        progress.streak = 0
        saveProgress(progress)
      }
    }
    
    setReadChapters(progress.readChapters)
    setStreak(progress.streak)
  }, [])

  const handleMarkAsRead = useCallback((chapter: number) => {
    const progress = getStoredProgress()
    const today = getTodayString()
    
    if (progress.readChapters.includes(chapter)) {
      // Remove from read list
      progress.readChapters = progress.readChapters.filter((ch) => ch !== chapter)
    } else {
      // Add to read list
      progress.readChapters.push(chapter)
      
      // Update streak if this is a new day
      if (progress.lastReadDate !== today) {
        const lastDate = progress.lastReadDate ? new Date(progress.lastReadDate) : null
        const todayDate = new Date(today)
        
        if (lastDate) {
          const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
          if (diffDays === 1) {
            progress.streak += 1
          } else if (diffDays > 1) {
            progress.streak = 1
          }
        } else {
          progress.streak = 1
        }
        progress.lastReadDate = today
      }
    }
    
    saveProgress(progress)
    setReadChapters([...progress.readChapters])
    setStreak(progress.streak)
  }, [])

  // Check if today's psalms are completed
  const todaySchedule = getTodaySchedule()
  const todayChapters = data.chapters
    .filter((ch) => ch.chapter >= todaySchedule.startChapter && ch.chapter <= todaySchedule.endChapter)
    .map((ch) => ch.chapter)
  const todayCompleted = todayChapters.length > 0 && todayChapters.some((ch) => readChapters.includes(ch))

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <EthiopianCross size="lg" className="animate-pulse text-primary/50" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WelcomePopup />
      
      <main className="container mx-auto max-w-2xl py-6">
        {(firstVisit || reloaded) && showReloadNotice && (
          <div className="mb-4 rounded-md border border-border bg-card p-4 text-sm text-foreground">
            <div className="flex items-start justify-between gap-4">
              <div>
                <strong>ማስታወቂያ:</strong> ገፁ ተዳግመዋል።
              </div>
              <button
                className="ml-4 rounded bg-transparent px-2 py-1 text-xs underline"
                onClick={() => setShowReloadNotice(false)}
              >
                ዝጋ
              </button>
            </div>
          </div>
        )}
        {/* Hero Section */}
        <div className="mb-8 flex flex-col items-center gap-4 px-4 text-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              የዕለቱ መዝሙረ ዳዊት
            </h2>
            <p className="mt-2 text-muted-foreground">
              Take a moment to nourish your soul with the timeless wisdom of David
            </p>
          </div>
        </div>

        {/* Reading Streak */}
        <div className="mb-8">
          <ReadingStreak 
            streak={streak} 
            totalRead={readChapters.length}
            todayCompleted={todayCompleted}
          />
        </div>

        {/* Day Selector */}
        <div className="mb-8">
          <DaySelector
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
            currentDayIndex={currentDayIndex}
          />
        </div>

        {/* Psalm Display */}
        <PsalmDisplay
          chapters={data.chapters}
          schedule={selectedDay}
          onMarkAsRead={handleMarkAsRead}
          readChapters={readChapters}
        />

        {/* Footer */}
        <footer className="mt-12 border-t border-border py-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">
              ስብሐት ለእግዚአብሔር ወለወላዲቱ ድንግል ወለመስቀሉ ክቡር አሜን!
            </p>
            
          </div>
        </footer>
      </main>
    </div>
  )
}
