# StadsBingo – 01_plant_werkzaamheden.md

## Projectomschrijving
Het doel van dit project is het ontwikkelen van een **StadsBingo webapplicatie met teams en opdrachten-flow**.  
Leerlingen voeren opdrachten uit in teams in de stad en docenten beheren teams, opdrachten en de voortgang per team en per leerling.  
Het project volgt de **scrum-aanpak** met sprints van 1 week.

**Functionele workflow (samenvatting):**
- Docent maakt teams aan, genereert teamcodes en koppelt leerlingen aan een team (maximaal 5 spelers per team).
- Leerlingen loggen in met een teamcode en zien de opdrachten die voor hun team beschikbaar zijn.
- Elke opdracht heeft een status: `Locked`, `Available`, `Pending`, `Feedback`, `Approved`.
- Leerlingen leveren per opdracht een tekst of foto in; docenten keuren goed of geven feedback.
- Op basis van de beoordeling verandert de status en wordt de volgende opdracht vrijgegeven.
- Zowel docent als leerling zien een visuele voortgang over opdrachten en teams.

---

## Eisen en Wensen van de Opdrachtgever

### Eisen (Must have)
| Nr | Omschrijving | Toelichting |
|----|---------------|-------------|
| E1 | Teams beheren en teamcodes genereren | Docent kan teams aanmaken, bekijken en per team een code genereren |
| E2 | Leerlingen inloggen met teamcode | Leerlingen krijgen toegang tot opdrachten via een teamcode; API verifieert code |
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

## Definition of Done (DoD)
Een user story is **done** wanneer:
- Functionaliteit werkt zoals beschreven (E1–E5)  
- Antwoorden zijn opgeslagen en gekoppeld  
- Status en feedback worden correct weergegeven  
- Basis tests zijn aanwezig en slagen  
- Code is leesbaar en in git gecommit  

---

## User Stories

### **Leerling (Student)**

#### 1. Inloggen met teamcode
| **Als een...** | Leerling |
|----------------|----------|
| **Wil ik...**  | kunnen inloggen met een teamcode |
| **Zodat ik...** | toegang krijg tot de opdrachten van mijn team |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1: Teamcode veld aanwezig op login scherm<br> 2: Geldige code geeft toegang tot dashboard<br> 3: Ongeldige code geeft duidelijke foutmelding<br> 4: Alleen één actieve sessie per team toegestaan<br> |
| **Scenario** | 1. Leerling opent app → 2. Voert teamcode in → 3. Ziet dashboard |
| **DoD** | API controleert code, foutmeldingen correct, actieve sessies beperkt |
| **Verantwoordelijke** | Jada & Davey |
| **Tijdsindicatie** | M (4 uur) |
| **Gerelateerde eisen** | E2 |

#### 2. Opdrachtenlijst en statussen bekijken
| **Als een...** | Leerling |
|----------------|----------|
| **Wil ik...**  | een lijst van opdrachten met hun status zien |
| **Zodat ik...** | weet welke opdrachten locked, beschikbaar, in behandeling of afgerond zijn |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1: Lijst toont titel/beschrijving + status<br> 2: `Locked` opdrachten zijn niet klikbaar<br> 3: `Available`, `Pending`, `Feedback`, `Approved` duidelijk onderscheidbaar |
| **Scenario** | 1. Leerling logt in → 2. Ziet opdrachtenlijst → 3. Opent beschikbare opdracht |
| **DoD** | Lijst rendert stabiel, correcte statussen weergegeven |
| **Verantwoordelijke** | Jada & Davey |
| **Tijdsindicatie** | M (4 uur) |
| **Gerelateerde eisen** | E3, E5 |

#### 3. Opdracht indienen & feedback verwerken
| **Als een...** | Leerling |
|----------------|----------|
| **Wil ik...**  | een opdracht kunnen inleveren als tekst of foto en feedback kunnen verwerken |
| **Zodat ik...** | bij goedkeuring door kan naar de volgende opdracht |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1: Validatie: minimaal één van `tekst` of `foto` aanwezig<br> 2: Na indienen wordt status `Pending`<br> 3: Bij `Feedback` ziet leerling feedback en kan opnieuw indienen<br> 4: Bij `Approved` wordt volgende opdracht `Available` |
| **Scenario** | 1. Open opdracht → 2. Vul tekst/foto → 3. Verstuur → 4. Status `Pending` → 5. Docent keurt af → 6. Leerling dient opnieuw in |
| **DoD** | Status-flow (`Available` → `Pending` → `Feedback`/`Approved`) werkt correct |
| **Verantwoordelijke** | Jada & Davey |
| **Tijdsindicatie** | M (3 uur) |
| **Gerelateerde eisen** | E4, E5 |

---

### **Docent (Teacher)**

#### 1. Inzendingen beoordelen
| **Als een...** | Docent |
|----------------|--------|
| **Wil ik...**  | inzendingen kunnen goed of afkeuren met feedback |
| **Zodat ik...** | voortgang van leerlingen kan bewaken |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1: Overzicht van inzendingen<br>2: Acties: approve/reject<br>3: Feedback verplicht bij reject |
| **Scenario** | 1. Open docentdashboard → 2. Selecteer inzending → 3. Kies status + feedback |
| **DoD** | Status/feedback zichtbaar voor leerling |
| **Verantwoordelijke** | Jada & Davey |
| **Tijdsindicatie** | M (4 uur) |
| **Gerelateerde eisen** | E5, E6 |

#### 2. Filteren in docentoverzicht
| **Als een...** | Docent |
|----------------|--------|
| **Wil ik...**  | kunnen filteren op status en leerling |
| **Zodat ik...** | sneller kan beoordelen |
| **Prioriteit** | Should have |
| **Acceptatiecriteria** | 1: Filter op status<br> 2: Zoeken op leerlingnaam |
| **DoD** | Filters wijzigen lijst correct |
| **Verantwoordelijke** | Jada & Davey |
| **Tijdsindicatie** | S (2 uur) |
| **Gerelateerde eisen** | E7 |

