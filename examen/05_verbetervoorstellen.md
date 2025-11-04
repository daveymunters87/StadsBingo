# 📘 StadsBingo – 05_verbetervoorstellen.md

## 🎯 Doel
Gerichte verbetervoorstellen formuleren op basis van testen, oplevering en reflectie (conform eisen 5.1, 5.2 en 5.3).

---

## 🧪 5.1 Verbeteringen op basis van testen

1. Valideer maximale lengte `tekstAntwoord` ook server-side  
   - Reden: componenttest toonde alleen client-validatie; API accepteerde > N chars.  
   - Actie: schema/DTO-validatie toevoegen en test uitbreiden (API).  
   - Verwacht effect: minder foutieve data, duidelijkere foutmeldingen.

2. Verplicht `feedback` bij `reject` afdwingen in API  
   - Reden: integratietest toont dat de UI dit doet, maar API liet lege feedback toe.  
   - Actie: API validatie + 400 response bij leeg.  
   - Verwacht effect: consistente data en betere uitleg aan leerlingen.

3. Filters combineren (status + leerling)  
   - Reden: componenttest signaleerde randgevallen bij gecombineerde filters.  
   - Actie: testdata uitbreiden, filterlogica herschrijven voor AND-combinaties.  
   - Verwacht effect: sneller beoordelen door docenten.

---

## 📦 5.2 Verbeteringen op basis van oplevering

1. Leerlingoverzicht met duidelijke lege-staat  
   - Reden: bij nul inzendingen is de pagina leeg; onduidelijk voor gebruiker.  
   - Actie: lege-staat met call-to-action naar opdrachtenlijst.  
   - Impact: betere UX en minder supportvragen.

2. Bevestiging na indienen verbeteren  
   - Reden: huidige notificatie valt niet op.  
   - Actie: duidelijke toast + teruglink naar “mijn inzendingen”.  
   - Impact: betere flow en minder dubbeleving.

3. Docentoverzicht: sorteren op meest recent  
   - Reden: nieuwe inzendingen staan niet altijd bovenaan.  
   - Actie: default sort op `aangemaaktOp DESC`.  
   - Impact: efficiënter beoordelen.

---

## 🔁 5.3 Verbeteringen op basis van reflectie

1. Kleine PR’s met gerichte scope  
   - Observatie: features werden soms in één grote PR opgeleverd.  
   - Actie: max ~300 regels per PR; duidelijke beschrijving en checklist.  
   - Verwacht effect: snellere review en minder regressies.

2. Test-first bij status/feedback  
   - Observatie: tests kwamen na implementatie; leidde tot ombouw.  
   - Actie: eerst API/validatie-tests schrijven bij nieuwe status-flows.  
   - Verwacht effect: minder rework, hogere dekking.

3. Afstemming met docent-gebruiker over reject-criteria  
   - Observatie: feedback verplichting kwam laat aan het licht.  
   - Actie: vooraf mini-afspraak met acceptatiecriteria per flow.  
   - Verwacht effect: minder wijzigingsverzoeken achteraf.

---

## 📋 Checklist (eis 5)
✅ Minimaal 3 verbeterpunten per onderdeel  
✅ Koppeling aan testresultaten/oplevering/reflectie  
✅ Concreet en realistisch geformuleerd  
✅ Markdown-uitwerking gereed

