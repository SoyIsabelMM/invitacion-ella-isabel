'use client';

import { memo, useMemo } from 'react';
import { Star, Music, Sparkles, Heart } from 'lucide-react';

// Static decorations defined outside component to prevent recreation
const decorationsConfig = [
  {
    Icon: Star,
    className: 'top-[10%] left-[5%] text-primary',
    delay: '0s',
    size: 'w-4 h-4',
  },
  {
    Icon: Music,
    className: 'top-[15%] right-[8%] text-accent',
    delay: '0.5s',
    size: 'w-5 h-5',
  },
  {
    Icon: Sparkles,
    className: 'top-[25%] left-[12%] text-secondary',
    delay: '1s',
    size: 'w-3 h-3',
  },
  {
    Icon: Star,
    className: 'top-[35%] right-[15%] text-primary',
    delay: '1.5s',
    size: 'w-4 h-4',
  },
  {
    Icon: Heart,
    className: 'top-[45%] left-[8%] text-accent',
    delay: '2s',
    size: 'w-3 h-3',
  },
  {
    Icon: Music,
    className: 'top-[55%] right-[5%] text-primary',
    delay: '0.3s',
    size: 'w-4 h-4',
  },
] as const;

// Memoized component to prevent re-renders during scroll
export const FloatingDecorations = memo(function FloatingDecorations() {
  // Memoize the decorations to prevent re-creation
  const decorations = useMemo(
    () =>
      decorationsConfig.map((decoration, index) => {
        const { Icon, className, delay, size } = decoration;
        return (
          <div
            key={index}
            className={`absolute ${className} opacity-20 will-change-transform`}
            style={{
              animationDelay: delay,
              animation: 'float 6s ease-in-out infinite',
              contain: 'layout style paint',
            }}
          >
            <Icon className={size} />
          </div>
        );
      }),
    [],
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
      style={{ contain: 'layout style paint' }}
    >
      {decorations}

      {/* Simplified gradient orbs - reduced blur and opacity for mobile performance */}
      <div
        className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/5 rounded-full blur-2xl hidden md:block"
        style={{ contain: 'layout style paint' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-2xl hidden md:block"
        style={{ contain: 'layout style paint' }}
      />
    </div>
  );
});
