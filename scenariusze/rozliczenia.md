# Plany, płatności i faktury

Firma korzysta z planu Starter (darmowy), Pro, Business albo Enterprise
(umowa indywidualna). Płatności obsługuje Stripe — zewnętrzny serwis
płatniczy. Na środowisku testowym płacisz **kartami testowymi**, żadne
pieniądze nie są pobierane.

**Gdzie to jest:** „Ustawienia” → „Billingi i zużycie” oraz menu po lewej →
„Ulepsz pakiet”.

**Karty testowe** (data ważności: dowolna przyszła, CVC: dowolne 3 cyfry,
kod pocztowy: dowolny):

| Numer karty           | Co się dzieje                                    |
| --------------------- | ------------------------------------------------ |
| `4242 4242 4242 4242` | płatność przechodzi                              |
| `4000 0000 0000 0002` | bank odrzuca kartę                               |
| `4000 0025 0000 3155` | bank prosi o dodatkowe potwierdzenie (3D Secure) |
| `5555 5555 5555 4444` | Mastercard, płatność przechodzi                  |

**Nigdy nie wpisuj prawdziwej karty.**

---

## Strona wyboru pakietu

### ROZ-001 · Strona pakietów

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Co zrobić**

1. Kliknij „Ulepsz pakiet” w menu po lewej.

**Co powinno się stać**

- [ ] Otwiera się pełnoekranowa strona „Wybierz pakiet dopasowany do Twojego warsztatu” z podtytułem „Zacznij za darmo, rozwijaj się w swoim tempie. Zmień lub anuluj plan w dowolnej chwili.”
- [ ] Są trzy karty: „Starter” („Bezpłatnie”), „Pro” (149 zł/mies, oznaczenie „Najpopularniejszy”), „Business” (399 zł/mies).
- [ ] Na karcie „Starter” przycisk „Aktualny plan” jest wyszarzony.
- [ ] Na kartach Pro i Business są przyciski „Ulepsz do Pro” i „Ulepsz do Business”.
- [ ] Pod kartami jest „Wszystkie ceny w PLN, netto. Do każdej płatności wystawiamy fakturę VAT.”
- [ ] Nie ma karty „Enterprise”.

> Kod: `(focus)/upgrade/upgrade-plans.tsx`, `lib/plans.ts`

### ROZ-002 · Ceny przy płatności rocznej

**Ważność:** ważny · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Co zrobić**

1. Na stronie pakietów przełącz „Miesięcznie” na „Rocznie”.

**Co powinno się stać**

- [ ] Pro pokazuje 124 zł/mies i „Płatne rocznie — 1488 zł/rok”.
- [ ] Business pokazuje 331 zł/mies i „Płatne rocznie — 3972 zł/rok”.
- [ ] Starter nadal „Bezpłatnie”.
- [ ] Po powrocie na „Miesięcznie” wracają ceny 149 i 399 z dopiskiem „Płatne miesięcznie”.

> Kod: `annualMonthlyPrice` — rabat 17%, zaokrąglenie

### ROZ-003 · Funkcje oznaczone „Wkrótce”

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Co zrobić**

1. Przeczytaj listy funkcji na kartach Pro i Business.

**Co powinno się stać**

- [ ] Kredyty OperatorAI, szablony (presety) i biblioteka materiałów są pod nagłówkiem „Wkrótce:” i mają inną, szarą ikonę.
- [ ] Pozostałe funkcje mają zieloną ikonę.

> Kod: `COMING_SOON_FEATURES`

### ROZ-004 · Powrót ze strony pakietów

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Otwórz „Kontrahenci”, kliknij „Ulepsz pakiet” w menu, kliknij „Wróć”.
2. Otwórz „Ustawienia” → „Billingi i zużycie”, kliknij „Ulepsz pakiet”, kliknij link powrotu.
3. Otwórz „Ustawienia” → „Role i uprawnienia” jako `starter` (Beta), kliknij „Zmień plan”, kliknij link powrotu.

**Co powinno się stać**

- [ ] Po kroku 1 wracasz do „Kontrahenci”.
- [ ] Po krokach 2 i 3 link nazywa się „Wróć do ustawień” i wraca do zakładki, z której przyszedłeś.

> Kod: `upgrade/back-link.tsx`, `upgrade/lib/return-href.ts` — parametr `from`

---

## Strona „Billingi i zużycie”

### ROZ-020 · Plan darmowy i jego limity

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Co zrobić**

1. Otwórz „Ustawienia” → „Billingi i zużycie”.
2. Otwórz „Wyceny” i spróbuj utworzyć czwartą wycenę w tym miesiącu.

**Co powinno się stać**

