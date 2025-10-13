# 📘 StadsBingo – 04_test_software.md

## 🎯 Doel

Dit document beschrijft de **geautomatiseerde testen** voor de StadsBingo-applicatie, inclusief testplan, testscenario’s en testrapport.

---

## 📦 Geautomatiseerde Testen

- **Frameworks gebruikt:**
  - [Jest](https://jestjs.io/) voor unit & integratietests
  - [React Testing Library](https://testing-library.com/) voor componenttests
  - [Supertest](https://www.npmjs.com/package/supertest) voor API testing

- **Testbestanden voorbeeld:**
tests/
├─ frontend/
│ ├─ Card.test.tsx
│ ├─ Upload.test.tsx
│ └─ Feedback.test.tsx
├─ backend/
│ ├─ assignmentController.test.ts
│ ├─ uploadController.test.ts
│ └─ auth.test.ts
└─ jest.config.js

- **Aantal tests:** 12 (unit, integratie, component)  
- **Resultaat:** alle tests geslaagd (groen)

---

## ⚙️ Testplan (Criterium 4.1)

| User Story | Testdoel | Testtype | Testdata |
|------------|-----------|----------|----------|
| Kaart bekijken (E1) | Controleren of alle pinpoints zichtbaar zijn | Component Test | Mock pinpoints data |
| Opdracht inleveren (E3) | Controleren of upload correct gekoppeld wordt | Integratie Test | Test bestand (png, txt) |
| Status bekijken (E5) | Realtime updates ontvangen | Unit + Mock WebSocket | Mock status updates |
| Opdracht beoordelen (E4) | Docent kan goedkeuren/afkeuren | API Test | Test upload ID, status |
| Feedback ontvangen (W2) | Feedback wordt correct weergegeven bij leerling | Component Test | Mock feedback bericht |

> Elk scenario test de samenhang tussen meerdere stories (bijv. upload → beoordeling → feedback → status update)

---

## ⚙️ Testscenario’s (Criterium 4.2)

### Scenario 1: Upload opdracht
**Hoofdscenario:**
1. Leerling selecteert opdracht op kaart
2. Leerling uploadt bestand
3. API koppelt bestand aan opdracht
4. Status verandert naar “in afwachting”

**Alternatieve scenario’s:**
- Bestandstype ongeldig → foutmelding
- Upload mislukt door netwerk → retry mechanisme
- Leerling probeert dubbele upload → status blijft correct

### Scenario 2: Docent beoordeelt opdracht
**Hoofdscenario:**
1. Docent opent dashboard
2. Nieuwe inzending verschijnt
3. Docent keurt goed of af
4. Leerling ontvangt update en feedback

**Alternatieve scenario’s:**
- Docent probeert zonder rechten → foutmelding
- Upload is corrupt → beoordeling niet toegestaan
- Leerling ontvangt melding vertraagd → fallback polling

### Scenario 3: Realtime status updates
**Hoofdscenario:**
1. Leerling bekijkt dashboard
2. Docent beoordeelt opdracht
3. Status verandert direct via WebSocket
4. Feedback verschijnt automatisch

**Alternatieve scenario’s:**
- WebSocket verbinding weg → fallback polling
- Meerdere opdrachten tegelijk → status blijft correct
- Onverwachte server error → foutmelding weergegeven

### Scenario 4: Nieuwe opdrachten toevoegen
**Hoofdscenario:**
1. Docent voegt pinpoint toe
2. Pinpoint verschijnt op kaart
3. Leerling kan direct opdracht zien

**Alternatieve scenario’s:**
- Onjuiste coordinaten → foutmelding
- Dubbele opdracht toegevoegd → detectie fout
- Backend update faalt → rollback actie

### Scenario 5: Feedback ontvangen
**Hoofdscenario:**
1. Docent geeft feedback
2. Leerling ontvangt bericht in dashboard
3. Feedback blijft zichtbaar bij volgende login

**Alternatieve scenario’s:**
- Feedback niet opgeslagen → foutmelding
- Leerling offline → bericht verschijnt bij volgende connectie
- Docent verwijdert feedback → leerling ziet update

---

## 🧪 Testrapport (Criterium 4.3)

| Scenario | Verwacht resultaat | Resultaat | Conclusie |
|----------|-----------------|-----------|-----------|
| Upload opdracht | Bestand gekoppeld, status “in afwachting” | ✅ Geslaagd | Functionaliteit correct, foutafhandeling aanwezig |
| Docent beoordeelt | Status update + feedback zichtbaar | ✅ Geslaagd | Beoordeling werkt correct, rolbeveiliging getest |
| Realtime updates | Status en feedback direct zichtbaar | ✅ Geslaagd | WebSocket implementatie werkt stabiel |
| Nieuwe opdrachten | Pinpoint verschijnt direct | ✅ Geslaagd | Toevoegen opdrachten werkt realtime |
| Feedback ontvangen | Leerling ontvangt feedback | ✅ Geslaagd | Functionaliteit correct, ook bij offline scenarios |

**Conclusie:**  
De StadsBingo-applicatie werkt zoals beschreven in de user stories. Alle geautomatiseerde testen zijn succesvol uitgevoerd en laten zien dat de belangrijkste functionaliteit betrouwbaar is, inclusief realtime updates, rolbeheer en foutafhandeling.

**Screenshot bewijs:**  
![Test Results](pad/naar/testresults.png)
