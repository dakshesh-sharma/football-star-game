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
const prototypeDivisionLabel = document.querySelector('#prototypeDivisionLabel');
const prototypeRailDivision = document.querySelector('#prototypeRailDivision');
const prototypeProfileAvatar = document.querySelector('#prototypeProfileAvatar');
const prototypeSettingsModal = document.querySelector('#prototypeSettingsModal');
const prototypeWorkspace = document.querySelector('#prototypeWorkspace');
const prototypeClosedPack = document.querySelector('#prototypeClosedPack');
const prototypePackReveal = document.querySelector('#prototypePackReveal');
const prototypePackTapCount = document.querySelector('#prototypePackTapCount');
let prototypePackTaps = 0;
let prototypePendingPack = null;
let prototypePackClaimed = false;
const featuredPackNames = ['Neymar Jr', 'Vinicius Jr', 'Jude Bellingham', 'Lamine Yamal', 'Alisson'];

function showPrototypeToast(message) {
  if (!prototypeToast) return;
  prototypeToast.textContent = message;
  prototypeToast.classList.add('is-visible');
  window.clearTimeout(showPrototypeToast.timeout);
  showPrototypeToast.timeout = window.setTimeout(() => prototypeToast.classList.remove('is-visible'), 2600);
}

function syncPrototypeBalances() {
  const rankedPoints = Number(state?.rankedPoints) || 0;
  const division = prototypeDivision(rankedPoints);
  const infiniteCoinsActive = Boolean(state?.infiniteCoins);
  if (prototypeCoins) prototypeCoins.textContent = String(rankedPoints);
  if (prototypeGems) prototypeGems.textContent = infiniteCoinsActive ? '∞' : String(state?.matchPoints ?? 56);
  if (prototypeProfileMeta) prototypeProfileMeta.textContent = `Division ${division} · ${rankedPoints} RP`;
  if (prototypeDivisionLabel) prototypeDivisionLabel.textContent = `DIVISION ${division}`;
  if (prototypeRailDivision) prototypeRailDivision.textContent = `Division ${division}`;
  if (prototypeRankPoints) prototypeRankPoints.textContent = String(rankedPoints);
  const missionComplete = state?.dailyRankedWinDate === localDateKey();
  if (prototypeMissionProgress) prototypeMissionProgress.style.width = missionComplete ? '100%' : '0%';
  if (prototypeMissionLabel) prototypeMissionLabel.textContent = missionComplete ? '1 / 1 completed' : '0 / 1 completed';
}

function syncPrototypeProfile() {
  const account = typeof activeAccount === 'function' ? activeAccount() : null;
  if (prototypeUsername) prototypeUsername.textContent = account?.username || 'FC Manager';
  if (prototypeProfileMeta) prototypeProfileMeta.textContent = `Division ${prototypeDivision()} · ${Number(state?.rankedPoints) || 0} RP`;
  if (prototypeProfileAvatar) {
    const photo = account?.profilePhoto || '';
    prototypeProfileAvatar.textContent = photo ? '' : avatarStyles[account?.avatarStyle] || 'FC';
    prototypeProfileAvatar.style.backgroundImage = photo ? `url("${photo}")` : '';
    prototypeProfileAvatar.style.backgroundSize = 'cover';
    prototypeProfileAvatar.style.backgroundPosition = 'center';
  }
  const railName = document.querySelector('.rail-profile b');
  if (railName) railName.textContent = account?.username || 'YOUR CLUB';
}

window.syncPrototypeShell = () => {
  syncPrototypeBalances();
  syncPrototypeProfile();
  const activeView = document.querySelector('.desktop-rail .rail-active')?.dataset.prototypeView;
  if (activeView === 'Home' || activeView === 'Squad' || activeView === 'Club') prototypeWorkspace.innerHTML = prototypeViewMarkup(activeView);
  if (activeView === 'Club') restorePrototypeClubPhoto();
};

function prototypeDivision(points = Number(state?.rankedPoints) || 0) {
  return Math.max(1, 4 - Math.floor(Math.max(0, points) / 100));
}

function prototypeTeamRating() {
  const team = buildTeam();
  return Math.round(team.reduce((sum, player) => sum + Number(player.rating === '∞' ? 99 : player.rating || 60), 0) / Math.max(1, team.length));
}

