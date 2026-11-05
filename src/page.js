// Pre-built: you don't need to edit this.
// Builds the HTML for your Droid's ID card. Mission 2 only fills in the data (character.js).
// Everything that comes from env or from SWAPI is escaped. The look lives in public/style.css,
// the droid picture is drawn by public/avatars.js, the planet theme is picked in theme.js.
import { avatarSeed } from "./avatar.js";
import { themeFor } from "./theme.js";

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// One row of the card. Missing values show as "unknown".
function row(label, value, unit = "") {
  const text = value ? `${esc(value)}${unit}` : "unknown";
  return `<div><dt>${label}</dt><dd>${text}</dd></div>`;
}

const SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>';
const MOON = '<path d="M20.5 13A9 9 0 0 1 11 3.5 9 9 0 1 0 20.5 13Z"/>';
const SYSTEM = '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>';
const icon = (paths, cls) =>
  `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

// The films row: one title per line.
function filmsRow(films) {
  if (!films?.length) return row("Films", null);
  const items = films.map((title) => `<li>${esc(title)}</li>`).join("");
  return `<div><dt>Films</dt><dd><ul class="films">${items}</ul></dd></div>`;
}

export function renderPage(env, character, colo, origin) {
  const name = esc(env.NAME);
  const tagline = esc(env.TAGLINE);
  const emoji = esc(env.EMOJI);
  const theme = themeFor(character);
  const planet = character.homeworld;
  const seed = esc(avatarSeed(origin));
  const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])/.test(origin);

  // Until Mission 2 works, every row says "unknown" and a hint shows.
  const ready = !character.isPlaceholder;
  const c = ready ? character : {};
  const hint = ready
    ? ""
    : `<p class="hint"><strong>Character: unknown.</strong> Finish Mission 2 to load your character.
        <small>Already done? SWAPI may be down: check <code>npx wrangler tail</code>.</small></p>`;
  const localNote = isLocal ? " · your droid matches the Hub once deployed" : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <title>${name}</title>
  <script src="/theme.js"></script>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="/jetbrains-mono-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/tokens.css">
  <link rel="stylesheet" href="/style.css">
</head>
<body class="${theme}">
  <header class="topbar">
    <span class="brand">ISCTE <span class="light">/ Droid ID</span></span>
    <button class="theme-button" type="button" aria-label="Change color theme">
      ${icon(SUN, "theme-sun")}${icon(MOON, "theme-moon")}${icon(SYSTEM, "theme-system")}
    </button>
  </header>
  <main>
    <section class="hero">
      <span class="avatar-slot" data-avatar-seed="${seed}"></span>
      <div class="nameplate">
        <h1>${name} <span aria-hidden="true">${emoji}</span></h1>
        <p>${tagline}</p>
      </div>
    </section>
    <section class="card" aria-label="Droid ID card">
      <h2>Droid ID card</h2>
      ${hint}
      <dl>
        ${row("Character", c.name)}
        ${row("Height", c.height, " cm")}
        ${row("Mass", c.mass, " kg")}
        ${row("Born", c.birthYear)}
        ${row("Homeworld", planet?.name)}
        ${row("Climate", planet?.climate)}
        ${row("Terrain", planet?.terrain)}
        ${filmsRow(c.films)}
      </dl>
    </section>
  </main>
  <footer>Served from ${esc(colo)}${localNote}</footer>
  <script src="/theme-toggle.js" defer></script>
  <script src="/avatars.js" defer></script>
</body>
</html>`;
}
