import { renderPage } from "./page.js";
import { getCharacter } from "./character.js";
import { handleChat } from "./droid.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/card") return Response.json(card(env));
    if (url.pathname === "/api/chat" && request.method === "POST") return handleChat(request, env);
    if (url.pathname === "/") return renderHome(request, env);

    return new Response("Not found", { status: 404 });
  },
};

function card(env) {
  return {
    name: env.NAME,
    tagline: env.TAGLINE,
    emoji: env.EMOJI,
    characterId: env.CHARACTER_ID,
  };
}

async function renderHome(request, env) {
  const character = await getCharacter(env.CHARACTER_ID);
  const colo = request.cf?.colo || "your nearest data centre";
  // The Hub draws your droid from your Worker's URL (origin, no trailing slash): so do we.
  const origin = new URL(request.url).origin;
  return new Response(renderPage(env, character, colo, origin), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      // Everything the page loads comes from this Worker (no inline scripts or styles).
      "content-security-policy": "default-src 'self'; img-src 'self' data:; base-uri 'none'; frame-ancestors 'none'",
    },
  });
}
