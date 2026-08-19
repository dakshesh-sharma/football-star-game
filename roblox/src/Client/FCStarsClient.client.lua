local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local player = Players.LocalPlayer
local actionEvent = ReplicatedStorage:WaitForChild("MatchAction")
local celebrationEvent = ReplicatedStorage:WaitForChild("Celebration")

local gui = Instance.new("ScreenGui")
gui.Name = "FCStarsHUD"
gui.ResetOnSpawn = false
gui.Parent = player:WaitForChild("PlayerGui")

local panel = Instance.new("TextLabel")
panel.Size = UDim2.fromOffset(330, 115)
panel.Position = UDim2.fromOffset(24, 24)
panel.BackgroundColor3 = Color3.fromRGB(11, 25, 21)
panel.BackgroundTransparency = 0.1
panel.TextColor3 = Color3.new(1, 1, 1)
panel.TextScaled = false
panel.TextSize = 20
panel.Font = Enum.Font.GothamBold
panel.TextXAlignment = Enum.TextXAlignment.Left
panel.TextYAlignment = Enum.TextYAlignment.Top
panel.Parent = gui

local function refreshHUD()
	panel.Text = "  FC STARS\n  Score: " .. (player:GetAttribute("MatchScore") or "0 - 0")
		.. "\n  XP: " .. tostring(player:GetAttribute("MatchXP") or 0)
		.. "\n  P Pass   Shift Sprint   Space Shoot"
end

player.AttributeChanged:Connect(refreshHUD)
refreshHUD()

local function celebrate(userId)
	local target = Players:GetPlayerByUserId(userId)
	local character = target and target.Character
	local humanoid = character and character:FindFirstChildOfClass("Humanoid")
	local root = character and character:FindFirstChild("HumanoidRootPart")
	if not humanoid or not root then return end

	humanoid:ChangeState(Enum.HumanoidStateType.Jumping)
	root.AssemblyLinearVelocity = root.CFrame.LookVector * 12 + Vector3.new(0, 32, 0)
	for _ = 1, 16 do
		if root.Parent then root.CFrame = root.CFrame * CFrame.Angles(0, math.rad(24), 0) end
		task.wait(0.05)
	end
end

celebrationEvent.OnClientEvent:Connect(celebrate)

UserInputService.InputBegan:Connect(function(input, processed)
	if processed then return end
	if input.KeyCode == Enum.KeyCode.P then actionEvent:FireServer("Pass") end
	if input.KeyCode == Enum.KeyCode.LeftShift then actionEvent:FireServer("Sprint") end
	if input.KeyCode == Enum.KeyCode.Space then actionEvent:FireServer("Shoot") end
end)
