"use client"

import { Flame, Calendar, BookMarked } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReadingStreakProps {
  streak: number
  totalRead: number
  todayCompleted: boolean
}

export function ReadingStreak({ streak, totalRead, todayCompleted }: ReadingStreakProps) {
  return (
    <div className="grid grid-cols-3 gap-3 px-4">
      <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4">
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          streak > 0 ? "bg-orange-500/10" : "bg-muted"
        )}>
          <Flame className={cn(
            "h-5 w-5",
            streak > 0 ? "text-orange-500" : "text-muted-foreground"
          )} />
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{streak}</p>
          <p className="text-xs text-muted-foreground">Day Streak</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <BookMarked className="h-5 w-5 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{totalRead}</p>
          <p className="text-xs text-muted-foreground">Psalms Read</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4">
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          todayCompleted ? "bg-green-500/10" : "bg-muted"
        )}>
          <Calendar className={cn(
            "h-5 w-5",
            todayCompleted ? "text-green-500" : "text-muted-foreground"
          )} />
        </div>
        <div className="text-center">
          <p className={cn(
            "text-sm font-semibold",
            todayCompleted ? "text-green-500" : "text-muted-foreground"
          )}>
            {todayCompleted ? "Done" : "Pending"}
          </p>
          <p className="text-xs text-muted-foreground">Today</p>
        </div>
      </div>
    </div>
  )
}
