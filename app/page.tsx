'use client';

import { useState, useCallback, memo } from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/hero-section';
import { CountdownTimer } from '@/components/countdown-timer';
import { EventDetails } from '@/components/event-details';
import { GiftInfo } from '@/components/gift-info';
import { SpecialNotes } from '@/components/special-notes';
import { FloatingDecorations } from '@/components/floating-decorations';

// Lazy load heavier components for better initial load
const MusicPlayer = dynamic(() => import('@/components/music-player'), {
  ssr: false,
  loading: () => <div className="h-32 bg-muted/20 rounded-lg animate-pulse" />,
});

const RSVPForm = dynamic(
  () =>
    import('@/components/rsvp-form').then((mod) => ({ default: mod.RSVPForm })),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 bg-muted/20 rounded-lg animate-pulse" />
    ),
  },
);

// Memoized footer to prevent re-renders
const Footer = memo(function Footer() {
  return (
    <footer className="text-center py-8 border-t border-primary/20">
      <p className="text-muted-foreground text-sm">
        Con mucho amor para Ella Isabel
      </p>
      <div className="flex justify-center gap-2 mt-2">
        <span className="text-primary">★</span>
        <span className="text-accent">♪</span>
        <span className="text-secondary">✦</span>
      </div>
      <p className="text-muted-foreground text-sm">
        Creado por Mary Martínez. Desarrolladora Frontend y Fan del K-Pop
      </p>
    </footer>
  );
});

export default function InvitationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback(() => {
    setIsSubmitted(true);
  }, []);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FloatingDecorations />

      <div className="relative z-10">
        <HeroSection />

        <div className="container mx-auto px-4 py-12 space-y-8 max-w-4xl">
          <CountdownTimer />
          <MusicPlayer />
          <EventDetails />
          <GiftInfo />
          <SpecialNotes />
          <RSVPForm isSubmitted={isSubmitted} onSubmit={handleSubmit} />
        </div>

        <Footer />
      </div>
    </main>
  );
}
