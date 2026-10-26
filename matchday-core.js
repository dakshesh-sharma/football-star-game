/* Matchday rules are shared by the game, preview and deterministic checks. */
window.FCMatchday = (() => {
  const number = value => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;
  const difficulties = {
    relaxed: { label: 'Relaxed', speed: .82, reaction: .65, description: 'More space. More time on the ball.' },
    balanced: { label: 'Balanced', speed: 1, reaction: 1, description: 'The original FC Stars challenge.' },
    competitive: { label: 'Competitive', speed: 1.14, reaction: 1.25, description: 'Faster pressure. Quicker decisions.' }
  };
  const tactics = {
    balanced: { label: 'Balanced', description: 'Keep your shape. Support the ball.', width: 1, depth: 0, support: 0, pressers: 1 },
    attack: { label: 'Attack', description: 'Push up and press with two. Leave space behind.', width: 1.14, depth: 1.5, support: 1.4, pressers: 2 },
    defend: { label: 'Defend', description: 'Drop deeper. Stay compact and protect your lead.', width: .8, depth: -1.5, support: -1.2, pressers: 1 }
  };
  function settings(input = {}) {
    return { difficulty: Object.hasOwn(difficulties, input?.difficulty) ? input.difficulty : 'balanced',
      tactic: Object.hasOwn(tactics, input?.tactic) ? input.tactic : 'balanced',
      camera: input?.camera === 'wide' ? 'wide' : 'broadcast', sound: input?.sound !== false };
  }
  function setupLink(mode, input) {
    const value = settings(input);
    return 'index.html?' + new URLSearchParams({ match: mode, ...value });
  }
  function goals(input) {
    return (Array.isArray(input) ? input : []).filter(goal => goal && ['home','away'].includes(goal.team))
      .slice(0, 12).map(goal => ({ team: goal.team, scorer: String(goal.scorer || 'Unknown player').slice(0, 60),
        minute: Math.min(90, Math.floor(number(goal.minute))), ownGoal: goal.ownGoal === true || goal.celebration === 'Own goal' }))
      .sort((a,b) => a.minute - b.minute);
  }
  function difficulty(match) {
    return difficulties[match?.mode === 'Ranked Rush' ? 'balanced' : settings(match?.settings).difficulty];
  }
  function stats(match) {
    if (!match.stats || typeof match.stats !== 'object') match.stats = {};
    for (const team of ['home', 'away']) {
      const previous = match.stats[team] || {};
      if (!previous.normalized) match.stats[team] = {
        shots: number(previous.shots), passes: number(previous.passes), saves: number(previous.saves),
        tackles: number(previous.tackles), possession: number(previous.possession), normalized: true
      };
    }
    return match.stats;
  }
  function record(match, type, player, details) {
    if (!['home', 'away'].includes(player?.team)) return;
    const team = stats(match)[player.team];
    if (type === 'kick' && details.action === 'shoot') team.shots++;
    if (type === 'kick' && ['pass', 'through', 'cross'].includes(details.action)) team.passes++;
    if (type === 'save' || type === 'catch') team.saves++;
    if (type === 'tackle') team.tackles++;
  }
  function possession(match) {
    const both = stats(match), total = both.home.possession + both.away.possession;
    const home = total > 0 ? Math.round(both.home.possession / total * 100) : 50;
    return [home, 100 - home];
  }
  function result(match, rewards = {}) {
    const score = { home: number(match.home), away: number(match.away) };
    return { ...score, opponent: String(match.awayLeader || 'Rival XI').slice(0, 60), mode: match.mode || 'Quick Match',
      outcome: score.home > score.away ? 'win' : score.home === score.away ? 'draw' : 'loss',
      settings: settings(match.settings), stats: structuredClone(stats(match)), possession: possession(match),
      goals: goals(match.goals),
      coins: number(rewards.coins), xp: number(rewards.xp), rp: number(rewards.rp), date: new Date().toISOString() };
  }
  function history(input) {
    return (Array.isArray(input) ? input : []).filter(item => item && typeof item === 'object'
      && Number.isFinite(item.home) && Number.isFinite(item.away) && ['win','draw','loss'].includes(item.outcome)).slice(0, 10);
  }
  return { settings, difficulties, difficulty, tactics, setupLink, goals, stats, record, possession, result, history };
})();
