# Ustawienia: okno, profil, firma

Ustawienia otwierają się jako okno nad bieżącym ekranem. Tutaj sprawdzasz
samo okno, profil użytkownika (dane, zdjęcie, hasło, język) i dane firmy
(nazwa, logo, adres). Zespół, role i płatności mają osobne pliki.

**Gdzie to jest:** menu po lewej → „Ustawienia” albo menu użytkownika →
„Ustawienia konta”.

---

## Okno ustawień

### UST-001 · Otwarcie ustawień z menu

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Otwórz „Kontrahenci”.
2. Kliknij „Ustawienia” w menu po lewej.
3. Przeczytaj menu po lewej stronie okna.

**Co powinno się stać**

- [ ] Nad listą kontrahentów otwiera się duże okno; lista jest widoczna w tle.
- [ ] Okno pokazuje zakładkę „Ogólne” z tytułem „Ustawienia organizacji”.
- [ ] Menu okna ma grupy: „Ustawienia organizacji” („Ogólne”, „Członkowie zespołu”, „Role i uprawnienia”, „Billingi i zużycie”, „Ulepsz plan”), „Ustawienia użytkownika” („Profil użytkownika”, „Powiadomienia”), „Ustawienia predefinowane” („Wyceny”), „Dane wejściowe” („Materiały”).
- [ ] „Wyceny” i „Materiały” są wyszarzone i nie dają się kliknąć.

> Kod: `settings-navigation-items.ts`, `@modal/(.)settings/layout.tsx`, `settings-dialog.tsx`

### UST-002 · Zamknięcie okna wraca do ekranu pod spodem

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Otwórz „Kontrahenci” i wpisz w wyszukiwanie `stal`.
2. Otwórz „Ustawienia”, przejdź na „Profil użytkownika”.
3. Zamknij okno krzyżykiem w prawym górnym rogu.
4. Otwórz ustawienia ponownie i zamknij je klawiszem Esc.

**Co powinno się stać**

- [ ] Po krokach 3 i 4 okno się zamyka i widać listę kontrahentów.
- [ ] W wyszukiwaniu nadal jest `stal`, a lista jest nadal zawężona.

> Kod: `settings-dialog.tsx` — `router.back()` przy przechwyconej trasie

### UST-003 · Teksty w menu ustawień

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Otwórz „Ustawienia” i przeczytaj nazwy grup i pozycji.
2. Otwórz „Billingi i zużycie” i przeczytaj tytuł zakładki.
3. Porównaj nazwę „Ulepsz plan” w oknie z pozycją „Ulepsz pakiet” w menu aplikacji.

**Co powinno się stać**

- [ ] W nazwach nie ma literówek (zwróć uwagę na „predefiniowane”).
- [ ] Pozycja w menu i tytuł zakładki brzmią tak samo.
- [ ] Ta sama czynność ma tę samą nazwę w menu aplikacji i w oknie ustawień.

> Kod: `messages/pl.json` · `settingsSidebar` — rozbieżność `R-09`

### UST-004 · Ustawienia otwarte z adresu

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Otwórz ustawienia na „Profil użytkownika”.
2. Odśwież stronę (F5 albo Cmd+R).
3. Zamknij okno krzyżykiem.

**Co powinno się stać**

- [ ] Po kroku 2 okno profilu otwiera się ponownie; w tle jest menu aplikacji, ale pusty obszar zamiast poprzedniego ekranu.
- [ ] Po kroku 3 otwiera się ekran „Wyceny”.

> Kod: `settings/layout.tsx` — `fallbackHref="/quotes"`

### UST-005 · Przechodzenie między zakładkami

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. W oknie ustawień klikaj po kolei: „Ogólne”, „Członkowie zespołu”, „Role i uprawnienia”, „Billingi i zużycie”, „Profil użytkownika”, „Powiadomienia”.
2. Kliknij „Wstecz” w przeglądarce.

**Co powinno się stać**

