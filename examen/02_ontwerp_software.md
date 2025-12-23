# 📘 StadsBingo – 02_ontwerp_software.md

## 📊 UML-diagrammen

### 1️⃣ ERD / Class Diagram
**Beschrijving:**  
Dit diagram toont de entiteiten en relaties van de StadsBingo-applicatie met **teams**, **teamcodes** en een opdrachten-flow met statussen.

**Entiteiten en attributen:**

- **User** (Docent/Admin)
  - `id (PK)`
  - `email (UNIQUE)`
  - `name`
  - `password`
  - `role` (USER/ADMIN)
  - `createdAt`

- **Team**
  - `id (PK)`
  - `name`
  - `code (UNIQUE)` - teamcode voor login
  - `createdAt`
  - `createdById (FK → User.id)` [1-op-n]
  - `captainId (FK → TeamPlayer.id, UNIQUE)` [1-op-1]

- **TeamPlayer** (Leerlingen)
  - `id (PK)`
  - `name`
  - `studentNumber`
  - `teamId (FK → Team.id)` [1-op-n]

- **Assignment** (Opdrachten)
  - `id (PK)`
  - `title`
  - `description`
  - `location`
  - `order` - volgorde van opdrachten
  - `exampleImage`
  - `createdAt`

- **TeamAssignment** (tussentabel voor n-op-n)
  - `id (PK)`
  - `teamId (FK → Team.id)`
  - `assignmentId (FK → Assignment.id)`
  - `createdAt`

- **Submission** (Inzendingen)
  - `id (PK)`
  - `teamId (FK → Team.id)` [1-op-n]
  - `assignmentId (FK → Assignment.id)` [1-op-n]
  - `playerId (FK → TeamPlayer.id, NULLABLE)` [1-op-n]
  - `answerText`
  - `answerImage`
  - `status` (LOCKED/AVAILABLE/PENDING/FEEDBACK/APPROVED)
  - `feedback`
  - `createdAt`
  - `updatedAt`

**Relaties en cardinaliteiten:**
- User → Team: 1-op-n (één docent kan meerdere teams aanmaken)
- Team → TeamPlayer: 1-op-n (één team heeft meerdere spelers)
- Team → TeamPlayer (captain): 1-op-1 (één team heeft één captain)
- Team → TeamAssignment: 1-op-n (één team heeft meerdere opdrachten)
- Assignment → TeamAssignment: 1-op-n (één opdracht kan aan meerdere teams)
- Team → Submission: 1-op-n (één team heeft meerdere inzendingen)
- Assignment → Submission: 1-op-n (één opdracht heeft meerdere inzendingen)
- TeamPlayer → Submission: 1-op-n (één speler kan meerdere inzendingen doen)

**Notities bij afbakening:**
- **6+ entiteiten:** User, Team, TeamPlayer, Assignment, TeamAssignment, Submission
- **1-op-1 relatie:** Team ↔ TeamPlayer (captain)
- **2+ 1-op-n relaties:** User → Team, Team → TeamPlayer, Team → Submission
- **1+ n-op-n relatie:** Team ↔ Assignment (via TeamAssignment tussentabel)
- Leerlingen loggen in via teamcode (geen individuele accounts)
- Status-flow: LOCKED → AVAILABLE → PENDING → FEEDBACK/APPROVED

**ERD afbeelding:**  
`examen/bewijsmateriaal/02/erd.png`

---

### 2️⃣ Sequence Diagram – Team login, opdracht indienen en beoordelen
**Beschrijving:**  
Flow van teamspeler die met een **teamcode** inlogt, een opdracht indient en admin die beoordeelt, inclusief status-overgangen.

**Objecten (6+):**
- TeamPlayer (leerling)
- TeamLoginPage
- StudentDashboard
- ExerciseDetailPage
- AdminDashboard
- API (Next.js API routes)
- Database (PostgreSQL + Prisma)

**Proces met loop en alternative:**  
1. **Login Flow:**
   - TeamPlayer opent app → TeamLoginPage
   - TeamLoginPage → API: `POST /api/auth/team-login` met teamCode
   - API → Database: zoek Team met code
   - **Alternative:** Code ongeldig → foutmelding
   - **Alternative:** Code geldig → sessie aanmaken, redirect naar dashboard