- [ ] „Aktualny plan”: „Starter” z tekstem „Korzystasz z darmowego planu Starter — bez opłat. Ulepsz pakiet, aby odblokować więcej wycen, kontrahentów i OperatorAI.”
- [ ] W „Użycie w obecnym okresie rozliczeniowym” liczniki pokazują: „Wyceny” — 3 wykorzystane z 3 (dopisek „Odnawia się co miesiąc”), „Kontrahenci” — 9 z 10 („Nie odnawia się — zależy od planu”), „Użytkownicy” — 1 z 1 („w cenie pakietu”).
- [ ] Przy wycenach i kontrahentach są linki „Zarządzaj”, przy użytkownikach „Zarządzaj zespołem”.
- [ ] Po kroku 2 aplikacja **nie** pozwala utworzyć czwartej wyceny i proponuje zmianę planu.

> Kod: `getUsageStats`, `effectiveLimits`. Limit wycen i kontrahentów nie jest egzekwowany — rozbieżność `R-01`

### ROZ-021 · Plan płatny na stronie rozliczeń

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. Otwórz „Billingi i zużycie”.

**Co powinno się stać**

- [ ] „Aktualny plan”: „Business”, cena 399 zł/mies i „Odnawia się <data>”.
- [ ] Rozbicie kosztów: „Opłata podstawowa”, „Dodatkowi użytkownicy”, „Razem”.
- [ ] Wyceny i kontrahenci pokazują „bez limitu”, użytkownicy — limit 10.
- [ ] „Dane billingów i płatności” pokazuje nazwę firmy, e-mail, adres i NIP.
- [ ] „Metoda płatności” pokazuje kartę i tekst „Dane karty są szyfrowane przez Stripe”.

> Kod: `settings/billing/page.tsx`

### ROZ-022 · Historia faktur

**Ważność:** ważny · **Zaloguj się jako:** Właściciel (Alfa CNC)

**Co zrobić**

1. W „Historia faktur” przejrzyj kolumny.
2. Przy pierwszej fakturze kliknij „Pobierz PDF”.
3. Przy pierwszej fakturze kliknij „Podejrzyj u Stripe”.
4. Jeśli faktur jest więcej niż 6, kliknij „Pokaż więcej”.

**Co powinno się stać**

- [ ] Kolumny: „Numer faktury”, „Data”, „Kwota”, „Status”, „Akcje”.
- [ ] Statusy są po polsku: „Opłacona”, „Do zapłaty”, „Nieopłacona” albo „Anulowana”.
- [ ] Po kroku 2 pobiera się albo otwiera PDF faktury.
- [ ] Po kroku 3 otwiera się strona faktury w Stripe.
- [ ] Po kroku 4 widać wszystkie faktury.

> Kod: `invoice-history.tsx` — `VISIBLE_LIMIT = 6`; `downloadInvoice`, `previewInvoice`

### ROZ-023 · Firma bez faktur i bez karty

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Co zrobić**

1. Otwórz „Billingi i zużycie”.
2. Kliknij „Zmień metodę płatności”.

**Co powinno się stać**

- [ ] „Historia faktur” pokazuje „Brak faktur. Pierwsza pojawi się po pierwszej płatności.”
- [ ] „Metoda płatności” pokazuje „Brak zapisanej metody płatności.”
- [ ] Po kroku 2 aplikacja wyjaśnia zrozumiale, że kartę dodaje się przy zakupie planu — nie pokazuje technicznego błędu.

> Kod: `createBillingPortalSession` → `BILLING_ACCOUNT_NOT_FOUND` („Brak konta rozliczeniowego”) — rozbieżność `R-14`

### ROZ-024 · Brak danych do faktury

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Zanim zaczniesz:** w „Ogólne” wyczyść u Bety „Nazwa firmy”, „E-mail”, adres i „NIP” (zapisz sobie wartości).

**Co zrobić**

1. Otwórz „Billingi i zużycie”.
2. Kliknij „Zmień dane do billingu”.
3. Przywróć dane w „Ogólne”.

**Co powinno się stać**

- [ ] W „Dane billingów i płatności” widać „Dodaj dane firmy, aby otrzymywać faktury VAT.”
- [ ] Po kroku 2 otwiera się zakładka „Ogólne”.

> Kod: `settings/billing/page.tsx` · `billingDataEmpty`

### ROZ-025 · Plan z umową indywidualną

**Ważność:** ważny · **Zaloguj się jako:** Właściciel Delta Frez (`enterprise`)

**Co zrobić**

1. Otwórz „Billingi i zużycie”.
2. Kliknij „Ulepsz pakiet” w menu. Kliknij „Zmień na Pro”.

**Co powinno się stać**

