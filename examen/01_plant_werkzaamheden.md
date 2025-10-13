# 📘 StadsBingo – 01_plant_werkzaamheden.md

## 🧩 Projectomschrijving
Het doel van dit project is het ontwikkelen van een **StadsBingo webapplicatie**.  
Leerlingen voeren opdrachten uit in de stad en docenten keuren deze opdrachten live goed of af.  
Het project volgt de **scrum-aanpak** met sprints van 2 weken.

---

## 🎯 Eisen en Wensen van de Opdrachtgever

### Eisen (Must have)
| Nr | Omschrijving | Toelichting |
|----|---------------|-------------|
| E1 | Kaart met pinpoints in de stad | Zichtbare opdrachten op kaart |
| E2 | Elke pinpoint bevat een vraag/opdracht | Interactieve opdrachten |
| E3 | Leerlingen kunnen opdrachten voltooien | Uploaden van bewijs |
| E4 | Docenten kunnen opdrachten goed/afkeuren | Dashboard met beoordelingsfunctie |
| E5 | Realtime updates van status van opdrachten | Websockets of polling updates |

### Wensen (Should/Could have)
| Nr | Omschrijving |
|----|---------------|
| W1 | Docent kan zelf nieuwe opdrachten toevoegen |
| W2 | Leerlingen zien direct feedback zonder refresh |
| W3 | Gebruiksvriendelijke interface met duidelijke flow |

---

## ✅ Definition of Done (DoD)
Een user story is **done** wanneer:
- Alle functionaliteiten werken zoals beschreven in de eisen/wensen.  
- Uploads van tekst/foto’s correct functioneren.  
- Realtime updates werken zonder refresh.  
- Feedback en status worden correct weergegeven.  
- Code is getest, foutloos en gedocumenteerd.  
- Applicatie werkt op desktop en mobiel.  

---

## 📖 Eisen gekoppeld aan User Stories

| Eis | User Stories | Bewijsbestand |
|------|---------------|----------------|
| E1 | Kaart bekijken | `examen/backlog.md` |
| E2 | Kaart bekijken, Nieuwe opdracht toevoegen | `examen/backlog.md` |
| E3 | Opdracht inleveren | `examen/backlog.md` |
| E4 | Opdracht beoordelen, Overzicht voortgang | `examen/backlog.md` |
| E5 | Status bekijken, Live notificaties | `examen/backlog.md` |
| W1 | Nieuwe opdracht toevoegen | `examen/backlog.md` |
| W2 | Feedback ontvangen, Live notificaties | `examen/backlog.md` |
| W3 | Alle stories (gebruiksvriendelijkheid verwerkt) | `examen/backlog.md` |

---

## 👥 User Stories

### 📘 Leerling

| Titel | Kaart bekijken |
|-------|----------------|
| **Als een...** | Leerling |
| **Wil ik...** | alle pinpoints met opdrachten op een kaart zien |
| **Zodat ik...** | eenvoudig kan kiezen welke opdracht ik wil doen |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Kaart toont alle pinpoints<br>2️⃣ Pinpoints zijn klikbaar<br>3️⃣ Opdrachtdetails zichtbaar |
| **Scenario** | 1. Leerling opent app → 2. Kaart toont pinpoints → 3. Klik toont opdracht |
| **DoD** | Kaart toont pinpoints correct en foutloos |
| **Tijdsindicatie** | M (4 uur) |

---

| Titel | Opdracht inleveren |
|-------|--------------------|
| **Als een...** | Leerling |
| **Wil ik...** | mijn oplossing of bewijs kunnen uploaden |
| **Zodat ik...** | de docent mijn inzending kan beoordelen |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Upload tekst/foto<br>2️⃣ Koppeling aan juiste opdracht<br>3️⃣ Status “in afwachting” |
| **Scenario** | 1. Leerling uploadt bestand → 2. Status verandert naar “in afwachting” |
| **DoD** | Uploads werken correct en zijn gekoppeld aan opdracht |
| **Tijdsindicatie** | M (4 uur) |

---

| Titel | Status bekijken |
|-------|----------------|
| **Als een...** | Leerling |
| **Wil ik...** | realtime zien of mijn opdrachten goed- of afgekeurd zijn |
| **Zodat ik...** | weet wat ik nog moet verbeteren |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Status per opdracht zichtbaar<br>2️⃣ Automatische updates<br>3️⃣ Melding bij wijziging |
| **Scenario** | Leerling opent dashboard → Status wijzigt live |
| **DoD** | Realtime status werkt via websockets |
| **Tijdsindicatie** | S (2 uur) |

---

| Titel | Feedback ontvangen |
|-------|--------------------|
| **Als een...** | Leerling |
| **Wil ik...** | feedback van de docent kunnen zien |
| **Zodat ik...** | weet wat ik moet verbeteren |
| **Prioriteit** | Should have |
| **Acceptatiecriteria** | 1️⃣ Feedbackveld zichtbaar<br>2️⃣ Feedback wordt opgeslagen<br>3️⃣ Leerling krijgt melding |
| **DoD** | Feedback correct weergegeven |
| **Tijdsindicatie** | S (2 uur) |

---

### 📗 Docent

