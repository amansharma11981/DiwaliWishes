# 🚀 Free Forever Deployment Guide for DiwaliWish

This guide details the easiest, **100% free forever** methods to deploy and host the **DiwaliWish** website online with custom domains, automatic SSL certificates, and zero recurring maintenance costs.

---

## 🎯 Architecture for 100% Free Hosting

| Layer | Recommended Free Provider | Free Tier Benefits | Alternative Free Options |
|---|---|---|---|
| **Frontend** | **[Vercel](https://vercel.com)** | Free forever, unlimited personal projects, global CDN, automatic SSL (`.vercel.app` & custom domains), instant CI/CD on git push. | [Netlify](https://netlify.com), [Cloudflare Pages](https://pages.cloudflare.com), [GitHub Pages](https://pages.github.com) |
| **Backend** | **[Render](https://render.com)** | Free Web Service (Node.js runtime, 750 free hours/month, automatic HTTPS). | [Koyeb](https://koyeb.com), [Railway](https://railway.app), [Fly.io](https://fly.io) |

> **Bonus**: DiwaliWish frontend has a built-in curated fallback engine. Even if you deploy **only the frontend**, 100% of the features (card creator, interactive festival canvas, sound effects, gallery, and wish generation) will work indefinitely without ever needing a server!

---

## 📋 Step 1: Push Project to GitHub

1. Initialize git in your local directory (if not already done):
   ```bash
   cd d:\DiwaliWishes
   git init
   git add .
   git commit -m "Initial DiwaliWish release"
   ```
2. Create a new repository on [GitHub](https://github.com/new) named `diwali-wish`.
3. Link and push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/diwali-wish.git
   git branch -M main
   git push -u origin main
   ```

---

## 🌐 Step 2: Deploy Frontend on Vercel (Free Forever)

1. Sign up / Log in to [Vercel](https://vercel.com/) with your GitHub account.
2. Click **"Add New Project"** and select your `diwali-wish` repository.
3. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click "Edit" and choose `frontend`.
   - **Build Command**: `npm run build` *(auto-detected)*
   - **Output Directory**: `dist` *(auto-detected)*
4. Under **Environment Variables** (Optional, if you deploy backend):
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-name.onrender.com/api`
5. Click **"Deploy"**.
6. In ~45 seconds, your site will be live at `https://diwali-wish-xyz.vercel.app`!

---

## ⚙️ Step 3: Deploy Backend on Render (Free Forever)

1. Sign up / Log in to [Render](https://render.com/) with GitHub.
2. Click **"New +"** → **"Web Service"**.
3. Select your `diwali-wish` repository.
4. Configure the web service:
   - **Name**: `diwaliwish-api`
   - **Region**: Choose the closest region (e.g., Singapore or Frankfurt).
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. Scroll down to **Environment Variables** and add:
   - `NODE_ENV` = `production`
   - `PORT` = `3001`
   - `FRONTEND_URL` = `https://your-frontend.vercel.app` *(your Vercel URL from Step 2)*
   - `AI_PROVIDER` = `gemini` *(or `fallback`)*
   - `GEMINI_API_KEY` = `your_google_gemini_api_key_here` *(optional)*
6. Click **"Create Web Service"**.
7. Copy your backend URL: `https://diwaliwish-api.onrender.com`.

---

## 🔗 Step 4: Connect Frontend to Backend

1. Go back to your [Vercel Dashboard](https://vercel.com/dashboard) → select your `frontend` project.
2. Go to **Settings** → **Environment Variables**.
3. Add or update:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://diwaliwish-api.onrender.com/api`
4. Go to **Deployments** → click the three dots (`...`) on the latest deployment → **"Redeploy"**.

Your full-stack application is now permanently live!

---

## 🔄 How the Perpetual Diwali Rollover Works

The countdown system in `frontend/src/utils/helpers.js` uses an exact astronomical calendar:

1. **On Diwali Day (e.g. November 8, 2026)**:
   - The platform enters **Celebration Mode**:
   - Displays *"Today is Diwali 2026! Shubh Deepavali!"*
   - Counts down the hours, minutes, and seconds remaining in today's festival day.
2. **When Diwali Day Ends (Midnight 23:59:59)**:
   - The moment the clock strikes `00:00:00` on the next day, the algorithm automatically rolls over to the **next year's Diwali**:
   - `2026-11-08` → advances to `2027-10-29` (Diwali 2027)
   - `2027-10-29` → advances to `2028-10-17` (Diwali 2028)
   - `2028-10-17` → advances to `2029-11-05` (Diwali 2029)
   - ...and so on.
3. **Beyond 2040**:
   - Uses the astronomical **19-year Metonic cycle** (`year - 19`), ensuring accurate Kartik Amavasya date calculations forever without ever requiring code updates or maintenance!
