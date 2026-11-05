// Deterministic 16 × 16 droids. Geometry is symmetric; all colors are trusted palette values.
// No markup interpolation, external images, inline styles, keys or storage.
/* exported droidAvatar */
function droidAvatar(seed) {
  let state = 2166136261;
  for (const char of String(seed || 'droid')) state = Math.imul(state ^ char.charCodeAt(0), 16777619);
  const next = (n) => {
    state ^= state << 13; state ^= state >>> 17; state ^= state << 5;
    return (state >>> 0) % n;
  };
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.setAttribute('width', '64');
  svg.setAttribute('height', '64');
  svg.setAttribute('class', 'droid-avatar');
  svg.setAttribute('shape-rendering', 'crispEdges');
  svg.setAttribute('aria-hidden', 'true');
  const ink = '#2a1a0f';
  const cream = '#fdfaf3';
  const palettes = [['#f05a28', '#ffac62'], ['#a85c32', '#efbd63'], ['#4c735c', '#a8c5a0'], ['#6a737f', '#b9c7cb'], ['#b88339', '#efd29b']];
  const [shell, light] = palettes[next(palettes.length)];
  const rect = (x, y, w, h, fill) => {
    const r = document.createElementNS(ns, 'rect');
    for (const [k, v] of Object.entries({ x, y, width: w, height: h, fill })) r.setAttribute(k, String(v));
    svg.append(r);
  };
  const head = next(3), eyes = next(3), antenna = next(3), body = next(3);
  // Antenna: central beacon, twin aerials, or a short cap.
  if (antenna === 0) { rect(7, 0, 2, 3, ink); rect(7, 0, 2, 1, light); }
  else if (antenna === 1) { rect(3, 1, 1, 3, ink); rect(12, 1, 1, 3, ink); rect(3, 0, 1, 1, shell); rect(12, 0, 1, 1, shell); }
  else { rect(6, 1, 4, 2, ink); rect(7, 1, 2, 1, light); }
  const x = head === 1 ? 2 : 3, w = 16 - 2 * x;
  rect(x, 3, w, 6, ink); rect(x + 1, 3, w - 2, 1, light); rect(x + 1, 4, w - 2, 4, shell);
  if (head === 2) { rect(2, 5, 1, 3, ink); rect(13, 5, 1, 3, ink); }
  // A dark visor with paired eyes (or a single wide optical strip).
  rect(4, 5, 8, 2, ink);
  if (eyes === 0) { rect(5, 5, 2, 1, cream); rect(9, 5, 2, 1, cream); }
  else if (eyes === 1) { rect(5, 5, 1, 2, light); rect(10, 5, 1, 2, light); }
  else { rect(6, 5, 4, 1, cream); }
  rect(7, 8, 2, 1, light); rect(6, 9, 4, 1, ink);
  const bx = body === 1 ? 4 : 3, bw = 16 - 2 * bx;
  rect(bx, 10, bw, 4, ink); rect(bx + 1, 10, bw - 2, 3, shell);
  rect(6, 10, 4, 2, light); rect(7, 10, 2, 1, cream);
  rect(bx - 2, 10, 1, 3, ink); rect(17 - bx, 10, 1, 3, ink);
  if (body === 2) { rect(3, 14, 10, 1, ink); rect(4, 14, 8, 1, light); }
  else { rect(4, 14, 3, 1, ink); rect(9, 14, 3, 1, ink); }
  return svg;
}

for (const slot of document.querySelectorAll('[data-avatar-seed]')) {
  slot.replaceChildren(droidAvatar(slot.dataset.avatarSeed));
}
