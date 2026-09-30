# Kontrahenci

Kontrahent to firma, dla której warsztat robi wyceny i zlecenia — klient.
Tutaj sprawdzasz listę kontrahentów, dodawanie, edycję, pobieranie danych
z GUS (urzędowego rejestru firm) i archiwizację.

**Gdzie to jest:** menu po lewej → „Kontrahenci”.

---

## Lista

### KON-001 · Lista kontrahentów się wczytuje

**Ważność:** krytyczny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Kliknij „Kontrahenci” w menu po lewej.

**Co powinno się stać**

- [ ] Na górnym pasku widać tytuł „Kontrahenci”.
- [ ] Tabela ma kolumny: „Nazwa”, „NIP”, „Osoba kontaktowa”, „E-mail”, „Miejscowość”, „Akcje”.
- [ ] Kontrahenci są ułożeni alfabetycznie po nazwie.
- [ ] Puste pola wyświetlają się jako kreska „—”.
- [ ] Na liście **nie ma** kontrahenta „Archiwum Test”.
- [ ] Przy kontrahencie z telefonem numer widać pod adresem e-mail, mniejszą czcionką.

> Kod: `app/actions/clients.ts` · `getCompanyClients` — filtr `is_archived = false`, sortowanie po `name`

### KON-002 · Wyszukiwanie po nazwie

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz „Kontrahenci”.
2. W polu „Szukaj kontrahenta...” wpisz: `stal`
3. Kliknij krzyżyk w polu wyszukiwania.

**Co powinno się stać**

- [ ] Po kroku 2 na liście został tylko „Stalmet Sp. z o.o.”.
- [ ] Lista zawęża się od razu, bez klikania „Szukaj” ani Enter.
- [ ] Po kroku 3 pole jest puste i wraca pełna lista.

> Kod: `clients-content.tsx` · `filteredClients`

### KON-003 · Wyszukiwanie po innych polach

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Zanim zaczniesz:** otwórz kartę „Stalmet Sp. z o.o.” i zapisz sobie jego NIP, miasto, e-mail, telefon i osobę kontaktową. Wróć na listę.

**Co zrobić**

Wpisuj po kolei w pole wyszukiwania i po każdej próbie wyczyść pole:

1. NIP Stalmetu.
2. Nazwę miasta Stalmetu.
3. Część adresu e-mail Stalmetu (np. to, co przed „@”).
4. Ostatnie 3 cyfry telefonu Stalmetu.
5. Nazwisko osoby kontaktowej Stalmetu.

**Co powinno się stać**

- [ ] W każdej z pięciu prób Stalmet jest na liście wyników.

> Kod: `clients-content.tsx` — przeszukiwane pola: nazwa, NIP, osoba kontaktowa, e-mail, telefon, miasto

### KON-004 · Wyszukiwanie ignoruje polskie znaki i wielkość liter

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Wpisz w wyszukiwanie: `zuraw`
2. Wyczyść i wpisz: `ŻURAW`
3. Wyczyść i wpisz: `lodz`
4. Wyczyść i wpisz dwa słowa: `żuraw metali`

**Co powinno się stać**

- [ ] W każdej próbie na liście jest „Żuraw i Syn — Obróbka Metali”.

> Kod: `lib/command-palette-match.ts` · `normalizeSearchText`, `matchesSearchQuery` — każde słowo musi pasować

### KON-005 · Wyszukiwanie bez wyników

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Wpisz w wyszukiwanie: `xyzqwe`

**Co powinno się stać**

- [ ] Zamiast tabeli widać tekst „Brak kontrahentów pasujących do wyszukiwania.”

> Kod: `clients-list.tsx` · `noResults`

### KON-006 · Pusta lista kontrahentów

**Ważność:** ważny · **Zaloguj się jako:** Właściciel Delta Frez (`enterprise`)

**Co zrobić**

1. Otwórz „Kontrahenci”.

**Co powinno się stać**

- [ ] Widać tekst „Brak kontrahentów. Dodaj pierwszego kontrahenta, aby zacząć.”
- [ ] Przycisk „Dodaj kontrahenta” jest aktywny.

