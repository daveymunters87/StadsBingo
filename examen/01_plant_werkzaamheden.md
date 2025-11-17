# 📘 StadsBingo – 01_plant_werkzaamheden.md

## 🧩 Projectomschrijving
Het doel van dit project is het ontwikkelen van een **StadsBingo webapplicatie met teams en opdrachten-flow**.  
Leerlingen voeren opdrachten uit in teams in de stad en docenten beheren teams, opdrachten en de voortgang per team en per leerling.  
Het project volgt de **scrum-aanpak** met sprints van 2 weken.

**Functionele workflow (samenvatting):**
- Docent maakt teams aan, genereert teamcodes en koppelt leerlingen aan een team.
- Leerlingen loggen in met hun teamcode en zien de opdrachten die voor hun team beschikbaar zijn.
- Elke opdracht heeft een status: `Locked`, `Available`, `Pending`, `Feedback`, `Approved`.
- Leerlingen leveren per opdracht een tekstantwoord in; docenten keuren goed of geven feedback.
- Op basis van de beoordeling verandert de status en wordt de volgende opdracht vrijgegeven.
- Zowel docent als leerling zien een visuele voortgang over opdrachten en teams.

---

## 🎯 Eisen en Wensen van de Opdrachtgever

### Eisen (Must have)
| Nr | Omschrijving | Toelichting |
|----|---------------|-------------|
| E1 | Teams beheren en teamcodes genereren | Docent kan teams aanmaken, bekijken en per team een code genereren |
| E2 | Leerlingen inloggen met teamcode | Leerlingen krijgen toegang tot opdrachten via een teamcode |
| E3 | Opdrachtenlijst per team bekijken | Leerlingen zien opdrachten die voor hun team beschikbaar zijn |
| E4 | Opdrachten indienen | Leerlingen leveren per opdracht een tekstantwoord in |
| E5 | Opdrachtstatus en feedback bekijken | Leerlingen zien status (`Locked`, `Available`, `Pending`, `Feedback`, `Approved`) en feedback |
| E6 | Inzendingen beoordelen | Docenten keuren opdrachten goed of geven feedback |
| E7 | Overzichten en filters voor docent | Docent kan op team, leerling en status filteren in het overzicht |

### Wensen (Should/Could have)
| Nr | Omschrijving |
|----|---------------|
| W1 | Visuele voortgang per team en leerling |
| W2 | Notificatie voor leerlingen bij nieuwe feedback |
| W3 | Gebruiksvriendelijke interface (bijv. mobile friendly) |

---

## ✅ Definition of Done (DoD)
Een user story is **done** wanneer:
- Functionaliteit werkt zoals beschreven (E1–E5)  
- antwoorden zijn opgeslagen en gekoppeld  
- Status en feedback worden correct weergegeven  
- Basis tests zijn aanwezig en slagen  
- Code is leesbaar en in git gecommit (zie `README.md` workflow)

---

## 📖 Eisen gekoppeld aan User Stories

| Eis | User Stories | Bewijsbestand |
|------|---------------|----------------|
| E1 | Teams beheren & teamcodes genereren | `examen/03_realiseren_software.md` |
| E2 | Inloggen met teamcode | `examen/01_plant_werkzaamheden.md` |
| E3 | Opdrachtenlijst en statussen bekijken | `examen/01_plant_werkzaamheden.md` |
| E4 | Opdracht indienen & feedback verwerken | `examen/03_realiseren_software.md` |
| E5 | Status & feedback tonen | `examen/04_test_software.md` |
| E6 | Inzendingen beoordelen | `examen/03_realiseren_software.md` |
| E7 | Filters docentoverzicht | `examen/03_realiseren_software.md` |
| W1 | Visuele voortgang per team/leerling | `examen/03_realiseren_software.md` |
| W2 | Notificaties bij feedback | `examen/03_realiseren_software.md` |
| W3 | UX-verbeteringen | `examen/05_verbetervoorstellen.md` |

---

## 👥 User Stories

### 📘 Leerling

| Titel | Inloggen met teamcode |
|-------|--------------------------|
| **Als een...** | Leerling |
| **Wil ik...** | kunnen inloggen met een teamcode |
| **Zodat ik...** | toegang krijg tot de opdrachten van mijn team |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Inlogscherm met veld voor teamcode<br>2️⃣ Geldige code geeft toegang tot dashboard<br>3️⃣ Ongeldige code geeft duidelijke foutmelding |
| **Scenario** | 1. Leerling opent app → 2. Voert teamcode in → 3. Ziet opdrachtenoverzicht |
| **DoD** | Geldige/ongeldige codes worden correct afgehandeld |
| **Verantwoordelijke** | Davey |
| **Tijdsindicatie** | S (2 uur) |

---

| Titel | Opdrachtenlijst en statussen bekijken |
|-------|----------------------------|
| **Als een...** | Leerling |
| **Wil ik...** | een lijst van opdrachten met hun status zien |
| **Zodat ik...** | weet welke opdrachten locked, beschikbaar, in behandeling of afgerond zijn |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Lijst toont titel/beschrijving + huidige status<br>2️⃣ `Locked` opdrachten zijn niet klikbaar<br>3️⃣ `Available`, `Pending`, `Feedback`, `Approved` duidelijk onderscheidbaar |
| **Scenario** | 1. Leerling logt in → 2. Ziet opdrachtenlijst met statussen → 3. Opent een beschikbare opdracht |
| **DoD** | Lijst rendert stabiel met testdata en correcte statussen |
| **Verantwoordelijke** | Davey |
| **Tijdsindicatie** | M (4 uur) |

---

| Titel | Opdracht indienen & feedback verwerken |
|-------|----------------------------|
| **Als een...** | Leerling |
| **Wil ik...** | een opdracht kunnen inleveren en feedback kunnen verwerken |
| **Zodat ik...** | bij goedkeuring door kan naar de volgende opdracht |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Validatie leeg/te lang op tekstantwoord<br>2️⃣ Na indienen wordt status `Pending`<br>3️⃣ Bij `Feedback` ziet leerling feedbacktekst en kan opnieuw indienen → status terug naar `Pending`<br>4️⃣ Bij `Approved` wordt volgende opdracht `Available` |
| **Scenario** | 1. Open opdracht → 2. Vul antwoord in → 3. Verstuur → 4. Status `Pending` → 5. Docent keurt af met feedback → 6. Leerling past aan en dient opnieuw in |
| **DoD** | Status-flow (`Available` → `Pending` → `Feedback`/`Approved`) werkt end-to-end |
| **Verantwoordelijke** | Davey |
| **Tijdsindicatie** | S (2 uur) |

---

### 📗 Docent

| Titel | Inzendingen beoordelen |
|-------|------------------------|
| **Als een...** | Docent |
| **Wil ik...** | inzendingen kunnen goed of afkeuren met feedback |
| **Zodat ik...** | voortgang van leerlingen kan bewaken |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Overzicht van inzendingen<br>2️⃣ Acties: approve/reject<br>3️⃣ Feedbackveld verplicht bij reject |
| **Scenario** | 1. Open docentoverzicht → 2. Selecteer inzending → 3. Kies status + feedback |
| **DoD** | Status/feedback zichtbaar voor leerling |
| **Verantwoordelijke** | Jada |
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
| **Verantwoordelijke** | Jada |
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
