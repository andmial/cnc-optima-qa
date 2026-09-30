#!/usr/bin/env node
/**
 * qa — narzędzia do scenariuszy testów manualnych CNC Optima.
 *
 * Scenariusze żyją tutaj, a nie w repo aplikacji, więc nic nie pilnuje ich
 * zgodności z kodem przy zmianach. `zmiany` to zastępstwo: pokazuje, które
 * scenariusze mogły się zdezaktualizować od commita, na którym były pisane.
 *
 *   node scripts/qa.mjs checklist [krytyczny] [ważny] [dodatkowy]
 *       lista do zgłoszenia „Przebieg testów”; bez argumentów — wszystkie
 *
 *   node scripts/qa.mjs toc
 *       odświeża scenariusze/README.md (spis plików i liczby scenariuszy)
 *
 *   node scripts/qa.mjs lint
 *       duplikaty ID, odwołania do nieistniejących scenariuszy, słownictwo
 *       techniczne poza liniami `> Kod:`
 *
 *   node scripts/qa.mjs zmiany <ścieżka-do-cnc-optima> [od-commita]
 *       scenariusze, których pliki z linii `> Kod:` zmieniły się w
 *       origin/main od podanego commita, oraz scenariusze cytujące teksty
 *       z messages/pl.json, które się zmieniły. Domyślny commit bierze
 *       z zespol/README.md („`main` @ `abc1234`”).
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const SCENARIOS_DIR = join(ROOT, "scenariusze");
const TEAM_README = join(ROOT, "zespol/README.md");

/** Kolejność plików — od powłoki do strefy admina. */
const FILE_ORDER = [
  "nawigacja.md",
  "autoryzacja.md",
  "firmy.md",
  "kontrahenci.md",
  "wyceny.md",
  "zlecenia.md",
  "ustawienia.md",
  "zespol.md",
  "role.md",
  "rozliczenia.md",
  "admin.md",
];

const IMPORTANCE = ["krytyczny", "ważny", "dodatkowy"];

/**
 * Słowa, których tester nie powinien zobaczyć poza liniami `> Kod:`.
 * Trafienie to ostrzeżenie — czasem słowo pada w cudzysłowie jako tekst
 * z ekranu.
 */
const JARGON = [
  /\bRLS\b/,
  /\btoast/i,
  /rozbieżnoś/i,
  /\bR-\d{2}\b/,
  /\bP[012]\b/,
  /\bseed/i,
  /\bRPC\b/,
  /webhook/i,
];

const ID_RE = /\b(?:NAV|AUT|FIR|KON|WYC|ZLE|UST|ZES|ROL|ROZ|ADM)-\d{3}\b/g;

// ── wczytywanie ──────────────────────────────────────────────────────────────

function scenarioFiles() {
  const present = readdirSync(SCENARIOS_DIR).filter(
    (f) => f.endsWith(".md") && f !== "README.md",
  );
  const ordered = FILE_ORDER.filter((f) => present.includes(f));
  const rest = present.filter((f) => !FILE_ORDER.includes(f)).sort();
  return [...ordered, ...rest];
}

function read(file) {
  return readFileSync(join(SCENARIOS_DIR, file), "utf8");
}

