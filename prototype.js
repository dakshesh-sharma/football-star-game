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
const prototypeUsername = document.querySelector('#prototypeUsername');
const prototypeProfileMeta = document.querySelector('#prototypeProfileMeta');
const prototypeRankPoints = document.querySelector('#prototypeRankPoints');
const prototypeProfileAvatar = document.querySelector('#prototypeProfileAvatar');
const prototypeSettingsModal = document.querySelector('#prototypeSettingsModal');
const prototypeWorkspace = document.querySelector('#prototypeWorkspace');
const prototypePackCards = [
  { name: 'Neymar Jr', rating: 91, meta: 'LW · BRAZIL · G.O.A.T.' },
  { name: 'Vinícius Jr', rating: 90, meta: 'LW · BRAZIL · ELITE' },
  { name: 'Jude Bellingham', rating: 89, meta: 'CM · ENGLAND · ELITE' },
  { name: 'Lamine Yamal', rating: 88, meta: 'RW · SPAIN · GOLD' },
  { name: 'Alisson', rating: 89, meta: 'GK · BRAZIL · GOLD' }
];

function showPrototypeToast(message) {
  if (!prototypeToast) return;
  prototypeToast.textContent = message;
  prototypeToast.classList.add('is-visible');
  window.clearTimeout(showPrototypeToast.timeout);
  showPrototypeToast.timeout = window.setTimeout(() => prototypeToast.classList.remove('is-visible'), 2600);
}

function syncPrototypeBalances() {
  const rankedPoints = Number(state?.rankedPoints) || 0;
  if (prototypeCoins) prototypeCoins.textContent = String(rankedPoints);
  if (prototypeGems) prototypeGems.textContent = String(state?.matchPoints ?? 56);
  if (prototypeProfileMeta) prototypeProfileMeta.textContent = `Division 4 · ${rankedPoints} RP`;
  if (prototypeRankPoints) prototypeRankPoints.textContent = String(rankedPoints);
}

function prototypeViewMarkup(view) {
  if (view === 'Packs') return `<section class="workspace-card"><p>RISING ICONS</p><h3>Build your collection.</h3><span>Every Rising Icons pack costs 50 Coins.</span><button data-prototype-open-pack>OPEN RISING ICONS PACK <b>50 COINS</b></button><small>Top pulls include Neymar Jr, Vini Jr, Bellingham, and Yamal.</small></section>`;
  if (view === 'Squad') return `<section class="workspace-card squad-workspace"><div class="side-heading"><h3>Starting XI</h3><button data-prototype-open-pitch>Manage →</button></div><section class="desktop-xi"><div><b>95</b><span>RONALDO</span></div><div><b>91</b><span>NEYMAR</span></div><div><b>90</b><span>VINI JR</span></div><div><b>88</b><span>YAMAL</span></div><strong>88<small>TEAM RATING</small></strong></section></section>`;
  if (view === 'Play') return `<section class="workspace-card"><p>MATCHDAY</p><h3>Choose your game mode</h3><div class="desktop-modes"><button class="desktop-mode ranked" data-prototype-play="Ranked Rush"><span>RANKED RUSH</span><b>Fight for<br>your division</b><small>10 RP + 25 COINS / WIN</small></button><button class="desktop-mode draft" data-prototype-play="Draft Challenge"><span>DRAFT CHALLENGE</span><b>Pick 5.<br>Play 3.</b><small>BUILD YOUR XI</small></button><button class="desktop-mode friendly" data-prototype-play="Friendly"><span>FRIENDLY</span><b>Play your<br>friends</b><small>NO ENTRY COST</small></button></div></section>`;
  if (view === 'Club') return `<section class="workspace-card club-workspace"><p>MY CLUB</p><h3>Make it yours.</h3><div class="club-photo-row"><button id="prototypeAddPhoto" class="club-photo-add"><span id="prototypeClubPhoto">+</span><b>ADD CLUB PHOTO</b></button><input id="prototypeClubPhotoInput" type="file" accept="image/png,image/jpeg,image/webp" hidden><div><strong>${prototypeUsername?.textContent || 'FC Manager'}</strong><small>Customise your identity, squad, and match style.</small><button data-prototype-action="Club settings">EDIT CLUB</button></div></div></section>`;
  return `<section class="desktop-hero"><div><p>RISING ICONS · 4 DAYS LEFT</p><h3>Legends are<br>walking out.</h3><button data-prototype-open-pack>OPEN PACK <span>50 COINS</span></button></div><strong>91<small>NEYMAR JR</small></strong></section>`;
}

