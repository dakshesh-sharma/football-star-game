const labRoot = document.querySelector('.prototype-lab');
const tabs = labRoot?.querySelectorAll('.tab') || [];
const panels = labRoot?.querySelectorAll('[data-screen-panel]') || [];
const labToast = document.querySelector('#labToast');
let labMatchSeconds = 0;
const labColourPresets = {
  violet: ['#7838ef', '#c7ff37'], cyan: ['#087f9a', '#35f5ff'],
  coral: ['#d72f59', '#ffb23f'], gold: ['#a96b0b', '#ffe066']
};
const prototypeNewsStories = [
  { id:'messi-clasico-hat-trick', published:'2026-09-26T16:45:00+05:30', time:'12 min ago', category:'Classic rewind', player:'Lionel Messi', title:'Messi scored a hat-trick against Real Madrid — relive the 4–3 classic', dek:'Three goals, two penalties and one unforgettable Clásico performance from March 2014.', image:'assets/players/lionel-messi-v2.jpg', tone:'gold', tags:['Messi','Barcelona','Real Madrid','Match report'] },
  { id:'ronaldo-finishing', published:'2026-09-26T15:30:00+05:30', time:'1 hr ago', category:'Player focus', player:'Cristiano Ronaldo', title:'Ronaldo finishing masterclass: five movements every striker studies', dek:'Breaking down the timing, body shape and explosive first step behind the iconic number 7.', image:'assets/players/cristiano-ronaldo-v2.jpg', tone:'violet', tags:['Ronaldo','Portugal','Training'] },
  { id:'neymar-icons', published:'2026-09-26T13:10:00+05:30', time:'3 hrs ago', category:'FC Stars', player:'Neymar Jr', title:'Rising Icons spotlight: Neymar brings flair to the new event', dek:'Skill moves, creative passing and a G.O.A.T card headline this week’s prototype event.', image:'assets/neymar-jr.png', tone:'cyan', tags:['Neymar','Brazil','FC Stars'] },
  { id:'ronaldo-juventus', published:'2026-09-25T20:00:00+05:30', time:'Yesterday', category:'Classic rewind', player:'Cristiano Ronaldo', title:'The Ronaldo bicycle kick that brought an entire stadium to its feet', dek:'A frame-by-frame look back at the spectacular 2018 Champions League strike in Turin.', image:'assets/players/cristiano-ronaldo-v2.jpg', tone:'coral', tags:['Ronaldo','Real Madrid','Juventus','Champions League'] },
  { id:'messi-vision', published:'2026-09-25T17:20:00+05:30', time:'Yesterday', category:'Tactics', player:'Lionel Messi', title:'How Messi finds the pass before the defence sees the danger', dek:'The scanning habits and half-space positioning that make the Argentine impossible to predict.', image:'assets/players/lionel-messi-v2.jpg', tone:'violet', tags:['Messi','Argentina','Tactics'] },
  { id:'ronaldo-hat-tricks', published:'2026-09-24T18:00:00+05:30', time:'2 days ago', category:'Numbers', player:'Cristiano Ronaldo', title:'Ronaldo hat-trick archive: the nights when one player owned the scoreboard', dek:'From Madrid to Portugal, revisit a collection of ruthless three-goal performances.', image:'assets/players/cristiano-ronaldo-v2.jpg', tone:'gold', tags:['Ronaldo','Portugal','Hat-trick'] },
  { id:'ronaldo-nazario', published:'2026-09-23T12:00:00+05:30', time:'3 days ago', category:'Icons', player:'Ronaldo Nazário', title:'Ronaldo Nazário: the explosive number 9 who changed centre-forward play', dek:'Why O Fenômeno’s acceleration, balance and finishing still inspire modern attackers.', image:'assets/generated/fc-stars-stadium-v2.png', tone:'cyan', tags:['Ronaldo','Brazil','Icons'] },
  { id:'clasico-tactics', published:'2026-09-22T10:30:00+05:30', time:'4 days ago', category:'Match report', player:'', title:'Clásico tactical board: where Barcelona and Real Madrid create overloads', dek:'A clean visual guide to the wide rotations, midfield traps and transition lanes.', image:'assets/generated/fc-stars-stadium-v2.png', tone:'coral', tags:['Barcelona','Real Madrid','Match report'] }
].sort((a,b) => new Date(b.published) - new Date(a.published));
let labNewsFilter = 'All';
let prototypeNewsQuery = '';
let prototypeNewsFilter = 'All';
const prototypeSavedNews = new Set();
let prototypeProfileQuery = '';
let prototypeViewedProfileId = null;
let prototypeBackgroundStudioOpen = false;
let prototypeBackgroundMode = 'library';
const profileBackgroundOptions = ['stadium', 'royal', 'midnight', 'crimson', 'aurora', 'ocean', 'sunset', 'galaxy', 'trophy', 'electric'];

function newsEscape(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[character]);
}

function profilePromptHue(prompt) {
  let hash = 0;
  for (const character of String(prompt || 'FC Stars')) hash = ((hash << 5) - hash + character.charCodeAt(0)) | 0;
  return Math.abs(hash) % 360;
}