function fileTitle(markdown) {
  return markdown.match(/^# (.+)$/m)?.[1] ?? "";
}

/** Scenariusze pliku: ID, tytuł, ważność, treść i linia `> Kod:`. */
function parseScenarios(markdown) {
  const blocks = markdown.split(/^(?=### )/m);
  const out = [];
  for (const block of blocks) {
    const heading = block.match(/^### ([A-Z]{3}-\d{3}) · (.+)$/m);
    if (!heading) continue;
    const importance =
      block.match(/\*\*Ważność:\*\* ([^·\n]+)/)?.[1].trim() ?? "?";
    const code = block
      .split("\n")
      .filter((l) => l.startsWith("> Kod:"))
      .join(" ");
    out.push({ id: heading[1], title: heading[2], importance, block, code });
  }
  return out;
}

function allScenarios() {
  return scenarioFiles().flatMap((file) =>
    parseScenarios(read(file)).map((s) => ({ ...s, file })),
  );
}

// ── polecenia ────────────────────────────────────────────────────────────────

function checklist(levels) {
  const wanted = levels.length ? levels : IMPORTANCE;
  const unknown = wanted.filter((l) => !IMPORTANCE.includes(l));
  if (unknown.length) {
    fail(
      `Nieznana ważność: ${unknown.join(", ")}. Dozwolone: ${IMPORTANCE.join(", ")}`,
    );
  }

  const out = [];
  let total = 0;
  for (const file of scenarioFiles()) {
    const source = read(file);
    const picked = parseScenarios(source).filter((s) =>
      wanted.includes(s.importance),
    );
    if (!picked.length) continue;
    total += picked.length;
    out.push(`### ${fileTitle(source)} — \`scenariusze/${file}\``, "");
    picked.forEach((s) =>
      out.push(`- [ ] ${s.id} · ${s.title} — ${s.importance}`),
    );
    out.push("");
  }
  out.unshift(`Scenariuszy: ${total} (${wanted.join(", ")})`, "");
  console.log(out.join("\n"));
}

function toc() {
  const rows = [];
  let total = 0;
  let critical = 0;
  for (const file of scenarioFiles()) {
    const source = read(file);
    const scenarios = parseScenarios(source);
    total += scenarios.length;
    critical += scenarios.filter((s) => s.importance === "krytyczny").length;
    rows.push(`| [${fileTitle(source)}](${file}) | ${scenarios.length} |`);
  }
  writeFileSync(
    join(SCENARIOS_DIR, "README.md"),
    [
      "# Scenariusze",
      "",
      "Pliki w kolejności, w jakiej najlepiej je przechodzić. Instrukcja: [README](../README.md).",
      "",
      "| Część aplikacji | Scenariuszy |",
      "| --- | ---: |",
      ...rows,
      "",
      `Razem: ${total}, w tym krytycznych: ${critical}.`,
      "",
    ].join("\n"),
  );
  console.log(
    `scenariusze/README.md: ${total} scenariuszy, ${critical} krytycznych`,
  );
}

function lint() {
  const scenarios = allScenarios();
  const problems = [];

  const seen = new Map();
  for (const s of scenarios) {
    if (seen.has(s.id))
      problems.push(`duplikat ${s.id}: ${seen.get(s.id)} i ${s.file}`);
    seen.set(s.id, s.file);
  }

  const texts = [
    ...scenarioFiles().map((f) => [`scenariusze/${f}`, read(f)]),
    ["README.md", readFileSync(join(ROOT, "README.md"), "utf8")],
  ];
  for (const [name, text] of texts) {
    for (const ref of new Set(text.match(ID_RE) ?? [])) {
      if (!seen.has(ref))
        problems.push(`${name}: odwołanie do nieistniejącego ${ref}`);
    }
    text.split("\n").forEach((line, i) => {
      if (line.startsWith("> Kod:")) return;
      if (JARGON.some((re) => re.test(line))) {
        problems.push(
          `${name}:${i + 1}: słownictwo techniczne — ${line.trim().slice(0, 90)}`,
        );
      }
    });
  }

  if (!problems.length) {
    console.log(`OK — ${scenarios.length} scenariuszy`);
    return;
  }
  problems.forEach((p) => console.log(`! ${p}`));
  process.exitCode = 1;
}

function zmiany(appArg, sinceArg) {
  if (!appArg)
    fail(
      "Użycie: node scripts/qa.mjs zmiany <ścieżka-do-cnc-optima> [od-commita]",
    );
  const app = resolve(appArg);
  const since =
    sinceArg ??
    readFileSync(TEAM_README, "utf8").match(/`main` @ `([0-9a-f]{7,40})`/)?.[1];
  if (!since)
    fail("Nie znalazłem commita bazowego — podaj go jako drugi argument.");

  const git = (...args) =>
    execFileSync("git", ["-C", app, ...args], {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });

  git("fetch", "--quiet", "origin");
  const head = git("rev-parse", "--short", "origin/main").trim();
  const changed = git("diff", "--name-only", `${since}..origin/main`)
    .split("\n")
    .filter(Boolean);

  console.log(
    `Zmiany w cnc-optima: ${since}..${head} — ${changed.length} plików\n`,
  );

  // 1. Pliki wskazane w liniach `> Kod:`.
  const byScenario = [];
  for (const s of allScenarios()) {
    const tokens = [...s.code.matchAll(/`([^`]+)`/g)]
      .map((m) => m[1].trim())
      .filter((t) => /\.(tsx?|mjs|sql|json|css)$/.test(t));
    const hits = changed.filter((path) =>
      tokens.some((t) => path === t || path.endsWith(`/${t}`)),
    );
    if (hits.length) byScenario.push({ s, hits });
  }

  if (byScenario.length) {
    console.log(
      "Scenariusze, których kod się zmienił — przeczytaj diff i sprawdź kroki:\n",
    );
    byScenario.forEach(({ s, hits }) =>
      console.log(
        `  ${s.id} · ${s.title} (${s.file})\n      ${hits.join(", ")}`,
      ),
    );
  } else {
    console.log("Żaden plik z linii `> Kod:` się nie zmienił.");
  }

  // 2. Teksty z ekranu cytowane w scenariuszach.
  if (!changed.includes("messages/pl.json")) {
    console.log("\nmessages/pl.json bez zmian — cytowane teksty aktualne.");
    return;
  }
  const flat = (json) => {
    const out = new Map();
    const walk = (o, p) =>
      Object.entries(o).forEach(([k, v]) =>
        typeof v === "object" && v !== null
          ? walk(v, `${p}${k}.`)
          : out.set(`${p}${k}`, String(v)),
      );
    walk(JSON.parse(json), "");
    return out;
  };
  const before = flat(git("show", `${since}:messages/pl.json`));
  const after = flat(git("show", "origin/main:messages/pl.json"));

  const stale = [];
  for (const [key, oldText] of before) {
    if (after.get(key) === oldText || oldText.length < 3) continue;
    const quoted = `„${oldText}”`;
    const users = allScenarios().filter((s) => s.block.includes(quoted));
    if (users.length)
      stale.push({ key, oldText, newText: after.get(key), users });
  }

  if (!stale.length) {
    console.log(
      "\nZmienione teksty w pl.json nie są cytowane w scenariuszach.",
    );
    return;
  }
  console.log("\nZmienione teksty z ekranu cytowane w scenariuszach:\n");
  stale.forEach(({ key, oldText, newText, users }) =>
    console.log(
      `  ${key}\n      było: „${oldText}”\n      jest: ${newText === undefined ? "(usunięty)" : `„${newText}”`}\n      w: ${users.map((u) => u.id).join(", ")}`,
    ),
  );
  console.log(
    `\nPo aktualizacji scenariuszy wpisz ${head} w zespol/README.md jako nowy commit bazowy.`,
  );
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

const [command, ...args] = process.argv.slice(2);
const commands = {
  checklist: () => checklist(args),
  toc: () => toc(),
  lint: () => lint(),
  zmiany: () => zmiany(args[0], args[1]),
};
if (commands[command]) commands[command]();
else
  fail(
    "Polecenia: checklist [ważność…] | toc | lint | zmiany <ścieżka-do-cnc-optima> [od-commita]",
  );