- [ ] Każda zakładka się otwiera, a jej pozycja w menu okna jest podświetlona.
- [ ] Przy przełączaniu na chwilę może pojawić się szary szkielet treści — potem właściwa treść.
- [ ] Po kroku 2 wracasz do poprzedniej zakładki.

> Kod: `settings/*/loading.tsx`

### UST-006 · Zakładki w budowie

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. W oknie ustawień kliknij „Powiadomienia”.
2. Dopisz do adresu aplikacji `/settings/integrations` i naciśnij Enter.

**Co powinno się stać**

- [ ] W obu przypadkach widać tekst „Ta sekcja jest w trakcie budowy. Wróć wkrótce.”

> Kod: `settings/notifications/page.tsx`, `settings/integrations/page.tsx`

### UST-007 · „Ulepsz plan” z okna ustawień

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. W oknie ustawień kliknij „Ulepsz plan”.

**Co powinno się stać**

- [ ] Okno ustawień się zamyka i otwiera się pełnoekranowa strona wyboru pakietu „Wybierz pakiet dopasowany do Twojego warsztatu”.

> Kod: `SettingsExitLink`, `(focus)/upgrade/page.tsx`

---

## Profil użytkownika

### UST-010 · Profil pokazuje dane konta

**Ważność:** krytyczny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz menu użytkownika → „Ustawienia konta”.

**Co powinno się stać**

- [ ] Tytuł zakładki to „Profil użytkownika”.
- [ ] Widać pola „Imię” i „Nazwisko” oraz zdjęcie albo kółko z inicjałem.
- [ ] W sekcji „Dane kontaktowe” pole „Adres e-mail” pokazuje adres logowania, jest wyszarzone, a pod nim jest tekst „Służy do logowania. Aby go zmienić, skontaktuj się z pomocą.”
- [ ] Jest sekcja „Bezpieczeństwo” z polami do zmiany hasła.
- [ ] W sekcji „Preferencje” jest „Język aplikacji” z podpisem „Zmiana języka przeładowuje stronę.”

> Kod: `settings/profile/profile-form.tsx`

### UST-011 · Zapis imienia i nazwiska

**Ważność:** krytyczny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Zanim zaczniesz:** zapisz obecne imię i nazwisko — na końcu je przywrócisz.

**Co zrobić**

1. W polu „Imię” wpisz `Testowy` i naciśnij Tab (przejdź do następnego pola). Nie klikaj żadnego „Zapisz”.
2. W polu „Nazwisko” wpisz `Użytkownik` i kliknij gdzieś obok pola.
3. Zamknij ustawienia, odśwież stronę i otwórz profil ponownie.
4. Przywróć poprzednie imię i nazwisko.

**Co powinno się stać**

- [ ] Po kroku 1 i po kroku 2 w prawym dolnym rogu pojawia się komunikat „Zapisano”.
- [ ] Po kroku 3 pola mają nowe wartości.
- [ ] Kółko w prawym górnym rogu (jeśli nie masz zdjęcia) pokazuje literę „T”.

> Kod: `profile-form.tsx` · `saveField` — zapis przy opuszczeniu pola

### UST-012 · Wyjście z pola bez zmiany

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Kliknij w pole „Imię”, niczego nie zmieniaj, naciśnij Tab.

**Co powinno się stać**

- [ ] Nie pojawia się komunikat „Zapisano”.

> Kod: `saveField` — zapis tylko przy `dirtyFields`

### UST-013 · Czyszczenie imienia

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Usuń całą zawartość pola „Imię” i naciśnij Tab.
2. Odśwież stronę.
3. Przywróć imię.

**Co powinno się stać**

- [ ] Po kroku 1 pojawia się „Zapisano”.
- [ ] Po kroku 2 kółko w prawym górnym rogu pokazuje pierwszą literę adresu e-mail.

> Kod: `updateUserProfile` — pusta wartość zapisuje się jako brak

### UST-014 · Długość pól profilu

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Spróbuj wpisać w „Imię” więcej niż 50 znaków.
2. Spróbuj wpisać w „Telefon” więcej niż 30 znaków.

