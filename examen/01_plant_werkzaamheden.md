# StadsBingo 01

## Projectomschrijving
Het doel van dit project is het ontwikkelen van een **StadsBingo app** voor school.  
Leerlingen kunnen opdrachten uitvoeren in de stad, en docenten kunnen de opdrachten live goedkeuren of afkeuren.  

## Eisen en Wensen van de Opdrachtgever

**Eisen (must have):**
- Kaart met pinpoints in de stad  
- Elke pinpoint bevat een vraag/opdracht  
- Leerlingen kunnen opdrachten voltooien  
- Docenten kunnen opdrachten goed of afkeuren  
- Realtime updates van de status van opdrachten  

**Wensen (should/could have):**
- Docent kan zelf nieuwe opdrachten toevoegen  
- Leerlingen zien direct feedback zonder refresh  
- Gebruiksvriendelijke interface  

**Belangrijkste functionaliteiten:**
- Kaart met pinpoints door Groningen  
- Pinpoints bevatten vragen of opdrachten die door de docenten bedacht zijn  
- Docenten kunnen ingeleverde opdrachten goedkeuren/afkeuren  
- Live updates zodat leerlingen en docenten realtime feedback hebben  

---

## Definition of Done (DoD)

- Alle functionaliteiten werken zoals beschreven in de eisen en wensen  
- Realtime updates functioneren correct  
- Upload van tekst/foto’s werkt en wordt gekoppeld aan de juiste opdracht  
- Feedback wordt correct weergegeven  
- Interface is gebruiksvriendelijk en getest  
- Code is gedocumenteerd en werkend op alle benodigde apparaten  

---

## User Stories

### Tijdsindicatie uitleg

| Maat | Uren (indicatie)     | Beschrijving                        |
| ---- | ------------------ | ---------------------------------- |
| S    | 1–2 uur            | Kleine taak, weinig complexiteit    |
| M    | 3–5 uur            | Medium taak, enkele onderdelen     |
| L    | 6–8 uur            | Grote taak, meerdere onderdelen    |
| XL   | 9+ uur             | Zeer grote of complexe taak        |

### Leerling
> Gemaakt door **Davey**

| Titel              | Kaart bekijken                                                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Als een...         | Leerling                                                                                                                           |
| Wil ik...          | alle pinpoints met opdrachten op een kaart zien                                                                                     |
| Zodat ik...        | eenvoudig kan kiezen welke opdracht ik wil doen                                                                                     |
| Prioriteit         | Must have                                                                                                                          |
| Acceptatiecriteria | 1. Kaart toont alle pinpoints<br/>2. Pinpoints zijn klikbaar<br/>3. Opdrachtdetails worden zichtbaar                                |
| Scenario           | 1. Leerling opent app<br/>2. Kaart wordt geladen met pinpoints<br/>3. Leerling klikt op een pin en ziet opdracht                   |
| Definition of Done | Kaart toont alle pinpoints correct, pinpoints zijn klikbaar en details worden getoond zonder fouten                                 |
| Bijzonderheden     | Locatie van pinpoints wordt beheerd door docent                                                                                     |
| Tijdsindicatie     | M (medium)                                                                                                                         |

---

| Titel              | Opdracht inleveren                                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Als een...         | Leerling                                                                                                                           |
| Wil ik...          | mijn oplossing of bewijs kunnen uploaden bij een opdracht                                                                           |
| Zodat ik...        | de docent mijn inzending kan beoordelen                                                                                             |
| Prioriteit         | Must have                                                                                                                          |
| Acceptatiecriteria | 1. Leerling kan tekst/foto invoeren<br/>2. Inzending wordt gekoppeld aan de juiste opdracht<br/>3. Status gaat naar "in afwachting" |
| Scenario           | 1. Leerling opent opdracht<br/>2. Leerling vult antwoord of uploadt foto<br/>3. Systeem zet status op "in afwachting"              |
| Definition of Done | Uploads werken correct, zijn gekoppeld aan opdrachten en status verandert automatisch                                               |
| Bijzonderheden     | Upload kan tekst of foto bevatten                                                                                                   |
| Tijdsindicatie     | M (medium)                                                                                                                         |

---

| Titel              | Status bekijken                                                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Als een...         | Leerling                                                                                                                           |
| Wil ik...          | kunnen zien of mijn opdrachten zijn goedgekeurd of afgekeurd                                                                        |
| Zodat ik...        | weet welke opdrachten ik nog moet verbeteren                                                                                        |
| Prioriteit         | Must have                                                                                                                          |
| Acceptatiecriteria | 1. Status per opdracht zichtbaar<br/>2. Status wijzigt automatisch<br/>3. Leerling krijgt melding bij verandering                    |
| Scenario           | 1. Leerling opent app<br/>2. Systeem toont status per opdracht<br/>3. Status verandert realtime bij beslissing docent               |
| Definition of Done | Status wordt realtime bijgewerkt, meldingen werken correct                                                                          |
| Bijzonderheden     | Realtime notificaties via websockets                                                                                                |
| Tijdsindicatie     | S (small)                                                                                                                          |

---

