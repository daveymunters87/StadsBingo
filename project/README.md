# StadsBingo Project

A **Next.js** application using **PostgreSQL** and **Prisma**, fully containerized with **Docker** for easy development and deployment.

---

## Table of Contents

- [StadsBingo Project](#stadsbingo-project)
  - [Table of Contents](#table-of-contents)
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

## Requirements

- [Docker](https://www.docker.com/get-started)  
- [Docker Compose](https://docs.docker.com/compose/install/)  

> No need to install Node.js, PostgreSQL, or Prisma globally; everything runs inside Docker containers.

---

## Setup

1. **Clone the repository:**

```bash
git clone <your-repo-url>
cd project
```

2. **Create a .env file:**

Copy `.env.example` to `.env` (or create one) and update if necessary:

```env
DATABASE_URL="postgresql://myuser:mypassword@db:5432/mydb?schema=public"
```

> `db` is the Docker service name defined in `docker-compose.yml`.

3. **Build and start containers:**

```bash
docker-compose up --build
```

## if you get any error after building please run: (Outside docker container)
```bash
Npm install
```

This will:

- Install Node dependencies inside the app container
- Generate the Prisma client
- Start PostgreSQL and Next.js

Next.js will be available at: http://localhost:3000

---

## Development

Once containers are built, you can start your app without rebuilding:

```bash
docker-compose up
```

- Changes to your code are automatically reflected inside the container.
- The `node_modules` folder is kept inside the container to avoid host conflicts.

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

- PostgreSQL runs in a separate container (`db`).
- Default credentials are set in `.env` (see `DATABASE_URL`).
- Data is persisted in a Docker volume `pgdata`.

---

## Running on Another Device

1. Clone the repository on the new device.
2. Copy `.env` with the correct `DATABASE_URL`.
3. Run Docker Compose:

```bash
docker-compose up --build
```

- Docker will rebuild images for the new machine.
- PostgreSQL starts fresh; database is empty unless the volume is preserved.

---

## Notes

- `.dockerignore` prevents large local files (`node_modules`, `.next`, `.git`) from being sent to Docker during build.
- The first build may take a while; subsequent starts are faster.
- This setup is fully portable: anyone with Docker can run your app without installing Node, Postgres, or Prisma locally.

---

## Quick Start (1–2 Commands)

```bash
git clone <your-repo-url>
cd project
docker-compose up --build
```

Then open http://localhost:3000 to access the app.

---

## Optional Tips

- **Stop containers:** `docker-compose down`
- **Rebuild containers:** `docker-compose up --build`
- **Access app shell:** `docker-compose exec app sh`
- **Check logs:** `docker-compose logs -f`