# Nawigacja i wyszukiwanie

Wszystko, co otacza właściwe ekrany: menu po lewej, górny pasek, menu
użytkownika, przełączanie firm, wyszukiwarka i to, co dzieje się, gdy
wchodzisz na adres, do którego nie masz dostępu.

**Gdzie to jest:** na każdym ekranie po zalogowaniu.

---

## Menu po lewej

### NAV-001 · Start po zalogowaniu

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Zaloguj się.
2. W pasku adresu zostaw sam adres aplikacji (bez niczego po ukośniku) i naciśnij Enter.

**Co powinno się stać**

- [ ] Po zalogowaniu otwiera się ekran „Wyceny”.
- [ ] Po kroku 2 też otwiera się „Wyceny”.
- [ ] W lewym górnym rogu widać logo i nazwę „Alfa CNC”.

> Kod: `app/[locale]/(dashboard)/page.tsx` — `redirect('/quotes')`

### NAV-002 · Pozycje menu

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Przeczytaj pozycje menu po lewej od góry do dołu.
2. Kliknij po kolei: „Projekty”, „Wyceny”, „Zlecenia”, „Kontrahenci”.

**Co powinno się stać**

- [ ] U góry menu są: „Dashboard”, „Projekty”, „Wyceny”, „Zlecenia”, „Kontrahenci”.
- [ ] Na dole menu są: „Ustawienia”, „Ulepsz pakiet”, „Wsparcie i pomoc”.
- [ ] **Nie ma** pozycji „Strefa admina”.
- [ ] Po kliknięciu każdej pozycji z kroku 2 otwiera się jej ekran, pozycja w menu jest podświetlona, a na górnym pasku jest jej nazwa.

> Kod: `components-next/ui/navigation-items.ts`, `app-sidebar.tsx`

### NAV-003 · Pozycje jeszcze niedostępne

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Kliknij „Dashboard”.
2. Kliknij „Wsparcie i pomoc”.

**Co powinno się stać**

- [ ] Obie pozycje są wyszarzone i kliknięcie niczego nie otwiera.

> Kod: `lib/modules.ts` — `dashboard: status 'planned'`; `navigation-items.ts` — `support: disabled`

### NAV-004 · Zwijanie i rozwijanie menu

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Na górnym pasku, na lewo od tytułu ekranu, kliknij przycisk zwijania menu.
2. Najedź myszką na ikony w zwiniętym menu.
3. Odśwież stronę (F5 albo Cmd+R).
4. Kliknij ten sam przycisk ponownie.

**Co powinno się stać**

- [ ] Po kroku 1 menu zwęża się do samych ikon, nazwa firmy znika, zostaje logo.
- [ ] Po kroku 2 przy każdej ikonie pojawia się dymek z nazwą pozycji.
- [ ] Po kroku 3 menu nadal jest zwinięte — nie miga na szeroko przy ładowaniu.
- [ ] Po kroku 4 menu wraca do pełnej szerokości.

> Kod: `sidebar-provider.tsx`, `lib/sidebar-preference.ts` — ciasteczko

### NAV-005 · Firma bez logo

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Co zrobić**

1. Spójrz na lewy górny róg.

**Co powinno się stać**

- [ ] Zamiast logo jest kolorowy kwadrat z literą „B”, obok nazwa „Beta Obróbka”.

> Kod: `workspace-menu.tsx` · `AvatarFallback`

### NAV-006 · Menu dopasowane do roli

**Ważność:** ważny · **Zaloguj się jako:** Magazynier (Alfa CNC)

**Co zrobić**

1. Przeczytaj pozycje menu po lewej.
2. W pasku adresu dopisz do adresu aplikacji `/quotes` i naciśnij Enter.

**Co powinno się stać**

- [ ] W menu są „Projekty” i „Zlecenia”. **Nie ma** „Wyceny” ani „Kontrahenci”.
- [ ] Po kroku 2 widać ekran z kłódką „Brak dostępu do tego modułu”.

> Kod: `app-sidebar.tsx` — `block === 'permission'` usuwa pozycję; `moduleBlockScreen`

### NAV-007 · Strefa admina w menu

**Ważność:** ważny · **Zaloguj się jako:** Superadmin

**Co zrobić**

1. Spójrz na dół menu po lewej.
2. Kliknij „Strefa admina”.

**Co powinno się stać**

