import type { Metadata, Viewport } from 'next';
import { Outfit, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Ella Isabel 6th Birthday World Tour - K-Pop Party',
  description:
    '¡Estás invitada a la fiesta de cumpleaños K-Pop de Ella Isabel! Domingo 19 de Abril en Mundo Kids.',
  generator: 'v0.app',
  robots: 'noindex, nofollow',

  openGraph: {
    title: '✨ Ella Isabel 6th Birthday World Tour ✨',
    description:
      '¡Reserva tu lugar VIP para el show K-Pop de Ella Isabel! 🫰🏽🎤',
    url: 'https://soyisabelmm.github.io/invitacion-ella-isabel/',
    siteName: 'Ella Isabel Birthday',
    images: [
      {
        url: 'https://static01.nyt.com/images/2025/08/28/espanol/28cul-kpop-fandom-vjqt-ES-copy1/28cul-kpop-fandom-vjqt-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
        width: 1200,
        height: 630,
        alt: 'Huntrix K-Pop Banner',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ella Isabel 6th Birthday - K-Pop Party',
    description: '¡No te pierdas el show! Confirma tu asistencia.',
    images: [
      'https://static01.nyt.com/images/2025/08/28/espanol/28cul-kpop-fandom-vjqt-ES-copy1/28cul-kpop-fandom-vjqt-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
    ],
  },

  icons: {
    icon: 'bola.png',
    apple: 'bola.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
