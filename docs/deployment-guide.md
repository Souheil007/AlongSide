# Alongside — Production Deployment & Cloud Architecture Guide
**Author:** Chief Technology Officer (CTO)  
**Status:** Canonical Deployment Operations Guide  
**Hosting Model:** 100% Free Cloud Infrastructure ($0.00 / month)  
**Last Updated:** 2026-11-19  

---

## 1. Executive Summary & Architecture Map

Alongside is deployed across a decoupled, three-tier cloud architecture utilizing the industry-standard free tiers of **Supabase**, **Render**, and **Vercel**. This architecture ensures zero hosting costs while providing production-grade SSL/HTTPS, global CDN edge caching, and interactive OpenAPI documentation.

```mermaid
graph TD
    User["Parent / Browser Client"] -->|"HTTPS / Web Visits"| Vercel["Vercel (Hobby Tier - $0/mo)<br/>apps/web (Next.js 15 App Router)<br/>https://along-side-theta.vercel.app"]
    Vercel -->|"REST API Requests & SSE Chat"| Render["Render (Free Web Service - $0/mo)<br/>apps/api (Fastify v5 + Node.js 22)<br/>https://alongside-api-2uqw.onrender.com"]
    Render -->|"Interactive OpenAPI Specs"| Swagger["Swagger UI Dashboard<br/>https://alongside-api-2uqw.onrender.com/docs"]
    Render -->|"PostgreSQL Pooler (IPv4 Port 5432)"| Supabase["Supabase (Free Tier - $0/mo)<br/>PostgreSQL 16 + pgvector<br/>aws-1-eu-west-1.pooler.supabase.com"]
```

---

## 2. Platforms & Services Used

