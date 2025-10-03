# Criterium 5 – Verbetervoorstellen

Dit document bevat de verbetervoorstellen op basis van testen, oplevering en reflectie voor het StadsBingo-project.

---

## 5.1 Verbeterpunten vanuit testen

Op basis van de geautomatiseerde testen zijn de volgende verbetervoorstellen geformuleerd:

1. **Realtime update van goedkeuringen verbeteren**  
   - **Observatie:** Soms is er een kleine vertraging bij het bijwerken van de status van een challenge.  
   - **Voorstel:** Implementeren van WebSocket-events of server-sent events zodat status direct in de frontend wordt geüpdatet.

2. **Input validatie bij challenge creatie**  
   - **Observatie:** Testen laten zien dat lege velden of speciale tekens soms niet correct worden afgehandeld.  
   - **Voorstel:** Striktere validatie implementeren in zowel frontend (React) als backend (API).

3. **Foutafhandeling bij database connecties**  
   - **Observatie:** Bij uitval van de database geeft de app geen duidelijke foutmelding.  
   - **Voorstel:** Error handling verbeteren en gebruikersvriendelijke meldingen tonen bij databasefouten.

---

## 5.2 Verbeterpunten vanuit oplevering

Na oplevering van het product zijn de volgende verbetervoorstellen geformuleerd:

1. **Gebruiksvriendelijkheid van de kaartinterface**  
   - Voeg een korte uitleg/tooltip toe bij elk type pin zodat gebruikers direct weten wat ze moeten doen.

2. **Dashboard voor admins**  
   - Voeg filters en zoekopties toe voor challenges om grote lijsten overzichtelijker te maken.

3. **Performance optimalisatie bij veel pins**  
   - Testen met veel pins laten zien dat de kaart traag wordt. Optimaliseren van rendering met clustering of lazy-loading pins.

---

## 5.3 Verbeterpunten vanuit reflectie

Na persoonlijke reflectie en evaluatie van het projectproces:

1. **Planning en taakverdeling**  
   - Meer tijd inplannen voor complexe onderdelen (bijv. realtime communicatie) zodat deadlines beter haalbaar zijn.

2. **Documentatie en README**  
   - Gedetailleerdere instructies toevoegen voor nieuwe developers om snel lokaal te kunnen opstarten.

3. **Testdekking uitbreiden**  
   - Automatische testen uitbreiden naar edge-cases en foutscenario’s, zodat toekomstige bugs sneller worden opgespoord.

---

**Conclusie:**  
De verbetervoorstellen zijn gebaseerd op concrete observaties uit testen, de oplevering en persoonlijke reflectie. Deze voorstellen verbeteren zowel de **technische werking**, de **gebruikservaring** als het **proces rondom ontwikkeling** van StadsBingo.
