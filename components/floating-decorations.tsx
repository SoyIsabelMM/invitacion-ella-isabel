"use client"

import { Star, Music, Sparkles, Heart } from "lucide-react"

export function FloatingDecorations() {
  const decorations = [
    { Icon: Star, className: "top-[10%] left-[5%] text-primary", delay: "0s", size: "w-4 h-4" },
    { Icon: Music, className: "top-[15%] right-[8%] text-accent", delay: "0.5s", size: "w-5 h-5" },
    { Icon: Sparkles, className: "top-[25%] left-[12%] text-secondary", delay: "1s", size: "w-3 h-3" },
    { Icon: Star, className: "top-[35%] right-[15%] text-primary", delay: "1.5s", size: "w-4 h-4" },
    { Icon: Heart, className: "top-[45%] left-[8%] text-accent", delay: "2s", size: "w-3 h-3" },
    { Icon: Music, className: "top-[55%] right-[5%] text-primary", delay: "0.3s", size: "w-4 h-4" },
    { Icon: Sparkles, className: "top-[65%] left-[15%] text-accent", delay: "0.8s", size: "w-5 h-5" },
    { Icon: Star, className: "top-[75%] right-[10%] text-secondary", delay: "1.3s", size: "w-3 h-3" },
    { Icon: Heart, className: "top-[85%] left-[10%] text-primary", delay: "1.8s", size: "w-4 h-4" },
    { Icon: Music, className: "top-[20%] left-[90%] text-accent", delay: "0.2s", size: "w-3 h-3" },
    { Icon: Star, className: "top-[40%] left-[3%] text-secondary", delay: "0.7s", size: "w-5 h-5" },
    { Icon: Sparkles, className: "top-[60%] right-[3%] text-primary", delay: "1.2s", size: "w-4 h-4" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {decorations.map((decoration, index) => {
        const { Icon, className, delay, size } = decoration
        return (
          <div
            key={index}
            className={`absolute ${className} animate-float opacity-30`}
            style={{ animationDelay: delay }}
          >
            <Icon className={size} />
          </div>
        )
      })}
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
    </div>
  )
}
