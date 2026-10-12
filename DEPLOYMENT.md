# Arena 2026: Vercel Deployment Guide

The website is production-ready and optimized for zero-ops deployment on Vercel's free tier.

---

## Step 1: Push Code to GitHub

If you haven't already linked your remote repository:
```bash
git remote add origin https://github.com/YOUR_USERNAME/Arena-website.git
git branch -M main
git push -u origin main
```

---

## Step 2: Import into Vercel

1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New... > Project**.
3. Select your GitHub repository **`Arena-website`**.
4. Vercel will automatically detect:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `./`
   - **Build Command**: `next build`
   - **Output Directory**: `.next`

---

## Step 3: Configure Environment Variables

Under **Environment Variables**, add:
- `NEXT_PUBLIC_SHEET_ID`: The ID of your public Google Spreadsheet (e.g., `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`).
- *(Optional)* `GOOGLE_SHEETS_API_KEY`: Your Google Cloud API Key (only required if using API v4 instead of the public CSV export).

---

## Step 4: Deploy & Verify

1. Click **Deploy**.
2. Within ~60 seconds, your site will be live at `https://arena-2026-yourname.vercel.app`.
3. Test your live URL:
   - Check the live countdown on Home.
   - Verify the 9 sports appear.
   - Test `/schedule`, `/teams`, and `/results`.

---

## Step 5: (Optional) Connect Custom Domain

1. In your Vercel project settings, go to **Settings > Domains**.
2. Add your custom domain (e.g., `arena.dtu.ac.in` or `arena2026.in`).
3. Add the DNS CNAME/A records provided by Vercel in your domain registrar.
