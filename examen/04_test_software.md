# 📘 StadsBingo – 04_test_software.md

## 🎯 Doel

Dit document beschrijft het **testplan**, de **testscenario’s** en het **testrapport** voor de vereenvoudigde StadsBingo-applicatie (geen kaart, geen uploads, geen realtime), conform examenopdracht 4.

---

## 📦 Testaanpak

- Frameworks (indicatief):
  - [Jest](https://jestjs.io/) – unit & integratietests
  - [React Testing Library](https://testing-library.com/) – componenttests
  - [Supertest](https://www.npmjs.com/package/supertest) – API testing

- Testbestanden (indicatief):
tests/
├─ frontend/
│ ├─ AssignmentsList.test.tsx
│ ├─ SubmitAnswerForm.test.tsx
│ └─ StatusFeedbackView.test.tsx
├─ backend/
│ ├─ submissions.post.test.ts
│ ├─ submissions.patch.test.ts
│ └─ auth.roles.test.ts
└─ jest.config.js

- Streefaantal tests: 10+  
- Streefresultaat: alle tests groen

---

## ⚙️ Testplan (Criterium 4.1)

| User Story | Testdoel | Testtype | Testdata |
|------------|-----------|----------|----------|
| Opdrachtenlijst (E1) | Lijst rendert met mock data | Component | Mock opdrachten |
| Indienen (E2) | Validatie en opslag tekstantwoord | Integratie + API | Tekst, opdrachtId |
| Status/feedback (E3/E5) | Weergave na beoordeling | Component | Mock inzendingen |
| Beoordelen (E4) | Alleen docent kan status wijzigen | API | JWT/rol, inzendingId |
| Filters (W1) | Filter op status/leerling werkt | Component | Mock inzendingen |

> Samenhang: indienen → beoordelen → status/feedback zichtbaar bij leerling (pagina-refresh).

---

## ⚙️ Testscenario’s (Criterium 4.2)

### Scenario 1: Opdracht indienen (tekst)
**Hoofdscenario:**
1. Leerling opent opdracht-detail
2. Vult geldig tekstantwoord in en verstuurt
3. API maakt `Inzending` met status `pending`

**Alternatieve scenario’s:**
- Tekst te lang/leeg → validatiefout
- Server error → foutmelding zichtbaar
- Dubbele inzending → duidelijke melding

### Scenario 2: Docent beoordeelt opdracht
**Hoofdscenario:**
1. Docent opent dashboard
2. Nieuwe inzending verschijnt
3. Docent keurt goed of af
4. Bij reject is feedback verplicht; opslag slaagt

**Alternatieve scenario’s:**
- Docent probeert zonder rechten → foutmelding
- Upload is corrupt → beoordeling niet toegestaan
- Leerling ontvangt melding vertraagd → fallback polling

### Scenario 3: Status & feedback tonen (leerling)
**Hoofdscenario:**
1. Leerling opent "mijn inzendingen"
2. Ziet status en feedback na beoordeling (refresh)

**Alternatieve scenario’s:**
- Geen inzendingen → lege-staat weergave
- Beoordeling pending → juiste statuslabel

### Scenario 4: Filters docentoverzicht (optioneel)
**Hoofdscenario:**
1. Docent zet filter op `status=pending`
2. Lijst toont alleen pending inzendingen

**Alternatieve scenario’s:**
- Filter op onbekende status → fallback/lege lijst
- Combinatie filter + zoekterm → juiste subset

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
|----------|--------------------|-----------|-----------|
| Indienen (tekst) | Inzending aangemaakt met `pending` | ✅ Geslaagd | Validatie en opslag correct |
| Beoordelen | Status/feedback bijgewerkt, autorisatie gehandhaafd | ✅ Geslaagd | Rolgebaseerde beveiliging werkt |
| Status/feedback | Leerling ziet juiste status/feedback na refresh | ✅ Geslaagd | Weergave consistent |
| Filters | Filtert op status en leerling | ✅ Geslaagd | UX en logica correct |

**Conclusie:**  
De kernfunctionaliteit werkt volgens de user stories zonder reliance op realtime of uploads. Tests dekken de belangrijkste flows en autorisatie.

**Screenshot bewijs (plaats in `examen/bewijsmateriaal/04/`):**  
`test_results.png`
