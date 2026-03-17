'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Send,
  CheckCircle,
  Users,
  Sparkles,
  Star,
  Ticket,
  Mail,
  Calendar,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// RSVP API (optional: if set, RSVPs are persisted on Backend before sending emails)
const RSVP_API_URL = process.env.NEXT_PUBLIC_RSVP_API_URL ?? '';

// Feature flag: set to "true" or "1" to send emails via EmailJS; otherwise emails are skipped
const SEND_EMAILS =
  process.env.NEXT_PUBLIC_SEND_EMAILS === 'true' ||
  process.env.NEXT_PUBLIC_SEND_EMAILS === '1';

// EmailJS Configuration (from .env; only used when NEXT_PUBLIC_SEND_EMAILS is true)
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '';
const EMAILJS_AUTO_REPLY_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID ?? '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '';

// Event details (from .env; used in emails and Google Calendar link)
const EVENT_NAME = process.env.NEXT_PUBLIC_RSVP_EVENT_NAME;
const EVENT_DATE = process.env.NEXT_PUBLIC_RSVP_EVENT_DATE;
const EVENT_TIME = process.env.NEXT_PUBLIC_RSVP_EVENT_TIME;
const EVENT_LOCATION = process.env.NEXT_PUBLIC_RSVP_EVENT_LOCATION;

interface RSVPFormProps {
  isSubmitted: boolean;
  onSubmit: () => void;
}

