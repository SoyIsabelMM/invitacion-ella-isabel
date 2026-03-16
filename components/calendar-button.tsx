"use client"

import { Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function CalendarButton() {
  const eventDetails = {
    title: "Cumpleaños Ella Isabel - 6th Birthday World Tour",
    description: "Fiesta de cumpleaños K-Pop de Ella Isabel. ¡Los niños pueden ir disfrazados!",
    location: "Salón de juegos 'Mundo Kids', Pedro León Gallo 706, Centro de Villarrica",
    startDate: "2026-04-19T16:30:00",
    endDate: "2026-04-19T19:30:00",
  }

  const formatGoogleCalendarDate = (dateString: string) => {
    // Format: YYYYMMDDTHHmmss
    return dateString.replace(/[-:]/g, "")
  }

  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventDetails.title
  )}&dates=${formatGoogleCalendarDate(eventDetails.startDate)}/${formatGoogleCalendarDate(
    eventDetails.endDate
  )}&details=${encodeURIComponent(
    eventDetails.description
  )}&location=${encodeURIComponent(eventDetails.location)}&sf=true&output=xml`

  const handleAddToCalendar = () => {
    window.open(googleCalendarUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <section>
      <Card className="glassmorphism border-2 border-secondary/50 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center glow-blue">
              <Calendar className="w-7 h-7 text-secondary" />
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-foreground">
                No te olvides de la fecha
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Agrega el evento a tu calendario
              </p>
            </div>
            
            <Button
              onClick={handleAddToCalendar}
              className="w-full md:w-auto px-8 h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold glow-blue transition-all duration-300"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Añadir a Google Calendar
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Domingo 19 de Abril, 2026</p>
              <p>16:30 - 19:30 hrs</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
