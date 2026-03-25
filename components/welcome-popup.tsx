"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { EthiopianCross } from "@/components/ethiopian-cross"

const WELCOME_SHOWN_KEY = "mezmure-dawit-welcome-shown"

export function WelcomePopup() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check if welcome has been shown before
    const hasShownWelcome = localStorage.getItem(WELCOME_SHOWN_KEY)
    
    if (!hasShownWelcome) {
      // Show welcome popup on first visit
      setOpen(true)
      // Mark as shown
      localStorage.setItem(WELCOME_SHOWN_KEY, "true")
    }
  }, [])

  if (!mounted) return null

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <EthiopianCross size="lg" className="text-primary/80" />
          </div>
          <DialogTitle className="text-2xl">
            Welcome to Mezmure Dawit
          </DialogTitle>
          <DialogDescription className="mt-2 text-base">
            Daily Psalm Reading Companion
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Mezmure Dawit (መዝሙረ ዳዊት) is a daily psalm reading application inspired by the Ethiopian Orthodox Church tradition.
          </p>
          
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">
              What you can do:
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Follow a structured weekly reading schedule</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Track your reading progress and build streaks</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Engage with timeless wisdom of the Psalms</span>
              </li>
            </ul>
          </div>

          <p className="text-xs text-muted-foreground italic">
           ስብሐት ለእግዚአብሔር ወለወላዲቱ ድንግል ወለመስቀሉ ክቡር አሜን!

          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Get Started
          </Button>
          <Link href="/about" className="flex-1">
            <Button
              variant="default"
              onClick={handleClose}
              className="w-full"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