// Google Calendar URL for the event
const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
  `${EVENT_NAME}`,
)}&dates=20260419T163000/20260419T193000&details=${encodeURIComponent(
  'Fiesta de cumpleaños K-Pop de Ella Isabel. Tema: Huntrix Golden. Los niños pueden ir disfrazados!',
)}&location=${encodeURIComponent(EVENT_LOCATION!)}&sf=true&output=xml`;

export function RSVPForm({ isSubmitted, onSubmit }: RSVPFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailjsLoaded, setEmailjsLoaded] = useState(false);

  // Load EmailJS SDK only when email sending is enabled
  useEffect(() => {
    if (!SEND_EMAILS) return;
    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize EmailJS with public key
      if (
        typeof window !== 'undefined' &&
        (window as unknown as { emailjs: { init: (key: string) => void } })
          .emailjs
      ) {
        (
          window as unknown as { emailjs: { init: (key: string) => void } }
        ).emailjs.init(EMAILJS_PUBLIC_KEY);
        setEmailjsLoaded(true);
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(
        `script[src="${script.src}"]`,
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Persist RSVP to backend first when API URL is configured
      // if (RSVP_API_URL) {
      //   const res = await fetch(`${RSVP_API_URL}/api/rsvp`, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({
      //       guestName: name.trim(),
      //       guardianEmail: email.trim().toLowerCase(),
      //       phone: phone.trim(),
      //     }),
      //   });
      //   if (!res.ok) {
      //     const data = await res.json().catch(() => ({}));
      //     const msg =
      //       Array.isArray(data?.errors) && data.errors.length > 0
      //         ? data.errors.join('. ')
      //         : (data?.error ??
      //           'Error al guardar la confirmación. Intenta de nuevo.');
      //     throw new Error(msg);
      //   }
      // }

      if (SEND_EMAILS) {
        const emailjs = (
          window as unknown as {
            emailjs: {
              send: (
                serviceId: string,
                templateId: string,
                params: Record<string, string>,
              ) => Promise<{ status: number }>;
            };
          }
        ).emailjs;

        if (!emailjs || !emailjsLoaded) {
          throw new Error('EmailJS no está cargado');
        }

        // Send notification email to organizers
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          user_name: name,
          user_email: email,
          user_phone: phone,
          to_email: process.env.NEXT_PUBLIC_RSVP_ORGANIZER_TO_EMAIL ?? '',
          cc_email: process.env.NEXT_PUBLIC_RSVP_ORGANIZER_CC_EMAIL ?? '',
          event_name: EVENT_NAME!,
          event_date: EVENT_DATE!,
          event_time: EVENT_TIME!,
          event_location: EVENT_LOCATION!,
        });

        // Send auto-confirmation email to guest with Golden Huntrix theme
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTO_REPLY_TEMPLATE_ID, {
          user_name: name,
          user_email: email,
          to_email: email,
          event_name: EVENT_NAME!,
          event_date: EVENT_DATE!,
          event_time: EVENT_TIME!,
          event_location: EVENT_LOCATION!,
          calendar_link: googleCalendarUrl,
          dress_code:
            'K-Pop / Huntrix Golden - Los niños pueden ir disfrazados!',
        });
      }

      onSubmit();
    } catch (err) {
      console.error('RSVP/EmailJS Error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Error al enviar. Por favor intenta de nuevo.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section>
        <Card className="glassmorphism border-2 border-primary/50 glow-gold overflow-hidden">
          <CardContent className="p-6 md:p-8 text-center space-y-6">
            {/* Huntrix Golden characters image */}
            <div className="relative w-full max-w-sm mx-auto aspect-4/3 rounded-xl overflow-hidden border-2 border-primary/50 glow-gold">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a65d4b805f0b4ded1342f03b3c3235b0-L7iMKzkcfhqFm1SGk9nm83ppGgYp4Z.jpg"
                alt="Huntrix Golden"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />

              {/* Golden ticket badge overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full gradient-gold">
                <CheckCircle className="w-5 h-5 text-primary-foreground" />
                <span className="text-sm font-bold text-primary-foreground">
                  VIP CONFIRMED
                </span>
              </div>
            </div>

            {/* Huntrix-style confirmation message */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-primary animate-twinkle" />
                <h3 className="text-2xl md:text-3xl font-black text-primary text-glow-gold tracking-wide">
                  GOLDEN TICKET
                </h3>
                <Star
                  className="w-5 h-5 text-primary animate-twinkle"
                  style={{ animationDelay: '0.3s' }}
                />
              </div>

              <div className="h-0.5 w-40 mx-auto gradient-gold rounded-full" />

              <div className="space-y-2">
                <p className="text-lg md:text-xl font-bold text-foreground">
                  Ticket emitido!
                </p>
                <p className="text-base text-accent font-medium">
                  Revisa tu email para los detalles del World Tour
                </p>
              </div>

              {/* Email confirmation notice */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/30 rounded-lg px-4 py-2 mx-auto w-fit">
                <Mail className="w-4 h-4" />
                <span>Confirmación enviada a tu correo</span>
              </div>
            </div>

            {/* Add to Calendar button */}
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary/20 border border-secondary/50 text-secondary hover:bg-secondary/30 transition-colors font-medium"
            >
              <Calendar className="w-5 h-5" />
              Agregar a Google Calendar
            </a>

            {/* Decorative sparkles */}
            <div className="flex justify-center gap-3 pt-2">
              <Sparkles className="w-6 h-6 text-primary animate-twinkle" />
              <Sparkles
                className="w-6 h-6 text-accent animate-twinkle"
                style={{ animationDelay: '0.15s' }}
              />
              <Sparkles
                className="w-6 h-6 text-secondary animate-twinkle"
                style={{ animationDelay: '0.3s' }}
              />
              <Sparkles
                className="w-6 h-6 text-primary animate-twinkle"
                style={{ animationDelay: '0.45s' }}
              />
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section>
      <Card className="glassmorphism border-glow overflow-hidden">
        <CardHeader className="text-center border-b border-primary/30 pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Ticket className="w-5 h-5 text-primary" />
            <CardTitle className="text-xl text-primary tracking-wider">
              CONFIRMAR ASISTENCIA
            </CardTitle>
            <Ticket className="w-5 h-5 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            Reserva tu lugar en el tour
          </p>
        </CardHeader>

        <CardContent className="p-6">
          {/* Limited capacity notice */}
          <div className="mb-6 p-4 rounded-lg bg-accent/10 border-2 border-accent/50 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-5 h-5 text-accent" />
              <span className="text-sm font-bold uppercase tracking-wider text-accent">
                CUPOS LIMITADOS
              </span>
              <Users className="w-5 h-5 text-accent" />
            </div>
            <p className="text-foreground font-medium">
              Invitacion valida para 1 niño y 1 acompanante
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="user_name"
                className="text-foreground font-medium"
              >
                Nombre y apellido del niño/a que asiste
              </Label>
              <Input
                id="user_name"
                name="user_name"
                type="text"
                placeholder="Escribe el nombre y apellido del niño/a"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-input border-primary/30 focus:border-primary focus:ring-primary/50 text-foreground placeholder:text-muted-foreground h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="user_email"
                className="text-foreground font-medium"
              >
                Email del apoderado/acompañante
              </Label>
              <Input
                id="user_email"
                name="user_email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-primary/30 focus:border-primary focus:ring-primary/50 text-foreground placeholder:text-muted-foreground h-12"
                required
              />
              <p className="text-xs text-muted-foreground">
                Recibiras una confirmacion con los detalles del evento
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="user_phone"
                className="text-foreground font-medium"
              >
                Número telefonico del apoderado/acompañante
              </Label>
              <Input
                id="user_phone"
                name="user_phone"
                type="tel"
                placeholder="Ejemplo: 912345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-input border-primary/30 focus:border-primary focus:ring-primary/50 text-foreground placeholder:text-muted-foreground h-12"
                required
              />
              <p className="text-xs text-muted-foreground">
                Recibiras una confirmacion con los detalles del evento
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold gradient-gold text-primary-foreground hover:opacity-90 transition-all duration-300 glow-gold"
              disabled={isLoading || (SEND_EMAILS && !emailjsLoaded)}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Enviando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Confirmar Asistencia
                </div>
              )}
            </Button>

            <p className="text-center text-xl text-accent font-semibold animate-pulse">
              Confirmar antes del 5 de Abril
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
