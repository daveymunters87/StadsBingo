# 📘 StadsBingo – 01_plant_werkzaamheden.md

## 🧩 Projectomschrijving
Het doel van dit project is het ontwikkelen van een **StadsBingo webapplicatie met teams en opdrachten-flow**.  
Leerlingen voeren opdrachten uit in teams in de stad en docenten beheren teams, opdrachten en de voortgang per team en per leerling.  
Het project volgt de **scrum-aanpak** met sprints van 2 weken.

**Functionele workflow (samenvatting):**
- Docent maakt teams aan, genereert teamcodes en koppelt leerlingen aan een team.
- Leerlingen loggen in met hun teamcode en zien de opdrachten die voor hun team beschikbaar zijn.
- Elke opdracht heeft een status: `Locked`, `Available`, `Pending`, `Feedback`, `Approved`.
- Leerlingen leveren per opdracht een tekst of foto in; docenten keuren goed of geven feedback.
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
| E4 | Opdrachten indienen | Leerlingen leveren per opdracht een tekst of foto in |
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


## 📘 Leerling (Davey)

### 1. Inloggen met teamcode

| **Als een...** | Leerling |
|----------------|----------|
| **Wil ik...**  | kunnen inloggen met een teamcode |
| **Zodat ik...** | toegang krijg tot de opdrachten van mijn team |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Inlogscherm met veld voor teamcode<br>2️⃣ Geldige code geeft toegang tot dashboard<br>3️⃣ Ongeldige code geeft duidelijke foutmelding |
| **Scenario** | 1. Leerling opent app → 2. Voert teamcode in → 3. Ziet opdrachtenoverzicht |
| **DoD** | Geldige/ongeldige codes worden correct afgehandeld |
| **Verantwoordelijke** | Davey |
| **Tijdsindicatie** | S (2 uur) |

---

### 2. Opdrachtenlijst en statussen bekijken

| **Als een...** | Leerling |
|----------------|----------|
| **Wil ik...**  | een lijst van opdrachten met hun status zien |
| **Zodat ik...** | weet welke opdrachten locked, beschikbaar, in behandeling of afgerond zijn |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Lijst toont titel/beschrijving + huidige status<br>2️⃣ `Locked` opdrachten zijn niet klikbaar<br>3️⃣ `Available`, `Pending`, `Feedback`, `Approved` duidelijk onderscheidbaar |
| **Scenario** | 1. Leerling logt in → 2. Ziet opdrachtenlijst met statussen → 3. Opent een beschikbare opdracht |
| **DoD** | Lijst rendert stabiel met testdata en correcte statussen |
| **Verantwoordelijke** | Davey |
| **Tijdsindicatie** | M (4 uur) |

---

### 3. Opdracht indienen & feedback verwerken (Update)

| **Als een...** | Leerling |
|----------------|----------|
| **Wil ik...**  | een opdracht kunnen inleveren als tekst of foto en feedback kunnen verwerken |
| **Zodat ik...** | bij goedkeuring door kan naar de volgende opdracht |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Validatie: minimaal één van `tekst` of `foto` aanwezig<br>2️⃣ Na indienen wordt status `Pending`<br>3️⃣ Bij `Feedback` ziet leerling feedbacktekst en kan opnieuw indienen → status terug naar `Pending`<br>4️⃣ Bij `Approved` wordt volgende opdracht `Available` |
| **Scenario** | 1. Open opdracht → 2. Vul tekst of upload foto → 3. Verstuur → 4. Status `Pending` → 5. Docent keurt af met feedback → 6. Leerling past aan en dient opnieuw in |
| **DoD** | Status-flow (`Available` → `Pending` → `Feedback`/`Approved`) werkt end-to-end voor tekst en/of foto |
| **Verantwoordelijke** | Davey |
| **Tijdsindicatie** | M (2–4 uur) |

---

## 📗 Docent (Jada)

### 1. Inzendingen beoordelen

| **Als een...** | Docent |
|----------------|--------|
| **Wil ik...**  | inzendingen kunnen goed- of afkeuren met feedback |
| **Zodat ik...** | voortgang van leerlingen kan bewaken |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Overzicht van inzendingen<br>2️⃣ Acties: approve/reject<br>3️⃣ Feedbackveld verplicht bij reject |
| **Scenario** | 1. Open docentoverzicht → 2. Selecteer inzending → 3. Kies status + feedback |
| **DoD** | Status/feedback zichtbaar voor leerling |
| **Verantwoordelijke** | Jada |
| **Tijdsindicatie** | M (4 uur) |

---

### 2. Filteren in docentoverzicht

| **Als een...** | Docent |
|----------------|--------|
| **Wil ik...**  | kunnen filteren op status en leerling |
| **Zodat ik...** | sneller kan beoordelen |
| **Prioriteit** | Should have |
| **Acceptatiecriteria** | 1️⃣ Filter op status<br>2️⃣ Zoeken op leerlingnaam |
| **DoD** | Filters wijzigen lijst zonder errors |
| **Verantwoordelijke** | Jada |
| **Tijdsindicatie** | S (2 uur) |

---

### 3. Visuele voortgang per team/leerling

