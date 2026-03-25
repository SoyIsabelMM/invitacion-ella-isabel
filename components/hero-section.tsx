'use client';

import Image from 'next/image';
import { Star, Music, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-16">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a65d4b805f0b4ded1342f03b3c3235b0-L7iMKzkcfhqFm1SGk9nm83ppGgYp4Z.jpg"
          alt="Huntrix Golden Era"
          fill
          className="object-cover object-top opacity-30"
          priority
        />
      </div>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-secondary/40 via-background/90 to-background" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Star className="w-8 h-8 text-primary fill-primary/30" />
      </div>
      <div
        className="absolute top-32 right-12 animate-float"
        style={{ animationDelay: '0.5s' }}
      >
        <Music className="w-6 h-6 text-accent" />
      </div>
      <div className="absolute top-48 left-1/4 animate-twinkle">
        <Sparkles className="w-5 h-5 text-primary" />
      </div>

      <div className="relative z-10 text-center space-y-8">
        {/* Header badge */}
        <div className="inline-block">
          <div className="glassmorphism rounded-full px-6 py-3 border-glow animate-pulse-glow">
            <p className="text-sm md:text-base font-semibold tracking-widest text-primary uppercase">
              Huntrix - Golden Tour
            </p>
          </div>
        </div>

        {/* Main invitation text */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl text-accent font-semibold tracking-wider animate-pulse">
            ¡ESTÁS INVITADA A UNA FIESTA DE GUERRERAS K-POP!
          </h2>
        </div>

        {/* Main title with big 6 */}
        <div className="relative space-y-2">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            <span className="text-glow-gold">ELLA ISABEL</span>
          </h1>

          {/* The Big 6 */}
          <div className="relative inline-block my-6">
            <span
              className="text-[10rem] md:text-[14rem] lg:text-[18rem] font-black gradient-gold bg-clip-text text-transparent leading-none drop-shadow-2xl"
              style={{ WebkitBackgroundClip: 'text' }}
            >
              6
            </span>
            <div className="absolute inset-0 blur-3xl bg-primary/30 -z-10" />
            <div className="absolute -top-4 -right-4 animate-twinkle">
              <Star className="w-8 h-8 text-primary fill-primary" />
            </div>
            <div
              className="absolute -bottom-2 -left-4 animate-twinkle"
              style={{ animationDelay: '0.3s' }}
            >
              <Star className="w-6 h-6 text-accent fill-accent" />
            </div>
          </div>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-widest">
            <span className="text-secondary">BIRTHDAY</span>{' '}
            <span className="text-primary text-glow-gold">WORLD TOUR</span>
          </h2>
        </div>

        {/* Ticket stub effect */}
        <div className="mt-8 glassmorphism rounded-lg p-4 border-glow max-w-md mx-auto">
          <div className="flex items-center justify-between border-b border-primary/30 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                VIP Pass
              </span>
            </div>
            <span className="text-xs text-primary font-mono">No. 00001</span>
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Fecha</p>
              <p className="text-foreground font-semibold">19 ABR 2026</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-xs">Hora</p>
              <p className="text-foreground font-semibold">16:30</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pt-8 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full mx-auto flex justify-center">
            <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Desliza para ver más
          </p>
        </div>
      </div>
    </section>
  );
}
