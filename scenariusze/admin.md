# Strefa admina

Panel dla zespołu CNC Optima, nie dla klientów. Pokazuje wszystkie firmy
i konta na platformie, pozwala zawiesić firmę, zajrzeć do niej „oczami
klienta” (tryb podglądu), poprawić dane i ustawić umowę indywidualną.
Każde działanie wymaga podania powodu i trafia do logu.

Są dwa rodzaje administratorów: **support** (pomoc techniczna) i
**superadmin** (pełne uprawnienia).

**Gdzie to jest:** menu po lewej → „Strefa admina” (widoczna tylko dla
administratorów platformy).

---

## Dostęp

### ADM-001 · Wejście do strefy admina

**Ważność:** krytyczny · **Zaloguj się jako:** Superadmin

**Co zrobić**

1. Kliknij „Strefa admina” w menu po lewej.
2. Przejrzyj menu strefy.

**Co powinno się stać**

- [ ] Otwiera się „Przegląd” z podtytułem „Platforma w skrócie”.
- [ ] Menu strefy ma: „Przegląd”, „Firmy”, „Użytkownicy”, „Rozliczenia”, „Log”.
- [ ] Widać, kto jest zalogowany („Zalogowano jako”), i link „Wróć do aplikacji”.

> Kod: `app/[locale]/admin/layout.tsx`, `components/admin/admin-nav.tsx`

### ADM-002 · Zwykły użytkownik nie wchodzi do strefy

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Dopisz do adresu aplikacji `/admin`, potem `/admin/users`, potem `/admin/audit`.

**Co powinno się stać**

- [ ] Za każdym razem widać stronę „404”, żadnych danych panelu.

> Kod: `admin/layout.tsx` — `notFound()`

---

## Przegląd

### ADM-010 · Liczby na przeglądzie

**Ważność:** ważny · **Zaloguj się jako:** Superadmin

**Co zrobić**

1. Otwórz „Przegląd”.

**Co powinno się stać**

- [ ] Kafelki: „Firmy”, „Aktywne”, „Użytkownicy”, „MRR”, „Wyceny”, „Zlecenia” z liczbami.
- [ ] „Firmy” to co najmniej 4 (Alfa, Beta, Gamma, Delta), „Aktywne” jest o co najmniej 1 mniej (Gamma zawieszona).
- [ ] Sekcja „Wymaga uwagi” pokazuje Gammę z opisem „Zawieszona — obszar roboczy tylko do odczytu”.
- [ ] Sekcja „Ostatnie działania administratorów” ma link „Zobacz wszystkie”, który otwiera „Log”.

> Kod: `lib/admin/overview.ts`, `lib/admin/signals.ts`

---

## Firmy

### ADM-020 · Lista firm, szukanie i filtry

**Ważność:** ważny · **Zaloguj się jako:** Support

**Co zrobić**

1. Otwórz „Firmy”.
2. Wpisz w „Szukaj po nazwie…”: `alfa`
3. Wyczyść. Ustaw filtr pakietu na „Starter”.
4. Wyczyść. Ustaw filtr statusu na „Nieaktywna”.
5. Ustaw filtry, których nic nie spełnia (np. „Enterprise” + „Nieaktywna”).

**Co powinno się stać**

- [ ] Tabela ma kolumny: „Nazwa”, „Pakiet”, „Status”, „Użytkownicy”, „Wyceny”, „Zlecenia”, „Projekty”, „Kontrahenci”, „Utworzono”, „MRR”.
- [ ] Krok 2: tylko Alfa CNC. Krok 3: tylko firmy na Starterze (m.in. Beta). Krok 4: Gamma ze statusem „Nieaktywna”.
- [ ] Krok 5: „Żadna firma nie pasuje do tych filtrów.”
- [ ] Pod tabelą jest licznik „1–N z M” i przyciski „Poprzednia”/„Następna”.

> Kod: `lib/admin/companies.ts` · `listCompanies`; `company-filters.tsx`, `pager.tsx`

### ADM-021 · Karta firmy

**Ważność:** krytyczny · **Zaloguj się jako:** Support

**Co zrobić**

1. Otwórz „Firmy” → „Alfa CNC”.

**Co powinno się stać**

