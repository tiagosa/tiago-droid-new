// Pre-built: you don't need to edit this.
// The class Hub draws a pixel droid for every student. This is the Hub's own function,
// so your page draws the same droid: it is a fingerprint of your Worker's URL.
// (public/avatars.js turns the seed into the picture.)
export function avatarSeed(url) {
  let hash = 2166136261;
  for (const char of url) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return (hash >>> 0).toString(16).padStart(8, "0");
}