| Titel              | Nieuwe opdrachten ontdekken                                                                                                        |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Als een...         | Leerling                                                                                                                          |
| Wil ik...          | nieuwe opdrachten automatisch zien verschijnen                                                                                     |
| Zodat ik...        | altijd de meest actuele opdrachten kan uitvoeren                                                                                   |
| Prioriteit         | Should have                                                                                                                        |
| Acceptatiecriteria | 1. Nieuwe pinpoints verschijnen zonder refresh<br/>2. Opdrachten zijn direct beschikbaar                                           |
| Scenario           | 1. Docent voegt opdracht toe<br/>2. Leerling opent kaart<br/>3. Nieuwe opdracht verschijnt automatisch                             |
| Definition of Done | Nieuwe opdrachten verschijnen automatisch op de kaart zonder refresh                                                               |
| Bijzonderheden     | Synchronisatie met docenten dashboard                                                                                              |
| Tijdsindicatie     | S (small)                                                                                                                          |

---

| Titel              | Feedback ontvangen                                                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Als een...         | Leerling                                                                                                                          |
| Wil ik...          | feedback van de docent kunnen zien                                                                                                |
| Zodat ik...        | weet wat ik kan verbeteren of waarom iets goedgekeurd is                                                                           |
| Prioriteit         | Should have                                                                                                                        |
| Acceptatiecriteria | 1. Feedbackveld zichtbaar bij opdracht<br/>2. Feedback wordt opgeslagen<br/>3. Leerling krijgt melding                              |
| Scenario           | 1. Docent schrijft feedback bij afkeuring<br/>2. Leerling opent opdracht<br/>3. Feedbacktekst wordt getoond                        |
| Definition of Done | Feedback wordt correct weergegeven, leerling ontvangt melding                                                                      |
| Bijzonderheden     | Optioneel: feedback kan verplicht zijn bij afkeuren  
| Tijdsindicatie     | S (small)                                                                                                                          |

---

### Docent
> Gemaakt door **Jada**

| Titel              | Opdracht beoordelen                                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Als een...         | Docent                                                                                                                            |
| Wil ik...          | opdrachten van leerlingen kunnen goedkeuren of afkeuren                                                                            |
| Zodat ik...        | de voortgang van leerlingen kan bewaken                                                                                            |
| Prioriteit         | Must have                                                                                                                          |
| Acceptatiecriteria | 1. Docent ziet lijst met inzendingen<br/>2. Kan status aanpassen naar "goedgekeurd" of "afgekeurd"<br/>3. Leerling krijgt update   |
| Scenario           | 1. Leerling levert opdracht in<br/>2. Docent opent dashboard<br/>3. Docent keurt opdracht goed of af                              |
| Definition of Done | Status updates correct, synchronisatie met leerling-dashboard werkt                                                                 |
| Bijzonderheden     | Beslissing wordt direct weergegeven                                                                                                 |
| Tijdsindicatie     | M (medium)                                                                                                                         |

---

| Titel              | Nieuwe opdracht toevoegen                                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Als een...         | Docent                                                                                                                            |
| Wil ik...          | nieuwe pinpoints met opdrachten kunnen toevoegen                                                                                   |
| Zodat ik...        | het spel kan uitbreiden met actuele opdrachten                                                                                     |
| Prioriteit         | Should have                                                                                                                        |
| Acceptatiecriteria | 1. Docent kan titel, beschrijving en locatie invoeren<br/>2. Nieuwe opdracht verschijnt direct op de kaart                         |
| Scenario           | 1. Docent opent dashboard<br/>2. Voegt opdracht toe<br/>3. Leerlingen zien nieuwe opdracht verschijnen                             |
| Definition of Done | Nieuwe opdrachten verschijnen direct op de kaart, locatie wordt correct weergegeven                                                |
| Bijzonderheden     | Locatie kan met kaart-picker geselecteerd worden                                                                                   |
| Tijdsindicatie     | S (small)                                                                                                                          |

---

| Titel              | Overzicht voortgang                                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Als een...         | Docent                                                                                                                            |
| Wil ik...          | een overzicht hebben van welke leerlingen hoeveel opdrachten hebben voltooid                                                       |
| Zodat ik...        | de klasprestatie kan monitoren                                                                                                     |
| Prioriteit         | Must have                                                                                                                          |
| Acceptatiecriteria | 1. Lijst van leerlingen met voortgang zichtbaar<br/>2. Percentage voltooid berekend<br/>3. Mogelijkheid tot filteren                |
| Scenario           | 1. Docent opent voortgangspagina<br/>2. Ziet overzicht per leerling<br/>3. Kan filteren op status                                  |
| Definition of Done | Overzicht werkt correct, percentages kloppen en filters functioneren                                                               |
| Bijzonderheden     | Eventueel grafieken of statistieken                                                                                                |
| Tijdsindicatie     | M (medium)                                                                                                                         |

---