> Kod: `clients-list.tsx` · `emptyState`

### KON-007 · Przyciski akcji w wierszu

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Najedź myszką na wiersz „Stalmet Sp. z o.o.”.
2. Zjedź myszką z wiersza.
3. Kliknij w pole wyszukiwania, a potem naciskaj klawisz Tab, aż zaznaczenie dojdzie do wiersza Stalmetu.

**Co powinno się stać**

- [ ] Po kroku 1 w kolumnie „Akcje” pojawiają się przyciski „Otwórz” i „⋯” (trzy kropki).
- [ ] Po kroku 2 przyciski znikają.
- [ ] Po kroku 3 przyciski są widoczne także bez myszki.

> Kod: `clients-list.tsx` · `group-hover/row`, `group-focus-within/row`

### KON-008 · Otwieranie karty kontrahenta

**Ważność:** krytyczny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Kliknij nazwę „Stalmet Sp. z o.o.” na liście.
2. Wróć strzałką „←” w lewym górnym rogu karty.
3. Najedź na wiersz Stalmetu i kliknij „Otwórz”.

**Co powinno się stać**

- [ ] W obu przypadkach otwiera się strona z nagłówkiem „Edytuj kontrahenta”.
- [ ] Na górnym pasku karty widać nazwę „Stalmet Sp. z o.o.”.
- [ ] Wszystkie pola są wypełnione danymi Stalmetu.

> Kod: `clients/[clientId]/page.tsx`, `client-form.tsx`

---

## Dodawanie

### KON-010 · Dodanie kontrahenta z samą nazwą

**Ważność:** krytyczny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Na liście „Kontrahenci” kliknij „Dodaj kontrahenta” (prawy górny róg).
2. W polu „Nazwa firmy” wpisz: `Test <data>`
3. Kliknij „Zapisz kontrahenta”.
4. Wróć na listę strzałką „←”.

**Co powinno się stać**

- [ ] Po kroku 1 otwiera się okno „Nowy kontrahent” z sekcjami „Dane firmowe” i „Dane kontaktowe”.
- [ ] Po kroku 3 okno się zamyka i otwiera się karta nowego kontrahenta („Edytuj kontrahenta”).
- [ ] Na karcie pole „Nazwa firmy” zawiera wpisaną nazwę, pozostałe pola są puste, „Język komunikacji” to polski.
- [ ] Po kroku 4 nowy kontrahent jest na liście w kolejności alfabetycznej.

> Kod: `create-client-dialog.tsx`, `app/actions/clients.ts` · `createClient_`

### KON-011 · Dodanie bez nazwy

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Kliknij „Dodaj kontrahenta”.
2. Nic nie wpisuj w „Nazwa firmy”. Kliknij „Zapisz kontrahenta”.
3. W „Nazwa firmy” wpisz same spacje: `   ` i kliknij „Zapisz kontrahenta”.

**Co powinno się stać**

- [ ] W obu próbach pod polem „Nazwa firmy” pojawia się czerwony tekst „To pole jest wymagane”.
- [ ] Okno zostaje otwarte, nikt nie zostaje dodany.
- [ ] Gdy zaczniesz pisać w „Nazwa firmy”, czerwony tekst znika.

> Kod: `create-client-dialog.tsx` · `handleSubmit` — `form.name.trim()`

### KON-012 · Dodanie z kompletem danych

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Kliknij „Dodaj kontrahenta” i wypełnij:
   - „NIP”: `5213000000`
   - „Nazwa firmy”: `Komplet <data>`
   - „Ulica”: `Przemysłowa`
   - „Numer budynku”: `12A`
   - „Numer lokalu”: `3`
   - „Kod pocztowy”: `00-950`
   - „Miejscowość”: `Warszawa`
   - „Osoba kontaktowa”: `Anna Kowalska`
   - „Język komunikacji”: wybierz angielski
   - „Telefon”: `+48 600 100 200`
   - „E-mail”: `anna@example.com`
2. Kliknij „Zapisz kontrahenta”.

**Co powinno się stać**