- [ ] Nad „Ustawienia” jest pozycja „Strefa admina” z ikoną tarczy.
- [ ] Po kliknięciu otwiera się panel administracyjny z tytułem „Przegląd”.

> Kod: `navigation-items.ts` · `adminNavItem`; `lib/admin/guard.ts`

### NAV-008 · Nieaktywne przyciski na górnym pasku

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Na górnym pasku po prawej kliknij ikonę dzwonka.
2. Kliknij ikonę obok dzwonka (OperatorAI).

**Co powinno się stać**

- [ ] Oba przyciski są wyszarzone i nic nie otwierają.

> Kod: `app-top-nav.tsx` — nie przekazuje `onNotificationsClick` ani `onOperatorAIClick`

---

## Menu użytkownika

### NAV-010 · Zawartość menu użytkownika

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Kliknij kółko z inicjałem lub zdjęciem w prawym górnym rogu.

**Co powinno się stać**

- [ ] Otwiera się menu. Na górze jest adres e-mail zalogowanego konta.
- [ ] Pozycje: „Ustawienia konta”, sekcja „Język” z opcjami „Polski” i „Angielski”, „Wyloguj się”.
- [ ] Przy aktualnym języku jest znacznik wyboru.
- [ ] Klawisz Esc albo kliknięcie obok zamyka menu.

> Kod: `components-next/ui/user-menu.tsx`

### NAV-011 · Ustawienia konta z menu

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Otwórz „Kontrahenci”.
2. Otwórz menu użytkownika i kliknij „Ustawienia konta”.

**Co powinno się stać**

- [ ] Nad listą kontrahentów otwiera się okno ustawień na zakładce „Profil użytkownika”.

> Kod: `user-menu.tsx` — `router.push('/settings/profile')`

### NAV-012 · Wylogowanie

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Otwórz „Kontrahenci”.
2. Otwórz menu użytkownika i kliknij „Wyloguj się”.
3. Kliknij w przeglądarce przycisk „Wstecz”.

**Co powinno się stać**

- [ ] Po kroku 2 widać stronę logowania.
- [ ] Po kroku 3 nadal widać stronę logowania (albo ponownie się ona otwiera) — lista kontrahentów się **nie** pokazuje.

> Kod: `app/actions/auth.ts` · `signOut`; `proxy.ts` — przekierowanie na `/login`

---

## Język

### NAV-020 · Zmiana języka na angielski i z powrotem

**Ważność:** krytyczny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz menu użytkownika, w sekcji „Język” kliknij „Angielski”.
2. Przejrzyj menu po lewej i ekran.
3. Wyloguj się i zaloguj ponownie.
4. Otwórz menu użytkownika i wróć na „Polish” (polski).

**Co powinno się stać**

- [ ] Po kroku 1 strona przeładowuje się sama.
- [ ] Po kroku 2 menu, górny pasek i ekran są po angielsku (np. „Quotes”, „Clients”).
- [ ] Po kroku 3 aplikacja nadal jest po angielsku.
- [ ] Po kroku 4 wszystko wraca na polski.

> Kod: `app/actions/preferences.ts` · `setUserLocale` — ciasteczko + `user_profiles.language`

### NAV-021 · Wybór tego samego języka

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz menu użytkownika i kliknij „Polski”, gdy aplikacja już jest po polsku.

**Co powinno się stać**

- [ ] Menu się zamyka, strona **nie** przeładowuje się.

> Kod: `user-menu.tsx` · `handleLocaleChange` — `if (next === locale) return`

---

## Przełączanie firm

### NAV-030 · Lista firm w menu firmy

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Kliknij nazwę „Alfa CNC” w lewym górnym rogu.

**Co powinno się stać**

- [ ] Otwiera się menu z nagłówkiem „Firmy”.
- [ ] Na liście są „Alfa CNC” i „Gamma Metal”, alfabetycznie.
- [ ] „Alfa CNC” ma znacznik wyboru i podpis „Właściciel”; nie da się jej kliknąć.
- [ ] „Gamma Metal” ma podpis „Zawieszona”.
- [ ] Na dole jest pozycja „Wszystkie firmy”.

> Kod: `workspace-menu.tsx`, `app/actions/workspaces.ts` · `listMyWorkspaces`

### NAV-031 · Przełączenie na inną firmę

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Otwórz „Kontrahenci” i zapamiętaj kilka nazw.
2. Kliknij nazwę firmy w lewym górnym rogu i wybierz „Gamma Metal”.
3. Otwórz „Kontrahenci”.
4. Odśwież stronę.
5. Wyloguj się i zaloguj ponownie.

