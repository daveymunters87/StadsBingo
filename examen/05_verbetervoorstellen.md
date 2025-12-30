# StadsBingo – 05_verbetervoorstellen.md

## 5.1 Verbeteringen op basis van testen

1. **Meer edge cases testen**
   - Alle 10 tests slagen, maar er zijn geen tests voor extreme situaties zoals zeer lange teksten of grote foto's
   - Voorstel: Tests toevoegen voor file upload limits en tekst validatie

2. **Database transacties testen**
   - Huidige tests controleren niet wat er gebeurt als de database niet beschikbaar is
   - Voorstel: Error handling tests toevoegen voor database connectie problemen

3. **Performance tests toevoegen**
   - Tests controleren functionaliteit maar niet snelheid bij veel teams/opdrachten
   - Voorstel: Load tests voor scenario's met veel teams tegelijk

## 5.2 Verbeteringen op basis van oplevering

1. **Betere feedback interface**
   - Docenten moeten nu feedback in een tekstveld typen, dit kan gebruiksvriendelijker
   - Voorstel: Dropdown met standaard feedback opties + vrij tekstveld

2. **Mobile responsive verbeteren**
   - App werkt op mobile maar foto uploaden kan lastig zijn op kleine schermen
   - Voorstel: Betere mobile interface voor foto's maken en uploaden

3. **Team overzicht uitbreiden**
   - Docenten zien nu alleen individuele inzendingen, geen team-overzicht
   - Voorstel: Dashboard pagina met voortgang per team in één overzicht

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