- [ ] Są sekcje: „Dane firmy” (NIP, miasto, e-mail, telefon, strona WWW, waluta, wdrożenie, właściciel), „Subskrypcja”, „Członkowie”, „Limity pakietu”, „Historia subskrypcji”, „Akcje administratora”.
- [ ] W „Członkowie” są wszystkie osoby z Alfy.
- [ ] Jest informacja „Dane klientów końcowych są liczone, nigdy wypisywane.” — nigdzie nie widać nazw kontrahentów Alfy.
- [ ] Link „Wróć do firm” wraca do listy.

> Kod: `admin/companies/[companyId]/page.tsx`, `lib/admin/companies.ts` · `getCompanyDetail`

### ADM-022 · Limity pakietu firmy

**Ważność:** dodatkowy · **Zaloguj się jako:** Support

**Co zrobić**

1. Otwórz kartę „Beta Obróbka”, sekcja „Limity pakietu”.

**Co powinno się stać**

- [ ] Widać paski: „Wyceny w tym miesiącu” 3/3, „Kontrahenci” 9/10, „Użytkownicy” 1/1.
- [ ] Przy wycenach i użytkownikach jest oznaczenie „Limit osiągnięty”, przy kontrahentach — „Blisko limitu”.
- [ ] Jest dopisek „Zużycie AI nie jest mierzone — nic go jeszcze nie zlicza.”

> Kod: `lib/admin/usage.ts` · `computeUsageMetric`

### ADM-023 · Edycja danych firmy

**Ważność:** ważny · **Zaloguj się jako:** Support

**Co zrobić**

1. Na karcie Alfa CNC kliknij „Edytuj firmę”.
2. Zmień „Miasto” na `Test`. W „Powód” wpisz `krótki`. Spróbuj zapisać.
3. Zmień powód na `Test manualny <data>, prośba klienta`. Zapisz.
4. Przywróć poprzednie miasto tym samym sposobem.

**Co powinno się stać**

- [ ] Po kroku 2 przycisk zapisu jest nieaktywny albo pojawia się „Wymagany powód o długości min. 10 znaków.”
- [ ] Po kroku 3 pojawia się „Zapisano”, miasto na karcie to „Test”.
- [ ] Zmiana jest widoczna też w aplikacji: Właściciel Alfy widzi nowe miasto w „Ustawienia” → „Ogólne”.

> Kod: `app/actions/admin/companies.ts` · `updateCompanyDetails`; `adminReasonSchema` — min. 10 znaków

### ADM-024 · Zawieszenie i przywrócenie firmy

**Ważność:** krytyczny · **Zaloguj się jako:** Support, a w drugiej przeglądarce Właściciel Beta (`starter`)

**Co zrobić**

1. Jako Support na karcie „Beta Obróbka” kliknij „Zawieś firmę”.
2. Wpisz powód `Test manualny <data>`. W polu potwierdzenia wpisz `Beta` (niepełna nazwa). Kliknij „Potwierdź”.
3. Wpisz pełną nazwę `Beta Obróbka`. Kliknij „Potwierdź”.
4. W drugiej przeglądarce jako `starter` odśwież aplikację i spróbuj dodać kontrahenta.
5. Jako Support kliknij „Przywróć firmę”, podaj powód, potwierdź.
6. Jako `starter` odśwież aplikację.

**Co powinno się stać**

- [ ] Po kroku 1 jest wyjaśnienie „Firma zachowuje pełny odczyt swoich danych, ale nie może niczego utworzyć ani zmienić…” i pole „Wpisz Beta Obróbka, aby potwierdzić”.
- [ ] Po kroku 2 pojawia się „Nazwa nie zgadza się. Wpisz ją dokładnie tak, jak powyżej.”
- [ ] Po kroku 3 pojawia się „Firma zawieszona”, status firmy zmienia się na „Nieaktywna”.
- [ ] Po kroku 4 `starter` widzi pasek o zawieszeniu firmy, „Dodaj kontrahenta” jest wyszarzony.
- [ ] Po kroku 5 pojawia się „Firma przywrócona” (bez wpisywania nazwy).
- [ ] Po kroku 6 pasek znika, dodawanie działa.

> Kod: `setCompanyActive` — `confirmName` tylko przy zawieszaniu; migracja 045

---

## Tryb podglądu („Zobacz jako ta firma”)

### ADM-030 · Podgląd tylko do odczytu

**Ważność:** krytyczny · **Zaloguj się jako:** Support

**Co zrobić**

