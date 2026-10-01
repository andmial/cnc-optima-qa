# Role i uprawnienia

Rola mówi, co dana osoba widzi i co może zmieniać. Są cztery role wbudowane
(Właściciel, Administrator, Pracownik, Podgląd). W planie Business właściciel
może tworzyć własne role, np. „Magazynier”. Tutaj sprawdzasz listę ról,
tworzenie, edycję, usuwanie i to, jak rola działa w aplikacji.

**Gdzie to jest:** „Ustawienia” → „Role i uprawnienia”.

---

## Lista ról

### ROL-001 · Lista ról

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Otwórz „Ustawienia” → „Role i uprawnienia”.

**Co powinno się stać**

- [ ] Tytuł: „Role i uprawnienia”, pod nim „Określ, co każda rola widzi i może zmieniać w aplikacji.”
- [ ] Nad tabelą jest „Role (N)” i przycisk „Nowa rola”.
- [ ] Tabela ma kolumny „Rola” i „Osoby”.
- [ ] Role wbudowane mają plakietkę „wbudowana” i nie mają menu „⋯”.
- [ ] Rola „Magazynier” nie ma plakietki i ma menu „⋯”.
- [ ] Przy Właścicielu i Administratorze opis modułów to „Wszystkie moduły”; przy „Magazynier” — „Projekty, Zlecenia” (w dowolnej kolejności).
- [ ] W kolumnie „Osoby” widać liczbę osób („1 osoba”, „2 osoby”, „nikt”) i ich kółka z inicjałami.

> Kod: `settings/roles/components/roles-content.tsx`, `app/actions/roles.ts` · `getRoles`

### ROL-002 · Przejście do osób z daną rolą

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. W wierszu „Pracownik” kliknij kółka z osobami albo link „Pokaż wszystkie osoby z rolą Pracownik (N)”.

**Co powinno się stać**

- [ ] Otwiera się „Członkowie zespołu” z filtrem ustawionym na „Pracownik”.

> Kod: `roles-content.tsx` · `showAllMembers`

### ROL-003 · Administrator tylko podgląda role

**Ważność:** ważny · **Zaloguj się jako:** Administrator (Alfa CNC)

**Co zrobić**

1. Otwórz „Role i uprawnienia”.

**Co powinno się stać**

- [ ] Nad listą jest tekst „Role tworzy i edytuje wyłącznie właściciel firmy. Możesz podejrzeć, jak są ustawione.”
- [ ] Nie ma przycisku „Nowa rola” ani menu „⋯” przy „Magazynier”.

> Kod: `roles-notices.tsx` — `!canEdit`; `guardRoleEditing` — tylko właściciel

### ROL-004 · Własne role poza planem Business

**Ważność:** ważny · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Co zrobić**

1. Otwórz „Role i uprawnienia”.
2. Kliknij „Zmień plan”.

**Co powinno się stać**

- [ ] Widać cztery role wbudowane.
- [ ] Nad listą: „Role customowe są w planie Business” i „Role wbudowane działają w każdym planie. Wyższy plan pozwala definiować własne.”
- [ ] Nie ma przycisku „Nowa rola”.
- [ ] Po kroku 2 okno ustawień się zamyka i otwiera się strona wyboru pakietu.

> Kod: `CUSTOM_ROLES_MIN_PLAN = 'business'`; `roles-notices.tsx`

---

## Tworzenie roli

### ROL-010 · Utworzenie nowej roli

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Kliknij „Nowa rola”.
2. „Nazwa roli”: `Rola testowa <data>`; „Opis”: `Tylko wyceny do podglądu`.
3. W sekcji „Uprawnienia”, grupa „Widoczność modułów”, zaznacz „Wyceny”.
4. Kliknij przycisk zapisu w oknie.

**Co powinno się stać**

- [ ] Okno ma tytuł „Nowa rola”, pola „Nazwa roli” (podpowiedź „np. Kierownik produkcji”) i „Opis”.
- [ ] Po kroku 3 razem z „Wyceny” same zaznaczają się „Kontrahenci” i „Projekty”.
- [ ] Przy „Kontrahenci” i „Projekty” pojawia się dopisek „Wymagany przez: Wyceny”.
- [ ] Po kroku 4 pojawia się „Rola Rola testowa… utworzona”, rola jest na liście, opis modułów: „Projekty, Wyceny, Kontrahenci” (w dowolnej kolejności), „nikt” w osobach.