**Co powinno się stać**

- [ ] Pole „Imię” nie przyjmuje więcej niż 50 znaków.
- [ ] Pole „Telefon” nie przyjmuje więcej niż 30 znaków.

> Kod: `profile-form.tsx` — `maxLength` 50 / 30

### UST-015 · Zapis telefonu

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. W polu „Telefon” wpisz `+48 600 100 200`, naciśnij Tab.
2. Odśwież stronę i otwórz profil.

**Co powinno się stać**

- [ ] Pojawia się „Zapisano”; po odświeżeniu numer jest w polu.

> Kod: `saveField('phone')`

### UST-016 · Dodanie, zmiana i usunięcie zdjęcia

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Zanim zaczniesz:** przygotuj dwa zdjęcia: JPG i PNG, każde mniejsze niż 2 MB. Pliki testowe są w folderze `pliki-testowe` w repo.

**Co zrobić**

1. W profilu kliknij „Dodaj zdjęcie” i wybierz plik JPG.
2. Kliknij „Zmień zdjęcie” i wybierz plik PNG.
3. Kliknij przycisk usuwania zdjęcia obok.

**Co powinno się stać**

- [ ] Pod przyciskiem jest podpowiedź „JPG, PNG lub WebP. Maks. 2 MB. Najlepiej sprawdzi się zdjęcie kwadratowe.”
- [ ] Po kroku 1 na przycisku widać „Przesyłanie…”, potem komunikat „Zdjęcie profilowe zaktualizowane”. Zdjęcie pojawia się w profilu i w kółku w prawym górnym rogu.
- [ ] Po kroku 2 zdjęcie zmienia się na nowe.
- [ ] Po kroku 3 pojawia się „Zdjęcie profilowe usunięte”, wraca kółko z inicjałem.

> Kod: `AvatarUploader`, `app/api/avatars/upload/route.ts`

### UST-017 · Za duże zdjęcie i zły format

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Zanim zaczniesz:** z folderu `pliki-testowe` weź: `za-duze-3mb.jpg`, `animacja.gif`, `rysunek.svg`.

**Co zrobić**

1. Kliknij „Dodaj zdjęcie”, wybierz `za-duze-3mb.jpg`.
2. Kliknij „Dodaj zdjęcie”. W oknie wyboru pliku przełącz filtr na „Wszystkie pliki” i wybierz `animacja.gif`.
3. To samo z `rysunek.svg`.

**Co powinno się stać**

- [ ] Po kroku 1 pojawia się komunikat „Plik jest za duży” z opisem „Maksymalny rozmiar to 2 MB.”
- [ ] Po krokach 2 i 3 pojawia się „Nieobsługiwany format pliku”.
- [ ] W żadnym przypadku zdjęcie się nie zmienia.

> Kod: `avatar-uploader.tsx` · `tooLarge`, `invalidFormat`; `avatars/upload/route.ts` — `ALLOWED_MIME_TYPES`

---

## Hasło

Zmieniasz hasło wspólnego konta testowego. **Zawsze przywracaj stare hasło
na końcu scenariusza** — inaczej kolejne osoby i scenariusze się nie zalogują.

### UST-020 · Zmiana hasła

**Ważność:** krytyczny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. W profilu, w sekcji „Bezpieczeństwo” wpisz:
   - „Obecne hasło”: hasło Pracownika z README
   - „Nowe hasło”: `Tymczasowe-Haslo-2026!`
   - powtórzenie nowego hasła: `Tymczasowe-Haslo-2026!`
2. Kliknij „Zmień hasło”.
3. Wyloguj się. Spróbuj zalogować się **starym** hasłem.
4. Zaloguj się hasłem `Tymczasowe-Haslo-2026!`.
5. Zmień hasło z powrotem na hasło z README (obecne: `Tymczasowe-Haslo-2026!`).

**Co powinno się stać**