| Titel              | Feedback geven                                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Als een...         | Docent                                                                                                                            |
| Wil ik...          | feedback kunnen geven bij een opdracht                                                                                            |
| Zodat ik...        | leerlingen kan helpen begrijpen wat er verbeterd moet worden                                                                       |
| Prioriteit         | Should have                                                                                                                        |
| Acceptatiecriteria | 1. Feedbackveld beschikbaar bij beoordeling<br/>2. Feedback wordt gekoppeld aan opdracht<br/>3. Leerling ziet feedback              |
| Scenario           | 1. Docent opent inzending<br/>2. Vult feedback in<br/>3. Leerling krijgt feedback zichtbaar                                       |
| Definition of Done | Feedback wordt correct opgeslagen en zichtbaar voor leerling                                                                       |
| Bijzonderheden     | Feedback kan verplicht zijn bij afkeuring                                                                                          |
| Tijdsindicatie     | S (small)                                                                                                                          |

---

| Titel              | Live notificaties                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Als een...         | Docent                                                                                                                            |
| Wil ik...          | realtime meldingen ontvangen van nieuwe inzendingen                                                                                |
| Zodat ik...        | snel kan reageren en beoordelen                                                                                                    |
| Prioriteit         | Must have                                                                                                                          |
| Acceptatiecriteria | 1. Notificatie bij nieuwe inzending<br/>2. Dashboard toont melding zonder refresh<br/>3. Klik op melding opent de inzending         |
| Scenario           | 1. Leerling levert opdracht in<br/>2. Docent krijgt melding in dashboard<br/>3. Klikt melding en beoordeelt                        |
| Definition of Done | Meldingen werken realtime, dashboard wordt automatisch bijgewerkt                                                                  |
| Bijzonderheden     | Optioneel: push notificaties of e-mail                                                                                             |
| Tijdsindicatie     | M (medium)                                                                                                                         |

# StadsBingo - Sprint Planning

## Sprint Indeling
We werken met **2-week sprints**. Hieronder staat een indicatie van welke user stories per sprint verwacht worden afgerond.  
De indeling is gebaseerd op prioriteit, complexiteit (T-shirt maat) en afhankelijkheden.

---

### Sprint 1 (Week 1-2)
**Doel:** Basisfunctionaliteiten voor leerlingen en docenten werkend krijgen.  

| Story                     | Verantwoordelijke | Prioriteit | Tijdindicatie | Geschatte uren | Opmerkingen |
| ------------------------- | ---------------- | ---------- | ------------- | -------------- | ----------- |
| Kaart bekijken            | Davey            | Must have  | M             | 4 uur          | Basis voor alle andere stories |
| Opdracht inleveren        | Davey            | Must have  | M             | 4 uur          | Upload functionaliteit testen |
| Status bekijken           | Davey            | Must have  | S             | 2 uur          | Koppeling met docentstatus |
| Opdracht beoordelen       | Jada             | Must have  | M             | 4 uur          | Docent kan inzendingen beoordelen |

**Totale geschatte uren Sprint 1:** 14 uur

**Toelichting:**  
Sprint 1 richt zich op kernfunctionaliteiten voor leerlingen en docenten, zodat het systeem een minimale werkende staat heeft. Stories zijn gecombineerd op basis van logische afhankelijkheden (bijv. “Status bekijken” kan pas werken als “Opdracht inleveren” af is).

---

### Sprint 2 (Week 3-4)
**Doel:** Extra functionaliteiten en verbeterde interacties toevoegen.  

| Story                     | Verantwoordelijke | Prioriteit | Tijdindicatie | Geschatte uren | Opmerkingen |
| ------------------------- | ---------------- | ---------- | ------------- | -------------- | ----------- |
| Nieuwe opdrachten ontdekken | Davey           | Should have | S             | 2 uur          | Automatische updates voor leerlingen |
| Feedback ontvangen         | Davey           | Should have | S             | 2 uur          | Feedback van docent zichtbaar maken |
| Nieuwe opdracht toevoegen  | Jada            | Should have | S             | 2 uur          | Docent kan nieuwe opdrachten aanmaken |
| Overzicht voortgang        | Jada            | Must have  | M             | 4 uur          | Docent kan klasprestatie monitoren |
| Feedback geven             | Jada            | Should have | S             | 2 uur          | Docent kan feedback toevoegen |
| Live notificaties          | Jada            | Must have  | M             | 4 uur | Realtime meldingen voor nieuwe inzendingen |

**Toelichting:**  
Sprint 2 voegt extra functionaliteiten toe om de app interactiever en gebruiksvriendelijker te maken. Complexere stories zoals “Overzicht voortgang” en “Live notificaties” worden in deze sprint opgepakt, omdat ze afhankelijk zijn van basisfunctionaliteiten uit Sprint 1.

---

## Scrum Board Schematisch (voorbeeld)

### Sprint 1

| To Do             | In Progress         | Done            |
| ----------------- | ----------------- | --------------- |
| Kaart bekijken    | Opdracht inleveren | Status bekijken |
| Opdracht beoordelen |                   |                 |

### Sprint 2

| To Do                      | In Progress             | Done                 |
| -------------------------- | ---------------------- | ------------------- |
| Nieuwe opdrachten ontdekken | Nieuwe opdracht toevoegen | Overzicht voortgang |
| Feedback ontvangen          | Feedback geven         | Live notificaties   |