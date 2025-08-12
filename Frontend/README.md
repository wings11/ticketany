# Event Ticketing Frontend

A minimalist Next.js frontend for the event ticketing platform.

## Features

- View available events
- Buy tickets
- Google OAuth authentication
- Responsive design with Tailwind CSS

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Backend Integration

This frontend connects to the Node.js backend running on `http://localhost:5001`. Make sure your backend server is running before using the frontend.

## Project Structure

- `/src/app` - Next.js App Router pages and layouts
- `/src/app/page.tsx` - Main events listing page
- `/src/app/layout.tsx` - Root layout component
- `/src/app/globals.css` - Global styles with Tailwind CSS

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