#### 3. Visuele voortgang per team/leerling
| **Als een...** | Docent |
|----------------|--------|
| **Wil ik...**  | visuele voortgang van teams en leerlingen kunnen zien |
| **Zodat ik...** | snel overzicht heb wie opdrachten voltooid heeft of vastloopt |
| **Prioriteit** | Should have |
| **Acceptatiecriteria** | 1: Voor ieder team een voortgangsbalk<br> 2: Voor iedere leerling een individuele voortgangsbalk<br> 3: Kleurcodering status (`Pending`, `Feedback`, `Approved`) |
| **DoD** | Vooruitgang correct weergegeven voor alle teams/leerlingen |
| **Verantwoordelijke** | Jada & Davey |
| **Tijdsindicatie** | M (4 uur) |
| **Gerelateerde eisen** | E7, W1 |

---

### Sprint 1 (Week 1)
**Doel:** Basis leerlingflow realiseren: inloggen met teamcode en opdrachten bekijken.

| To Do | In Progress | Done |
|-------|------------|------|
| Team login API & dashboard backend (Davey & Jada, 4u) | Opdrachtenlijst bekijken (Davey & Jada, 4u) | |
| Opdrachtdetails bekijken (Davey & Jada, 2u) | | |

**Sprint 1 DoD:**  
- Leerling kan inloggen met teamcode  
- Leerling ziet een overzicht van opdrachten met bijbehorende status  
- Leerling kan een beschikbare opdracht openen en de details bekijken  
- Locked opdrachten zijn niet klikbaar  
- Basis navigatie tussen overzicht en detailpagina werkt  

---

### Sprint 2 (Week 2)
**Doel:** Inleveren en beoordelen van opdrachten inclusief feedback en statusflow.

| To Do | In Progress | Done |
|-------|------------|------|
| Opdracht indienen (tekst/foto) (Davey, 2–4u) | Status & feedback bekijken (Davey, 2u) | |
| Inzendingen beoordelen (approve/reject + feedback) (Jada, 4u) | Dashboard frontend (Davey, 4–6u) | |
| Filteren docentoverzicht (Jada, 2u) | Visuele voortgang per team/leerling (Jada, 4u) | |

**Sprint 2 DoD:**  
- Leerling kan een opdracht indienen met tekst en/of foto  
- Na indienen verandert status naar `Pending`  
- Docent kan inzendingen goed- of afkeuren met verplichte feedback bij afkeuren  
- Leerling ziet feedback en kan opnieuw indienen bij status `Feedback`  
- Bij goedkeuring (`Approved`) wordt de volgende opdracht beschikbaar  
- Dashboard toont actuele status en feedback correct  
- Docent kan filteren op status en leerling  
- Visuele voortgang per team en leerling wordt correct weergegeven  

---

## Planning-overzicht

**Capaciteit:**  
- Team van 2 studenten, ±10 uur/week per persoon  
- Sprintduur: 1 week → totale capaciteit per sprint ≈ 40 uur

| Sprint | Stories (uren) | Totaal uren | Past binnen 40u? |
|--------|----------------|-------------|-----------------|
| Sprint 1 | Team login (4u), Opdrachtenlijst (4u), Opdrachtdetails bekijken (2u) | 10u |
| Sprint 2 | Dashboard (5u), Feedback verwerking (3u), Filters docent (2u), Voortgangsbalken (4u) | 14u |

---

## Voortgangsbewaking

**Doel:** aantonen dat voortgang actief wordt bewaakt en keuzes gebaseerd op prioriteit.

| Periode         | Type                  | Bestand | Toelichting |
|----------------|----------------------|---------|------------|
| 08-12 t/m 15-12 | Sprint 1 start       | ![Sprint 1 Start](bewijsmateriaal/01/sprint1/sprint1_start.png) | Begin Sprint 1 |
| 08-12 t/m 15-12 | Sprint 1 commits     | [Commits Sprint 1](bewijsmateriaal/01/sprint1/commit_list_sprint1.md) | Overzicht commits tijdens Sprint 1 |
| 08-12 t/m 15-12 | Sprint 1 retrospectief | [Sprint 1 Retro](bewijsmateriaal/01/sprint1/sprint1_retro.md) | Reflectie Sprint 1 |
| 15-12 t/m 22-12 | Sprint 2 start       | ![Sprint 2 Start](bewijsmateriaal/01/sprint2/sprint2_start.png) | Begin Sprint 2|
| 15-12 t/m 22-12 | Sprint 2 commits     | [Commits Sprint 2](bewijsmateriaal/01/sprint2/commit_list_sprint2.md) | Overzicht commits tijdens Sprint 2 |
| 15-12 t/m 22-12 | Sprint 2 retrospectief | [Sprint 2 Retro](bewijsmateriaal/01/sprint2/sprint2_retro.md) | Reflectie Sprint 2 |

---
## Individuele bijdragen

**Davey:**
- Hoofdverantwoordelijk voor frontend development (React/Next.js componenten)
- Team-login interface en dashboard UI
- Foto upload functionaliteit voor opdrachten
- Repository beheer en Git workflow

**Jada:**
- Hoofdverantwoordelijk voor backend development (API routes, database)
- Admin panel voor docenten (beoordelen, filters)
- Database schema ontwerp en Prisma implementatie
- Testing en validatie logica

**Gezamenlijk:**
- Planning en user story uitwerking
- UML diagrammen (ERD en Sequence)
- Code reviews en pull requests
- Sprint retrospectives en voortgangsbewaking