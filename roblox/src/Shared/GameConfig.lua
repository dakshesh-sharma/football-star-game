local GameConfig = {}

GameConfig.Formation = {
	{ id = "GK", x = 0, z = 42 },
	{ id = "CB1", x = -12, z = 28 },
	{ id = "CB2", x = 0, z = 31 },
	{ id = "CB3", x = 12, z = 28 },
	{ id = "LM", x = -24, z = 10 },
	{ id = "CM1", x = -8, z = 13 },
	{ id = "CM2", x = 8, z = 13 },
	{ id = "RM", x = 24, z = 10 },
	{ id = "LW", x = -18, z = -10 },
	{ id = "ST", x = 0, z = -15 },
	{ id = "RW", x = 18, z = -10 },
}

GameConfig.Cards = {
	{ name = "Lionel Messi", position = "RW", rating = 99, team = "Argentina", image = "assets/messi.png" },
	{ name = "Cristiano Ronaldo", position = "ST", rating = 99, team = "Portugal", image = "assets/ronaldo.png" },
	{ name = "Neymar Jr", position = "LW", rating = 98, team = "Brazil", image = "assets/neymar-jr.png" },
	{ name = "Kylian Mbappe", position = "ST", rating = 97, team = "France" },
	{ name = "Bot Starter", position = "CM", rating = 60, team = "FC Stars", isBot = true },
}

function GameConfig.WinXP(homeGoals, awayGoals)
	local margin = math.max(0, homeGoals - awayGoals)
	return 150 + homeGoals * 75 + margin * 125
end

return GameConfig
