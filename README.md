# Care.xyz – Baby Sitting & Elderly Care Service Platform

A Next.js App Router project for booking trusted caregivers (babysitting, elderly support, special needs, recovery care). Built with server components, Mongo-backed services/bookings, and Firebase auth for email/Google login.

## Tech Stack
- Next.js 16 (App Router) + React
- Tailwind CSS (globals) for styling
- MongoDB via Mongoose for services/bookings/users (with seed fallback)
- Firebase Auth (email/password + Google)
- Nodemailer (SMTP) for booking invoice emails
- react-hot-toast for UX feedback

## Notes
- Env config: `.env.local` contains Firebase keys, `MONGO`, SMTP (`EMAIL_*`), and optional `USE_SEED_SERVICES_ONLY=1` to bypass DB during builds.
- `/homepage` is dynamic (no static prerender) to avoid build-time timeouts on Vercel.

## Scripts
- `npm run dev` – start dev server (webpack)
- `npm run build` – production build (webpack)
- `npm run start` – start production server
