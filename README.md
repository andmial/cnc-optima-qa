# Testy CNC Optima — instrukcja dla testera

Witaj! Ta instrukcja prowadzi Cię krok po kroku. Nie musisz znać się na
programowaniu — wszystko, czego potrzebujesz, jest opisane poniżej.

## Czym jest CNC Optima

CNC Optima to aplikacja w przeglądarce dla warsztatów, które obrabiają metal
na maszynach CNC. Warsztat prowadzi w niej listę swoich klientów
(„kontrahentów”), liczy ceny zleceń („wyceny”), prowadzi zamówienia
(„zlecenia”) i zaprasza współpracowników. Firma płaci abonament — „plan” albo
„pakiet”.

## Twoje zadanie w skrócie

1. Dostajesz od zespołu **przebieg testów** — listę scenariuszy do
   sprawdzenia (zgłoszenie „Przebieg testów” na GitHubie).
2. Każdy scenariusz to krótka instrukcja: co kliknąć i co powinno się stać.
3. Wykonujesz scenariusze po kolei i przy każdym zaznaczasz wynik.
4. Każdą rzecz, która działa inaczej niż w opisie, zgłaszasz jako **błąd**.
5. Na koniec piszesz krótkie podsumowanie.

Szczegóły każdego kroku są niżej.

---

## 1. Co musisz mieć

- [ ] Komputer z przeglądarką **Google Chrome** (najnowsza wersja).
- [ ] Konto na **GitHubie** — dostaniesz od zespołu zaproszenie do tego
      repozytorium. Konto zakładasz za darmo na github.com.
- [ ] Dostęp do **skrzynki testowej** — dane poniżej.
- [ ] Na części scenariuszy: drugą przeglądarkę (np. Safari albo Firefox)
      albo **okno prywatne** w Chrome (menu ⋮ → „Nowe okno incognito”).
      Pozwala być zalogowanym na dwa konta naraz.

## 2. Gdzie testujesz

| Co                       | Wartość                                  |
| ------------------------ | ---------------------------------------- |
| Adres aplikacji          | _uzupełni zespół_                        |
| Skrzynka testowa         | _uzupełni zespół (adres i hasło)_        |
| Wysyłka zaproszeń mailem | _włączona / wyłączona — uzupełni zespół_ |

> **Ważne:** testuj **tylko** pod adresem z tabeli. To środowisko testowe —
> możesz tam dodawać, zmieniać i usuwać, co chcesz. Nigdy nie testuj na
> prawdziwej aplikacji, z której korzystają klienci.

Dane na środowisku testowym są co jakiś czas przywracane do stanu
początkowego. Nie przejmuj się rekordami, które sam utworzysz.

## 3. Konta testowe

W scenariuszu przy **„Zaloguj się jako”** jest nazwa konta. Tu znajdziesz
jego adres i hasło.

| Nazwa w scenariuszu                  | Kim jest                                         | E-mail | Hasło |
| ------------------------------------ | ------------------------------------------------ | ------ | ----- |
| Właściciel (Alfa CNC)                | właściciel firmy Alfa CNC, pełne uprawnienia     | _…_    | _…_   |
| Administrator (Alfa CNC)             | zarządza zespołem i ustawieniami                 | _…_    | _…_   |
| Pracownik (Alfa CNC)                 | pracuje na danych, bez ustawień firmy            | _…_    | _…_   |
| Podgląd (Alfa CNC)                   | tylko ogląda, niczego nie zmienia                | _…_    | _…_   |
| Magazynier (Alfa CNC)                | widzi tylko zlecenia i projekty                  | _…_    | _…_   |
| Właściciel Beta (`starter`)          | właściciel małej firmy na darmowym planie        | _…_    | _…_   |
| Właściciel Delta Frez (`enterprise`) | właściciel firmy z umową indywidualną            | _…_    | _…_   |
| `bezfirmy`                           | konto, które nie należy do żadnej firmy          | _…_    | _…_   |
| `zaproszony`                         | konto z czekającym zaproszeniem                  | _…_    | _…_   |
| `google`                             | loguje się przyciskiem Google, nie hasłem        | _…_    | _…_   |
| Support                              | pracownik pomocy technicznej CNC Optima          | _…_    | _…_   |
| Superadmin                           | administrator CNC Optima z pełnymi uprawnieniami | _…_    | _…_   |

**Hasła są wspólne.** Jeśli scenariusz każe zmienić hasło, na końcu tego
samego scenariusza zawsze przywróć stare.

## 4. Dane do wpisywania

- **`<data>`** w scenariuszu znaczy: wpisz bieżącą datę i godzinę, np.
  `30.09 14:05`. Dzięki temu Twoje rekordy się nie powtarzają.
- **`<data bez spacji>`** — to samo bez spacji i kropek, np. `3009-1405`.
  Używane w adresach e-mail.
