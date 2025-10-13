# StadsBingo Project

A **Next.js** application using **PostgreSQL** and **Prisma**, containerized with **Docker** for easy development and deployment.

---

## Table of Contents

- [StadsBingo Project](#stadsbingo-project)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Requirements](#requirements)
  - [Setup](#setup)
  - [Development](#development)
  - [Prisma](#prisma)
  - [Database](#database)
  - [Running on Another Device](#running-on-another-device)
  - [Notes](#notes)
  - [Quick Start (1–2 Commands)](#quick-start-12-commands)
  - [Optional Tips](#optional-tips)

---

## Tech Stack

This project uses a **modern full-stack setup** designed for real-time interactive apps:

- **Frontend / Fullstack**
  - [Next.js](https://nextjs.org/) (React framework with API routes, SSR, SSG)
  - [TailwindCSS](https://tailwindcss.com/) (utility-first styling)
  - [shadcn/ui](https://ui.shadcn.com/) (prebuilt UI components with Tailwind)

- **Backend / API**
  - Next.js API Routes (handles submissions & approvals)
  - Optional: **Socket.IO** (for real-time teacher/student updates)
  - Simpler alternative: polling with SWR/React Query

- **Database & ORM**
  - [PostgreSQL](https://www.postgresql.org/) (relational database, runs in Docker)
  - [Prisma](https://www.prisma.io/) (type-safe ORM, migrations, client)

- **Auth**
  - [NextAuth.js](https://authjs.dev/) for authentication (students & teachers)

- **Development & Deployment**
  - [Docker + Docker Compose](https://docs.docker.com/compose/) (portable setup)
  - Local: `docker-compose up` to run database
  - Local: `Npm run dev` to run server
  - Deployment options: Vercel (with external DB)

- **Map Integration**
  - [Leaflet.js](https://leafletjs.com/) or [Mapbox](https://www.mapbox.com/) to display interactive city maps with pinpoints

---

## Requirements

- [Docker](https://www.docker.com/get-started)  
- [Docker Compose](https://docs.docker.com/compose/install/)  

---

## Setup

1. **Clone the repository:**

```bash
git clone git@github.com:daveymunters87/StadsBingo.git
cd project
```

2. **Create a .env file:**

Copy `.env.example` to `.env` (or create one) and update if necessary:

```env
DATABASE_URL="postgresql://myuser:mypassword@db:5432/mydb?schema=public"
```

> `db` is the Docker service name defined in `docker-compose.yml`.

3. **Start the PostgreSQL container:**

```bash
docker-compose up -d
```

- Database will run in the background.
- Data is persisted in the Docker volume pgdata.

if you get any error after building please run: (Outside docker container)
```bash
Npm install
```

---

## Development

Once backend is running, you can start your frontend with:

```bash
npm install
npx prisma generate
npm run dev
```

- Your changes to Next.js pages or API routes update immediately at http://localhost:3000
- No need to rebuild Docker for app changes.

---

## Prisma

**Generate Prisma client:**
```bash
docker-compose exec app npx prisma generate
```

**Run migrations:**
```bash
docker-compose exec app npx prisma migrate dev --name init
```

**Open Prisma Studio:**
```bash
docker-compose exec app npx prisma studio
```

Prisma Studio lets you browse and edit your database via a web interface.

---

## Database

- PostgreSQL runs in Docker (`docker-compose.yml`) for consistent setup across developers.
- Default credentials are set in `.env` (see `DATABASE_URL`).
- Data is persisted in a Docker volume `pgdata`.

---

## Running on Another Device

1. Clone the repository on the new device.
2. Copy `.env` with the correct `DATABASE_URL`.
3. Start PostgreSQL:

```bash
docker-compose up -d
```

4. Install dependencies and start Next.js locally:

```bash
npm install
npx prisma generate
npm run dev
```

---

## Notes

- `.dockerignore` prevents large local files (`node_modules`, `.next`, `.git`) from being sent to Docker during build.
- You don’t need Docker for the app in development — only PostgreSQL.

---

## Quick Start (1–2 Commands)

```bash
git clone git@github.com:daveymunters87/StadsBingo.git
cd project
docker-compose up -d
npm install
npm run dev 
```

Then open http://localhost:3000 to access the app.

---

## Optional Tips
- **Stop containers:** `docker-compose down`
- **Format repository:** `npx biome format --write`
- **Access app shell:** `docker-compose exec app sh`
- **Check logs:** `docker-compose logs -f`
- **Regenerate Prisma client after schema changes** `npx prisma generate`