- [ ] „Aktualny plan”: „Enterprise”.
- [ ] Na stronie pakietów jest też karta „Enterprise” z wyszarzonym „Aktualny plan”.
- [ ] Po kroku 2 pojawia się komunikat „Twój plan jest objęty indywidualną umową. Skontaktuj się z nami, aby go zmienić.” — bez przejścia do Stripe.

> Kod: `createCheckoutSession` → `BILLING_MANAGED_MANUALLY`; `UpgradePlans` — karta bieżącego planu spoza oferty

---

## Uprawnienia

### ROZ-030 · Pracownik a rozliczenia

**Ważność:** ważny · **Zaloguj się jako:** Pracownik (Alfa CNC)

**Co zrobić**

1. Otwórz „Billingi i zużycie”.
2. Kliknij „Zmień metodę płatności”.
3. Otwórz stronę pakietów, najedź na „Zmień na Pro”.

**Co powinno się stać**

- [ ] Plan i użycie są widoczne.
- [ ] W „Historia faktur” zamiast faktur jest „Historię faktur widzą osoby z uprawnieniem do rozliczeń.”
- [ ] Po kroku 2 pojawia się komunikat „Brak uprawnień”, portal się nie otwiera.
- [ ] Po kroku 3 przyciski zmiany planu są wyszarzone, z dymkiem o roli tylko do przeglądania.

> Kod: `canWrite('billing.manage')`; `PlanCta` — `useWriteBlock('billing.manage')`

### ROZ-031 · Administrator zarządza rozliczeniami

**Ważność:** ważny · **Zaloguj się jako:** Administrator (Alfa CNC)

**Co zrobić**

1. Otwórz „Billingi i zużycie”, sprawdź historię faktur.
2. Kliknij „Zmień metodę płatności”, zamknij portal bez zmian.

**Co powinno się stać**

- [ ] Faktury są widoczne.
- [ ] Portal Stripe się otwiera.

> Kod: `SYSTEM_ROLE_PERMISSIONS.admin` — `billing.manage`

### ROZ-032 · Firma zawieszona

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel (Alfa CNC) → przełącz na Gamma Metal

**Co zrobić**

1. Przełącz na „Gamma Metal”, otwórz stronę pakietów.
2. Najedź na przyciski zmiany planu.

**Co powinno się stać**

- [ ] Przyciski są wyszarzone z dymkiem „Firma jest zawieszona — dane można teraz tylko przeglądać.”

> Kod: `lib/write-access.ts` — `suspended`

**Po scenariuszu:** przełącz się z powrotem na „Alfa CNC”.

---

## Zakup i zmiana planu

**Zanim zaczniesz tę sekcję:** scenariusze ROZ-040…ROZ-047 wykonuj w
kolejności, na firmie Beta Obróbka, i dopiero po wszystkich wcześniejszych
scenariuszach z tego pliku. Zmieniają plan Bety — zespół przywraca go po
przebiegu.

### ROZ-040 · Zakup planu Pro

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Co zrobić**

1. Na stronie pakietów, w trybie „Miesięcznie”, kliknij „Ulepsz do Pro”.
2. Na stronie płatności Stripe wpisz kartę `4242 4242 4242 4242`, dowolną przyszłą datę i CVC. Zapłać.
3. Poczekaj na powrót do aplikacji.
4. Jeśli plan się jeszcze nie zmienił, odczekaj 30 sekund i odśwież stronę.

**Co powinno się stać**

- [ ] Po kroku 1 otwiera się strona płatności Stripe z oznaczeniem trybu testowego, kwotą 149 zł i nazwą planu Pro.
- [ ] Po kroku 3 wracasz do „Billingi i zużycie” i widzisz potwierdzenie, że płatność się udała.
- [ ] Najpóźniej po kroku 4 „Aktualny plan” to „Pro”, z datą „Odnawia się <data za miesiąc>”.
- [ ] W „Metoda płatności” widać znak Visa i „···· ···· ···· 4242”.
- [ ] W „Historia faktur” jest faktura ze statusem „Opłacona” i kwotą planu Pro.
- [ ] „Użytkownicy” w sekcji użycia pokazują limit 3.

> Kod: `createCheckoutSession`, `app/api/webhooks/stripe/route.ts`. Powrót na `?checkout=success` nie pokazuje komunikatu — rozbieżność `R-10`

### ROZ-041 · Rezygnacja na stronie płatności

**Ważność:** ważny · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Co zrobić**

1. Na stronie pakietów kliknij „Ulepsz do Business”.
2. Na stronie Stripe kliknij strzałkę powrotu w lewym górnym rogu (bez płacenia).

**Co powinno się stać**

