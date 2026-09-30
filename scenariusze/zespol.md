# Zespół i zaproszenia

Firma może mieć wielu współpracowników. Właściciel i administrator zapraszają
ludzi mailem, nadają im role, usuwają ich z firmy. Tutaj sprawdzasz listę
zespołu, zaproszenia, stronę przyjęcia zaproszenia, zmianę ról, usuwanie,
opuszczanie firmy i przekazanie własności.

**Gdzie to jest:** „Ustawienia” → „Członkowie zespołu”.

**Skrzynka testowa:** zaproszenia wysyłaj na adresy `tester+<cokolwiek>@<domena>`
z README. Wszystkie trafiają do jednej skrzynki testowej.

---

## Lista zespołu

### ZES-001 · Lista zespołu

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Otwórz „Ustawienia” → „Członkowie zespołu”.

**Co powinno się stać**

- [ ] Tytuł zakładki to „Zespół”, pod nim „Zapraszaj współpracowników i decyduj, co każdy z nich może robić.”
- [ ] Są zakładki „Współpracownicy (N)” i „Oczekujące zaproszenia (N)” z liczbami.
- [ ] Tabela ma kolumny „Współpracownik” i „Rola”.
- [ ] Twój wiersz ma dopisek „(Ty)”.
- [ ] Przy właścicielu jest oznaczenie „Właściciel”, bez listy do zmiany roli.
- [ ] Osoby bez imienia i nazwiska są pokazane jako „Bez nazwy” albo adresem e-mail.

> Kod: `settings/members/components/members-content.tsx`, `app/actions/members.ts` · `getTeam`

### ZES-002 · Szukanie i filtr ról

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. W polu „Szukaj...” wpisz fragment adresu e-mail Pracownika.
2. Wyczyść pole. Kliknij „Wszystkie role” i wybierz „Podgląd”.
3. Wpisz w „Szukaj...”: `xyzqwe`

**Co powinno się stać**

- [ ] Po kroku 1 na liście jest tylko Pracownik.
- [ ] Po kroku 2 na liście są tylko osoby z rolą „Podgląd”.
- [ ] Po kroku 3 widać „Nikt nie pasuje do wyszukiwania.”

> Kod: `members-content.tsx` · `filteredMembers`

### ZES-003 · Pracownik widzi zespół bez możliwości zmian

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz „Ustawienia” → „Członkowie zespołu”.
2. Kliknij „⋯” przy swoim wierszu.

**Co powinno się stać**

- [ ] Widać listę współpracowników i ich role jako zwykły tekst — bez list do zmiany.
- [ ] **Nie ma** przycisku „Dodaj” ani zakładki z zaproszeniami.
- [ ] W menu „⋯” przy własnym wierszu jest tylko „Opuść firmę”.
- [ ] Przy cudzych wierszach nie ma menu „⋯”.

> Kod: `viewer.canManage` — uprawnienie `members.manage`

---

## Zapraszanie

### ZES-010 · Zaproszenie nowej osoby

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. W „Członkowie zespołu” kliknij „Dodaj”.
2. W „Adres e-mail” wpisz: `tester+zes010-<data bez spacji>@<domena>`
3. W „Rola” zostaw „Pracownik”.
4. Kliknij „Wyślij zaproszenie”.
5. Otwórz zakładkę „Oczekujące zaproszenia”.
6. Sprawdź skrzynkę testową.

**Co powinno się stać**

- [ ] Po kroku 1 otwiera się okno „Zaproś współpracownika”, pole „Rola” ma domyślnie „Pracownik”.
- [ ] Po kroku 4 okno się zamyka, pojawia się „Zaproszenie wysłane na <adres>”.
- [ ] Po kroku 5 zaproszenie jest na liście ze statusem „Oczekujące” i dopiskiem „zaprosił(a) <Twoje imię>”.
- [ ] W ciągu kilku minut przychodzi mail z tematem „Zaproszenie do firmy Alfa CNC w CNC Optima”.
- [ ] Mail zawiera: kto zaprasza, „Twoja rola: Pracownik”, przycisk „Przyjmij zaproszenie”, informację „Zaproszenie wygasa po 7 dniach.” i adres do skopiowania.

