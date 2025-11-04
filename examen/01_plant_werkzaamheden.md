# 📘 StadsBingo – 01_plant_werkzaamheden.md

## 🧩 Projectomschrijving
Het doel van dit project is het ontwikkelen van een **vereenvoudigde StadsBingo webapplicatie**.  
Leerlingen voeren opdrachten uit in de stad en docenten keuren deze opdrachten goed of af.  
Het project volgt de **scrum-aanpak** met sprints van 2 weken.

**Vereenvoudigd concept (conform README):**
- Lijst met opdrachten (geen kaart/map integratie)
- Tekstantwoorden (geen bestand-uploads)
- Status zichtbaar na acties/refresh (geen realtime WebSockets)
- Focus op core functionaliteit voor examen-eisen

Referentie: zie `README.md` secties Features, Tech Stack en Quick Start.

---

## 🎯 Eisen en Wensen van de Opdrachtgever

### Eisen (Must have)
| Nr | Omschrijving | Toelichting |
|----|---------------|-------------|
| E1 | Lijst met opdrachten bekijken | Leerlingen zien alle beschikbare opdrachten |
| E2 | Opdrachten indienen met tekst | Leerlingen leveren een tekstantwoord in |
| E3 | Status bekijken | Leerlingen zien status (pending/approved/rejected) |
| E4 | Beoordelen door docenten | Docenten keuren in een docentoverzicht goed/af |
| E5 | Feedback tonen | Docentfeedback is zichtbaar bij de inzending |

### Wensen (Should/Could have)
| Nr | Omschrijving |
|----|---------------|
| W1 | Overzicht/filters voor docent (status, leerling) |
| W2 | Gebruiksvriendelijke interface |

---

## ✅ Definition of Done (DoD)
Een user story is **done** wanneer:
- Functionaliteit werkt zoals beschreven (E1–E5)  
- Tekstantwoorden zijn valide opgeslagen en gekoppeld  
- Status en feedback worden correct weergegeven  
- Basis tests zijn aanwezig en slagen  
- Code is leesbaar en in git gecommit (zie `README.md` workflow)

---

## 📖 Eisen gekoppeld aan User Stories

| Eis | User Stories | Bewijsbestand |
|------|---------------|----------------|
| E1 | Opdrachtenlijst bekijken | `examen/01_plant_werkzaamheden.md` |
| E2 | Opdracht indienen (tekst) | `examen/03_realiseren_software.md` |
| E3 | Status bekijken | `examen/04_test_software.md` |
| E4 | Opdracht beoordelen | `examen/03_realiseren_software.md` |
| E5 | Feedback tonen | `examen/04_test_software.md` |
| W1 | Filter docentoverzicht | `examen/03_realiseren_software.md` |
| W2 | UX-verbeteringen | `examen/05_verbetervoorstellen.md` |

---

## 👥 User Stories

### 📘 Leerling

| Titel | Opdrachtenlijst bekijken |
|-------|--------------------------|
| **Als een...** | Leerling |
| **Wil ik...** | alle beschikbare opdrachten als lijst zien |
| **Zodat ik...** | kan kiezen welke opdracht ik uitvoer |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Lijst toont titel/beschrijving<br>2️⃣ Paginering of eenvoudige lijst<br>3️⃣ Detailpagina beschikbaar |
| **Scenario** | 1. Leerling opent app → 2. Lijst verschijnt → 3. Klik toont details |
| **DoD** | Lijst rendert stabiel met testdata |
| **Tijdsindicatie** | S (2 uur) |

---

| Titel | Opdracht indienen (tekst) |
|-------|----------------------------|
| **Als een...** | Leerling |
| **Wil ik...** | een tekstantwoord kunnen indienen |
| **Zodat ik...** | mijn uitvoering kan laten beoordelen |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Validatie leeg/te lang<br>2️⃣ Opslag gekoppeld aan opdracht & leerling<br>3️⃣ Status start als "pending" |
| **Scenario** | 1. Open opdracht → 2. Vul tekst in → 3. Verstuur → 4. Bevestiging |
| **DoD** | Antwoord wordt opgeslagen en zichtbaar bij docent |
| **Tijdsindicatie** | M (4 uur) |

---

