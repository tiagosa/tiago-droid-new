// Run before styles load: no theme flash, no inline script or runtime network request.
(() => {
  let theme = 'system';
  try { theme = localStorage.getItem('iscte-hub:theme') || 'system'; } catch { /* Storage may be blocked. */ }
  if (!['light', 'dark', 'system'].includes(theme)) theme = 'system';
  document.documentElement.dataset.theme = theme;
})();