> Kod: `inviteMember`, `deliverInvitation`, `lib/email/templates/invitation.ts`

Zachowaj ten mail — przyda się w ZES-031.

### ZES-011 · Błędy w oknie zaproszenia

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Kliknij „Dodaj”, zostaw pusty adres, kliknij „Wyślij zaproszenie”.
2. Wpisz `jan@` i kliknij „Wyślij zaproszenie”.
3. Wpisz `jan kowalski@example.com` i kliknij „Wyślij zaproszenie”.

**Co powinno się stać**

- [ ] 1: pod polem pojawia się „Podaj adres e-mail”.
- [ ] 2 i 3: pojawia się „Podaj poprawny adres e-mail”.
- [ ] W żadnym przypadku nie powstaje zaproszenie.

> Kod: `invite-dialog.tsx`; `inviteMember` · `isPlausibleEmail` → `INVITE_EMAIL_INVALID`

### ZES-012 · Zaproszenie osoby, która już jest w zespole

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Kliknij „Dodaj” i wpisz adres e-mail Pracownika z README.
2. Kliknij „Wyślij zaproszenie”.

**Co powinno się stać**

- [ ] Pojawia się komunikat „Ta osoba jest już w Twoim zespole”.

> Kod: `inviteMember` → `INVITE_ALREADY_MEMBER`

### ZES-013 · Ponowne zaproszenie tego samego adresu

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Zaproś jeszcze raz adres z ZES-010, tym razem pisząc go WIELKIMI LITERAMI.
2. Otwórz „Oczekujące zaproszenia”.

**Co powinno się stać**

- [ ] Zaproszenie się wysyła bez błędu.
- [ ] Na liście jest nadal **jedno** zaproszenie na ten adres (małymi literami), a nie dwa.

> Kod: `normaliseEmail`; RPC `upsert_company_invitation`

### ZES-014 · Role do wyboru w zaproszeniu

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC), potem Administrator (Alfa CNC)

**Co zrobić**

1. Jako Właściciel kliknij „Dodaj” i rozwiń pole „Rola”.
2. Wyloguj się, zaloguj jako Administrator i zrób to samo.

**Co powinno się stać**

- [ ] Właściciel widzi: „Administrator”, „Pracownik”, „Podgląd”, „Magazynier”. **Nie ma** „Właściciel”.
- [ ] Administrator widzi: „Pracownik”, „Podgląd”, „Magazynier”. **Nie ma** „Administrator” ani „Właściciel”.

> Kod: `role-select.tsx` — bez `owner`; `isOwnerGrantedRole` tylko dla właściciela

### ZES-015 · Mail nie dotarł — link do ręcznego przekazania

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Zanim zaczniesz:** ten scenariusz działa tylko wtedy, gdy w README, w sekcji „Środowisko”, jest napisane, że wysyłka maili z zaproszeniami jest **wyłączona**. W przeciwnym razie oznacz go jako zablokowany z dopiskiem „wysyłka włączona”.

**Co zrobić**

1. Zaproś `tester+zes015-<data bez spacji>@<domena>`.
2. Kliknij „Kopiuj link”.
3. Otwórz okno prywatne przeglądarki i wklej link.

**Co powinno się stać**

- [ ] Okno zaproszenia **nie** zamyka się. Widać „Zaproszenie utworzone, e-mail niewysłany” i tekst „Nie udało się dostarczyć wiadomości na <adres>. Prześlij ten link samodzielnie — działa tak samo.”
- [ ] Jest pole „Link do zaproszenia” z adresem.
- [ ] Po kroku 2 przycisk pokazuje „Skopiowano”, pojawia się komunikat „Link skopiowany”.
- [ ] Po kroku 3 otwiera się strona „Dołącz do firmy Alfa CNC”.

