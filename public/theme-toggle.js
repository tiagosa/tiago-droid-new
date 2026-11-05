// Same three-mode control and local preference as the Lab Guide.
(() => {
  const button = document.querySelector('.theme-button');
  const themes = ['system', 'light', 'dark'];
  function sync() {
    const current = document.documentElement.dataset.theme || 'system';
    const next = themes[(themes.indexOf(current) + 1) % themes.length];
    button.dataset.mode = current;
    button.setAttribute('aria-label', `Theme: ${current}. Switch to ${next} theme.`);
    button.title = `Theme: ${current} · switch to ${next}`;
  }
  button.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme || 'system';
    const next = themes[(themes.indexOf(current) + 1) % themes.length];
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('iscte-hub:theme', next); } catch { /* Works for this visit. */ }
    sync();
  });
  window.addEventListener('storage', (event) => {
    if (event.key !== 'iscte-hub:theme') return;
    document.documentElement.dataset.theme = themes.includes(event.newValue) ? event.newValue : 'system';
    sync();
  });
  sync();
})();