1. Na karcie „Alfa CNC” kliknij „Zobacz jako ta firma”.
2. Przeczytaj wyjaśnienie, wpisz powód `Test manualny <data>` i potwierdź.
3. Otwórz „Kontrahenci”, najedź na „Dodaj kontrahenta”.
4. Otwórz kartę Stalmetu.
5. Kliknij „Wyjdź” na górnym pasku.

**Co powinno się stać**

- [ ] Po kroku 1: „Otwiera aplikację w kontekście tej firmy. Pozostajesz zalogowany jako Ty, a każde działanie nadal jest przypisane Tobie.” Nie ma opcji „Pozwól na zmiany” (to tylko dla superadmina).
- [ ] Po kroku 2 otwiera się aplikacja: „Wyceny” Alfy CNC, u góry pasek „Podgląd jako Alfa CNC” z przyciskiem „Wyjdź”.
- [ ] Po kroku 3 przycisk jest wyszarzony z dymkiem „Podgląd administratora działa tylko do odczytu. Zapis włączysz w panelu administracyjnym.”
- [ ] Po kroku 4 pola są zablokowane.
- [ ] Po kroku 5 wracasz do listy „Firmy” w strefie admina.

> Kod: `enterGhostMode`, `components/admin/ghost-banner.tsx`, `lib/write-access.ts` — `ghost`

### ADM-031 · Podgląd z edycją

**Ważność:** ważny · **Zaloguj się jako:** Superadmin

**Co zrobić**

1. Na karcie „Alfa CNC” kliknij „Zobacz jako ta firma”.
2. Zaznacz „Pozwól na zmiany (tylko superadmin)”. Przeczytaj ostrzeżenie. Podaj powód i potwierdź.
3. Dodaj kontrahenta `Superadmin <data>`.
4. Kliknij „Wyjdź”.
5. Otwórz „Log”.

**Co powinno się stać**

- [ ] Po zaznaczeniu pojawia się ostrzeżenie „Tryb zapisu omija row-level security…”.
- [ ] Pasek na górze mówi „Podgląd Z EDYCJĄ jako Alfa CNC”.
- [ ] Dodanie kontrahenta działa; kontrahent jest w Alfie (sprawdź jako Pracownik Alfy).
- [ ] W „Log” jest wpis o wejściu w tryb podglądu z powodem i wynikiem „ok”.

> Kod: `enterGhostMode` — `canWrite` tylko dla `superadmin`

### ADM-032 · Tryb podglądu nie przenika do zwykłej pracy

**Ważność:** ważny · **Zaloguj się jako:** Superadmin

**Co zrobić**

1. Wejdź w podgląd Alfa CNC (tylko odczyt).
2. Nie klikając „Wyjdź”, wpisz w pasek adresu adres aplikacji `/admin` i wróć do aplikacji linkiem „Wróć do aplikacji”.
3. Kliknij „Wyjdź”. Otwórz „Kontrahenci”.

**Co powinno się stać**

- [ ] Po kroku 2 nadal widać pasek „Podgląd jako Alfa CNC” — tryb jest jawny.
- [ ] Po kroku 3 pasek znika i widzisz własną firmę superadmina (albo stronę „Firmy”, jeśli nie należysz do żadnej).

> Kod: `lib/admin/ghost.ts` · `getGhostSession`

---

## Subskrypcje indywidualne

### ADM-040 · Support nie zmienia subskrypcji

**Ważność:** ważny · **Zaloguj się jako:** Support

**Co zrobić**

1. Otwórz kartę „Delta Frez”, sekcję subskrypcji indywidualnej.

**Co powinno się stać**

- [ ] Widać „Warunki subskrypcji może zmieniać tylko superadmin.” i brak aktywnych przycisków zmiany.

> Kod: `custom-subscription-form.tsx` · `superadminOnlyHint`

### ADM-041 · Ustawienie subskrypcji indywidualnej

**Ważność:** ważny · **Zaloguj się jako:** Superadmin

**Co zrobić**

1. Otwórz kartę „Beta Obróbka”, kliknij „Ustaw subskrypcję indywidualną”.
2. Wypełnij: „Wyceny na miesiąc” `50`, „Kontrahenci łącznie” puste, „Użytkownicy w cenie” `5`, „Uzgodniona kwota miesięczna (PLN)” `500`, notatka `Umowa testowa`, powód `Test manualny <data>`. Zapisz.
3. Jako `starter` otwórz „Billingi i zużycie” i „Członkowie zespołu”.
4. Jako Superadmin kliknij „Przekaż z powrotem do Stripe”, podaj powód, potwierdź.

**Co powinno się stać**

