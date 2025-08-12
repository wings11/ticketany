'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Type, Palette, Check, Sparkles } from 'lucide-react'
import { useFontSwitcher } from '@/components/FontProvider'
import { useState } from 'react'

export default function FontShowcase() {
  const { currentFont, fontOptions, switchFont } = useFontSwitcher()
  const [showSuccess, setShowSuccess] = useState(false)

  const handleApplyFont = (fontName: string) => {
    switchFont(fontName)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/50">
      {/* Success Notification */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.9 }}
          className="fixed top-4 right-4 z-50 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4" />
          Font applied successfully!
        </motion.div>
      )}

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <Type className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Font Showcase</h1>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 text-center"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Choose Your Perfect Font Combination
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each font pairing brings its own personality to your event ticketing system. 
            Select the one that best matches your brand and audience.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {fontOptions.map((font, index) => (
            <motion.div
              key={font.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
            >
              <FontPreviewCard 
                font={font} 
                isCurrent={currentFont.name === font.name}
                onApply={() => handleApplyFont(font.name)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FontPreviewCard({ font, isCurrent, onApply }: { 
  font: any
  isCurrent: boolean
  onApply: () => void
}) {
  return (
    <Card className={`border-0 shadow-lg bg-card/50 backdrop-blur relative overflow-hidden ${
      isCurrent ? 'ring-2 ring-primary' : ''
    }`}>
      {isCurrent && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
            <Check className="h-3 w-3" />
            Currently Active
          </div>
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl mb-2">{font.name}</CardTitle>
            <div className="flex items-center gap-2 mb-3">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-primary">{font.personality}</span>
            </div>
            <p className="text-muted-foreground">{font.description}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Font Preview with Dynamic Loading */}
          <div>
            <link href={font.googleFonts} rel="stylesheet" />
            <div style={{ fontFamily: font.primary }}>
              <h3 className="text-4xl font-bold mb-3" style={{ fontFamily: font.primary }}>
                TicketAnywhere
              </h3>
              <h4 className="text-2xl font-semibold mb-3 text-muted-foreground" style={{ fontFamily: font.primary }}>
                Summer Music Festival 2025
              </h4>
              <p className="text-lg mb-4 leading-relaxed" style={{ fontFamily: font.primary }}>
                Experience the magic of live music under the stars. Join thousands of music lovers for an unforgettable evening 
                featuring world-renowned artists, gourmet food trucks, and an electric atmosphere that will create memories to last a lifetime.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div style={{ fontFamily: font.primary }}>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Event Date:</span>
                      <span>August 15, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Start Time:</span>
                      <span>7:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Venue:</span>
                      <span>Central Park</span>
                    </div>
                  </div>
                </div>
                <div style={{ fontFamily: font.primary }}>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Ticket Price:</span>
                      <span className="font-bold text-primary">$49.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Available:</span>
                      <span>847 tickets</span>
                    </div>
                    <div style={{ fontFamily: font.mono }} className="flex justify-between text-sm">
                      <span className="font-medium">Event ID:</span>
                      <span>EVT-2025-SUM-001</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Typography Scale */}
          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold mb-4">Typography Hierarchy</h4>
            <div className="space-y-4">
              <div style={{ fontFamily: font.primary }}>
                <h1 className="text-4xl font-bold text-foreground">Hero Heading</h1>
                <p className="text-sm text-muted-foreground">48px • font-bold</p>
              </div>
              <div style={{ fontFamily: font.primary }}>
                <h2 className="text-3xl font-bold text-foreground">Section Title</h2>
                <p className="text-sm text-muted-foreground">36px • font-bold</p>
              </div>
              <div style={{ fontFamily: font.primary }}>
                <h3 className="text-2xl font-semibold text-foreground">Subsection</h3>
                <p className="text-sm text-muted-foreground">24px • font-semibold</p>
              </div>
              <div style={{ fontFamily: font.primary }}>
                <h4 className="text-xl font-semibold text-foreground">Card Title</h4>
                <p className="text-sm text-muted-foreground">20px • font-semibold</p>
              </div>
              <div style={{ fontFamily: font.primary }}>
                <p className="text-base text-foreground">
                  Body text that users read frequently. This should be comfortable and easy to scan quickly.
                  Perfect readability is essential for event descriptions and important information.
                </p>
                <p className="text-sm text-muted-foreground">16px • font-normal</p>
              </div>
              <div style={{ fontFamily: font.primary }}>
                <p className="text-sm text-muted-foreground">
                  Secondary information, captions, and metadata that supports the main content.
                </p>
                <p className="text-xs text-muted-foreground">14px • font-normal</p>
              </div>
              <div style={{ fontFamily: font.mono }}>
                <code className="bg-muted px-3 py-2 rounded text-sm block">
                  // Monospace for technical content
                  const ticket = await purchaseTicket(eventId, userId);
                </code>
                <p className="text-sm text-muted-foreground mt-1">14px • {font.mono}</p>
              </div>
            </div>
          </div>

          {/* Implementation Button */}
          <div className="border-t pt-6">
            <Button 
              className="w-full" 
              variant={isCurrent ? "secondary" : "default"}
              disabled={isCurrent}
              onClick={onApply}
            >
              {isCurrent ? (
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Currently Applied
                </div>
              ) : (
                `Apply ${font.name}`
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
