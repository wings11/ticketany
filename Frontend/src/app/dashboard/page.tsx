'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  DollarSign, 
  ShoppingBag,
  LogOut,
  Settings,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  PlusCircle
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { apiConfig, apiCall } from '@/lib/api'

interface Ticket {
  _id: string
  event: {
    _id: string
    title: string
    date: string
    location: string
    price: number
  }
  quantity: number
  purchaseDate: string
}

export default function UserDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const { user, logout, login } = useAuth()

  useEffect(() => {
    if (user) {
      fetchUserTickets()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchUserTickets = async () => {
    if (!user) return
    
    try {
      const response = await apiCall(apiConfig.endpoints.userTickets(user._id))
      if (response.ok) {
        const data = await response.json()
        setTickets(data)
      }
    } catch (error) {
      console.error('Error fetching tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    logout()
  }

  // Redirect if not authenticated or not a customer
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Access Required</h2>
          <p className="text-muted-foreground mb-6">Please login to access your dashboard</p>
          <Button onClick={login} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Login with Google
          </Button>
        </motion.div>
      </div>
    )
  }

  if (user.role !== 'customer' && user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <Settings className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-6">This dashboard is not available for your user type</p>
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
          <p className="text-muted-foreground">Loading your dashboard...</p>
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
              <span className="text-foreground">
                {user.role === 'admin' ? 'User Dashboard (Admin View)' : 'User Dashboard'}
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm text-muted-foreground hidden sm:block">
                Welcome, {user.name}
              </span>
              {user.role === 'admin' && (
                <Button variant="outline" asChild>
                  <Link href="/admin" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Admin Panel
                  </Link>
                </Button>
              )}
              <Button variant="destructive" onClick={handleLogout} size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {tickets.reduce((sum, ticket) => sum + ticket.quantity, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                Tickets purchased
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{tickets.length}</div>
              <p className="text-xs text-muted-foreground">
                <CheckCircle className="h-3 w-3 inline mr-1" />
                Unique events
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                ${tickets.reduce((sum, ticket) => sum + (ticket.event.price * ticket.quantity), 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                Lifetime spending
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tickets Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  My Tickets
                </CardTitle>
                <Button asChild>
                  <Link href="/" className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Browse Events
                  </Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {tickets.length > 0 ? (
                <div className="space-y-4">
                  {tickets.map((ticket, index) => (
                    <motion.div 
                      key={ticket._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-background/50"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-3">
                            {ticket.event.title}
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(ticket.event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{ticket.event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Ticket className="h-4 w-4" />
                              <span>Quantity: {ticket.quantity}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4" />
                              <span>Total: ${ticket.event.price * ticket.quantity}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <ShoppingBag className="h-4 w-4" />
                            <span>Purchased: {new Date(ticket.purchaseDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Confirmed
                          </Badge>
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
                    <Ticket className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No tickets yet</h3>
                  <p className="text-muted-foreground mb-6">Start exploring events and purchase your first ticket!</p>
                  <Button asChild>
                    <Link href="/" className="flex items-center gap-2">
                      Browse Events
                      <ArrowRight className="h-4 w-4" />
                    </Link>
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
