# 📘 StadsBingo – 02_ontwerp_software.md

## 📊 UML-diagrammen

### 1️⃣ ERD / Class Diagram
**Beschrijving:**  
Dit diagram toont de entiteiten en relaties van de StadsBingo-applicatie met **teams**, **teamcodes** en een opdrachten-flow met statussen.

**Entiteiten en attributen:**

- **Gebruiker** `<<abstract>>`
  - `id (PK)`
  - `naam`
  - `email`
  - `rol`
  
- **Leerling** `(erft van Gebruiker)`
  - `id (PK, FK → Gebruiker.id)`
  
- **Docent** `(erft van Gebruiker)`
  - `id (PK, FK → Gebruiker.id)`

- **Team**
  - `id (PK)`
  - `docentId (FK → Docent.id)` [1-op-n]
  - `teamLeiderId (FK → Leerling.id, UNIQUE)` [1-op-1]
  - `naam`
  - `teamCode (UNIQUE)`

- **Teamlid** `(tussentabel voor n-op-n)`
  - `id (PK)`
  - `leerlingId (FK → Leerling.id)`
  - `teamId (FK → Team.id)`
  - `rol` (bijv. "lid", "leider")
  - `toegevoegdOp`

- **Opdracht**
  - `id (PK)`
  - `titel`
  - `beschrijving`
  - `volgorde`
  - `actief`

- **Inzending**
  - `id (PK)`
  - `opdrachtId (FK → Opdracht.id)`
  - `teamId (FK → Team.id)` [1-op-n]
  - `tekstAntwoord`
  - `fotoURL`
  - `status` `(Pending / Goedgekeurd / Afgekeurd)`
  - `feedback`
  - `aangemaaktOp`

**Notities bij afbakening:**
- Alle relaties zijn correct weergegeven: 1-op-1, 1-op-n en n-op-n via tussentabel `Teamlid`.
- Gebruiker is abstract; Leerling en Docent erven hiervan.
- `Inzending` bevat tekst of foto.
- `TeamCode` uniek per team.

**ERD afbeelding:**  
`examen/bewijsmateriaal/02/erd.png`

---

### 2️⃣ Sequence Diagram – Inloggen, indienen en beoordelen
**Beschrijving:**  
Flow van leerling die met een **teamcode** inlogt, een opdracht indient en docent die beoordeelt, inclusief status-overgangen.

**Objecten:**
- Leerling  
- LoginView  
- OpdrachtenDashboard (leerling)  
- OpdrachtDetailView  
- DocentDashboard  
- API (`POST /auth/team-login`, `GET /opdrachten`, `GET /inzendingen`, `POST /inzendingen`, `PATCH /inzendingen/:id`)  
- Database  

**Proces:**  
1. Leerling opent de app en voert teamcode in bij **LoginView**.  
2. LoginView → API: `POST /auth/team-login` met `teamCode`.  
3. API valideert de code, zoekt het bijbehorende **Team** en gekoppelde **Leerling** op en geeft een sessie/token terug.  
4. **OpdrachtenDashboard** → API: `GET /opdrachten` voor dit team/leerling; API bepaalt per opdracht de status (`Locked`, `Available`, `Pending`, `Feedback`, `Approved`).  
5. Leerling opent een **Available** opdracht in **OpdrachtDetailView**, vult tekst in of uploadt foto en verstuurt.  
6. OpdrachtDetailView → API: `POST /inzendingen` → Database slaat **Inzending** op met status `Pending`.  
7. **DocentDashboard** → API: `GET /inzendingen?teamId=...&status=Pending` toont openstaande inzendingen gefilterd op team en status.  
8. Docent beoordeelt: DocentDashboard → API: `PATCH /inzendingen/:id` met status `Approved` of `Feedback` + feedbacktekst.  
9. Bij `Approved` markeert backend de volgende opdracht in de volgorde als `Available` voor deze leerling/team.  
10. Leerling opent opnieuw het dashboard en ziet bijgewerkte statussen en feedback.

**Sequence diagram afbeelding:**  
`examen/bewijsmateriaal/02/sequence.png`

---

## 📝 Onderbouwing van ontwerpkeuzes

### Ethiek
- Toegang tot inzendingen is rolgebaseerd (alleen docent ziet inzendingen van leerlingen).  
- Feedback is constructief en alleen zichtbaar voor de betrokken leerling.  
- Leerlingen hebben alleen toegang tot eigen opdrachten en inzendingen.

### Privacy
- Er worden minimale persoonsgegevens opgeslagen (`naam`, `email`, `rol`).  
- Inzendingen bevatten enkel tekst of foto; geen bestanden met gevoelige informatie of locatie.  
- Dataretentie is beperkt tot onderwijsdoeleinden en portfolio-bewijs.

### Security
- Rolgebaseerde toegang bij endpoints en views (leerling/docent).  
- Server-side validatie op `tekstAntwoord` (lengte, verboden inhoud).  
- Acties approve/reject worden gelogd per docent-gebruiker.  
- Geen WebSockets of bestand-uploads buiten fotoURL → verkleinde aanvalsvector.

---

**Conclusie:**  
Het ontwerp sluit volledig aan op de examen-eisen (E1–E5) en de wensen uit de user stories. Alle entiteiten, relaties en flows zijn gedocumenteerd, inclusief ethiek, privacy en security.  
Het model is volledig dekkend: teams, teamleden, opdrachten, inzendingen en feedback.
