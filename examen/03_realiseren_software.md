# StadsBingo – 03_realiseren_software.md

## Repository & Uitvoerbaarheid

**Repository:** https://github.com/daveymunters87/StadsBingo

**Setup instructies:**
- `README.md` bevat volledige setup instructies (Docker Postgres, Prisma, Next.js)
- **Environment:** Maak `.env` bestand met `DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydb?schema=public"`
- Quick Start: `docker-compose up -d` → `npm install` → `npm run db:generate` → `npm run db:migrate` → `npm run db:seed` → `npm run dev`
- App draait op: `http://localhost:3000`
**Tech Stack:** Next.js 15, TypeScript, PostgreSQL, Prisma, Jest

---

## Functionaliteit

StadsBingo webapplicatie met team-opdrachten workflow waarin opdrachten door verschillende statussen gaan:
`LOCKED` → `AVAILABLE` → `PENDING` → `FEEDBACK`/`APPROVED`

**Voor Leerlingen:**
- Login met teamcode, dashboard met opdrachten en statussen
- Opdrachten indienen met foto, feedback bekijken en opnieuw indienen

**Voor Docenten/Admin:**
- Teams beheren (aanmaken, spelers toevoegen)
- Opdrachten beheren, inzendingen beoordelen
- Filters op team en status

**Non-CRUD functionaliteit:** Status workflow management en teamcode validatie systeem

---

## Realisatie-eisen 3.1 t/m 3.5

| Nr. | Onderdeel | Bewijs |
| --- | --------- | ------ |
| **3.1** | User stories gerealiseerd | Alle stories uit `01_plant_werkzaamheden.md` zijn geïmplementeerd:<br>• Team-login functionaliteit<br>• Opdrachtenlijst met statussen<br>• Inzending en feedback workflow<br>• Admin dashboard met filters |
| **3.2** | Voldoet aan eisen | Alle eisen E1-E7 werkend:<br>• Teams beheren + teamcodes<br>• Login met teamcode<br>• Opdrachten bekijken per team<br>• Opdrachten indienen<br>• Status en feedback bekijken<br>• Inzendingen beoordelen<br>• Filters voor docent |
| **3.3** | Codekwaliteit | • **TypeScript** voor type safety<br>• **Prisma ORM** voor database<br>• **Server-side validatie** (teamcodes, status)<br>• **Foutafhandeling** in API routes<br>• **Beveiliging** (admin middleware) |
| **3.4** | Code conventions | • **Biome** linting en formatting<br>• Consistente naming (camelCase, PascalCase)<br>• **Feature branches** gebruikt<br>• Gestructureerde mappenindeling |
| **3.5** | Leesbaarheid | • Kleine, herbruikbare componenten<br>• Duidelijke API route structuur<br>• Logische mappenorganisatie |

---

## Versiebeheer (3.6)

**Git statistieken:**
- **98 commits** 
- **Meerdere branches**
- **Pull Requests** gebruikt voor code review
- **Informatieve commit messages** (feat:, fix:, refactor:)

**Branching strategie:**
- `main` - productie branch
- `Development` - development branch  
- `Feature/*` - feature branches
- `Refactor/*` - refactor branches

**Bewijs:** Zie repository commit history en screenshots in bewijsmateriaal/03/


---

## Bewijs Screenshots

### Leerling Functionaliteit
**Team Login:**
![Team Login](bewijsmateriaal/03/team_login.png)

**Dashboard met Opdrachten:**
![Leerling Opdrachten](bewijsmateriaal/03/leerling_opdrachten.png)

**Opdracht Indienen:**
![Leerling Indienen](bewijsmateriaal/03/leerling_indienen.png)

### Docent Functionaliteit
**Inzendingen Beoordelen:**
![Docent Beoordelen](bewijsmateriaal/03/docent_beoordelen.png)

**Filter Functionaliteit:**
![Docent Filters](bewijsmateriaal/03/docent_filters.png)

### Git Versiebeheer
**Commit Geschiedenis:**
![Commit History](bewijsmateriaal/03/commit_history.png)

**GitHub Branches:**
![GitHub Branches](bewijsmateriaal/03/github_branches.png)

**Pull Requests:**
![GitHub PR](bewijsmateriaal/03/github_pr.png)