# City Bingo Ontwerp Portfolio

## Ontwerp (Criterium 2.1)

Het ontwerp van de City Bingo-app is gebaseerd op de eerder opgestelde user stories.  
Het ontwerp omvat zowel het dataschema, de klassen en interacties die nodig zijn om de eisen en wensen van de opdrachtgever te realiseren.

**Belangrijkste onderdelen:**
- Realtime opdrachten en goedkeuringen
- Leerlingen kunnen opdrachten uitvoeren
- Docenten kunnen opdrachten beoordelen
- Kaart met pinpoints door de stad

### Diagrammen
- **ERD (Entity-Relationship Diagram)**  
  Minimaal 6 entiteiten: `User`, `Teacher`, `Student`, `Challenge`, `Submission`, `Location`  
  - 1 x 1-op-1 relatie: `Student` ↔ `UserProfile`  
  - 2 x 1-op-n relatie: `Teacher` → `Challenge`, `Student` → `Submission`  
  - 1 x n-op-n relatie: `Student` ↔ `Challenge` (via `Submission`)  

- **Use Case Diagram**  
  - 3 actoren: `Student`, `Teacher`, `Admin`  
  - 1 system: `City Bingo App`  
  - 10 goals: opdrachten voltooien, goedkeuren, kaart bekijken, nieuwe opdrachten toevoegen, realtime updates ontvangen, enz.  

- **Sequence Diagram**  
  - Minstens 6 objecten: `Student UI`, `App Server`, `Database`, `Teacher UI`, `Notification Service`, `Submission Handler`  
  - Loops voor meerdere inzendingen en alternatieven voor goedkeuren/afkeuren  

- **Class Diagram**  
  - Minstens 6 classes: `User`, `Teacher`, `Student`, `Challenge`, `Submission`, `Location`  
  - Abstract class: `User` (geërfd door `Teacher` en `Student`)  
  - Interface: `IReviewable` gebruikt door `Challenge`  
  - Klassen hebben onderlinge relaties (bijv. `Submission` ↔ `Student`, `Challenge` ↔ `Location`)  

> Voeg hier je diagrammen toe als afbeeldingen van Lucidchart, Astah of een andere UML-tool.

---

## Schematechnieken (Criterium 2.2)

Het ontwerp maakt gebruik van de volgende schematechnieken:  
1. **Activiteitendiagram** – toont het proces van opdracht uitvoeren en goedkeuren  
2. **ERD** – toont het dataschema voor alle entiteiten en hun relaties  
3. **Class Diagram** – toont de objectenstructuur en overerving  
4. **Use Case Diagram** – laat de interacties tussen actoren en het systeem zien  

> Elk diagram weerspiegelt de eisen en wensen van de opdrachtgever, inclusief realtime updates, goedkeuringen en kaartfunctionaliteit.

---

## Onderbouwing van ontwerpkeuzes (Criterium 2.3)

### Ethiek
- Alleen noodzakelijke gegevens van leerlingen worden opgeslagen (`UserProfile` bevat naam en studentnummer).  
- Docenten hebben beperkte toegang tot inzendingen van hun eigen studenten.  

### Privacy
- Persoonsgegevens worden veilig opgeslagen in PostgreSQL met versleutelde verbindingen.  
- Realtime updates bevatten alleen relevante statusinformatie; geen gevoelige gegevens worden via het netwerk gedeeld.  

### Security
- Authenticatie en autorisatie zorgen dat leerlingen alleen hun eigen opdrachten kunnen voltooien.  
- Docenten hebben aparte rollen en rechten om opdrachten goed te keuren.  
- Prisma ORM voorkomt SQL-injecties en zorgt voor veilige database toegang.  

**Conclusie:**  
Het ontwerp sluit volledig aan op de eisen en wensen van de opdrachtgever en is technisch en functioneel onderbouwd. Diagrammen, dataschema’s en class structuur laten duidelijk zien hoe de app wordt gerealiseerd.

---

## Voorbeeld screenshots

**ERD Diagram:**  
![ERD](link-naar-ERD.png)  

**Class Diagram:**  
![Class Diagram](link-naar-class-diagram.png)  

**Use Case Diagram:**  
![Use Case Diagram](link-naar-use-case.png)  

**Activiteitendiagram:**  
![Activity Diagram](link-naar-activity-diagram.png)