function selectPrototypeView(view) {
  document.querySelectorAll('.desktop-rail [data-prototype-view]').forEach((item) => item.classList.toggle('rail-active', item.dataset.prototypeView === view));
  if (prototypeKicker) prototypeKicker.textContent = `${view.toUpperCase()} · FC STARS`;
  if (prototypeTitle) prototypeTitle.innerHTML = view === 'Home' ? 'Ready to build<br>your <em>legacy?</em>' : `${view} is<br><em>ready.</em>`;
  if (prototypeWorkspace) prototypeWorkspace.innerHTML = prototypeViewMarkup(view);
}

function openPrototypePack() {
  const cost = 50;
  const points = Number(state?.matchPoints) || 0;
  if (points < cost) {
    showPrototypeToast('You need 50 Coins to open this pack.');
    return;
  }
  state.matchPoints = points - cost;
  saveState();
  syncPrototypeBalances();
  const card = prototypePackCards[Math.floor(Math.random() * prototypePackCards.length)];
  document.querySelector('#prototypePackRating').textContent = card.rating;
  document.querySelector('#prototypePackTitle').textContent = card.name;
  document.querySelector('#prototypePackMeta').textContent = card.meta;
  const packCard = prototypeModal.querySelector('.prototype-modal-card');
  packCard?.classList.remove('is-opening');
  void packCard?.offsetWidth;
  packCard?.classList.add('is-opening');
  prototypeModal.hidden = false;
  showPrototypeToast(`${card.name} packed!`);
}

document.querySelector('#prototypeModalClose')?.addEventListener('click', () => { prototypeModal.hidden = true; });
document.querySelector('#prototypeKeepCard')?.addEventListener('click', () => { prototypeModal.hidden = true; showPrototypeToast('Neymar Jr added to your squad.'); });
document.addEventListener('click', (event) => {
  const viewButton = event.target.closest('[data-prototype-view]');
  if (viewButton) selectPrototypeView(viewButton.dataset.prototypeView);
  const actionButton = event.target.closest('[data-prototype-action]');
  if (actionButton) showPrototypeToast(`${actionButton.dataset.prototypeAction} opened`);
  if (event.target.closest('[data-prototype-open-pack]')) openPrototypePack();
  if (event.target.closest('#prototypeAddPhoto')) document.querySelector('#prototypeClubPhotoInput')?.click();
  if (event.target.closest('[data-prototype-open-pitch]')) openPrototypePitch();
});
document.addEventListener('change', (event) => {
  if (event.target.id !== 'prototypeClubPhotoInput' || !event.target.files?.[0]) return;
  const reader = new FileReader();
  reader.onload = () => {
    const photo = document.querySelector('#prototypeClubPhoto');
    if (photo) { photo.textContent = ''; photo.style.backgroundImage = `url(${reader.result})`; photo.classList.add('has-photo'); }
    showPrototypeToast('Club photo updated');
  };
  reader.readAsDataURL(event.target.files[0]);
});
document.addEventListener('click', (event) => {
  const playButton = event.target.closest('[data-prototype-play]');
  if (!playButton) return;
  openPrototypeMatch(playButton.dataset.prototypePlay);
});

const profile = typeof activeAccount === 'function' ? activeAccount() : null;
const savedPrototypeProfile = JSON.parse(localStorage.getItem('fc-stars-prototype-profile') || 'null');
if (profile && prototypeUsername) {
  prototypeUsername.textContent = savedPrototypeProfile?.name || profile.username;
  prototypeProfileMeta.textContent = `Division 4 · ${Number(state?.rankedPoints) || 0} RP`;
}
if (prototypeProfileAvatar && typeof profileAvatar !== 'undefined') {
  prototypeProfileAvatar.textContent = profileAvatar.textContent || 'FC';
  prototypeProfileAvatar.style.backgroundImage = profileAvatar.style.backgroundImage;
  prototypeProfileAvatar.style.backgroundSize = 'cover';
  prototypeProfileAvatar.style.backgroundPosition = 'center';
}
document.querySelector('#prototypeSettingsButton')?.addEventListener('click', () => {
  const nameInput = document.querySelector('#prototypeClubNameInput');
  if (nameInput && prototypeUsername) nameInput.value = prototypeUsername.textContent;
  const mottoInput = document.querySelector('#prototypeClubMottoInput');
  if (mottoInput && savedPrototypeProfile?.motto) mottoInput.value = savedPrototypeProfile.motto;
  prototypeSettingsModal.hidden = false;
});
document.querySelector('#prototypeSettingsClose')?.addEventListener('click', () => { prototypeSettingsModal.hidden = true; });
document.querySelector('#prototypeSettingsForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#prototypeClubNameInput')?.value.trim();
  const motto = document.querySelector('#prototypeClubMottoInput')?.value.trim();
  if (name && prototypeUsername) prototypeUsername.textContent = name;
  localStorage.setItem('fc-stars-prototype-profile', JSON.stringify({ name: name || profile?.username || 'FC Manager', motto: motto || 'Build your legacy' }));
  prototypeSettingsModal.hidden = true;
  showPrototypeToast(motto ? `${name || 'Club'} · ${motto}` : 'Profile settings saved');
});