function profileBackgroundHeroAttributes(accountState, baseClass = 'profile-showcase-card') {
  const background = accountState?.profileBackground || 'stadium';
  if (background === 'ai') {
    const hue = Math.max(0, Math.min(359, Number(accountState?.profileAiBackground?.hue) || 268));
    return `class="${baseClass} background-ai" style="--ai-hue:${hue}"`;
  }
  if (background === 'upload' && /^data:image\/(?:png|jpeg|webp);base64,[a-z0-9+/=]+$/i.test(accountState?.profileUploadedBackground || '')) {
    return `class="${baseClass} background-upload" style="background-image:linear-gradient(90deg,#090a14d9,#090a1430),url(${newsEscape(accountState.profileUploadedBackground)})"`;
  }
  const safeBackground = profileBackgroundOptions.includes(background) ? background : 'stadium';
  return `class="${baseClass} background-${safeBackground}"`;
}

function backgroundLibraryMarkup(accountState, attribute = 'data-profile-background') {
  return profileBackgroundOptions.map((background) => `<button class="background-${background} ${accountState?.profileBackground === background ? 'selected' : ''}" ${attribute}="${background}"><i></i><b>${background}</b></button>`).join('');
}

function resizeProfileBackground(file) {
  return new Promise((resolve, reject) => {
    if (!file || !/^image\/(?:png|jpeg|webp)$/.test(file.type)) return reject(new Error('Choose a JPG, PNG or WebP image.'));
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('That image could not be opened.'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('That image could not be opened.'));
      image.onload = () => {
        const scale = Math.min(1, 1400 / image.width, 800 / image.height);
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale)); canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', .82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function filteredNewsStories(query = '', filter = 'All') {
  const term = String(query).trim().toLocaleLowerCase();
  return prototypeNewsStories.filter((story) => {
    const haystack = [story.title, story.dek, story.player, story.category, ...story.tags].join(' ').toLocaleLowerCase();
    const filterMatches = filter === 'All' || haystack.includes(filter.toLocaleLowerCase());
    return filterMatches && (!term || haystack.includes(term));
  });
}

function newsCardsMarkup(stories, context = 'lab') {
  if (!stories.length) return `<section class="news-empty"><b>NO STORIES FOUND</b><span>Try a player surname, club, or “match”.</span><button data-news-clear>Clear search</button></section>`;
  return stories.map((story, index) => `<article class="news-story-card tone-${story.tone} ${index === 0 ? 'news-featured' : ''}" data-news-id="${story.id}">
    <div class="news-story-art"><img src="${newsEscape(story.image)}" alt="${newsEscape(story.player || 'Football stadium')}"><span>${newsEscape(story.category)}</span></div>
    <div class="news-story-copy"><div class="news-story-meta"><time datetime="${story.published}">${newsEscape(story.time)}</time><span>${index === 0 ? 'LATEST' : newsEscape(story.tags[0])}</span></div><h3>${newsEscape(story.title)}</h3><p>${newsEscape(story.dek)}</p><div class="news-story-footer"><span>${story.tags.slice(0,3).map((tag) => `#${newsEscape(tag.replaceAll(' ', ''))}`).join(' ')}</span><button data-news-save="${story.id}" aria-label="Save ${newsEscape(story.title)}">${prototypeSavedNews.has(story.id) ? '★ SAVED' : '☆ SAVE'}</button></div></div>
  </article>`).join('');
}

function renderLabNews() {
  const feed = document.querySelector('#labNewsFeed');
  if (!feed) return;
  const stories = filteredNewsStories(document.querySelector('#labNewsSearch')?.value, labNewsFilter);
  feed.innerHTML = `<div class="news-result-line"><span>${stories.length} stor${stories.length === 1 ? 'y' : 'ies'}</span><b>NEWEST FIRST ↓</b></div>${newsCardsMarkup(stories)}`;
}

function showLabToast(message) {
  if (!labToast) return;
  labToast.textContent = message;
  labToast.classList.add('is-visible');
  clearTimeout(showLabToast.timer);
  showLabToast.timer = setTimeout(() => labToast.classList.remove('is-visible'), 2200);
}

function selectLabScreen(screen, mode = '') {
  tabs.forEach((tab) => tab.classList.toggle('is-active', tab.dataset.screen === screen));
  panels.forEach((panel) => panel.classList.toggle('is-active', panel.dataset.screenPanel === screen));
  if (screen === 'match' && mode) document.querySelector('#labMatchMode').textContent = `DIVISION 4 · ${mode.toUpperCase()}`;
  document.querySelector('#labMenu')?.setAttribute('hidden', '');
}

function readableAccent(hex) {
  const value = hex.replace('#', '');
  const red = parseInt(value.slice(0, 2), 16), green = parseInt(value.slice(2, 4), 16), blue = parseInt(value.slice(4, 6), 16);
  const brightest = Math.max(red, green, blue);
  return brightest < 145 ? '#ffffff' : hex;
}

function applyLabColour(name, primary, accent, persist = true) {
  if (!labRoot) return;
  labRoot.style.setProperty('--club-primary', primary);
  labRoot.style.setProperty('--club-accent', accent);
  labRoot.style.setProperty('--lime', accent);
  labRoot.style.setProperty('--purple', primary);
  labRoot.dataset.clubColour = name;
  document.querySelectorAll('[data-club-colour]').forEach((item) => item.classList.toggle('selected', item.dataset.clubColour === name));
  if (persist) localStorage.setItem('fc-stars-lab-colour', JSON.stringify({ name, primary, accent }));
}

tabs.forEach((tab) => tab.addEventListener('click', () => selectLabScreen(tab.dataset.screen)));
labRoot?.querySelectorAll('[data-go]').forEach((button) => button.addEventListener('click', () => selectLabScreen(button.dataset.go, button.dataset.mode)));
labRoot?.querySelectorAll('[data-lab-toast]').forEach((button) => button.addEventListener('click', () => showLabToast(button.dataset.labToast)));
document.querySelector('#labMenuButton')?.addEventListener('click', () => document.querySelector('#labMenu')?.toggleAttribute('hidden'));
document.querySelector('#labThemeButton')?.addEventListener('click', () => {
  const names = Object.keys(labColourPresets);
  const nextName = names[(names.indexOf(labRoot.dataset.clubColour || 'violet') + 1) % names.length];
  applyLabColour(nextName, ...labColourPresets[nextName]);
  showLabToast(`${nextName} club colours equipped across the prototype.`);
});
document.querySelector('#labAddBalance')?.addEventListener('click', () => {
  const coins = document.querySelector('#labCoins');
  const gems = document.querySelector('#labGems');
  coins.textContent = (Number(coins.textContent.replace(',', '')) + 500).toLocaleString();
  gems.textContent = Number(gems.textContent) + 25;
  showLabToast('+500 coins and +25 gems added for testing.');
});

const packButton = document.querySelector('#openPack');
const pack = document.querySelector('#pack');
const reveal = document.querySelector('#revealCard');
const packHint = document.querySelector('#packHint');
const labCards = [
  ['91', 'NEYMAR JR', 'LW · BRAZIL'], ['90', 'VINÍCIUS JR', 'LW · BRAZIL'],
  ['89', 'BELLINGHAM', 'CAM · ENGLAND'], ['88', 'YAMAL', 'RW · SPAIN']
];
let labPackOpen = false;
packButton?.addEventListener('click', () => {
  if (labPackOpen) {
    labPackOpen = false; reveal.hidden = true; pack.classList.remove('is-opening');
    packButton.innerHTML = 'OPEN PACK <span>◆ 75</span>'; packHint.textContent = 'Guaranteed: 1 player rated 82+'; return;
  }
  const card = labCards[Math.floor(Math.random() * labCards.length)];
  document.querySelector('#labRevealRating').textContent = card[0];
  document.querySelector('#labRevealName').textContent = card[1];
  document.querySelector('#labRevealMeta').textContent = card[2];
  pack.classList.add('is-opening'); packButton.disabled = true; packHint.textContent = 'A superstar is walking out…';
  setTimeout(() => {
    reveal.hidden = false; labPackOpen = true; packButton.disabled = false;
    packButton.textContent = 'OPEN ANOTHER'; packHint.textContent = `${card[1]} added to your club.`; showLabToast(`${card[1]} joins your squad!`);
  }, 650);
});

const inspector = document.querySelector('#playerInspector');
let selectedLabCard = null;
document.querySelectorAll('.player-card').forEach((card) => card.addEventListener('click', () => {
  document.querySelectorAll('.player-card').forEach((item) => item.classList.remove('is-selected'));
  card.classList.add('is-selected'); selectedLabCard = card;
  if (inspector) inspector.querySelector('span').textContent = `${card.dataset.player} selected · ${card.querySelector('b').textContent} OVR`;
}));
document.querySelector('#labEditSquad')?.addEventListener('click', (event) => {
  document.querySelector('.pitch-prototype')?.classList.toggle('is-editing');
  event.currentTarget.textContent = event.currentTarget.textContent === 'EDIT' ? 'DONE' : 'EDIT';
  showLabToast('Squad edit mode toggled. Pick a card to swap.');
});
document.querySelector('#labSwapPlayer')?.addEventListener('click', () => {
  if (!selectedLabCard) return showLabToast('Select a player card first.');
  const bench = [['MBAPPÉ', '92'], ['HAALAND', '91'], ['RODRI', '90']];
  const next = bench[Math.floor(Math.random() * bench.length)];
  selectedLabCard.dataset.player = next[0]; selectedLabCard.querySelector('small').textContent = next[0]; selectedLabCard.querySelector('b').textContent = next[1];
  inspector.querySelector('span').textContent = `${next[0]} swapped in · ${next[1]} OVR`; document.querySelector('#labTeamRating').textContent = '89';
  showLabToast(`${next[0]} is now in your Starting XI.`);
});

setInterval(() => {
  if (!document.querySelector('[data-screen-panel="match"]')?.classList.contains('is-active')) return;
  labMatchSeconds += 1;
  const clock = document.querySelector('#labMatchClock');
  if (clock) clock.textContent = `${String(Math.floor(labMatchSeconds / 60)).padStart(2, '0')}:${String(labMatchSeconds % 60).padStart(2, '0')}`;
}, 1000);
labRoot?.querySelectorAll('[data-match-action]').forEach((button) => button.addEventListener('click', () => {
  const action = button.dataset.matchAction;
  const moment = document.querySelector('#labMoment');
  document.querySelector('.ball')?.classList.remove('action-pass', 'action-shot');
  if (action === 'pass') { moment.textContent = 'PERFECT PASS TO NUMBER 7'; document.querySelector('.ball')?.classList.add('action-pass'); }
  if (action === 'sprint') { moment.textContent = 'NEYMAR BURSTS INTO SPACE'; document.querySelector('.you')?.classList.add('is-sprinting'); setTimeout(() => document.querySelector('.you')?.classList.remove('is-sprinting'), 500); }
  if (action === 'shoot') {
    document.querySelector('.ball')?.classList.add('action-shot');
    const goal = Math.random() > .25;
    moment.textContent = goal ? 'GOAL! TOP CORNER!' : 'SAVED BY THE KEEPER';
    if (goal) { const score = document.querySelector('#labHomeScore'); score.textContent = Number(score.textContent) + 1; document.querySelector('#labMissionProgress').style.width = '100%'; document.querySelector('#labMissionLabel').textContent = '1 / 1 completed'; }
  }
}));

const joystick = document.querySelector('#labJoystick');
function moveLabStick(event) {
  if (!joystick?.hasPointerCapture(event.pointerId)) return;
  const box = joystick.getBoundingClientRect(); const x = Math.max(-28, Math.min(28, event.clientX - box.left - box.width / 2)); const y = Math.max(-28, Math.min(28, event.clientY - box.top - box.height / 2));
  joystick.querySelector('i').style.transform = `translate(${x}px,${y}px)`;
  const player = document.querySelector('.field-player.you'); player.style.translate = `${x * .25}px ${y * .25}px`;
}
joystick?.addEventListener('pointerdown', (event) => { joystick.setPointerCapture(event.pointerId); moveLabStick(event); });
joystick?.addEventListener('pointermove', moveLabStick);
joystick?.addEventListener('pointerup', () => { joystick.querySelector('i').style.transform = ''; });
document.querySelector('#labSaveClub')?.addEventListener('click', () => {
  const name = document.querySelector('#labClubName').value.trim().slice(0, 18) || 'FC STARS';
  document.querySelector('#labClubHeroName').textContent = name; showLabToast(`${name} club identity saved.`);
});
document.querySelector('.lab-profile-backgrounds')?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-lab-profile-bg]'); if (!button) return;
  document.querySelectorAll('[data-lab-profile-bg]').forEach((item) => item.classList.toggle('selected', item === button));
  const hero = document.querySelector('#labProfileHero'); hero.className = `lab-profile-hero background-${button.dataset.labProfileBg}`;
  showLabToast(`${button.textContent.trim()} profile background equipped.`);
});
const labBackgroundLibrary = document.querySelector('[data-lab-bg-pane="library"] .background-library');
if (labBackgroundLibrary) labBackgroundLibrary.innerHTML = backgroundLibraryMarkup({ profileBackground:'stadium' }, 'data-lab-profile-bg');
document.querySelector('#labSeeAllBackgrounds')?.addEventListener('click', (event) => {
  const studio = document.querySelector('#labBackgroundStudio'); studio.toggleAttribute('hidden');
  event.currentTarget.textContent = studio.hidden ? 'SEE ALL +' : 'CLOSE ×';
});
document.querySelector('#labBackgroundStudio')?.addEventListener('click', (event) => {
  const modeButton = event.target.closest('[data-lab-bg-mode]');
  if (modeButton) {
    document.querySelectorAll('[data-lab-bg-mode]').forEach((button) => button.classList.toggle('selected', button === modeButton));
    document.querySelectorAll('[data-lab-bg-pane]').forEach((pane) => pane.hidden = pane.dataset.labBgPane !== modeButton.dataset.labBgMode);
    return;
  }
  const backgroundButton = event.target.closest('[data-lab-profile-bg]');
  if (backgroundButton) {
    document.querySelectorAll('[data-lab-profile-bg]').forEach((button) => button.classList.toggle('selected', button.dataset.labProfileBg === backgroundButton.dataset.labProfileBg));
    const hero = document.querySelector('#labProfileHero'); hero.removeAttribute('style'); hero.className = `lab-profile-hero background-${backgroundButton.dataset.labProfileBg}`;
    showLabToast(`${backgroundButton.textContent.trim()} profile background equipped.`);
  }
});
document.querySelector('#labGenerateBackground')?.addEventListener('click', () => {
  const prompt = document.querySelector('#labAiBackgroundPrompt').value.trim();
  if (!prompt) return showLabToast('Describe your background first.');
  const hero = document.querySelector('#labProfileHero'); hero.className = 'lab-profile-hero background-ai'; hero.style.setProperty('--ai-hue', profilePromptHue(prompt));
  showLabToast(`AI scene “${prompt.slice(0, 28)}” generated and equipped.`);
});
document.querySelector('#labUploadBackgroundButton')?.addEventListener('click', () => document.querySelector('#labUploadBackgroundInput')?.click());
document.querySelector('#labUploadBackgroundInput')?.addEventListener('change', async (event) => {
  try {
    const image = await resizeProfileBackground(event.target.files?.[0]);
    const hero = document.querySelector('#labProfileHero'); hero.className = 'lab-profile-hero background-upload'; hero.style.backgroundImage = `linear-gradient(90deg,#090a14d9,#090a1430),url(${image})`;
    showLabToast('Your photo is now the profile background.');
  } catch (error) { showLabToast(error.message); }
  event.target.value = '';
});
document.querySelector('[data-lab-title]')?.addEventListener('click', (event) => {
  document.querySelector('#labProfileTitle').textContent = event.currentTarget.dataset.labTitle.toUpperCase(); showLabToast('Title equipped.');
});
document.querySelector('#labProfileSearch')?.addEventListener('input', (event) => {
  const value = event.target.value.trim(); document.querySelector('#labProfileName').textContent = value || 'ARJUN FC';
});
document.querySelector('.club-colours')?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-club-colour]');
  if (!button) return;
  applyLabColour(button.dataset.clubColour, button.dataset.primary, button.dataset.accent);
  showLabToast(`${button.dataset.clubColour} colours equipped across every screen.`);
});
document.querySelector('#labSeeAllColours')?.addEventListener('click', (event) => {
  const panel = document.querySelector('#labCustomColourPanel');
  panel.toggleAttribute('hidden');
  event.currentTarget.textContent = panel.hidden ? 'SEE ALL +' : 'CLOSE ×';
});
document.querySelector('#labCustomColour')?.addEventListener('input', (event) => {
  document.querySelector('#labCustomColourValue').textContent = event.target.value.toUpperCase();
});
document.querySelector('#labApplyCustomColour')?.addEventListener('click', () => {
  const colour = document.querySelector('#labCustomColour').value;
  const accent = readableAccent(colour);
  const swatch = document.querySelector('#labCustomSwatch');
  swatch.hidden = false; swatch.dataset.primary = colour; swatch.dataset.accent = accent; swatch.style.background = colour;
  applyLabColour('custom', colour, accent);
  showLabToast(`${colour.toUpperCase()} added and applied to the whole club.`);
});
document.querySelector('#labNewsSearch')?.addEventListener('input', renderLabNews);
document.querySelector('#labNewsFilters')?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-news-filter]');
  if (!button) return;
  labNewsFilter = button.dataset.newsFilter;
  document.querySelectorAll('#labNewsFilters [data-news-filter]').forEach((item) => item.classList.toggle('selected', item === button));
  renderLabNews();
});
document.querySelector('#labNewsFeed')?.addEventListener('click', (event) => {
  if (event.target.closest('[data-news-clear]')) {
    document.querySelector('#labNewsSearch').value = ''; labNewsFilter = 'All';
    document.querySelectorAll('#labNewsFilters [data-news-filter]').forEach((item) => item.classList.toggle('selected', item.dataset.newsFilter === 'All'));
    renderLabNews(); return;
  }
  const saveButton = event.target.closest('[data-news-save]');
  if (saveButton) {
    const id = saveButton.dataset.newsSave;
    prototypeSavedNews.has(id) ? prototypeSavedNews.delete(id) : prototypeSavedNews.add(id);
    renderLabNews(); showLabToast(prototypeSavedNews.has(id) ? 'Story saved to your reading list.' : 'Story removed from saved.'); return;
  }
  const story = event.target.closest('[data-news-id]');
  if (story) { story.classList.add('is-read'); showLabToast('Story opened · marked as read.'); }
});
document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === 'k' && labRoot) {
    event.preventDefault(); selectLabScreen('news'); document.querySelector('#labNewsSearch')?.focus();
  }
});
if (labRoot) {
  try {
    const savedColour = JSON.parse(localStorage.getItem('fc-stars-lab-colour'));
    if (savedColour?.primary && savedColour?.accent) {
      const swatch = document.querySelector('#labCustomSwatch');
      if (savedColour.name === 'custom') { swatch.hidden = false; swatch.dataset.primary = savedColour.primary; swatch.dataset.accent = savedColour.accent; swatch.style.background = savedColour.primary; }
      applyLabColour(savedColour.name, savedColour.primary, savedColour.accent, false);
    } else applyLabColour('violet', ...labColourPresets.violet, false);
  } catch { applyLabColour('violet', ...labColourPresets.violet, false); }
  renderLabNews();
}

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
  if (activeView === 'Home' || activeView === 'Squad' || activeView === 'Club' || activeView === 'Profile') prototypeWorkspace.innerHTML = prototypeViewMarkup(activeView);
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

