"use client"

import { Shirt, Footprints, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function GiftInfo() {
  return (
    <section>
      <Card className="glassmorphism border-glow overflow-hidden">
        <CardHeader className="text-center border-b border-primary/30 pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-5 h-5 text-primary fill-primary/50" />
            <CardTitle className="text-xl text-primary tracking-wider">
              BIRTHDAY GIRL DATA
            </CardTitle>
            <Star className="w-5 h-5 text-primary fill-primary/50" />
          </div>
          <p className="text-sm text-muted-foreground">Información para regalos</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center bg-secondary/20 border-2 border-secondary/50 group-hover:glow-blue transition-all duration-300">
                <Shirt className="w-8 h-8 text-secondary" />
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Talla de Ropa</p>
              <p className="text-3xl font-bold text-foreground">8</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center bg-accent/20 border-2 border-accent/50 group-hover:glow-pink transition-all duration-300">
                <Footprints className="w-8 h-8 text-accent" />
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Talla de Zapato</p>
              <p className="text-3xl font-bold text-foreground">32</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