> Kod: `invite-dialog.tsx` — `delivered === false`; `lib/email/send.ts` — `not_configured` / `rejected`

### ZES-016 · Język maila z zaproszeniem

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel (Alfa CNC) · **Język:** angielski

**Co zrobić**

1. Przełącz aplikację na angielski.
2. Zaproś `tester+zes016-<data bez spacji>@<domena>`.
3. Sprawdź skrzynkę. Na koniec przełącz aplikację z powrotem na polski.

**Co powinno się stać**

- [ ] Mail jest po angielsku: temat zawiera „CNC Optima”, przycisk to „Accept invitation”.

> Kod: `deliverInvitation` — `locale: getLocale()` zapraszającego

---

## Oczekujące zaproszenia

### ZES-020 · Ponowne wysłanie zaproszenia

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Zanim zaczniesz:** masz mail z ZES-010.

**Co zrobić**

1. W „Oczekujące zaproszenia” kliknij „⋯” przy zaproszeniu z ZES-010 → „Wyślij ponownie”.
2. Sprawdź skrzynkę.
3. W oknie prywatnym otwórz link z **pierwszego** maila (z ZES-010).
4. W oknie prywatnym otwórz link z **nowego** maila.

**Co powinno się stać**

- [ ] Po kroku 1 pojawia się „Zaproszenie wysłane ponownie”.
- [ ] Przychodzi nowy mail.
- [ ] Po kroku 3 widać „Nie znaleziono zaproszenia” — stary link przestał działać.
- [ ] Po kroku 4 widać „Dołącz do firmy Alfa CNC”.

> Kod: `resendInvitation` — nowy token nadpisuje stary

### ZES-021 · Anulowanie zaproszenia

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Zaproś `tester+zes021-<data bez spacji>@<domena>`.
2. W „Oczekujące zaproszenia” kliknij „⋯” przy tym zaproszeniu → „Anuluj zaproszenie”.
3. W oknie prywatnym otwórz link z maila do tego zaproszenia.

**Co powinno się stać**

- [ ] Po kroku 2 pojawia się „Zaproszenie anulowane” i zaproszenie znika z listy.
- [ ] Po kroku 3 widać „Zaproszenie anulowane” i tekst „To zaproszenie zostało anulowane przez osobę, która je wysłała.”

> Kod: `revokeInvitation`; `invite/[token]/page.tsx` — stan `revoked`

### ZES-022 · Wygasłe zaproszenie

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. W „Oczekujące zaproszenia” znajdź zaproszenie na adres `wygasle@…`.
2. Kliknij „⋯” → „Wyślij ponownie”.

**Co powinno się stać**

- [ ] Przed krokiem 2 status jest czerwony: „Wygasło”.
- [ ] Po kroku 2 status zmienia się na „Oczekujące”.

> Kod: `getTeam` — `isExpired(expires_at)`; `resendInvitation` przedłuża ważność

### ZES-023 · Strona wygasłego zaproszenia

**Ważność:** ważny · **Zaloguj się jako:** nikt (okno prywatne)

**Co zrobić**

1. Otwórz „Link do wygasłego zaproszenia” z README.

**Co powinno się stać**

- [ ] Widać „Zaproszenie wygasło” i tekst „Zaproszenie do firmy Alfa CNC straciło ważność. Poproś o nowe.”

> Kod: `invite/[token]/page.tsx` — stan `expired`

---

## Przyjmowanie zaproszenia

### ZES-030 · Strona zaproszenia dla niezalogowanego

**Ważność:** krytyczny · **Zaloguj się jako:** nikt (okno prywatne)

**Co zrobić**

1. W oknie prywatnym otwórz link z najnowszego maila z ZES-020.

**Co powinno się stać**

