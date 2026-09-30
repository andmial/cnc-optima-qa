# Testy manualne — materiały zespołu

Część repo dla zespołu, nie dla testera: jak powstają scenariusze, dane
testowe, środowisko i rozbieżności wykryte przy czytaniu kodu. Tester nie
musi tego czytać.

Scenariusze opisują aplikację z repo `adrian-potepa/cnc-optima`: ekrany
w `app/[locale]/`, akcje w `app/actions/`, reguły dostępu w
`lib/permissions.ts`, `lib/modules.ts`, `lib/write-access.ts`. Ścieżki w
liniach `> Kod:` odnoszą się do tamtego repo.

## Po co to jest

Tester nie ma dostępu do kodu, więc scenariusz musi zawierać wszystko:
warunki startowe, kroki opisane etykietami z ekranu i sprawdzalne kryteria.
Scenariusze powstają z kodu, nie z wyobraźni — każda gałąź
`return { error }` w server action, każda reguła Zod i każde sprawdzenie
uprawnień to osobny przypadek. Linia `> Kod:` pod scenariuszem wskazuje
źródło w kodzie; tester ją pomija (README, punkt 6).

Scenariusze żyją tutaj, a nie w repo aplikacji — decyzja z 2026-09-30.
Skutek: nic nie wymusza ich aktualizacji przy zmianie kodu. Zastępstwem jest
`node scripts/qa.mjs zmiany` przed każdym przebiegiem (sekcja „Utrzymanie”).

## Stan pokrycia

Stan na 2026-09-30, `main` @ `2f1ff13`. Razem 203 scenariusze, z tego 37 krytycznych.

| Moduł                            | Plik                                            | Prefiks | Stan                                                |
| -------------------------------- | ----------------------------------------------- | ------- | --------------------------------------------------- |
| Powłoka, nawigacja, wyszukiwanie | [nawigacja.md](../scenariusze/nawigacja.md)     | `NAV`   | gotowe · 37                                         |
| Kontrahenci                      | [kontrahenci.md](../scenariusze/kontrahenci.md) | `KON`   | gotowe · 42                                         |
| Ustawienia: modal, profil, firma | [ustawienia.md](../scenariusze/ustawienia.md)   | `UST`   | gotowe · 34                                         |
| Zespół i zaproszenia             | [zespol.md](../scenariusze/zespol.md)           | `ZES`   | gotowe · 34                                         |
| Role i uprawnienia               | [role.md](../scenariusze/role.md)               | `ROL`   | gotowe · 18                                         |
| Plany, płatności, faktury        | [rozliczenia.md](../scenariusze/rozliczenia.md) | `ROZ`   | gotowe · 21                                         |
| Strefa admina                    | [admin.md](../scenariusze/admin.md)             | `ADM`   | gotowe · 17                                         |
| Logowanie, rejestracja, hasło    | `autoryzacja.md`                                | `AUT`   | czeka na merge adrian-potepa/cnc-optima#115         |
| Wybór i zakładanie firmy         | `firmy.md`                                      | `FIR`   | czeka na merge adrian-potepa/cnc-optima#115         |
| Wyceny, PDF                      | `wyceny.md`                                     | `WYC`   | czeka na merge adrian-potepa/cnc-optima#128         |
| Zlecenia, projekty               | `zlecenia.md`                                   | `ZLE`   | czeka na merge adrian-potepa/cnc-optima#128         |
| Powiadomienia                    | —                                               | —       | czeka na adrian-potepa/cnc-optima#101, brak na main |

Moduły czekające na merge nie są pisane teraz, bo PR adrian-potepa/cnc-optima#115 zmienia logowanie,
rejestrację i wybór firmy, a PR adrian-potepa/cnc-optima#128 — wyceny i zlecenia. Scenariusze pisane
dziś trzeba by przepisać po merge'u.

## Dla kogo są pliki

Tester jest laikiem — nie zna kodu ani słownictwa programistów. Dlatego:

| Plik lub katalog          | Czytelnik | Po co                                             |
| ------------------------- | --------- | ------------------------------------------------- |
| `README.md`               | tester    | instrukcja: konta, słowniczek, zgłaszanie, wyniki |
| `scenariusze/`            | tester    | scenariusze; linie `> Kod:` są dla zespołu        |
| `pliki-testowe/`          | tester    | zdjęcia, logo, za duży plik, zły format           |
| `.github/ISSUE_TEMPLATE/` | tester    | formularze „Błąd”, „Uwaga”, „Przebieg testów”     |
| `zespol/` (ten plik)      | zespół    | zasady, dane testowe, środowisko, rozbieżności    |
| `scripts/qa.mjs`          | zespół    | lista przebiegu, spis, kontrola, wykrywanie zmian |

W `scenariusze/` obowiązuje język ekranu: żadnych słów „RLS”, „toast”,
„rola `member`”, „deployment”, „P0”. Zamiast nich to, co tester widzi:
„komunikat w prawym dolnym rogu”, „Pracownik”, „krytyczny”.

## Format scenariusza

```markdown
### KON-010 · Dodanie kontrahenta z samą nazwą

**Ważność:** krytyczny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Zanim zaczniesz:** otwórz „Kontrahenci” w menu po lewej.

**Co zrobić**

1. Kliknij przycisk „Dodaj kontrahenta” (prawy górny róg listy).
2. W polu „Nazwa firmy” wpisz: `Test <data>`
3. Kliknij „Zapisz kontrahenta”.

**Co powinno się stać**

- [ ] Okno „Nowy kontrahent” się zamyka.
- [ ] …

> Kod: `app/actions/clients.ts` · `createClient_`
```

- **ID** jest stałe. Usunięty scenariusz zostawia lukę w numeracji, nie
  przesuwa pozostałych — zgłoszenia i przyszłe testy E2E odwołują się do ID.
- **Etykiety w cudzysłowie** są dosłownie z `messages/pl.json`. Zmiana tekstu
  w aplikacji wymaga zmiany scenariusza.
- **„Co powinno się stać”** to lista do odhaczenia, każdy punkt sprawdzalny
  okiem. Scenariusz przechodzi, gdy przejdą wszystkie punkty.
- **Wartości do wpisania** stoją w `bloku kodu` — tester przepisuje je
  dosłownie. `<data>` znaczy: wpisz bieżącą datę i godzinę, np.
  `30.09 14:05`, żeby rekord był unikalny między przebiegami.
- **„Zaloguj się jako”** podaje nazwę konta z tabeli w README testera — tam
  są adresy i hasła.

## Ważność i przebiegi

| Ważność   | Znaczenie                                   | Przebieg                           |
| --------- | ------------------------------------------- | ---------------------------------- |
| krytyczny | Ścieżka krytyczna. Błąd blokuje wydanie.    | Szybki — przed każdym wydaniem     |
| ważny     | Główne ścieżki, walidacje, uprawnienia.     | Regresja — przed większym wydaniem |
| dodatkowy | Przypadki brzegowe, teksty, układ, telefon. | Pełny — raz na cykl                |

Przebieg zakresu PR: tylko pliki modułów, których dotyka PR, wszystkie ważności.

## Osie testu

Scenariusz domyślnie idzie w konfiguracji bazowej. Osie poniżej przechodzi się
osobno, na wybranych scenariuszach.

