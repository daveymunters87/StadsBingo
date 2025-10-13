# 🧠 AI Controle Instructie – Examen StadsBingo

## 🎯 Doel
Controleer of de opgeleverde bestanden in de map  
`StadsBingo\examen`  
voldoen aan alle eisen die zijn vastgelegd in de map  
`StadsBingo\examen\eisen`.

---

## 📁 Bestandsstructuur

- **/examen/eisen/**  
  Bevat de eisenbestanden per opdracht, bijvoorbeeld:  
  - `eisen-01.md`  
  - `eisen-02.md`  
  - `eisen-03.md`  
  - `...`  
  Elk bestand bevat secties zoals:
  - *Wat lever je op?*  
  - *Randvoorwaarden*  
  - *Checklist*  

- **/examen/**  
  Bevat de opgeleverde bewijzen van uitvoering, bijvoorbeeld:
  <!-- - Video’s (`.mp4`, `.mov`)  
  - Screenshots (`.png`, `.jpg`)   -->
  - Markdown-rapporten (`.md`):
  - `01_plant_werkzaamheden.md`
  - `02_ontwerp_software.md`
  - `03_realiseren_software.md`
  - `04_test_software.md`
  - `05_verbetervoorstellen.md`
  - `06_overleg.md`
  - `07_presentatie.md`
  - `08_reflectie.md`

---

## 🧩 Wat je als AI moet doen

1. **Lees alle eisenbestanden** in de map `/examen/eisen/`.  
   - Noteer per bestand welke *deliverables* (producten) en *randvoorwaarden* vereist zijn.  
   - Zoek specifiek naar secties met:
     - “Wat lever je op”
     - “Randvoorwaarden”
     - “Checklist”
     - “Voorbeelden (goed/fout)”

2. **Bekijk vervolgens de inhoud van de map `/examen/`.**
   - Controleer of de gevraagde bestanden of typen aanwezig zijn.
   - Vergelijk namen, bestandsformaten en inhoud met wat in de eisen staat.  
   - Kijk of de naamgeving of inhoud overeenkomt met termen uit de eisen, zoals:
     - “standup”, “retrospective”, “test”, “rapport”, “video”, “presentatie”, “repository”, “commit”, etc.

3. **Vergelijk per opdrachtbestand (bijv. `03Eisen.md`) of er bewijs is geleverd dat aan de eisen voldoet.**
   - Geef per eis een korte beoordeling:
     - ✅ **Voldaan:** bewijsbestand aanwezig en logisch passend.  
     - ⚠️ **Twijfelachtig:** bestand aanwezig maar niet zeker of het aan de beschrijving voldoet.  
     - ❌ **Ontbrekend:** geen bewijs gevonden.  

4. **Maak een overzichtsrapport** waarin per opdracht (1 t/m 8) staat:
   - Welke bewijzen gevonden zijn.  
   - Wat ontbreekt of onvoldoende duidelijk is.  
   - Eventuele aanbevelingen om aan te vullen.

---

## 🧮 Outputstructuur

De AI moet zijn antwoord structureren als:

```markdown
# Controleverslag – StadsBingo Examen

## Opdracht 1
- **Gevraagd:** Video van stand-up + Markdown reflectie  
- **Gevonden:** `standup.mp4`, `01Reflectie.md`  
- **Beoordeling:** ✅ Voldaan

## Opdracht 2
- **Gevraagd:** Screenshots van wireframes + README  
- **Gevonden:** Alleen `wireframe.png`  
- **Beoordeling:** ⚠️ README ontbreekt

## Opdracht 3
- **Gevraagd:** Video van demo + testdocumentatie  
- **Gevonden:** Geen video gevonden  
- **Beoordeling:** ❌ Niet voldaan
