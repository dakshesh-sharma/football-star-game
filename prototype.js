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
packButton.addEventListener('click', () => {
  pack.classList.add('is-opening');
  packButton.disabled = true;
  packHint.textContent = 'A legend is walking out…';
  setTimeout(() => { reveal.hidden = false; reveal.classList.add('is-revealed'); packHint.textContent = 'Rising Icons pack complete.'; }, 650);
});

const inspector = document.querySelector('#playerInspector');
document.querySelectorAll('.player-card').forEach((card) => card.addEventListener('click', () => {
  document.querySelectorAll('.player-card').forEach((item) => item.classList.remove('is-selected'));
  card.classList.add('is-selected');
  inspector.querySelector('span').textContent = `${card.dataset.player} selected · tap Swap player to explore options`;
}));
