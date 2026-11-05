# ISCTE Workers workshop: student template

Your own page on the internet, running on Cloudflare Workers: your Droid's ID card, built from
Star Wars data (SWAPI). Plain JavaScript, no frameworks.

## Deploy it

Click the button. Cloudflare copies this template into a new repo on your GitHub, deploys it,
and redeploys it on every `git push`. It asks you for nothing but names.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/RoderickOxen/iscte-workers-template)

You'll need a free Cloudflare account and a GitHub account.

## Then follow the Lab Guide

**https://arena.cf2026iscte.nobledemos.com/lab**

## Run it locally

```sh
npm install
npm run dev
```

Open http://localhost:8787. (Your pixel droid looks different locally: it is drawn from your Worker's URL,
so it matches the one in the Hub once you deploy.)

## What's inside

```
wrangler.jsonc        config: name, entry point, vars (NAME, TAGLINE, EMOJI, CHARACTER_ID), bindings
src/index.js          the Worker: routes for /, /api/card and /api/chat
src/character.js      your Star Wars character from SWAPI (Mission 2: you write this)
src/droid.js          your Star Wars droid (Phase 2: your Coding Agent writes this)
src/prompt.js         builds the droid's system prompt from your character
src/page.js           pre-built: the ID card HTML
src/theme.js          pre-built: picks the page theme from your character's homeworld
src/avatar.js         pre-built: the seed for your pixel droid (same as the Hub's)
public/               pre-built: CSS, font, theme toggle, droid drawing
solutions/            the teacher's reference solutions (not deployed, not imported)
AGENTS.md             a short brief for coding agents
```

`solutions/` is the teacher's reference for the Lab Guide's "Show solution" blocks. Nothing in
`src/` imports it, so it is never part of the deployed Worker.
