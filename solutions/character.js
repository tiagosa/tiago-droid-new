// SOLUTION for Mission 2. Teacher's reference: copy over src/character.js.
// Returns { name, height, mass, birthYear, gender, homeworld: { name, climate, terrain, population } | null, films }
// and never throws: on any failure it returns PLACEHOLDER.

// SWAPI's film ids, so we don't need a fetch per film.
const FILM_TITLES = {
  1: "A New Hope",
  2: "The Empire Strikes Back",
  3: "Return of the Jedi",
  4: "The Phantom Menace",
  5: "Attack of the Clones",
  6: "Revenge of the Sith",
};

const PLACEHOLDER = {
  isPlaceholder: true,
  name: "Unknown Droid",
  height: null,
  mass: null,
  birthYear: null,
  gender: null,
  homeworld: null,
  films: [],
};

// SWAPI data never changes, so let Cloudflare cache every request for 24 hours.
const CACHE = { cf: { cacheTtl: 86400, cacheEverything: true } };

// GET a URL and return its JSON, or null if anything goes wrong.
async function getJson(url) {
  try {
    const res = await fetch(url, { ...CACHE, signal: AbortSignal.timeout(2500) });
    if (!res.ok) {
      console.log("SWAPI request failed:", url, res.status);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.log("SWAPI request failed:", url, err.message);
    return null;
  }
}

// Only follow links to the SWAPI hosts.
function isSwapiUrl(value) {
  try {
    const { protocol, hostname } = new URL(value);
    return protocol === "https:" && (hostname === "swapi.dev" || hostname === "swapi.info");
  } catch {
    return false;
  }
}

// SWAPI says "unknown" (or "n/a") when it doesn't know.
function clean(value) {
  if (value === undefined || value === null) return null;
  const text = String(value).trim();
  return text === "" || text === "unknown" || text === "n/a" ? null : text;
}

export async function getCharacter(id) {
  try {
    const safeId = encodeURIComponent(String(id ?? "").trim());
    if (!safeId) return PLACEHOLDER;

    // 1 + 2: swapi.dev first, swapi.info as the fallback
    let person = await getJson(`https://swapi.dev/api/people/${safeId}/`);
    if (!person?.name) person = await getJson(`https://swapi.info/api/people/${safeId}`);
    if (!person?.name) return PLACEHOLDER;

    // 3: the second fetch, for the homeworld
    let homeworld = null;
    if (isSwapiUrl(person.homeworld)) {
      const planet = await getJson(person.homeworld);
      if (planet) {
        homeworld = {
          name: clean(planet.name),
          climate: clean(planet.climate),
          terrain: clean(planet.terrain),
          population: clean(planet.population),
        };
      }
    }

    // 4: the film id is the number at the end of each film URL
    const films = (Array.isArray(person.films) ? person.films : [])
      .map((url) => FILM_TITLES[String(url).match(/(\d+)\/?$/)?.[1]])
      .filter(Boolean)
      .slice(0, 3);

    return {
      name: person.name,
      height: clean(person.height),
      mass: clean(person.mass),
      birthYear: clean(person.birth_year),
      gender: clean(person.gender),
      homeworld,
      films,
    };
  } catch (err) {
    // 5: never throw
    console.log("getCharacter failed:", err.message);
    return PLACEHOLDER;
  }
}
