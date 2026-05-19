# CarePulse B2B Healthcare SaaS

Frontend demo platform built with React + TypeScript to showcase authentication flows, analytics dashboards, patient management, and production-ready app architecture.

# Live Link 

https://carepulse-b2b.vercel.app

## Tech stack

- React + TypeScript (Vite)
- Zustand for app state
- Firebase Authentication
- Recharts for analytics visualizations
- Service Worker + browser notifications

## Getting started

1. Install dependencies:
   - `npm install`
2. Configure Firebase:
   - Copy `.env.example` to `.env`
   - Fill Firebase web app values for:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_APP_ID`
3. Run locally:
   - `npm run dev`

## Demo mode (no Firebase configured)

If environment variables are empty, the app runs in demo auth mode:
- Email: `dr.smith@carepulse.org`
- Password: `demo1234`

## Available routes

- `/login` - Authentication page
- `/dashboard` - Home dashboard with KPI and critical indicators
- `/analytics` - Trend chart page
- `/patients` - Directory with Grid/List toggle
- `/patients/:patientId` - Patient detail view

## Notification use case

The topbar includes an **Alert Test** button that triggers a local browser notification (via service worker) for a critical ICU alert simulation.
