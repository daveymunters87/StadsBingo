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

Naast standaard CRUD toont dit project een non-CRUD workflow: **approve/reject met feedback** door een docent.

### Hoofdflows
- Leerling: bekijkt opdrachten → dient tekstantwoord in (status: `pending`).  
- Docent: bekijkt inzendingen → kiest `approve` of `reject` + vult `feedback` → status en feedback worden zichtbaar voor leerling.

### Endpoints (conceptueel)
- POST `/api/inzendingen` – maakt inzending met `tekstAntwoord` en koppelt aan `opdrachtId` en ingelogde leerling.  
- GET `/api/inzendingen?status=pending` – docentoverzicht.  
- PATCH `/api/inzendingen/:id` – stelt `status` en `feedback` in (alleen docent).

---

## 🧱 Structuur (indicatief)

- `app/` – Next.js pages/routes (leerling- en docentviews)  
- `app/api/` – API routes (inzendingen CRUD + review)  
- `prisma/schema.prisma` – datamodel (`Opdracht`, `Inzending`, `User`)  
- `components/` – UI componenten (lijst, formulieren, overzichten)

---

## ✅ Realisatie-eisen 3.1 t/m 3.5

| Nr. | Onderdeel | Bewijs |
| --- | --------- | ------ |
| 3.1 | User stories gerealiseerd | Basisstories uit `01_plant_werkzaamheden.md` zijn uitgevoerd: lijst, indienen, beoordelen, status/feedback |
| 3.2 | Voldoet aan eisen | E1–E5 gedekt in domein en UI; geen map/uploads/realtime (zie README-afbakening) |
| 3.3 | Codekwaliteit | TypeScript, scheiding concerns, server-side validaties, eenvoudige foutafhandeling |
| 3.4 | Conventions | Lint/format via Biome; consistente naamgeving en mapstructuur |
| 3.5 | Leesbaarheid | Kleine componenten, duidelijke functienamen, beperkte complexiteit |

---

## 🧩 Versiebeheer (3.6)

- Minimaal 10 commits, 2+ branches en PR’s.  
- Aanbevolen branching: `main`, `feature/indienen-tekst`, `feature/docent-beoordelen`, `feature/status-feedback`, `chore/tests`.

### Bewijs (plaats in `examen/bewijsmateriaal/03/`)
- `commit_history.png` – schermfoto Git log  
- `branches_prs.png` – schermfoto branches en PR’s  
- `links.md` – links naar PR’s met korte toelichting

---

## 🔍 Screens & Bewijs (functioneel)

Plaats in `examen/bewijsmateriaal/03/`:
- `leerling_lijst.png` – opdrachtenlijst  
- `leerling_indienen.png` – formulier tekstantwoord  
- `docent_overzicht.png` – openstaande inzendingen  
- `docent_beoordelen.png` – approve/reject met feedback  
- `leerling_status.png` – status/feedback zichtbaar na refresh

---

## 📌 Opmerkingen

- Afbakening is bewust eenvoudig om aan examen-eisen te voldoen.  
- Geen realtime, geen uploads: risico’s en complexiteit verlaagd, focus op E1–E5.


