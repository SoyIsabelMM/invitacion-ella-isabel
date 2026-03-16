'use client';

import {
  Shirt,
  Footprints,
  Star,
  Sparkles,
  Baby,
  ShipWheel,
  Music4,
  Book,
  Skull,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
          <p className="text-sm text-muted-foreground">
            Información para regalos
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-8">
          {/* Tallas Principales */}
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center bg-secondary/20 border-2 border-secondary/50 group-hover:glow-blue transition-all duration-300">
                <Shirt className="w-8 h-8 text-secondary" />
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Talla de Ropa
              </p>
              <p className="text-3xl font-bold text-foreground">8</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center bg-accent/20 border-2 border-accent/50 group-hover:glow-pink transition-all duration-300">
                <Footprints className="w-8 h-8 text-accent" />
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Talla de Zapato
              </p>
              <p className="text-3xl font-bold text-foreground">32</p>
            </div>
          </div>

          {/* Sección de Gustos / Favoritos (Organizada 3x3) */}
          <div className="pt-4 border-t border-primary/10">
            <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-5">
              Le encanta:
            </p>

            {/* Usamos space-y-3 para separar las filas de 3 */}
            <div className="space-y-3">
              {/* FILA 1: Patinaje, Maquillaje, Muñecas */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center p-3 rounded-xl bg-primary/5 border border-primary/20">
                  <ShipWheel className="w-6 h-6 text-primary mb-2 animate-spin-slow" />
                  <span className="text-[10px] font-bold text-center leading-tight uppercase">
                    Patinaje 4 Ruedas
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl bg-primary/5 border border-primary/20">
                  <Sparkles className="w-6 h-6 text-accent mb-2" />
                  <span className="text-[10px] font-bold text-center leading-tight uppercase">
                    Maquillaje
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl bg-primary/5 border border-primary/20">
                  <Baby className="w-6 h-6 text-secondary mb-2" />
                  <span className="text-[10px] font-bold text-center leading-tight uppercase">
                    Muñecas
                  </span>
                </div>
              </div>

              {/* FILA 2: Música, Harry Potter, Merlina */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center p-3 rounded-xl bg-primary/5 border border-primary/20">
                  <Music4 className="w-6 h-6 text-primary mb-2 animate-twinkle" />
                  <span className="text-[10px] font-bold text-center leading-tight uppercase">
                    Música
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl bg-primary/5 border border-primary/20">
                  <Book className="w-6 h-6 text-accent mb-2" />
                  <span className="text-[10px] font-bold text-center leading-tight uppercase">
                    Libros Harry Potter
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl bg-primary/5 border border-primary/20">
                  <Skull
                    className="w-6 h-6 text-secondary mb-2 animate-twinkle"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <span className="text-[10px] font-bold text-center leading-tight uppercase">
                    Merlina Addams
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
