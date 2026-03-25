'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Music, Volume2, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const MusicPlayer = memo(function MusicPlayer() {
  // 1. Reemplaza este link por el de tu canción o playlist de Huntrix/K-pop
  const spotifyPlaylistUrl =
    'https://open.spotify.com/embed/playlist/4r5mNXJ3UUrQjDMhBMzrzv?utm_source=generator';

  return (
    <section className="w-full mx-auto">
      <Card className="glassmorphism border-2 border-accent/50 overflow-hidden shadow-2xl">
        <CardContent className="p-0">
          {/* Header con tu estilo */}
          <div className="bg-linear-to-r from-accent/20 via-secondary/20 to-accent/20 p-4 border-b border-accent/30">
            <div className="flex items-center justify-center gap-2">
              <Music className="w-5 h-5 text-accent animate-pulse" />
              <h3 className="text-lg font-bold text-accent tracking-wider uppercase">
                Huntrix Official Player
              </h3>
              <Music className="w-5 h-5 text-accent animate-pulse" />
            </div>
          </div>

          <div className="p-6 space-y-4">
            {/* Portada del Album (Tu imagen original) */}
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-primary/50 glow-gold shrink-0">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a65d4b805f0b4ded1342f03b3c3235b0-L7iMKzkcfhqFm1SGk9nm83ppGgYp4Z.jpg"
                  alt="Huntrix Golden Album"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] text-accent font-bold uppercase tracking-widest">
                  Digital Ticket Audio
                </p>
                <h4 className="text-xl font-black text-primary text-glow-gold uppercase">
                  Golden Tour
                </h4>
                <p className="text-sm text-muted-foreground">
                  Presiona Play para iniciar
                </p>
              </div>
            </div>

            {/* Widget de Spotify Real */}
            <div className="rounded-xl overflow-hidden bg-black/40 border border-primary/20">
              <iframe
                src={spotifyPlaylistUrl}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ borderRadius: '12px', border: 'none' }}
              ></iframe>
            </div>

            {/* Footer Informativo */}
            <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase pt-2 border-t border-white/5">
              <div className="flex items-center gap-1">
                <Volume2 className="w-3 h-3" />
                <span>Audio optimizado</span>
              </div>
              <a
                href="https://open.spotify.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                Abrir en Spotify <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
});

export default MusicPlayer;
