"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const targetDate = new Date("2026-04-19T16:30:00").getTime()

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return (
      <section>
        <Card className="glassmorphism border-glow overflow-hidden">
          <CardContent className="p-6">
            <div className="h-24 animate-pulse bg-muted/20 rounded-lg" />
          </CardContent>
        </Card>
      </section>
    )
  }

  const timeUnits = [
    { value: timeLeft.days, label: "Días" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Minutos" },
    { value: timeLeft.seconds, label: "Segundos" },
  ]

  return (
    <section>
      <Card className="glassmorphism border-glow overflow-hidden animate-pulse-glow">
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-bold text-accent tracking-wider uppercase">
              Cuenta Regresiva
            </h3>
            <Clock className="w-5 h-5 text-accent" />
          </div>
          
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {timeUnits.map((unit) => (
              <div key={unit.label} className="text-center">
                <div className="relative">
                  <div className="bg-secondary/20 rounded-lg p-3 md:p-4 border border-primary/30">
                    <span className="text-2xl md:text-4xl lg:text-5xl font-black text-primary text-glow-gold font-mono">
                      {String(unit.value).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="absolute -inset-0.5 bg-primary/20 rounded-lg blur-sm -z-10" />
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
                  {unit.label}
                </p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-sm text-accent mt-4 font-semibold">
            19 de Abril, 2026 - 16:30 hrs
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