- [ ] Otwiera się karta kontrahenta, a każde pole ma dokładnie wpisaną wartość.
- [ ] „Język komunikacji” pokazuje angielski.
- [ ] Na liście w kolumnach widać NIP, osobę kontaktową, e-mail z telefonem pod spodem i miasto.

> Kod: `createClient_` · `CLIENT_EDITABLE_FIELDS`

### KON-013 · Dodanie z błędnymi formatami danych

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Kliknij „Dodaj kontrahenta” i wypełnij:
   - „Nazwa firmy”: `Formaty <data>`
   - „NIP”: `123`
   - „Kod pocztowy”: `12345`
   - „Telefon”: `abc`
   - „E-mail”: `jan@`
2. Kliknij „Zapisz kontrahenta”.

**Co powinno się stać**

- [ ] Kontrahent **nie** zostaje zapisany.
- [ ] Przy polach pojawiają się czerwone komunikaty — takie same jak przy edycji (patrz KON-031): „NIP musi się składać z 10 cyfr”, „Nieprawidłowy format kodu pocztowego (NN-NNN)”, „Nieprawidłowy numer telefonu”, „Nieprawidłowy adres e-mail”.

> Kod: `create-client-dialog.tsx` — okno sprawdza tylko nazwę; formularz edycji sprawdza formaty (`clients/lib/types.ts`). Rozbieżność `R-04` w `index.md`.

### KON-014 · Kontrahent zapisany z błędnym e-mailem da się poprawić

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Zanim zaczniesz:** wykonaj KON-013. Jeśli kontrahent „Formaty…” jednak się zapisał, użyj go tutaj. Jeśli nie — pomiń ten scenariusz i oznacz jako zablokowany z dopiskiem „KON-013 przeszedł”.

**Co zrobić**

1. Na karcie kontrahenta „Formaty…” zmień tylko „Miejscowość” na `Kraków`.
2. Kliknij „Zapisz kontrahenta”.

**Co powinno się stać**

- [ ] Formularz pokazuje czerwone komunikaty przy błędnych polach i nie zapisuje zmiany.
- [ ] Po poprawieniu NIP, kodu, telefonu i e-maila zapis przechodzi i pojawia się komunikat „Zaktualizowano kontrahenta”.

> Kod: `client-form.tsx` · `zodResolver(clientFormSchema)` — skutek `R-04`

### KON-015 · Zapis nie tworzy duplikatu przy podwójnym kliknięciu

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Kliknij „Dodaj kontrahenta”, wpisz nazwę `Dwuklik <data>`.
2. Kliknij „Zapisz kontrahenta” dwa razy szybko pod rząd.
3. Wróć na listę i wyszukaj `Dwuklik`.

**Co powinno się stać**

- [ ] Po pierwszym kliknięciu przycisk zmienia tekst na „Zapisywanie…” i nie da się go kliknąć.
- [ ] Na liście jest dokładnie **jeden** kontrahent „Dwuklik…”.

> Kod: `create-client-dialog.tsx` · `isPending`

### KON-016 · Zamknięcie okna bez zapisu

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Kliknij „Dodaj kontrahenta”, wpisz nazwę `Porzucony <data>`.
2. Kliknij „Anuluj”.
3. Otwórz okno ponownie i zamknij je klawiszem Esc.
4. Wyszukaj `Porzucony` na liście.

**Co powinno się stać**

- [ ] Po krokach 2 i 3 okno się zamyka.
- [ ] Na liście nie ma kontrahenta „Porzucony…”.

> Kod: `create-client-dialog.tsx`

---

## GUS — pobieranie danych firmy

Serwer GUS na środowisku testowym ma dane testowe. Numery NIP, które
w nim istnieją, znajdziesz w README w sekcji „Dane do wpisywania”.

### KON-020 · Pobranie danych z GUS przy dodawaniu

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Kliknij „Dodaj kontrahenta”.
2. W polu „NIP” wpisz pierwszy NIP z listy „NIP-y istniejące w GUS” w README.
3. Kliknij „Synchronizuj dane z GUS”.

