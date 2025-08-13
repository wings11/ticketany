'use client'

import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function AuthSuccessPage() {
  const { checkAuth, user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Check authentication status after OAuth redirect
    const handleAuthSuccess = async () => {
      try {
        await checkAuth()
        // Small delay to ensure auth state is updated
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/')
      }
    }

    handleAuthSuccess()
  }, [checkAuth, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Completing authentication...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold mb-2">Authentication Successful!</h1>
          <p className="text-gray-600 mb-4">Welcome, {user.name}</p>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">✗</div>
        <h1 className="text-2xl font-bold mb-2">Authentication Failed</h1>
        <p className="text-gray-600 mb-4">There was a problem with your login.</p>
        <button 
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
