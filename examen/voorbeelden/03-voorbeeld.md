# City Bingo Code Portfolio

## 3.1 Functionaliteit volgens user stories
Alle toegewezen user stories zijn binnen de geplande tijd gerealiseerd.  
Belangrijke functionaliteiten:
- Kaartweergave van de stad met pinpoints
- Challenges toevoegen door docenten
- Challenges voltooien door leerlingen
- Realtime goedkeuren/afkeuren van opdrachten
- Notificaties naar leerlingen bij goedkeuring

Deze functionaliteiten zijn direct gekoppeld aan de user stories en voldoen aan de geplande tijdsduur.

---

## 3.2 Voldoen aan eisen en wensen
Elke functionaliteit is ontwikkeld conform de eisen en wensen:
- Realtime updates via WebSocket (backend → frontend)
- Validatie van opdrachten en inzendingen
- Docenten kunnen opdrachten alleen goedkeuren voor hun eigen klas
- CRUD-functionaliteit voor challenges en submissions
- Kaartweergave interactief en overzichtelijk

---

## 3.3 Kwaliteit van de code
De code is ontwikkeld met aandacht voor:
- **Structuur:** MVC-principe toegepast, scheiding frontend/backend
- **Validatie:** alle formulieren en inzendingen worden gevalideerd
- **Foutafhandeling:** try/catch en nette error responses
- **Security:** gebruik van Prisma ORM om SQL-injecties te voorkomen; authenticatie/autorisation goed geregeld
- **Efficiëntie:** minimalisatie van database queries en herbruikbare componenten in Next.js

---

## 3.4 Code conventions
- Alle bestanden volgen consistente naamgevingsconventies
- Variabelen en functies zijn duidelijk benoemd (`camelCase` voor JS, PascalCase voor componenten)
- Mappenstructuur consistent met standaard Next.js project
- JSX- en CSS-structuur overzichtelijk en uniform

---

## 3.5 Verzorgd, leesbaar en commentaar
- Code is leesbaar en logisch ingedeeld per functionaliteit
- Belangrijke functies en methodes zijn voorzien van commentaar
- Componenten en helpers bevatten korte toelichtingen over hun doel
- Voorbeeld:  

```ts
// Controleert of student gemachtigd is voor deze challenge
function canAccessChallenge(studentId: string, challengeId: string): boolean {
  // Fetch student en challenge info, check relation
  ...
}
