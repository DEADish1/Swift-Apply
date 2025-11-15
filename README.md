# Swift Apply

Your Personal Job Search Assistant - a web app that helps users build strong ATS-friendly resumes, find jobs near them (and remote), and track applications with tailored resume suggestions for each posting.

## Features

- **Smart Resume Builder**: Answer simple questions about your experience and get professional, ATS-friendly bullet points
- **Job Matching**: Find local and remote jobs that fit your skills with match scores and improvement suggestions
- **Application Tracker**: Keep track of every application in one place

## Tech Stack

- **Frontend**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database & Auth**: Supabase (Postgres + Auth)
- **Deployment**: Vercel / Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for database and auth)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/swift-apply.git
cd swift-apply
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── ui/             # Base UI components (Button, etc.)
│   ├── layout/         # Layout components
│   └── forms/          # Form components
├── lib/                # Utility libraries
│   └── supabase/       # Supabase client configuration
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
└── utils/              # Helper functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Target Users

- Hourly workers (delivery, retail, warehouse, restaurant, hospitality)
- Entry-level candidates
- Career changers
- Job seekers who need help with resume writing and application tracking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.