| **Als een...** | Docent |
|----------------|--------|
| **Wil ik...**  | visuele voortgang van teams en leerlingen kunnen zien |
| **Zodat ik...** | snel overzicht heb wie opdrachten voltooid heeft of vastloopt |
| **Prioriteit** | Should have |
| **Acceptatiecriteria** | 1️⃣ Voor ieder team een voortgangsbalk<br>2️⃣ Voor iedere leerling een individuele voortgangsbalk<br>3️⃣ Kleurcodering van status (`Pending`, `Feedback`, `Approved`) |
| **DoD** | Vooruitgang correct weergegeven voor alle teams/leerlingen |
| **Verantwoordelijke** | Jada |
| **Tijdsindicatie** | M (4 uur) |

## 🗓️ Sprint Planning

## 🔹 Sprint 1 (Week 1–2)
**Doel:** Basisflow leerling en docent, inclusief indienen en beoordelen, zonder extra UX/features.

| To Do | In Progress | Done |
|-------|------------|------|
| Inloggen met teamcode (Davey, 2u) | Opdrachtenlijst bekijken (Davey, 4u) | |
| Inzendingen beoordelen (Jada, 4u) | | |

**Sprint 1 DoD:**  
- Leerling kan inloggen en opdrachtenlijst zien  
- Leerling kan een opdracht indienen  
- Docent kan inzendingen beoordelen (approve/reject + feedback)  

---

## 🔹 Sprint 2 (Week 3–4)
**Doel:** UX en extra features, status/feedback weergave, filters en voortgang.

| To Do | In Progress | Done |
|-------|------------|------|
| Filteren in docentoverzicht (Jada, 2u) | Visuele voortgang per team/leerling (Jada, 4u) | |
| Opdracht indienen & feedback verwerken (Davey, 2–4u) | Status & feedback bekijken (Davey, 2u) | |

**Sprint 2 DoD:**  
- Leerling kan feedback verwerken en status correct zien  
- Docent kan filteren op status/leerling  
- Voortgangsbalken per team/leerling zichtbaar en correct  
- Basis UX verbeterd en stabiel  

---

### 📌 Planning-overzicht (Criterium 1.3)

**Aannames capaciteit**
- Team van 2 studenten (Davey, Jada), beschikbaar ±10 uur per week per persoon.
- Sprintduur: 2 weken → totale capaciteit per sprint ≈ 2 pers × 2 weken × 10u = **40 uur**.

**Werkload vs. capaciteit per sprint**

| Sprint | Stories (met inschatting) | Totaal uren | Past binnen 40u? |
|--------|---------------------------|-------------|------------------|
| Sprint 1 | Inloggen teamcode (2u), Opdrachtenlijst (4u), Inzendingen beoordelen (4u) | **10u** | ✅ Ruime slack voor onvoorziene zaken |
| Sprint 2 | Filter docentoverzicht (2u), Visuele voortgang (4u), Opdracht indienen & feedback (2–4u, gerekend 4u), Status & feedback tonen (2u) | **12u** | ✅ Slack aanwezig |

**Waarom realistisch?**
- Alle must-haves (inloggen, opdrachtenlijst, indienen, beoordelen) staan in Sprint 1; should-haves verschuiven naar Sprint 2.
- Uren per sprint liggen ruim onder de beschikbare 40u, zodat er ruimte is voor bugs en iteraties.
- Stories zijn al voorzien van MoSCoW + tijdsinschatting en sluiten aan op de DoD.

**Bewijs stukken planning/voortgang**
- Zie het overzicht in de sectie hieronder onder `Voortgangsbewaking`.

---

## 🧾 Voortgangsbewaking (Criterium 1.4)

**Doel:** aantonen dat voortgang actief is bewaakt en keuzes zijn gemaakt o.b.v. prioriteit.

# Bewijsstukken – Examenopdracht 1

| Datum      | Type                                  | Bestand                                               | Toelichting                                                                                       |
|-----------|---------------------------------------|------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| 2025-11-04 | Scrum board snapshot (begin Sprint 1) | `examen/bewijsmateriaal/01/sprint1_start.png`       | Screenshot van het Kanban board aan het begin van Sprint 1. Toont alle basistaken in **To Do**, inclusief prioriteit, feature label en geschatte grootte. |
| 2025-11-11 | Sprint 1 retrospectief                 | `examen/bewijsmateriaal/01/sprint1_retro.md`       | Markdown met terugblik op Sprint 1. Beschrijft doorlooptijd van taken, wat goed ging, wat verbeterd kan worden, en planning voor Sprint 2. |
| 2025-11-18 | Scrum board snapshot (eind Sprint 1)  | `examen/bewijsmateriaal/01/sprint1_end.png`        | Screenshot van het Kanban board aan het einde van Sprint 1. Toont afgeronde taken in **Done**, taken die naar Sprint 2 verschoven zijn en voortgang van de basisflow. |
| 2025-11-19 | Scrum board snapshot (begin Sprint 2) | `examen/bewijsmateriaal/01/sprint2_start.png`      | Screenshot van het Kanban board aan het begin van Sprint 2. Toont nieuwe taken die gepland zijn voor Sprint 2 en eventuele carry-over taken van Sprint 1. |
| 2025-11-25 | Commit overzicht                        | `examen/bewijsmateriaal/01/commit_list_sprint1.md` | Lijst van commits gemaakt tijdens Sprint 1. Bevat korte omschrijving per commit en laat zien welke taken van de backlog zijn opgepakt. |

