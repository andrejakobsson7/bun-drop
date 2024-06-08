Nödvändiga kommandon för att köra appen:

npm run dev

json-server --watch db.json --port 9999


Reflektion kring projektet:

Min tänkta arbetsgång för projektet var att först skapa designen i Figma, sedan skapa designen för respektive sida i HTML/CSS och till sist gå tillbaka till sidorna/komponenterna och implementera logiken.
Med facit i hand var det inget bra upplägg för min del, då det som tagit längst tid för mig har varit att fundera ut hur det ska se ut och implementera det. Så när det väl var dags att börja på logiken fick jag börja om litegrann och försöka komma in i React-tankesättet igen, vilket var en utmaning. Om jag skulle gjort om projektet hade jag nog gjort en sida helt klar (med både design och logik) först, och sedan gått vidare till nästa.
Till nästa projekt ska jag också avsätta mer tid innan jag börjar koda för att fundera ut sidornas funktion, inte bara design. 
Tar man det helikopter-perspektivet redan innan tror jag att det blir enklare att identifiera de gemensamma nämnare som varja komponent/sida har och redan från början lägga dem i hooks eller komponenter, för att slippa återupprepning av kod och riskfyllda korrigeringar i efterhand.

En annan utmaning med projektet har för min del varit avsaknaden av språkmässig struktur. Nu har man vant sig vid den tydliga strukturen i C#, så att komma till JavaScript där i princip allt är möjligt har varit lite överväldigande ibland. Det gäller verkligen att man är strukturerad i sitt arbetssätt och det har jag nu insett att jag inte alltid är. Det har varit väldigt många gånger som jag börjat på ett problem, som spiller över i ett annat och så vidare till ett tredje - och till sist vet man inte vad man håller på med. Lägg därtill att man nu blandar problem inom både design och logik samtidigt så gör det inte saken enklare. 

När det kommer till favorithanteringen var jag först inne på att ha en separat sida (ex. under user-fliken) där man kunde administrera det, men ändrade mig sedan till att istället göra det direkt i menyn, vilket jag tror blev en mer användarvänlig lösning.
Nackdelen med den lösning jag implementerat nu, är att så fort det sker ett tillägg/borttag av favoriter så går det ett PUT-request, vilket känns lite onödigt.
Jag försökte få till en lösning som, istället för att göra PUT-requestet direkt, sparar undan användarens ursprungliga favoriter lokalt på sidan vid rendering och sedan görs tillägg/borttag endast mot den lokala listan, via useRef-hooken. Först när användaren navigerar bort från sidan skulle det riktiga PUT-requestet gått iväg. Men det blev snabbt stökigt och många variabler att hålla reda på, så jag valde trots allt lösningen med ett PUT-request för varje ändring.

Det har varit ett roligt projekt att genomföra och det har varit lärorikt att få tänka igenom en applikation från start till mål och sedan försöka genomföra den idén. När man väl kommit in i React-tankesättet tyckte jag att det var ett ganska trevligt ramverk att jobba i. Det var också ganska lätt att hitta svar på frågor som dök upp, vilket gjorde att jag kunde implementera useContext-hooken och även implementera en komponent ("ProtectedRoute") som kan skydda särskilda sidor från att nås av användare som inte är inloggade.

Som helhet är jag ganska nöjd med projektet, men det har också fått mig att inse att detta inte är min starka sida inom programmering och här som jag behöver lägga ner en hel del timmar för att bli bättre och få upp kreativiteten.

André Jakobsson
2024-06-07

