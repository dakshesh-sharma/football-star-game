local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Config = require(ReplicatedStorage:WaitForChild("Shared"):WaitForChild("GameConfig"))
local actionEvent = Instance.new("RemoteEvent")
actionEvent.Name = "MatchAction"
actionEvent.Parent = ReplicatedStorage

local celebrationEvent = Instance.new("RemoteEvent")
celebrationEvent.Name = "Celebration"
celebrationEvent.Parent = ReplicatedStorage

local pitch = Instance.new("Folder")
pitch.Name = "FCStarsPitch"
pitch.Parent = workspace

local function makePart(name, size, position, color, parent)
	local part = Instance.new("Part")
	part.Name = name
	part.Size = size
	part.Position = position
	part.Anchored = true
	part.Material = Enum.Material.SmoothPlastic
	part.Color = color
	part.Parent = parent or pitch
	return part
end

makePart("Grass", Vector3.new(70, 1, 110), Vector3.new(0, -1, 0), Color3.fromRGB(28, 145, 82))
makePart("HalfwayLine", Vector3.new(70, 0.1, 0.3), Vector3.new(0, -0.45, 0), Color3.new(1, 1, 1))
makePart("GoalHome", Vector3.new(18, 5, 1), Vector3.new(0, 2, 52), Color3.fromRGB(235, 235, 235))
makePart("GoalAway", Vector3.new(18, 5, 1), Vector3.new(0, 2, -52), Color3.fromRGB(235, 235, 235))

local ball = makePart("Ball", Vector3.new(2, 2, 2), Vector3.new(0, 1, 0), Color3.new(1, 1, 1))
ball.Shape = Enum.PartType.Ball
ball.Anchored = false

local function makePlayer(name, position, color, isBot)
	local model = Instance.new("Model")
	model.Name = name
	model:SetAttribute("IsBot", isBot)
	model.Parent = pitch
	local body = makePart("Body", Vector3.new(2.5, 4, 1.6), position + Vector3.new(0, 2, 0), color, model)
	body.Shape = Enum.PartType.Cylinder
	local head = makePart("Head", Vector3.new(1.8, 1.8, 1.8), position + Vector3.new(0, 5, 0), Color3.fromRGB(196, 133, 93), model)
	head.Shape = Enum.PartType.Ball
	model.PrimaryPart = body
	return model
end

local function avatarBotFrom(character, name, position)
	local bot = character:Clone()
	bot.Name = name
	bot:PivotTo(CFrame.new(position + Vector3.new(0, 3, 0)))
	bot.Parent = pitch
	for _, item in ipairs(bot:GetDescendants()) do
		if item:IsA("Script") or item:IsA("LocalScript") then item:Destroy() end
	end
	local humanoid = bot:FindFirstChildOfClass("Humanoid")
	if humanoid then humanoid.DisplayName = name end
	bot:SetAttribute("IsBot", true)
	return bot
end

local homePlayers = {}
for index, spot in ipairs(Config.Formation) do
	local card = Config.Cards[((index - 1) % #Config.Cards) + 1]
	local player = makePlayer(card.name, Vector3.new(spot.x, 0, spot.z), Color3.fromRGB(30, 105, 220), card.isBot)
	player:SetAttribute("CardName", card.name)
	player:SetAttribute("Rating", card.rating)
	table.insert(homePlayers, player)
end

local bots = {}
for index, spot in ipairs(Config.Formation) do
	local bot = makePlayer("Rival Bot " .. index, Vector3.new(-spot.x, 0, -spot.z), Color3.fromRGB(210, 55, 65), true)
	table.insert(bots, bot)
end

local function replaceBotsWithAvatars(character)
	if not character or not character:FindFirstChildOfClass("Humanoid") then return end
	character.Archivable = true
	for _, bot in ipairs(bots) do bot:Destroy() end
	bots = {}
	for index, spot in ipairs(Config.Formation) do
		table.insert(bots, avatarBotFrom(character, "Rival Bot " .. index, Vector3.new(-spot.x, 0, -spot.z)))
	end
end

local matchState = { home = 0, away = 0, xp = 0 }

local function nearestBot()
	local closest, distance = nil, math.huge
	for _, bot in ipairs(bots) do
		local currentDistance = (bot.PrimaryPart.Position - ball.Position).Magnitude
		if currentDistance < distance then
			closest, distance = bot, currentDistance
		end
	end
	return closest, distance
end

actionEvent.OnServerEvent:Connect(function(player, action)
	if typeof(action) ~= "string" then return end
	local character = player.Character
	local root = character and character:FindFirstChild("HumanoidRootPart")
	if not root then return end

	if action == "Shoot" and (root.Position - ball.Position).Magnitude < 12 then
		matchState.home += 1
		matchState.xp = Config.WinXP(matchState.home, matchState.away)
		ball.Position = Vector3.new(0, 1, -38)
		celebrationEvent:FireAllClients(player.UserId, "GoalCelebration")
	elseif action == "Pass" then
		ball.AssemblyLinearVelocity = root.CFrame.LookVector * 65 + Vector3.new(0, 8, 0)
	elseif action == "Sprint" then
		root.AssemblyLinearVelocity = root.CFrame.LookVector * 35
	end

	local bot, distance = nearestBot()
	if bot and distance < 6 then
		ball.Position = bot.PrimaryPart.Position + Vector3.new(0, 1, 0)
	end
	player:SetAttribute("MatchScore", matchState.home .. " - " .. matchState.away)
	player:SetAttribute("MatchXP", matchState.xp)
end)

Players.PlayerAdded:Connect(function(player)
	player:SetAttribute("MatchScore", "0 - 0")
	player:SetAttribute("MatchXP", 0)
	player.CharacterAdded:Connect(function(character)
		task.wait(1)
		replaceBotsWithAvatars(character)
	end)
end)
