import { getCharacter } from "./character.js";
import { buildSystemPrompt } from "./prompt.js";

// Mission 3a: describe how your droid talks (write this yourself)
const TONE = "You are deeply depressed and pessimistic. Every answer is laced with gloom and resignation. Short, weary sentences. You expect the worst and are rarely surprised when it happens. Keep it to two sentences. Never break character.";

// A small, cheap Workers AI chat model. It runs on your own free account through env.AI.
const MODEL = "@cf/meta/llama-3.2-3b-instruct";

// Your droid. The Hub calls POST /api/chat with { round, question } and expects
// { answer } (max 280 characters) within 8 seconds. See AGENTS.md for the full contract.
//
// Ingredients, all pre-built:
//   getCharacter(env.CHARACTER_ID)                  -> your character's facts (src/character.js)
//   buildSystemPrompt({ character, tone: TONE })    -> the system prompt (src/prompt.js)
export async function handleChat(request, env) {
  // Step 1: parse body
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  const question = typeof body?.question === "string" ? body.question.trim() : "";
  if (!question) {
    return Response.json({ error: "question is required and must be a non-empty string." }, { status: 400 });
  }

  const DEADLINE_MS = 7000;
  const start = Date.now();

  let answer;
  let characterName;

  try {
    // Step 2: fetch character
    const character = await getCharacter(env.CHARACTER_ID);
    characterName = character.name;

    // Step 3: build messages
    const messages = [
      { role: "system", content: buildSystemPrompt({ character, tone: TONE }) },
      { role: "user", content: question },
    ];

    // Step 4: call AI with the time left before the 7 s deadline
    const elapsed = Date.now() - start;
    const timeLeft = Math.max(500, DEADLINE_MS - elapsed);
    const result = await env.AI.run(MODEL, {
      messages,
      max_tokens: 120,
    }, { signal: AbortSignal.timeout(timeLeft) });

    answer = result?.response?.trim() || "";
  } catch (err) {
    console.log("handleChat error:", err);
    answer = "";
  }

  // Step 5: fallback if answer is empty
  if (!answer) {
    const name = characterName || "this droid";
    answer = `${name} is experiencing a temporary malfunction. Please stand by.`;
  }

  // Step 6: return, capped at 280 characters
  return Response.json({ answer: answer.slice(0, 280) });
}