**Co powinno się stać**

- [ ] Na przycisku na chwilę kręci się kółko.
- [ ] Pola „Nazwa firmy”, „Ulica”, „Numer budynku”, „Kod pocztowy”, „Miejscowość” wypełniają się same.
- [ ] W prawym dolnym rogu pojawia się komunikat „Dane firmy pobrane pomyślnie”.
- [ ] Pola, których GUS nie zwrócił, zostają takie, jak były.

> Kod: `app/actions/clients.ts` · `lookupNip`

### KON-021 · Przycisk GUS przy pustym NIP

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Kliknij „Dodaj kontrahenta”. Nie wpisuj NIP.
2. Wpisz w „NIP” same spacje: `   `

**Co powinno się stać**

- [ ] W obu przypadkach przycisk „Synchronizuj dane z GUS” jest wyszarzony i nie reaguje.

> Kod: `create-client-dialog.tsx` — `disabled={!form.nip.trim()}`

### KON-022 · NIP w złym formacie

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Kliknij „Dodaj kontrahenta”.
2. W „NIP” wpisz: `12345` i kliknij „Synchronizuj dane z GUS”.
3. Zmień NIP na: `12345678901` (11 cyfr) i kliknij przycisk ponownie.

**Co powinno się stać**

- [ ] W obu próbach w prawym dolnym rogu pojawia się komunikat „Nieprawidłowy NIP”.
- [ ] Żadne pole się nie zmienia.

> Kod: `lookupNip` — `/^\d{10}$/`

### KON-023 · NIP nieistniejący w GUS

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Kliknij „Dodaj kontrahenta”.
2. W „NIP” wpisz NIP z listy „NIP-y nieistniejące w GUS” w README.
3. Kliknij „Synchronizuj dane z GUS”.

**Co powinno się stać**

- [ ] Pojawia się komunikat „NIP nie znaleziony w GUS”.
- [ ] Żadne pole się nie zmienia.

> Kod: `lookupNip` · `NIP_NOT_FOUND`

### KON-024 · NIP z kreskami i spacjami

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Kliknij „Dodaj kontrahenta”.
2. Weź pierwszy NIP z listy „NIP-y istniejące w GUS” i wpisz go z kreskami, np. `123-456-78-90`.
3. Kliknij „Synchronizuj dane z GUS”.

**Co powinno się stać**

- [ ] Dane się pobierają, tak jak w KON-020.
- [ ] Pole „NIP” pokazuje po pobraniu same cyfry, bez kresek.

> Kod: `lookupNip` — `nip.replace(/[\s-]/g, '')`

### KON-025 · GUS na karcie istniejącego kontrahenta

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz kartę kontrahenta „Bez NIP”.
2. Wpisz w „NIP” pierwszy NIP z listy „NIP-y istniejące w GUS”.
3. Kliknij „Synchronizuj dane z GUS”.
4. Kliknij „Anuluj” w prawym górnym rogu.

**Co powinno się stać**

- [ ] Po kroku 3 nazwa i adres wypełniają się danymi z GUS, pojawia się „Dane firmy pobrane pomyślnie”.
- [ ] Po kroku 4 pojawia się okno „Odrzucić zmiany?” — bo dane z GUS są niezapisaną zmianą.
- [ ] Po kliknięciu „Odrzuć zmiany” kontrahent „Bez NIP” zostaje bez zmian (sprawdź, otwierając go ponownie).

> Kod: `client-form.tsx` · `handleNipLookup` — `shouldDirty: true`

---

## Edycja

### KON-030 · Edycja i zapis

**Ważność:** krytyczny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Zanim zaczniesz:** utwórz kontrahenta `Edycja <data>` (jak w KON-010).

**Co zrobić**

1. Na karcie tego kontrahenta wpisz:
   - „Miejscowość”: `Poznań`
   - „Osoba kontaktowa”: `Jan Nowak`
   - „E-mail”: `jan@example.com`
2. W sekcji „Notatki” wpisz: `Płatność 14 dni`
3. Kliknij „Zapisz kontrahenta”.
4. Otwórz tego kontrahenta ponownie.

