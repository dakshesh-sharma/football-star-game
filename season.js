/* Season screens share the existing club save and match engine. */
window.FCSeasonUI = (() => {
  let tab = 'journey';
  const trophy = `<svg class="s2-cup" viewBox="0 0 200 230" aria-hidden="true"><defs><linearGradient id="s2Gold" x1="0" x2="1"><stop stop-color="#9a612b"/><stop offset=".32" stop-color="#ffe6a3"/><stop offset=".65" stop-color="#edb95a"/><stop offset="1" stop-color="#9b612a"/></linearGradient></defs><path d="M56 30H25v29c0 35 20 52 48 55M144 30h31v29c0 35-20 52-48 55" fill="none" stroke="#d4a653" stroke-width="12"/><path d="M50 15h100v53c0 40-20 64-43 68v39l27 14v15H66v-15l27-14v-39c-23-4-43-28-43-68z" fill="url(#s2Gold)"/><path d="M66 25v43c0 25 7 43 20 51" fill="none" stroke="#fff1c5" stroke-width="3" opacity=".65"/><path d="m100 46 8 16 18 3-13 13 3 18-16-8-16 8 3-18-13-13 18-3z" fill="#714a21" opacity=".75"/><rect x="54" y="204" width="92" height="15" rx="3" fill="#d7aa5a"/><rect x="65" y="217" width="70" height="6" fill="#6b4d32"/></svg>`;
  const current = () => FCSeason.normalize(state.season);
  const progress = (value, max, label) => `<progress max="${max}" value="${Math.min(max, value)}" aria-label="${label}"></progress>`;
  function banner(compact = false) {
    const s = current(), done = s.stage === FCSeason.stages.length;
    return `<section class="s2-hero ${compact ? 'compact' : ''}"><div class="s2-hero-copy"><span class="s2-eyebrow"><i></i> SEASON 02 · CHAMPIONS RISE</span><h3>APNI TEAM.<br>APNI <em>LEGACY.</em></h3><p>Gali se grand final tak. Saat rivals.<br>Ek trophy. Ab tumhari baari.</p><div class="s2-actions"><button class="s2-primary" ${compact ? 'data-prototype-view="Season"' : 'data-season-play'}>${compact ? 'JOURNEY KHOLO' : done ? 'CHAMPION BAN GAYE ✓' : 'AGLA MATCH KHELO'} <span>↗</span></button>${compact ? '<button class="s2-secondary" data-matchday-setup="Quick Match">QUICK MATCH →</button>' : ''}</div><div class="s2-hero-meta"><span>7 STAGES</span><span>FREE REWARD PASS</span><span>11 v 11</span></div></div><div class="s2-trophy-art"><span class="s2-orbit"></span>${trophy}<span class="s2-trophy-caption">THE CHAMPIONS CUP<small>${done ? 'TROPHY TUMHARI HAI' : `${s.stage} / 7 STAGES JEETE`}</small></span></div></section>`;
  }
  function teaser() {
    const s = current(), next = FCSeason.tiers.find(t => !s.claimed.includes(t.level));
    const available = FCSeason.tiers.filter(t => s.xp >= t.xp && !s.claimed.includes(t.level)).length;
    return `<button class="s2-pass-teaser" data-season-open="rewards"><span class="s2-pass-icon">✦</span><span><small>SEASON 02 · FREE PASS</small><b>${available ? `${available} rewards claim karne ke liye ready` : next ? `Agla reward: ${next.coins} coins` : 'Saare rewards collect ho gaye!'}</b>${progress(s.xp, next?.xp || 1500, 'Season XP')}</span><strong>${s.xp}<small>SEASON XP</small></strong><em>↗</em></button>`;
  }
  function journey(s) {
    const stage = FCSeason.stages[s.stage];
    return `<div class="s2-section-heading"><div><span class="s2-eyebrow">ROAD TO THE CUP</span><h3>${stage ? 'Har jeet, ek kadam aage.' : 'Tumne kar dikhaya.'}</h3></div><span>${s.stage} / 7 COMPLETE</span></div><div class="s2-road">${FCSeason.stages.map((item, i) => {
      const won = i < s.stage, active = i === s.stage, record = s.records[i];
      return `<article class="s2-stage ${won ? 'won' : active ? 'active' : 'locked'}"><div class="s2-stage-marker">${won ? '✓' : String(i + 1).padStart(2, '0')}</div><span class="s2-club-badge">${item.badge}</span><div class="s2-stage-name"><small>${item.round.toUpperCase()}</small><h4>${item.name}</h4><p>${FCMatchday.difficulties[item.difficulty].label} · ${item.coins} bonus coins</p></div>${active ? '<button class="s2-primary" data-season-play>KHELO ↗</button>' : `<strong class="s2-stage-status">${won ? record ? `${record.home} – ${record.away} ✓` : 'JEET ✓' : 'LOCKED'}</strong>`}</article>`;
    }).join('')}</div><div class="s2-rule-note"><span>◎</span><p>Jeeto aur agla stage kholo. Draw ya haar par wahi stage dobara khelo. Stage bonus sirf pehli jeet par milta hai. Match chhodne par progress nahi milti.</p></div>${!stage ? '<div class="s2-champion"><b>CHAMPION 02 UNLOCKED</b><p>Profile mein apna naya title equip karo. Free pass aur trophies ke liye matches khelte raho.</p><button class="s2-primary" data-prototype-view="Profile">PROFILE KHOLO ↗</button></div>' : ''}`;
  }
  function rewards(s) {
    return `<div class="s2-section-heading"><div><span class="s2-eyebrow">KHELO. XP KAMAO. CLAIM KARO.</span><h3>Rewards sabke liye.</h3></div><span>${s.claimed.length} / 10 CLAIMED</span></div><div class="s2-xp-explainer"><span><b>+50</b> Match poora karo</span><span><b>+40</b> Jeet ka bonus</span><span><b>+10</b> Har goal · max 5 / match</span></div><div class="s2-reward-grid">${FCSeason.tiers.map(t => {
      const claimed = s.claimed.includes(t.level), ready = s.xp >= t.xp;
      return `<article class="s2-reward ${claimed ? 'claimed' : ready ? 'ready' : ''}"><header><span>TIER ${String(t.level).padStart(2, '0')}</span><small>${claimed ? 'COLLECTED ✓' : ready ? 'READY' : `${t.xp} XP`}</small></header><div class="s2-coin">${t.level === 10 ? '♛' : '✦'}</div><h4>${t.coins}<small>COINS</small></h4>${progress(s.xp, t.xp, `Tier ${t.level} progress`)}<button data-season-claim="${t.level}" ${claimed || !ready ? 'disabled' : ''}>${claimed ? 'CLAIMED ✓' : ready ? 'CLAIM KARO' : `${Math.max(0, t.xp - s.xp)} XP BAAKI`}</button></article>`;
    }).join('')}</div><p class="s2-footnote">Season XP, club XP se alag hai. Pass free hai aur iska koi expiry timer nahi hai. Coins se Packs tab mein players lo.</p>`;
  }
  function trophies(s) {
    return `<div class="s2-section-heading"><div><span class="s2-eyebrow">TUMHARI TROPHY CABINET</span><h3>Jeet ka saboot.</h3></div><span>${FCSeason.unlocked(s).length} / 8 UNLOCKED</span></div><div class="s2-trophy-grid">${FCSeason.achievements.map(a => {
      const value = Math.min(s[a.key], a.target), earned = value >= a.target;
      return `<article class="s2-achievement ${earned ? 'earned' : ''}"><span class="s2-medal">${a.icon}</span><small>${earned ? 'UNLOCKED ✓' : 'IN PROGRESS'}</small><h4>${a.name}</h4><p>${a.text}</p>${progress(value, a.target, a.name)}<b>${value} / ${a.target}</b></article>`;
    }).join('')}</div><p class="s2-footnote">Trophies Season 02 ke completed matches se unlock hoti hain. Champion 02 aur Season Legend profile titles bhi unlock karte hain.</p>`;
  }
  function open(next = 'journey') {
    tab = ['journey','rewards','trophies'].includes(next) ? next : 'journey';
    selectPrototypeView('Season');
  }
  function markup() {
    const s = current();
    return `<div class="s2-workspace">${banner()}<div class="s2-season-stats"><span><b>${s.xp}</b><small>SEASON XP</small></span><span><b>${s.wins}</b><small>JEET</small></span><span><b>${s.goals}</b><small>GOALS</small></span><span><b>${s.bestStreak}</b><small>BEST STREAK</small></span></div><nav class="s2-tabs" aria-label="Season screens">${[['journey','Champions Journey'],['rewards','Reward Pass'],['trophies','Trophies']].map(([key, label]) => `<button data-season-tab="${key}" aria-current="${tab === key ? 'page' : 'false'}">${label}${key === 'rewards' && FCSeason.tiers.some(t => s.xp >= t.xp && !s.claimed.includes(t.level)) ? '<i></i>' : ''}</button>`).join('')}</nav><div class="s2-tab-content">${tab === 'journey' ? journey(s) : tab === 'rewards' ? rewards(s) : trophies(s)}</div></div>`;
  }
  function resultMarkup(result) {
    if (!result.season) return '';
    const r = result.season;
    const xp = Math.max(0, Number(r.xp) || 0), coins = Math.max(0, Number(r.coins) || 0);
    const trophies = Array.isArray(r.trophies) ? r.trophies : [];
    return `<section class="s2-result"><span>SEASON 02</span><b>+${xp} SEASON XP${coins ? ` · +${coins} BONUS COINS` : ''}</b><p>${r.advanced ? 'Stage jeet liya! Agla rival tumhara intezaar kar raha hai.' : result.mode === 'Champions Journey' ? 'Journey yahin se continue hogi. Dobara try karo!' : 'Free pass mein tumhara progress badh gaya.'}</p>${trophies.length ? `<small>${trophies.map(key => FCSeason.achievements.find(a => a.id === key)?.name).filter(Boolean).join(' · ')} unlocked ✦</small>` : ''}</section>`;
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    if (button.hasAttribute('data-season-open') || button.hasAttribute('data-season-tab')) {
      const next = button.dataset.seasonOpen || button.dataset.seasonTab;
      if (!['journey','rewards','trophies'].includes(next)) return;
      tab = next; selectPrototypeView('Season');
      document.querySelector(`[data-season-tab="${tab}"]`)?.focus({preventScroll:true});
    }
    if (button.hasAttribute('data-season-play')) {
      if (current().stage >= FCSeason.stages.length) { tab = 'trophies'; selectPrototypeView('Season'); return; }
      FCMatchdayUI.setup('Champions Journey');
    }
    if (button.hasAttribute('data-season-claim')) {
      if (!activeAccount()) { showQuickLogin(); return; }
      const reward = FCSeason.claim(state.season, Number(button.dataset.seasonClaim));
      if (!reward.coins) return;
      state.season = reward.season;
      if (!state.infiniteCoins) state.matchPoints += reward.coins;
      saveState(); render(); selectPrototypeView('Season');
      document.querySelector(`[data-season-tab="rewards"]`)?.focus({preventScroll:true});
      showPrototypeToast(`+${reward.coins} coins! Reward collect ho gaya.`);
    }
  });
  return { banner, teaser, markup, resultMarkup, open };
})();
