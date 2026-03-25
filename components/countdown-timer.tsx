'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Memoized time unit to prevent unnecessary re-renders
const TimeUnit = memo(function TimeUnit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="text-center">
      <div className="bg-secondary/20 rounded-lg p-3 md:p-4 border border-primary/30">
        <span className="text-2xl md:text-4xl lg:text-5xl font-black text-primary text-glow-gold font-mono">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <p className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
});

const TARGET_DATE = new Date('2026-04-19T16:30:00').getTime();

export const CountdownTimer = memo(function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  const calculateTimeLeft = useCallback(() => {
    const now = Date.now();
    const difference = TARGET_DATE - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, []);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (!mounted) {
    return (
      <section>
        <Card className="glassmorphism border-glow overflow-hidden">
          <CardContent className="p-6">
            <div className="h-24 animate-pulse bg-muted/20 rounded-lg" />
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section style={{ contain: 'layout style' }}>
      <Card className="glassmorphism border-glow overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-bold text-accent tracking-wider uppercase">
              Cuenta Regresiva
            </h3>
            <Clock className="w-5 h-5 text-accent" />
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-4">
            <TimeUnit value={timeLeft.days} label="Días" />
            <TimeUnit value={timeLeft.hours} label="Horas" />
            <TimeUnit value={timeLeft.minutes} label="Minutos" />
            <TimeUnit value={timeLeft.seconds} label="Segundos" />
          </div>

          <p className="text-center text-sm text-accent mt-4 font-semibold">
            19 de Abril, 2026 - 16:30 hrs
          </p>
        </CardContent>
      </Card>
    </section>
  );
});