- [ ] Po kroku 2 pojawia się „Hasło zostało zmienione”, a pola się czyszczą.
- [ ] Po kroku 3 logowanie się nie udaje.
- [ ] Po kroku 4 logowanie się udaje.
- [ ] Po kroku 5 hasło jest z powrotem takie jak w README.

> Kod: `app/actions/profile.ts` · `changePassword`

### UST-021 · Błędne obecne hasło

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. W „Obecne hasło” wpisz `zle-haslo-123`, w nowych polach dwa razy `Nowe-Haslo-2026!`.
2. Kliknij „Zmień hasło”.

**Co powinno się stać**

- [ ] Pojawia się komunikat „Obecne hasło jest nieprawidłowe”.
- [ ] Hasło się nie zmienia (sprawdź, logując się ponownie starym hasłem).

> Kod: `changePassword` — `signInWithPassword` → `PASSWORD_CURRENT_INVALID`

### UST-022 · Za krótkie nowe hasło

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Wpisz poprawne obecne hasło, a jako nowe dwa razy `abc123`.
2. Kliknij „Zmień hasło”.

**Co powinno się stać**

- [ ] Pod polem „Nowe hasło” pojawia się „Min. 8 znaków”.
- [ ] Hasło się nie zmienia.

> Kod: `password-section.tsx` — `PASSWORD_MIN_LENGTH = 8`

### UST-023 · Powtórzone hasło się nie zgadza

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Wpisz poprawne obecne hasło, jako nowe `Nowe-Haslo-2026!`, a w powtórzeniu `Nowe-Haslo-2027!`.
2. Kliknij „Zmień hasło”.

**Co powinno się stać**

- [ ] Pod polem powtórzenia pojawia się „Hasła nie są identyczne”.

> Kod: `password-section.tsx` · `refine` — `passwordsNotMatch`

### UST-024 · Nowe hasło takie samo jak obecne

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. We wszystkich trzech polach wpisz obecne hasło z README.
2. Kliknij „Zmień hasło”.

**Co powinno się stać**

- [ ] Pojawia się komunikat „Nowe hasło musi różnić się od obecnego”.

> Kod: `mapSupabaseAuthError` → `PASSWORD_SAME_AS_CURRENT`

### UST-025 · Wskaźnik siły hasła

**Ważność:** dodatkowy · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

Wpisuj w pole „Nowe hasło” po kolei (bez zapisywania) i patrz pod pole:

1. `haslo123`
2. `Pracownik2026` (albo inne słowo z Twojego imienia lub e-maila)
3. `Frezarka-Stal-Wrzesien`
4. `Frezarka-Stal-Wrzesien-Plan-2026!`

**Co powinno się stać**

- [ ] Pod polem widać „Siła hasła: …” z jednym z poziomów: „słabe”, „średnie”, „dobre”, „silne”.
- [ ] Poziom rośnie wraz z długością i złożonością hasła.
- [ ] Przy słabym haśle pojawia się podpowiedź, np. „To popularne hasło — łatwo je zgadnąć.” albo „Nie opieraj hasła na imieniu, nazwisku ani adresie e-mail.”

> Kod: `lib/password-strength.ts`

### UST-026 · Konto logujące się przez Google

**Ważność:** ważny · **Zaloguj się jako:** konto Google (`google`)

**Co zrobić**

1. Otwórz „Ustawienia konta”, przewiń do „Bezpieczeństwo”.

**Co powinno się stać**

- [ ] Zamiast pól hasła widać tekst „Logujesz się przez Google, więc nie ma tu hasła do zmiany. Zarządzasz nim w swoim koncie Google.”

> Kod: `profile-form.tsx` — `hasPassword = providers.includes('email')`

---

## Język w profilu

### UST-027 · Zmiana języka w profilu

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. W profilu, w „Preferencje”, kliknij pole „Język aplikacji” i wybierz „Angielski”.
2. Po przeładowaniu wróć na polski tym samym polem.

**Co powinno się stać**