- [ ] Nagłówek: „Dołącz do firmy Alfa CNC”.
- [ ] Tekst: „Zapraszamy Cię jako: Pracownik. Zaproszenie wysłano na <adres> — zaloguj się tym adresem albo załóż konto, aby dołączyć.”
- [ ] Są przyciski „Załóż konto” i „Zaloguj się”.

> Kod: `invite/[token]/page.tsx` — `!user`

### ZES-031 · Nowa osoba zakłada konto z zaproszenia

**Ważność:** krytyczny · **Zaloguj się jako:** nikt (okno prywatne)

**Co zrobić**

1. Na stronie zaproszenia z ZES-030 kliknij „Załóż konto”.
2. Załóż konto na adres z zaproszenia. Jeśli aplikacja poprosi o potwierdzenie maila — potwierdź linkiem ze skrzynki.
3. Gdy znowu zobaczysz stronę zaproszenia, kliknij „Dołącz do firmy”.
4. Otwórz „Ustawienia” → „Członkowie zespołu”.

**Co powinno się stać**

- [ ] Po kroku 1 formularz rejestracji ma już wpisany adres z zaproszenia.
- [ ] Po kroku 2 wracasz na stronę zaproszenia, a nie na pustą aplikację.
- [ ] Po kroku 3 otwiera się ekran „Wyceny” firmy Alfa CNC; w lewym górnym rogu jest „Alfa CNC”.
- [ ] Po kroku 4 nowa osoba jest na liście z rolą „Pracownik”, a zaproszenie zniknęło z oczekujących.

> Kod: `invite/[token]/page.tsx` — `/register?next=…&email=…`; `acceptInvitation`

### ZES-032 · Istniejące konto przyjmuje zaproszenie

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel (Alfa CNC), potem `bezfirmy`

**Co zrobić**

1. Jako Właściciel zaproś adres konta `bezfirmy` z rolą „Pracownik”. Wyloguj się.
2. Otwórz link z maila (skrzynka konta `bezfirmy` jest w README) i kliknij „Zaloguj się”.
3. Zaloguj się jako `bezfirmy`.
4. Kliknij „Dołącz do firmy”.

**Co powinno się stać**

- [ ] Po kroku 2 formularz logowania ma wpisany adres `bezfirmy`.
- [ ] Po kroku 3 wracasz na stronę zaproszenia z tekstem „Zapraszamy Cię jako: Pracownik.” i przyciskiem „Dołącz do firmy”.
- [ ] Po kroku 4 otwiera się „Wyceny” firmy Alfa CNC.

> Kod: `/login?next=…&email=…`; `AcceptInvitation`

**Po scenariuszu:** `bezfirmy` zostaje w Alfa — opuści ją w ZES-060.

### ZES-033 · Zalogowany na inne konto

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Zanim zaczniesz:** jako Właściciel zaproś `tester+zes033-<data bez spacji>@<domena>`.

**Co zrobić**

1. Zalogowany jako Pracownik otwórz link z maila do tego zaproszenia.
2. Kliknij „Zaloguj się na inne konto”.

**Co powinno się stać**

- [ ] Po kroku 1 widać „Niewłaściwe konto” i tekst „Zaproszenie wysłano na <adres z zaproszenia>, a jesteś zalogowany(a) jako <adres Pracownika>. Przełącz konto, aby je przyjąć.”
- [ ] **Nie ma** przycisku „Dołącz do firmy”.
- [ ] Po kroku 2 zostajesz wylogowany i widzisz logowanie z wpisanym adresem z zaproszenia.

> Kod: `invite/[token]/page.tsx` — porównanie adresów; `SwitchAccount`

### ZES-034 · Link już wykorzystany

**Ważność:** ważny · **Zaloguj się jako:** `bezfirmy` (po ZES-032)

**Co zrobić**

1. Otwórz ponownie link z zaproszenia z ZES-032.

**Co powinno się stać**

- [ ] Widać „Zaproszenie już wykorzystane” i „To zaproszenie zostało już przyjęte.”
- [ ] Jest przycisk „Przejdź do aplikacji”, który otwiera „Wyceny”.

