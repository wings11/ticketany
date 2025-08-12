'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Plus,
  Calendar,
  MapPin,
  DollarSign,
  Ticket,
  Users,
  TrendingUp,
  Eye,
  Trash2,
  X,
  LogOut,
  Home,
  User,
  BarChart3,
  PlusCircle,
  Check,
  AlertCircle
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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

interface NewEvent {
  title: string
  description: string
  date: string
  location: string
  price: number
  ticketsAvailable: number
}

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const { user, logout, login } = useAuth()
  const [newEvent, setNewEvent] = useState<NewEvent>({
    title: '',
    description: '',
    date: '',
    location: '',
    price: 0,
    ticketsAvailable: 0
  })

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchEvents()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchEvents = async () => {
    try {
      const response = await apiCall(apiConfig.endpoints.events)
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await apiCall(apiConfig.endpoints.events, {
        method: 'POST',
        body: JSON.stringify(newEvent),
      })

      if (response.ok) {
        const createdEvent = await response.json()
        setEvents([...events, createdEvent])
        setNewEvent({
          title: '',
          description: '',
          date: '',
          location: '',
          price: 0,
          ticketsAvailable: 0
        })
        setShowCreateForm(false)
        alert('Event created successfully!')
      } else {
        alert('Failed to create event')
      }
    } catch (error) {
      console.error('Error creating event:', error)
      alert('Error creating event')
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const response = await apiCall(apiConfig.endpoints.event(eventId), {
        method: 'DELETE',
      })

      if (response.ok) {
        setEvents(events.filter(event => event._id !== eventId))
        alert('Event deleted successfully!')
      } else {
        alert('Failed to delete event')
      }
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Error deleting event')
    }
  }

  const totalTicketsSold = events.reduce((sum, event) => {
    // Calculate sold tickets (assuming initial was higher)
    return sum + (100 - event.ticketsAvailable) // This is a simplified calculation
  }, 0)

  const totalRevenue = events.reduce((sum, event) => {
    return sum + (event.price * (100 - event.ticketsAvailable))
  }, 0)

  // Redirect if not authenticated or not an admin
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <BarChart3 className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Admin Access Required</h2>
          <p className="text-muted-foreground mb-6">Please login to access the admin panel</p>
          <Button onClick={login} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Login with Google
          </Button>
        </motion.div>
      </div>
    )
  }

  if (user.role !== 'admin') {
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
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-6">This panel is for administrators only</p>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </motion.div>
      </div>
    )
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
          <p className="text-muted-foreground">Loading admin dashboard...</p>
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
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4"
            >
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                TicketAnywhere
              </Link>
              <span className="text-muted-foreground">|</span>
              <span className="text-foreground flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Admin Dashboard
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <Button variant="outline" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  View Site
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  User Dashboard
                </Link>
              </Button>
              <Button variant="destructive" onClick={logout} size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{events.length}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                Events created
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalTicketsSold}</div>
              <p className="text-xs text-muted-foreground">
                <Check className="h-3 w-3 inline mr-1" />
                Total sales
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">${totalRevenue}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                Total earnings
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {events.reduce((sum, event) => sum + event.ticketsAvailable, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                <Ticket className="h-3 w-3 inline mr-1" />
                Ready to sell
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Events Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Manage Events
                </CardTitle>
                <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Create New Event
                </Button>
              </div>
            </CardHeader>

            {/* Create Event Form */}
            {showCreateForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-b bg-muted/30"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Create New Event</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowCreateForm(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <form onSubmit={handleCreateEvent} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Event Title</Label>
                        <Input
                          id="title"
                          type="text"
                          required
                          value={newEvent.title}
                          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                          placeholder="Enter event title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          type="text"
                          required
                          value={newEvent.location}
                          onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                          placeholder="Enter event location"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        required
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                        placeholder="Describe your event"
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date & Time</Label>
                        <Input
                          id="date"
                          type="datetime-local"
                          required
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          required
                          min="0"
                          step="0.01"
                          value={newEvent.price}
                          onChange={(e) => setNewEvent({...newEvent, price: parseFloat(e.target.value)})}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tickets">Available Tickets</Label>
                        <Input
                          id="tickets"
                          type="number"
                          required
                          min="1"
                          value={newEvent.ticketsAvailable}
                          onChange={(e) => setNewEvent({...newEvent, ticketsAvailable: parseInt(e.target.value)})}
                          placeholder="100"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        Create Event
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            <CardContent>
              {events.length > 0 ? (
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <motion.div 
                      key={event._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-background/50"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                          <p className="text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <DollarSign className="h-4 w-4" />
                                <span>${event.price}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Ticket className="h-4 w-4" />
                                <span>{event.ticketsAvailable} available</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/events/${event._id}`} className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              View
                            </Link>
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleDeleteEvent(event._id)}
                            className="flex items-center gap-1"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center py-12"
                >
                  <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                    <Calendar className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No events yet</h3>
                  <p className="text-muted-foreground mb-6">Start by creating your first event to get people excited!</p>
                  <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Your First Event
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