- [ ] Po kroku 2 pojawia się „Zapisano subskrypcję indywidualną”, na karcie „Zarządzana ręcznie — faktury wystawiane poza Stripe”, rozliczenie „Ręcznie”.
- [ ] Po kroku 3 `starter` widzi plan „Enterprise”, wyceny z limitem 50, kontrahentów „bez limitu”, użytkowników z limitem 5; może zapraszać ludzi.
- [ ] Po kroku 4 pojawia się „Przekazano z powrotem do Stripe”, Beta wraca na plan Starter.

> Kod: `setCustomSubscription`, `revertToStripeBilling`

---

## Użytkownicy

### ADM-050 · Lista użytkowników

**Ważność:** ważny · **Zaloguj się jako:** Support

**Co zrobić**

1. Otwórz „Użytkownicy”.
2. Wpisz w „Szukaj po e-mailu lub nazwisku…” fragment adresu Pracownika.
3. Wyczyść. Przełączaj filtr: „Wszyscy”, „Aktywni”, „Zablokowani”.

**Co powinno się stać**

- [ ] Kolumny: „Użytkownik”, „Firmy”, „Ostatnie logowanie”, „Rejestracja”, „Rola”.
- [ ] Administratorzy platformy mają oznaczenie „Platform admin”.
- [ ] Konto, które nigdy się nie logowało, ma „Nigdy nie zalogowany”.
- [ ] Krok 2 zawęża listę do Pracownika.
- [ ] Przy filtrze statusu jest wyjaśnienie „Status wynika z terminu wygaśnięcia blokady…”.

> Kod: `lib/admin/users.ts` · `listUsers`

### ADM-051 · Karta użytkownika i edycja profilu

**Ważność:** ważny · **Zaloguj się jako:** Support

**Co zrobić**

1. Otwórz kartę Pracownika.
2. Kliknij „Edytuj profil”, zmień „Telefon” na `+48 111 222 333`, podaj powód `Test manualny <data>`, zapisz.
3. Przywróć poprzedni telefon.

**Co powinno się stać**

- [ ] Sekcje: „Tożsamość” (e-mail, „E-mail potwierdzony”, „Sposoby logowania”), „Profil”, „Obszary robocze” (Alfa CNC z rolą i uprawnieniami), „Działania administratorów na tym koncie”.
- [ ] Przy e-mailu jest „E-maila nie zmienia się tutaj — to tożsamość logowania.”
- [ ] Po kroku 2 pojawia się „Zapisano”; Pracownik widzi nowy telefon w swoim profilu.
- [ ] W „Działania administratorów na tym koncie” pojawia się wpis o zmianie.

> Kod: `lib/admin/user-detail.ts`, `app/actions/admin/users.ts` · `updateUserProfile`

---

## Rozliczenia i log

### ADM-060 · Rozliczenia platformy

**Ważność:** dodatkowy · **Zaloguj się jako:** Support

**Co zrobić**

1. Otwórz „Rozliczenia” w strefie admina.

**Co powinno się stać**

- [ ] Widać kafelki „MRR”, „ARR”, „Subskrypcje rozliczane”, „Rozkład pakietów” i tabelę „Subskrypcje” z kolumnami „Firma”, „Pakiet”, „Cykl”, „Koniec okresu”.
- [ ] Alfa CNC (Business) i Delta Frez (Enterprise, ręcznie) są w tabeli.

> Kod: `lib/admin/billing.ts`

### ADM-061 · Log działań

**Ważność:** ważny · **Zaloguj się jako:** Support

**Zanim zaczniesz:** wykonaj co najmniej ADM-023 i ADM-030.

**Co zrobić**

1. Otwórz „Log”.
2. Wyszukaj swój adres w „Szukaj po wykonawcy, akcji lub celu…”.
3. Ustaw filtr wyniku na „odmowa”.
4. Rozwiń „Szczegóły” przy wpisie z ADM-023.

**Co powinno się stać**

- [ ] Kolumny: „Wykonawca”, „Akcja”, „Cel”, „Wynik”, „Powód”.
- [ ] Są wpisy z ADM-023 i ADM-030 z Twoimi powodami i wynikiem „ok”.
- [ ] Pod tabelą jest informacja, że log jest „Tylko do dopisywania”.
- [ ] W szczegółach ADM-023 widać, co się zmieniło (stare i nowe miasto).

> Kod: `lib/admin/audit-log.ts`, `lib/admin/audit.ts`
