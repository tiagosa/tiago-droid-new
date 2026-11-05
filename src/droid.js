import { getCharacter } from "./character.js";
import { buildSystemPrompt } from "./prompt.js";

// Mission 3a: describe how your droid talks (write this yourself)
const TONE = "(your tone here)";

// A small, cheap Workers AI chat model. It runs on your own free account through env.AI.
const MODEL = "@cf/meta/llama-3.2-3b-instruct";

// Your droid. The Hub calls POST /api/chat with { round, question } and expects
// { answer } (max 280 characters) within 8 seconds. See AGENTS.md for the full contract.
//
// Ingredients, all pre-built:
//   getCharacter(env.CHARACTER_ID)                  -> your character's facts (src/character.js)
//   buildSystemPrompt({ character, tone: TONE })    -> the system prompt (src/prompt.js)
export async function handleChat(request, env) {
  return Response.json({ answer: "Not built yet: ask your agent to build handleChat" });
}
