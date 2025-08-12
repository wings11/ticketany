# 🎨 Typography & Font System

## Current Font Implementation: **Poppins + Fira Code**

Your event ticketing system now features a modern, customizable font system with multiple professionally curated font combinations. Each pairing has been carefully selected to provide excellent readability, personality, and brand alignment.

## 🚀 **Available Font Combinations**

### 1. **Poppins + Fira Code** *(Current)*
- **Personality**: Friendly & Modern
- **Primary Font**: Poppins (Geometric sans-serif)
- **Monospace Font**: Fira Code (With programming ligatures)
- **Best For**: Event platforms, friendly brands, modern UIs
- **Character**: Rounded, approachable, warm

### 2. **Inter + JetBrains Mono**
- **Personality**: Clean & Professional  
- **Primary Font**: Inter (Highly optimized for UI)
- **Monospace Font**: JetBrains Mono (Developer-focused)
- **Best For**: Professional platforms, fintech, SaaS
- **Character**: Neutral, clean, excellent readability

### 3. **DM Sans + Space Mono**
- **Personality**: Minimalist & Tech
- **Primary Font**: DM Sans (Geometric, low-contrast)
- **Monospace Font**: Space Mono (Retro-futuristic)
- **Best For**: Tech startups, minimal designs, modern brands
- **Character**: Clean, geometric, contemporary

### 4. **Plus Jakarta Sans + Source Code Pro**
- **Personality**: Contemporary & Warm
- **Primary Font**: Plus Jakarta Sans (Humanist, Indonesian-inspired)
- **Monospace Font**: Source Code Pro (Clean, readable)
- **Best For**: International brands, warm technology, community platforms
- **Character**: Humanist, cultural, welcoming

### 5. **Outfit + Inconsolata**
- **Personality**: Bold & Modern
- **Primary Font**: Outfit (Strong geometric forms)
- **Monospace Font**: Inconsolata (Simple, readable)
- **Best For**: Bold brands, fashion, entertainment
- **Character**: Strong, confident, attention-grabbing

## 🎯 **Font Features**

### **Modern Typography Stack**
- **Google Fonts Integration**: Self-hosted for performance
- **Font Feature Settings**: Ligatures and contextual alternates enabled
- **Letter Spacing**: Optimized for headings (-0.02em)
- **Font Loading**: Optimized with `display=swap`

### **Responsive Typography**
```css
/* Heading Hierarchy */
h1: 48px (3rem) - Hero titles
h2: 36px (2.25rem) - Section titles  
h3: 24px (1.5rem) - Subsections
h4: 20px (1.25rem) - Card titles
Body: 16px (1rem) - Main content
Small: 14px (0.875rem) - Secondary info
```

### **Font Weights Available**
- **100-900**: Complete weight range
- **Italic Support**: Full italic variants
- **Monospace**: Programming ligatures (Fira Code)

## 🛠 **Implementation Details**

### **CSS Variables**
The system uses CSS custom properties for dynamic font switching:
```css
:root {
  --font-primary: 'Poppins', sans-serif;
  --font-mono: 'Fira Code', monospace;
}
```

### **Tailwind Configuration**
```javascript
fontFamily: {
  sans: ['Poppins', 'sans-serif'],
  mono: ['Fira Code', 'monospace'],
}
```

### **Font Loading Strategy**
- **Dynamic Loading**: Fonts load on-demand when switched
- **Local Storage**: User preferences are preserved
- **Performance**: Optimized loading with font-display: swap

## 🎨 **Design Principles**

### **Readability First**
- Minimum 16px body text
- Optimal line height (1.5-1.6)
- Sufficient color contrast
- Clear hierarchy

### **Brand Personality**
Each font combination conveys different emotions:
- **Poppins**: Friendly, approachable, modern
- **Inter**: Professional, neutral, trustworthy  
- **DM Sans**: Clean, minimal, tech-forward
- **Plus Jakarta**: Warm, international, inclusive
- **Outfit**: Bold, confident, memorable

### **Technical Excellence**
- OpenType features enabled
- Kerning and ligatures optimized
- Proper fallback fonts
- Responsive scaling

## 🔧 **Usage Instructions**

### **Switching Fonts**
1. Visit `/fonts` page in your application
2. Preview different combinations
3. Click "Apply" on your preferred choice
4. Changes take effect immediately
5. Preference is saved locally

### **Custom Implementation**
```typescript
import { useFontSwitcher } from '@/components/FontProvider'

const { currentFont, fontOptions, switchFont } = useFontSwitcher()

// Switch to a specific font
switchFont('Inter + JetBrains Mono')
```

## 📱 **Mobile Optimization**

All fonts are optimized for mobile devices:
- **Touch-friendly**: Minimum 44px touch targets
- **Readable**: Optimized for small screens
- **Performance**: Efficient loading on slow connections
- **Accessibility**: WCAG 2.1 compliant contrast ratios

## 🎭 **Use Cases by Industry**

### **Events & Entertainment** → Poppins + Fira Code
Friendly, approachable, perfect for consumer-facing event platforms

### **Business & Finance** → Inter + JetBrains Mono  
Professional, trustworthy, excellent for B2B applications

### **Technology & Startups** → DM Sans + Space Mono
Modern, minimal, great for tech-forward brands

### **Community & Social** → Plus Jakarta Sans + Source Code Pro
Warm, inclusive, perfect for diverse user bases

### **Fashion & Lifestyle** → Outfit + Inconsolata
Bold, memorable, ideal for brand-focused platforms

---

**Current Status**: ✅ Poppins + Fira Code applied
**Last Updated**: August 12, 2025
**Performance**: Optimized for web and mobile
**Accessibility**: WCAG 2.1 AA compliant