function newsWorkspaceMarkup() {
  const stories = filteredNewsStories(prototypeNewsQuery, prototypeNewsFilter);
  return `<section class="workspace-card news-workspace">
    <header class="news-workspace-head"><div><span class="news-live-badge"><i></i> DEMO NEWSROOM</span><p>THE DAILY TOUCHLINE</p><h3>Football never stops.</h3><small>Curated prototype stories · newest publication time first</small></div><div class="news-pulse"><b>${stories.length}</b><span>STORIES FOUND</span><i>UPDATED NOW</i></div></header>
    <div class="news-tools"><label><span>⌕</span><input id="prototypeNewsSearch" type="search" value="${newsEscape(prototypeNewsQuery)}" placeholder="Search Ronaldo, Messi, clubs…" autocomplete="off"><kbd>⌘ K</kbd></label><div id="prototypeNewsFilters" class="news-filter-row">${['All','Ronaldo','Messi','Match report'].map((filter) => `<button class="${filter === prototypeNewsFilter ? 'selected' : ''}" data-news-filter="${filter}">${filter === 'Match report' ? 'Matches' : filter}</button>`).join('')}</div></div>
    <div id="prototypeNewsFeed" class="prototype-news-feed"><div class="news-result-line"><span>${stories.length} stor${stories.length === 1 ? 'y' : 'ies'}</span><b>NEWEST FIRST ↓</b></div>${newsCardsMarkup(stories, 'desktop')}</div>
  </section>`;
}

