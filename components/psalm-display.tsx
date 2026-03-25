"use client"

import { useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, Check, Copy, CheckCheck, Maximize2, Minimize2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Chapter, DaySchedule, Verse } from "@/lib/types"

interface PsalmDisplayProps {
  chapters: Chapter[]
  schedule: DaySchedule
  onMarkAsRead: (chapter: number) => void
  readChapters: number[]
}

interface CopiedState {
  chapter: number
  verse: number
}

export function PsalmDisplay({ chapters, schedule, onMarkAsRead, readChapters }: PsalmDisplayProps) {
  const filteredChapters = chapters.filter(
    (ch) => ch.chapter >= schedule.startChapter && ch.chapter <= schedule.endChapter
  )
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [copiedVerse, setCopiedVerse] = useState<CopiedState | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const currentChapter = filteredChapters[currentIndex]

  const copyVerse = useCallback(async (chapter: number, verse: Verse) => {
    const textToCopy = `መዝሙር ${chapter}:${verse.verse} - ${verse.text}`
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopiedVerse({ chapter, verse: verse.verse })
      setTimeout(() => setCopiedVerse(null), 2000)
    } catch (err) {
      console.error("Failed to copy verse:", err)
    }
  }, [])
  
  if (!currentChapter) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-muted-foreground">No psalms available for this selection.</p>
      </div>
    )
  }

  const isRead = readChapters.includes(currentChapter.chapter)
  const totalVerses = currentChapter.sections.reduce((acc, s) => acc + s.verses.length, 0)

  // Fullscreen mode
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-background">
        {/* Fullscreen Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-foreground">
              መዝሙር {currentChapter.chapter}
            </h2>
            <span className="text-sm text-muted-foreground">
              Psalm {currentChapter.chapter}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(false)}
              className="h-10 w-10 rounded-full"
              aria-label="Exit fullscreen"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Fullscreen Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-2xl">
            {currentChapter.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8 last:mb-0">
                {section.title && (
                  <h3 className="mb-4 text-center text-sm font-medium italic text-muted-foreground">
                    {section.title}
                  </h3>
                )}
                <div className="space-y-4">
                  {section.verses.map((verse) => {
                    const isCopied = copiedVerse?.chapter === currentChapter.chapter && copiedVerse?.verse === verse.verse
                    return (
                      <button
                        key={verse.verse}
                        onClick={() => copyVerse(currentChapter.chapter, verse)}
                        className={cn(
                          "group w-full cursor-pointer rounded-lg p-3 text-left transition-all hover:bg-muted/50",
                          isCopied && "bg-primary/10"
                        )}
                        aria-label={`Copy Psalm ${currentChapter.chapter}:${verse.verse}`}
                      >
                        <p className="leading-relaxed text-foreground">
                          <span className="mr-2 inline-block min-w-[2rem] text-base font-semibold text-primary">
                            {verse.verse}
                          </span>
                          <span className="text-xl">{verse.text}</span>
                        </p>
                        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                          {isCopied ? (
                            <>
                              <CheckCheck className="h-3 w-3 text-primary" />
                              <span className="text-primary">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Click to copy</span>
                            </>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fullscreen Footer Navigation */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {filteredChapters.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentIndex(Math.min(filteredChapters.length - 1, currentIndex + 1))}
            disabled={currentIndex === filteredChapters.length - 1}
            className="gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Chapter Navigation */}
      <div className="flex items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="h-10 w-10 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex flex-col items-center">
          <span className="text-sm text-muted-foreground">
            Chapter {currentIndex + 1} of {filteredChapters.length}
          </span>
          <h2 className="text-2xl font-bold text-foreground">
            መዝሙር {currentChapter.chapter}
          </h2>
          <span className="text-sm text-muted-foreground">
            Psalm {currentChapter.chapter}
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentIndex(Math.min(filteredChapters.length - 1, currentIndex + 1))}
          disabled={currentIndex === filteredChapters.length - 1}
          className="h-10 w-10 rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="px-4">
        <div className="flex gap-1">
          {filteredChapters.map((ch, idx) => (
            <button
              key={ch.chapter}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all",
                idx === currentIndex ? "bg-primary" : 
                readChapters.includes(ch.chapter) ? "bg-primary/40" : "bg-muted"
              )}
              aria-label={`Go to Psalm ${ch.chapter}`}
            />
          ))}
        </div>
      </div>

      {/* Psalm Content */}
      <div className="px-4">
        {/* Fullscreen Toggle */}
        <div className="mb-3 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(true)}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Maximize2 className="h-4 w-4" />
            <span className="hidden sm:inline">Fullscreen</span>
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="mb-4 text-center text-xs text-muted-foreground">
            Tap any verse to copy it
          </p>
          {currentChapter.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8 last:mb-0">
              {section.title && (
                <h3 className="mb-4 text-center text-sm font-medium italic text-muted-foreground">
                  {section.title}
                </h3>
              )}
              <div className="space-y-2">
                {section.verses.map((verse) => {
                  const isCopied = copiedVerse?.chapter === currentChapter.chapter && copiedVerse?.verse === verse.verse
                  return (
                    <button
                      key={verse.verse}
                      onClick={() => copyVerse(currentChapter.chapter, verse)}
                      className={cn(
                        "group w-full cursor-pointer rounded-lg p-2 text-left transition-all hover:bg-muted/50",
                        isCopied && "bg-primary/10"
                      )}
                      aria-label={`Copy Psalm ${currentChapter.chapter}:${verse.verse}`}
                    >
                      <p className="leading-relaxed text-foreground">
                        <span className="mr-2 inline-block min-w-[1.5rem] text-sm font-semibold text-primary">
                          {verse.verse}
                        </span>
                        <span className="text-lg">{verse.text}</span>
                        {isCopied && (
                          <span className="ml-2 inline-flex items-center gap-1 text-xs text-primary">
                            <CheckCheck className="h-3 w-3" />
                            Copied!
                          </span>
                        )}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col items-center gap-4 px-4 pb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{totalVerses} verses</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
          <span>~{Math.ceil(totalVerses * 0.3)} min read</span>
        </div>
        
        <Button
          onClick={() => onMarkAsRead(currentChapter.chapter)}
          variant={isRead ? "secondary" : "default"}
          className={cn(
            "gap-2 rounded-full px-6",
            isRead && "bg-primary/10 text-primary hover:bg-primary/20"
          )}
        >
          {isRead ? (
            <>
              <Check className="h-4 w-4" />
              Completed
            </>
          ) : (
            "Mark as Read"
          )}
        </Button>

        {/* Quick Jump */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {filteredChapters.map((ch, idx) => (
            <button
              key={ch.chapter}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all",
                idx === currentIndex 
                  ? "bg-primary text-primary-foreground" 
                  : readChapters.includes(ch.chapter)
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {ch.chapter}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
