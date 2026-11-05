// MISSION 2: look up your Star Wars character on SWAPI.
//
// page.js (your ID card) and droid.js (your droid) both call getCharacter(CHARACTER_ID).
// It must return exactly this shape (any "unknown" or "n/a" value becomes null):
//
// {
//   name:      string,                 // "Luke Skywalker"
//   height:    string | null,          // "172"       (cm)
//   mass:      string | null,          // "77"        (kg)
//   birthYear: string | null,          // "19BBY"
//   gender:    string | null,          // "male"
//   homeworld: {                       // or null if there is no homeworld
//     name, climate, terrain, population   // all strings or null
//   } | null,
//   films:     string[],               // up to 3 film titles
// }
//
// Steps:
//   1. fetch https://swapi.dev/api/people/{id}/ with { cf: { cacheTtl: 86400, cacheEverything: true } }
//      (SWAPI data never changes, so Cloudflare can cache it for 24 hours)
//   2. if the response is not ok, or fetch throws, try https://swapi.info/api/people/{id} instead
//   3. a SECOND fetch: person.homeworld is a URL, fetch it for the planet details.
//      Only do it if the URL is on swapi.dev or swapi.info (never fetch a URL you don't trust)
//   4. map the fields (SWAPI uses snake_case: birth_year). Turn "unknown" and "n/a" into null.
//      person.films is a list of URLs: the number at the end is the film id, use FILM_TITLES below
//   5. never throw: on any failure, return PLACEHOLDER

// SWAPI's film ids, so you don't need a fetch per film.
const FILM_TITLES = {
  1: "A New Hope",
  2: "The Empire Strikes Back",
  3: "Return of the Jedi",
  4: "The Phantom Menace",
  5: "Attack of the Clones",
  6: "Revenge of the Sith",
};

// What the page shows until Mission 2 works. page.js shows a hint while isPlaceholder is true.
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

export async function getCharacter(id) {
  // Mission 2: fetch the real character from SWAPI
  return PLACEHOLDER;
}
