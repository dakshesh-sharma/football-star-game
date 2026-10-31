/* Account-scoped Season 02 rules. No clock, DOM or storage dependencies. */
window.FCSeason = (() => {
  const id = 'champions-02';
  const stages = [
    { name: 'Academy XI', badge: 'AC', round: 'First steps', difficulty: 'relaxed', coins: 75 },
    { name: 'Street Kings', badge: 'SK', round: 'Street showdown', difficulty: 'relaxed', coins: 100 },
    { name: 'Coastal United', badge: 'CU', round: 'City qualifier', difficulty: 'balanced', coins: 125 },
    { name: 'Metro Athletic', badge: 'MA', round: 'Round of 16', difficulty: 'balanced', coins: 150 },
    { name: 'Royal FC', badge: 'RF', round: 'Quarter-final', difficulty: 'competitive', coins: 200 },
    { name: 'Aurora City', badge: 'AU', round: 'Semi-final', difficulty: 'competitive', coins: 250 },
    { name: 'Immortal XI', badge: 'IX', round: 'Grand final', difficulty: 'competitive', coins: 500 }
  ];
  const tiers = [75, 100, 125, 150, 175, 200, 225, 250, 300, 400].map((coins, index) => ({
    level: index + 1, xp: (index + 1) * 150, coins
  }));
  const achievements = [
    { id: 'debut', name: 'Kickoff Kid', text: 'Complete one match', key: 'matches', target: 1, icon: '⚽' },
    { id: 'winner', name: 'First Blood', text: 'Win your first match', key: 'wins', target: 1, icon: '⚑' },
    { id: 'goals', name: 'Goal Machine', text: 'Score 20 goals this season', key: 'goals', target: 20, icon: '◎' },
    { id: 'wall', name: 'The Wall', text: 'Win 3 matches without conceding', key: 'cleanSheets', target: 3, icon: '▱' },
    { id: 'streak', name: 'On a Roll', text: 'Win 3 matches in a row', key: 'bestStreak', target: 3, icon: 'ϟ' },
    { id: 'veteran', name: 'Matchday Regular', text: 'Complete 15 matches', key: 'matches', target: 15, icon: '✦' },
    { id: 'cup', name: 'Champion 02', text: 'Win all 7 Journey stages', key: 'stage', target: 7, icon: '♜' },
    { id: 'pass', name: 'Season Legend', text: 'Earn 1,500 Season XP', key: 'xp', target: 1500, icon: '♛' }
  ];
  const count = (value, max = 1000000000) => Number.isFinite(Number(value)) ? Math.min(max, Math.max(0, Math.floor(Number(value)))) : 0;
  function normalize(input) {
    const old = input?.id === id ? input : {};
    const output = { id, xp: count(old.xp), stage: count(old.stage, stages.length), claimed: [], records: [] };
    for (const key of ['matches', 'wins', 'goals', 'cleanSheets', 'streak', 'bestStreak']) output[key] = count(old[key]);
    output.claimed = [...new Set((Array.isArray(old.claimed) ? old.claimed : []).filter(n => Number.isInteger(n) && n >= 1 && n <= tiers.length))];
    output.records = (Array.isArray(old.records) ? old.records : []).slice(0, output.stage).map(r => ({ home: count(r?.home, 999), away: count(r?.away, 999) }));
    return output;
  }
  function merge(a, b) {
    a = normalize(a); b = normalize(b);
    const result = normalize(a.stage >= b.stage ? a : b);
    for (const key of ['xp', 'matches', 'wins', 'goals', 'cleanSheets', 'bestStreak']) result[key] = Math.max(a[key], b[key]);
    result.claimed = [...new Set([...a.claimed, ...b.claimed])];
    return result;
  }
  const unlocked = season => achievements.filter(item => season[item.key] >= item.target).map(item => item.id);
  function complete(input, result, match) {
    const season = normalize(input), previous = unlocked(season);
    const win = result.home > result.away;
    const earnedXp = 50 + (win ? 40 : 0) + Math.min(5, count(result.home)) * 10;
    season.matches++; season.goals += count(result.home); season.wins += Number(win);
    season.streak = win ? season.streak + 1 : 0;
    season.bestStreak = Math.max(season.bestStreak, season.streak);
    if (win && result.away === 0) season.cleanSheets++;
    season.xp += earnedXp;
    let stageCoins = 0, advanced = false;
    if (win && match.mode === 'Champions Journey' && match.seasonId === id && match.careerStage === season.stage && stages[season.stage]) {
      stageCoins = stages[season.stage].coins;
      season.records[season.stage] = { home: count(result.home), away: count(result.away) };
      season.stage++; advanced = true;
    }
    return { season, earnedXp, stageCoins, advanced, newTrophies: unlocked(season).filter(key => !previous.includes(key)) };
  }
  function claim(input, level) {
    const season = normalize(input), tier = tiers.find(item => item.level === level);
    if (!tier || season.xp < tier.xp || season.claimed.includes(level)) return { season, coins: 0 };
    season.claimed.push(level);
    return { season, coins: tier.coins };
  }
  return { id, stages, tiers, achievements, normalize, merge, complete, claim, unlocked };
})();
