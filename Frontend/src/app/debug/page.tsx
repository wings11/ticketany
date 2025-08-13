'use client'

export default function DebugPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  
  console.log('Environment variable NEXT_PUBLIC_API_URL:', apiUrl)
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Information</h1>
      <div className="space-y-2">
        <p><strong>NEXT_PUBLIC_API_URL:</strong> {apiUrl || 'undefined'}</p>
        <p><strong>Default fallback:</strong> http://localhost:5000</p>
        <p><strong>Final API URL:</strong> {apiUrl || 'http://localhost:5000'}</p>
      </div>
      
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={async () => {
          try {
            const response = await fetch(`${apiUrl || 'http://localhost:5000'}/api/events`)
            const data = await response.json()
            console.log('API Response:', data)
            alert(`Found ${data.length} events`)
          } catch (error) {
            console.error('API Error:', error)
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            alert('API call failed: ' + errorMessage)
          }
        }}
      >
        Test API Call
      </button>
    </div>
  )
}
