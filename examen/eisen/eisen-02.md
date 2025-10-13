# Opdracht 2: Ontwerp software

> 💡 **Tip:** Voordat je aan deze opdrachten begint, neem de UML-module in Jarvis nog een keer door!

---

## Omschrijving

Je gaat in dit examenonderdeel bewijzen dat je een programma kan ontwerpen voordat je begint met bouwen.  
**Let op:** hier wordt het technische ontwerp bedoeld (UML) en niet het ontwerp van de user interface.

### Waar kan je dit bewijs verzamelen?

- Stage  
- Deep Dives  
- Projecten voor externen  
- Opdrachten voor externe partijen (bijv. Game Jams\*)

\* Niet alle vestigingen van de Bit Academy hebben Game Jams

### Wat lever je op?

1. 2 UML-diagrammen (criterium 2.1 & 2.2)  
2. Onderbouwing (criterium 2.3)

---

## Criterium 2.1: Ontwerp

| Criterium | 0 punten | 1 punt | 2 punten | 3 punten |
|------------|-----------|----------|-----------|-----------|
| 2.1. De user stories zijn vertaald naar een passend, eenduidig en volledig ontwerp (sluit aan op wensen en eisen) | Niet of nauwelijks: het ontwerp ontbreekt | Enigszins: er is een ontwerp, maar deze dekt niet de functionaliteit die is aangegeven in de eisen en wensen en de user stories. Er ontbreekt functionaliteit, toelichting is beperkt en het ontwerp past niet/beperkt bij de eisen en wensen van de opdrachtgever. | Grotendeels: er is een ontwerp waarin functionaliteit uit de eisen en wensen en de user stories gelezen kan worden. De ontwerpen zijn toegelicht en zijn passend. | Volledig: er is een volledig ontwerp waarin alle eisen en wensen en de user stories gelezen kunnen worden. Het ontwerp is duidelijk toegelicht zodat de lezer direct een relatie legt met de eisen en wensen. |

---

## Randvoorwaarden

1. Er is een diagram aangeleverd van redelijke complexiteit. Hieronder een overzicht van de **minimale** eisen per diagram:

   **a. ERD of Klassendiagram**
   - Minimaal 6 entiteiten  
   - 1× 1-op-1 relatie  
   - 2× 1-op-n relatie  
   - 1× n-op-n relatie  

   **b. Sequence diagram of Activity diagram**
   - 6 objecten  
   - 1× Loop of 1× Alternative  

   **c. Use case diagram**
   - 3 actoren  
   - 1 system  
   - 10 goals  

   **d. Class Diagram voor een game**
   - Minstens 6 classes  
   - Minstens 1 Abstract Class waar ten minste twee Classes van erven  
   - Minstens 1 Interface die gebruikt wordt door minstens 1 Class  
   - Elke Class heeft minstens één relatie met een andere Class  

---

## Veel gemaakte fouten

1. De student kan de toegevoegde waarde van de diagram niet uitleggen (bijv. waarom een use case diagram gekozen is).  
2. De student kan de diagram zelf niet uitleggen of bepaalde keuzes onderbouwen (bijv. waarom een relatie 1-op-n is in plaats van n-op-n).  
3. De diagram voldoet niet aan de UML-standaarden.  
4. De diagram sluit niet aan bij de beschreven wensen/eisen van de opdrachtgever.

---

## Voorbeelden

✅ **Goed**
- UML diagram gemaakt met tool zoals **Lucidchart** of **Astah**  
  ![Voorbeeld 1](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/67292276-fd15-4e3d-8347-30928081d125/Untitled.png)  
  ![Voorbeeld 2](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/94a62d6c-e942-420c-864c-3773fb5c64ef/Untitled.png)

❌ **Fout**
- Een pdf van een user interface design  
- Een gegenereerd diagram (bijv. Mermaid) — *je moet de diagram zelf tekenen!*  
- Een sitemap van een website  
  ![Fout voorbeeld](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/03d771cc-9458-49c0-8e0b-d8a91991356c/Untitled.png)
- Mix van UML en niet-UML

---

## Criterium 2.2: Schematechnieken

| Criterium | 0 punten | 1 punt | 2 punten | 3 punten |
|------------|-----------|----------|-----------|-----------|
| 2.2. Er is gebruikgemaakt van relevante of toepasselijke schematechnieken (bijv. activiteitendiagram, klassendiagram, ERD, use case diagram). | Niet of nauwelijks: er zijn geen schematechnieken gebruikt. | Enigszins: er zijn wel schematechnieken gebruikt maar die zijn zeer beperkt. Er zijn wel schema’s maar deze geven geen volledig beeld van de vertaling van de eisen en wensen. Het dataschema is beperkt en niet dekkend voor de eisen en wensen. | Grotendeels: het ontwerp heeft minimaal één activiteitendiagram. Er is een onderliggend ERD waarmee de eisen en wensen kunnen worden gerealiseerd. | Volledig: het ontwerp is een duidelijke weerspiegeling van de eisen en wensen. In het ontwerp zijn de volgende zaken aanwezig, correct en passend: activiteitendiagram, een correct en volledig dataschema, een class diagram en er is rekening gehouden met het design pattern. |

Zie criterium **2.1** voor toelichting.

---

## Criterium 2.3: Onderbouwing

| Criterium | 0 punten | 1 punt | 2 punten | 3 punten |
|------------|-----------|----------|-----------|-----------|
| 3. De gemaakte keuzes in het ontwerp zijn onderbouwd met steekhoudende argumenten, waarbij rekening is gehouden met bijv. ethiek, privacy en security. | Niet of nauwelijks: de gemaakte ontwerpen zijn niet toegelicht. | Enigszins: Ontwerpen zijn beperkt toegelicht en/of de toelichting is beperkt. De toelichting legt geen of enigszins verband tussen het ontwerp en eisen en wensen. In de argumentatie is geen of beperkt aandacht voor ethiek, privacy en security. | Grotendeels: de ontwerpen zijn toegelicht en de lezer ervaart de relatie met de eisen en wensen. In de argumentatie op het ontwerp worden zaken benoemd als ethiek, privacy en security, maar deze zijn beperkt. | Volledig: de ontwerpen zijn toegelicht en de lezer ervaart de relatie met de eisen en wensen. De onderbouwing is steekhoudend beargumenteerd en in de toelichting wordt een duidelijke relatie gelegd met ethiek, privacy en security. |

---

## Veel gemaakte fouten

1. Niet alle drie de onderdelen (**ethiek, privacy, security**) worden toegelicht.  
2. De toelichting slaat nergens op en lijkt alleen verzonnen voor dit onderdeel (spar met een coach als je hier moeite mee hebt).  
3. De student kan zijn onderbouwing niet verder toelichten.

---

## Voorbeelden

✅ **Goed**
- Een markdown-bestand waarin per onderdeel (**ethiek, privacy, security**) wordt toegelicht hoe hiermee in het ontwerp rekening is gehouden.  
  ![Goed voorbeeld](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b7744aec-6051-48cd-8284-77dfb2614dd9/Untitled.png)

❌ **Fout**
- Geen toelichting  
- Toelichting die duidelijk is gegenereerd (bijv. door ChatGPT) en daardoor nergens op slaat.