> Kod: `invite/[token]/page.tsx` — stan `accepted`

### ZES-035 · Zepsuty link

**Ważność:** dodatkowy · **Zaloguj się jako:** nikt (okno prywatne)

**Co zrobić**

1. Weź dowolny link z zaproszenia, usuń z końca kilka znaków i otwórz go.

**Co powinno się stać**

- [ ] Widać „Nie znaleziono zaproszenia” i „Ten link jest nieprawidłowy. Poproś o nowe zaproszenie.”

> Kod: `getInvitationPreview` → `INVITE_NOT_FOUND`

### ZES-036 · Dołączenie do drugiej firmy z linku

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC), potem Właściciel Beta (`starter`)

**Co zrobić**

1. Jako Właściciel Alfa zaproś adres konta `starter` z rolą „Podgląd”. Wyloguj się.
2. Zaloguj się jako `starter` i otwórz link z maila.
3. Kliknij „Dołącz do firmy”.
4. Kliknij nazwę firmy w lewym górnym rogu.

**Co powinno się stać**

- [ ] Po kroku 3 jesteś w firmie **Alfa CNC** — do niej właśnie dołączyłeś.
- [ ] Po kroku 4 w menu firm są „Alfa CNC” i „Beta Obróbka”.

> Kod: `accept-invitation.tsx` — `router.replace('/quotes')` bez przełączenia firmy; migracja 059 ustawia firmę domyślną tylko przy pierwszej. Rozbieżność `R-08`

**Po scenariuszu:** jako Właściciel Alfa usuń `starter` z zespołu (ZES-050).

---

## Zmiana ról

### ZES-040 · Zmiana roli współpracownika

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. W „Członkowie zespołu” przy Pracowniku kliknij pole z rolą i wybierz „Podgląd”.
2. W drugiej przeglądarce (albo oknie prywatnym) zaloguj się jako Pracownik i otwórz „Kontrahenci”.
3. Jako Właściciel przywróć Pracownikowi rolę „Pracownik”.

**Co powinno się stać**

- [ ] Po kroku 1 pojawia się „Rola zaktualizowana”.
- [ ] Po kroku 2 „Dodaj kontrahenta” jest wyszarzony z dymkiem o roli tylko do przeglądania.
- [ ] Po kroku 3 i odświeżeniu u Pracownika przycisk znów działa.

> Kod: `changeMemberRole`

### ZES-041 · Granice administratora

**Ważność:** ważny · **Zaloguj się jako:** Administrator (Alfa CNC)

**Co zrobić**

1. Otwórz „Członkowie zespołu” i obejrzyj wiersze Właściciela, swój i Pracownika.
2. Kliknij „⋯” przy Właścicielu (jeśli jest).
3. Zmień rolę Pracownika na „Podgląd”, potem z powrotem na „Pracownik”.

**Co powinno się stać**

- [ ] Wiersz Właściciela nie ma listy do zmiany roli ani opcji „Usuń z firmy”.
- [ ] Twój wiersz nie ma listy do zmiany roli.
- [ ] W liście ról Pracownika **nie ma** „Administrator”.
- [ ] Zmiany ról Pracownika zapisują się z komunikatem „Rola zaktualizowana”.

> Kod: `lib/permissions.ts` · `blockChangeRole`, `OWNER_GRANTED_ROLE_KEYS`

### ZES-042 · Właściciel nadaje rolę Administrator

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Zmień rolę Podglądu na „Administrator”.
2. Zmień ją z powrotem na „Podgląd”.

**Co powinno się stać**

- [ ] Obie zmiany zapisują się z komunikatem „Rola zaktualizowana”.

> Kod: `blockChangeRole` — `actorIsOwner`

---

## Usuwanie i opuszczanie

### ZES-050 · Usunięcie współpracownika

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Zanim zaczniesz:** potrzebujesz osoby dołączonej w ZES-031 (albo `starter` po ZES-036).

**Co zrobić**

