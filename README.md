# 📝 PestBinn – Pastebin Lite

PestBinn is a lightweight, fast, and serverless **Pastebin-like web application** built using **Next.js App Router** and **Upstash Redis**.  
It allows users to create, share, and view text pastes via public links — **no authentication required**.

🌐 **Live Demo:** https://pastebinn.vercel.app/

---

## 🚀 Features

- 🔗 Create and share text pastes instantly
- 🌍 Public access (no login required)
- ⏳ Optional time-based expiration (TTL)
- 👁️ Optional maximum view limits
- 🧹 Auto-deletes expired or over-viewed pastes
- ⚡ Serverless API using Next.js App Router
- 🧠 Redis-based persistence using Upstash
- ❤️ Health check API for monitoring

---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Next.js Route Handlers
- **Database:** Upstash Redis
- **Deployment:** Vercel
- **Package Manager:** pnpm / npm / yarn

---

## 📁 Project Structure

pastebin/

├── app/

│ ├── api/

│ │ ├── pastes/

│ │ │ ├── route.ts

│ │ │ └── [id]/route.ts

│ │ └── healthz/route.ts


│ ├── p/[id]/page.tsx

│ ├── page.tsx

│ └── layout.tsx

│

├── lib/

│ ├── redis.ts

│ └── time.ts

│

├── .env.local

├── package.json

└── README.md


---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
logicluminaryanurag_KV_REST_API_URL=your_upstash_redis_url
logicluminaryanurag_KV_REST_API_TOKEN=your_upstash_redis_token
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---
Installation & Local Setup

```1️⃣ Clone the Repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

```2️⃣ Install Dependencies
pnpm install
or
npm install
or
npm install
```

```3️⃣ Run the Development Server
pnpm dev
```
---
Health Check

API: GET /api/healthz
{ "ok": true }

OR you can follow bellow steps easily:-



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.




---
Author
---
Anurag Pandey
🌐 Portfolio: https://my-portfolio-wheat-zeta-89.vercel.app/

📧 Email: anurag.application799@gmail.com

📱 Phone: +91-7991845638

---