function updatePrototypeNewsResults() {
  const feed = document.querySelector('#prototypeNewsFeed');
  if (!feed) return;
  const stories = filteredNewsStories(prototypeNewsQuery, prototypeNewsFilter);
  feed.innerHTML = `<div class="news-result-line"><span>${stories.length} stor${stories.length === 1 ? 'y' : 'ies'}</span><b>NEWEST FIRST ↓</b></div>${newsCardsMarkup(stories, 'desktop')}`;
  const pulse = document.querySelector('.news-pulse b');
  if (pulse) pulse.textContent = stories.length;
}

function profileTitles(accountState) {
  const iconCount = (accountState.inventory || []).filter((card) => card.rarity === 'Icon' || card.rarity === 'G.O.A.T').length;
  const ronaldoStreak = Number(accountState.taskProgress?.ronaldoWinStreak) || 0;
  const totalWins = Number(accountState.taskProgress?.totalWins) || 0;
  return [
    { name:'Club Founder', unlocked:true, progress:1, target:1, task:'Create your club' },
    { name:'Siuuu Streak', unlocked:ronaldoStreak >= 10, progress:ronaldoStreak, target:10, task:'Win 10 matches in a row controlling Ronaldo' },
    { name:'Icon Collector', unlocked:iconCount >= 5, progress:iconCount, target:5, task:'Own 5 Icon or G.O.A.T players' },
    { name:'Division Climber', unlocked:(Number(accountState.rankedPoints) || 0) >= 100, progress:Number(accountState.rankedPoints) || 0, target:100, task:'Earn 100 Ranked Points' },
    { name:'Serial Winner', unlocked:totalWins >= 25, progress:totalWins, target:25, task:'Win 25 matches' }
  ];
}

