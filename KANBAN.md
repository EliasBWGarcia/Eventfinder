# EventFinder – Kanban-board

Dette board bruges til at fordele arbejdet frem mod aflevering den 15. december. Tilføj jeres navn under **Ansvarlig**, når I tager et kort, og flyt kortet til næste kolonne, når status ændrer sig.

Et kort må først flyttes til **Færdig**, når en anden i gruppen har gennemgået løsningen, og alle kan få en kort forklaring af den.

## Backlog

| Opgave | Ansvarlig | Reviewer | Definition af færdig |
| --- | --- | --- | --- |
| Opret GitHub Project med samme kolonner som dette board |  |  | Projektet har Backlog, Denne uge, I gang, Review og test samt Færdig |
| Gennemgå projektstruktur og README sammen |  |  | Alle kan forklare screens, components, hooks, services og Cloud Functions |
| Definér det fælles eventformat |  |  | Gruppen er enig om felter for ID, kilde, titel, beskrivelse, tidspunkt, sted, koordinater og kategori |
| Aftal, hvor API-nøgler og Firebase-konfiguration skal ligge |  |  | Ingen hemmeligheder ligger i appkode eller Git |
| Afklar Københavns Kommune-kildens adgang og datamodel |  |  | Kilden kan beskrives som en konkret adapteropgave eller markeres som udskudt |
| Indhent Ticketmaster API-nøgle |  |  | Nøglen kan gemmes som backend-miljøvariabel |
| Planlæg eksamensdemo og fordeling af emner |  |  | Alle kender deres emne og kan forklare det fælles dataflow |

## Denne uge

| Opgave | Ansvarlig | Reviewer | Definition af færdig |
| --- | --- | --- | --- |
| Opsæt React Navigation med Home og Event Detail |  |  | Man kan åbne og gå tilbage fra en tom detaljeside |
| Opsæt grundkort med København som startpunkt |  |  | Kortet kan åbne stabilt på en valgt testplatform |
| Opret Cloud Functions-struktur og ét event-endpoint med testdata |  |  | Appen kan hente ensartede test-events fra backend |
| Opret testlog til kendte fejl, beslutninger og afprøvninger |  |  | Gruppen har ét sted at dokumentere tests og beslutninger |

## I gang

| Opgave | Ansvarlig | Reviewer | Næste skridt |
| --- | --- | --- | --- |
| *Flyt en opgave hertil, når nogen starter på den* |  |  |  |

## Review og test

| Opgave | Ansvarlig | Reviewer | Tjek før godkendelse |
| --- | --- | --- | --- |
| *Flyt en opgave hertil, når implementeringen er klar* |  |  | Virker den, er den forstået af revieweren, og er README/testlog opdateret? |

## Færdig

| Opgave | Ansvarlig | Reviewer | Afsluttet dato |
| --- | --- | --- | --- |
| *Flyt godkendte opgaver hertil* |  |  |  |

## Klar til næste uge

### Kort og eventvisning

| Opgave | Ansvarlig | Reviewer | Definition af færdig |
| --- | --- | --- | --- |
| Integrér Københavns Bibliotekers event-API |  |  | Events bliver normaliseret til det fælles format |
| Integrér Billetto, når credentials er klar |  |  | Credentials bruges kun i Cloud Functions |
| Forbered Ticketmaster-adapter, men hold den deaktiv indtil API-nøglen er klar |  |  | Manglende nøgle stopper ikke appen |
| Vis events som markører på kortet |  |  | Alle events med gyldige koordinater får en korrekt placering |
| Skjul events uden gyldige GPS-koordinater |  |  | Manglende koordinater skaber ikke fejl eller misvisende markører |
| Byg eventdetaljeside |  |  | Titel, dato/tid, sted, kategori og beskrivelse vises |
| Tilføj brugerens placering og København-fallback |  |  | Afvist tilladelse giver stadig et brugbart kort |

### Filtre og robusthed

| Opgave | Ansvarlig | Reviewer | Definition af færdig |
| --- | --- | --- | --- |
| Implementér tidsfilter: Nu |  |  | Viser igangværende events eller events, der starter inden for to timer |
| Implementér tidsfilter: I aften |  |  | Viser events fra kl. 18 til midnat |
| Implementér tidsfilter: Denne weekend |  |  | Viser events fra fredag kl. 16 til søndag ved midnat |
| Implementér valgfri dato |  |  | Viser events på den valgte dato |
| Implementér kategori-multivalg |  |  | Musik, kultur, sport, familie og andet kan vælges samtidigt |
| Tilføj markørklynger |  |  | Tætte events samles, og tryk zoomer ind |
| Tilføj loading-, tom- og fejltilstande |  |  | Brugeren får forståelige beskeder ved ventetid, ingen events og kildefejl |
| Håndtér fejl fra én datakilde |  |  | Events fra andre aktive kilder vises stadig |

### Test, dokumentation og aflevering

| Opgave | Ansvarlig | Reviewer | Definition af færdig |
| --- | --- | --- | --- |
| Test tidsfiltre ved deres grænser |  |  | Nu, kl. 18, midnat samt weekendens start og slut er afprøvet |
| Test lokation tilladt og afvist |  |  | Begge forløb virker som planlagt |
| Test eventmarkører, klynger og detaljeside |  |  | Hele demo-flowet er afprøvet |
| Test på iOS og Android eller emulatorer |  |  | Resultaterne står i testloggen |
| Opdatér README med færdig arkitektur og begrænsninger |  |  | En lærer kan forstå løsningens opbygning |
| Gennemfør eksamensgennemgang |  |  | Hver person kan forklare frontend, backend og dataflow |
| Frys funktioner og ret kun demo-kritiske fejl |  |  | Demoen gennemføres uden fejl |

## Aftalte produktbeslutninger

- Første version dækker Københavns Kommune.
- Forsiden er kortbaseret uden eventliste.
- Brugeren vælger mellem Nu, i aften, denne weekend og en valgfri dato.
- Kategorier er musik, kultur, sport, familie og andet.
- Brugeren kan afvise lokationstilladelse og får da København centrum som startpunkt.
- Tætte markører samles i klynger.
- Favoritter, login, Firestore-lagring, deling og køb-links er udskudt.
