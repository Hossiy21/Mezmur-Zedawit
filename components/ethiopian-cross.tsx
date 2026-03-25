"use client"

import { cn } from "@/lib/utils"

interface EthiopianCrossProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function EthiopianCross({ className, size = "md" }: EthiopianCrossProps) {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16"
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(sizes[size], "text-primary", className)}
      fill="currentColor"
    >
      {/* Ethiopian Orthodox Cross - simplified geometric pattern */}
      <path d="M45 5h10v20h20v10h-20v20h20v10h-20v20h-10v-20h-20v-10h20v-20h-20v-10h20v-20z" />
      <circle cx="50" cy="15" r="4" />
      <circle cx="50" cy="85" r="4" />
      <circle cx="15" cy="50" r="4" />
      <circle cx="85" cy="50" r="4" />
      <circle cx="25" cy="25" r="3" />
      <circle cx="75" cy="25" r="3" />
      <circle cx="25" cy="75" r="3" />
      <circle cx="75" cy="75" r="3" />
    </svg>
  )
}
