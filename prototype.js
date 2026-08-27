const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('[data-screen-panel]');

tabs.forEach((tab) => tab.addEventListener('click', () => {
  tabs.forEach((item) => item.classList.toggle('is-active', item === tab));
  panels.forEach((panel) => panel.classList.toggle('is-active', panel.dataset.screenPanel === tab.dataset.screen));
}));

document.querySelectorAll('.bottom-nav button').forEach((button) => button.addEventListener('click', () => {
  const label = button.querySelector('span')?.textContent.toLowerCase();
  const target = label === 'home' ? 'home' : label === 'packs' ? 'packs' : label === 'squad' ? 'squad' : null;
  if (target) document.querySelector(`.tab[data-screen="${target}"]`).click();
}));

const packButton = document.querySelector('#openPack');
const pack = document.querySelector('#pack');
const reveal = document.querySelector('#revealCard');
const packHint = document.querySelector('#packHint');
packButton?.addEventListener('click', () => {
  pack.classList.add('is-opening');
  packButton.disabled = true;
  packHint.textContent = 'A legend is walking out…';
  setTimeout(() => { reveal.hidden = false; reveal.classList.add('is-revealed'); packHint.textContent = 'Rising Icons pack complete.'; }, 650);
});

const inspector = document.querySelector('#playerInspector');
document.querySelectorAll('.player-card').forEach((card) => card.addEventListener('click', () => {
  document.querySelectorAll('.player-card').forEach((item) => item.classList.remove('is-selected'));
  card.classList.add('is-selected');
  inspector?.querySelector('span') && (inspector.querySelector('span').textContent = `${card.dataset.player} selected · tap Swap player to explore options`);
}));

const prototypeToast = document.querySelector('#prototypeToast');
const prototypeModal = document.querySelector('#prototypePackModal');
const prototypeCoins = document.querySelector('#prototypeCoins');
const prototypeGems = document.querySelector('#prototypeGems');
const prototypeTitle = document.querySelector('#prototypeTitle');
const prototypeKicker = document.querySelector('#prototypeKicker');
const prototypeMissionProgress = document.querySelector('#prototypeMissionProgress');
const prototypeMissionLabel = document.querySelector('#prototypeMissionLabel');

function showPrototypeToast(message) {
  if (!prototypeToast) return;
  prototypeToast.textContent = message;
  prototypeToast.classList.add('is-visible');
  window.clearTimeout(showPrototypeToast.timeout);
  showPrototypeToast.timeout = window.setTimeout(() => prototypeToast.classList.remove('is-visible'), 2600);
}

document.querySelectorAll('[data-prototype-view]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-prototype-view]').forEach((item) => item.classList.toggle('rail-active', item === button));
  const view = button.dataset.prototypeView;
  if (prototypeKicker) prototypeKicker.textContent = `${view.toUpperCase()} · FC STARS`;
  if (prototypeTitle) prototypeTitle.innerHTML = view === 'Home' ? 'Ready to build<br>your <em>legacy?</em>' : `${view} is<br><em>ready.</em>`;
  showPrototypeToast(`${view} prototype selected`);
}));

document.querySelector('#desktopOpenPack')?.addEventListener('click', () => {
  if (prototypeGems && Number(prototypeGems.textContent) >= 75) prototypeGems.textContent = String(Number(prototypeGems.textContent) - 75);
  prototypeModal.hidden = false;
  showPrototypeToast('Rising Icons pack opened!');
});

document.querySelector('#prototypeModalClose')?.addEventListener('click', () => { prototypeModal.hidden = true; });
document.querySelector('#prototypeKeepCard')?.addEventListener('click', () => { prototypeModal.hidden = true; showPrototypeToast('Neymar Jr added to your squad.'); });
document.querySelector('#prototypeViewModes')?.addEventListener('click', () => showPrototypeToast('All game modes unlocked in this concept.'));
document.querySelectorAll('[data-prototype-action]').forEach((button) => button.addEventListener('click', () => showPrototypeToast(`${button.dataset.prototypeAction} opened`)));
document.querySelectorAll('[data-prototype-play]').forEach((button) => button.addEventListener('click', () => {
  if (prototypeMissionProgress) prototypeMissionProgress.style.width = '100%';
  if (prototypeMissionLabel) prototypeMissionLabel.textContent = '1 / 1 completed · Reward claimed';
  showPrototypeToast(`${button.dataset.prototypePlay} match found — kickoff!`);
}));