function profileOwnedPlayers(accountState) {
  const cards = [accountState.selectedStar, ...(accountState.inventory || []), ...Object.values(accountState.teamCards || {})].filter(Boolean).map(enrichCard).filter(Boolean);
  return [...new Map(cards.map((card) => [card.name, card])).values()];
}

function profileWorkspaceMarkup() {
  const current = activeAccount();
  const viewed = accounts.find((account) => account.id === prototypeViewedProfileId) || current;
  const viewedState = viewed?.state || freshState(false);
  const isOwn = viewed?.id === current?.id;
  const query = prototypeProfileQuery.trim().toLocaleLowerCase();
  const matches = query ? accounts.filter((account) => account.username.toLocaleLowerCase().includes(query)).slice(0, 6) : [];
  const titles = profileTitles(viewedState);
  const owned = profileOwnedPlayers(viewedState);
  const showcaseNames = (viewedState.showcasePlayerNames || []).filter((name) => owned.some((card) => card.name === name)).slice(0, 3);
  const showcase = showcaseNames.map((name) => owned.find((card) => card.name === name)).filter(Boolean);
  const selectedTitle = titles.some((title) => title.name === viewedState.profileTitle && title.unlocked) ? viewedState.profileTitle : 'Club Founder';
  const studioPane = prototypeBackgroundMode === 'library'
    ? `<div class="background-library">${backgroundLibraryMarkup(viewedState)}</div>`
    : prototypeBackgroundMode === 'ai'
      ? `<label class="ai-background-maker"><span>Describe the background you want</span><input id="prototypeAiBackgroundPrompt" maxlength="80" value="${newsEscape(viewedState.profileAiBackground?.prompt || '')}" placeholder="e.g. neon Champions League night"><button type="button" data-generate-profile-background>✦ GENERATE BACKGROUND</button><small>Creates a unique colour scene from your words.</small></label>`
      : `<button type="button" class="upload-background-button" data-upload-profile-background><b>↑</b><span>CHOOSE FROM FINDER OR PHOTOS</span><small>Works on laptop and phone · JPG, PNG or WebP</small></button><input id="prototypeProfileBackgroundInput" type="file" accept="image/png,image/jpeg,image/webp" hidden>`;
  return `<section class="workspace-card profile-workspace">
    <div class="profile-search-panel"><div><p>FIND A MANAGER</p><h3>Search profiles</h3></div><label><span>⌕</span><input id="prototypeProfileSearch" value="${newsEscape(prototypeProfileQuery)}" placeholder="Search any username" autocomplete="off"></label><div id="prototypeProfileResults" class="profile-search-results">${query ? (matches.length ? matches.map((account) => `<button data-profile-account="${account.id}"><i>${newsEscape(avatarStyles[account.avatarStyle] || 'FC')}</i><span><b>${newsEscape(account.username)}</b><small>${newsEscape(account.state?.profileTitle || 'Club Founder')} · Level ${newsEscape(levelDisplay(account.state?.level || 1, account.state?.infiniteLevel))}</small></span><em>VIEW →</em></button>`).join('') : '<p>No local profile found.</p>') : '<p>Search profiles created on this game.</p>'}</div></div>
    <section ${profileBackgroundHeroAttributes(viewedState)}><div class="profile-showcase-shade"></div><header><span class="profile-big-avatar">${newsEscape(avatarStyles[viewed?.avatarStyle] || 'YOU')}</span><div><small>LEVEL ${newsEscape(levelDisplay(viewedState.level || 1, viewedState.infiniteLevel))} · DIVISION ${prototypeDivision(viewedState.rankedPoints)}</small><h3>${newsEscape(viewed?.username || 'FC Manager')}</h3><p>${newsEscape(viewed?.motto || 'Build your XI')}</p></div><b>${newsEscape(selectedTitle)}</b></header><div class="profile-player-showcase">${showcase.length ? showcase.map((card) => `<article><img src="${newsEscape(playerPhoto(card))}" alt="${newsEscape(card.name)}"><span><b>${newsEscape(ratingLabel(card))}</b><small>${newsEscape(card.position)}</small></span><strong>${newsEscape(shortName(card.name))}</strong></article>`).join('') : '<div class="profile-empty-showcase">Choose up to three players below to build your showcase.</div>'}</div></section>
    ${isOwn ? `<section class="profile-customize"><div class="profile-section-heading"><div><p>PROFILE BACKGROUND</p><h3>Set the atmosphere</h3></div><button class="profile-see-all" data-profile-see-all>${prototypeBackgroundStudioOpen ? 'CLOSE ×' : 'SEE ALL +'}</button></div><div class="profile-backgrounds profile-backgrounds-quick">${['stadium','royal','midnight','crimson'].map((background) => `<button class="background-${background} ${viewedState.profileBackground === background ? 'selected' : ''}" data-profile-background="${background}"><i></i><b>${background}</b></button>`).join('')}</div>${prototypeBackgroundStudioOpen ? `<section class="background-studio"><div class="background-studio-options"><button class="${prototypeBackgroundMode === 'library' ? 'selected' : ''}" data-profile-bg-mode="library"><b>10</b><span>Choose backgrounds</span><small>Pick a ready-made scene</small></button><button class="${prototypeBackgroundMode === 'ai' ? 'selected' : ''}" data-profile-bg-mode="ai"><b>✦</b><span>Make with AI</span><small>Describe your dream scene</small></button><button class="${prototypeBackgroundMode === 'upload' ? 'selected' : ''}" data-profile-bg-mode="upload"><b>↑</b><span>Finder or Photos</span><small>Add your own image</small></button></div><div class="background-studio-pane">${studioPane}</div></section>` : ''}<div class="profile-section-heading"><div><p>SHOWCASE PLAYERS</p><h3>Choose up to three</h3></div><span>${showcaseNames.length} / 3 selected</span></div><div class="profile-player-picker">${owned.length ? owned.map((card) => `<button class="${showcaseNames.includes(card.name) ? 'selected' : ''}" data-profile-player="${newsEscape(card.name)}"><img src="${newsEscape(playerPhoto(card))}" alt=""><span><b>${newsEscape(shortName(card.name))}</b><small>${newsEscape(card.rarity)}</small></span></button>`).join('') : '<p>Collect players to build your showcase.</p>'}</div><div class="profile-section-heading"><div><p>UNLOCKABLE TITLES</p><h3>Complete tasks. Earn status.</h3></div></div><div class="profile-title-grid">${titles.map((title) => `<button class="${title.unlocked ? 'unlocked' : 'locked'} ${selectedTitle === title.name ? 'selected' : ''}" data-profile-title="${newsEscape(title.name)}" ${title.unlocked ? '' : 'disabled'}><span>${title.unlocked ? '◆' : '🔒'}</span><b>${newsEscape(title.name)}</b><small>${newsEscape(title.task)}</small><i><em style="width:${Math.min(100,title.progress/title.target*100)}%"></em></i><u>${Math.min(title.progress,title.target)} / ${title.target}</u></button>`).join('')}</div></section>` : '<p class="profile-viewing-note">Viewing another manager’s public profile.</p>'}
  </section>`;
}