- [ ] Po kroku 1 strona przeładowuje się i jest po angielsku; okno ustawień nadal jest otwarte na profilu.
- [ ] Po kroku 2 wszystko wraca na polski.

> Kod: `profile-form.tsx` · `LocaleField` → `setUserLocale`

---

## Dane firmy („Ogólne”)

### UST-030 · Zakładka „Ogólne” pokazuje dane firmy

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Otwórz „Ustawienia”.

**Co powinno się stać**

- [ ] Widać pole „Nazwa organizacji” z podpisem „Maksymalnie 30 znaków” i logo Alfa CNC.
- [ ] Sekcja „Dane firmowe”: „Nazwa firmy”, „NIP”, „Ulica”, „Dom”, „Lokal”, „Kod pocztowy”, „Miejscowość”.
- [ ] Sekcja „Dane kontaktowe”: „Telefon”, „E-mail”, „Strona www”.

> Kod: `settings/organisation/organisation-form.tsx`

### UST-031 · Zmiana nazwy organizacji

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. W „Nazwa organizacji” dopisz na końcu ` Test` i naciśnij Tab.
2. Zamknij ustawienia.
3. Przywróć nazwę „Alfa CNC”.

**Co powinno się stać**

- [ ] Po kroku 1 pojawia się „Zapisano”.
- [ ] Nazwa w lewym górnym rogu aplikacji zmienia się na nową — bez odświeżania strony.
- [ ] Po kroku 3 wraca „Alfa CNC”.

> Kod: `app/actions/organisation.ts` · `updateCompany` — `revalidatePath('/', 'layout')`

### UST-032 · Za krótka lub pusta nazwa organizacji

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Wpisz w „Nazwa organizacji” jedną literę `A` i naciśnij Tab.
2. Usuń całą nazwę i naciśnij Tab.
3. Spróbuj wpisać nazwę dłuższą niż 30 znaków.
4. Przywróć „Alfa CNC”.

**Co powinno się stać**

- [ ] Po krokach 1 i 2 pod polem pojawia się „Min. 2 znaki”, a „Zapisano” się **nie** pojawia.
- [ ] Po odświeżeniu strony nazwa to nadal „Alfa CNC”.
- [ ] Po kroku 3 pole nie przyjmuje więcej niż 30 znaków.

> Kod: `organisation-form.tsx` · `createSchema` — `name` min 2, max 30

### UST-033 · Walidacja danych firmy

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Zanim zaczniesz:** zapisz obecne wartości NIP, kodu pocztowego, e-maila i strony www — przywrócisz je.

**Co zrobić**

Wpisuj po kolei i naciskaj Tab po każdym:

1. „NIP”: `12345`
2. „Kod pocztowy”: `12345`
3. „E-mail”: `biuro@`
4. „Strona www”: `alfa-cnc` (bez `https://`)
5. „Strona www”: `https://alfa-cnc.pl`

**Co powinno się stać**

- [ ] 1: „NIP musi składać się z 10 cyfr”, bez „Zapisano”.
- [ ] 2: „Format: XX-XXX”, bez „Zapisano”.
- [ ] 3: „Nieprawidłowy adres e-mail”, bez „Zapisano”.
- [ ] 4: „Nieprawidłowy adres URL”, bez „Zapisano”.
- [ ] 5: „Zapisano”.
- [ ] Po przywróceniu starych wartości każda zapisuje się z „Zapisano”.

> Kod: `organisation-form.tsx` · `createSchema`

### UST-034 · Pola adresu zapisują się pojedynczo

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Zmień „Ulica” na `Testowa`, naciśnij Tab.
2. Zmień „Telefon” na `+48 22 000 00 00`, naciśnij Tab.
3. Odśwież stronę.
4. Przywróć poprzednie wartości.

**Co powinno się stać**

- [ ] Po krokach 1 i 2 pojawia się „Zapisano”.
- [ ] Po kroku 3 obie wartości są zapisane.

> Kod: `organisation-form.tsx` · `saveField`

