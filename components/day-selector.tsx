"use client"

import { cn } from "@/lib/utils"
import { WEEKLY_SCHEDULE, type DaySchedule } from "@/lib/types"

interface DaySelectorProps {
  selectedDay: DaySchedule
  onSelectDay: (day: DaySchedule) => void
  currentDayIndex: number
}

export function DaySelector({ selectedDay, onSelectDay, currentDayIndex }: DaySelectorProps) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex gap-2 min-w-max px-4 md:justify-center md:px-0">
        {WEEKLY_SCHEDULE.map((schedule, index) => {
          const isSelected = selectedDay.day === schedule.day
          const isToday = index === currentDayIndex
          
          return (
            <button
              key={schedule.day}
              onClick={() => onSelectDay(schedule)}
              className={cn(
                "relative flex flex-col items-center gap-1 rounded-lg px-4 py-3 transition-all duration-200",
                "border border-transparent",
                "hover:bg-secondary/80",
                isSelected && "bg-primary text-primary-foreground border-primary shadow-md",
                !isSelected && "bg-card text-card-foreground",
                isToday && !isSelected && "ring-2 ring-primary/30"
              )}
            >
              <span className={cn(
                "text-xs font-medium uppercase tracking-wide",
                isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
              )}>
                {schedule.day.slice(0, 3)}
              </span>
              <span className={cn(
                "text-sm font-semibold",
                isSelected ? "text-primary-foreground" : "text-foreground"
              )}>
                {schedule.dayAmharic}
              </span>
              <span className={cn(
                "text-[10px]",
                isSelected ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                {schedule.startChapter}-{schedule.endChapter}
              </span>
              {isToday && (
                <span className={cn(
                  "absolute -top-1 -right-1 h-2 w-2 rounded-full",
                  isSelected ? "bg-primary-foreground" : "bg-primary"
                )} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