function prototypeViewMarkup(view) {
  if (view === 'Profile') return profileWorkspaceMarkup();
  if (view === 'News') return newsWorkspaceMarkup();
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
    Club: ['CLUB · IDENTITY', 'Wear your<br><em>identity.</em>'],
    News: ['NEWS · THE DAILY TOUCHLINE', 'Know the<br><em>whole game.</em>'],
    Profile: ['PROFILE · MANAGER ID', 'Show your<br><em>football story.</em>']
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
  const profileAccount = event.target.closest('[data-profile-account]');
  if (profileAccount) { prototypeViewedProfileId = profileAccount.dataset.profileAccount; prototypeWorkspace.innerHTML = profileWorkspaceMarkup(); }
  if (event.target.closest('[data-profile-see-all]')) { prototypeBackgroundStudioOpen = !prototypeBackgroundStudioOpen; prototypeWorkspace.innerHTML = profileWorkspaceMarkup(); }
  const profileBackgroundMode = event.target.closest('[data-profile-bg-mode]');
  if (profileBackgroundMode) { prototypeBackgroundMode = profileBackgroundMode.dataset.profileBgMode; prototypeWorkspace.innerHTML = profileWorkspaceMarkup(); }
  if (event.target.closest('[data-generate-profile-background]') && activeAccount()) {
    const prompt = document.querySelector('#prototypeAiBackgroundPrompt')?.value.trim() || '';
    if (!prompt) { showPrototypeToast('Describe your dream background first.'); return; }
    state.profileAiBackground = { prompt, hue:profilePromptHue(prompt) }; state.profileBackground = 'ai'; saveState();
    prototypeWorkspace.innerHTML = profileWorkspaceMarkup(); showPrototypeToast('Your AI-style background is ready.');
  }
  if (event.target.closest('[data-upload-profile-background]')) document.querySelector('#prototypeProfileBackgroundInput')?.click();
  const profileBackground = event.target.closest('[data-profile-background]');
  if (profileBackground && activeAccount()) { state.profileBackground = profileBackground.dataset.profileBackground; saveState(); prototypeWorkspace.innerHTML = profileWorkspaceMarkup(); showPrototypeToast('Profile background equipped.'); }
  const profilePlayer = event.target.closest('[data-profile-player]');
  if (profilePlayer && activeAccount()) {
    const name = profilePlayer.dataset.profilePlayer; const selected = [...(state.showcasePlayerNames || [])]; const index = selected.indexOf(name);
    if (index >= 0) selected.splice(index, 1); else if (selected.length < 3) selected.push(name); else { showPrototypeToast('Choose up to three showcase players.'); return; }
    state.showcasePlayerNames = selected; saveState(); prototypeWorkspace.innerHTML = profileWorkspaceMarkup();
  }
  const profileTitle = event.target.closest('[data-profile-title]');
  if (profileTitle && !profileTitle.disabled && activeAccount()) { state.profileTitle = profileTitle.dataset.profileTitle; saveState(); prototypeWorkspace.innerHTML = profileWorkspaceMarkup(); showPrototypeToast(`${state.profileTitle} title equipped.`); }
  const newsFilter = event.target.closest('#prototypeNewsFilters [data-news-filter]');
  if (newsFilter) {
    prototypeNewsFilter = newsFilter.dataset.newsFilter;
    document.querySelectorAll('#prototypeNewsFilters [data-news-filter]').forEach((item) => item.classList.toggle('selected', item === newsFilter));
    updatePrototypeNewsResults();
  }
  const newsSave = event.target.closest('#prototypeNewsFeed [data-news-save]');
  if (newsSave) {
    const id = newsSave.dataset.newsSave;
    prototypeSavedNews.has(id) ? prototypeSavedNews.delete(id) : prototypeSavedNews.add(id);
    updatePrototypeNewsResults(); showPrototypeToast(prototypeSavedNews.has(id) ? 'Story saved to your reading list.' : 'Story removed from saved.');
  }
  if (event.target.closest('#prototypeNewsFeed [data-news-clear]')) {
    prototypeNewsQuery = ''; prototypeNewsFilter = 'All'; selectPrototypeView('News');
  }
  const newsStory = event.target.closest('#prototypeNewsFeed [data-news-id]');
  if (newsStory && !newsSave) { newsStory.classList.add('is-read'); showPrototypeToast('Story opened · marked as read.'); }
  const actionButton = event.target.closest('[data-prototype-action]');
  if (actionButton?.dataset.prototypeAction === 'Club settings') document.querySelector('#prototypeSettingsButton')?.click();
  if (event.target.closest('[data-prototype-open-pack]')) openPrototypePack();
  if (event.target.closest('#prototypeAddPhoto')) document.querySelector('#prototypeClubPhotoInput')?.click();
  if (event.target.closest('[data-prototype-open-pitch]')) openPrototypePitch();
});
document.addEventListener('input', (event) => {
  if (event.target.id === 'prototypeProfileSearch') {
    prototypeProfileQuery = event.target.value; prototypeWorkspace.innerHTML = profileWorkspaceMarkup();
    const input = document.querySelector('#prototypeProfileSearch'); input?.focus(); input?.setSelectionRange(prototypeProfileQuery.length, prototypeProfileQuery.length); return;
  }
  if (event.target.id !== 'prototypeNewsSearch') return;
  prototypeNewsQuery = event.target.value;
  updatePrototypeNewsResults();
});
document.addEventListener('change', async (event) => {
  if (event.target.id !== 'prototypeProfileBackgroundInput' || !activeAccount()) return;
  try {
    state.profileUploadedBackground = await resizeProfileBackground(event.target.files?.[0]); state.profileBackground = 'upload'; saveState();
    prototypeWorkspace.innerHTML = profileWorkspaceMarkup(); showPrototypeToast('Custom background uploaded and equipped.');
  } catch (error) { showPrototypeToast(error.message); }
});
document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === 'k' && prototypeWorkspace) {
    event.preventDefault(); selectPrototypeView('News'); document.querySelector('#prototypeNewsSearch')?.focus();
  }
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

if (prototypeWorkspace && typeof state !== 'undefined') window.syncPrototypeShell();
