# 📘 StadsBingo – 03_realiseren_software.md

---

## Repository & Uitvoerbaarheid

**Repository:** https://github.com/daveymunters87/StadsBingo

**Setup instructies:**
- `README.md` bevat volledige setup instructies (Docker Postgres, Prisma, Next.js)
- Quick Start: `docker-compose up -d` → `npm install` → `npm run db:generate` → `npm run db:migrate` → `npm run db:seed` → `npm run dev`
- App draait op: `http://localhost:3000`

**Tech Stack:**
- **Frontend:** Next.js 15 + TypeScript + TailwindCSS + shadcn/ui
- **Backend:** Next.js API Routes + Prisma ORM
- **Database:** PostgreSQL (Docker)
- **Development:** Biome (linting/formatting)

---

## Functionaliteit

Het project bevat een **statusgestuurde workflow** waarin opdrachten door verschillende statussen gaan:
`LOCKED` → `AVAILABLE` → `PENDING` → `FEEDBACK`/`APPROVED`

### Hoofdfunctionaliteiten

**Voor Leerlingen:**
- Login met teamcode (`/team-login`)
- Dashboard met opdrachten en statussen (`/dashboard`)
- Opdrachten indienen met tekst/foto (`/dashboard/exercises/[id]`)
- Feedback bekijken en opnieuw indienen

**Voor Docenten/Admin:**
- Teams beheren (aanmaken, spelers toevoegen) (`/admin/teams`)
- Opdrachten beheren (`/admin/assignments`)
- Inzendingen beoordelen (`/admin/review`)
- Filters op team, status, opdracht

### API Endpoints
- `POST /api/auth/team-login` – Teamcode validatie en sessie
- `GET /api/exercises` – Opdrachten per team met status
- `POST /api/submissions` – Inzending maken (status → PENDING)
- `GET /api/admin/submissions` – Overzicht voor docent met filters
- `PATCH /api/admin/submissions/[id]` – Status wijzigen (APPROVED/FEEDBACK)
- `POST /api/admin/teams` – Team aanmaken met teamcode
- `POST /api/admin/assignments` – Opdracht aanmaken

---

## Projectstructuur

```
src/
├── app/
│   ├── admin/                    # Admin dashboard
│   │   ├── (protected)/         # Beveiligde admin routes
│   │   │   ├── assignments/     # Opdrachten beheer
│   │   │   ├── teams/          # Teams beheer
│   │   │   └── review/         # Inzendingen beoordelen
│   │   └── login/              # Admin login
│   ├── dashboard/               # Leerling dashboard
│   │   └── exercises/          # Opdrachten bekijken/indienen
│   ├── team-login/             # Teamcode login
│   └── api/                    # Backend API routes
│       ├── auth/               # Authenticatie
│       ├── admin/              # Admin endpoints
│       ├── exercises/          # Opdrachten API
│       ├── submissions/        # Inzendingen API
│       └── teams/              # Teams API
├── components/
│   ├── admin/                  # Admin UI componenten
│   ├── user/                   # Leerling UI componenten
│   ├── shared/                 # Gedeelde componenten
│   └── ui/                     # shadcn/ui componenten
└── lib/
    ├── auth.ts                 # Authenticatie logica
    └── utils.ts                # Utility functies
```

**Database Schema (Prisma):**
- `User` (docenten/admin)
- `Team` (teams met unieke codes)
- `TeamPlayer` (leerlingen in teams)
- `Assignment` (opdrachten met volgorde)
- `Submission` (inzendingen met status)
- `TeamAssignment` (koppeling team-opdracht)

---

## Realisatie-eisen 3.1 t/m 3.5

| Nr. | Onderdeel | Bewijs |
| --- | --------- | ------ |
| **3.1** | User stories gerealiseerd | Alle stories uit `01_plant_werkzaamheden.md` zijn geïmplementeerd:<br>• Team-login functionaliteit<br>• Opdrachtenlijst met statussen<br>• Inzending en feedback workflow<br>• Admin dashboard met filters |
| **3.2** | Voldoet aan eisen | Alle eisen E1-E7 werkend:<br>• Teams beheren + teamcodes<br>• Login met teamcode<br>• Opdrachten bekijken per team<br>• Opdrachten indienen<br>• Status en feedback bekijken<br>• Inzendingen beoordelen<br>• Filters voor docent |
| **3.3** | Codekwaliteit | • **TypeScript** voor type safety<br>• **Prisma ORM** voor database<br>• **Server-side validatie** (teamcodes, status)<br>• **Foutafhandeling** in API routes<br>• **Beveiliging** (admin middleware) |
| **3.4** | Code conventions | • **Biome** linting en formatting<br>• Consistente naming (camelCase, PascalCase)<br>• **Feature branches** gebruikt<br>• Gestructureerde mappenindeling |
| **3.5** | Leesbaarheid | • Kleine, herbruikbare componenten<br>• Duidelijke API route structuur<br>• Logische mappenorganisatie<br>• TypeScript interfaces voor type safety |

---

## Versiebeheer (3.6)

**Git statistieken:**
- **98 commits** (veel meer dan minimum 10)
- **Meerdere branches** (Feature/, Refactor/, Development)
- **Pull Requests** gebruikt voor code review
- **Informatieve commit messages** (feat:, fix:, refactor:)

**Branching strategie:**
- `main` - productie branch
- `Development` - development branch  
- `Feature/*` - feature branches
- `Refactor/*` - refactor branches

**Recente commits (voorbeeld):**
```
e4efbcd Merge pull request #44 Feature/Improve-user-UI
bd89567 Feat: made UI changes to user frontend and added example images
f0a7b34 Merge pull request #43 Feature/Admin-add-example-image
1fa0bae Feature: Made changes so the admin can upload example image
90aaaf2 Merge pull request #42 Refactor/User-page-components
```

---

## Bewijs Screenshots

Plaats in `examen/bewijsmateriaal/03/`:

| Screenshot | Functionaliteit |
|------------|------------------|
| `team_login.png` | Leerling login met teamcode |
| `leerling_dashboard.png` | Dashboard met opdrachten en statussen |
| `leerling_indienen.png` | Opdracht indienen interface |
| `admin_teams.png` | Teams beheer in admin panel |
| `admin_review.png` | Inzendingen beoordelen met feedback |
| `commit_history.png` | Git commit geschiedenis |

---