# 🎯 StadsBingo - Simplified Version

Een **vereenvoudigde bingo-applicatie** voor scholen waarbij leerlingen opdrachten uitvoeren in de stad en docenten deze beoordelen.

> **Examen Project** - Bit Academy  
> Ontwikkeld door: Davey & Jada  
> Periode: November 2025

---

## 📋 Table of Contents

- [🎯 StadsBingo - Simplified Version](#-stadsbingo---simplified-version)
  - [📋 Table of Contents](#-table-of-contents)
  - [📖 Project Omschrijving](#-project-omschrijving)
  - [✨ Features](#-features)
    - [Voor Leerlingen (Students)](#voor-leerlingen-students)
    - [Voor Docenten (Teachers)](#voor-docenten-teachers)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [📦 Requirements](#-requirements)
  - [🚀 Quick Start](#-quick-start)
  - [⚙️ Setup Details](#️-setup-details)
    - [1️⃣ Clone \& Navigate](#1️⃣-clone--navigate)
    - [2️⃣ Environment Variables](#2️⃣-environment-variables)
    - [3️⃣ Start PostgreSQL](#3️⃣-start-postgresql)
    - [4️⃣ Install Dependencies](#4️⃣-install-dependencies)
    - [5️⃣ Database Setup](#5️⃣-database-setup)
    - [6️⃣ Start Development](#6️⃣-start-development)
  - [🗄️ Database](#️-database)
  - [🔧 Prisma Commands](#-prisma-commands)
  - [📱 Development Workflow](#-development-workflow)
    - [Voor nieuwe features:](#voor-nieuwe-features)
    - [Code Quality:](#code-quality)
  - [🎓 Examen Informatie](#-examen-informatie)
  - [💡 Optional Tips](#-optional-tips)
  - [👥 Team](#-team)
  - [📝 License](#-license)

---

## 📖 Project Omschrijving

**StadsBingo** is een webapplicatie waarbij leerlingen opdrachten uitvoeren in de stad en docenten deze live kunnen beoordelen.

**Kernfunctionaliteit:**
- Leerlingen zien een lijst met opdrachten
- Leerlingen kunnen opdrachten "claimen" met een tekstantwoord
- Docenten zien alle inzendingen en kunnen goedkeuren/afkeuren
- Status updates zichtbaar voor leerlingen

**Vereenvoudigd concept:**
- ✅ Geen realtime WebSockets (simpele page refresh)
- ✅ Geen kaart/map integratie (gewoon een lijst)
- ✅ Geen bestand uploads (alleen text antwoorden)
- ✅ Focus op core functionaliteit voor examen eisen

---

## ✨ Features

### Voor Leerlingen (Students)
- 📝 Bekijk alle beschikbare opdrachten
- ✍️ Dien opdrachten in met een tekstantwoord
- 📊 Zie de status van je inzendingen (pending/approved/rejected)
- 💬 Ontvang feedback van docenten

### Voor Docenten (Teachers)
- 👀 Bekijk alle ingediende opdrachten
- ✅ Keur opdrachten goed of af
- 💭 Geef feedback aan leerlingen
- 📈 Overzicht van alle inzendingen

---

## 🛠️ Tech Stack

**Frontend & Backend:**
- [Next.js 15](https://nextjs.org/) - React framework met API routes
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI componenten

**Database & ORM:**
- [PostgreSQL](https://www.postgresql.org/) - Relational database (Docker)
- [Prisma](https://www.prisma.io/) - Type-safe ORM

**Development:**
- [Docker](https://www.docker.com/) - Database containerization
- [Biome](https://biomejs.dev/) - Linting & formatting

**Wat we NIET gebruiken** (om het simpel te houden):
- ❌ NextAuth (simpele role-based views)
- ❌ Socket.IO (geen realtime needed)
- ❌ Map libraries (geen kaart integratie)
- ❌ File upload libraries (alleen text)

---

## 📦 Requirements

- [Node.js](https://nodejs.org/) (v18 of hoger)
- [Docker](https://www.docker.com/get-started)  
- [Docker Compose](https://docs.docker.com/compose/install/)  

---

## 🚀 Quick Start

```bash
# 1. Clone de repository
git clone git@github.com:daveymunters87/StadsBingo.git
cd StadsBingo/project

# 2. Start de database (Docker)
docker-compose up -d

# 3. Install dependencies
npm install

# 4. Setup database
npx prisma generate
npx prisma migrate dev --name init

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser! 🎉

---

## ⚙️ Setup Details

### 1️⃣ Clone & Navigate
```bash
git clone git@github.com:daveymunters87/StadsBingo.git
cd StadsBingo/project
```

### 2️⃣ Environment Variables
Maak een `.env` bestand in de `project/` folder:

```env
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydb?schema=public"
```

> **Note:** Voor lokale development gebruik je `localhost`. `db` is de Docker service naam in `docker-compose.yml`.

### 3️⃣ Start PostgreSQL
```bash
docker-compose up -d
```

Database draait nu op de achtergrond. Data wordt opgeslagen in Docker volume `pgdata`.

### 4️⃣ Install Dependencies
```bash
npm install
```

### 5️⃣ Database Setup
```bash
# Genereer Prisma client
npx prisma generate

# Run migrations (maakt de tabellen aan)
npx prisma migrate dev --name init

# (Optioneel) Seed database met test data
npx prisma db seed
```

### 6️⃣ Start Development
```bash
npm run dev
```

App draait nu op: http://localhost:3000

---

## 🗄️ Database

**PostgreSQL draait in Docker** voor consistente setup tussen developers.

**Belangrijke commando's:**
```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# Stop database en verwijder data (fresh start)
docker-compose down -v

# Bekijk database logs
docker-compose logs -f db
```

**Default credentials** (zie `.env`):
- User: `myuser`
- Password: `mypassword`
- Database: `mydb`
- Port: `5432`

---

## 🔧 Prisma Commands

```bash
# Genereer Prisma Client (na schema wijzigingen)
npx prisma generate

# Maak nieuwe migration
npx prisma migrate dev --name beschrijving_van_wijziging

# Reset database (WAARSCHUWING: verwijdert alle data!)
npx prisma migrate reset

# Open Prisma Studio (database GUI)
npx prisma studio
```

**Prisma Studio** opent op http://localhost:5555 en laat je database data bekijken/bewerken.

---

## 📱 Development Workflow

### Voor nieuwe features:
1. **Maak een nieuwe branch**
   ```bash
   git checkout -b feature/naam-van-feature
   ```

2. **Bouw de feature**
   - Wijzig Prisma schema indien nodig → `npx prisma migrate dev`
   - Schrijf code
   - Test lokaal

3. **Commit je werk**
   ```bash
   git add .
   git commit -m "feat: beschrijving van feature"
   ```

4. **Push en maak Pull Request**
   ```bash
   git push origin feature/naam-van-feature
   ```

### Code Quality:
```bash
# Check code quality
npm run lint

# Format code
npm run format
```

---

## 🎓 Examen Informatie

Dit project is onderdeel van het **Software Developer examen** bij Bit Academy.

**Examen Eisen die dit project voldoet:**

✅ **Opdracht 1:** User stories, planning, voortgangsbewaking  
✅ **Opdracht 2:** UML diagrammen (ERD + Sequence)  
✅ **Opdracht 3:** Werkende applicatie met:
   - Frontend + Backend + Database
   - 10+ bestanden met code
   - Git (10+ commits, 2+ branches, pull requests)
   - Non-CRUD functionaliteit (approve/reject workflow)

✅ **Opdracht 4:** Geautomatiseerde tests  
✅ **Opdracht 5:** Verbetervoorstellen  

**Documentatie:** Zie `/examen` folder voor alle bewijsmateriaal.

---

## 💡 Optional Tips

```bash
# Stop alle containers
docker-compose down

# Format hele repository
npx biome format --write

# Bekijk Docker logs
docker-compose logs -f

# Rebuild Docker containers (bij problemen)
docker-compose down
docker-compose up -d --build
```

---

## 👥 Team

- **Davey Munters** - Developer
- **Jada** - Developer

---

## 📝 License

Dit is een educatief project voor Bit Academy.