- [ ] Wracasz na stronę pakietów z informacją, że płatność została przerwana i nic nie zostało pobrane.
- [ ] Plan się nie zmienia.

> Kod: `checkoutCancelUrl` — `?checkout=canceled`; rozbieżność `R-10`

### ROZ-042 · Zmiana z Pro na Business

**Ważność:** krytyczny · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Zanim zaczniesz:** Beta ma plan Pro po ROZ-040.

**Co zrobić**

1. Na stronie pakietów kliknij „Ulepsz do Business”, zapłać kartą `4242 4242 4242 4242`.
2. Po powrocie odczekaj 30 sekund i odśwież „Billingi i zużycie”.
3. Kliknij „Zmień metodę płatności” — otworzy się portal Stripe.
4. W portalu przeczytaj sekcję z bieżącymi planami (subskrypcjami).

**Co powinno się stać**

- [ ] Po kroku 2 „Aktualny plan” to „Business”.
- [ ] W portalu jest **dokładnie jedna** aktywna subskrypcja — Business. Pro nie jest już aktywny.
- [ ] Nie ma drugiej opłaty za Pro w kolejnym okresie.

> Kod: nowy Checkout nie anuluje poprzedniej subskrypcji — rozbieżność `R-02`

### ROZ-043 · Powrót na plan darmowy

**Ważność:** ważny · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Zanim zaczniesz:** Beta ma plan płatny (po ROZ-040 albo ROZ-042).

**Co zrobić**

1. Na stronie pakietów kliknij „Zmień na Starter”.

**Co powinno się stać**

- [ ] Aplikacja prowadzi do rezygnacji z planu płatnego (np. otwiera portal Stripe) albo wyjaśnia, jak to zrobić.
- [ ] Przycisk nie może nic nie robić.

> Kod: `PlanCta` · `handleUpgrade` — `if (plan === 'starter') return`. Rozbieżność `R-03`

### ROZ-044 · Odrzucona karta

**Ważność:** ważny · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Co zrobić**

1. Na stronie pakietów kliknij ulepszenie do dowolnego wyższego planu.
2. Na stronie Stripe wpisz kartę `4000 0000 0000 0002` i spróbuj zapłacić.
3. Wróć do aplikacji strzałką na stronie Stripe.

**Co powinno się stać**

- [ ] Po kroku 2 Stripe pokazuje, że karta została odrzucona, i zostaje na stronie płatności.
- [ ] Po kroku 3 plan się nie zmienił.

> Kod: Stripe Checkout; webhook nie dostaje `checkout.session.completed`

### ROZ-045 · Karta z dodatkowym potwierdzeniem

**Ważność:** dodatkowy · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Co zrobić**

1. Rozpocznij ulepszenie planu, użyj karty `4000 0025 0000 3155`.
2. W okienku potwierdzenia banku kliknij przycisk zatwierdzenia (np. „Complete”).

**Co powinno się stać**

- [ ] Pojawia się okienko testowego potwierdzenia 3D Secure.
- [ ] Po zatwierdzeniu płatność przechodzi i plan się zmienia, tak jak w ROZ-040.

> Kod: Stripe Checkout — 3DS

### ROZ-046 · Anulowanie i wznowienie subskrypcji

**Ważność:** ważny · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Zanim zaczniesz:** Beta ma plan płatny.

**Co zrobić**

1. W „Billingi i zużycie” kliknij „Zmień metodę płatności”.
2. W portalu Stripe anuluj subskrypcję. Wróć do aplikacji linkiem w portalu.
3. Odczekaj 30 sekund, odśwież stronę.
4. Otwórz portal ponownie, wznów subskrypcję, wróć do aplikacji, odśwież po 30 sekundach.

**Co powinno się stać**

- [ ] Po kroku 3 przy planie widać ostrzeżenie „Anuluje się <data końca okresu>”; plan nadal jest płatny do tej daty.
- [ ] Po kroku 4 znów widać „Odnawia się <data>”.

> Kod: `settings/billing/page.tsx` — `cancel_at_period_end`

### ROZ-047 · Zmiana karty

**Ważność:** ważny · **Zaloguj się jako:** Właściciel Beta (`starter`)

**Co zrobić**

1. Kliknij „Zmień metodę płatności”.
2. W portalu dodaj kartę `5555 5555 5555 4444`, ustaw ją jako domyślną, usuń starą.
3. Wróć do aplikacji linkiem w portalu.

**Co powinno się stać**

- [ ] Po powrocie „Metoda płatności” pokazuje znak Mastercard i „···· ···· ···· 4444” — od razu, bez czekania.

> Kod: `syncPaymentMethodSnapshot` — `?portal=return`
