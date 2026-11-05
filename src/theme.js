// Picks the look of your page from your character's homeworld.
// It reads the planet's terrain and climate, and returns a theme name.
// page.js puts that name on <body> as a CSS class; public/style.css has one background per theme.

// The first theme whose keyword appears in the terrain or climate wins, so the order matters:
// a planet with "swamps, forests, mountains" is a swamp.
const THEMES = [
  ["gas", ["gas"]],
  ["lava", ["volcan", "lava"]],
  ["desert", ["desert", "arid"]],
  ["ice", ["frozen", "frigid", "tundra", "ice", "glacier"]],
  ["swamp", ["swamp", "bog"]],
  ["forest", ["forest", "jungle", "rainforest"]],
  ["ocean", ["ocean", "water"]],
  ["grass", ["grass", "plains"]],
  ["city", ["city", "cityscape", "urban"]],
  ["mountains", ["mountain"]],
];

export function themeFor(character) {
  const planet = character?.homeworld;
  const text = `${planet?.terrain ?? ""} ${planet?.climate ?? ""}`.toLowerCase();

  for (const [theme, keywords] of THEMES) {
    if (keywords.some((word) => text.includes(word))) return theme;
  }
  return "space";
}