- **`tester+<cokolwiek>@<domena>`** — adres skrzynki testowej. Wszystko, co
  wpiszesz po `+`, trafia do tej samej skrzynki. Domenę podaje tabela w
  punkcie 2.
- **NIP-y istniejące w GUS:** _uzupełni zespół_
- **NIP-y nieistniejące w GUS:** _uzupełni zespół_
- **Link do wygasłego zaproszenia:** _uzupełni zespół_
- **Karty płatnicze:** tylko testowe, lista w pliku „Plany, płatności i
  faktury”. Nigdy nie wpisuj prawdziwej karty.
- **Pliki do wgrywania** (zdjęcia, logo) są w folderze
  [`pliki-testowe`](pliki-testowe/).

## 5. Słowniczek — co jest czym na ekranie

| Słowo w scenariuszu                 | Co to jest                                                                    |
| ----------------------------------- | ----------------------------------------------------------------------------- |
| **menu po lewej**                   | pionowy pasek z pozycjami „Wyceny”, „Zlecenia”, „Kontrahenci”…                |
| **górny pasek**                     | pasek na górze z tytułem ekranu, polem „Czego szukasz?” i kółkiem z inicjałem |
| **menu użytkownika**                | menu po kliknięciu kółka z inicjałem w prawym górnym rogu                     |
| **nazwa firmy w lewym górnym rogu** | nazwa i logo nad menu po lewej — kliknięcie otwiera listę firm                |
| **okno**                            | ramka na środku ekranu, reszta strony jest pod nią przyciemniona              |
| **komunikat**                       | krótki napis w **prawym dolnym rogu**, który znika po kilku sekundach         |
| **czerwony tekst pod polem**        | informacja o błędzie w konkretnym polu formularza                             |
| **„⋯” (trzy kropki)**               | przycisk, który otwiera menu z dodatkowymi akcjami                            |
| **wyszarzony przycisk**             | przycisk w bladym kolorze, który nie reaguje na kliknięcie                    |
| **dymek**                           | napis, który pojawia się, gdy przytrzymasz kursor nad przyciskiem             |
| **pasek adresu**                    | pole na samej górze przeglądarki z adresem strony                             |
| **odśwież stronę**                  | klawisz F5 (Windows) albo Cmd+R (Mac)                                         |
| **okno prywatne**                   | okno przeglądarki, w którym nie jesteś zalogowany (incognito)                 |
| **Esc, Tab, Enter**                 | klawisze na klawiaturze                                                       |
| **Ctrl+K / Cmd+K**                  | przytrzymaj Ctrl (Windows) albo Cmd (Mac) i naciśnij K                        |
| **„404”**                           | strona z informacją, że pod tym adresem niczego nie ma                        |

Wszystko w „cudzysłowie” to **dokładny napis** z ekranu. Jeśli na ekranie
jest inny napis — to też jest błąd do zgłoszenia (np. literówka).

## 6. Jak przejść jeden scenariusz

Scenariusze są w folderze [`scenariusze`](scenariusze/), jeden plik na
część aplikacji. Każdy wygląda tak:

```
### KON-010 · Dodanie kontrahenta z samą nazwą
Ważność: krytyczny · Zaloguj się jako: Pracownik (Alfa CNC)

Zanim zaczniesz: …            ← przygotowanie, jeśli potrzebne
Co zrobić                      ← kroki, po kolei
Co powinno się stać            ← lista rzeczy do sprawdzenia
Po scenariuszu: …              ← sprzątanie, jeśli potrzebne
```

Pod niektórymi scenariuszami jest szara linia zaczynająca się od **„Kod:”**
z nazwami plików. To notatka dla programistów — **pomiń ją**. Folder
[`zespol`](zespol/) też jest dla zespołu; nie musisz go czytać.

1. Przeczytaj cały scenariusz, zanim zaczniesz klikać.
2. Zaloguj się na konto z „Zaloguj się jako”. Jeśli jesteś zalogowany na
   inne — wyloguj się (menu użytkownika → „Wyloguj się”).
3. Wykonaj „Zanim zaczniesz”.
4. Wykonuj kroki dokładnie w podanej kolejności. Wartości w `takiej ramce`
   przepisuj dokładnie.
5. Sprawdź **każdy** punkt z „Co powinno się stać”.
6. Wykonaj „Po scenariuszu”, jeśli jest.
7. Zapisz wynik (punkt 7).

**Ważność** mówi, jak poważny byłby błąd: **krytyczny** — aplikacja jest
bezużyteczna, **ważny** — główna funkcja działa źle, **dodatkowy** —
drobiazg, szczegół, wygląd.

## 7. Przebieg testów — jak zapisywać wyniki

Zespół zakłada zgłoszenie „Przebieg testów” z listą scenariuszy. Ty je
wypełniasz:

| Wynik          | Kiedy                                                            | Co robisz                                                                      |
| -------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ✅ zaliczony   | wszystkie punkty „Co powinno się stać” się zgadzają              | zaznaczasz kwadrat przy scenariuszu                                            |
| ❌ błąd        | choć jeden punkt się nie zgadza                                  | zgłaszasz błąd (punkt 8), a przy scenariuszu dopisujesz `❌ #numer-zgłoszenia` |
| ⛔ zablokowany | nie da się go wykonać (np. nie działa logowanie, brakuje danych) | dopisujesz `⛔` i jednym zdaniem, co blokuje                                   |
| ❓ niejasny    | nie wiesz, co scenariusz każe zrobić albo sprawdzić              | dopisujesz `❓` i pytanie                                                      |

Jak edytować listę na GitHubie: otwórz zgłoszenie „Przebieg testów”, kliknij
„⋯” przy jego pierwszym wpisie → „Edit”. Kwadraty `[ ]` możesz też zaznaczać
bezpośrednio kliknięciem.

**Jeden błąd = jedno zgłoszenie.** Jeśli w jednym scenariuszu nie zgadzają
się dwa punkty z różnych powodów — dwa zgłoszenia.

## 8. Jak zgłosić błąd

1. Na GitHubie w tym repozytorium otwórz zakładkę **Issues** → **New issue**
   → wybierz **„Błąd”**.
2. Wypełnij formularz. Każde pole ma podpowiedź.
3. **Zawsze dodaj zrzut ekranu** — przeciągnij plik obrazka do pola
   „Zrzut ekranu” albo wklej go (Ctrl+V / Cmd+V).
4. Kliknij „Submit new issue”. Numer zgłoszenia (np. `#12`) dopisz w
   przebiegu testów przy scenariuszu.

**Zrzut ekranu:**

- Mac: Cmd+Shift+4, potem zaznacz myszką fragment ekranu. Plik ląduje na
  biurku.
- Windows: Win+Shift+S, zaznacz fragment. Obraz jest w schowku — wklej go
  od razu w zgłoszenie.
- Jeśli błąd to coś, co się dzieje (miga, znika, przeskakuje), nagraj
  krótki film: Mac — Cmd+Shift+5, Windows — Win+Alt+R.

**Dobre zgłoszenie:**

> **Tytuł:** KON-031 — przy złym kodzie pocztowym nie pojawia się błąd
>
> **Scenariusz:** KON-031, punkt 2
> **Konto:** Pracownik (Alfa CNC) · **Przeglądarka:** Chrome
> **Co zrobiłem:** Na karcie kontrahenta „Edycja 30.09 14:05” wpisałem w
> „Kod pocztowy” `00950` i kliknąłem „Zapisz kontrahenta”.
> **Co powinno się stać:** czerwony tekst „Nieprawidłowy format kodu
> pocztowego (NN-NNN)”.
> **Co się stało:** pojawił się komunikat „Zaktualizowano kontrahenta”,
> kod zapisał się bez kreski.
> **Zrzut ekranu:** (obrazek)

**Słabe zgłoszenie:** „Kod pocztowy nie działa.” — nie wiadomo, gdzie, jak
ani co miało się stać.

**Coś spoza scenariuszy?** Jeśli zauważysz błąd, literówkę albo coś
mylącego poza scenariuszem — zgłoś to szablonem **„Uwaga”**. Takie
obserwacje są bardzo cenne.

## 9. Co dostarczasz na koniec przebiegu

- [ ] Każdy scenariusz z przebiegu ma wynik: ✅, ❌, ⛔ albo ❓.
- [ ] Każdy ❌ ma zgłoszenie „Błąd” ze zrzutem ekranu i numerem dopisanym
      w przebiegu.
- [ ] Na końcu zgłoszenia „Przebieg testów” dodajesz komentarz
      z podsumowaniem:

```
Podsumowanie
- Adres i data testów:
- Przeglądarka i system:
- Czas pracy:
- Wyniki: ✅ … / ❌ … / ⛔ … / ❓ …
- Co było niejasne w scenariuszach:
- Ogólne wrażenia (co było trudne, co zaskakujące):
```

## 10. Czego na razie nie testujesz

- **Telefon.** Wersja na telefon jest w przygotowaniu. Scenariusze
  oznaczone „Ekran: telefon” oznacz jako ⛔ z dopiskiem „telefon”, chyba
  że zespół napisze inaczej w przebiegu.
- **Części aplikacji bez scenariuszy** (np. wyceny, zlecenia, logowanie) —
  scenariusze do nich pojawią się w kolejnych wersjach. Jeśli coś tam
  zauważysz, zgłoś jako „Uwaga”.

## 11. Zasady

- Nie wpisuj prawdziwych danych osobowych ani prawdziwych kart.
- Nie podawaj nikomu haseł z tej instrukcji.
- Jeśli coś blokuje Cię na dłużej niż 15 minut — dopisz ⛔ i idź dalej.
- Pytania do zespołu zadawaj w komentarzu pod zgłoszeniem „Przebieg testów”.
