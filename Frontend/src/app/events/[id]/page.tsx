'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Ticket, 
  ShoppingCart,
  AlertCircle,
  Check
} from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { apiConfig, apiCall } from '@/lib/api'

interface Event {
  _id: string
  title: string
  description: string
  date: string
  location: string
  price: number
  ticketsAvailable: number
}

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { user, login } = useAuth()

  useEffect(() => {
    if (params.id) {
      fetchEvent(params.id as string)
    }
  }, [params.id])

  const fetchEvent = async (eventId: string) => {
    try {
      const response = await apiCall(apiConfig.endpoints.event(eventId))
      if (response.ok) {
        const data = await response.json()
        setEvent(data)
      } else {
        console.error('Event not found')
      }
    } catch (error) {
      console.error('Error fetching event:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBuyTicket = async () => {
    if (!event || !user) return

    try {
      const response = await apiCall(apiConfig.endpoints.tickets, {
        method: 'POST',
        body: JSON.stringify({
          eventId: event._id,
          userId: user._id,
          quantity: quantity,
        }),
      })
      
      if (response.ok) {
        alert(`${quantity} ticket(s) purchased successfully!`)
        fetchEvent(event._id) // Refresh event data
      } else {
        alert('Failed to purchase ticket')
      }
    } catch (error) {
      console.error('Error buying ticket:', error)
      alert('Error purchasing ticket')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading event details...</p>
        </motion.div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
          <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/50">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Link>
          </Button>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Event Header */}
          <div className="mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            >
              {event.title}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(event.date).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {event.location}
              </Badge>
              <Badge variant={event.ticketsAvailable > 0 ? "default" : "destructive"} className="flex items-center gap-1">
                <Ticket className="h-3 w-3" />
                {event.ticketsAvailable} available
              </Badge>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Event Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">About This Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Purchase Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-0 shadow-lg bg-card/50 backdrop-blur sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Purchase Tickets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">
                      ${event.price}
                    </div>
                    <div className="text-sm text-muted-foreground">per ticket</div>
                  </div>

                  {event.ticketsAvailable > 0 ? (
                    user ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="quantity">Quantity</Label>
                          <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number(value))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select quantity" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: Math.min(event.ticketsAvailable, 10) }, (_, i) => (
                                <SelectItem key={i + 1} value={(i + 1).toString()}>
                                  {i + 1} ticket{i + 1 > 1 ? 's' : ''}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center text-lg font-semibold">
                            <span>Total:</span>
                            <span className="text-primary">${event.price * quantity}</span>
                          </div>
                        </div>

                        <Button 
                          onClick={handleBuyTicket} 
                          className="w-full h-12 text-lg"
                          size="lg"
                        >
                          <Check className="h-5 w-5 mr-2" />
                          Purchase {quantity} Ticket{quantity > 1 ? 's' : ''}
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-center space-y-4"
                      >
                        <div className="text-muted-foreground mb-4">
                          Please login to purchase tickets
                        </div>
                        <Button onClick={login} className="w-full h-12 text-lg" size="lg">
                          Login with Google
                        </Button>
                      </motion.div>
                    )
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-center space-y-4"
                    >
                      <div className="text-muted-foreground mb-4">
                        Sorry, this event is sold out
                      </div>
                      <Button disabled className="w-full h-12 text-lg" size="lg">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        Sold Out
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