> Kod: `createRole`; `lib/modules.ts` · `togglePermission`, `requires`

### ROL-011 · Rola bez nazwy

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Kliknij „Nowa rola”, zostaw pustą nazwę (albo same spacje) i kliknij zapis.

**Co powinno się stać**

- [ ] Pod polem pojawia się „Podaj nazwę roli”, rola nie powstaje.

> Kod: `role-dialog.tsx` — `nameRequired`

### ROL-012 · Nazwa, która już istnieje

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Utwórz rolę o nazwie `Magazynier`.
2. Utwórz rolę o nazwie `Pracownik`.
3. Edytuj rolę z ROL-010 i zmień jej nazwę na `Magazynier`.

**Co powinno się stać**

- [ ] W każdym z trzech przypadków pojawia się komunikat „Rola o tej nazwie już istnieje.” i nic się nie zapisuje.

> Kod: unikalny tylko `(company_id, key)` (migracja 048), `key` z `slugify(name)` przy tworzeniu; `updateRole` zmienia samo `name` — dziś krok 3 przechodzi, krok 2 też (`pracownik` ≠ `member`). Rozbieżność `R-13`, adrian-potepa/cnc-optima#136

### ROL-013 · Długość nazwy i opisu

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Kliknij „Nowa rola”. Spróbuj wpisać w nazwę 70 znaków i w opis 250 znaków.

**Co powinno się stać**

- [ ] Nazwa nie przyjmuje więcej niż 60 znaków, opis — więcej niż 200.

> Kod: `roleInput` — `name.max(60)`, `description.max(200)`

---

## Zasady zaznaczania uprawnień

### ROL-020 · Odznaczenie modułu, od którego zależą inne

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Kliknij „Nowa rola”, zaznacz „Wyceny” (zaznaczą się też „Kontrahenci” i „Projekty”).
2. Odznacz „Kontrahenci”.

**Co powinno się stać**

- [ ] Po kroku 2 odznaczają się „Kontrahenci” **i** „Wyceny”. „Projekty” zostają zaznaczone.

> Kod: `togglePermission` — `dependentsOf`

### ROL-021 · Edycja danych wymaga widoczności wszystkiego

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Kliknij „Nowa rola”. Rozwiń grupę „Praca na danych”.
2. Zaznacz „Edycja danych produkcyjnych”.
3. Odznacz „Zlecenia” w „Widoczność modułów”.

**Co powinno się stać**

- [ ] Po kroku 2 w „Widoczność modułów” zaznaczają się wszystkie moduły.
- [ ] Po kroku 3 odznacza się też „Edycja danych produkcyjnych”.

> Kod: `togglePermission` — `projects.write` ↔ wszystkie odczyty

### ROL-022 · Grupy, liczniki i „zaznacz wszystko”

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Kliknij „Nowa rola”.
2. Zwiń i rozwiń grupy „Widoczność modułów”, „Praca na danych”, „Administracja”.
3. Zaznacz pole przy nazwie grupy „Administracja”.
4. Zaznacz „Zaznacz wszystkie uprawnienia”, potem je odznacz.
5. Zamknij okno bez zapisu.

**Co powinno się stać**

- [ ] Przy każdej grupie jest licznik w formie „zaznaczone/wszystkie”, np. „0/4”.
- [ ] Po kroku 3 zaznaczają się wszystkie uprawnienia z tej grupy, licznik pokazuje pełną liczbę.
- [ ] Po kroku 4 zaznaczają się, a potem odznaczają wszystkie uprawnienia.
- [ ] „Zarządzanie zespołem” i „Rozliczenia” mają podpowiedź z „Nadaje wyłącznie właściciel.”
- [ ] Po kroku 5 żadna rola nie powstaje.

> Kod: `permission-accordion.tsx`; `messages/pl.json` · `permissions`

---

## Edycja i usuwanie

### ROL-030 · Edycja roli

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Przy roli z ROL-010 kliknij „⋯” → „Edytuj rolę”.
2. Zaznacz dodatkowo „Zlecenia”, zmień opis na `Wyceny i zlecenia`, zapisz.

**Co powinno się stać**

- [ ] Okno ma tytuł „Edycja roli”, pola wypełnione obecnymi danymi.
- [ ] Po zapisie pojawia się „Rola zapisana”; opis modułów w wierszu zawiera „Zlecenia”.

> Kod: `updateRole`

### ROL-031 · Role wbudowane są nieedytowalne

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Sprawdź wiersze „Właściciel”, „Administrator”, „Pracownik”, „Podgląd”.

