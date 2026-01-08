# StadsBingo

Een **bingo-applicatie** voor school waarbij leerlingen opdrachten uitvoeren in de stad en docenten deze beoordelen.

> **Examen Project** - Bit Academy  
> leerlingen: Davey & Jada  
> Periode: December 2025

---

## Inhoudsopgave

- [StadsBingo](#stadsbingo)
  - [Inhoudsopgave](#inhoudsopgave)
  - [Project Omschrijving](#project-omschrijving)
  - [Functionaliteiten](#functionaliteiten)
    - [Voor Leerlingen](#voor-leerlingen)
    - [Voor Docenten](#voor-docenten)
  - [Technische Stack](#technische-stack)
  - [Vereisten](#vereisten)
  - [Snel Starten](#snel-starten)
  - [Installatie Details](#installatie-details)
    - [Klonen & Navigeren](#klonen--navigeren)
    - [Omgevingsvariabelen](#omgevingsvariabelen)
    - [PostgreSQL Starten](#postgresql-starten)
    - [Dependencies Installeren](#dependencies-installeren)
    - [Database Opzetten](#database-opzetten)
    - [Development Starten](#development-starten)
  - [Database](#database)
  - [Prisma Commando's](#prisma-commandos)
  - [Development Workflow](#development-workflow)
    - [Voor nieuwe features:](#voor-nieuwe-features)
    - [Code Kwaliteit:](#code-kwaliteit)
  - [Examen Informatie](#examen-informatie)
  - [Handige Tips](#handige-tips)
  - [Team](#team)
  - [Licentie](#licentie)

---

## Project Omschrijving

**StadsBingo** is een webapplicatie waarbij docenten **teams** aanmaken, leerlingen via **teamcodes** laten inloggen en opdrachten in een vaste volgorde laten uitvoeren. Docenten beoordelen de opdrachten, geven feedback en monitoren de voortgang van elk team.

**Kernworkflow:**
1. Docent maakt een team aan, koppelt leerlingen en genereert een teamcode.
2. Leerlingen loggen in met de teamcode en zien de opdrachten die voor hun team beschikbaar zijn.
3. Elke opdracht kent één van de statussen: `Locked`, `Available`, `Pending`, `Feedback`, `Approved`.
4. Leerlingen leveren fotobestanden in; docenten beoordelen en geven feedback.
5. Bij `Approved` wordt de volgende opdracht vrijgegeven; bij `Feedback` krijgt de leerling een notificatie om opnieuw in te leveren.
6. Docenten hebben filters op team, leerling en kunnen hierom visuele voortgang per team zien.

---

## Functionaliteiten

### Voor Leerlingen
- Inloggen met teamcode en beveiligde toegang per team
- Opdrachtenlijst met statussen (`Locked`, `Available`, `Pending`, `Feedback`, `Approved`)
- Opdrachten indienen en feedback verwerken
- Visuele voortgang per opdracht en team
- Meldingen bij nieuwe feedback/aanpassingen

### Voor Docenten
- Teams beheren (aanmaken, verwijderen, leden koppelen) + teamcodes genereren
- Opdrachten beheren (aanmaken, bijlagen)
- Overzicht per team/leerling met filter op status, leerling, opdracht
- Goedkeuren of `Feedback` geven; bij feedback verplicht tekstveld
- Visuele voortgangsweergave per team

---

## Technische Stack

**Frontend & Backend:**
- [Next.js 15](https://nextjs.org/) - React framework met API routes
- [TypeScript](https://www.typescriptlang.org/) - Type veiligheid
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI componenten

**Database & ORM:**
- [PostgreSQL](https://www.postgresql.org/) - Database (Docker)
- [Prisma](https://www.prisma.io/) - Type-safe ORM

**Development:**
- [Docker](https://www.docker.com/) - Database container
- [Biome](https://biomejs.dev/) - Linting & formatting

---

## Vereisten

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started)  
- [Docker Compose](https://docs.docker.com/compose/install/)  

---

## Snel Starten

```bash
# 1. Clone de repository
git clone git@github.com:daveymunters87/StadsBingo.git
cd StadsBingo/project

# 2. Start de database (Docker)
docker-compose up -d

# 3. Dependencies installeren
npm install

# 4. Database opzetten
npm run db:generate
npm run db:migrate
npm run db:seed

# 5. Development server starten
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser!

---

## Installatie Details

### Klonen & Navigeren
```bash
git clone git@github.com:daveymunters87/StadsBingo.git
cd StadsBingo/project
```

### Omgevingsvariabelen
Maak een `.env` bestand in de `project/` folder:

```env
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydb?schema=public"
```

> **Opmerking:** Voor lokale development gebruik je `localhost`. `db` is de Docker service naam in `docker-compose.yml`.

### PostgreSQL Starten
```bash
docker-compose up -d
```

Database draait nu op de achtergrond. Data wordt opgeslagen in Docker volume.

### Dependencies Installeren
```bash
npm install
```

### Database Opzetten
```bash
# Genereer Prisma client
npm run db:generate

# Run migrations (maakt de tabellen aan)
npm run db:migrate

# Seed database met test data (admin, team, opdrachten)
npm run db:seed
```

**Test inloggegevens na seeding:**
- **Admin login:** admin@example.com / admin123
- **Team code:** TEST123
- **Test team:** "Test Team" met 5 spelers en 5 opdrachten

**Seeded data bevat:**
- Admin gebruiker voor het beheren van teams en opdrachten
- Test team met teamcode "TEST123"
- 5 teamspelers (inclusief captain)
- 5 opdrachten in Groningen
- Team-opdracht koppelingen

---

## Database

**PostgreSQL draait in Docker** voor consistente setup.

**Belangrijke commando's:**
```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# Stop database en verwijder data
docker-compose down -v

# Bekijk database logs
docker-compose logs -f db
```

**Standaard inloggegevens** (zie `.env`):
- Gebruiker: `myuser`
- Wachtwoord: `mypassword`
- Database: `mydb`
- Poort: `5432`

---

## Prisma Commando's

```bash
# Genereer Prisma Client
npm run db:generate

# Maak nieuwe migratie
npm run db:migrate

# Push schema wijzigingen zonder migratie
npm run db:push

# Seed database met test data
npm run db:seed

# Reset database
npm run db:reset

# Open Prisma Studio (database GUI)
npm run db:studio
```

**Prisma Studio** opent op http://localhost:5555 en laat je database data bekijken/bewerken.

---

## Development Workflow

### Voor nieuwe features:
1. **Maak een nieuwe branch**
   ```bash
   git checkout -b feature/naam-van-feature
   ```

2. **Bouw de feature**
   - Wijzig Prisma schema indien nodig → `npm run db:migrate`
   - Schrijf code
   - Test lokaal met `npm test`

3. **Commit je werk**
   ```bash
   git add .
   git commit -m "feat: beschrijving van feature"
   ```

4. **Push en maak Pull Request**
   ```bash
   git push origin feature/naam-van-feature
   ```

### Code Kwaliteit:
```bash
# Controleer code kwaliteit
npm run lint

# Formatteer code
npm run format

# Voer tests uit
npm test

# Voer tests uit in watch modus
npm run test:watch

# Voer tests uit met coverage
npm run test:coverage
```

---

## Handige commands

```bash
# Formatteer hele repository
npm run format

# Bekijk Docker logs
docker-compose logs -f

# Open database GUI
npm run db:studio
```

---

## Team

- **Davey Munters** - Ontwikkelaar
- **Jada** - Ontwikkelaar

---

## Licentie

Dit is een educatief project voor Bit Academy.
