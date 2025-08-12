'use client'

import { useEffect, useState } from 'react'

interface FontOption {
  name: string
  primary: string
  mono: string
  googleFonts: string
  description: string
  personality: string
}

const fontOptions: FontOption[] = [
  {
    name: 'Poppins + Fira Code',
    primary: 'Poppins',
    mono: 'Fira Code',
    googleFonts: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Fira+Code:wght@300;400;500;600;700&display=swap',
    description: 'Friendly, rounded, perfect for events and modern UIs',
    personality: 'Friendly & Modern'
  },
  {
    name: 'Inter + JetBrains Mono',
    primary: 'Inter',
    mono: 'JetBrains Mono',
    googleFonts: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap',
    description: 'Clean, professional, excellent readability',
    personality: 'Clean & Professional'
  },
  {
    name: 'DM Sans + Space Mono',
    primary: 'DM Sans',
    mono: 'Space Mono',
    googleFonts: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap',
    description: 'Geometric, minimalist, great for tech/startup vibes',
    personality: 'Minimalist & Tech'
  },
  {
    name: 'Plus Jakarta Sans + Source Code Pro',
    primary: 'Plus Jakarta Sans',
    mono: 'Source Code Pro',
    googleFonts: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap',
    description: 'Humanist, warm, contemporary Indonesian-inspired design',
    personality: 'Contemporary & Warm'
  },
  {
    name: 'Outfit + Inconsolata',
    primary: 'Outfit',
    mono: 'Inconsolata',
    googleFonts: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Inconsolata:wght@200..900&display=swap',
    description: 'Bold, geometric, perfect for strong headings and modern layouts',
    personality: 'Bold & Modern'
  }
]

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [currentFont, setCurrentFont] = useState<FontOption>(fontOptions[0])

  useEffect(() => {
    // Load saved font preference
    const savedFont = localStorage.getItem('selectedFont')
    if (savedFont) {
      const found = fontOptions.find(f => f.name === savedFont)
      if (found) {
        setCurrentFont(found)
      }
    }
  }, [])

  useEffect(() => {
    // Remove existing font link
    const existingLink = document.getElementById('dynamic-fonts')
    if (existingLink) {
      existingLink.remove()
    }

    // Add new font link
    const link = document.createElement('link')
    link.id = 'dynamic-fonts'
    link.href = currentFont.googleFonts
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    // Update CSS custom properties
    document.documentElement.style.setProperty('--font-primary', currentFont.primary)
    document.documentElement.style.setProperty('--font-mono', currentFont.mono)

    // Save preference
    localStorage.setItem('selectedFont', currentFont.name)
  }, [currentFont])

  return (
    <div style={{ 
      fontFamily: `${currentFont.primary}, sans-serif`,
    }}>
      {children}
    </div>
  )
}

export function useFontSwitcher() {
  const [currentFont, setCurrentFont] = useState<FontOption>(fontOptions[0])

  useEffect(() => {
    const savedFont = localStorage.getItem('selectedFont')
    if (savedFont) {
      const found = fontOptions.find(f => f.name === savedFont)
      if (found) {
        setCurrentFont(found)
      }
    }
  }, [])

  const switchFont = (fontName: string) => {
    const font = fontOptions.find(f => f.name === fontName)
    if (font) {
      setCurrentFont(font)
      
      // Remove existing font link
      const existingLink = document.getElementById('dynamic-fonts')
      if (existingLink) {
        existingLink.remove()
      }

      // Add new font link
      const link = document.createElement('link')
      link.id = 'dynamic-fonts'
      link.href = font.googleFonts
      link.rel = 'stylesheet'
      document.head.appendChild(link)

      // Update CSS custom properties
      document.documentElement.style.setProperty('--font-primary', font.primary)
      document.documentElement.style.setProperty('--font-mono', font.mono)

      // Save preference
      localStorage.setItem('selectedFont', font.name)

      // Force a re-render by updating the body font
      document.body.style.fontFamily = `${font.primary}, sans-serif`
    }
  }

  return {
    currentFont,
    fontOptions,
    switchFont
  }
}
