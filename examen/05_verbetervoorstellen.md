# 📘 StadsBingo – 05_verbetervoorstellen.md

## 🎯 Doel
Gerichte verbetervoorstellen formuleren op basis van testen, oplevering en reflectie (conform eisen 5.1, 5.2 en 5.3).

---

## 🧪 5.1 Verbeteringen op basis van testen

1. Teamcode throttling toevoegen  
   - Reden: test `auth.team-login.post.test.ts` toont brute-force mogelijk.  
   - Actie: rate-limit per IP/teamcode + lockout na 5 foute pogingen.  
   - Effect: betere security en minder supportverzoeken.

2. Statusflow valideren bij backend  
   - Reden: integratietest `submissions.patch-status` toonde dat docent `Approved` kan zetten als vorige opdracht nog `Pending`.  
   - Actie: backend check toevoegen: volgorde respecteren voordat status naar `Approved` kan.  
   - Effect: statusflow blijft consistent per team.

3. Notificatieservice retry logic  
   - Reden: notificatie test faalde bij timeouts → melding nooit verstuurd.  
   - Actie: retry mechanisme + fallback queue implementeren, tests uitbreiden.  
   - Effect: leerlingen missen minder feedbackmeldingen.

---

## 📦 5.2 Verbeteringen op basis van oplevering

1. Teambeheer wizard  
   - Reden: docenten vonden het lastig om leerlingen aan meerdere teams te koppelen.  
   - Actie: wizard met stappen (teamnaam → leden → code genereren).  
   - Impact: minder fouten en snellere onboarding.

2. Visuele voortgang per team uitbreiden  
   - Reden: huidige grafiek toont alleen percentage, geen detail per opdracht.  
   - Actie: drill-down mogelijkheid per leerling en per opdrachtstatus.  
   - Impact: docenten zien sneller waar teams vastlopen.

3. Leerling dashboard notificatie-paneel  
   - Reden: notificaties verdwijnen na refresh, waardoor feedback gemist wordt.  
   - Actie: persistent paneel met alle recente meldingen + “markeer als gelezen”.  
   - Impact: betere communicatie en minder herhaalde vragen.

---

## 🔁 5.3 Verbeteringen op basis van reflectie

1. Teamwork synchroniseren met echte gebruikers  
   - Observatie: teamcodes en voortgang zijn bedacht zonder echte docent input.  
   - Actie: voor elke sprint een korte check-in met docent over teamstructuur.  
   - Effect: minder rework doordat workflow beter aansluit.

2. Statusdiagram vooraf tekenen  
   - Observatie: statusovergangen werden gaandeweg aangepast, leidde tot bugs.  
   - Actie: eerst activity/state diagram finaliseren voordat code verandert.  
   - Effect: duidelijk alignment tussen ontwerp, tests en implementatie.

3. Notificaties mocken in dev  
   - Observatie: notificaties werden handmatig getest, kostte tijd.  
   - Actie: local mockservice + scripts zodat meerdere ontwikkelaars parallel kunnen werken.  
   - Effect: sneller itereren en minder afhankelijkheid van externe services.

---

## 📋 Checklist (eis 5)
✅ Minimaal 3 verbeterpunten per onderdeel  
✅ Koppeling aan testresultaten/oplevering/reflectie  
✅ Concreet en realistisch geformuleerd  
✅ Markdown-uitwerking gereed