function homeWorkspaceMarkup() {
  const points = Math.max(0, Number(state?.rankedPoints) || 0);
  const division = prototypeDivision(points);
  const divisionProgress = Math.min(100, points % 100);
  const collectionCount = new Set((state?.inventory || []).map(card => card.name)).size;
  const latest = state?.currentCard;
  return `<section class="desktop-hero">
    <div class="desktop-hero-copy"><span class="hero-live"><i></i> RISING ICONS</span><p>FEATURED PACK · 50 COINS</p><h3>Make football<br>history.</h3><button data-prototype-open-pack>OPEN PACK <span>50 COINS</span></button></div>
    <div class="hero-player" aria-hidden="true"><img src="assets/neymar-jr.png" alt=""><span><b>91</b><small>LW</small></span><strong>NEYMAR JR<small>RISING ICON</small></strong></div>
  </section>
  <section class="home-command-grid" aria-label="Club overview">
    <button class="home-arena-card" data-prototype-play="Ranked Rush"><span class="home-card-kicker"><i></i> MATCHDAY LIVE</span><b>RANKED<br>RUSH</b><small>25 COINS PER GOAL · +10 RP FOR A WIN</small><em>PLAY NOW →</em></button>
    <article class="home-progress-card"><span class="home-card-kicker">${division > 1 ? `ROAD TO DIVISION ${division - 1}` : 'DIVISION 1 MASTERY'}</span><div><b>${divisionProgress}</b><small>/ 100 RP</small></div><i><b style="width:${divisionProgress}%"></b></i><small>${Math.max(0, 100 - divisionProgress)} RP TO ${division > 1 ? 'PROMOTION' : 'THE NEXT MILESTONE'}</small></article>
    <article class="home-club-card"><span class="home-card-kicker">CLUB SNAPSHOT</span><div><span><b>${prototypeTeamRating()}</b><small>XI RATING</small></span><span><b>${collectionCount}</b><small>CARDS</small></span></div><p>${latest ? `LATEST PULL · ${escapeHtml(latest.name).toUpperCase()}` : 'YOUR NEXT STAR IS WAITING'}</p><button data-prototype-view="Squad">VIEW SQUAD →</button></article>
  </section>`;
}

function prototypeViewMarkup(view) {
  if (view === 'Packs') return `<section class="workspace-card pack-workspace"><div class="workspace-copy"><p>RISING ICONS</p><h3>Greatness is<br>inside.</h3><span>Three taps. One walkout. A new superstar for your collection.</span><div class="pack-odds"><span><b>91</b> TOP RATING</span><span><b>5</b> ICONS</span><span><b>0</b> DUPLICATES</span></div><button data-prototype-open-pack>OPEN PACK <b>50 COINS</b></button><small>Neymar Jr · Vini Jr · Bellingham · Yamal · Alisson</small></div><button class="workspace-pack-art" data-prototype-open-pack aria-label="Open Rising Icons pack"><img src="assets/generated/fc-stars-rising-icons-pack.png" alt="Rising Icons pack"><i></i></button></section>`;
  if (view === 'Squad') {
    const team = buildTeam().slice().sort((a,b) => ratingSortValue(b) - ratingSortValue(a));
    const rating = prototypeTeamRating();
    return `<section class="workspace-card squad-workspace"><div class="side-heading"><div><p>STARTING XI</p><h3>Your stars.<br>Your system.</h3></div><button data-prototype-open-pitch>MANAGE XI →</button></div><div class="squad-metrics"><span><b>${rating}</b><small>TEAM RATING</small></span><span><b>${team.filter(player => Number(player.rating) >= 85).length}</b><small>ELITE PLAYERS</small></span><span><b>4-3-3</b><small>FORMATION</small></span></div><section class="desktop-xi">${team.slice(0,5).map((player,index) => `<div class="${index === 0 ? 'squad-star' : ''}"><small>${escapeHtml(player.position || 'XI')}</small><b>${escapeHtml(ratingLabel(player))}</b><span>${escapeHtml(shortName(player.name).toUpperCase())}</span></div>`).join('')}<strong>${rating}<small>OVR</small></strong></section><p class="squad-tip">Select Manage XI to swap cards, inspect positions, and build your strongest lineup.</p></section>`;
  }
  if (view === 'Play') return `<section class="workspace-card play-workspace"><div class="workspace-heading"><p>MATCHDAY</p><h3>Pick your arena.</h3><span>Every match uses your real Starting XI.</span></div><div class="desktop-modes"><button class="desktop-mode ranked" data-prototype-play="Ranked Rush"><i>♛</i><span>RANKED RUSH</span><b>Climb the<br>divisions</b><small>25 COINS / GOAL · 10 RP / WIN</small><em>PLAY RANKED →</em></button><button class="desktop-mode draft" data-prototype-play="Quick Match"><i>⚡</i><span>QUICK MATCH</span><b>Instant<br>kickoff</b><small>XP AND COIN REWARDS</small><em>PLAY NOW →</em></button><button class="desktop-mode friendly" data-prototype-play="Friendly"><i>∞</i><span>FRIENDLY</span><b>Play with<br>no pressure</b><small>NO RANKED POINTS</small><em>PLAY FRIENDLY →</em></button></div></section>`;
  if (view === 'Club') {
    const account = typeof activeAccount === 'function' ? activeAccount() : null;
    return `<section class="workspace-card club-workspace"><div class="club-banner"><span>EST. 2026</span><b>${escapeHtml(prototypeUsername?.textContent || 'FC Manager')}</b><small>${escapeHtml(account?.motto || 'Build your legacy')}</small></div><div class="club-profile-grid"><div><p>CLUB IDENTITY</p><div class="club-photo-row"><button id="prototypeAddPhoto" class="club-photo-add"><span id="prototypeClubPhoto">+</span><b>ADD BADGE PHOTO</b></button><input id="prototypeClubPhotoInput" type="file" accept="image/png,image/jpeg,image/webp" hidden><button class="club-edit-button" data-prototype-action="Club settings">EDIT CLUB DETAILS →</button></div></div><div class="club-record"><p>CLUB RECORD</p><span><b>${Number(state?.rankedPoints) || 0}</b><small>RANKED POINTS</small></span><span><b>${prototypeTeamRating()}</b><small>XI RATING</small></span><span><b>${new Set((state?.inventory || []).map(card => card.name)).size}</b><small>COLLECTED</small></span></div></div></section>`;
  }
  return homeWorkspaceMarkup();
}