### UST-035 · Logo firmy

**Ważność:** ważny · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Zanim zaczniesz:** Beta Obróbka nie ma logo. Weź `logo.png` z folderu `pliki-testowe`.

**Co zrobić**

1. W zakładce „Ogólne” kliknij „Dodaj logo” i wybierz `logo.png`.
2. Kliknij przycisk „Usuń” obok logo.

**Co powinno się stać**

- [ ] Pod logo jest podpowiedź „Wspieramy PNG, JPG, WebP (max 2 MB).”
- [ ] Po kroku 1 pojawia się „Logo zaktualizowane”, logo pojawia się w ustawieniach i w lewym górnym rogu aplikacji.
- [ ] Po kroku 2 pojawia się „Logo usunięte”, w rogu wraca kwadrat z literą „B”.

> Kod: `organisation-form.tsx` · `handleLogoChange`, `app/api/logos/upload/route.ts`

### UST-036 · Logo za duże albo w złym formacie

**Ważność:** ważny · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Co zrobić**

1. „Dodaj logo” → `za-duze-3mb.jpg`.
2. „Dodaj logo” → filtr „Wszystkie pliki” → `rysunek.svg`.

**Co powinno się stać**

- [ ] Po kroku 1: komunikat „Plik jest za duży” z opisem „Maksymalny rozmiar logo to 2 MB.”
- [ ] Po kroku 2: komunikat o nieobsługiwanym formacie.
- [ ] Logo się nie zmienia.

> Kod: `logos/upload/route.ts`; migracja 067 — bucket bez SVG

### UST-037 · Dane firmy w rozliczeniach

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. W „Ogólne” odczytaj „Nazwa firmy”, „E-mail”, adres i „NIP”.
2. Przejdź na „Billingi i zużycie”, sekcja „Dane billingów i płatności”.

**Co powinno się stać**

- [ ] „Nazwa firmy”, „Adres email”, „Adres” i „NIP” w rozliczeniach są takie same jak w „Ogólne”.

> Kod: `settings/billing/page.tsx` — `billingData` z `companies`

---

## Uprawnienia do ustawień firmy

### UST-040 · Pracownik nie zmienia danych firmy

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz „Ustawienia” → „Ogólne”.
2. Spróbuj kliknąć w „Nazwa organizacji” i coś wpisać.
3. Spróbuj kliknąć „Dodaj logo”.

**Co powinno się stać**

- [ ] Dane firmy są widoczne.
- [ ] Żadnego pola nie da się edytować, przycisk logo nie reaguje.

> Kod: `organisation-form.tsx` — `fieldset disabled` przy `useWriteBlock('settings.manage')`

### UST-041 · Administrator zmienia dane firmy

**Ważność:** ważny · **Zaloguj się jako:** Administrator (Alfa CNC)

**Co zrobić**

1. Otwórz „Ustawienia” → „Ogólne”.
2. Zmień „Miejscowość” na `Test`, naciśnij Tab, potem przywróć poprzednią.

**Co powinno się stać**

- [ ] Oba zapisy kończą się komunikatem „Zapisano”.

> Kod: `SYSTEM_ROLE_PERMISSIONS.admin` — `settings.manage`

### UST-042 · Firma zawieszona

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel (Alfa CNC) → przełącz na Gamma Metal

**Co zrobić**

1. Przełącz firmę na „Gamma Metal”.
2. Otwórz „Ustawienia” → „Ogólne”, spróbuj edytować nazwę.
3. Otwórz „Profil użytkownika” i zmień „Telefon”.

**Co powinno się stać**

- [ ] Dane firmy Gamma są widoczne, ale żadnego pola nie da się edytować.
- [ ] Profil użytkownika **da się** zmienić — to Twoje konto, nie dane firmy.

> Kod: `lib/write-access.ts` — `suspended`; `user_profiles` nie podlega blokadzie firmy

**Po scenariuszu:** przełącz się z powrotem na „Alfa CNC” i przywróć telefon.