| Oś           | Wartość bazowa       | Warianty                                                                         | Kiedy                              |
| ------------ | -------------------- | -------------------------------------------------------------------------------- | ---------------------------------- |
| Rola         | podana w scenariuszu | cała macierz ról — [Macierz ról](#macierz-ról)                                   | scenariusze z sekcji „Uprawnienia” |
| Język        | polski               | angielski                                                                        | krytyczne raz na regresję          |
| Ekran        | desktop 1440×900     | laptop 1280×800; telefon 390×844 — dopiero po merge adrian-potepa/cnc-optima#100 | krytyczne raz na regresję          |
| Przeglądarka | Chrome               | Safari (macOS), Safari (iOS), Firefox                                            | krytyczne raz na regresję          |
| Dane         | typowe               | puste, bardzo długie teksty, polskie znaki, emoji                                | scenariusze dodatkowe              |

## Macierz ról

Role wbudowane i to, co z nich wynika w aplikacji. Źródło:
`SYSTEM_ROLE_PERMISSIONS` w `lib/permissions.ts`.

| Uprawnienie                 | Właściciel | Administrator | Pracownik | Podgląd | Magazynier (rola własna) |
| --------------------------- | :--------: | :-----------: | :-------: | :-----: | :----------------------: |
| Widzi wyceny                |     ✓      |       ✓       |     ✓     |    ✓    |            —             |
| Widzi zlecenia              |     ✓      |       ✓       |     ✓     |    ✓    |            ✓             |
| Widzi kontrahentów          |     ✓      |       ✓       |     ✓     |    ✓    |            —             |
| Widzi projekty              |     ✓      |       ✓       |     ✓     |    ✓    |            ✓             |
| Edycja danych produkcyjnych |     ✓      |       ✓       |     ✓     |    —    |            —             |
| Ustawienia organizacji      |     ✓      |       ✓       |     —     |    —    |            —             |
| Rozliczenia                 |     ✓      |       ✓       |     —     |    —    |            —             |
| Zarządzanie zespołem        |     ✓      |       ✓       |     —     |    —    |            —             |
| Tworzenie i edycja ról      |     ✓      |       —       |     —     |    —    |            —             |
| Nadanie roli Administrator  |     ✓      |       —       |     —     |    —    |            —             |

Brak uprawnienia do odczytu modułu usuwa go z nawigacji. Brak uprawnienia do
zapisu zostawia moduł, ale wyłącza przyciski z podpowiedzią „Brak uprawnień”.

## Środowisko

> **Nie testuj na produkcji.** Baza produkcyjna to ten sam projekt Supabase,
> na którym dziś pracuje development, i zawiera migracje z niezmergowanych
> branchy (adrian-potepa/cnc-optima#101, adrian-potepa/cnc-optima#115, adrian-potepa/cnc-optima#128). Zachowanie produkcji różni się od `main`.

| Element          | Wartość na stagingu                                                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Adres aplikacji  | _do uzupełnienia po konfiguracji Vercela_                                                                                               |
| Baza             | osobny projekt Supabase, tylko migracje z `main`                                                                                        |
| Płatności        | Stripe w trybie testowym                                                                                                                |
| Karty testowe    | `4242 4242 4242 4242` — sukces · `4000 0000 0000 0002` — odmowa · `4000 0025 0000 3155` — 3D Secure; dowolna przyszła data, dowolny CVC |
| E-mail aplikacji | Resend — zaproszenia do zespołu                                                                                                         |
| E-mail Supabase  | własny SMTP — potwierdzenie konta, reset hasła                                                                                          |
| GUS              | serwer testowy BIR (`apitest-regon.stat.gov.pl`), dane testowe                                                                          |
| Webhook Stripe   | endpoint testowy skierowany na staging — bez niego zakup planu nie zmienia planu w aplikacji                                            |
| Resend           | zweryfikowana domena nadawcy albo świadomie wyłączona wysyłka (wpis w README testera)                                                   |

Supabase na nowym projekcie bez własnego SMTP wysyła maile tylko do członków
zespołu projektu i z niskim limitem na godzinę — rejestracja i reset hasła
testera nie przejdą. Staging potrzebuje SMTP przed pierwszym przebiegiem.

## Dane testowe

Specyfikacja seeda. Hasła i adresy trafiają do README repo testera, nigdy tutaj.

### Firmy

| Firma            | Plan                           | Stan           | Dane                                                                                                                                                                                     |
| ---------------- | ------------------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Alfa CNC**     | Business, subskrypcja Stripe   | aktywna        | ≥ 15 kontrahentów (w tym: nazwa 200 znaków, bez NIP, z polskimi znakami, 1 zarchiwizowany), wyceny, zlecenia, projekty, rola własna „Magazynier” (zlecenia + projekty, bez zapisu), logo |
| **Beta Obróbka** | Starter                        | aktywna        | 9 kontrahentów, 3 wyceny w bieżącym miesiącu, brak logo                                                                                                                                  |
| **Gamma Metal**  | Pro, subskrypcja Stripe        | **zawieszona** | kilku kontrahentów, 1 wycena                                                                                                                                                             |
| **Delta Frez**   | Enterprise, rozliczenie ręczne | aktywna        | subskrypcja indywidualna ustawiona z panelu admina, **0 kontrahentów**, 0 wycen                                                                                                          |

### Konta

| Konto            | Rola i firmy                                                       | Do czego                                               |
| ---------------- | ------------------------------------------------------------------ | ------------------------------------------------------ |
| `wlasciciel`     | Właściciel Alfa CNC · Administrator w Gamma Metal                  | pełne uprawnienia, przełączanie firm, firma zawieszona |
| `admin`          | Administrator Alfa CNC                                             | granice administratora                                 |
| `pracownik`      | Pracownik Alfa CNC                                                 | praca na danych bez ustawień                           |
| `podglad`        | Podgląd Alfa CNC                                                   | tryb tylko do odczytu                                  |
| `magazynier`     | Magazynier (rola własna) Alfa CNC: zlecenia + projekty, bez zapisu | ukryte moduły, rola własna                             |
| `starter`        | Właściciel Beta Obróbka                                            | plan darmowy, limity                                   |
| `enterprise`     | Właściciel Delta Frez                                              | puste listy, rozliczenie ręczne                        |
| `bezfirmy`       | brak firmy, brak zaproszeń                                         | konto bez obszaru roboczego                            |
| `zaproszony`     | brak firmy, oczekujące zaproszenie do Alfa CNC jako Pracownik      | przyjęcie zaproszenia z listy                          |
| `google`         | Pracownik Alfa CNC, logowanie wyłącznie przez Google               | konto bez hasła                                        |
| `support`        | admin platformy, rola `support`                                    | strefa admina bez uprawnień superadmina                |
| `superadmin`     | admin platformy, rola `superadmin`                                 | pełna strefa admina                                    |
| skrzynka testera | adresy `tester+<cokolwiek>@<domena>`                               | nowe zaproszenia, rejestracje                          |

### Rekordy, do których odwołują się scenariusze

| Firma    | Rekord                                       | Cechy                                                                     |
| -------- | -------------------------------------------- | ------------------------------------------------------------------------- |
| Alfa CNC | kontrahent „Stalmet Sp. z o.o.”              | komplet danych: NIP, adres, osoba kontaktowa, e-mail, telefon; 2 zlecenia |
| Alfa CNC | kontrahent „Żuraw i Syn — Obróbka Metali”    | polskie znaki, miasto „Łódź”, bez zleceń                                  |
| Alfa CNC | kontrahent „Bez NIP”                         | tylko nazwa                                                               |
| Alfa CNC | kontrahent z nazwą 200 znaków                | zaczyna się od „Przedsiębiorstwo Produkcyjno-Handlowo-Usługowe”           |
| Alfa CNC | kontrahent „Archiwum Test”                   | zarchiwizowany — nie może być widoczny na liście                          |
| Alfa CNC | zaproszenie oczekujące na `zaproszony`       | rola Pracownik, ważne                                                     |
| Alfa CNC | zaproszenie wygasłe na `wygasle@<domena>`    | data ważności w przeszłości                                               |
| Delta    | zaproszenie oczekujące na `pracownik`        | rola Podgląd — przyjęcie z menu firm, gdy ma się już firmę                |
| Beta     | 9 kontrahentów, 3 wyceny w bieżącym miesiącu | na granicy limitów planu Starter                                          |

Seed odtwarza ten stan przed każdym przebiegiem. Scenariusz, który zmienia
dane wspólne (usuwa członka, zawiesza firmę, zmienia plan), ma w warunkach
wstępnych, jak przywrócić stan, albo działa na rekordzie tworzonym w
pierwszym kroku.

## Zgłaszanie błędów

Tester zakłada issue w `andmial/cnc-optima-qa` z szablonu „Błąd”: ID
scenariusza, numer kryterium, które nie przeszło, konto, przeglądarka,
oczekiwany i faktyczny wynik, zrzut ekranu. Pełna instrukcja dla testera:
[README](../README.md).

Potwierdzony błąd trafia do `adrian-potepa/cnc-optima` jako **nowe** issue z
linkiem do zgłoszenia testera; zgłoszenie testera dostaje komentarz z numerem
i zostaje zamknięte. `gh issue transfer` nie wchodzi w grę — działa tylko
między repozytoriami jednego właściciela, a te dwa mają różnych. Zrzuty
ekranu z prywatnego repo QA widzi tylko ktoś z dostępem do niego — przy
przepisywaniu wgraj je ponownie.

## Utrzymanie

- **Przed każdym przebiegiem:** `node scripts/qa.mjs zmiany <ścieżka-do-cnc-optima>`.
  Wypisuje scenariusze, których pliki z linii `> Kod:` zmieniły się w
  `origin/main` od commita bazowego (ten z „Stan pokrycia”), oraz scenariusze
  cytujące teksty z `messages/pl.json`, które się zmieniły. Po poprawkach
  wpisz nowy commit bazowy w „Stan pokrycia”.
- Nowy ekran albo zachowanie bez linii `> Kod:` w żadnym scenariuszu nie
  zostanie wykryte — przejrzyj też listę zmergowanych PR od commita bazowego.
- `node scripts/qa.mjs lint` — duplikaty ID, odwołania do nieistniejących
  scenariuszy, słownictwo techniczne poza liniami `> Kod:`.
- `node scripts/qa.mjs toc` — odświeża `scenariusze/README.md` po zmianie
  liczby scenariuszy.
- Lista do zgłoszenia „Przebieg testów”:
  `node scripts/qa.mjs checklist krytyczny` (albo `ważny`, `dodatkowy`,
  kilka naraz, bez argumentu — wszystkie).
- Pola `_uzupełni zespół_` w `README.md` (adres, konta, hasła, NIP-y GUS,
  link do wygasłego zaproszenia) uzupełnia się po konfiguracji stagingu.
  Repo jest prywatne, a konta istnieją tylko na stagingu — nigdy nie wpisuj
  tu danych logowania z produkcji.
- `pliki-testowe/` wygenerowano z grafik `public/project-avatars/` aplikacji;
  `za-duze-3mb.jpg` to poprawny JPEG dopełniony zerami do 3 MB.
- Przebieg testów jest przypięty do konkretnego deploymentu Vercela
  (niezmienny URL w issue „Przebieg testów”), nie do gałęzi.

## Rozbieżności wykryte przy pisaniu

Miejsca, w których kod odbiega od tego, czego użytkownik może oczekiwać.
Scenariusze opisują zachowanie **oczekiwane**, więc te punkty wyjdą w testach
jako błędy — decyzja przed pierwszym przebiegiem oszczędzi zgłoszeń.

| ID     | Co                                                                                                                                                                                                                                                     | Gdzie                                                                | Scenariusz           |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- | -------------------- |
| `R-01` | Limity planu Starter (3 wyceny/mies., 10 kontrahentów) są wyświetlane w „Billing i zużycie”, ale nic ich nie egzekwuje. Egzekwowany jest tylko limit miejsc w zespole.                                                                                 | `lib/plans.ts`, `createClient_`, tworzenie wyceny                    | `ROZ-020`, `KON-050` |
| `R-02` | Zmiana planu płatnego na inny płatny idzie przez nowy Checkout. Kod nie anuluje poprzedniej subskrypcji — możliwe dwie aktywne subskrypcje i podwójne obciążenie. Zgłoszone: adrian-potepa/cnc-optima#131.                                             | `createCheckoutSession`, webhook Stripe                              | `ROZ-042`            |
| `R-03` | Na planie płatnym przycisk „Zmień na Starter” nic nie robi — `handleUpgrade` kończy się bez akcji.                                                                                                                                                     | `upgrade-plans.tsx` · `PlanCta`                                      | `ROZ-043`            |
| `R-04` | Okno „Nowy kontrahent” nie sprawdza formatu NIP, kodu pocztowego, telefonu ani e-maila; formularz edycji sprawdza. Kontrahent zapisany z błędnym e-mailem blokuje potem zapis edycji.                                                                  | `create-client-dialog.tsx` vs `clients/lib/types.ts`                 | `KON-013`, `KON-014` |
| `R-05` | Wylogowany użytkownik z linkiem do rekordu po zalogowaniu ląduje na liście wycen, nie na rekordzie — przekierowanie gubi adres.                                                                                                                        | `proxy.ts`                                                           | `NAV-061`            |
| `R-06` | Paleta komend mówi „Zamówienia” i „Nowe zamówienie”, nawigacja — „Zlecenia”. W grupie „Przejdź do” brak „Kontrahenci”.                                                                                                                                 | `messages/*.json` · `commandPalette`, `command-palette-provider.tsx` | `NAV-047`            |
| `R-07` | Karta kontrahenta otwarta z adresu przez rolę bez dostępu do kontrahentów daje 404; lista w tej samej sytuacji pokazuje „Brak dostępu do tego modułu”.                                                                                                 | `clients/[clientId]/page.tsx`                                        | `KON-061`            |
| `R-08` | Po „Dołącz do firmy” z linku zaproszenia osoba, która ma już firmę, ląduje w swojej dotychczasowej firmie, nie w tej, do której dołączyła. Świadome w migracji 059, do potwierdzenia jako UX.                                                          | `accept-invitation.tsx`, migracja 059                                | `ZES-036`            |
| `R-09` | Teksty: „Ustawienia predefinowane” (literówka), „Billingi i zużycie” w menu vs „Billing i zużycie” w tytule, „Ulepsz pakiet” vs „Ulepsz plan”.                                                                                                         | `messages/pl.json`                                                   | `UST-003`            |
| `R-10` | Po płatności Stripe wraca na `?checkout=success`, po anulowaniu na `?checkout=canceled` — żaden ekran nie czyta tych parametrów, brak komunikatu.                                                                                                      | `lib/stripe.ts`                                                      | `ROZ-040`, `ROZ-041` |
| `R-11` | Nazwy ról wbudowanych w menu firm, w zaproszeniach i w mailu pochodzą z bazy po polsku — w wersji angielskiej widać „Właściciel”, „Pracownik”. Lista zespołu tłumaczy je poprawnie.                                                                    | `workspaces.ts` · `roleName`, migracja 048                           | `NAV-070`            |
| `R-12` | Zespół w firmie zawieszonej: przyciski wyglądają na aktywne (strona nie korzysta z blokady zapisu), zaproszenie kończy się ogólnym „Nie udało się wysłać zaproszenia”. Przekazanie własności prawdopodobnie przechodzi — RPC nie sprawdza zawieszenia. | `members-content.tsx`, migracja 066                                  | `ZES-090`            |
| `R-13` | Zmiana nazwy roli na istniejącą daje ogólny „Nie udało się zapisać roli”, a tworzenie — „Rola o tej nazwie już istnieje.”                                                                                                                              | `app/actions/roles.ts` · `updateRole`                                | `ROL-012`            |
| `R-14` | Firma bez płatnego planu: „Zmień metodę płatności” kończy się komunikatem „Brak konta rozliczeniowego” zamiast wyjaśnienia.                                                                                                                            | `createBillingPortalSession`                                         | `ROZ-023`            |

## Znane ograniczenia

- Scenariusze nie obejmują jeszcze modułów czekających na merge — patrz
  „Stan pokrycia”.
- NIP-y do testów GUS trzeba dobrać z danych testowego serwera BIR; lista
  trafi do README testera po konfiguracji stagingu.
- Powiadomienia e-mail o przypomnieniach (adrian-potepa/cnc-optima#101) nie istnieją na `main`.
  Produkcja ma aktywne zadania pg_cron z tego brancha — staging ich nie ma.
- Na `main` nie ma wersji na telefon — PR adrian-potepa/cnc-optima#100 (responsywna powłoka) jest
  otwarty. Scenariusze z osią „telefon” tester pomija do merge'u.
- Wydajność i bezpieczeństwo nie są celem testów manualnych. Scenariusze
  sprawdzają granice uprawnień z poziomu UI; próby obejścia RLS to osobny
  przegląd.