**Co powinno się stać**

- [ ] Po kroku 3 pojawia się komunikat „Zaktualizowano kontrahenta” i wracasz na listę.
- [ ] Na liście w wierszu widać „Jan Nowak”, „jan@example.com” i „Poznań”.
- [ ] Po kroku 4 wszystkie trzy pola i notatka mają zapisane wartości.

> Kod: `app/actions/clients.ts` · `updateClient`

### KON-031 · Walidacja pól przy edycji

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

Na karcie kontrahenta „Edycja…” z KON-030 wpisuj po kolei i za każdym razem kliknij „Zapisz kontrahenta”:

1. „NIP”: `123456789` (9 cyfr)
2. „Kod pocztowy”: `00950` (bez kreski)
3. „Telefon”: `------`
4. „E-mail”: `jan@`
5. Wyczyść „Nazwa firmy” całkowicie.

**Co powinno się stać**

- [ ] 1: przy NIP pojawia się „NIP musi się składać z 10 cyfr”.
- [ ] 2: przy kodzie pojawia się „Nieprawidłowy format kodu pocztowego (NN-NNN)”.
- [ ] 3: przy telefonie pojawia się „Nieprawidłowy numer telefonu”.
- [ ] 4: przy e-mailu pojawia się „Nieprawidłowy adres e-mail”.
- [ ] 5: przy nazwie pojawia się „To pole jest wymagane”.
- [ ] Przy żadnej próbie nie pojawia się „Zaktualizowano kontrahenta”.

> Kod: `clients/lib/types.ts` · `clientFormSchema`

### KON-032 · Poprawne warianty formatów

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

Na karcie „Edycja…” wpisz i zapisz:

1. „NIP”: `521-300-00-00`
2. „Telefon”: `600 100 200`
3. „Telefon”: `+48600100200`

**Co powinno się stać**

- [ ] Każdy zapis przechodzi z komunikatem „Zaktualizowano kontrahenta”.

> Kod: `clientFormSchema` — NIP bez spacji i kresek, telefon `^\+?[\d\s-]{6,20}$`

### KON-033 · Wyjście bez zmian

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz kartę dowolnego kontrahenta. Niczego nie zmieniaj.
2. Kliknij „Anuluj”.
3. Otwórz kartę ponownie i kliknij strzałkę „←”.

**Co powinno się stać**

- [ ] W obu przypadkach wracasz na listę od razu, bez żadnego pytania.

> Kod: `client-form.tsx` · `handleCancel` — `isDirty`

### KON-034 · Wyjście ze zmianami

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz kartę kontrahenta „Edycja…”. Zmień „Miejscowość” na `Gdańsk`. Nie zapisuj.
2. Kliknij „Anuluj”.
3. W oknie kliknij „Wróć do edycji”.
4. Kliknij strzałkę „←”.
5. W oknie kliknij „Odrzuć zmiany”.
6. Otwórz kartę tego kontrahenta ponownie.

**Co powinno się stać**

- [ ] Po kroku 2 pojawia się okno „Odrzucić zmiany?” z tekstem „Niezapisane zmiany kontrahenta zostaną utracone.”
- [ ] Po kroku 3 okno się zamyka, a w polu nadal jest „Gdańsk”.
- [ ] Po kroku 4 znowu pojawia się to samo okno.
- [ ] Po kroku 5 wracasz na listę.
- [ ] Po kroku 6 „Miejscowość” ma starą wartość, nie „Gdańsk”.

> Kod: `client-form.tsx` · `confirmCancelOpen`

### KON-035 · Czyszczenie pól

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Na karcie „Edycja…” usuń całą zawartość pól „E-mail” i „Osoba kontaktowa”.
2. Kliknij „Zapisz kontrahenta”.

**Co powinno się stać**

- [ ] Zapis przechodzi.
- [ ] Na liście w kolumnach „Osoba kontaktowa” i „E-mail” widać kreskę „—”.

> Kod: `client-form.tsx` · `handleSave` — puste pole zapisuje się jako brak wartości