**Co powinno się stać**

- [ ] Żaden z nich nie ma menu „⋯” ani możliwości edycji.

> Kod: `roles-content.tsx` — `!role.is_system && canManage`

### ROL-032 · Usunięcie roli, której nikt nie ma

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Przy roli z ROL-010 kliknij „⋯” → „Usuń”.
2. Przeczytaj okno i kliknij „Usuń”.

**Co powinno się stać**

- [ ] Okno „Usunąć tę rolę?” mówi: „<nazwa> zostanie usunięta. Nikt jej teraz nie ma.”
- [ ] Po kroku 2 pojawia się „Rola usunięta”, rola znika z listy.

> Kod: `deleteRole`; RPC `delete_company_role`

### ROL-033 · Usunięcie roli, którą ktoś ma

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Utwórz rolę `Do usunięcia <data>` z widocznością „Zlecenia”.
2. W „Członkowie zespołu” nadaj ją Podglądowi.
3. Wróć do „Role i uprawnienia”, usuń tę rolę.
4. Sprawdź rolę Podglądu w „Członkowie zespołu”.
5. Przywróć Podglądowi rolę „Podgląd”.

**Co powinno się stać**

- [ ] Okno usuwania mówi: „… 1 osoba przejdzie na rolę Pracownik.”
- [ ] Po usunięciu pojawia się „Rola usunięta. 1 osoba przeszła na rolę Pracownik.”
- [ ] Po kroku 4 Podgląd ma rolę „Pracownik”.

> Kod: migracja 063 — posiadacze usuniętej roli dostają `member`

---

## Rola w działaniu

### ROL-040 · Zmiana uprawnień roli działa od razu

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel (Alfa CNC) i Magazynier (Alfa CNC) — w dwóch przeglądarkach

**Co zrobić**

1. W przeglądarce 2 zaloguj się jako Magazynier. Sprawdź menu po lewej.
2. W przeglądarce 1 jako Właściciel edytuj rolę „Magazynier”: zaznacz „Wyceny”, zapisz.
3. W przeglądarce 2 odśwież stronę.
4. W przeglądarce 1 przywróć „Magazynier”: odznacz „Wyceny” (i to, co zaznaczyło się razem z nimi), zapisz.
5. W przeglądarce 2 odśwież stronę.

**Co powinno się stać**

- [ ] Po kroku 1 Magazynier widzi „Projekty” i „Zlecenia”.
- [ ] Po kroku 3 widzi też „Wyceny” i „Kontrahenci” i może je otworzyć (tylko do podglądu).
- [ ] Po kroku 5 „Wyceny” i „Kontrahenci” znowu znikają.

> Kod: `lib/module-access.ts` · `getModuleAccess` — rola czytana przy każdym żądaniu

### ROL-041 · Rola własna z edycją danych

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC) i Magazynier (Alfa CNC)

**Co zrobić**

1. Jako Właściciel edytuj rolę „Magazynier”: zaznacz „Edycja danych produkcyjnych”, zapisz.
2. Jako Magazynier otwórz „Kontrahenci” i spróbuj dodać kontrahenta `Magazynier <data>`.
3. Jako Właściciel przywróć rolę: tylko „Zlecenia” i „Projekty”, bez edycji.

**Co powinno się stać**

- [ ] Po kroku 2 Magazynier widzi wszystkie moduły i dodaje kontrahenta bez błędu.
- [ ] Po kroku 3 Magazynier znowu widzi tylko „Projekty” i „Zlecenia”.

> Kod: `hasPermission` + RLS `company_member_can`

### ROL-042 · Rola z uprawnieniami administratora nadawana tylko przez właściciela

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC), potem Administrator (Alfa CNC)

**Co zrobić**

1. Jako Właściciel utwórz rolę `Kierownik <data>` z „Zarządzanie zespołem” w grupie „Administracja”.
2. Zaloguj się jako Administrator, otwórz „Członkowie zespołu”, rozwiń listę ról przy Pracowniku.
3. Kliknij „Dodaj” i rozwiń listę ról w zaproszeniu.
4. Jako Właściciel usuń rolę „Kierownik…”.

**Co powinno się stać**

- [ ] W krokach 2 i 3 na liście **nie ma** roli „Kierownik…”.

> Kod: `isOwnerGrantedRole` — `OWNER_GRANTED_PERMISSIONS`: `members.manage`, `billing.manage`
