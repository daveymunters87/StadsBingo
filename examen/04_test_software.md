# 📘 StadsBingo – 04_test_software.md

## 🎯 Doel

Dit document beschrijft het **testplan**, de **testscenario’s** en het **testrapport** voor de StadsBingo-applicatie met teams, teamcodes en statusgestuurde opdrachten-flow, conform examenopdracht 4.

---

## 📦 Testaanpak

- Frameworks:
  - [Jest](https://jestjs.io/) – unit & integratietests
  - [React Testing Library](https://testing-library.com/) – componenttests (leerling- en docentdashboard)
  - [Supertest](https://www.npmjs.com/package/supertest) – API tests (team-login, inzendingen, statusflow, notificaties)

- Testbestanden (indicatief):
```
tests/
├─ frontend/
│  ├─ TeamLogin.test.tsx
│  ├─ AssignmentStatusList.test.tsx
│  ├─ SubmissionFlow.test.tsx
│  └─ TeacherDashboardFilters.test.tsx
├─ backend/
│  ├─ auth.team-login.post.test.ts
│  ├─ assignments.get-status-flow.test.ts
│  ├─ submissions.post.test.ts
│  ├─ submissions.patch-status.test.ts
│  └─ notifications.post.test.ts
└─ jest.config.js
```

- Streefaantal tests: 12+  
- Streefresultaat: alle tests groen

---

## ⚙️ Testplan (Criterium 4.1)

| User Story / Flow | Testdoel | Testtype | Testdata |
|-------------------|----------|----------|----------|
| Team-login (E1/E2) | Geldige code geeft toegang; ongeldige code blokkeert | API + Component | Teamcode, mock team/leerling |
| Opdrachtenlijst & statussen (E3) | Lijst toont juiste status (`Locked`, `Available`, `Pending`, `Feedback`, `Approved`) | Component | Mock opdrachten + inzendingen |
| Submission flow (E4/E5) | Validatie tekst, status `Pending`, feedbackloop | Integratie + API | Tekst, opdrachtId, teamId |
| Docentbeoordeling (E6) | Alleen docent kan status wijzigen; feedback verplicht | API | Docent JWT, inzendingId |
| Docentfilters (E7/W1) | Filter op team/leerling/status werkt | Component + API | Mock inzendingen/teams |
| Notificaties (W2) | Leerling ontvangt melding bij feedback | API | Mock notificatieservice |
| Visuele voortgang (W1) | Voortgangsbalk berekent percentage correct | Component | Mock data per leerling |

> Samenhang: team-login → opdrachtenlijst met statussen → indienen → feedback/goedkeuring → vrijgave volgende opdracht + notificatie.

---

## ⚙️ Testscenario’s (Criterium 4.2)

### Scenario 1: Team-login valideert toegang
**Hoofdscenario:**
1. Leerling voert geldige teamcode in.
2. API valideert code en koppelt leerling aan team.
3. Dashboard toont opdrachten voor het team.

**Alternatieve scenario’s:**
- Teamcode ongeldig → foutmelding.
- Teamcode verlopen → instructie om docent te contacten.
- Leerling niet gekoppeld aan team → toegang geweigerd.

### Scenario 2: Opdrachtenlijst toont statussen
**Hoofdscenario:**
1. Leerling ziet lijst met alle opdrachten.
2. `Locked` opdrachten zijn niet klikbaar; `Available` wel.
3. Statusbadges tonen `Pending`, `Feedback`, `Approved` volgens inzendingen.

**Alternatieve scenario’s:**
- Geen opdrachten beschikbaar → lege-staat.
- Serverfout → fallback melding + retry-knop.

### Scenario 3: Submission + feedbackloop
**Hoofdscenario:**
1. Leerling opent een `Available` opdracht, vult tekst in, verstuurt.
2. Inzending wordt `Pending`.
3. Docent geeft feedback; status wordt `Feedback`.
4. Leerling ziet feedback, past opdracht aan, dient opnieuw in → `Pending`.
5. Docent keurt goed → status `Approved`, volgende opdracht `Available`.

**Alternatieve scenario’s:**
- Tekst leeg/te lang → validatiefout (client + server).
- Docent geeft geen feedback bij status `Feedback` → API 400.
- Dubbele inzending → duidelijke melding.

### Scenario 4: Docentfilters + beoordeling
**Hoofdscenario:**
1. Docent filtert op team + status `Pending`.
2. Selecteert inzending, geeft `Approved` of `Feedback`.
3. Volgende opdracht komt vrij (indien `Approved`).

**Alternatieve scenario’s:**
- Filter op onbekende status → lege lijst.
- Docent zonder rechten → toegangsweigering.
- Feedback te kort → validatiefout.

### Scenario 5: Notificatie bij feedback
**Hoofdscenario:**
1. Docent geeft feedback via dashboard.
2. Notificatieservice stuurt melding naar leerling.
3. Leerling ziet badge “Nieuwe feedback” in dashboard.

**Alternatieve scenario’s:**
- Notificatie faalt → log + fallback boodschap.
- Leerling al online → melding via toast/polling.

---

## 🧪 Testrapport (Criterium 4.3)

| Scenario | Verwacht resultaat | Resultaat | Conclusie |
|----------|--------------------|-----------|-----------|
| Team-login | Geldige code → toegang; ongeldig → foutmelding | ✅ Geslaagd | Toegang tot teams veilig geregeld |
| Statuslijst | Statusbadges kloppen met inzendingen | ✅ Geslaagd | Statusberekening correct |
| Submission + feedback | Flow `Available → Pending → Feedback/Approved` werkt end-to-end | ✅ Geslaagd | Validaties en feedbackloop aantoonbaar |
| Docentfilters | Filters op team/leerling/status leveren juiste subset | ✅ Geslaagd | Docent vindt snel relevante inzendingen |
| Notificaties | Leerling krijgt melding bij feedback | ✅ Geslaagd | Communicatie naar leerling aangetoond |

**Conclusie:**  
De belangrijkste flows (team-login, statusweergave, feedbackloop, filters, notificaties) zijn getest en geslaagd. Hiermee voldoet de app aan examenopdracht 4 (minimaal 10 geautomatiseerde tests of uitgewerkte scenario’s).

**Screenshot bewijs (plaats in `examen/bewijsmateriaal/04/`):**  
`test_results.png` (+ optioneel `coverage.png`)