function selectPrototypeView(view) {
  const isHome = view === 'Home';
  const headings = {
    Home: ['HOME · FC STARS', 'Ready to build<br>your <em>legacy?</em>'],
    Packs: ['PACK STORE · RISING ICONS', 'Open the next<br><em>superstar.</em>'],
    Squad: ['SQUAD · STARTING XI', 'Build your<br><em>best XI.</em>'],
    Play: ['PLAY · MATCHDAY', 'Own the<br><em>matchday.</em>'],
    Club: ['CLUB · IDENTITY', 'Wear your<br><em>identity.</em>']
  };
  document.querySelector('.desktop-prototype')?.classList.toggle('prototype-non-home', !isHome);
  document.querySelectorAll('.prototype-home-only').forEach((card) => { card.hidden = !isHome; });
  document.querySelectorAll('.desktop-rail [data-prototype-view]').forEach((item) => item.classList.toggle('rail-active', item.dataset.prototypeView === view));
  if (prototypeKicker) prototypeKicker.textContent = (headings[view] || headings.Home)[0];
  if (prototypeTitle) prototypeTitle.innerHTML = (headings[view] || headings.Home)[1];
  if (prototypeWorkspace) prototypeWorkspace.innerHTML = prototypeViewMarkup(view);
  if (view === 'Club') restorePrototypeClubPhoto();
}

function openPrototypePack() {
  const cost = 50;
  const points = Number(state?.matchPoints) || 0;
  const infiniteCoinsActive = Boolean(state?.infiniteCoins);
  if (!infiniteCoinsActive && points < cost) {
    showPrototypeToast('You need 50 Coins to open this pack.');
    return;
  }
  const availableFeatured = featuredPackNames
    .map(name => cardPool.find(card => card.name === name))
    .filter(card => card && !ownedPlayerNames().has(card.name));
  const available = availableFeatured.length
    ? availableFeatured
    : cardPool.filter(card => !card.specialAccess && !ownedPlayerNames().has(card.name));
  if (!available.length) {
    showPrototypeToast('Collection complete — no duplicate card was charged.');
    return;
  }
  if (!infiniteCoinsActive) state.matchPoints = points - cost;
  const card = available[Math.floor(Math.random() * available.length)];
  prototypePendingPack = { ...card, id: `pack-${Date.now()}-${Math.random().toString(16).slice(2)}` };
  prototypePackClaimed = false;
  prototypePackTaps = 0;
  document.querySelector('#prototypePackRating').textContent = ratingLabel(card);
  document.querySelector('#prototypePackTitle').textContent = card.name;
  document.querySelector('#prototypePackMeta').textContent = `${card.position} · ${card.team} · ${card.rarity}`.toUpperCase();
  const packCard = prototypeModal.querySelector('.prototype-modal-card');
  packCard?.classList.remove('is-opening');
  if (prototypeClosedPack) prototypeClosedPack.hidden = false;
  if (prototypePackReveal) prototypePackReveal.hidden = true;
  if (prototypePackTapCount) prototypePackTapCount.textContent = 'Tap 3 times to reveal your player';
  prototypeModal.hidden = false;
  document.querySelector('#prototypePackTapTarget')?.focus();
  saveState();
  syncPrototypeBalances();
}

