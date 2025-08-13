// API configuration utility
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

export const apiConfig = {
  baseUrl: API_BASE_URL,
  endpoints: {
    // Events
    events: `${API_BASE_URL}/api/events`,
    event: (id: string) => `${API_BASE_URL}/api/events/${id}`,
    
    // Tickets  
    tickets: `${API_BASE_URL}/api/tickets`,
    userTickets: (userId: string) => `${API_BASE_URL}/api/tickets/user/${userId}`,
    
    // Auth
    currentUser: `${API_BASE_URL}/auth/current_user`,
    googleAuth: `${API_BASE_URL}/auth/google`,
    logout: `${API_BASE_URL}/auth/logout`,
  }
}

// Helper function to build API URLs
export const buildApiUrl = (path: string): string => {
  return `${API_BASE_URL}${path}`
}

// Type-safe API client helper
export const apiCall = async (url: string, options: RequestInit = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include', // Important for cookie-based auth
  }

  try {
    const response = await fetch(url, config)
    return response
  } catch (error) {
    console.error('API call failed:', error)
    throw error
  }
}
