# EventFinder

EventFinder er en mobilapp til at finde begivenheder i København. Appen bygges med JavaScript, React Native og Expo, så den senere kan køre på både iOS og Android. Brugeren skal kunne finde events på et kort eller i en liste, filtrere dem og gemme favoritter.

Dette dokument forklarer den planlagte arkitektur. Flere mapper indeholder foreløbig kun placeholder-filer, fordi funktionaliteten implementeres trin for trin.

## Teknologier

- **Expo og React Native** bruges til at bygge mobilappen.
- **React Navigation** skal stå for navigation mellem skærme. Det installeres og opsættes senere.
- **Firebase Cloud Functions** skal være backend for eventdata og eksterne API-kald.
- **Firestore** skal gemme brugerens favoritbegivenheder.

## Hvad snakker med hvad?

```text
Bruger
  ↓
Screens (skærme) → Components (genbrugelig brugerflade)
  ↓ bruger
Hooks
  ↓ kalder
Services
  ↓
Firebase Cloud Functions / Firestore
  ↓
Eksterne event-API'er
```

Screens viser indholdet for brugeren. De bruger components til at bygge brugerfladen og hooks til at hente eller ændre data. Hooks benytter services, som står for den konkrete kommunikation med backend og Firestore. Cloud Functions henter og ensretter eventdata fra de eksterne kilder.

## Appens entry points

### `index.js`

`index.js` er Expo-appens entry point. Expo bruger filen til at starte applikationen.

### `App.js`

`App.js` er appens øverste React-komponent. Den skal senere koble navigationen på, så brugeren kan skifte mellem appens skærme. Den eksisterende Expo-konfiguration og `App.js` beholdes, mens appen bygges op.

## `screens/` – hele skærme

Vi bruger `screens/` til komponenter, der repræsenterer en komplet side i appen. En screen samler data og brugerflade for én brugeropgave, men bør ikke selv indeholde gentagen logik.

- `HomeScreen.jsx` skal være forsiden med kort, filtre og en liste over events.
- `EventDetailScreen.jsx` skal vise alle oplysninger om én valgt begivenhed.
- `FavoritesScreen.jsx` skal vise de events, brugeren har gemt.

Fordelen er, at det er tydeligt, hvor hver del af brugeroplevelsen hører hjemme. Det gør også navigationen lettere at læse og vedligeholde.

## `components/` – genanvendelige brugerfladeelementer

Vi bruger `components/` til mindre dele af brugerfladen, som kan bruges flere steder. På den måde undgår vi at skrive den samme visning igen i flere screens.

- `EventCard.jsx` skal vise et kort med en begivenhed i en liste.
- `EventMarker.jsx` skal vise en begivenhed som markør på et kort.
- `EventMap.jsx` skal samle kortet og de viste begivenheder.
- `FilterBar.jsx` skal indeholde filtre, fx kategori og dato.
- `LoadingIndicator.jsx` skal vise, at data er ved at blive hentet.

Vi bruger components, så ændringer i designet kun skal laves ét sted. Hvis udseendet af et eventkort ændres, får alle screens, der bruger `EventCard`, automatisk den samme opdatering.

## `navigation/` – skift mellem skærme

`navigation/AppNavigator.jsx` skal samle React Navigation-konfigurationen. Her definerer vi, hvordan brugeren bevæger sig mellem forside, eventdetaljer og favoritter.

Vi holder navigationen i sin egen mappe, så `App.js` ikke bliver fyldt med detaljer om stacks, tabs og skærmnavne. React Navigation er planlagt, men endnu ikke installeret i projektet.

## `hooks/` – React-logik tæt på brugerfladen

Vi bruger hooks til at samle genanvendelig React-logik. En hook kan holde styr på data, loading og fejl, uden at hver screen selv skal skrive den samme `useState`- og `useEffect`-logik.

- `useEvents.js` skal håndtere hentning af events samt loading- og fejltilstande.
- `useFavorites.js` skal håndtere hentning, tilføjelse og fjernelse af favoritter.

For eksempel skal både forsiden og en mulig senere søgeskærm kunne bruge eventdata. Vi bruger derfor en hook, så de kan få samme struktur, fx events, loading og error, uden at kopiere kode. Det gør det nemmere for os at teste, ændre og genbruge logikken.

## `services/` – kommunikation med data

