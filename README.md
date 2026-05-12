# OfferSpark

OfferSpark is an AI mini web app that turns rough business input into a sales-ready offer, headline, Instagram post, and email pitch.

## Run locally

```bash
npm install
cp .env.example .env.local
```

Add your OpenAI API key to `.env.local`:

```bash
OPENAI_API_KEY=your_key_here
```

Then run:

```bash
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Add `OPENAI_API_KEY` in Vercel → Project Settings → Environment Variables.
4. Deploy.

## Stack

- Next.js App Router
- React
- Tailwind CSS
- OpenAI Responses API
- Vercel-ready API route
