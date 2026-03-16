"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { CountdownTimer } from "@/components/countdown-timer"
import { EventDetails } from "@/components/event-details"
import { GiftInfo } from "@/components/gift-info"
import { MusicPlayer } from "@/components/music-player"
import { CalendarButton } from "@/components/calendar-button"
import { RSVPForm } from "@/components/rsvp-form"
import { SpecialNotes } from "@/components/special-notes"
import { FloatingDecorations } from "@/components/floating-decorations"

export default function InvitationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FloatingDecorations />
      
      <div className="relative z-10">
        <HeroSection />
        
        <div className="container mx-auto px-4 py-12 space-y-8 max-w-4xl">
          <CountdownTimer />
          <EventDetails />
          <GiftInfo />
          <MusicPlayer />
          <CalendarButton />
          <RSVPForm isSubmitted={isSubmitted} onSubmit={() => setIsSubmitted(true)} />
          <SpecialNotes />
        </div>
        
        {/* Footer */}
        <footer className="text-center py-8 border-t border-primary/20">
          <p className="text-muted-foreground text-sm">
            Con mucho amor para Ella Isabel
          </p>
          <div className="flex justify-center gap-2 mt-2">
            <span className="text-primary">★</span>
            <span className="text-accent">♪</span>
            <span className="text-secondary">✦</span>
          </div>
        </footer>
      </div>
    </main>
  )
}
