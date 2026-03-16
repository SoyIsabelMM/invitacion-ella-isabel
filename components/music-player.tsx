"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Pause, Music, SkipForward, SkipBack, Volume2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const tracks = [
  { id: 1, title: "GOLDEN", artist: "Huntrix", duration: "3:45", isMain: true },
  { id: 2, title: "Warrior Spirit", artist: "Huntrix", duration: "4:02" },
  { id: 3, title: "Neon Pink", artist: "Huntrix", duration: "3:28" },
  { id: 4, title: "Birthday Queen", artist: "Huntrix", duration: "3:55" },
]

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev === 0 ? tracks.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentTrack((prev) => (prev === tracks.length - 1 ? 0 : prev + 1))
  }

  return (
    <section>
      <Card className="glassmorphism border-2 border-accent/50 overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-accent/20 via-secondary/20 to-accent/20 p-4 border-b border-accent/30">
            <div className="flex items-center justify-center gap-2">
              <Music className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-bold text-accent tracking-wider uppercase">
                Huntrix Setlist
              </h3>
              <Music className="w-5 h-5 text-accent" />
            </div>
          </div>
          
          {/* Now Playing */}
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Album Art */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 border-primary/50 glow-gold">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a65d4b805f0b4ded1342f03b3c3235b0-L7iMKzkcfhqFm1SGk9nm83ppGgYp4Z.jpg"
                    alt="Huntrix Golden Album"
                    fill
                    className="object-cover"
                  />
                  {isPlaying && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                      <div className="w-1 h-3 bg-primary-foreground rounded-full animate-pulse" />
                      <div className="w-1 h-4 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: "0.1s" }} />
                      <div className="w-1 h-2 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                    </div>
                  )}
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Reproduciendo ahora
                  </p>
                  <h4 className="text-lg md:text-xl font-bold text-primary text-glow-gold">
                    {tracks[currentTrack].title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{tracks[currentTrack].artist}</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-2 text-muted-foreground">
                <Volume2 className="w-4 h-4" />
                <div className="w-20 h-1 bg-muted rounded-full">
                  <div className="w-3/4 h-full bg-primary rounded-full" />
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="w-full h-1.5 bg-muted/30 rounded-full overflow-hidden">
                <div 
                  className="h-full gradient-gold rounded-full transition-all duration-300"
                  style={{ width: isPlaying ? "45%" : "0%" }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{isPlaying ? "1:42" : "0:00"}</span>
                <span>{tracks[currentTrack].duration}</span>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                onClick={handlePrevious}
              >
                <SkipBack className="w-5 h-5" />
              </Button>
              
              <Button
                size="icon"
                className="w-14 h-14 rounded-full gradient-gold text-primary-foreground hover:opacity-90 glow-gold transition-all duration-300"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                onClick={handleNext}
              >
                <SkipForward className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Track List */}
          <div className="border-t border-primary/20 p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
              Playlist
            </p>
            <div className="space-y-2">
              {tracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => setCurrentTrack(index)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-all ${
                    currentTrack === index
                      ? "bg-primary/20 border border-primary/40"
                      : "hover:bg-muted/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-mono ${currentTrack === index ? "text-primary" : "text-muted-foreground"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="text-left">
                      <p className={`text-sm font-semibold ${currentTrack === index ? "text-primary" : "text-foreground"}`}>
                        {track.title}
                        {track.isMain && (
                          <span className="ml-2 text-[10px] bg-accent/20 text-accent px-1.5 py-0.5 rounded-full uppercase">
                            Main
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">{track.artist}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{track.duration}</span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
