'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiConfig, apiCall } from '@/lib/api'

interface User {
  _id: string
  name: string
  email: string
  role: 'admin' | 'customer'
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: () => void
  logout: () => void
  checkAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    try {
      const response = await apiCall(apiConfig.endpoints.currentUser)
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Error checking auth:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = () => {
    window.location.href = apiConfig.endpoints.googleAuth
  }

  const logout = async () => {
    try {
      await apiCall(apiConfig.endpoints.logout, { method: 'POST' })
      setUser(null)
      window.location.href = '/'
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
