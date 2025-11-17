# 📘 StadsBingo – 03_realiseren_software.md

## 🎯 Doel
Bewijs dat (onderdelen van) de software zijn gerealiseerd met goede codekwaliteit, duidelijke structuur en versiebeheer (conform eisen 3.1 t/m 3.6).

---

## 📦 Repository & Uitvoerbaarheid

- Repository: `README.md` bevat volledige setup (Docker Postgres, Prisma, scripts).  
- Quick Start (samengevat, zie `README.md`):
  1. `docker-compose up -d` (database)  
  2. `npm install`  
  3. `npx prisma generate`  
  4. `npx prisma migrate dev --name init`  
  5. `npm run dev` → `http://localhost:3000`

---

## 🧩 Functionaliteit (Non-CRUD workflow)

Naast standaard CRUD bevat het project een workflow waarin docenten **teams beheren**, leerlingen via **teamcodes** inloggen en opdrachten in een **statusgestuurde flow** afronden.

### Hoofdflows
- **Docent/Admin**
  - Maakt teams aan, genereert teamcodes en koppelt leerlingen.
  - Beheert opdrachten (volgorde, optionele deadline/bijlage).
  - Bekijkt inzendingen per team/leerling/status, beoordeelt met `Approved` of `Feedback` en stuurt notificaties.
  - Ziet visuele voortgang per team/leerling.
- **Leerling**
  - Logt in met teamcode en ziet opdrachtenlijst met statussen `Locked`, `Available`, `Pending`, `Feedback`, `Approved`.
  - Levert tekstantwoord in → `Pending`.
  - Bij `Feedback` ziet hij feedback en kan opnieuw indienen; bij `Approved` wordt automatisch de volgende opdracht `Available`.

### Endpoints (conceptueel)
- `POST /api/auth/team-login` – valideert teamcode en koppelt leerling aan team-sessie.
- `GET /api/opdrachten` – levert opdrachten plus status per leerling/team (afgeleid uit volgorde en inzendingen).
- `POST /api/inzendingen` – maakt inzending met `teamId`, `opdrachtId`, `tekstAntwoord`, status `Pending`.
- `GET /api/inzendingen?teamId=&status=&leerlingId=` – docentoverzicht inclusief filters.
- `PATCH /api/inzendingen/:id` – docent wijzigt status naar `Approved` of `Feedback` (feedback verplicht).
- `POST /api/notifications` (optioneel) – docent kan notificatie naar leerlingen sturen bij feedback of updates.

---

## 🧱 Structuur (indicatief)

- `app/` – Next.js routes voor team-login, leerlingdashboard, docentdashboard, teambeheer.
- `app/api/` – API routes voor auth, teams, teamleden, opdrachten, inzendingen, notificaties.
- `prisma/schema.prisma` – datamodel met `User`, `Team`, `TeamMembership`, `Assignment`, `Submission`, uitbreidingen voor status & volgorde.
- `components/` – UI componenten voor statusbadges, voortgangsbalken, filters, modals voor feedback/notificaties.

---

## ✅ Realisatie-eisen 3.1 t/m 3.5

| Nr. | Onderdeel | Bewijs |
| --- | --------- | ------ |
| 3.1 | User stories gerealiseerd | Stories uit `01_plant_werkzaamheden.md` (team-login, statusweergave, feedbackloop, docentfilters) zijn uitgebouwd |
| 3.2 | Voldoet aan eisen | E1–E7 + wensen (visuele voortgang, notificaties) werken in code en UI |
| 3.3 | Codekwaliteit | TypeScript, Prisma, services per domein, server-side validaties op teamcode & statusovergangen |
| 3.4 | Conventions | Biome lint/format, feature branches (`feature/team-login`, `feature/docent-dashboard`, etc.) |
| 3.5 | Leesbaarheid | Componenten/API-handlers klein en gedocumenteerd; duidelijke bestandsstructuur |

---

## 🧩 Versiebeheer (3.6)

- Minimaal 10 commits, 2+ branches en PR’s.  
- Aanbevolen branching: `feature/team-login`, `feature/team-management`, `feature/assignment-flow`, `feature/docent-filters`, `chore/tests`.

### Bewijs (plaats in `examen/bewijsmateriaal/03/`)
- `commit_history.png` – schermfoto Git log  
- `branches_prs.png` – schermfoto branches en PR’s  
- `links.md` – links naar PR’s met korte toelichting

---

## 🔍 Screens & Bewijs (functioneel)

Plaats in `examen/bewijsmateriaal/03/`:
- `team_login.png` – teamcode-login
- `leerling_opdrachten.png` – opdrachtenlijst met statusbadges
- `leerling_indienen.png` – formulier tekstantwoord (`Pending`)
- `feedback_notificatie.png` – melding voor leerling bij feedback
- `visuele_voortgang.png` – voortgangsbalk per team/leerling
- `docent_filters.png` – docentdashboard met filters (team/leerling/status)
- `docent_beoordelen.png` – beoordeling met verplicht feedbackveld

---

## 📌 Opmerkingen

- Afbakening focust op teams, statusflow en notificaties; realtime features zijn niet nodig voor de eisen.
- Geen bestand-uploads of kaartintegratie; daardoor blijft scope beheersbaar en toetsbaar.


