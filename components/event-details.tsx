"use client"

import { Calendar, Clock, MapPin, Music } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function EventDetails() {
  const details = [
    {
      icon: Calendar,
      label: "Fecha",
      value: "Domingo 19 de Abril",
      accent: "primary"
    },
    {
      icon: Clock,
      label: "Hora",
      value: "16:30 a 19:30",
      accent: "accent"
    },
    {
      icon: MapPin,
      label: "Lugar",
      value: "Salón de juegos 'Mundo Kids'",
      subvalue: "Pedro León Gallo 706, Centro de Villarrica",
      accent: "secondary"
    }
  ]

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 justify-center">
        <Music className="w-5 h-5 text-primary" />
        <h3 className="text-xl md:text-2xl font-bold text-center text-primary tracking-wider">
          DETALLES DEL EVENTO
        </h3>
        <Music className="w-5 h-5 text-primary" />
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {details.map((detail, index) => {
          const Icon = detail.icon
          const accentClass = detail.accent === "primary" 
            ? "text-primary border-primary/40 glow-gold" 
            : detail.accent === "accent" 
              ? "text-accent border-accent/40 glow-pink" 
              : "text-secondary border-secondary/40 glow-blue"
          
          return (
            <Card 
              key={index}
              className={`glassmorphism border-2 ${accentClass} transition-all duration-300 hover:scale-105`}
            >
              <CardContent className="p-6 text-center space-y-3">
                <div className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center bg-card border ${accentClass}`}>
                  <Icon className={`w-7 h-7 ${detail.accent === "primary" ? "text-primary" : detail.accent === "accent" ? "text-accent" : "text-secondary"}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{detail.label}</p>
                  <p className="font-bold text-foreground text-lg">{detail.value}</p>
                  {detail.subvalue && (
                    <p className="text-sm text-muted-foreground mt-1">{detail.subvalue}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