**Co powinno się stać**

- [ ] Po kroku 2 otwiera się ekran „Wyceny”, a w lewym górnym rogu jest „Gamma Metal”.
- [ ] Na górze strony jest pasek „Twoja firma jest zawieszona — możesz wszystko przeglądać, ale zapis jest zablokowany.”
- [ ] Po kroku 3 lista zawiera kontrahentów Gammy, **nie** Alfy.
- [ ] Po krokach 4 i 5 nadal jesteś w „Gamma Metal”.

> Kod: `app/actions/workspaces.ts` · `switchCompany` — ciasteczko + `user_profiles.default_company_id`

**Po scenariuszu:** przełącz się z powrotem na „Alfa CNC”.

### NAV-032 · Przełączenie z otwartego rekordu

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Otwórz kartę kontrahenta Stalmet.
2. Przełącz firmę na „Gamma Metal”.

**Co powinno się stać**

- [ ] Otwiera się ekran „Wyceny” Gammy — nie pusta karta i nie „404”.

> Kod: `switchCompany` — `redirect('/quotes')`

**Po scenariuszu:** przełącz się z powrotem na „Alfa CNC”.

### NAV-033 · Przyjęcie zaproszenia z menu firm

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Kliknij nazwę firmy w lewym górnym rogu.
2. W sekcji „Zaproszenia” kliknij „Delta Frez”.
3. Otwórz menu firm ponownie.

**Co powinno się stać**

- [ ] Po kroku 1 widać sekcję „Zaproszenia” z pozycją „Delta Frez” i podpisem „Zaproszenie jako Podgląd”.
- [ ] Po kroku 2 w prawym dolnym rogu pojawia się „Dołączono do firmy Delta Frez”.
- [ ] Nadal pracujesz w „Alfa CNC” — nazwa w rogu się nie zmieniła.
- [ ] Po kroku 3 „Delta Frez” jest na liście firm, a sekcji „Zaproszenia” już nie ma.

> Kod: `workspace-menu.tsx` · `handleAccept`; `acceptInvitationById`

### NAV-034 · Konto z jedną firmą

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Co zrobić**

1. Kliknij nazwę firmy w lewym górnym rogu.

**Co powinno się stać**

- [ ] Menu pokazuje tylko „Beta Obróbka” ze znacznikiem wyboru i pozycję „Wszystkie firmy”.

> Kod: `workspace-menu.tsx`

---

## Wyszukiwarka (paleta komend)

### NAV-040 · Otwieranie i zamykanie wyszukiwarki

**Ważność:** krytyczny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Kliknij pole „Czego szukasz?” na górnym pasku.
2. Naciśnij Esc.
3. Naciśnij Ctrl+K (na Macu Cmd+K).
4. Kliknij obok okna wyszukiwarki.

**Co powinno się stać**

- [ ] Po krokach 1 i 3 na środku ekranu otwiera się okno z polem „Czego szukasz?”.
- [ ] Bez wpisywania widać grupy „Szybkie akcje” („Nowa wycena”, „Nowe zamówienie”) i „Przejdź do” („Wyceny”, „Zlecenia”, „Projekty”).
- [ ] Na dole okna są podpowiedzi klawiszy: „Nawigacja”, „Wybierz”, „Zamknij”.
- [ ] Po krokach 2 i 4 okno się zamyka.

> Kod: `components/command-palette-provider.tsx`, `command-palette.tsx` · `useCommandPaletteHotkey`

### NAV-041 · Za krótkie zapytanie

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz wyszukiwarkę i wpisz jedną literę: `s`

**Co powinno się stać**

- [ ] Widać tekst „Wpisz co najmniej 2 znaki, aby przeszukać dane firmy.”

> Kod: `MIN_SEARCH_LENGTH = 2`

### NAV-042 · Wyszukanie kontrahenta

**Ważność:** krytyczny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz wyszukiwarkę i wpisz: `stalmet`
2. Strzałkami ↓ ↑ przejdź do wyniku „Stalmet Sp. z o.o.” i naciśnij Enter.

**Co powinno się stać**

- [ ] Po chwili (poniżej sekundy) pojawia się grupa „Kontrahenci” z wynikiem „Stalmet Sp. z o.o.” i jego NIP-em.
- [ ] Przy zaznaczonym wyniku widać podpowiedź „Pokaż wyceny”.
- [ ] Po kroku 2 okno się zamyka i otwiera się lista wycen odfiltrowana do Stalmetu.