function closePrototypePack(refundUnclaimed = false) {
  if (refundUnclaimed && prototypePendingPack && !prototypePackClaimed && !state?.infiniteCoins) {
    state.matchPoints = (Number(state.matchPoints) || 0) + 50;
    saveState();
    syncPrototypeBalances();
  }
  prototypePendingPack = null;
  prototypePackClaimed = false;
  prototypeModal.hidden = true;
}

function claimPrototypePack() {
  if (!prototypePendingPack || prototypePackClaimed) return;
  state.inventory = addCardToInventory(state.inventory, prototypePendingPack);
  state.currentCard = prototypePendingPack;
  state.currentCardSaved = true;
  prototypePackClaimed = true;
  const name = prototypePendingPack.name;
  saveState();
  render();
  closePrototypePack();
  selectPrototypeView('Squad');
  showPrototypeToast(`${name} added to your collection.`);
}

document.querySelector('#prototypePackTapTarget')?.addEventListener('click', () => {
  if (!prototypePendingPack) return;
  prototypePackTaps += 1;
  const packCard = prototypeModal.querySelector('.prototype-modal-card');
  packCard?.classList.remove('is-opening');
  void packCard?.offsetWidth;
  packCard?.classList.add('is-opening');
  if (prototypePackTaps < 3) {
    if (prototypePackTapCount) prototypePackTapCount.textContent = `${3 - prototypePackTaps} tap${3 - prototypePackTaps === 1 ? '' : 's'} left`;
    return;
  }
  if (prototypeClosedPack) prototypeClosedPack.hidden = true;
  if (prototypePackReveal) prototypePackReveal.hidden = false;
  showPrototypeToast(`${prototypePendingPack.name} packed!`);
});
document.querySelector('#prototypeModalClose')?.addEventListener('click', () => closePrototypePack(true));
document.querySelector('#prototypeKeepCard')?.addEventListener('click', claimPrototypePack);
document.addEventListener('click', (event) => {
  const viewButton = event.target.closest('[data-prototype-view]');
  if (viewButton) selectPrototypeView(viewButton.dataset.prototypeView);
  const actionButton = event.target.closest('[data-prototype-action]');
  if (actionButton?.dataset.prototypeAction === 'Club settings') document.querySelector('#prototypeSettingsButton')?.click();
  if (event.target.closest('[data-prototype-open-pack]')) openPrototypePack();
  if (event.target.closest('#prototypeAddPhoto')) document.querySelector('#prototypeClubPhotoInput')?.click();
  if (event.target.closest('[data-prototype-open-pitch]')) openPrototypePitch();
});
document.addEventListener('change', (event) => {
  if (event.target.id !== 'prototypeClubPhotoInput' || !event.target.files?.[0]) return;
  const reader = new FileReader();
  reader.onload = () => {
    const image = new Image();
    image.onload = () => {
      const limit = 320;
      const scale = Math.min(1, limit / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height);
      savePrototypeClubPhoto(canvas.toDataURL('image/jpeg', 0.82));
    };
    image.src = String(reader.result);
  };
  reader.readAsDataURL(event.target.files[0]);
});
document.addEventListener('click', (event) => {
  const playButton = event.target.closest('[data-prototype-play]');
  if (!playButton) return;
  openPrototypeMatch(playButton.dataset.prototypePlay);
});

function restorePrototypeClubPhoto() {
  const photoUrl = state?.clubPhoto;
  const photo = document.querySelector('#prototypeClubPhoto');
  if (!photo) return;
  photo.textContent = photoUrl ? '' : '+';
  photo.style.backgroundImage = photoUrl ? `url("${photoUrl}")` : '';
  photo.classList.toggle('has-photo', Boolean(photoUrl));
}

