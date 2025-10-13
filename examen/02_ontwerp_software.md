# 📘 StadsBingo – 02_ontwerp_software.md

## 📊 UML-diagrammen

### 1️⃣ Class Diagram / ERD
**Beschrijving:**  
Dit diagram laat de belangrijkste klassen en relaties zien binnen de StadsBingo-applicatie.  

**Classes / Entiteiten:**
- **Abstract Class:** Gebruiker (ervaren door Leerling en Docent)  
- **Leerling**  
- **Docent**  
- **Opdracht**  
- **Kaart**  
- **Pinpoint**  
- **Upload / Inzending**  

**Relaties:**
- **1-op-1:** Kaart ↔ Docent  
  - Een docent beheert één kaart, dit sluit aan bij de user story “Nieuwe opdrachten toevoegen” (W1).  
- **1-op-n:** Kaart ↔ Pinpoint  
  - Eén kaart bevat meerdere pinpoints met opdrachten (E1, E2).  
- **1-op-n:** Leerling ↔ Upload  
  - Een leerling kan meerdere inzendingen doen (E3).  
- **n-op-n:** Leerling ↔ Opdracht  
  - Leerlingen kunnen meerdere opdrachten doen, en opdrachten kunnen door meerdere leerlingen gedaan worden (E3, E5).  
- **Abstract Class:** Gebruiker  
  - Leerling en Docent erven van Gebruiker.  
- **Interface:** Beoordelbaar  
  - Opdracht implementeert Beoordelbaar, waardoor Docenten opdrachten kunnen goedkeuren of afkeuren (E4).  

**Class Diagram / ERD afbeelding:**  
![Class Diagram](pad/naar/class_diagram.png)

---

### 2️⃣ Sequence Diagram / Activity Diagram
**Beschrijving:**  
Toont het proces van een leerling die een opdracht inlevert en een docent die deze beoordeelt.  

**Objecten:**
- Leerling  
- Opdracht  
- Upload  
- Docent  
- Notificatie  
- Dashboard  

**Proces:**  
1. Leerling selecteert opdracht op kaart.  
2. Leerling uploadt bewijs.  
3. Upload wordt gekoppeld aan opdracht.  
4. Docent ontvangt notificatie.  
5. Docent beoordeelt opdracht.  
6. Status-update en feedback worden weergegeven bij de leerling.  
7. **Loop:** Leerling kan meerdere opdrachten achter elkaar inleveren.  

**Sequence Diagram / Activity Diagram afbeelding:**  
![Sequence Diagram](pad/naar/sequence_diagram.png)

---

## 📝 Onderbouwing van ontwerpkeuzes

### Ethiek
- Alleen docenten hebben toegang tot inzendingen van leerlingen, zodat privacy van andere leerlingen gewaarborgd blijft.  
- Gegevens worden uitsluitend gebruikt voor onderwijsdoeleinden.  
- Feedback is constructief en zichtbaar alleen voor de betreffende leerling (E4, W2).  

### Privacy
- Persoonsgegevens (naam, leerling-ID) worden minimaal opgeslagen en gekoppeld aan inzendingen.  
- Uploads zijn beveiligd en toegankelijk voor de juiste leerling en docent.  
- Alleen relevante data voor voortgang en beoordeling worden opgeslagen (E3, E5).  

### Security
- Realtime updates verlopen via beveiligde WebSocket-verbinding.  
- Dashboard en inzendingen zijn beveiligd met login en rolbeheer (leerling/docent).  
- Uploads worden gecontroleerd op bestandstype en grootte om misbruik te voorkomen.  
- Beoordelingsfunctionaliteit is alleen beschikbaar voor geauthenticeerde docenten (E4, W1).  

---

**Conclusie:**  
Het ontwerp voldoet volledig aan de eisen van de opdracht. Zowel de class diagram/ERD als het sequence diagram zijn van voldoende complexiteit en tonen de relaties tussen de objecten, inclusief abstract class en interface. Het ontwerp is duidelijk gekoppeld aan alle user stories en de onderbouwing adresseert expliciet ethiek, privacy en security.


## Hi Jada, Hierbij een helptool voor het maken van de 2 diagrammen:

## 1️⃣ Class Diagram / ERD

### Stap 1: Nieuwe diagram aanmaken
1. Open Lucidchart.
2. Klik op **+ Nieuw Document**.
3. Kies **UML Class Diagram**.
4. Sleep een class naar je canvas voor elke entiteit:
   - Gebruiker (abstract class)
   - Leerling
   - Docent
   - Opdracht
   - Kaart
   - Pinpoint
   - Upload / Inzending

### Stap 2: Klassen invullen

**Abstract Class: Gebruiker**  
- Attributen: `naam`, `email`, `id`  
- Methoden: `login()`, `logout()`  
- Zet **abstract** aan in Lucidchart (option in properties)

**Leerling (erft van Gebruiker)**  
- Attributen: `leerlingID`, `score`  
- Methoden: `uploadOpdracht()`

**Docent (erft van Gebruiker)**  
- Attributen: `docentID`  
- Methoden: `beoordeelOpdracht()`, `voegOpdrachtToe()`

**Opdracht**  
- Attributen: `titel`, `beschrijving`, `status`  
- Methoden: `updateStatus()`, `voegFeedbackToe()`  
- Implementeer de interface **Beoordelbaar**

**Kaart**  
- Attributen: `locatie`, `pinpoints` (lijst)

**Pinpoint**  
- Attributen: `coordinaten`, `opdracht`

**Upload / Inzending**  
- Attributen: `bestand`, `datum`, `status`

### Stap 3: Relaties tekenen
- **1-op-1:** Kaart ↔ Docent → lijn met “1” aan beide zijden  
- **1-op-n:** Kaart ↔ Pinpoint → lijn met “1” bij Kaart, “*” bij Pinpoint  
- **1-op-n:** Leerling ↔ Upload → lijn met “1” bij Leerling, “*” bij Upload  
- **n-op-n:** Leerling ↔ Opdracht → lijn met “*” aan beide zijden  
- **Abstract Class:** Gebruiker → pijlen naar Leerling en Docent (erfenis)  
- **Interface:** Beoordelbaar → lijn naar Opdracht  

### Tips
- Zet attributen bovenin de class, methoden eronder.  
- Gebruik pijlen voor inheritance (erfenis) en stippellijn voor interface.  
- Voeg een legenda toe als het diagram complex wordt.

---

## 2️⃣ Sequence Diagram

### Stap 1: Nieuw diagram
1. Kies **Sequence Diagram** in Lucidchart.
2. Sleep de volgende actors / objects naar je canvas:
   - Leerling
   - Kaart
   - Opdracht
   - Upload / Inzending
   - Docent
   - Notificatie
   - Dashboard

### Stap 2: Interactie tekenen
- `Leerling → Kaart: selecteerOpdracht()`  
- `Leerling → Upload: uploadBestand()`  
- `Upload → Opdracht: koppelUpload()`  
- `Opdracht → Docent: stuurNotificatie()`  
- `Docent → Opdracht: beoordeelOpdracht()`  
- `Opdracht → Upload: updateStatus()`  
- `Upload → Leerling: toonFeedback()`  

**Loop:** Leerling kan meerdere opdrachten achter elkaar inleveren (gebruik **loop frame** in Lucidchart)

### Stap 3: Tips
- Voeg activiteitstekens of lifelines toe voor duidelijkheid.  
- Gebruik opties / loop frames voor herhalingen.  
- Voeg pijlen met berichten / method calls tussen objecten toe.