> Kod: `resultKinds.client` — `/quotes?client=<id>`

### NAV-043 · Wyszukanie wyceny i zlecenia po numerze

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Zanim zaczniesz:** otwórz „Wyceny” i zapisz numer dowolnej wyceny (np. `WYC-2026-0001`). Otwórz „Zlecenia” i zapisz numer dowolnego zlecenia (np. `ZAM-2026-0001`).

**Co zrobić**

1. Otwórz wyszukiwarkę, wpisz numer wyceny, kliknij wynik.
2. Otwórz wyszukiwarkę, wpisz numer zlecenia, kliknij wynik.

**Co powinno się stać**

- [ ] Wycena jest w grupie „Wyceny”, podpowiedź „Otwórz”; kliknięcie otwiera tę wycenę.
- [ ] Zlecenie jest w grupie zleceń, podpowiedź „Otwórz”; kliknięcie otwiera to zlecenie.

> Kod: `resultKinds.quote`, `resultKinds.order`; RPC `search_company_resources`

### NAV-044 · Wyszukanie projektu

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Zanim zaczniesz:** otwórz „Projekty” i zapisz nazwę dowolnego projektu.

**Co zrobić**

1. Otwórz wyszukiwarkę, wpisz nazwę projektu i wybierz wynik.

**Co powinno się stać**

- [ ] Wynik jest w grupie „Projekty”, podpowiedź „Pokaż zlecenia”.
- [ ] Po wybraniu otwiera się lista zleceń odfiltrowana do tego projektu.

> Kod: `resultKinds.project` — `/orders?project=<id>`

### NAV-045 · Brak wyników

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz wyszukiwarkę i wpisz: `xyzqwe`

**Co powinno się stać**

- [ ] Widać „Brak wyników”.

> Kod: `CommandPaletteEmpty`

### NAV-046 · Szybkie akcje z wyszukiwarki

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz wyszukiwarkę i kliknij „Nowa wycena”.
2. Wróć, otwórz wyszukiwarkę i wpisz `zam`.

**Co powinno się stać**

- [ ] Po kroku 1 otwiera się formularz nowej wyceny.
- [ ] Po kroku 2 w „Szybkie akcje” zostaje „Nowe zamówienie”; kliknięcie otwiera formularz nowego zlecenia.

> Kod: `quickActionItems` — słowa kluczowe

### NAV-047 · Spójne nazwy w wyszukiwarce

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz wyszukiwarkę bez wpisywania i przeczytaj wszystkie pozycje.
2. Wpisz numer zlecenia i przeczytaj nazwę grupy wyników.

**Co powinno się stać**

- [ ] Wyszukiwarka nazywa zlecenia tak samo jak menu po lewej — „Zlecenia” i „Nowe zlecenie”, nie „Zamówienia”.
- [ ] W „Przejdź do” jest też „Kontrahenci”, tak jak w menu.

> Kod: `messages/pl.json` · `commandPalette.groupOrders`, `actionNewOrder`; `navigationItems` bez `clients` — rozbieżność `R-06`

### NAV-048 · Wyszukiwarka a rola

**Ważność:** ważny · **Zaloguj się jako:** Magazynier (Alfa CNC)

**Co zrobić**

1. Otwórz wyszukiwarkę i wpisz: `stalmet`
2. Wpisz numer wyceny z NAV-043.
3. Wpisz numer zlecenia z NAV-043.

**Co powinno się stać**

- [ ] Po krokach 1 i 2 nie ma żadnych wyników z kontrahentów ani wycen.
- [ ] Po kroku 3 zlecenie się znajduje.

> Kod: `search_company_resources` — `SECURITY INVOKER`, więc obowiązują uprawnienia odczytu

### NAV-049 · Wyszukiwarka nie wychodzi poza firmę

**Ważność:** ważny · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Co zrobić**

1. Otwórz wyszukiwarkę i wpisz: `stalmet`
2. Wpisz numer wyceny Alfy z NAV-043.

**Co powinno się stać**

- [ ] W obu przypadkach „Brak wyników” — dane Alfy są niewidoczne.

> Kod: `searchCompanyResources` — `p_company_id: companyId`

### NAV-050 · Szybka akcja bez uprawnień

