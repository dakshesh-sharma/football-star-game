/* Presentation only: colours and celebrations never change game state. */
(() => {
  const root = document.body;
  const isLab = root.classList.contains('prototype-lab');
  const themes = {
    violet: { label: 'Aurora', primary: '#7838ef', accent: '#c7ff37' },
    cyan: { label: 'Ice', primary: '#087f9a', accent: '#35f5ff' },
    coral: { label: 'Sunset', primary: '#d72f59', accent: '#ffb23f' },
    gold: { label: 'Gold', primary: '#a96b0b', accent: '#ffe066' }
  };
  const themeButtons = [...document.querySelectorAll('[data-stadium-theme]')];
  const syncThemeButtons = () => {
    themeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.stadiumTheme === (root.dataset.clubColour || 'violet'))));
  };
  const selectTheme = (name, announce = false) => {
    const theme = themes[name];
    if (!theme) return;
    if (isLab && typeof applyLabColour === 'function') {
      applyLabColour(name, theme.primary, theme.accent);
    } else {
      root.style.setProperty('--club-primary', theme.primary);
      root.style.setProperty('--club-accent', theme.accent);
      root.dataset.clubColour = name;
      try { localStorage.setItem('fc-stars-stadium-theme', name); } catch { /* Colours still work when storage is unavailable. */ }
    }
    syncThemeButtons();
    if (announce) {
      const toast = isLab ? window.showLabToast : window.showPrototypeToast;
      if (typeof toast === 'function') toast(`${theme.label} lighting equipped. Your club, your colours.`);
    }
  };
  themeButtons.forEach(button => button.addEventListener('click', () => selectTheme(button.dataset.stadiumTheme, true)));
  if (!isLab) {
    try { selectTheme(localStorage.getItem('fc-stars-stadium-theme') || 'violet'); } catch { selectTheme('violet'); }
  }
  syncThemeButtons();
  new MutationObserver(syncThemeButtons).observe(root, { attributes: true, attributeFilter: ['data-club-colour'] });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let celebrationTimer;
  const celebrate = () => {
    if (reducedMotion.matches || document.hidden) return;
    document.querySelector('.stadium-confetti')?.remove();
    clearTimeout(celebrationTimer);
    const container = document.createElement('div');
    container.className = 'stadium-confetti';
    container.setAttribute('aria-hidden', 'true');
    const accent = getComputedStyle(root).getPropertyValue('--club-accent').trim();
    const colours = [accent || '#c7ff37', '#38cfff', '#ff63bc', '#ffd36b', '#b093ff'];
    for (let index = 0; index < 34; index += 1) {
      const piece = document.createElement('i');
      piece.style.setProperty('--confetti-color', colours[index % colours.length]);
      piece.style.setProperty('--confetti-left', `${20 + Math.random() * 60}%`);
      piece.style.setProperty('--confetti-drift', `${(Math.random() - .5) * 280}px`);
      piece.style.animationDelay = `${Math.random() * .2}s`;
      container.appendChild(piece);
    }
    root.appendChild(container);
    celebrationTimer = setTimeout(() => container.remove(), 1800);
  };
  for (const id of ['prototypePackReveal', 'revealCard']) {
    const reveal = document.getElementById(id);
    if (!reveal) continue;
    new MutationObserver(() => { if (!reveal.hidden) celebrate(); }).observe(reveal, { attributes: true, attributeFilter: ['hidden'] });
  }
  // Score changes include both the playable match and the lab's match concept.
  for (const id of ['matchScoreLabel', 'labHomeScore']) {
    const score = document.getElementById(id);
    if (!score) continue;
    const homeScore = () => parseInt(score.textContent, 10) || 0;
    let previous = homeScore();
    new MutationObserver(() => {
      const current = homeScore();
      if (current > previous) celebrate();
      previous = current;
    }).observe(score, { childList: true, characterData: true, subtree: true });
  }
})();
