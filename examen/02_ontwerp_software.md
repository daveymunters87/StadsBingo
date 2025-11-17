# 📘 StadsBingo – 02_ontwerp_software.md

## 📊 UML-diagrammen

### 1️⃣ ERD / Class Diagram
**Beschrijving:**  
Dit diagram toont de entiteiten en relaties van de StadsBingo-applicatie met **teams**, **teamcodes** en een opdrachten-flow met statussen.

**Entiteiten:**
- **Gebruiker** (abstract; velden: `id`, `naam`, `email`, `rol`)
- **Leerling** (erft van Gebruiker)
- **Docent** (erft van Gebruiker)
- **Team** (`id`, `naam`, `teamCode`)
- **TeamLidmaatschap** (`id`, `teamId`, `leerlingId`)
- **Opdracht** (`id`, `titel`, `beschrijving`, `volgorde`, `actief`)
- **Inzending** (`id`, `opdrachtId`, `leerlingId`, `teamId`, `tekstAntwoord`, `status`, `feedback`, `aangemaaktOp`)

**Relaties:**
- 1-op-n: Docent → Team (één docent kan meerdere teams beheren)  
- 1-op-n: Team → TeamLidmaatschap (één team, meerdere teamleden)  
- 1-op-n: Leerling → TeamLidmaatschap (leerling gekoppeld aan team(s))  
- 1-op-n: Team → Inzending (één team, meerdere inzendingen)  
- 1-op-n: Opdracht → Inzending (één opdracht, meerdere inzendingen)  
- 1-op-n: Leerling → Inzending (één leerling, meerdere inzendingen)  
- n-op-n (impliciet via Inzending): Leerling ↔ Opdracht  
- Gebruiker is abstract; Leerling en Docent erven van Gebruiker  

**Notities bij afbakening:**
- Geen kaart- of locatie-entiteiten; focus ligt op teams, opdrachten en beoordeling.  
- `Inzending.tekstAntwoord` is een tekstveld (geen bestand-uploads).  
- `Inzending.status ∈ {Locked, Available, Pending, Feedback, Approved}`; `Locked` wordt afgeleid op basis van `volgorde` en eerdere inzendingen.

**ERD afbeelding (plaats in bewijsmateriaal):**  
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

**Proces**  
1. Leerling opent de app en voert teamcode in bij **LoginView**.  
2. LoginView → API: `POST /auth/team-login` met `teamCode`.  
3. API valideert de code, zoekt het bijbehorende **Team** en gekoppelde **Leerling** op en geeft een sessie/token terug.  
4. **OpdrachtenDashboard** → API: `GET /opdrachten` voor dit team/leerling; API bepaalt per opdracht de status (`Locked`, `Available`, `Pending`, `Feedback`, `Approved`).  
5. Leerling opent een **Available** opdracht in **OpdrachtDetailView**, vult tekst in en verstuurt.  
6. OpdrachtDetailView → API: `POST /inzendingen` → Database slaat **Inzending** op met status `Pending`.  
7. **DocentDashboard** → API: `GET /inzendingen?teamId=...&status=Pending` toont openstaande inzendingen gefilterd op team en status.  
8. Docent beoordeelt: DocentDashboard → API: `PATCH /inzendingen/:id` met status `Approved` of `Feedback` + feedbacktekst.  
9. Bij `Approved` markeert backend de volgende opdracht in de volgorde als `Available` voor deze leerling (en team).  
10. Leerling opent opnieuw het dashboard en ziet bijgewerkte statussen en feedback.

**Sequence diagram afbeelding:**  
`examen/bewijsmateriaal/02/sequence.png`

---

## 📝 Onderbouwing van ontwerpkeuzes

### Ethiek
- Toegang tot inzendingen is rolgebaseerd (alleen docent ziet inzendingen van leerlingen).  
- Feedback is constructief en alleen zichtbaar voor de betrokken leerling.

### Privacy
- We slaan minimale persoonsgegevens op (naam, email, rol).  
- Inzending bevat enkel tekst; geen bestanden of locaties.  
- Dataretentie is beperkt tot onderwijsdoeleinden en portfolio-bewijs.

### Security
- Rolgebaseerde toegang (leerling/docent) bij endpoints en views.  
- Server-side validatie op `tekstAntwoord` (lengte, verboden inhoud).  
- Geen WebSockets/bestand-uploads → verkleinde aanvalsvector.  
- Acties approve/reject gelogd per docent-gebruiker.

---

**Conclusie:**  
Het ontwerp sluit aan op de README-afbakening en de examen-eisen (E1–E5). Het model is klein maar dekkend: lijst opdrachten, inzenden met tekst, beoordelen door docent en status/feedback-weergave.

---

## Helptool voor de diagrammen (optioneel)

Gebruik Lucidchart of vergelijkbaar. Lever de afbeeldingen op in:  
`examen/bewijsmateriaal/02/erd.png` en `examen/bewijsmateriaal/02/sequence.png`.