| Component | Cloud Platform | Free Tier Specifications | Live Production Resource |
| :--- | :--- | :--- | :--- |
| **Database** | **Supabase** (`supabase.com`) | 500 MB PostgreSQL 16, dedicated `pgvector` vector extension, automatic backup snapshots, Supavisor connection pooling. | **Host:** `aws-1-eu-west-1.pooler.supabase.com:5432`<br/>**Project Ref:** `jegozhwbsegqyyqipzdf` |
| **Backend API** | **Render** (`render.com`) | 512 MB RAM, 0.1 CPU, automated GitHub CI/CD, SSL certificates, zero-config Fastify server. | **URL:** [https://alongside-api-2uqw.onrender.com](https://alongside-api-2uqw.onrender.com)<br/>**Docs:** [https://alongside-api-2uqw.onrender.com/docs](https://alongside-api-2uqw.onrender.com/docs) |
| **Frontend Web** | **Vercel** (`vercel.com`) | Global Edge CDN, automated Next.js 15 App Router builds, image optimization, HTTPS domains. | **Root Directory:** `apps/web`<br/>**URL:** [https://along-side-theta.vercel.app](https://along-side-theta.vercel.app) |

---

## 3. Cloud Configuration & Environment Variables

### 3.1 Backend Configuration (Render Dashboard)
* **Build Command:**
  ```bash
  npm install && npx prisma generate --schema=packages/database/prisma/schema.prisma
  ```
* **Start Command:**
  ```bash
  npx tsx apps/api/src/index.ts
  ```
* **Environment Variables in Render:**

| Variable | Recommended Value | Purpose |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Enforces production performance and strict security assertions. |
| `PORT` | `4000` | Port Fastify listens on (or mapped by host). |
| `HOST` | `0.0.0.0` | Binds to all network interfaces. |
| `DATABASE_URL` | `postgresql://postgres.jegozhwbsegqyyqipzdf:[PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:5432/postgres` | Supabase IPv4 Session Pooler connection string. |
| `JWT_SECRET` | `[64-character random string]` | Secret for signing stateless parent session tokens (min. 32 chars). |
| `COOKIE_SECRET` | `[64-character random string]` | Secret for signing `alongside_session` cookies (min. 32 chars). |
| `CORS_ORIGIN` | `https://along-side-theta.vercel.app` | Matches your production Vercel frontend URL. |
| `OPENAI_API_KEY` | `sk-...` | Optional: for live 24/7 AI Child Advisor responses. |

---

### 3.2 Frontend Configuration (Vercel Dashboard)
* **Framework Preset:** `Next.js`
* **Root Directory:** `apps/web`
* **Environment Variables in Vercel:**

| Variable | Environment | Value | Purpose |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Production & Preview | `https://alongside-api-2uqw.onrender.com` | Base URL of your live Render Fastify API. |
| `NEXT_PUBLIC_APP_URL` | Production & Preview | `https://along-side-theta.vercel.app` | Base URL of your Vercel frontend. |

---

## 4. Continuous Deployment Workflow (When Adding Commits to `main`)

Whenever you merge a Pull Request or push commits to the `main` branch, the deployment process depends on what part of the monorepo changed:

```mermaid
flowchart TD
    Commit["New Commit Merged into 'main'"] --> Check{"What files changed?"}
    
    Check -->|"apps/web/** (Frontend UI)"| VercelAuto["Vercel Auto-Deploys<br/>• Detects apps/web changes<br/>• Runs next build<br/>• Live in ~60 seconds (100% Automated)"]
    
    Check -->|"apps/api/** (Backend API)"| RenderAuto["Render Auto-Deploys<br/>• Pulls main branch<br/>• Generates Prisma client<br/>• Restarts Fastify server in ~90s (100% Automated)"]
    
    Check -->|"packages/database/prisma/schema.prisma"| DBStep["Database Schema Changes<br/>Manual 1-Step Push Required"]
```

### Scenario A: You updated Frontend Code (`apps/web/`)
* **Action Required:** **NONE (100% Automated)**.
* Vercel monitors `main`. The moment a commit lands, Vercel initiates a production build, validates static generation across all 19 routes, and updates your live URL in ~60 seconds.

### Scenario B: You updated Backend Code (`apps/api/`)
* **Action Required:** **NONE (100% Automated)**.
* Render monitors `main`. The moment a commit lands, Render triggers the build command, regenerates Prisma types, and restarts your Fastify service with zero downtime in ~90 seconds.

### Scenario C: You modified the Database Schema (`packages/database/prisma/schema.prisma`)
* When adding a new table, relation, or column to Prisma:
  1. Open PowerShell on your local machine.
  2. Push the schema updates directly to your live Supabase database:
     ```powershell
     $env:DATABASE_URL="postgresql://postgres.jegozhwbsegqyyqipzdf:YOUR_PASSWORD@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"
     npx prisma db push --schema=packages/database/prisma/schema.prisma
     ```
  3. (Optional) If you added new seed data (e.g. new Academy courses or FAQs), run:
     ```powershell
     npm run db:seed
     ```
  4. Commit and push your code changes to GitHub. Render and Vercel will auto-deploy the updated application logic.

---

## 5. Day-to-Day Operations & Free-Tier Maintenance

### 5.1 Keeping Render Free Tier Awake (Preventing Cold Starts)
* **Behavior:** Free Web Services on Render automatically spin down (sleep) after **15 minutes of zero traffic**. When someone visits your website after an idle period, the first API request takes ~30 seconds to wake up (subsequent requests are instant).
* **The Free Solution:**
  1. Create a free account on [UptimeRobot](https://uptimerobot.com).
  2. Click **Add New Monitor**:
     - **Monitor Type:** `HTTP(s)`
     - **Friendly Name:** `Alongside API Health`
     - **URL:** `https://alongside-api-2uqw.onrender.com/api/v1/health`
     - **Monitoring Interval:** Every `10 minutes`.
  3. Click **Create Monitor**.
  4. UptimeRobot will ping your `/api/v1/health` endpoint every 10 minutes, keeping your Fastify server permanently warm and responsive 24/7 at **$0 cost**.

### 5.2 Checking Production Logs
* **Backend Errors / Logs:**
  - Open Render Dashboard ➡️ Click `alongside-api` ➡️ Click **Logs**.
  - All Fastify Pino logs and unhandled requests appear in realtime.
* **Frontend Errors / Analytics:**
  - Open Vercel Dashboard ➡️ Click `alongside-web` ➡️ Click **Deployments** or **Logs**.
* **Database Records & Tables:**
  - Open Supabase Dashboard ➡️ Click **Table Editor** on the left.
  - You can visually browse, edit, and filter users, children, academy lessons, and agreements.

### 5.3 Instant Rollbacks
* If a bad commit breaks production:
  - **On Vercel:** Go to **Deployments** ➡️ Find the previous working deployment ➡️ Click the three dots `...` ➡️ Click **Instant Rollback**.
  - **On Render:** Go to **Deploys** ➡️ Find the previous deployment ➡️ Click **Rollback to this deploy**.