### KON-036 · Zlecenia kontrahenta na karcie

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz kartę „Stalmet Sp. z o.o.”, przewiń do sekcji „Zlecenia”.
2. Kliknij pierwsze zlecenie na liście.
3. Wróć do „Kontrahenci” i otwórz kartę „Żuraw i Syn — Obróbka Metali”.

**Co powinno się stać**

- [ ] Sekcja „Zlecenia” u Stalmetu pokazuje 2 zlecenia: tytuł, numer (np. `ZAM-2026-0001`) i kolorowy status.
- [ ] Najnowsze zlecenie jest na górze.
- [ ] Po kroku 2 otwiera się to zlecenie.
- [ ] U „Żuraw i Syn” sekcja „Zlecenia” pokazuje „Ten kontrahent nie ma jeszcze żadnych zleceń.”

> Kod: `app/actions/clients.ts` · `getClientOrders` — sortowanie `created_at desc`

### KON-037 · Ograniczenia długości pól

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Na karcie „Edycja…” spróbuj wpisać w „Kod pocztowy” więcej niż 6 znaków.
2. W „Numer budynku” spróbuj wpisać 25 znaków.
3. Wklej w „Nazwa firmy” tekst dłuższy niż 200 znaków (np. ten akapit skopiowany trzy razy).

**Co powinno się stać**

- [ ] Pole „Kod pocztowy” nie przyjmuje więcej niż 6 znaków.
- [ ] Pole „Numer budynku” nie przyjmuje więcej niż 20 znaków.
- [ ] Pole „Nazwa firmy” obcina tekst do 200 znaków.

> Kod: `client-form.tsx` — `maxLength` 6 / 20 / 200

---

## Archiwizacja

### KON-040 · Archiwizacja kontrahenta

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Zanim zaczniesz:** utwórz kontrahenta `Do archiwum <data>`.

**Co zrobić**

1. Na liście najedź na jego wiersz, kliknij „⋯”, potem „Archiwizuj”.
2. Przeczytaj okno i kliknij „Archiwizuj”.
3. Naciśnij Ctrl+K (na Macu Cmd+K) i wpisz `Do archiwum`.

**Co powinno się stać**

- [ ] Po kroku 1 pojawia się okno „Zarchiwizować kontrahenta?” z tekstem „Kontrahent zniknie z listy. Istniejące zlecenia i wyceny zachowają powiązanie.”
- [ ] Po kroku 2 przycisk na chwilę pokazuje „Archiwizowanie…”, potem okno się zamyka, pojawia się komunikat „Kontrahent zarchiwizowany”.
- [ ] Kontrahenta nie ma już na liście.
- [ ] Po kroku 3 wyszukiwarka nie pokazuje tego kontrahenta.

> Kod: `app/actions/clients.ts` · `archiveClient`; wyszukiwarka pomija `is_archived` (migracja 057)

### KON-041 · Rezygnacja z archiwizacji

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Najedź na wiersz „Bez NIP”, kliknij „⋯” → „Archiwizuj”.
2. W oknie kliknij „Anuluj”.
3. Powtórz krok 1 i zamknij okno klawiszem Esc.

**Co powinno się stać**

- [ ] Po krokach 2 i 3 okno się zamyka, a „Bez NIP” zostaje na liście.

> Kod: `clients-content.tsx` · `archiveTarget`

### KON-042 · Zlecenie zarchiwizowanego kontrahenta

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Zanim zaczniesz:** potrzebujesz zlecenia przypisanego do kontrahenta, którego zarchiwizujesz. Utwórz kontrahenta `Archiwum-zlecenie <data>`, potem w „Zlecenia” utwórz zlecenie i wybierz tego kontrahenta. Zarchiwizuj kontrahenta jak w KON-040.

**Co zrobić**

1. Otwórz „Zlecenia” i znajdź utworzone zlecenie.
2. Otwórz to zlecenie.

**Co powinno się stać**

- [ ] Na liście zleceń i w samym zleceniu nadal widać nazwę zarchiwizowanego kontrahenta.

> Kod: `archiveClient` ustawia tylko `is_archived`; powiązanie zostaje

