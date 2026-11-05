# Student Worker

A Cloudflare Worker in plain JavaScript (no TypeScript, no frameworks). It serves a Droid ID card
page (`/`), a card (`GET /api/card`) and a Star Wars droid (`POST /api/chat`) that the class Hub calls.

## Files
- `src/droid.js`: the droid. `handleChat(request, env)` is where droid work happens.
- `src/character.js`: `getCharacter(id)`, the student's Mission 2. Once it works, use it; don't rewrite it.
- `src/prompt.js`: `buildSystemPrompt({ character, tone })`, a working helper. Use it; don't rewrite it.
- `src/index.js`: router. Don't change it unless asked.
- `src/page.js`, `src/theme.js`, `src/avatar.js`, `public/`: the pre-built ID card page (HTML, CSS, droid picture,
  planet themes). Page features go here.
- `wrangler.jsonc`: config (`vars`). `solutions/` is the teacher's reference: ignore it.

## `getCharacter(id)` returns
`{ name, height, mass, birthYear, gender, homeworld: { name, climate, terrain, population } | null, films: [up to 3 titles] }`

## Contract (never break)
- `GET /api/card` → `{ name, tagline, emoji, characterId }`
- `POST /api/chat` with `{ round, question }` → `{ answer }` (max 280 chars) within 8 s.

## Rules
- Never change `TONE` in `src/droid.js`: the student writes it.
- Never change `"name"` in `wrangler.jsonc`.
- Never run `wrangler deploy`. Production deploys happen through `git push` (Workers Builds).
- Never commit secrets or `.dev.vars`.
- Only commit and push when the student asks.
- The page sends a strict CSP (`default-src 'self'`): no inline `<script>` or `style="..."`. Put browser JavaScript in a file in `public/` and load it with `<script src="/name.js" defer>`.
- Keep changes small and show the diff.

## Test
`npm run dev`, then:
curl -X POST http://localhost:8787/api/chat -H "content-type: application/json" -d '{"round":"intro","question":"Introduce yourself."}'