function savePrototypeClubPhoto(photoUrl) {
  const photo = document.querySelector('#prototypeClubPhoto');
  if (photo) {
    photo.textContent = '';
    photo.style.backgroundImage = `url(${photoUrl})`;
    photo.classList.add('has-photo');
  }
  if (state) {
    state.clubPhoto = photoUrl;
    saveState();
  }
  showPrototypeToast('Club photo saved');
}

document.querySelector('#prototypeSettingsButton')?.addEventListener('click', () => {
  const account = activeAccount();
  if (!account) { showQuickLogin(); return; }
  const nameInput = document.querySelector('#prototypeClubNameInput');
  if (nameInput) nameInput.value = account.username;
  const mottoInput = document.querySelector('#prototypeClubMottoInput');
  if (mottoInput) mottoInput.value = account.motto || defaultProfileMotto;
  prototypeSettingsModal.hidden = false;
  requestAnimationFrame(() => nameInput?.focus());
});
document.querySelector('#prototypeSettingsClose')?.addEventListener('click', () => { prototypeSettingsModal.hidden = true; });
document.querySelector('#prototypeSettingsForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const account = activeAccount();
  if (!account) return;
  const name = cleanText(document.querySelector('#prototypeClubNameInput')?.value, 24);
  const motto = cleanText(document.querySelector('#prototypeClubMottoInput')?.value, 42) || defaultProfileMotto;
  if (!name || isUsernameTaken(name, account.id)) {
    showPrototypeToast(name ? 'That club name is already in use.' : 'Club name cannot be empty.');
    return;
  }
  account.username = name;
  account.motto = motto;
  account.isDev = isDeveloperUsername(name);
  account.state = state;
  saveAccounts();
  prototypeSettingsModal.hidden = true;
  render();
  showPrototypeToast(`${name} · ${motto}`);
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
let prototypeMatchCloseTimer = null;

function openPrototypeMatch(mode) {
  window.clearTimeout(prototypeMatchCloseTimer);
  if (!realMatchPanel || !prototypeMatchOverlay || !prototypeMatchHost) return;
  prototypeMatchHost.appendChild(realMatchPanel);
  document.querySelector('#prototypeMatchMode').textContent = mode.toUpperCase();
  prototypeMatchOverlay.hidden = false;
  startMatch(mode);
}

function closePrototypeMatch() {
  if (state?.activeMatch) endMatch({ abandoned: true });
  if (realMatchPanel && originalMatchParent) originalMatchParent.prepend(realMatchPanel);
  if (prototypeMatchOverlay) prototypeMatchOverlay.hidden = true;
}

document.querySelector('#prototypeMatchClose')?.addEventListener('click', closePrototypeMatch);
window.addEventListener('fc-stars-match-ended', (event) => {
  syncPrototypeBalances();
  if (event.detail.abandoned) {
    showPrototypeToast('Match left. No rewards awarded.');
  } else if (event.detail.won) {
    syncPrototypeBalances();
    const ranked = event.detail.tablePoints > 0 ? ` +${event.detail.tablePoints} RP.` : '';
    showPrototypeToast(`Victory! +${event.detail.coinReward} Coins.${ranked}`);
  } else if (event.detail.coinReward) {
    showPrototypeToast(`+${event.detail.coinReward} Coins for your goals.`);
  }
  prototypeMatchCloseTimer = window.setTimeout(() => {
    if (!state.activeMatch) closePrototypeMatch();
  }, 1100);
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
document.querySelector('#gamePromptForm')?.addEventListener('submit', () => window.setTimeout(() => { document.querySelector('#gamePromptOverlay')?.classList.remove('prototype-visible'); syncPrototypeBalances(); }));

for (const modal of [prototypeModal, prototypeSettingsModal]) {
  modal?.addEventListener('click', (event) => {
    if (event.target !== modal) return;
    if (modal === prototypeModal) closePrototypePack(true);
    else modal.hidden = true;
  });
}
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (!prototypeModal?.hidden) closePrototypePack(true);
  else if (!prototypeSettingsModal?.hidden) prototypeSettingsModal.hidden = true;
  else if (!prototypePitchOverlay?.hidden) closePrototypePitch();
  else if (!prototypeMatchOverlay?.hidden) closePrototypeMatch();
});

window.syncPrototypeShell();