1. Kliknij „⋯” przy tej osobie → „Usuń z firmy”.
2. Przeczytaj okno i kliknij „Usuń”.
3. W drugiej przeglądarce zaloguj się jako usunięta osoba.

**Co powinno się stać**

- [ ] Pod „Usuń z firmy” w menu widać adres e-mail tej osoby.
- [ ] Okno „Usunąć tę osobę?” mówi: „<imię> natychmiast straci dostęp do danych tej firmy. Możesz zaprosić ją ponownie później.”
- [ ] Po kroku 2 pojawia się „Współpracownik usunięty”, osoba znika z listy.
- [ ] Po kroku 3 osoba nie widzi Alfa CNC w menu firm. Jeśli nie ma innej firmy — trafia na stronę „Firmy” z informacją, że nie należy do żadnej firmy.

> Kod: `removeMember`; `(dashboard)/layout.tsx` — `redirect(NO_WORKSPACE_PATH)`

### ZES-051 · Administrator nie usuwa właściciela ani administratora

**Ważność:** ważny · **Zaloguj się jako:** Administrator (Alfa CNC)

**Co zrobić**

1. Sprawdź menu „⋯” przy Właścicielu.
2. Sprawdź menu „⋯” przy Pracowniku.

**Co powinno się stać**

- [ ] Przy Właścicielu nie ma „Usuń z firmy”.
- [ ] Przy Pracowniku jest „Usuń z firmy”. **Nie klikaj.**

> Kod: `blockRemoveMember` — `ownerOnly`

### ZES-052 · Nie da się usunąć samego siebie

**Ważność:** dodatkowy · **Zaloguj się jako:** Administrator (Alfa CNC)

**Co zrobić**

1. Kliknij „⋯” przy własnym wierszu.

**Co powinno się stać**

- [ ] Jest tylko „Opuść firmę”, nie ma „Usuń z firmy”.

> Kod: `blockRemoveMember` — `self`

### ZES-060 · Opuszczenie firmy

**Ważność:** ważny · **Zaloguj się jako:** `bezfirmy` (po ZES-032)

**Co zrobić**

1. Otwórz „Ustawienia” → „Członkowie zespołu”.
2. Kliknij „⋯” przy własnym wierszu → „Opuść firmę”.
3. Przeczytaj okno i kliknij „Opuść firmę”.

**Co powinno się stać**

- [ ] Okno „Opuścić tę firmę?” mówi: „Stracisz dostęp do jej wycen, zleceń i klientów. Osoba zarządzająca zespołem może zaprosić Cię ponownie.”
- [ ] Po kroku 3 pojawia się „Opuszczono firmę”.
- [ ] Trafiasz na stronę „Firmy” z informacją, że nie należysz do żadnej firmy.

> Kod: `leaveCompany` — czyści firmę domyślną i ciasteczko

### ZES-061 · Właściciel nie może opuścić firmy

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Kliknij „⋯” przy własnym wierszu.

**Co powinno się stać**

- [ ] „Opuść firmę” jest wyszarzone, z dopiskiem „Najpierw przekaż własność”.

> Kod: `blockLeaveCompany` — `ownerMustTransfer`

---

## Przekazanie własności

### ZES-070 · Przekazanie własności i powrót

**Ważność:** ważny · **Zaloguj się jako:** Właściciel Delta Frez (`enterprise`), potem Pracownik

**Zanim zaczniesz:** Pracownik musi należeć do Delta Frez — wykonaj NAV-033.

**Co zrobić**

1. Jako `enterprise` otwórz „Członkowie zespołu”, kliknij „⋯” przy Pracowniku → „Przekaż własność”.
2. Przeczytaj okno i kliknij „Przekaż własność”.
3. Kliknij „⋯” przy własnym wierszu.
4. Zaloguj się jako Pracownik, przełącz się na „Delta Frez”, otwórz „Członkowie zespołu”.
5. Przekaż własność z powrotem kontu `enterprise`.