---

## Limity planu

### KON-050 · Limit kontrahentów w planie Starter

**Ważność:** ważny · **Zaloguj się jako:** Właściciel Beta Obróbka (`starter`)

**Zanim zaczniesz:** Beta Obróbka ma 9 kontrahentów, plan Starter pozwala na 10.

**Co zrobić**

1. Dodaj kontrahenta `Dziesiąty <data>`.
2. Dodaj kontrahenta `Jedenasty <data>`.

**Co powinno się stać**

- [ ] Dziesiąty zapisuje się normalnie.
- [ ] Jedenastego aplikacja **nie** pozwala dodać i informuje, że limit planu Starter to 10 kontrahentów, z możliwością zmiany planu.

> Kod: brak egzekucji `clientsTotal` w `createClient_`. Rozbieżność `R-01` w `index.md`.

---

## Uprawnienia

### KON-060 · Rola Podgląd — tylko przeglądanie

**Ważność:** ważny · **Zaloguj się jako:** Podgląd (Alfa CNC)

**Co zrobić**

1. Otwórz „Kontrahenci”.
2. Najedź na przycisk „Dodaj kontrahenta”.
3. Najedź na wiersz Stalmetu, kliknij „⋯”.
4. Zamknij menu i otwórz kartę Stalmetu. Spróbuj kliknąć w pole „Miejscowość”.
5. Najedź na przycisk „Zapisz kontrahenta”.

**Co powinno się stać**

- [ ] Lista wygląda tak samo jak u Pracownika.
- [ ] „Dodaj kontrahenta” jest wyszarzony; po najechaniu pojawia się dymek „Twoja rola pozwala tylko przeglądać. O uprawnienia do edycji poproś właściciela firmy.”
- [ ] W menu „⋯” pozycja „Archiwizuj” jest wyszarzona z dopiskiem „Brak uprawnień”.
- [ ] Na karcie przy nazwie jest plakietka „Tylko podgląd”.
- [ ] Pól nie da się edytować, przycisk „Synchronizuj dane z GUS” nie działa.
- [ ] „Zapisz kontrahenta” jest wyszarzony, z tym samym dymkiem co w punkcie 2.
- [ ] „Anuluj” i „←” działają i wracają na listę.

> Kod: `components/write-access.tsx` · `WriteGate`, `ReadOnlyBadge`, `READ_ONLY_FIELDSET`; uprawnienie `projects.write`

### KON-061 · Rola bez dostępu do kontrahentów

**Ważność:** ważny · **Zaloguj się jako:** Magazynier (Alfa CNC)

**Zanim zaczniesz:** zaloguj się jako Pracownik, otwórz kartę Stalmetu i skopiuj adres strony z paska przeglądarki. Wyloguj się.

**Co zrobić**

1. Zaloguj się jako Magazynier.
2. Spójrz na menu po lewej.
3. Wpisz w pasek adresu adres aplikacji z końcówką `/clients` i naciśnij Enter.
4. Wklej w pasek adresu skopiowany adres karty Stalmetu.

**Co powinno się stać**

- [ ] W menu po lewej **nie ma** pozycji „Kontrahenci” (ani „Wyceny”).
- [ ] Po kroku 3 widać ekran z kłódką „Brak dostępu do tego modułu” i tekstem „Twoja rola nie obejmuje tego modułu. Poproś właściciela firmy, jeśli go potrzebujesz.”
- [ ] Po kroku 4 widać ten sam ekran „Brak dostępu do tego modułu” — nie dane Stalmetu.

> Kod: `components/module-guard.tsx` · `moduleBlockScreen`; karta `clients/[clientId]/page.tsx` nie woła strażnika i daje 404 — rozbieżność `R-07`

### KON-062 · Firma zawieszona

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC) → przełącz na Gamma Metal

**Co zrobić**

1. Kliknij nazwę firmy w lewym górnym rogu i wybierz „Gamma Metal”.
2. Otwórz „Kontrahenci”.
3. Najedź na „Dodaj kontrahenta”.
4. Otwórz dowolnego kontrahenta.

