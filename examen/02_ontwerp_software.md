# 📘 StadsBingo – 02_ontwerp_software.md

## 📊 UML-diagrammen

### 1️⃣ ERD / Class Diagram (vereenvoudigd domeinmodel)
**Beschrijving:**  
Dit diagram toont de entiteiten en relaties van de vereenvoudigde StadsBingo-applicatie (geen kaart, geen uploads, geen realtime).

**Entiteiten:**
- **Gebruiker** (abstract; velden: `id`, `naam`, `email`, `rol`)
- **Leerling** (erft van Gebruiker)
- **Docent** (erft van Gebruiker)
- **Opdracht** (`id`, `titel`, `beschrijving`, `actief`)
- **Inzending** (`id`, `opdrachtId`, `leerlingId`, `tekstAntwoord`, `status`, `feedback`, `aangemaaktOp`)

**Relaties:**
- 1-op-n: Opdracht → Inzending (één opdracht, meerdere inzendingen)  
- 1-op-n: Leerling → Inzending (één leerling, meerdere inzendingen)  
- n-op-n (impliciet via Inzending): Leerling ↔ Opdracht  
- Gebruiker is abstract; Leerling en Docent erven van Gebruiker  

**Notities bij README-afbakening:**
- Geen `Kaart` of `Pinpoint` entiteiten.
- `Inzending.tekstAntwoord` in plaats van bestand-uploads.
- `Inzending.status ∈ {pending, approved, rejected}`.

**ERD afbeelding (plaats in bewijsmateriaal):**  
`examen/bewijsmateriaal/02/erd.png`

---

### 2️⃣ Sequence Diagram – Indienen en Beoordelen
**Beschrijving:**  
Flow van leerling die indient en docent die beoordeelt (zonder realtime).

**Objecten:**
- Leerling  
- OpdrachtDetailView  
- API (POST /inzendingen)  
- DocentDashboard  
- API (PATCH /inzendingen/:id)  
- Database  

**Proces:**  
1. Leerling opent opdracht-detail en vult tekst in.  
2. OpdrachtDetailView → API: maak Inzending (status = pending).  
3. Database slaat Inzending op.  
4. DocentDashboard haalt openstaande inzendingen op.  
5. Docent kiest approve/reject en vult feedback in.  
6. API werkt `status` en `feedback` bij.  
7. Leerling ziet bij refresh status/feedback.

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