**Co powinno się stać**

- [ ] Okno „Przekazać własność firmy?” mówi: „<imię> zostanie właścicielem firmy, a Ty administratorem. Tylko ta osoba będzie mogła oddać własność z powrotem.”
- [ ] Po kroku 2 pojawia się „Własność przekazana”. Pracownik ma oznaczenie „Właściciel”, Ty — rolę „Administrator”.
- [ ] Po kroku 3 „Opuść firmę” jest już aktywne (nie klikaj).
- [ ] Po kroku 4 Pracownik widzi się jako właściciel Delty i ma „Przekaż własność” przy innych osobach.
- [ ] Po kroku 5 `enterprise` znów jest właścicielem.

> Kod: `transferOwnership`; RPC `transfer_company_ownership`

### ZES-071 · Tylko właściciel przekazuje własność

**Ważność:** ważny · **Zaloguj się jako:** Administrator (Alfa CNC)

**Co zrobić**

1. Sprawdź menu „⋯” przy Pracowniku i przy Podglądzie.

**Co powinno się stać**

- [ ] W żadnym menu nie ma „Przekaż własność”.

> Kod: `canTransfer = viewerIsOwner && !isSelf`

---

## Limity miejsc w planie

### ZES-080 · Plan Starter — jedna osoba

**Ważność:** ważny · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Co zrobić**

1. Otwórz „Członkowie zespołu”.
2. Najedź na przycisk „Dodaj”.
3. Kliknij „Zmień plan”.

**Co powinno się stać**

- [ ] Nad listą jest informacja „Wykorzystano 1 z 1 miejsc” i „Plan Starter obejmuje jedną osobę. Przejdź na wyższy plan, aby pracować w zespole.”
- [ ] „Dodaj” jest wyszarzony.
- [ ] Po kroku 3 otwiera się strona wyboru pakietu.

> Kod: `computeSeatUsage`; `SeatBanner`

### ZES-081 · Zaproszenia zajmują miejsca

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Zanim zaczniesz:** plan Business Alfy ma 10 miejsc. Policz osoby na liście i zaproszenia oczekujące (bez wygasłych) — to zajęte miejsca.

**Co zrobić**

1. Zapraszaj kolejne adresy `tester+zes081-1…@<domena>`, `tester+zes081-2…` itd., aż zajmiesz wszystkie 10 miejsc.
2. Najedź na „Dodaj”.
3. Anuluj jedno z tych zaproszeń.
4. Na koniec anuluj wszystkie zaproszenia `zes081`.

**Co powinno się stać**

- [ ] Po zajęciu 10 miejsc nad listą jest „Wykorzystano 10 z 10 miejsc” i „Wszystkie miejsca są zajęte. Zmień plan albo usuń kogoś z zespołu.”
- [ ] „Dodaj” jest wyszarzony.
- [ ] Po kroku 3 informacja znika, „Dodaj” znów działa.

> Kod: `computeSeatUsage` — oczekujące zaproszenia liczą się do limitu

---

## Firma zawieszona

### ZES-090 · Zespół w firmie zawieszonej

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC) → przełącz na Gamma Metal

**Co zrobić**

1. Przełącz firmę na „Gamma Metal” (jesteś tam Administratorem).
2. Otwórz „Członkowie zespołu”.
3. Najedź na „Dodaj” i na listy ról.

**Co powinno się stać**

- [ ] Lista zespołu jest widoczna.
- [ ] „Dodaj”, zmiana ról i usuwanie są wyszarzone, z dymkiem „Firma jest zawieszona — dane można teraz tylko przeglądać.” — tak jak w innych miejscach aplikacji.

> Kod: `members-content.tsx` nie korzysta z `useWriteBlock` — przyciski zależą tylko od roli; zaproszenie odrzuca RPC z ogólnym „Nie udało się wysłać zaproszenia”. Rozbieżność `R-12`

**Po scenariuszu:** przełącz się z powrotem na „Alfa CNC”.