2. **Dashboard Flow:**
   - StudentDashboard → API: `GET /api/exercises` voor team
   - API → Database: haal assignments + submissions op
   - **Loop:** Voor elke assignment, bepaal status (LOCKED/AVAILABLE/PENDING/FEEDBACK/APPROVED)
   - Return opdrachtenlijst met statussen

3. **Submission Flow:**
   - TeamPlayer opent AVAILABLE opdracht → ExerciseDetailPage
   - ExerciseDetailPage → API: `POST /api/submissions` met answerText/answerImage
   - API → Database: maak Submission met status PENDING
   - **Alternative:** Validatiefout → toon foutmelding
   - **Alternative:** Success → status update, redirect naar dashboard

4. **Review Flow:**
   - AdminDashboard → API: `GET /api/admin/submissions?status=PENDING`
   - API → Database: haal submissions op met filters
   - Admin beoordeelt → API: `PATCH /api/admin/submissions/[id]`
   - **Alternative:** Status = APPROVED → volgende opdracht wordt AVAILABLE
   - **Alternative:** Status = FEEDBACK → feedback opslaan, leerling kan opnieuw indienen

**Sequence diagram afbeelding:**  
`examen/bewijsmateriaal/02/sequence.png`

---

## 📝 Onderbouwing van ontwerpkeuzes

### Ethiek
- **Rolgebaseerde toegang:** Alleen admins kunnen teams en opdrachten beheren
- **Transparante beoordeling:** Feedback is altijd zichtbaar voor teams bij FEEDBACK status
- **Gelijke behandeling:** Alle teams krijgen dezelfde opdrachten in dezelfde volgorde
- **Constructieve feedback:** Systeem vereist feedback bij afwijzing om leerproces te ondersteunen

### Privacy
- **Minimale dataverzameling:** Alleen naam, studentnummer en teamcode opgeslagen
- **Geen persoonlijke accounts:** Leerlingen loggen in via teamcode, geen individuele profielen
- **Beperkte data-opslag:** Submissions bevatten alleen tekst/foto voor opdrachten
- **Team-gebaseerde privacy:** Leerlingen zien alleen eigen team-inzendingen
- **Dataretentie:** Data wordt alleen bewaard voor onderwijsdoeleinden

### Security
- **Server-side validatie:** Alle input wordt gevalideerd (teamcodes, submissions, feedback)
- **Rolgebaseerde autorisatie:** Admin-endpoints beveiligd met middleware
- **Session management:** Veilige cookie-based sessies voor team-login
- **SQL injection preventie:** Prisma ORM voorkomt directe SQL queries
- **Input sanitization:** Tekst en afbeeldingen worden gevalideerd voor veiligheid
- **Audit trail:** Alle status-wijzigingen worden gelogd met timestamp
- **Cascade deletes:** Referentiële integriteit gewaarborgd bij verwijdering

---

**Conclusie:**  
Het ontwerp voldoet volledig aan de examen-eisen en bevat:

**Criterium 2.1 - Volledig ontwerp:**
- Alle user stories uit planning zijn vertaald naar entiteiten en relaties
- ERD met 6 entiteiten, 1-op-1, 1-op-n en n-op-n relaties
- Sequence diagram met 7 objecten, loops en alternatives
- Status-flow systeem (LOCKED → AVAILABLE → PENDING → FEEDBACK/APPROVED)

**Criterium 2.2 - Schematechnieken:**
- ERD toont complete datastructuur voor teams, opdrachten en submissions
- Sequence diagram toont interactie tussen frontend, API en database
- Beide diagrammen sluiten aan op user stories en eisen

**Criterium 2.3 - Onderbouwing:**
- Ethiek, privacy en security aspecten zijn uitgebreid toegelicht
- Ontwerpkeuzes zijn onderbouwd met concrete argumenten
- Relatie met eisen en wensen is duidelijk aangetoond

Het model dekt volledig: team-management, teamcode-login, opdrachten-workflow, status-tracking en admin-functionaliteit.