**Co powinno się stać**

- [ ] Na górze strony widać pasek „Twoja firma jest zawieszona — możesz wszystko przeglądać, ale zapis jest zablokowany.”
- [ ] Lista kontrahentów się wyświetla.
- [ ] „Dodaj kontrahenta” jest wyszarzony, dymek: „Firma jest zawieszona — dane można teraz tylko przeglądać.”
- [ ] Na karcie kontrahenta pól nie da się edytować, „Zapisz kontrahenta” jest wyszarzony.

> Kod: `lib/write-access.ts` · blokada `suspended`

---

## Przypadki brzegowe

### KON-070 · Bardzo długa nazwa

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Na liście znajdź kontrahenta, którego nazwa zaczyna się od „Przedsiębiorstwo Produkcyjno-Handlowo-Usługowe”.
2. Otwórz jego kartę.

**Co powinno się stać**

- [ ] Na liście nazwa jest ucięta wielokropkiem „…” i nie rozpycha kolumn.
- [ ] Na górnym pasku karty nazwa jest ucięta wielokropkiem, a przyciski „Anuluj” i „Zapisz kontrahenta” są w całości widoczne.
- [ ] W polu „Nazwa firmy” da się przewinąć i przeczytać całą nazwę.

> Kod: `clients-list.tsx`, `client-form.tsx` — `truncate`

### KON-071 · Polskie znaki i emoji

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Dodaj kontrahenta o nazwie: `Zażółć gęślą jaźń 🔧 <data>`
2. W notatkach wpisz: `Cudzysłów „test” i apostrof ’test’ & <b>znaczniki</b>`
3. Zapisz, otwórz ponownie.

**Co powinno się stać**

- [ ] Nazwa i notatka wyświetlają się dokładnie tak, jak wpisane — łącznie z emoji i znakami `<b>`, które są widoczne jako tekst, a nie pogrubienie.
- [ ] Na liście kółko z inicjałem pokazuje „Z”.

> Kod: React escapuje tekst; `Avatar` · `AvatarFallback`

### KON-072 · Lista na telefonie

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC) · **Ekran:** telefon

**Co zrobić**

1. Otwórz „Kontrahenci” na telefonie.
2. Przesuń tabelę palcem w bok.
3. Otwórz okno „Dodaj kontrahenta”.

**Co powinno się stać**

- [ ] Tabelę da się przewinąć w bok i zobaczyć wszystkie kolumny.
- [ ] Okno „Nowy kontrahent” mieści się na ekranie albo da się je przewinąć do przycisku „Zapisz kontrahenta”.

> Kod: `clients-list.tsx` — `min-w-[1080px]` + `overflow-x-auto`

### KON-073 · Nieistniejący kontrahent

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz kartę dowolnego kontrahenta.
2. W pasku adresu zmień ostatni znak adresu na inny (np. `a` na `b`) i naciśnij Enter.

**Co powinno się stać**

- [ ] Widać stronę z informacją, że strony nie znaleziono („404”).

> Kod: `clients/[clientId]/page.tsx` · `notFound()`

### KON-074 · Kontrahent innej firmy

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC), potem Właściciel Beta (`starter`)

**Co zrobić**

1. Jako Pracownik Alfa otwórz kartę Stalmetu i skopiuj adres z paska przeglądarki. Wyloguj się.
2. Zaloguj się jako `starter` i wklej skopiowany adres.

**Co powinno się stać**

- [ ] Widać stronę „404” — nie dane Stalmetu.

> Kod: `getClient` — `.eq('company_id', companyId)` + RLS

### KON-075 · Wersja angielska

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC) · **Język:** angielski

**Co zrobić**

1. Przełącz język na angielski (patrz NAV-020).
2. Przejdź KON-001, KON-010 i KON-031.

**Co powinno się stać**

- [ ] Wszystkie napisy, przyciski, komunikaty i błędy są po angielsku.
- [ ] Nigdzie nie widać nazw technicznych w rodzaju `clients.addClient`.

> Kod: `messages/en.json` · `clients`
