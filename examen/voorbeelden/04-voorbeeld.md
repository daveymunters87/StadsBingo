# City Bingo Testplan

## 4.1 Testplan
Dit testplan bevat geautomatiseerde testen voor de City Bingo applicatie. De testen zijn volledig gekoppeld aan de user stories en de belangrijkste functionaliteiten:

**Doelen van het testplan:**
- Verifiëren dat gebruikers challenges kunnen zien, voltooien en indienen.
- Controleren dat docenten opdrachten kunnen goedkeuren of afkeuren.
- Valideren van authenticatie en autorisatie.
- Controleren van realtime updates bij goedkeuring/afkeuring van challenges.

**Gebruikte testtool:** Jest + Testing Library (React) + Supertest (API)  

**Testbestanden (minimaal 10):**
1. `__tests__/challenge.test.ts` – Testen van challenge CRUD en validatie
2. `__tests__/submission.test.ts` – Testen van inzendingen en statusupdates
3. `__tests__/auth.test.ts` – Authenticatie en autorisatie
4. `__tests__/map.test.tsx` – Kaartcomponent en interacties
5. `__tests__/notification.test.tsx` – Realtime notificaties
6. `__tests__/user.test.ts` – Gebruiker CRUD en permissions
7. `__tests__/api/challenges.test.ts` – API-endpoints
8. `__tests__/api/submissions.test.ts` – API-endpoints
9. `__tests__/utils/validation.test.ts` – Form validatie functies
10. `__tests__/hooks/useRealtime.test.ts` – WebSocket functionaliteit

> Alle testen zijn groenttest en kunnen uitgevoerd worden via `npm run test`.

---

## 4.2 Testscenario’s

### Scenario 1: Challenge aanmaken
- **Hoofdscenario:** Docent voegt een nieuwe challenge toe via het formulier.
  - **Testdata:** Titel, locatie, vraag, puntenwaarde
  - **Gewenst resultaat:** Challenge wordt correct opgeslagen in database, zichtbaar op kaart
- **Alternatief 1:** Verplichte velden niet ingevuld → foutmelding
- **Alternatief 2:** Ongeautoriseerde gebruiker probeert challenge toe te voegen → status 403

### Scenario 2: Challenge voltooien door leerling
- **Hoofdscenario:** Leerling voltooit challenge
  - **Testdata:** Challenge ID, leerling ID
  - **Gewenst resultaat:** Inzending opgeslagen, status `pending`
- **Alternatief 1:** Challenge al ingediend → foutmelding
- **Alternatief 2:** Niet ingelogde gebruiker → status 401

### Scenario 3: Goedkeuren/afkeuren door docent
- **Hoofdscenario:** Docent keurt inzending goed
  - **Testdata:** Submission ID, docent ID
  - **Gewenst resultaat:** Status veranderd naar `approved`, notificatie naar leerling
- **Alternatief 1:** Docent probeert inzending goed te keuren van andere klas → status 403
- **Alternatief 2:** Submission ID bestaat niet → status 404

### Scenario 4: Realtime updates
- **Hoofdscenario:** Leerling ontvangt update wanneer challenge is goedgekeurd
  - **Testdata:** WebSocket verbinding leerling
  - **Gewenst resultaat:** Event `submissionApproved` ontvangen
- **Alternatief 1:** Geen actieve verbinding → event niet verzonden, geen fout
- **Alternatief 2:** Meerdere leerlingen verbonden → alle ontvangen event

### Scenario 5: Validatie
- **Hoofdscenario:** Alle formulieren correct ingevuld
- **Alternatief 1:** Verplichte velden missen → foutmelding
- **Alternatief 2:** Ongeldige waarden → foutmelding

---

## 4.3 Testrapport

**Resultaten van geautomatiseerde testen (Jest):**

| Testbestand | Status | Resultaat |
|-------------|--------|-----------|
| challenge.test.ts | ✅ Passed | Alle CRUD-functionaliteiten werken correct |
| submission.test.ts | ✅ Passed | Inzendingen correct aangemaakt, status updates correct |
| auth.test.ts | ✅ Passed | Authenticatie en autorisatie correct |
| map.test.tsx | ✅ Passed | Kaart rendert correct, pinpoints zichtbaar |
| notification.test.tsx | ✅ Passed | Realtime notificaties werken voor alle scenario’s |
| user.test.ts | ✅ Passed | Gebruikersbeheer werkt correct |
| api/challenges.test.ts | ✅ Passed | API endpoints voldoen aan verwachtingen |
| api/submissions.test.ts | ✅ Passed | API endpoints voor inzendingen correct |
| utils/validation.test.ts | ✅ Passed | Form validatie correct |
| hooks/useRealtime.test.ts | ✅ Passed | WebSocket functionaliteit correct |

**Conclusies:**
- Alle scenario’s getest, inclusief alternatieve paden
- Realtime functionaliteit werkt voor meerdere gebruikers
- Geautomatiseerde testen sluiten volledig aan op de user stories
- De samenhang van de applicatie is bevestigd: frontend, backend en database communiceren correct

> De geautomatiseerde testen kunnen worden uitgevoerd met:
```bash
npm run test
