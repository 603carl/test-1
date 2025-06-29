# Smart Algos Hedge Fund

A sophisticated institutional hedge fund platform built with React, TypeScript, Supabase, and Stripe.

## Features

- **Algorithmic Trading Solutions**: Professional trading bots and analysis tools
- **Secure Payment Processing**: PCI DSS compliant payment system with Stripe
- **Investment Management**: Portfolio tracking and performance analytics
- **Market Analysis**: AI-powered market predictions and news analysis
- **Security Center**: Enterprise-grade security monitoring and audit logging
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **Payments**: Stripe
- **Deployment**: Vercel
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smart-algos-hedge-fund
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your Supabase and Stripe credentials in `.env`.

4. Run the development server:
```bash
npm run dev
```

### Database Setup

1. Create a new Supabase project
2. Run the migrations in the `supabase/migrations` folder
3. Set up your environment variables

### Deployment

The app is optimized for Vercel deployment:

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

## Security Features

- Multi-factor authentication
- Rate limiting
- Input sanitization
- Audit logging
- Real-time security monitoring
- PCI DSS compliance
- AES-256 encryption

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── pages/              # Page components
└── main.tsx           # App entry point

supabase/
├── functions/          # Edge functions
└── migrations/         # Database migrations
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary and confidential."# test-1" 
