# StadsBingo – 05_verbetervoorstellen.md

## 5.1 Verbeteringen op basis van testen

1. **Meer edge cases testen**
   - Alle 10 tests slagen, maar er zijn geen tests voor extreme situaties zoals grote uploads
   - Voorstel: Tests toevoegen voor file upload limits

2. **Database transacties testen**
   - Huidige tests controleren niet wat er gebeurt als de database niet beschikbaar is
   - Voorstel: Error handling tests toevoegen voor database connectie problemen

3. **Performance tests toevoegen**
   - Tests controleren functionaliteit maar niet snelheid bij veel teams/opdrachten
   - Voorstel: Load tests voor scenario's met veel teams tegelijk

## 5.2 Verbeteringen op basis van oplevering

1. **Interactieve tutorial voor studenten**
   - Studenten hadden in het begin moeite om te begrijpen hoe de app werkt
   - Oplossing: Tutorial slideshow toegevoegd die automatisch verschijnt bij eerste login met screenshots en uitleg van alle stappen

2. **Completion outro bij voltooiing**
   - Studenten wisten niet goed wat te doen na het voltooien van alle opdrachten
   - Oplossing: Felicitatie scherm met confetti effect dat verschijnt wanneer alle opdrachten zijn goedgekeurd, inclusief instructies om naar de docent te gaan

3. **Admin foto archivering**
   - Docenten kunnen ingediende foto's niet opslaan voor later gebruik (bijvoorbeeld voor examendocumentatie of collectie)
   - Oplossing: Download functie toegevoegd per foto in submissions lijst en in foto preview modal, met automatische bestandsnamen

## 5.3 Verbeteringen op basis van reflectie

1. **Eerder testen met echte gebruikers**
   - We hebben de app gebouwd zonder input van docenten, waardoor sommige features niet praktisch zijn
   - Voorstel: Na elke sprint kort testen met een docent voor feedback

2. **Betere planning van database schema**
   - We hebben het ERD een paar keer moeten aanpassen tijdens development
   - Voorstel: Meer tijd besteden aan database ontwerp voordat we beginnen met coderen

3. **Code review proces verbeteren**
   - We hebben pull requests gebruikt maar niet altijd grondig gereviewed
   - Voorstel: Vaste checklist voor code reviews en altijd samen door de code lopen


## 5.4 Planning verbetervoorstellen

### Prioriteit 1 (Sprint 3 - Week 1)
| Verbetering | Werkzaamheden | Tijdsinschatting | Verantwoordelijke |
|-------------|---------------|------------------|-------------------|
| File upload limits | Validatie toevoegen, tests schrijven | 4 uur | Davey |
| Mobile foto interface | CSS aanpassen, touch events | 2 uur | Jada |

### Prioriteit 2 (Sprint 4 - Week 2)
| Verbetering | Werkzaamheden | Tijdsinschatting | Verantwoordelijke |
|-------------|---------------|------------------|-------------------| 
| Team overzicht dashboard | API routes en Frontend components maken | 8 uur | Beiden |
| Feedback dropdown | UI component, backend aanpassing | 4 uur | Beiden |
