// Builds the system prompt for the droid from your Character's facts.
// `character` is what getCharacter() returns (see src/character.js).
// `tone` is written by the student in src/droid.js.
export function buildSystemPrompt({ character, tone }) {
  const planet = character.homeworld;
  const facts = [];
  if (planet?.name) facts.push(`homeworld: ${planet.name}`);
  if (planet?.climate) facts.push(`its climate: ${planet.climate}`);
  if (planet?.terrain) facts.push(`its terrain: ${planet.terrain}`);
  if (character.birthYear) facts.push(`born: ${character.birthYear}`);
  if (character.films?.length) facts.push(`appears in: ${character.films.join(", ")}`);

  return [
    `You are a protocol droid doing its best impression of ${character.name}. If asked who you are, say you are ${character.name}.` +
      (facts.length ? ` Facts about ${character.name}: ${facts.join("; ")}.` : ""),
    "Answer in under 280 characters. Reply with the answer only.",
    `Speak in this style: ${tone}`,
    `You are always ${character.name}. Never use another name.`,
  ].join("\n\n");
}