Vi bruger `services/` til den konkrete kommunikation med systemer uden for komponenterne. Components og screens skal ikke kende URL'er, Firestore-kald eller Firebase-konfiguration; de beder en service om data gennem en hook.

- `eventService.js` skal bede backend om eventdata.
- `favoriteService.js` skal læse og skrive favoritter i Firestore.
- `firebase.js` skal samle Firebase-klientens konfiguration.

Denne opdeling gør det nemmere for os at ændre datakilden senere. Hvis event-API'et ændrer sig, kan vi rette kommunikationen i service-laget frem for at gennemgå alle screens.

## `utils/` – små hjælpefunktioner

Vi bruger `utils/` til funktioner, der ikke er React-komponenter og ikke selv henter data. Det kan fx være at formatere en dato eller sortere en liste.

- `dateUtils.js` skal formatere dato og klokkeslæt til et brugervenligt dansk format.
- `eventUtils.js` skal indeholde fælles funktioner til filtrering og sortering af events.

Vi bruger utils, så den samme regel bruges konsekvent i hele appen. Det gør det nemmere for os at rette eksempelvis en sorteringsregel ét sted og undgå forskellige resultater på forskellige screens.

## `constants/` – faste fælles værdier

`constants/categories.js` skal indeholde appens eventkategorier, fx musik, sport og kultur.

Vi bruger constants, så kategorier ikke bliver skrevet som fritekst mange forskellige steder. Det mindsker risikoen for stavefejl og gør det nemmere for os at tilføje eller ændre en kategori senere.

## `functions/` – Firebase Cloud Functions (backend)

Mobilappen skal ikke kontakte Billetto, Ticketmaster eller andre eksterne kilder direkte. I stedet skal den kalde et endpoint i Firebase Cloud Functions. Backend-laget kan beskytte API-nøgler, samle data fra flere kilder og returnere et ensartet resultat til appen.

- `functions/src/index.js` skal være indgangspunktet for Cloud Functions og HTTP-endpoints.
- `functions/src/services/` skal indeholde integrationer til Billetto, Københavns Biblioteker, Ticketmaster og Københavns Kommunes WFS-API.
- `functions/src/utils/normalizeEvents.js` skal omsætte forskellige API-svar til ét fælles eventformat.
- `functions/src/utils/geocoding.js` skal senere kunne omdanne en adresse til GPS-koordinater, så events kan vises på et kort.

Vi bruger et fælles eventformat, så resten af appen ikke behøver vide, hvilken eventkilde data kommer fra. En `EventCard` skal eksempelvis kunne vise et event på samme måde, uanset om det kommer fra Billetto eller Ticketmaster.

## Dataflow

### Events

1. `HomeScreen` bruger `useEvents`.
2. `useEvents` kalder `eventService`.
3. `eventService` kalder et Firebase Cloud Functions-endpoint.
4. Cloud Functions henter data fra de eksterne API'er.
5. Cloud Functions normaliserer data til et fælles format og sender dem tilbage til appen.
6. `HomeScreen` sender eventdata videre til fx `EventMap` og `EventCard`.

### Favoritter

1. Brugeren vælger at gemme eller fjerne en begivenhed som favorit.
2. En screen eller component bruger `useFavorites`.
3. `useFavorites` kalder `favoriteService`.
4. `favoriteService` læser eller skriver data i Firestore.
5. `FavoritesScreen` viser brugerens gemte events.

## Konfiguration og sikkerhed

- `.env.example` skal vise navnene på lokale miljøvariabler uden at indeholde hemmelige værdier.
- `firebase.json` skal senere indeholde Firebase-projektets lokale konfiguration.
- `firestore.rules` skal senere definere regler for, hvem der må læse og skrive favoritter i Firestore.
- `.gitignore` sikrer, at fx `node_modules`, lokale miljøfiler og andre genererede filer ikke kommer med i Git.

API-nøgler og andre hemmeligheder må aldrig lægges direkte i appens kode eller pushes til Git. De skal håndteres som miljøvariabler eller Firebase-konfiguration, når backend implementeres.

## Nuværende status

Projektets mappestruktur er på plads. Funktionerne i screens, components, hooks, services og Firebase Cloud Functions er endnu ikke implementeret, og der er ikke installeret ekstra dependencies som React Navigation eller Firebase. Det gøres bevidst trin for trin i den videre udvikling.