| Titel | Status & feedback bekijken |
|-------|----------------------------|
| **Als een...** | Leerling |
| **Wil ik...** | status en docentfeedback kunnen zien |
| **Zodat ik...** | weet wat ik moet verbeteren |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Status per inzending zichtbaar<br>2️⃣ Feedbacktekst zichtbaar<br>3️⃣ Geen realtime nodig (refresh) |
| **Scenario** | 1. Open "mijn inzendingen" → 2. Zie status/feedback |
| **DoD** | Weergave na pagina-refresh klopt |
| **Tijdsindicatie** | S (2 uur) |

---

### 📗 Docent

| Titel | Inzendingen beoordelen |
|-------|------------------------|
| **Als een...** | Docent |
| **Wil ik...** | inzendingen kunnen goed- of afkeuren met feedback |
| **Zodat ik...** | voortgang van leerlingen kan bewaken |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Overzicht van inzendingen<br>2️⃣ Acties: approve/reject<br>3️⃣ Feedbackveld verplicht bij reject |
| **Scenario** | 1. Open docentoverzicht → 2. Selecteer inzending → 3. Kies status + feedback |
| **DoD** | Status/feedback zichtbaar voor leerling |
| **Tijdsindicatie** | M (4 uur) |

---

| Titel | Filteren in docentoverzicht |
|-------|----------------------------|
| **Als een...** | Docent |
| **Wil ik...** | kunnen filteren op status en leerling |
| **Zodat ik...** | sneller kan beoordelen |
| **Prioriteit** | Should have |
| **Acceptatiecriteria** | 1️⃣ Filter op status<br>2️⃣ Zoeken op leerlingnaam |
| **DoD** | Filters wijzigen lijst zonder errors |
| **Tijdsindicatie** | S (2 uur) |

---

## 🗓️ Sprint Planning

### 🔹 Sprint 1 (Week 1–2)
**Doel:** Basisflow leerling en docent zonder realtime en uploads.

| Story | Verantwoordelijke | Prioriteit | Tijd | Uren | Opmerkingen |
|--------|-------------------|-------------|------|------|--------------|
| Opdrachtenlijst bekijken | Davey | Must | S | 2 | Lijst + detail |
| Opdracht indienen (tekst) | Davey | Must | M | 4 | Validatie + opslag |
| Inzendingen beoordelen | Jada | Must | M | 4 | Approve/reject + feedback |

**Totale uren Sprint 1:** 10  
**Risico’s:** validatie en koppeling tussen inzending/leerling/opdracht.  
**Sprint DoD:** Leerling kan indienen; docent kan beoordelen; status zichtbaar.

---

### 🔹 Sprint 2 (Week 3–4)
**Doel:** UX en filters, status/feedback weergave verbeteren, tests.

| Story | Verantwoordelijke | Prioriteit | Tijd | Uren | Opmerkingen |
|--------|-------------------|-------------|------|------|--------------|
| Status & feedback bekijken | Davey | Must | S | 2 | Leerlingoverzicht |
| Filter docentoverzicht | Jada | Should | S | 2 | Status/leerling |
| Basis tests schrijven | Davey | Must | M | 4 | Unit/API/component |

**Totale uren Sprint 2:** 8  
**Sprint DoD:** UX verbeterd en basis tests groen.

---

## 📊 Scrum Board Schematisch

**Sprint 1**
| To Do | In Progress | Done |
|-------|--------------|------|
| Opdrachtenlijst | Indienen (tekst) | Beoordelen |

**Sprint 2**
| To Do | In Progress | Done |
|-------|--------------|------|
| Status/feedback | Filters | Tests |

---

## 🧾 Voortgangsbewaking (Criterium 1.4)

**Doel:** aantonen dat voortgang actief is bewaakt en keuzes zijn gemaakt o.b.v. prioriteit.

### Bewijsstukken (plaats in `examen/bewijsmateriaal/01/`)

| Datum | Type | Bestand | Toelichting |
|--------|------|----------|--------------|
| 2025-11-04 | Scrum board snapshot (begin Sprint 1) | `examen/bewijsmateriaal/01/sprint1_start.png` | Start Sprint 1 – basistaken To Do |
| 2025-11-11 | Sprint 1 retrospectief | `examen/bewijsmateriaal/01/sprint1_retro.md` | Doorlooptijd indienen hoger; filters naar Sprint 2 |
| 2025-11-18 | Scrum board snapshot (eind Sprint 1) | `examen/bewijsmateriaal/01/sprint1_end.png` | Basisflow afgerond |
| 2025-11-25 | Commit overzicht | `examen/bewijsmateriaal/01/commit_list_sprint1.md` | Commits + korte omschrijving |