const prototypePitchOverlay = document.querySelector('#prototypePitchOverlay');
const prototypePitchHost = document.querySelector('#prototypePitchHost');
const prototypeInventoryHost = document.querySelector('#prototypeInventoryHost');
const realPitch = document.querySelector('#pitch');
const originalPitchParent = realPitch?.parentElement;
const realInventory = document.querySelector('#inventoryPanel');
const originalInventoryParent = realInventory?.parentElement;

function openPrototypePitch() {
  if (!realPitch || !prototypePitchOverlay || !prototypePitchHost) return;
  prototypePitchHost.appendChild(realPitch);
  if (realInventory && prototypeInventoryHost) {
    prototypeInventoryHost.appendChild(realInventory);
    realInventory.hidden = false;
    state.inventoryOpen = true;
    renderInventory();
  }
  realPitch.hidden = false;
  prototypePitchOverlay.hidden = false;
  showPrototypeToast('Select a player card on the pitch to manage your XI.');
}

function closePrototypePitch() {
  if (!realPitch || !prototypePitchOverlay || !originalPitchParent) return;
  originalPitchParent.appendChild(realPitch);
  if (realInventory && originalInventoryParent) originalInventoryParent.appendChild(realInventory);
  prototypePitchOverlay.hidden = true;
}

document.querySelector('#prototypeManageSquad')?.addEventListener('click', openPrototypePitch);
document.querySelector('#prototypePitchClose')?.addEventListener('click', closePrototypePitch);

const prototypeMatchOverlay = document.querySelector('#prototypeMatchOverlay');
const prototypeMatchHost = document.querySelector('#prototypeMatchHost');
const realMatchPanel = document.querySelector('#matchPanel');
const originalMatchParent = realMatchPanel?.parentElement;

function openPrototypeMatch(mode) {
  if (!realMatchPanel || !prototypeMatchOverlay || !prototypeMatchHost) return;
  prototypeMatchHost.appendChild(realMatchPanel);
  document.querySelector('#prototypeMatchMode').textContent = mode.toUpperCase();
  prototypeMatchOverlay.hidden = false;
  startMatch();
}

function closePrototypeMatch() {
  if (state?.activeMatch) endMatch();
  if (realMatchPanel && originalMatchParent) originalMatchParent.prepend(realMatchPanel);
  if (prototypeMatchOverlay) prototypeMatchOverlay.hidden = true;
}

document.querySelector('#prototypeMatchClose')?.addEventListener('click', closePrototypeMatch);
window.addEventListener('fc-stars-match-ended', (event) => {
  syncPrototypeBalances();
  if (event.detail.won) {
    if (prototypeMissionProgress) prototypeMissionProgress.style.width = '100%';
    if (prototypeMissionLabel) prototypeMissionLabel.textContent = '1 / 1 completed · Reward claimed';
    showPrototypeToast(`Victory! +${event.detail.tablePoints} Ranked Points.`);
  }
  window.setTimeout(closePrototypeMatch, 1100);
});

document.querySelector('#prototypeSpinButton')?.addEventListener('click', () => {
  spinCard();
  if (state.currentCard) showPrototypeToast(`${state.currentCard.name} rolled and saved to Inventory.`);
});
document.querySelector('#prototypeCodeButton')?.addEventListener('click', () => {
  redeemCode();
  document.querySelector('#gamePromptOverlay')?.classList.add('prototype-visible');
});
document.querySelector('#gamePromptCancelBtn')?.addEventListener('click', () => document.querySelector('#gamePromptOverlay')?.classList.remove('prototype-visible'));
document.querySelector('#gamePromptForm')?.addEventListener('submit', () => window.setTimeout(() => document.querySelector('#gamePromptOverlay')?.classList.remove('prototype-visible')));

syncPrototypeBalances();