**Ważność:** ważny · **Zaloguj się jako:** Podgląd (Alfa CNC)

**Co zrobić**

1. Otwórz wyszukiwarkę i kliknij „Nowa wycena”.

**Co powinno się stać**

- [ ] Zamiast formularza widać ekran „Tylko podgląd” z tekstem „Twoja rola pozwala tylko przeglądać. O uprawnienia do edycji poproś właściciela firmy.”

> Kod: `components/module-guard.tsx` · `writeBlockScreen`

---

## Dostęp i adresy

### NAV-060 · Aplikacja bez logowania

**Ważność:** krytyczny · **Zaloguj się jako:** nikt (wyloguj się albo użyj okna prywatnego)

**Co zrobić**

1. W oknie prywatnym przeglądarki wpisz adres aplikacji z końcówką `/clients`.

**Co powinno się stać**

- [ ] Otwiera się strona logowania, a nie lista kontrahentów.

> Kod: `proxy.ts` — `!user && !isPublicPath`

### NAV-061 · Link do rekordu przed zalogowaniem

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Zanim zaczniesz:** zaloguj się, otwórz kartę Stalmetu i skopiuj adres z paska. Wyloguj się.

**Co zrobić**

1. Wklej skopiowany adres w pasek przeglądarki.
2. Zaloguj się jako Pracownik.

**Co powinno się stać**

- [ ] Po kroku 1 otwiera się strona logowania.
- [ ] Po kroku 2 otwiera się karta Stalmetu — adres, który wkleiłeś, a nie lista wycen.

> Kod: `proxy.ts` — przekierowanie na `/login` bez `next`. Rozbieżność `R-05`

### NAV-062 · Zalogowany na stronie logowania

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Będąc zalogowanym, dopisz do adresu aplikacji `/login` i naciśnij Enter.
2. To samo z `/register`.

**Co powinno się stać**

- [ ] W obu przypadkach otwiera się ekran „Wyceny”.

> Kod: `proxy.ts` — `user && pathname.startsWith('/login' | '/register' | '/forgot-password')`

### NAV-063 · Nieistniejąca strona

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Dopisz do adresu aplikacji `/nie-ma-takiej-strony` i naciśnij Enter.

**Co powinno się stać**

- [ ] Widać stronę z informacją, że strony nie znaleziono („404”).

> Kod: Next.js — domyślna strona 404

### NAV-064 · Strefa admina bez uprawnień

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Dopisz do adresu aplikacji `/admin` i naciśnij Enter.
2. To samo z `/admin/companies`.

**Co powinno się stać**

- [ ] W obu przypadkach widać stronę „404” — nie panel administracyjny.

> Kod: `app/[locale]/admin/layout.tsx` — `notFound()` dla nie-adminów

### NAV-065 · Wylogowanie w innej karcie

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz aplikację w dwóch kartach przeglądarki.
2. W karcie 1 wyloguj się.
3. W karcie 2 kliknij „Kontrahenci” w menu.

**Co powinno się stać**

- [ ] W karcie 2 otwiera się strona logowania.

> Kod: `proxy.ts` — sesja sprawdzana przy każdym żądaniu

---

## Wersja angielska i inne ekrany

### NAV-070 · Nawigacja po angielsku

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC) · **Język:** angielski

**Co zrobić**

1. Przełącz język na angielski (NAV-020).
2. Przejdź NAV-002, NAV-010, NAV-040.

**Co powinno się stać**

- [ ] Wszystkie etykiety są po angielsku, żadna nie jest nazwą techniczną typu `navigation.quotes`.
- [ ] W menu firm (lewy górny róg) podpis roli też jest po angielsku, np. „Owner”, nie „Właściciel”.

> Kod: `messages/en.json` · `navigation`, `userMenu`, `commandPalette`; nazwy ról z bazy — rozbieżność `R-11`

### NAV-071 · Węższy ekran laptopa

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC) · **Ekran:** 1280×800

**Co zrobić**

1. Zmniejsz okno przeglądarki do ok. 1280 px szerokości.
2. Przejdź po wszystkich pozycjach menu.

**Co powinno się stać**

- [ ] Nic nie nachodzi na siebie, górny pasek mieści tytuł, wyszukiwarkę i ikony.
- [ ] Na żadnym ekranie cała strona nie przewija się w bok (tabele mogą przewijać się w swoim obszarze).

> Kod: `app/[locale]/(dashboard)/layout.tsx`