| Titel | Opdracht beoordelen |
|-------|--------------------|
| **Als een...** | Docent |
| **Wil ik...** | opdrachten goedkeuren of afkeuren |
| **Zodat ik...** | voortgang van leerlingen kan bijhouden |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Docent ziet inzendingen<br>2️⃣ Kan status wijzigen<br>3️⃣ Leerling krijgt update |
| **DoD** | Status-updates correct gesynchroniseerd |
| **Tijdsindicatie** | M (4 uur) |

---

| Titel | Nieuwe opdracht toevoegen |
|-------|---------------------------|
| **Als een...** | Docent |
| **Wil ik...** | nieuwe pinpoints met opdrachten toevoegen |
| **Zodat ik...** | het spel kan uitbreiden |
| **Prioriteit** | Should have |
| **Acceptatiecriteria** | 1️⃣ Titel/beschrijving/locatie invoeren<br>2️⃣ Opdracht verschijnt direct |
| **DoD** | Opdracht direct zichtbaar op kaart |
| **Tijdsindicatie** | S (2 uur) |

---

| Titel | Overzicht voortgang |
|-------|----------------------|
| **Als een...** | Docent |
| **Wil ik...** | overzicht van leerlingen met voortgang |
| **Zodat ik...** | prestaties kan monitoren |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Overzicht per leerling<br>2️⃣ Percentage voltooid<br>3️⃣ Filteropties |
| **DoD** | Overzicht werkt correct, percentages kloppen |
| **Tijdsindicatie** | M (4 uur) |

---

| Titel | Live notificaties |
|-------|-------------------|
| **Als een...** | Docent |
| **Wil ik...** | realtime meldingen ontvangen bij nieuwe inzendingen |
| **Zodat ik...** | snel kan reageren |
| **Prioriteit** | Must have |
| **Acceptatiecriteria** | 1️⃣ Melding bij nieuwe inzending<br>2️⃣ Klik opent inzending<br>3️⃣ Dashboard werkt zonder refresh |
| **DoD** | Meldingen werken realtime |
| **Tijdsindicatie** | M (4 uur) |

---

## 🗓️ Sprint Planning

### 🔹 Sprint 1 (Week 1–2)
**Doel:** Basisfunctionaliteiten werkend voor leerlingen en docenten.

| Story | Verantwoordelijke | Prioriteit | Tijd | Uren | Opmerkingen |
|--------|-------------------|-------------|------|------|--------------|
| Kaart bekijken | Davey | Must | M | 4 | Basisfunctionaliteit |
| Opdracht inleveren | Davey | Must | M | 4 | Upload testen |
| Status bekijken | Davey | Must | S | 2 | Realtime koppeling |
| Opdracht beoordelen | Jada | Must | M | 4 | Dashboard-functionaliteit |

**Totale uren Sprint 1:** 14  
**Risico’s:** upload vertragingen kunnen realtime feedback beïnvloeden.  
**Sprint DoD:** Leerling & docent kunnen basisflow uitvoeren.

---

### 🔹 Sprint 2 (Week 3–4)
**Doel:** Verbeterde interactie & extra functionaliteiten.

| Story | Verantwoordelijke | Prioriteit | Tijd | Uren | Opmerkingen |
|--------|-------------------|-------------|------|------|--------------|
| Nieuwe opdrachten ontdekken | Davey | Should | S | 2 | Automatische updates |
| Feedback ontvangen | Davey | Should | S | 2 | Feedback tonen |
| Nieuwe opdracht toevoegen | Jada | Should | S | 2 | Dashboard uitbreiding |
| Overzicht voortgang | Jada | Must | M | 4 | Statistieken |
| Feedback geven | Jada | Should | S | 2 | Feedbackveld |
| Live notificaties | Jada | Must | M | 4 | Meldingen voor inzendingen |

**Totale uren Sprint 2:** 16  
**Sprint DoD:** Extra functionaliteit gereed en getest.

---

## 📊 Scrum Board Schematisch

**Sprint 1**
| To Do | In Progress | Done |
|-------|--------------|------|
| Kaart bekijken | Opdracht inleveren | Status bekijken |
| Opdracht beoordelen |  |  |

**Sprint 2**
| To Do | In Progress | Done |
|-------|--------------|------|
| Nieuwe opdrachten ontdekken | Feedback geven | Overzicht voortgang |
| Feedback ontvangen | Nieuwe opdracht toevoegen | Live notificaties |

---

## 🧾 Voortgangsbewaking (Criterium 1.4)

**Doel:** aantonen dat voortgang actief is bewaakt en beslissingen zijn genomen op basis van prioriteiten.

### Bewijsstukken

| Datum | Type | Bestand | Toelichting |
|--------|------|----------|--------------|
| 2025-10-01 | Scrum board snapshot (begin Sprint 1) | `examen/evidence/screenshot_sprint1_start.png` | Start Sprint 1 – basistaken To Do |
| 2025-10-07 | Sprint 1 retrospectief | `examen/evidence/sprint1_retro.md` | Upload feature duurde langer; prioriteit feedback verplaatst |
| 2025-10-14 | Scrum board snapshot (eind Sprint 1) | `examen/evidence/screenshot_sprint1_end.png` | Kaart en upload afgerond; feedback naar Sprint 2 |
| 2025-10-15 | Commit bewijs | `examen/evidence/commit_list_sprint1.md` | Lijst commit-hashes en korte omschrijving |
