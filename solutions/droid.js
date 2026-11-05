// SOLUTION for Phase 2. Teacher's reference: copy over src/droid.js.
import { getCharacter } from "./character.js";
import { buildSystemPrompt } from "./prompt.js";

// Mission 3a: describe how your droid talks (every student writes their own)
const TONE = "Sound like a cheerful pirate: use sea slang (ahoy, matey, ye, me) and end every answer with 'Arr!'. Only your style is pirate. Keep your own name.";

// A small, cheap Workers AI chat model. It runs on your own free account through env.AI.
const MODEL = "@cf/meta/llama-3.2-3b-instruct";

const MAX_ANSWER = 280;

// The Hub gives up after 8 s. The whole handler (SWAPI lookup + AI call) must answer within 7.
const TOTAL_MS = 7000;

// The Fallback: a short line that still sounds like the Character when we know the name.
function fallbackFor(character) {
  const who = character && !character.isPlaceholder ? `${character.name} here. ` : "";
  return `Beep boop! ${who}My circuits are tangled, but the Force is with us. Ask me again!`;
}

// Cut to 280 characters, ending with an ellipsis if we had to cut.
function limit(text) {
  const clean = String(text ?? "").trim();
  return clean.length <= MAX_ANSWER ? clean : `${clean.slice(0, MAX_ANSWER - 1).trimEnd()}…`;
}

// Stop waiting for a promise after `ms` milliseconds.
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("AI timeout")), ms)),
  ]);
}

export async function handleChat(request, env) {
  let question = "";
  try {
    const body = await request.json();
    question = String(body?.question ?? "").trim();
  } catch {
    return Response.json({ error: "Send JSON: { round, question }" }, { status: 400 });
  }
  if (!question) return Response.json({ error: "Missing question" }, { status: 400 });

  const startedAt = Date.now();
  let character = null;
  try {
    character = await getCharacter(env.CHARACTER_ID);
    const messages = [
      { role: "system", content: buildSystemPrompt({ character, tone: TONE }) },
      { role: "user", content: question },
    ];
    // The AI only gets the time that is left after the SWAPI lookup.
    const msLeft = Math.max(TOTAL_MS - (Date.now() - startedAt), 0);
    const result = await withTimeout(env.AI.run(MODEL, { messages, max_tokens: 120 }), msLeft);
    const answer = limit(result?.response);
    return Response.json({ answer: answer || fallbackFor(character) });
  } catch (err) {
    console.log("Droid failed:", err.message);
    return Response.json({ answer: fallbackFor(character) });
  }
}
