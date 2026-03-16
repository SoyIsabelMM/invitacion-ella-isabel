"use client"

import { AlertTriangle, Sparkles, Clock, Shirt } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function SpecialNotes() {
  return (
    <section className="space-y-4">
      {/* Important note - punctuality */}
      <Card className="border-2 border-accent/50 bg-accent/10 overflow-hidden glow-pink">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center bg-accent/20 border-2 border-accent/50">
              <AlertTriangle className="w-6 h-6 text-accent" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/20 px-2 py-0.5 rounded">
                  ¡IMPORTANTE!
                </span>
              </div>
              <p className="text-foreground font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                Se agradece puntualidad, son 3 horas de salón
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Fun note - costumes - HIGHLIGHTED as key party feature */}
      <Card className="border-2 border-primary/60 bg-gradient-to-r from-primary/20 via-accent/10 to-secondary/20 overflow-hidden glow-gold animate-pulse-glow">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary animate-twinkle" />
              <div className="w-14 h-14 rounded-full flex items-center justify-center gradient-gold border-2 border-primary/50">
                <Shirt className="w-7 h-7 text-primary-foreground" />
              </div>
              <Sparkles className="w-6 h-6 text-accent animate-twinkle" style={{ animationDelay: "0.3s" }} />
            </div>
            <div className="space-y-2">
              <span className="inline-block text-sm font-black uppercase tracking-widest text-primary bg-primary/20 px-4 py-1.5 rounded-full border border-primary/30">
                K-POP DRESS CODE
              </span>
              <p className="text-xl font-bold text-foreground text-glow-gold">
                ¡Los niños pueden ir disfrazados!
              </p>
              <p className="text-sm text-muted-foreground">
                Ven como tu idol favorito de Huntrix
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
