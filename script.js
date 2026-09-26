const cardPool = [
  { name: "Cristiano Ronaldo", position: "ST", team: "Portugal", rating: "∞", rarity: "G.O.A.T", chance: 0, specialAccess: true, image: "assets/players/cristiano-ronaldo-v2.jpg" },
  { name: "Pele", position: "CF", team: "Brazil", rating: 95, rarity: "Icon", chance: 1, image: "assets/players/pele-v2.jpg" },
  { name: "Diego Maradona", position: "CAM", team: "Argentina", rating: 95, rarity: "Icon", chance: 1, image: "assets/players/diego-maradona-v2.jpg" },
  { name: "Mbappu", position: "LM", team: "India", rating: 99, rarity: "Legend", chance: 0.3, image: "assets/mbappu.png" },
  { name: "Lionel Messi", position: "RW", team: "Argentina", rating: "∞", rarity: "G.O.A.T", chance: 0.1, image: "assets/players/lionel-messi-v2.jpg" },
  { name: "Sunil Chhetri", position: "ST", team: "India", rating: 84, rarity: "Hero", chance: 6 },
  { name: "Lamine Yamal", position: "RW", team: "Barcelona", rating: 88, rarity: "Gold", chance: 0.3 },
  { name: "Kylian Mbappe", position: "ST", team: "Real Madrid", rating: 92, rarity: "Elite", chance: 3 },
  { name: "Erling Haaland", position: "ST", team: "Man City", rating: 91, rarity: "Elite", chance: 4 },
  { name: "Rodri", position: "CDM", team: "Man City", rating: 91, rarity: "Elite", chance: 4 },
  { name: "Vinicius Jr", position: "LW", team: "Real Madrid", rating: 90, rarity: "Gold", chance: 7 },
  { name: "Jude Bellingham", position: "CM", team: "Real Madrid", rating: 91, rarity: "Elite", chance: 4 },
  { name: "Pedri", position: "CM", team: "Barcelona", rating: 87, rarity: "Gold", chance: 7 },
  { name: "Bruno Fernandes", position: "CAM", team: "Man United", rating: 88, rarity: "Gold", chance: 7 },
  { name: "Kevin De Bruyne", position: "CM", team: "Man City", rating: 90, rarity: "Elite", chance: 4 },
  { name: "Virgil van Dijk", position: "CB", team: "Liverpool", rating: 89, rarity: "Gold", chance: 7 },
  { name: "Achraf Hakimi", position: "RB", team: "PSG", rating: 86, rarity: "Gold", chance: 8 },
  { name: "Theo Hernandez", position: "LB", team: "AC Milan", rating: 86, rarity: "Gold", chance: 8 },
  { name: "Alisson", position: "GK", team: "Liverpool", rating: 89, rarity: "Gold", chance: 7 },
  { name: "Neymar Jr", position: "LW", team: "Brazil", rating: "∞", rarity: "G.O.A.T", chance: 0.1, image: "assets/neymar-jr.png" },
  { name: "Harry Kane", position: "ST", team: "Bayern", rating: 90, rarity: "Gold", chance: 7 },
  { name: "Bukayo Saka", position: "RW", team: "Arsenal", rating: 88, rarity: "Gold", chance: 8 },
  { name: "Rafael Leao", position: "LW", team: "AC Milan", rating: 87, rarity: "Gold", chance: 8 },
  { name: "Phil Foden", position: "CAM", team: "Man City", rating: 88, rarity: "Gold", chance: 7 },
  { name: "Federico Valverde", position: "CM", team: "Real Madrid", rating: 88, rarity: "Gold", chance: 7 },
  { name: "Eduardo Camavinga", position: "CM", team: "Real Madrid", rating: 85, rarity: "Silver", chance: 11 },
  { name: "William Saliba", position: "CB", team: "Arsenal", rating: 87, rarity: "Gold", chance: 8 },
  { name: "Gvardiol", position: "LB", team: "Man City", rating: 85, rarity: "Silver", chance: 11 },
  { name: "Trent Alexander-Arnold", position: "RB", team: "Real Madrid", rating: 86, rarity: "Gold", chance: 8 },
  { name: "Gianluigi Donnarumma", position: "GK", team: "PSG", rating: 87, rarity: "Gold", chance: 8 },
  { name: "Victor Osimhen", position: "ST", team: "Galatasaray", rating: 88, rarity: "Gold", chance: 7 },
  { name: "Jamal Musiala", position: "CAM", team: "Bayern", rating: 88, rarity: "Gold", chance: 7 },
  { name: "Mohamed Salah", position: "RW", team: "Liverpool", rating: 89, rarity: "Gold", chance: 7 },
  { name: "Son Heung-min", position: "LW", team: "Tottenham", rating: 87, rarity: "Gold", chance: 8 },
  { name: "Luka Modric", position: "CM", team: "Real Madrid", rating: 86, rarity: "Gold", chance: 8 },
  { name: "Gavi", position: "CM", team: "Barcelona", rating: 84, rarity: "Silver", chance: 11 },
  { name: "Araujo", position: "CB", team: "Barcelona", rating: 86, rarity: "Gold", chance: 8 },
  { name: "Ruben Dias", position: "CB", team: "Man City", rating: 88, rarity: "Gold", chance: 7 },
  { name: "Alphonso Davies", position: "LB", team: "Bayern", rating: 84, rarity: "Silver", chance: 11 },
  { name: "Mike Maignan", position: "GK", team: "AC Milan", rating: 87, rarity: "Gold", chance: 8 },
  { name: "Robert Lewandowski", position: "ST", team: "Barcelona", rating: 88, rarity: "Gold", chance: 7 },
  { name: "Raphinha", position: "RW", team: "Barcelona", rating: 87, rarity: "Gold", chance: 8 },
  { name: "Frenkie de Jong", position: "CM", team: "Barcelona", rating: 87, rarity: "Gold", chance: 8 },
  { name: "Marc-Andre ter Stegen", position: "GK", team: "Barcelona", rating: 88, rarity: "Gold", chance: 7 },
  { name: "Dani Olmo", position: "CAM", team: "Barcelona", rating: 84, rarity: "Silver", chance: 11 },
  { name: "Pau Cubarsi", position: "CB", team: "Barcelona", rating: 81, rarity: "Silver", chance: 13 },
  { name: "Endrick", position: "ST", team: "Real Madrid", rating: 80, rarity: "Silver", chance: 13 },
  { name: "Arda Guler", position: "CAM", team: "Real Madrid", rating: 80, rarity: "Silver", chance: 13 },
  { name: "Thibaut Courtois", position: "GK", team: "Real Madrid", rating: 90, rarity: "Gold", chance: 7 },
  { name: "Antonio Rudiger", position: "CB", team: "Real Madrid", rating: 88, rarity: "Gold", chance: 8 },
  { name: "Dani Carvajal", position: "RB", team: "Real Madrid", rating: 86, rarity: "Gold", chance: 8 },
  { name: "Aurelien Tchouameni", position: "CDM", team: "Real Madrid", rating: 85, rarity: "Gold", chance: 8 },
  { name: "Antoine Griezmann", position: "CF", team: "Atletico Madrid", rating: 88, rarity: "Gold", chance: 8 },
  { name: "Jan Oblak", position: "GK", team: "Atletico Madrid", rating: 88, rarity: "Gold", chance: 8 },
  { name: "Julian Alvarez", position: "ST", team: "Atletico Madrid", rating: 85, rarity: "Gold", chance: 8 },
  { name: "Declan Rice", position: "CDM", team: "Arsenal", rating: 87, rarity: "Gold", chance: 8 },
  { name: "Martin Odegaard", position: "CAM", team: "Arsenal", rating: 89, rarity: "Gold", chance: 7 },
  { name: "Gabriel Magalhaes", position: "CB", team: "Arsenal", rating: 86, rarity: "Gold", chance: 8 },
  { name: "Kai Havertz", position: "CAM", team: "Arsenal", rating: 84, rarity: "Silver", chance: 11 },
  { name: "Cole Palmer", position: "CAM", team: "Chelsea", rating: 86, rarity: "Gold", chance: 8 },
  { name: "Enzo Fernandez", position: "CM", team: "Chelsea", rating: 83, rarity: "Silver", chance: 12 },
  { name: "Reece James", position: "RB", team: "Chelsea", rating: 84, rarity: "Silver", chance: 11 },
  { name: "Darwin Nunez", position: "ST", team: "Liverpool", rating: 83, rarity: "Silver", chance: 12 },
  { name: "Luis Diaz", position: "LW", team: "Liverpool", rating: 86, rarity: "Gold", chance: 8 },
  { name: "Alexis Mac Allister", position: "CM", team: "Liverpool", rating: 86, rarity: "Gold", chance: 8 },
  { name: "Dominik Szoboszlai", position: "CM", team: "Liverpool", rating: 84, rarity: "Silver", chance: 11 },
  { name: "Bruno Guimaraes", position: "CDM", team: "Newcastle", rating: 85, rarity: "Gold", chance: 8 },
  { name: "Alexander Isak", position: "ST", team: "Newcastle", rating: 85, rarity: "Gold", chance: 8 },
  { name: "Florian Wirtz", position: "CAM", team: "Bayer Leverkusen", rating: 88, rarity: "Gold", chance: 8 },
  { name: "Granit Xhaka", position: "CDM", team: "Bayer Leverkusen", rating: 86, rarity: "Gold", chance: 8 },
  { name: "Victor Boniface", position: "ST", team: "Bayer Leverkusen", rating: 82, rarity: "Silver", chance: 12 },
  { name: "Joshua Kimmich", position: "CDM", team: "Bayern", rating: 88, rarity: "Gold", chance: 8 },
  { name: "Manuel Neuer", position: "GK", team: "Germany", rating: 92, rarity: "Icon", chance: 1, image: "assets/players/manuel-neuer-v2.jpg" },
  { name: "Leroy Sane", position: "RW", team: "Bayern", rating: 86, rarity: "Gold", chance: 8 },
  { name: "Kingsley Coman", position: "LW", team: "Bayern", rating: 85, rarity: "Gold", chance: 8 },
  { name: "Ousmane Dembele", position: "RW", team: "PSG", rating: 86, rarity: "Gold", chance: 8 },
  { name: "Bradley Barcola", position: "LW", team: "PSG", rating: 82, rarity: "Silver", chance: 12 },
  { name: "Vitinha", position: "CM", team: "PSG", rating: 86, rarity: "Gold", chance: 8 },
  { name: "Marquinhos", position: "CB", team: "PSG", rating: 87, rarity: "Gold", chance: 8 },
  { name: "Lautaro Martinez", position: "ST", team: "Inter Milan", rating: 89, rarity: "Gold", chance: 7 },
  { name: "Nicolo Barella", position: "CM", team: "Inter Milan", rating: 87, rarity: "Gold", chance: 8 },
  { name: "Alessandro Bastoni", position: "CB", team: "Inter Milan", rating: 86, rarity: "Gold", chance: 8 },
  { name: "Christian Pulisic", position: "RW", team: "AC Milan", rating: 83, rarity: "Silver", chance: 12 },
  { name: "Khvicha Kvaratskhelia", position: "LW", team: "Napoli", rating: 86, rarity: "Gold", chance: 8 },
  { name: "Paulo Dybala", position: "CAM", team: "Roma", rating: 86, rarity: "Gold", chance: 8 },
  { name: "Federico Chiesa", position: "LW", team: "Liverpool", rating: 84, rarity: "Silver", chance: 11 },
  { name: "Gianluigi Buffon", position: "GK", team: "Italy", rating: 92, rarity: "Icon", chance: 1 },
  { name: "Zinedine Zidane", position: "CAM", team: "France", rating: 94, rarity: "Icon", chance: 1, image: "assets/players/zinedine-zidane-v2.jpg" },
  { name: "Ronaldo Nazario", position: "ST", team: "Brazil", rating: 94, rarity: "Icon", chance: 1 },
  { name: "Ronaldinho", position: "LW", team: "Brazil", rating: 94, rarity: "Icon", chance: 1, image: "assets/players/ronaldinho-v2.jpg" },
  { name: "Zlatan Ibrahimović", position: "ST", team: "Sweden", rating: 92, rarity: "Icon", chance: 1, image: "assets/players/zlatan-ibrahimovic-v2.jpg" },
  { name: "Roy Keane", position: "CDM", team: "Ireland", rating: 91, rarity: "Icon", chance: 1, image: "assets/players/roy-keane-v2.jpg" },
  { name: "Gennaro Gattuso", position: "CDM", team: "Italy", rating: 90, rarity: "Icon", chance: 1, image: "assets/players/gennaro-gattuso-v2.jpg" },
  { name: "Pepe", position: "CB", team: "Portugal", rating: 90, rarity: "Icon", chance: 1, image: "assets/players/pepe-v2.jpg" },
  { name: "Sergio Ramos", position: "CB", team: "Spain", rating: 93, rarity: "Icon", chance: 1, image: "assets/players/sergio-ramos-v2.jpg" },
  { name: "Jaap Stam", position: "CB", team: "Netherlands", rating: 92, rarity: "Icon", chance: 1, image: "assets/players/jaap-stam-v2.jpg" },
  { name: "Thierry Henry", position: "ST", team: "France", rating: 93, rarity: "Icon", chance: 1 },
  { name: "Andres Iniesta", position: "CM", team: "Spain", rating: 92, rarity: "Icon", chance: 1 },
  { name: "Xavi", position: "CM", team: "Spain", rating: 92, rarity: "Icon", chance: 1 },
  { name: "Iker Casillas", position: "GK", team: "Spain", rating: 91, rarity: "Icon", chance: 1 },
  { name: "Wayne Rooney", position: "ST", team: "England", rating: 90, rarity: "Icon", chance: 1 },
  { name: "David Beckham", position: "RM", team: "England", rating: 90, rarity: "Icon", chance: 1 }
];

const codeOnlyCards = [
  { name: "IshowSpeed", position: "RM", team: "Portugal", rating: 90, rarity: "Icon", chance: 0, codeOnly: true, image: "assets/ishowspeed.png" }
];

const selectablePlayers = [...cardPool, ...codeOnlyCards];
const exactChancePlayers = {
  Mbappu: 0.3,
  "Lamine Yamal": 0.3,
  Pele: 0.05,
  "Diego Maradona": 0.05,
  "Lionel Messi": 0.1,
  "Neymar Jr": 0.1,
  "Gianluigi Buffon": 0.05,
  "Zinedine Zidane": 0.05,
  "Ronaldo Nazario": 0.05,
  Ronaldinho: 0.05,
  "Thierry Henry": 0.05,
  "Andres Iniesta": 0.05,
  Xavi: 0.05,
  "Iker Casillas": 0.05,
  "Wayne Rooney": 0.05,
  "David Beckham": 0.05,
  "Zlatan Ibrahimović": 0.05,
  "Roy Keane": 0.05,
  "Gennaro Gattuso": 0.05,
  Pepe: 0.05,
  "Sergio Ramos": 0.05,
  "Jaap Stam": 0.05
};
const normalRollPool = cardPool.filter((card) => !card.specialAccess && exactChancePlayers[card.name] === undefined);
const totalChance = normalRollPool.reduce((sum, card) => sum + card.chance, 0);
const saveKey = "star-xi-trial";
const accountsKey = "fc-stars-accounts";
const activeAccountKey = "fc-stars-active-account";
const databaseName = "fc-stars-local-save";
const databaseVersion = 1;
const databaseStoreName = "state";
const accountsDatabaseKey = "accounts";
const activeAccountDatabaseKey = "active-account";
const developerUsername = "S7ph_Vo1d";
const legacyDeveloperUsernames = ["Sync_Vo1d"];
const additionalDeveloperUsernames = ["S7ph_Void4"];
const specialFullInventoryUsernames = ["1029384756", "ROBLOXBESTGAME"];
const allCardAccessUsernames = ["Shiva Porwal"];
const defaultProfileMotto = "Build your XI";
const goatProfileBadge = "goat-profile-glow";
const avatarStyles = {
  gold: "FC",
  blue: "XI",
  red: "ST",
  goat: "99"
};
const redeemableCodes = {
  DAILY: { type: "xp", xp: 300, daily: true, message: "Daily XP claimed." },
  WELCOME: { type: "xp", xp: 250, message: "Welcome bonus claimed." },
  FCSTARS: { type: "xp", xp: 500, message: "FC Stars bonus claimed." },
  LEVELUP: { type: "xp", xp: 1000, message: "Level boost claimed." },
  S7PH_ULTRAXP: {
    type: "adminXp",
    ownerOnly: true,
    xp: "10000000000000000000000000000000000000000000000",
    message: "Admin ultra XP granted."
  },
  S7PH_ULTRAXP2: {
    type: "adminXp",
    ownerOnly: true,
    xp: "10000000000000000000000000000000000000000000000",
    level: 999999,
    message: "Admin ultra XP and level granted."
  },
  LAUNCHDAY: { type: "xp", xp: 1500, expires: "2026-09-01", message: "Limited launch reward claimed." },
  FREE50LEVEL: { type: "level", level: 50, expiresAt: "2026-08-15T08:55:00+05:30", message: "Free Level 50 claimed." },
  NOXIFYINFINITE: {
    type: "infiniteLevel",
    ownerOnly: true,
    expiresAt: "2026-08-13T21:25:00+05:30",
    message: "Owner infinite level activated."
  },
  CR7THEGOAT: { type: "player", player: "IshowSpeed", message: "IshowSpeed joined your inventory as an Icon Portugal card." },
  INFINITECOINS: { type: "infiniteCoins", expiresAt: "2026-08-27T15:07:30+05:30", message: "Unlimited Coins unlocked permanently." }
};
const levelRewards = {
  50: { type: "badge", badge: goatProfileBadge, message: "Level 50 reward: G.O.A.T profile glow unlocked." }
};
const opponentTeams = [
  { name: "Rival Academy", multiplier: 1 },
  { name: "Street King", multiplier: 1.2 },
  { name: "Madrid Boss", multiplier: 1.5 },
  { name: "Barcelona Ace", multiplier: 1.8 },
  { name: "Legend XI", multiplier: 2.2 }
];
let databasePromise = null;
let databaseReady = false;
let matchTimer = null;
let matchPhysicsFrame = null;
let matchPhysicsPreviousTime = 0;
let matchAccumulator = 0;
let pendingMatchLogin = false;
let pendingMatchMode = "Quick Match";
let matchShootCharging = false;
let matchShootChargeStarted = 0;
let matchShootChargeFrame = null;
let activeJoystickPointer = null;
let joystickVector = { x: 0, y: 0 };
const matchMovementKeys = new Set();
let startSplashActive = true;

const formation = [
  { id: "gk", slot: "GK", x: 50, y: 91 },
  { id: "cb-left", slot: "CB", x: 28, y: 76 },
  { id: "cb-center", slot: "CB", x: 50, y: 78 },
  { id: "cb-right", slot: "CB", x: 72, y: 76 },
  { id: "lm", slot: "LM", x: 18, y: 58 },
  { id: "cm-left", slot: "CM", x: 40, y: 56 },
  { id: "cm-right", slot: "CM", x: 60, y: 56 },
  { id: "rm", slot: "RM", x: 82, y: 58 },
  { id: "lw", slot: "LW", x: 23, y: 36 },
  { id: "st", slot: "ST", x: 50, y: 30 },
  { id: "rw", slot: "RW", x: 77, y: 36 }
];

const mobileFormationPositions = {
  gk: { x: 50, y: 94 },
  "cb-left": { x: 27, y: 80 },
  "cb-center": { x: 50, y: 84 },
  "cb-right": { x: 73, y: 80 },
  lm: { x: 15, y: 53 },
  "cm-left": { x: 40, y: 64 },
  "cm-right": { x: 60, y: 64 },
  rm: { x: 85, y: 53 },
  lw: { x: 22, y: 34 },
  st: { x: 50, y: 25 },
  rw: { x: 78, y: 34 }
};

const starterNames = ["Maignan", "Ruben Dias", "Araujo", "Saliba", "Son", "Pedri", "Modric", "Salah", "Neymar Jr", "Mbappe", "Yamal"];
const defaultState = {
  selectedStar: null,
  level: 1,
  xp: 0,
  adminXp: "0",
  infiniteLevel: false,
  infiniteCoins: false,
  inventory: [],
  teamCards: {},
  selectedStarSlot: null,
  replaceSlot: null,
  inventoryOpen: true,
  currentCard: null,
  currentCardSaved: false,
  deletedCardNames: [],
  redeemedCodes: [],
  claimedLevelRewards: [],
  badges: [],
  friends: [],
  playerStats: {},
  clubPhoto: "",
  dailyRankedWinDate: "",
  rankedPoints: 0,
  matchPoints: 56,
  joinRequest: null,
  activeMatch: null
};

let accounts = loadAccounts();
let activeAccountId = storageGet(activeAccountKey);
if (activeAccountId && !accounts.some((account) => account.id === activeAccountId)) {
  activeAccountId = null;
  storageRemove(activeAccountKey);
}
let state = loadState();
let activePromptSubmit = null;

const starList = document.querySelector("#starList");
const layout = document.querySelector(".layout");
const pitch = document.querySelector("#pitch");
const pitchPlayBtn = document.querySelector("#pitchPlayBtn");
const pitchFullscreenBtn = document.querySelector("#pitchFullscreenBtn");
const matchAvatar = document.querySelector("#matchAvatar");
const matchOpponent = document.querySelector("#matchOpponent");
const matchTeammate = document.querySelector("#matchTeammate");
const matchBall = document.querySelector("#matchBall");
const matchHudClock = document.querySelector("#matchHudClock");
const matchControlledLabel = document.querySelector("#matchControlledLabel");
const matchStaminaFill = document.querySelector("#matchStaminaFill");
const matchJoystick = document.querySelector("#matchJoystick");
const matchJoystickKnob = document.querySelector("#matchJoystickKnob");
const matchPassBtn = document.querySelector("#matchPassBtn");
const matchThroughBtn = document.querySelector("#matchThroughBtn");
const matchCrossBtn = document.querySelector("#matchCrossBtn");
const matchSprintBtn = document.querySelector("#matchSprintBtn");
const matchShootBtn = document.querySelector("#matchShootBtn");
const matchTackleBtn = document.querySelector("#matchTackleBtn");
const matchDribbleBtn = document.querySelector("#matchDribbleBtn");
const matchSwitchBtn = document.querySelector("#matchSwitchBtn");
const matchShotPowerFill = document.querySelector("#matchShotPowerFill");
const selectedPlayerLabel = document.querySelector("#selectedPlayerLabel");
const levelLabel = document.querySelector("#levelLabel");
const currentCardName = document.querySelector("#currentCardName");
const currentCardMeta = document.querySelector("#currentCardMeta");
const topCurrentCardName = document.querySelector("#topCurrentCardName");
const topCurrentCardMeta = document.querySelector("#topCurrentCardMeta");
const topSpinBtn = document.querySelector("#topSpinBtn");
const redeemCodeBtn = document.querySelector("#redeemCodeBtn");
const inventoryToggleBtn = document.querySelector("#inventoryToggleBtn");
const becomeCardBtn = document.querySelector("#becomeCardBtn");
const replaceCardBtn = document.querySelector("#replaceCardBtn");
const saveCardBtn = document.querySelector("#saveCardBtn");
const cancelCardBtn = document.querySelector("#cancelCardBtn");
const inventory = document.querySelector("#inventory");
const inventorySearch = document.querySelector("#inventorySearch");
const inventoryPanel = document.querySelector("#inventoryPanel");
const inventoryCount = document.querySelector("#inventoryCount");
const replaceHint = document.querySelector("#replaceHint");
const clearReplaceFilterBtn = document.querySelector("#clearReplaceFilterBtn");
const selectorReportCard = document.querySelector("#selectorReportCard");
const reportTitle = document.querySelector("#reportTitle");
const reportText = document.querySelector("#reportText");
const unlockText = document.querySelector("#unlockText");
const levelRewardsList = document.querySelector("#levelRewardsList");
const addFriendBtn = document.querySelector("#addFriendBtn");
const friendsList = document.querySelector("#friendsList");
const joinRequestTitle = document.querySelector("#joinRequestTitle");
const joinRequestText = document.querySelector("#joinRequestText");
const acceptJoinBtn = document.querySelector("#acceptJoinBtn");
const rejectJoinBtn = document.querySelector("#rejectJoinBtn");
const settingsBtn = document.querySelector("#settingsBtn");
const settingsMenu = document.querySelector("#settingsMenu");
const accountToggleBtn = document.querySelector("#accountToggleBtn");
const resetBtn = document.querySelector("#resetBtn");
const profileEditBtn = document.querySelector("#profileEditBtn");
const profileAvatar = document.querySelector("#profileAvatar");
const profilePhotoInput = document.querySelector("#profilePhotoInput");
const profileMottoLabel = document.querySelector("#profileMottoLabel");
const startSplash = document.querySelector("#startSplash");
const quickLoginOverlay = document.querySelector("#quickLoginOverlay");
const loginCardBackdrop = document.querySelector("#loginCardBackdrop");
const quickLoginTitle = document.querySelector("#quickLoginTitle");
const quickLoginMessage = document.querySelector("#quickLoginMessage");
const accountList = document.querySelector("#accountList");
const createAccountBtn = document.querySelector("#createAccountBtn");
const gamePromptOverlay = document.querySelector("#gamePromptOverlay");
const gamePromptForm = document.querySelector("#gamePromptForm");
const gamePromptTitle = document.querySelector("#gamePromptTitle");
const gamePromptLabel = document.querySelector("#gamePromptLabel");
const gamePromptInput = document.querySelector("#gamePromptInput");
const gamePromptMessage = document.querySelector("#gamePromptMessage");
const gamePromptCancelBtn = document.querySelector("#gamePromptCancelBtn");
const gamePromptSubmitBtn = document.querySelector("#gamePromptSubmitBtn");
const profileOverlay = document.querySelector("#profileOverlay");
const profileForm = document.querySelector("#profileForm");
const profilePreviewAvatar = document.querySelector("#profilePreviewAvatar");
const profilePreviewMeta = document.querySelector("#profilePreviewMeta");
const profileUsernameInput = document.querySelector("#profileUsernameInput");
const profileMottoInput = document.querySelector("#profileMottoInput");
const profileEditorMessage = document.querySelector("#profileEditorMessage");
const profileCancelBtn = document.querySelector("#profileCancelBtn");
const profileAvatarStyleInputs = document.querySelectorAll("input[name='profileAvatarStyle']");
const matchPanel = document.querySelector("#matchPanel");
const homeLeaderLabel = document.querySelector("#homeLeaderLabel");
const awayLeaderLabel = document.querySelector("#awayLeaderLabel");
const matchScoreLabel = document.querySelector("#matchScoreLabel");
const sceneGoalText = document.querySelector("#sceneGoalText");
const matchClockLabel = document.querySelector("#matchClockLabel");
const endMatchBtn = document.querySelector("#endMatchBtn");
const goalFeed = document.querySelector("#goalFeed");

function loadAccounts() {
  const storedActiveAccountId = storageGet(activeAccountKey);
  const savedAccounts = safeJson(storageGet(accountsKey));
  if (Array.isArray(savedAccounts) && savedAccounts.length) {
    const legacySave = safeJson(storageGet(saveKey));
    const accountsToNormalize = legacySave && isRecoverableDeveloperSave(legacySave)
      ? [...savedAccounts, legacySaveAccount(legacySave, savedAccounts.length)]
      : savedAccounts;
    const normalizedAccounts = normalizeAccounts(accountsToNormalize, storedActiveAccountId);
    storageSet(accountsKey, JSON.stringify(normalizedAccounts));
    return normalizedAccounts;
  }

  const legacySave = safeJson(storageGet(saveKey));
  if (legacySave) {
    const account = normalizeAccount(legacySaveAccount(legacySave, 0), 0);
    storageSet(accountsKey, JSON.stringify([account]));
    storageSet(activeAccountKey, account.id);
    return [account];
  }

  return [];
}

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function storageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {}
}

function safeJson(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function loadState() {
  const account = activeAccount();
  return account?.state || freshState(false);
}

function freshState(inventoryGrant = false) {
  return {
    ...defaultState,
    level: inventoryGrant === "dev" ? 50 : 1,
    inventory: inventoryGrant ? allInventoryCards(inventoryGrant) : [],
    teamCards: {},
    deletedCardNames: [],
    friends: [],
    playerStats: {},
    joinRequest: null,
    activeMatch: null
  };
}

function saveState() {
  const account = activeAccount();
  if (!account) return;
  dedupeTeamCards();
  account.state = state;
  saveAccounts();
  storageSet(saveKey, JSON.stringify(state));
}

function saveAccounts() {
  storageSet(accountsKey, JSON.stringify(accounts));
  saveToLocalDatabase(accountsDatabaseKey, accounts);
  saveToLocalDatabase(activeAccountDatabaseKey, activeAccountId);
}

function activeAccount() {
  return accounts.find((account) => account.id === activeAccountId) || null;
}

function legacySaveAccount(legacySave, index) {
  const username = legacySave.username || (legacySave.selectedStar?.name === "Cristiano Ronaldo" ? developerUsername : null) || "Player 1";
  return {
    id: legacySave.accountId || `legacy-account-${index}`,
    username,
    motto: legacySave.motto || defaultProfileMotto,
    avatarStyle: legacySave.avatarStyle || "gold",
    profilePhoto: legacySave.profilePhoto || "",
    isDev: isDeveloperUsername(username),
    state: legacySave
  };
}

function isRecoverableDeveloperSave(legacySave) {
  return isDeveloperUsername(legacySave?.username)
    || legacySave?.selectedStar?.name === "Cristiano Ronaldo"
    || legacySave?.currentCard?.name === "Cristiano Ronaldo"
    || Object.values(legacySave?.teamCards || {}).some((card) => card?.name === "Cristiano Ronaldo");
}

function normalizeAccounts(savedAccounts, preferredActiveAccountId = null) {
  const validAccounts = savedAccounts.filter((account) => account && typeof account === "object");
  const devAccounts = validAccounts.filter((account) => isPrimaryDeveloperUsername(account.username));
  const mergedDevAccount = mergeDeveloperAccounts(devAccounts, preferredActiveAccountId);
  const normalized = [
    ...(mergedDevAccount ? [mergedDevAccount] : []),
    ...validAccounts.filter((account) => !isPrimaryDeveloperUsername(account.username))
  ]
    .map((account, index) => normalizeAccount(account, index, preferredActiveAccountId));
  const names = new Set();
  normalized.forEach((account, index) => {
    const base = cleanText(account.username, 24) || `Player ${index + 1}`;
    let candidate = base, suffix = 2;
    while (names.has(candidate.toLocaleLowerCase())) {
      const ending = ` ${suffix++}`;
      candidate = `${base.slice(0, 24 - ending.length)}${ending}`;
    }
    account.username = candidate;
    names.add(candidate.toLocaleLowerCase());
  });
  return normalized;
}

function normalizeAccount(account, index) {
  const id = account.id || `account-${Date.now()}-${index}`;
  const username = cleanText(account.username, 24) || `Player ${index + 1}`;
  const isDev = isDeveloperUsername(username);
  const inventoryGrant = isDev ? "dev" : hasFullInventoryUsername(username) ? "special" : false;
  const normalizedState = migrateState({ ...defaultState, ...(account.state || {}) }, inventoryGrant);
  if (isDev) {
    normalizedState.level = Math.max(50, Number(normalizedState.level) || 1);
    if (String(normalizedState.adminXp || "0").length > 6 || normalizedState.xp > 1000000000) {
      normalizedState.adminXp = "0";
      normalizedState.xp = 0;
    }
  }
  return {
    id,
    username: legacyDeveloperUsernames.includes(username) ? developerUsername : username,
    motto: cleanText(account.motto, 42) || defaultProfileMotto,
    avatarStyle: avatarStyles[account.avatarStyle] ? account.avatarStyle : "gold",
    profilePhoto: account.profilePhoto || "",
    isDev,
    state: normalizedState
  };
}

function mergeDeveloperAccounts(devAccounts, preferredActiveAccountId = null) {
  if (!devAccounts.length) return null;
  const bestAccount = devAccounts.slice().sort((first, second) => accountProgressScore(second) - accountProgressScore(first))[0];
  const activeDevAccount = devAccounts.find((account) => account.id === preferredActiveAccountId);
  const baseAccount = accountProgressScore(bestAccount) > accountProgressScore(activeDevAccount) ? bestAccount : activeDevAccount || bestAccount;
  const mergedState = devAccounts.reduce((merged, account) => mergeStates(merged, account.state || {}), {
    ...defaultState,
    ...(baseAccount.state || {})
  });
  mergedState.level = Math.max(50, Number(mergedState.level) || 1);
  mergedState.adminXp = "0";
  mergedState.xp = 0;
  return {
    ...baseAccount,
    username: developerUsername,
    motto: baseAccount.motto || defaultProfileMotto,
    avatarStyle: avatarStyles[baseAccount.avatarStyle] ? baseAccount.avatarStyle : "goat",
    profilePhoto: baseAccount.profilePhoto || "",
    isDev: true,
    state: mergedState
  };
}

function accountProgressScore(account) {
  const accountState = account?.state || {};
  return (accountState.level || 1) * 1000
    + Object.keys(accountState.teamCards || {}).length * 100
    + (accountState.inventory || []).length
    + (accountState.selectedStar ? 50 : 0)
    + (accountState.currentCard ? 10 : 0);
}

function mergeStates(baseState, incomingState) {
  const list = (value) => Array.isArray(value) ? value : [];
  const record = (value) => value && typeof value === "object" && !Array.isArray(value) ? value : {};
  return {
    ...baseState,
    ...incomingState,
    level: Math.max(baseState.level || 1, incomingState.level || 1),
    xp: Math.max(baseState.xp || 0, incomingState.xp || 0),
    adminXp: String(baseState.adminXp || "0").length >= String(incomingState.adminXp || "0").length
      ? String(baseState.adminXp || "0")
      : String(incomingState.adminXp || "0"),
    infiniteLevel: Boolean(baseState.infiniteLevel || incomingState.infiniteLevel),
    inventory: uniqueCards([...list(baseState.inventory), ...list(incomingState.inventory)]),
    teamCards: { ...record(baseState.teamCards), ...record(incomingState.teamCards) },
    deletedCardNames: uniqueNames([...list(baseState.deletedCardNames), ...list(incomingState.deletedCardNames)]),
    redeemedCodes: uniqueNames([...list(baseState.redeemedCodes), ...list(incomingState.redeemedCodes)]),
    claimedLevelRewards: uniqueNames([...list(baseState.claimedLevelRewards), ...list(incomingState.claimedLevelRewards)]),
    badges: uniqueNames([...list(baseState.badges), ...list(incomingState.badges)]),
    friends: uniqueFriends([...list(baseState.friends), ...list(incomingState.friends)]),
    playerStats: { ...record(baseState.playerStats), ...record(incomingState.playerStats) },
    selectedStar: baseState.selectedStar || incomingState.selectedStar || null,
    selectedStarSlot: baseState.selectedStarSlot || incomingState.selectedStarSlot || null,
    currentCard: baseState.currentCard || incomingState.currentCard || null,
    currentCardSaved: Boolean(baseState.currentCardSaved || incomingState.currentCardSaved)
  };
}

function isDeveloperUsername(username) {
  const normalizedUsername = String(username || "").trim();
  return normalizedUsername === developerUsername
    || legacyDeveloperUsernames.includes(normalizedUsername)
    || additionalDeveloperUsernames.includes(normalizedUsername);
}

function isPrimaryDeveloperUsername(username) {
  const normalizedUsername = String(username || "").trim();
  return normalizedUsername === developerUsername || legacyDeveloperUsernames.includes(normalizedUsername);
}

function hasFullInventoryUsername(username) {
  return specialFullInventoryUsernames.includes(String(username || "").trim());
}

function accountInventoryGrant(account) {
  if (account?.isDev) return "dev";
  if (allCardAccessUsernames.includes(String(account?.username || "").trim())) return "dev";
  if (hasFullInventoryUsername(account?.username)) return "special";
  return false;
}

function isDeveloperNameTaken(accountId = null) {
  return accounts.some((account) => account.username === developerUsername && account.id !== accountId);
}

function migrateState(savedState, inventoryGrant = false) {
  const hasFullInventory = Boolean(inventoryGrant);
  const isDeveloperInventory = inventoryGrant === "dev";
  savedState.level = Number.isFinite(Number(savedState.level)) && Number(savedState.level) > 0 ? Number(savedState.level) : 1;
  savedState.xp = Number.isFinite(Number(savedState.xp)) && Number(savedState.xp) >= 0 ? Number(savedState.xp) : 0;
  savedState.adminXp = /^\d+$/.test(String(savedState.adminXp || "0")) ? String(savedState.adminXp || "0") : "0";
  savedState.infiniteLevel = Boolean(savedState.infiniteLevel);
  savedState.infiniteCoins = Boolean(savedState.infiniteCoins);
  savedState.selectedStar = savedState.selectedStar ? enrichCard(savedState.selectedStar) : null;
  savedState.deletedCardNames = Array.isArray(savedState.deletedCardNames) ? savedState.deletedCardNames : [];
  savedState.redeemedCodes = Array.isArray(savedState.redeemedCodes) ? savedState.redeemedCodes : [];
  savedState.claimedLevelRewards = Array.isArray(savedState.claimedLevelRewards) ? savedState.claimedLevelRewards : [];
  savedState.badges = Array.isArray(savedState.badges) ? savedState.badges : [];
  savedState.friends = uniqueFriends(Array.isArray(savedState.friends) ? savedState.friends : []);
  savedState.playerStats = savedState.playerStats && typeof savedState.playerStats === "object" && !Array.isArray(savedState.playerStats)
    ? savedState.playerStats : {};
  savedState.replaceSlot = formation.some((spot) => spot.id === savedState.replaceSlot) ? savedState.replaceSlot : null;
  savedState.dailyRankedWinDate = /^\d{4}-\d{2}-\d{2}$/.test(savedState.dailyRankedWinDate || "")
    ? savedState.dailyRankedWinDate : "";
  savedState.clubPhoto = typeof savedState.clubPhoto === "string" && savedState.clubPhoto.startsWith("data:image/")
    ? savedState.clubPhoto
    : "";
  savedState.rankedPoints = Number.isFinite(Number(savedState.rankedPoints))
    ? Math.max(0, Number(savedState.rankedPoints))
    : 0;
  savedState.matchPoints = Number.isFinite(Number(savedState.matchPoints))
    ? Math.max(0, Number(savedState.matchPoints))
    : 56;
  savedState.joinRequest = isRealJoinRequest(savedState.joinRequest) ? enrichCard(savedState.joinRequest) : null;
  savedState.activeMatch = savedState.activeMatch && typeof savedState.activeMatch === "object" ? savedState.activeMatch : null;
  savedState.inventory = uniqueCards((Array.isArray(savedState.inventory) ? savedState.inventory : []).map(enrichCard));
  if (!isDeveloperInventory) {
    savedState.inventory = savedState.inventory.filter((card) => !isExcludedFullInventoryGrant(card));
  }
  if (!hasFullInventory) {
    savedState.inventory = savedState.inventory.filter((card) => !isDevGrantedCard(card));
  }
  savedState.currentCard = savedState.currentCard ? enrichCard(savedState.currentCard) : null;
  if (!isDeveloperInventory && isExcludedFullInventoryGrant(savedState.selectedStar)) {
    savedState.selectedStar = null;
    savedState.selectedStarSlot = null;
  }
  if (!isDeveloperInventory && isExcludedFullInventoryGrant(savedState.currentCard)) {
    savedState.currentCard = null;
    savedState.currentCardSaved = false;
  }
  if (!hasFullInventory && isDevGrantedCard(savedState.selectedStar)) {
    savedState.selectedStar = null;
    savedState.selectedStarSlot = null;
  }
  if (!hasFullInventory && isDevGrantedCard(savedState.currentCard)) {
    savedState.currentCard = null;
    savedState.currentCardSaved = false;
  }
  if (!savedState.currentCard && savedState.selectedStar) {
    savedState.currentCard = {
      ...savedState.selectedStar,
      id: `${Date.now()}-restored`
    };
    savedState.currentCardSaved = true;
  }
  savedState.teamCards = Object.fromEntries(
    Object.entries(savedState.teamCards && typeof savedState.teamCards === "object" && !Array.isArray(savedState.teamCards) ? savedState.teamCards : {}).flatMap(([slot, card]) => {
      const enrichedCard = enrichCard(card);
      if (!isDeveloperInventory && isExcludedFullInventoryGrant(enrichedCard)) return [];
      if (!hasFullInventory && isDevGrantedCard(enrichedCard)) return [];
      const targetSlot = slotIdFromSave(slot, enrichedCard);
      return enrichedCard && formation.some((spot) => spot.id === targetSlot) ? [[targetSlot, enrichedCard]] : [];
    })
  );
  savedState.inventory = uniqueCards([
    ...savedState.inventory,
    ...Object.values(savedState.teamCards),
    savedState.selectedStar,
    savedState.currentCard,
    ...(hasFullInventory ? allInventoryCards(inventoryGrant) : [])
  ]);
  if (savedState.selectedStar && (!savedState.selectedStarSlot || savedState.selectedStar.position === "CF")) {
    savedState.selectedStarSlot = bestSlotIdForPosition(savedState.selectedStar.position);
  }
  savedState.inventory = uniqueCards(savedState.inventory);
  return savedState;
}

function isDevGrantedCard(card) {
  const id = String(card?.id || "");
  return card?.specialAccess || id.startsWith("owned-") || id.startsWith("guaranteed-");
}

function isExcludedFullInventoryGrant(card) {
  const id = String(card?.id || "");
  return card?.name === "Cristiano Ronaldo" && (id.startsWith("owned-") || id.startsWith("guaranteed-"));
}

function enrichCard(card) {
  const name = cleanText(card?.name, 48);
  if (!name) return null;
  const fullCard = [...cardPool, ...codeOnlyCards].find((item) => item.name === name);
  if (fullCard) return { ...card, ...fullCard, id: cleanText(card.id, 96) || card.id };
  return { ...card, name, team: cleanText(card.team, 48) || "Friend XI", position: cleanText(card.position, 8) || "ST",
    rarity: cleanText(card.rarity, 24) || "Friend", id: cleanText(card.id, 96) || `card-${name.toLowerCase().replaceAll(" ", "-")}` };
}

function allInventoryCards(inventoryGrant = "special") {
  const sourceCards = inventoryGrant === "dev" ? [...cardPool, ...codeOnlyCards] : cardPool;
  return sourceCards
    .filter((card) => inventoryGrant === "dev" || card.name !== "Cristiano Ronaldo")
    .map((card) => ({
      ...card,
      id: `owned-${card.name.toLowerCase().replaceAll(" ", "-").replaceAll(".", "")}`
    }));
}

function slotIdFromSave(slot, card) {
  if (card?.position === "CF") return "st";
  if (formation.some((spot) => spot.id === slot)) return slot;
  if (slot === "lb") return "cb-left";
  if (slot === "rb") return "cb-right";
  if (slot === "cdm") return "cm-left";
  if (slot === "cm-right") return "cm-left";
  return formation.find((spot) => spot.slot === slot)?.id || slot;
}

function openLocalDatabase() {
  if (databasePromise) return databasePromise;
  if (!("indexedDB" in window)) {
    databasePromise = Promise.resolve(null);
    return databasePromise;
  }

  databasePromise = new Promise((resolve) => {
    const request = indexedDB.open(databaseName, databaseVersion);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(databaseStoreName)) {
        database.createObjectStore(databaseStoreName);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
    request.onblocked = () => resolve(null);
  });
  return databasePromise;
}

function databaseRequest(mode, callback) {
  return openLocalDatabase().then((database) => new Promise((resolve) => {
    if (!database) {
      resolve(null);
      return;
    }

    try {
      const transaction = database.transaction(databaseStoreName, mode);
      const store = transaction.objectStore(databaseStoreName);
      const request = callback(store);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  }));
}

function loadFromLocalDatabase(key) {
  return databaseRequest("readonly", (store) => store.get(key));
}

function saveToLocalDatabase(key, value) {
  if (!databaseReady) return;
  databaseRequest("readwrite", (store) => store.put(value, key));
}

function hydrateFromLocalDatabase() {
  openLocalDatabase()
    .then((database) => {
      databaseReady = Boolean(database);
      if (!databaseReady) return Promise.resolve();
      return Promise.all([
        loadFromLocalDatabase(accountsDatabaseKey),
        loadFromLocalDatabase(activeAccountDatabaseKey)
      ]);
    })
    .then((saved) => {
      if (!Array.isArray(saved)) return;
      const [databaseAccounts, databaseActiveAccountId] = saved;
      if (!Array.isArray(databaseAccounts) || !databaseAccounts.length) {
        saveAccounts();
        return;
      }

      accounts = normalizeAccounts(databaseAccounts, databaseActiveAccountId);
      activeAccountId = databaseActiveAccountId && accounts.some((account) => account.id === databaseActiveAccountId)
        ? databaseActiveAccountId
        : null;
      state = loadState();
      storageSet(accountsKey, JSON.stringify(accounts));
      if (activeAccountId) {
        storageSet(activeAccountKey, activeAccountId);
      } else {
        storageRemove(activeAccountKey);
      }
      storageSet(saveKey, JSON.stringify(state));
      saveAccounts();
      render();
      showQuickLoginAfterSplash();
    })
    .catch(() => {});
}

function renderStars() {
  starList.innerHTML = "";
  selectablePlayers.slice().sort(compareCardsByRarity).forEach((star) => {
    const card = document.createElement("div");
    card.className = `star-card ${state.selectedStar?.name === star.name ? "active" : ""}`;
    card.innerHTML = `
      <span>
        <strong>${poolNameLabel(star)}</strong>
        <span class="meta">${star.position} · ${star.rarity} · ${star.team} · ${chanceLabel(star)}</span>
      </span>
      <span class="rating">${ratingLabel(star)}</span>
    `;
    starList.appendChild(card);
  });
}

function renderLoginBackdrop() {
  loginCardBackdrop.innerHTML = "";
  cardPool.slice(0, 28).forEach((card) => {
    const tile = document.createElement("div");
    tile.className = `login-mini-card rarity-${rarityClass(card.rarity)}`;
    tile.innerHTML = `
      <strong>${card.name}</strong>
      <span>${card.position} · ${card.team}</span>
    `;
    loginCardBackdrop.appendChild(tile);
  });
}

function renderAccounts() {
  accountList.innerHTML = "";
  if (!accounts.length) {
    accountList.className = "account-list empty-state";
    accountList.textContent = "Create your username to start.";
    return;
  }

  accountList.className = "account-list";
  accounts.forEach((account) => {
    const accountRow = document.createElement("div");
    const accountButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const inventoryGrant = accountInventoryGrant(account);
    const hasFullInventory = Boolean(inventoryGrant);
    const accountState = account.state || freshState(inventoryGrant);
    const selectedName = accountState.selectedStar?.name || "No player yet";
    const accessLabel = account.isDev ? " · Dev" : hasFullInventory ? " · Special" : "";
    const accountLevel = levelDisplay(accountState.level || 1, accountState.infiniteLevel);
    accountRow.className = "account-row";
    accountButton.className = "account-card secondary";
    accountButton.type = "button";
    accountButton.innerHTML = `
      <i class="login-account-avatar">${escapeHtml(avatarStyles[account.avatarStyle] || "FC")}</i>
      <span class="login-account-copy"><strong>${escapeHtml(account.username)}</strong>
      <small>${escapeHtml(selectedName)} · Level ${escapeHtml(accountLevel)}${escapeHtml(accessLabel)}</small></span>
      <em aria-hidden="true">→</em>
    `;
    deleteButton.className = "account-delete-btn secondary danger-btn";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${account.username}`);
    accountButton.addEventListener("click", () => loginAccount(account.id));
    deleteButton.addEventListener("click", () => deleteAccount(account.id));
    accountRow.append(accountButton, deleteButton);
    accountList.appendChild(accountRow);
  });
}

function deleteAccount(id) {
  const account = accounts.find((item) => item.id === id);
  if (!account) return;
  const confirmed = confirm(`Delete ${account.username}? This cannot be undone.`);
  if (!confirmed) return;

  accounts = accounts.filter((item) => item.id !== id);
  if (activeAccountId === id) {
    stopMatchPhysics();
    stopMatchMovement();
    activeAccountId = null;
    state = freshState(false);
    storageRemove(activeAccountKey);
    storageRemove(saveKey);
    saveToLocalDatabase(activeAccountDatabaseKey, null);
  }
  saveAccounts();
  renderAccounts();
  if (activeAccount()) render();
}

function showQuickLogin() {
  renderLoginBackdrop();
  quickLoginTitle.textContent = accounts.length ? "Choose Your Club" : "Create Your Club";
  createAccountBtn.textContent = accounts.length ? "CREATE NEW CLUB  +" : "CREATE YOUR CLUB  →";
  clearQuickLoginMessage();
  renderAccounts();
  quickLoginOverlay.hidden = false;
}

function showQuickLoginAfterSplash() {
  if (startSplashActive || activeAccount()) return;
  showQuickLogin();
}

function hideQuickLogin() {
  clearQuickLoginMessage();
  quickLoginOverlay.hidden = true;
  quickLoginOverlay.classList.remove("match-login");
  if (pendingMatchLogin) {
    pendingMatchLogin = false;
    const mode = pendingMatchMode;
    pendingMatchMode = "Quick Match";
    requestAnimationFrame(() => startMatch(mode));
  }
}

function showQuickLoginMessage(message) {
  quickLoginMessage.textContent = message;
  quickLoginMessage.hidden = false;
}

function clearQuickLoginMessage() {
  quickLoginMessage.textContent = "";
  quickLoginMessage.hidden = true;
}

function openGamePrompt({ title, label, value = "", submitLabel = "OK", onSubmit }) {
  activePromptSubmit = onSubmit;
  gamePromptTitle.textContent = title;
  gamePromptLabel.textContent = label;
  gamePromptInput.value = value;
  gamePromptMessage.hidden = true;
  gamePromptMessage.textContent = "";
  gamePromptSubmitBtn.textContent = submitLabel;
  gamePromptOverlay.hidden = false;
  requestAnimationFrame(() => {
    gamePromptInput.focus();
    gamePromptInput.select();
  });
}

function closeGamePrompt() {
  activePromptSubmit = null;
  gamePromptOverlay.hidden = true;
  gamePromptForm.reset();
  gamePromptMessage.hidden = true;
  gamePromptMessage.textContent = "";
}

function showGamePromptMessage(message) {
  gamePromptMessage.textContent = message;
  gamePromptMessage.hidden = false;
}

function loginAccount(id) {
  const account = accounts.find((item) => item.id === id);
  if (!account) return;
  activeAccountId = account.id;
  account.isDev = isDeveloperUsername(account.username);
  const inventoryGrant = accountInventoryGrant(account);
  storageSet(activeAccountKey, activeAccountId);
  state = migrateState({ ...defaultState, ...(account.state || {}) }, inventoryGrant);
  account.state = state;
  saveAccounts();
  hideQuickLogin();
  settingsMenu.hidden = true;
  settingsBtn.setAttribute("aria-expanded", "false");
  render();
}

function logoutAccount() {
  saveState();
  stopMatchPhysics();
  stopMatchMovement();
  activeAccountId = null;
  state = freshState(false);
  storageRemove(activeAccountKey);
  saveToLocalDatabase(activeAccountDatabaseKey, null);
  settingsMenu.hidden = true;
  settingsBtn.setAttribute("aria-expanded", "false");
  render();
  showQuickLogin();
}

function createAccount() {
  openGamePrompt({
    title: "Create Account",
    label: "Choose a username",
    value: `Player ${accounts.length + 1}`,
    submitLabel: "Create",
    onSubmit: finishCreateAccount
  });
}

function finishCreateAccount(username) {
  const savedUsername = cleanText(username, 24);
  if (!savedUsername) {
    showGamePromptMessage("Username cannot be empty.");
    return;
  }
  if (isUsernameTaken(savedUsername)) {
    showGamePromptMessage("That username is already in use.");
    return;
  }
  if (savedUsername === developerUsername && isDeveloperNameTaken()) {
    showGamePromptMessage("That dev username is already taken.");
    return;
  }
  const isDev = isDeveloperUsername(savedUsername);
  const inventoryGrant = isDev ? "dev" : hasFullInventoryUsername(savedUsername) ? "special" : false;
  const account = {
    id: `account-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    username: savedUsername,
    motto: defaultProfileMotto,
    avatarStyle: isDev ? "goat" : "gold",
    profilePhoto: "",
    isDev,
    state: freshState(inventoryGrant)
  };
  accounts = [account, ...accounts];
  saveAccounts();
  closeGamePrompt();
  loginAccount(account.id);
}

function addFriend() {
  openGamePrompt({
    title: "Add Friend",
    label: "Friend username",
    value: "",
    submitLabel: "Add",
    onSubmit: finishAddFriend
  });
}

function finishAddFriend(username) {
  const savedUsername = cleanText(username, 24);
  if (!savedUsername) {
    showGamePromptMessage("Enter a username.");
    return;
  }
  const senderAccount = activeAccount();
  const receiverAccount = accounts.find((account) => account.username.toLowerCase() === savedUsername.toLowerCase());
  const duplicate = state.friends.some((friend) => friend.username.toLowerCase() === savedUsername.toLowerCase());
  if (duplicate) {
    showGamePromptMessage("That friend is already added.");
    return;
  }
  if (senderAccount?.username?.toLowerCase() === savedUsername.toLowerCase()) {
    showGamePromptMessage("You cannot add yourself.");
    return;
  }
  if (!receiverAccount) {
    showGamePromptMessage("That player does not exist yet.");
    return;
  }
  if (!senderAccount) return;

  const receiverState = receiverAccount.state || freshState(accountInventoryGrant(receiverAccount));
  const receiverAlreadyHasSender = receiverState.friends?.some((friend) => friend.username.toLowerCase() === senderAccount.username.toLowerCase());
  if (receiverAlreadyHasSender) {
    showGamePromptMessage("That player already has your request or is already your friend.");
    return;
  }

  receiverState.friends = uniqueFriends([
    ...(receiverState.friends || []),
    friendRecord(senderAccount, "pending")
  ]);
  receiverAccount.state = receiverState;
  closeGamePrompt();
  reportTitle.textContent = `Request sent to ${savedUsername}`;
  reportText.textContent = `${savedUsername} will see Accept and Decline when they log in.`;
  saveState();
  render();
}

function acceptFriendRequest(id) {
  const friend = state.friends.find((item) => item.id === id);
  if (!friend) return;
  const receiverAccount = activeAccount();
  const senderAccount = accounts.find((account) => account.id === friend.accountId)
    || accounts.find((account) => account.username.toLowerCase() === friend.username.toLowerCase());
  friend.status = "accepted";
  if (receiverAccount && senderAccount) {
    const senderState = senderAccount.state || freshState(accountInventoryGrant(senderAccount));
    senderState.friends = uniqueFriends([
      ...(senderState.friends || []),
      friendRecord(receiverAccount, "accepted")
    ]);
    senderAccount.state = senderState;
    friend.accountId = senderAccount.id;
  }
  reportTitle.textContent = `${friend.username} accepted`;
  reportText.textContent = `${friend.username} can now be invited to your XI.`;
  saveState();
  render();
}

function declineFriendRequest(id) {
  const friend = state.friends.find((item) => item.id === id);
  if (!friend) return;
  state.friends = state.friends.filter((item) => item.id !== id);
  if (state.joinRequest?.friendId === id) state.joinRequest = null;
  reportTitle.textContent = `${friend.username} declined`;
  reportText.textContent = `${friend.username}'s friend request was removed.`;
  saveState();
  render();
}

function removeFriend(id) {
  const friend = state.friends.find((item) => item.id === id);
  if (!friend) return;
  state.friends = state.friends.filter((item) => item.id !== id);
  if (state.joinRequest?.friendId === id) state.joinRequest = null;
  reportTitle.textContent = `${friend.username} removed`;
  reportText.textContent = `${friend.username} is no longer in your friends list.`;
  saveState();
  render();
}

function inviteFriend(id) {
  const friend = state.friends.find((item) => item.id === id);
  if (!friend || friend.status !== "accepted") return;
  const senderAccount = activeAccount();
  const receiverAccount = accountForFriend(friend);
  if (!senderAccount || !receiverAccount) {
    reportTitle.textContent = "Friend account missing";
    reportText.textContent = `${friend.username} needs a local account before you can send an XI request.`;
    render();
    return;
  }

  const receiverState = receiverAccount.state || freshState(accountInventoryGrant(receiverAccount));
  if (hasActiveClan(receiverState)) {
    reportTitle.textContent = `${friend.username} already has an XI`;
    reportText.textContent = `You cannot send an XI request while ${friend.username} already has a club.`;
    render();
    return;
  }
  if (isRealJoinRequest(receiverState.joinRequest)) {
    reportTitle.textContent = `${friend.username} has a pending request`;
    reportText.textContent = `Wait for ${friend.username} to accept or decline their current XI request.`;
    render();
    return;
  }

  receiverState.joinRequest = friendCard(friendRecord(senderAccount, "accepted"), senderAccount);
  receiverAccount.state = receiverState;
  reportTitle.textContent = `${friend.username} invited`;
  reportText.textContent = `${friend.username} will see your XI request when they log in.`;
  saveState();
  render();
}

function openProfileEditor() {
  const account = activeAccount();
  if (!account) {
    showQuickLogin();
    return;
  }
  const avatarStyle = canUseGoatProfile() ? account.avatarStyle || "gold" : account.avatarStyle === "goat" ? "gold" : account.avatarStyle || "gold";
  profileUsernameInput.value = account.username;
  profileMottoInput.value = account.motto || defaultProfileMotto;
  profileAvatarStyleInputs.forEach((input) => {
    input.disabled = input.value === "goat" && !canUseGoatProfile();
    input.closest(".avatar-choice")?.classList.toggle("locked", input.disabled);
    input.checked = input.value === avatarStyle;
  });
  profileEditorMessage.hidden = true;
  profileEditorMessage.textContent = "";
  updateProfilePreview();
  settingsMenu.hidden = true;
  settingsBtn.setAttribute("aria-expanded", "false");
  profileOverlay.hidden = false;
  requestAnimationFrame(() => profileUsernameInput.focus());
}

function closeProfileEditor() {
  profileOverlay.hidden = true;
  profileForm.reset();
  profileEditorMessage.hidden = true;
  profileEditorMessage.textContent = "";
}

function selectedAvatarStyle() {
  return [...profileAvatarStyleInputs].find((input) => input.checked)?.value || "gold";
}

function updateProfilePreview() {
  const account = activeAccount();
  if (!account) return;
  const selectedName = state.selectedStar?.name || "No player yet";
  renderProfileAvatar(profilePreviewAvatar, selectedAvatarStyle(), account.profilePhoto);
  profilePreviewMeta.textContent = `${profileUsernameInput.value.trim() || account.username} · ${profileMottoInput.value.trim() || defaultProfileMotto} · ${selectedName}`;
}

function showProfileEditorMessage(message) {
  profileEditorMessage.textContent = message;
  profileEditorMessage.hidden = false;
}

function saveProfile() {
  const account = activeAccount();
  if (!account) return;
  const savedUsername = cleanText(profileUsernameInput.value, 24);
  if (!savedUsername) {
    showProfileEditorMessage("Username cannot be empty.");
    return;
  }
  if (isUsernameTaken(savedUsername, account.id)) {
    showProfileEditorMessage("That username is already in use.");
    return;
  }
  if (savedUsername === developerUsername && isDeveloperNameTaken(account.id)) {
    showProfileEditorMessage("That dev username is already taken.");
    return;
  }
  account.username = savedUsername;
  account.motto = cleanText(profileMottoInput.value, 42) || defaultProfileMotto;
  account.avatarStyle = selectedAvatarStyle() === "goat" && !canUseGoatProfile() ? "gold" : selectedAvatarStyle();
  account.isDev = isDeveloperUsername(account.username);
  state = migrateState({ ...defaultState, ...state }, accountInventoryGrant(account));
  account.state = state;
  saveAccounts();
  closeProfileEditor();
  render();
}

function canUseGoatProfile() {
  return hasInfiniteLevel() || state.level >= 50 || state.badges.includes(goatProfileBadge);
}

function openProfilePhotoPicker() {
  if (!activeAccount()) {
    showQuickLogin();
    return;
  }
  profilePhotoInput.click();
}

function saveProfilePhoto(file) {
  const account = activeAccount();
  if (!account || !file) return;
  if (!file.type.startsWith("image/")) {
    showProfileEditorMessage("Choose an image file.");
    return;
  }

  resizeProfilePhoto(file)
    .then((dataUrl) => {
      account.profilePhoto = dataUrl;
      saveAccounts();
      render();
      if (!profileOverlay.hidden) updateProfilePreview();
    })
    .catch(() => {
      showProfileEditorMessage("That picture could not be loaded.");
    })
    .finally(() => {
      profilePhotoInput.value = "";
    });
}

function resizeProfilePhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const size = Math.min(image.width, image.height);
        const sourceX = (image.width - size) / 2;
        const sourceY = (image.height - size) / 2;
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext("2d");
        context.drawImage(image, sourceX, sourceY, size, size, 0, 0, 256, 256);
        resolve(canvas.toDataURL("image/jpeg", 0.86));
      };
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function buildTeam() {
  const selectedStarSlot = state.selectedStarSlot || bestSlotIdForPosition(state.selectedStar?.position);
  return formation.map((spot, index) => {
    const pitchSpot = pitchDisplaySpot(spot);
    const star = state.selectedStar;
    if (star && spot.id === selectedStarSlot) {
      return { ...pitchSpot, ...star, id: spot.id, cardId: star.id, slot: star.position, controlled: true };
    }

    const savedCard = state.teamCards[spot.id];
    if (savedCard) {
      return {
        ...pitchSpot,
        ...savedCard,
        id: spot.id,
        cardId: savedCard.id,
        slot: savedCard.position,
        controlled: false
      };
    }

    const player = activeAccount()?.isDev ? starterNames[index] : null;
    const starterCard = player ? starterCardForName(player) : null;
    if (player && starterCard) {
      return {
        ...pitchSpot,
        ...starterCard,
        id: spot.id,
        cardId: `starter-${starterCard.name.toLowerCase().replaceAll(" ", "-")}`,
        slot: starterCard.position,
        controlled: false
      };
    }

    return {
      ...pitchSpot,
      name: botName(spot),
      team: "Starter Bots",
      rating: 60 + Math.min(state.level, 10),
      rarity: "Bronze",
      controlled: false
    };
  });
}

function pitchDisplaySpot(spot) {
  if (typeof window === "undefined" || document.fullscreenElement === pitch || !window.matchMedia("(max-width: 760px)").matches) return spot;
  return { ...spot, ...(mobileFormationPositions[spot.id] || {}) };
}

function updatePitchFullscreenButton() {
  const isFullscreen = document.fullscreenElement === pitch;
  pitch.classList.toggle("is-fullscreen", isFullscreen);
  pitchFullscreenBtn.innerHTML = isFullscreen
    ? '<span aria-hidden="true">×</span><span class="pitch-fullscreen-label">Exit</span>'
    : '<span aria-hidden="true">⛶</span><span class="pitch-fullscreen-label">Full screen</span>';
  pitchFullscreenBtn.setAttribute("aria-label", isFullscreen ? "Exit pitch fullscreen" : "Open pitch fullscreen");
  pitchFullscreenBtn.title = isFullscreen ? "Exit pitch fullscreen" : "Open pitch fullscreen";
  renderPitch();
}

async function togglePitchFullscreen() {
  try {
    if (document.fullscreenElement === pitch) {
      await document.exitFullscreen();
      if (screen.orientation?.unlock) screen.orientation.unlock();
      return;
    }

    await pitch.requestFullscreen({ navigationUI: "hide" });
    try {
      await screen.orientation?.lock?.("landscape");
    } catch {
      // Orientation locking is unavailable in some browsers, but fullscreen still works.
    }
  } catch {
    pitch.classList.toggle("fullscreen-fallback");
    updatePitchFullscreenButton();
  }
}

function botName(spot) {
  return `Bot ${spot.id.toUpperCase().replaceAll("-", " ")}`;
}

function starterCardForName(name) {
  const map = {
    Maignan: "Mike Maignan",
    Saliba: "William Saliba",
    Son: "Son Heung-min",
    Modric: "Luka Modric",
    Salah: "Mohamed Salah",
    Mbappe: "Kylian Mbappe",
    Yamal: "Lamine Yamal"
  };
  return cardPool.find((card) => card.name === (map[name] || name));
}

function startMatch(mode = "Quick Match") {
  if (!activeAccount()) {
    pendingMatchLogin = true;
    pendingMatchMode = cleanText(mode, 32) || "Quick Match";
    quickLoginOverlay.classList.add("match-login");
    showQuickLogin();
    return;
  }

  const featuredPlayer = state.selectedStar || buildTeam().find((player) => player.name && player.image) || cardPool[0];
  const opponent = opponentTeams[Math.floor(Math.random() * opponentTeams.length)];
  const matchTeam = buildTeam();
  let controlledPlayerIndex = matchTeam.findIndex((player) => player.controlled);
  if (controlledPlayerIndex < 0) controlledPlayerIndex = Math.min(5, matchTeam.length - 1);
  matchTeam[controlledPlayerIndex].controlled = true;
  const homeMatchPlayers = matchTeam.map((player, index) => ({
    name: player.name,
    role: player.slot,
    x: formation[index].x,
    y: formation[index].y,
    baseX: formation[index].x,
    baseY: formation[index].y,
    vx: 0,
    vy: 0
  }));
  const awayMatchPlayers = formation.map((spot, index) => ({
    name: index === 0 ? `${opponent.name} Keeper` : `${opponent.name} ${index + 1}`,
    role: spot.slot,
    x: spot.x,
    y: 100 - spot.y,
    baseX: spot.x,
    baseY: 100 - spot.y,
    vx: 0,
    vy: 0
  }));
  const controlledStart = homeMatchPlayers[controlledPlayerIndex];
  state.activeMatch = {
    mode: cleanText(mode, 32) || "Quick Match",
    home: 0,
    away: 0,
    minute: 1,
    goals: [],
    homeLeader: teamLeaderName(),
    awayLeader: opponent.name,
    opponentMultiplier: opponent.multiplier,
    playerX: controlledStart.x,
    playerY: controlledStart.y,
    playerFacingX: 0,
    playerFacingY: -1,
    playerVX: 0,
    playerVY: 0,
    playerSpeed: 0,
    stamina: 100,
    ballX: controlledStart.x,
    ballY: controlledStart.y - 3.2,
    ballHeight: 0,
    ballVX: 0,
    ballVY: 0,
    ballVZ: 0,
    ballSpin: 0,
    lastTouchTeam: "home",
    lastTouchPlayer: featuredPlayer?.name || "FC Stars",
    controlledPlayerIndex,
    controlledPlayerName: controlledStart.name,
    homePlayers: homeMatchPlayers,
    awayPlayers: awayMatchPlayers,
    simulationTime: 0,
    displaySeconds: 0,
    aiTouchCooldown: 0,
    lastShotAt: 0,
    lastShotPosition: null,
    sprinting: false,
    playerImage: featuredPlayer?.image || "",
    homeTeam: matchTeam.map(({ id, name, position, team, rating, image, controlled }) => ({
      id, name, position, team, rating, image: image || "", controlled: Boolean(controlled)
    }))
  };
  normalizeMatchState(state.activeMatch);
  state.inventoryOpen = false;
  reportTitle.textContent = "Match started";
  reportText.textContent = `${state.activeMatch.homeLeader} leads FC Stars against ${state.activeMatch.awayLeader}.`;
  saveState();
  render();
  if (!matchPanel.closest("#prototypeMatchOverlay")) matchPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  state.activeMatch.announcement = "KICKOFF";
  state.activeMatch.announcementUntil = state.activeMatch.simulationTime + 1.1;
  updateMatchField();
  startMatchPhysics();
}

function endMatch({ abandoned = false } = {}) {
  if (!state.activeMatch) return;
  clearMatchTimer();
  stopMatchPhysics();
  stopMatchMovement();
  const finishedMatch = state.activeMatch;
  const score = `${finishedMatch.home}-${finishedMatch.away}`;
  const won = finishedMatch.home > finishedMatch.away;
  const drew = finishedMatch.home === finishedMatch.away;
  const ranked = finishedMatch.mode === "Ranked Rush";
  const completedWin = won && !abandoned;
  const winXp = completedWin ? matchWinXp(finishedMatch.home, finishedMatch.away) : 0;
  const tablePoints = completedWin && ranked ? 10 : 0;
  const coinReward = abandoned ? 0 : Math.max(0, Number(finishedMatch.home) || 0) * 25;
  if (tablePoints) {
    state.rankedPoints = Math.max(0, Number(state.rankedPoints) || 0) + tablePoints;
    state.dailyRankedWinDate = localDateKey();
  }
  state.matchPoints = Math.max(0, Number(state.matchPoints) || 0) + coinReward;
  const xpResult = completedWin ? addXp(winXp) : { leveledUpTo: [], rewardMessages: [] };
  const levelMessage = xpResult.leveledUpTo.length
    ? ` Level ${xpResult.leveledUpTo[xpResult.leveledUpTo.length - 1]} reached.`
    : "";
  state.activeMatch = null;
  sceneGoalText.textContent = `Final score ${score}`;
  reportTitle.textContent = abandoned ? "Match left" : "Full time";
  const rankedReward = tablePoints ? ` +${tablePoints} Ranked Points,` : "";
  reportText.textContent = abandoned
    ? `Match abandoned at ${score}. No rewards were awarded.`
    : won
    ? `Victory! FC Stars won ${score}.${rankedReward} +${coinReward} Coins, and +${winXp} XP.${levelMessage}`
    : drew
      ? `Draw ${score}. +${coinReward} Coins for your goals. Win the next match to earn XP.`
      : `Defeat ${score}. +${coinReward} Coins for your goals. Win a match to earn XP.`;
  saveState();
  render();
  window.dispatchEvent(new CustomEvent("fc-stars-match-ended", { detail: { won: completedWin, tablePoints, coinReward, score, mode: finishedMatch.mode, abandoned } }));
}

function matchWinXp(homeGoals, awayGoals) {
  const goals = Math.max(0, Number(homeGoals) || 0);
  const margin = Math.max(0, goals - (Number(awayGoals) || 0));
  return 150 + goals * 75 + margin * 125;
}

function clearMatchTimer() {
  if (matchTimer) window.clearTimeout(matchTimer);
  matchTimer = null;
}

function updateMatchField() {
  const match = state.activeMatch;
  if (!match) return;
  match.playerX = Number.isFinite(match.playerX) ? match.playerX : 24;
  match.playerY = Number.isFinite(match.playerY) ? match.playerY : 50;
  match.ballX = Number.isFinite(match.ballX) ? match.ballX : match.playerX + 5;
  match.ballY = Number.isFinite(match.ballY) ? match.ballY : match.playerY;
  match.ballHeight = Number.isFinite(match.ballHeight) ? match.ballHeight : 0;
  match.ballVX = Number.isFinite(match.ballVX) ? match.ballVX : 0;
  match.ballVY = Number.isFinite(match.ballVY) ? match.ballVY : 0;
  match.ballVZ = Number.isFinite(match.ballVZ) ? match.ballVZ : 0;
  match.ballSpin = Number.isFinite(match.ballSpin) ? match.ballSpin : 0;
  matchAvatar.textContent = shortName(match.controlledPlayerName || state.selectedStar?.name || activeAccount()?.username || "YOU");
  const clock = formatMatchClock(match);
  if (matchHudClock && matchHudClock.textContent !== clock) matchHudClock.textContent = clock;
  const announcement = match.simulationTime < match.announcementUntil ? match.announcement : "";
  if (sceneGoalText.textContent !== announcement) sceneGoalText.textContent = announcement;
  sceneGoalText.classList.toggle("is-visible", Boolean(announcement));
  matchScoreLabel.textContent = `${match.home} - ${match.away}`;
  if (matchControlledLabel) matchControlledLabel.textContent = match.controlledPlayerName || "FC Stars";
  if (matchStaminaFill) matchStaminaFill.style.width = `${clamp(match.stamina ?? 100, 0, 100)}%`;
  matchClockLabel.textContent = `Live · ${formatMatchClock(match)}`;
  matchAvatar.style.left = `${match.playerX}%`;
  matchAvatar.style.top = `${match.playerY}%`;
  matchBall.style.left = `${match.ballX}%`;
  matchBall.style.top = `${match.ballY}%`;
  matchAvatar.classList.toggle("is-sprinting", Boolean(match.sprinting));
  matchTeammate.style.left = `${Math.min(88, match.playerX + 18)}%`;
  matchTeammate.style.top = `${Math.max(16, match.playerY - 14)}%`;
  matchOpponent.style.left = `${Math.max(12, match.playerX + 30)}%`;
  matchOpponent.style.top = `${Math.min(82, match.playerY + 7)}%`;
  window.match3D?.update(match);
}

function formatMatchClock(match) {
  const totalSeconds = Math.max(0, Math.min(90 * 60, Math.floor(match.displaySeconds || 0)));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function matchAction(kind, power = 0.42) {
  const match = state.activeMatch;
  if (!match || match.phase !== "play") return;
  const p = match.homePlayers[match.controlledPlayerIndex];
  const input = matchMovementInput();
  const hasAim = Math.hypot(input.x, input.y) > 0.2;
  queuePlayerAction(match, p, kind, power, hasAim ? { x: input.x, z: input.y } : null);
}

function queuePlayerAction(match, p, kind, power = 0.42, aim = null) {
  if (!p || match.phase !== "play" || p.action && match.simulationTime < p.action.until) return false;
  const distance = FCMatchPhysics.distance(p.x, p.y, match.ballX, match.ballY);
  if (kind !== "tackle" && (distance > 1.25 || match.ballHeight > 0.85 || match.keeperHold)) return false;
  const contactDelay = kind === "tackle" ? 0.14 : kind === "cross" ? 0.19 : kind === "shoot" ? 0.16 : 0.11;
  p.action = { kind, power: clamp(power, 0.24, 1), aim, start: match.simulationTime,
    contactAt: match.simulationTime + contactDelay, until: match.simulationTime + (kind === "tackle" ? 0.65 : 0.48), fired: false };
  return true;
}

function emitMatchEvent(match, type, player = null, details = {}) {
  const event = { id: ++match.eventSequence, type, playerId: player?.id, team: player?.team, time: match.simulationTime, ...details };
  match.events.push(event);
  if (match.events.length > 32) match.events.shift();
  const captions = { goal: "GOAL", save: "SAVED", catch: "CAUGHT", post: "OFF THE POST", bar: "OFF THE BAR" };
  if (captions[type]) {
    match.announcement = captions[type];
    match.announcementUntil = match.simulationTime + (type === "goal" ? 1.8 : 0.85);
  }
  if (type === "kick") playMatchSound("kick", details.power || 0.4);
  if (type === "save") playMatchSound("save");
  if (type === "goal") playMatchSound("goal");
  if (type === "tackle") playMatchSound("tackle", 0.5);
  return event;
}

function passTarget(match, p, aim, through = false) {
  const P = FCMatchPhysics, dir = p.team === "home" ? -1 : 1;
  const teammates = match[p.team + "Players"].filter(q => q.id !== p.id && q.role !== "GK");
  const facingX = aim?.x ?? Math.sin(p.facing), facingZ = aim?.z ?? Math.cos(p.facing);
  let best = null, bestScore = -Infinity;
  for (const q of teammates) {
    const dx = P.x(q.x) - P.x(p.x), dz = P.z(q.y) - P.z(p.y), distance = Math.hypot(dx, dz);
    if (distance < 1 || distance > 15) continue;
    const alignment = (dx * facingX + dz * facingZ) / distance;
    if (alignment < (aim ? 0.25 : -0.35)) continue;
    const lane = passingLaneClearance(match, p, q);
    const score = alignment * 4 + Math.min(lane, 2) * 1.3 - distance * 0.12 + (through ? dz * dir * 0.2 : 0);
    if (score > bestScore) { bestScore = score; best = q; }
  }
  if (!best) return { x: clamp(P.x(p.x) + facingX * 5, -8, 8), z: clamp(P.z(p.y) + facingZ * 5, -13, 13) };
  const lead = through ? 0.8 : 0.3;
  return { x: clamp(P.x(best.x) + best.vx * 0.18 * lead, -8.2, 8.2),
    z: clamp(P.z(best.y) + best.vy * 0.28 * lead + (through ? dir * 2 : 0), -12.8, 12.8), receiverId: best.id };
}

function passingLaneClearance(match, p, q) {
  const P = FCMatchPhysics, ax = P.x(p.x), az = P.z(p.y);
  const dx = P.x(q.x) - ax, dz = P.z(q.y) - az, length2 = dx * dx + dz * dz || 1;
  let clearance = 10;
  for (const opponent of match[p.team === "home" ? "awayPlayers" : "homePlayers"]) {
    const t = clamp(((P.x(opponent.x) - ax) * dx + (P.z(opponent.y) - az) * dz) / length2, 0, 1);
    clearance = Math.min(clearance, Math.hypot(P.x(opponent.x) - ax - dx * t, P.z(opponent.y) - az - dz * t));
  }
  return clearance;
}

function resolvePlayerActions(match) {
  const P = FCMatchPhysics;
  for (const p of [...match.homePlayers, ...match.awayPlayers]) {
    const action = p.action;
    if (!action || action.fired || match.simulationTime < action.contactAt) continue;
    action.fired = true;
    const b = P.readBall(match), distance = Math.hypot(b.x - P.x(p.x), b.z - P.z(p.y));
    if (match.keeperHold || b.y > 1 || distance > (action.kind === "tackle" ? 1.05 : 1.3)) continue;
    const dir = p.team === "home" ? -1 : 1;
    let target, speed, lift = 0, spin = 0;
    if (action.kind === "tackle") {
      const fx = Math.sin(p.facing), fz = Math.cos(p.facing);
      if ((b.x - P.x(p.x)) * fx + (b.z - P.z(p.y)) * fz < -0.15) continue;
      P.release(match, p.id, p.team, p.name, fx * 4.3, fz * 4.3, 0.35);
      emitMatchEvent(match, "tackle", p); continue;
    }
    if (action.kind === "dribble") {
      P.release(match, p.id, p.team, p.name, Math.sin(p.facing) * 3.8, Math.cos(p.facing) * 3.8);
      emitMatchEvent(match, "kick", p, { power: 0.2 }); continue;
    }
    if (action.kind === "shoot") {
      const keeper = match[p.team === "home" ? "awayPlayers" : "homePlayers"][0];
      const aimX = action.aim ? action.aim.x * 2.55 : (P.x(keeper.x) >= b.x ? -1.9 : 1.9);
      target = { x: clamp(aimX, -2.6, 2.6), z: dir * 14.6 };
      speed = 11.5 + action.power * 7;
      lift = 1.1 + action.power * 2.5;
      spin = clamp((target.x - b.x) * 0.035, -0.32, 0.32) * (1 - action.power * 0.65);
    } else if (action.kind === "cross") {
      const receiver = match[p.team + "Players"].filter(q => q.role === "ST" || q.role === "LW" || q.role === "RW")
        .sort((a, b) => Math.abs(P.x(a.x)) - Math.abs(P.x(b.x)))[0];
      target = { x: receiver ? clamp(P.x(receiver.x), -2.5, 2.5) : 0, z: dir * 10.1 };
      lift = 5.4; speed = clamp(Math.hypot(target.x - b.x, target.z - b.z) / 1.05, 4, 13);
      spin = b.x < 0 ? -0.2 : 0.2;
    } else {
      target = passTarget(match, p, action.aim, action.kind === "through");
      const distance = Math.hypot(target.x - b.x, target.z - b.z);
      speed = clamp(Math.sqrt(2 * P.pitch.rollingDeceleration * distance + (action.kind === "through" ? 9 : 2.25)), 3, 12);
      lift = 0.15;
      match.intendedReceiverId = target.receiverId;
    }
    const dx = target.x - b.x, dz = target.z - b.z, length = Math.hypot(dx, dz) || 1;
    P.release(match, p.id, p.team, p.name, dx / length * speed, dz / length * speed, lift, spin);
    if (action.kind === "shoot") match.pendingShooter = p.name;
    emitMatchEvent(match, "kick", p, { power: action.power, action: action.kind });
  }
}

let matchAudioContext = null;

function playMatchSound(kind, power = 0.5) {
  try {
    matchAudioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const context = matchAudioContext;
    if (context.state === "suspended") context.resume();
    const now = context.currentTime;
    if (kind === "goal") {
      playCrowdBurst(context, now, 1.6);
      [392, 523, 659].forEach((frequency, index) => playTone(context, frequency, now + index * 0.09, 0.32, 0.055, "triangle"));
      return;
    }
    if (kind === "save") {
      playCrowdBurst(context, now, 0.38);
      playTone(context, 145, now, 0.12, 0.035, "square");
      return;
    }
    const frequency = kind === "tackle" ? 82 : 96 + power * 54;
    playTone(context, frequency, now, 0.055 + power * 0.045, 0.035 + power * 0.028, "sine");
  } catch {
    // Audio is optional when autoplay or Web Audio is unavailable.
  }
}

function playTone(context, frequency, start, duration, volume, type) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(45, frequency * 0.54), start + duration);
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration);
}

function playCrowdBurst(context, start, duration) {
  const length = Math.floor(context.sampleRate * duration);
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const channel = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) channel[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / length);
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.value = 720;
  filter.Q.value = 0.55;
  gain.gain.value = 0.045;
  source.connect(filter).connect(gain).connect(context.destination);
  source.start(start);
}

function switchControlledPlayer() {
  const match = state.activeMatch;
  if (!match || match.phase !== "play") return;
  cancelShotCharge();
  const players = match.homePlayers || [];
  if (!players.length) return;
  const oldIndex = match.controlledPlayerIndex || 0;
  const oldPlayer = players[oldIndex];
  if (oldPlayer) {
    oldPlayer.x = match.playerX;
    oldPlayer.y = match.playerY;
    oldPlayer.vx = match.playerVX || 0;
    oldPlayer.vy = match.playerVY || 0;
  }
  const candidates = players
    .map((player, index) => ({ player, index, distance: FCMatchPhysics.distance(player.x, player.y, match.ballX, match.ballY) }))
    .filter(({ player, index }) => player.role !== "GK" && index !== oldIndex)
    .sort((a, b) => a.distance - b.distance);
  if (!candidates.length) return;
  const next = candidates[0];
  match.controlledPlayerIndex = next.index;
  match.controlledPlayerName = next.player.name || "FC Stars";
  match.playerX = next.player.x;
  match.playerY = next.player.y;
  match.playerVX = next.player.vx || 0;
  match.playerVY = next.player.vy || 0;
  match.playerFacingX = Math.sin(next.player.facing);
  match.playerFacingY = Math.cos(next.player.facing);
  match.stamina = next.player.stamina;
  match.possessionId = match.possessionId || null;
  reportTitle.textContent = `${match.controlledPlayerName} selected`;
  reportText.textContent = "Control switched to the next outfield teammate.";
  updateMatchField();
}

function beginShotCharge() {
  if (!state.activeMatch || state.activeMatch.phase !== "play" || matchShootCharging) return;
  matchShootCharging = true;
  matchShootChargeStarted = performance.now();
  matchShootBtn.classList.add("is-charging");
  updateShotChargeMeter();
}

function updateShotChargeMeter() {
  if (!matchShootCharging) return;
  const power = currentShotPower();
  if (matchShotPowerFill) matchShotPowerFill.style.width = `${Math.round(power * 100)}%`;
  matchShootBtn.classList.toggle("is-overpowered", power > 0.9);
  matchShootChargeFrame = requestAnimationFrame(updateShotChargeMeter);
}

function currentShotPower() {
  return clamp(0.28 + (performance.now() - matchShootChargeStarted) / 1250, 0.28, 1);
}

function releaseShotCharge() {
  if (!matchShootCharging) return;
  const power = currentShotPower();
  matchShootCharging = false;
  if (matchShootChargeFrame) cancelAnimationFrame(matchShootChargeFrame);
  matchShootChargeFrame = null;
  matchShootBtn.classList.remove("is-charging", "is-overpowered");
  matchAction("shoot", power);
  window.setTimeout(() => {
    if (matchShotPowerFill && !matchShootCharging) matchShotPowerFill.style.width = "0%";
  }, 260);
}

function normalizeMatchState(match) {
  if (match.physicsVersion === 2) return;
  const cards = match.homeTeam?.length ? match.homeTeam : buildTeam();
  for (const team of ["home", "away"]) {
    const key = team + "Players";
    match[key] = formation.map((spot, index) => {
      const p = match[key]?.[index] || {};
      const y = team === "home" ? spot.y : 100 - spot.y;
      return { ...p, name: p.name || (team === "home" ? cards[index]?.name || "FC Stars " + (index + 1) : "Rival " + (index + 1)),
        x: Number.isFinite(p.x) ? p.x : spot.x, y: Number.isFinite(p.y) ? p.y : y,
        baseX: Number.isFinite(p.baseX) ? p.baseX : spot.x, baseY: Number.isFinite(p.baseY) ? p.baseY : y };
    });
    match[key].forEach((p, index) => {
      p.id = team + "-" + index; p.team = team; p.role = formation[index]?.slot || p.role;
      p.vx = Number.isFinite(p.vx) ? p.vx : 0; p.vy = Number.isFinite(p.vy) ? p.vy : 0;
      p.facing = team === "home" ? Math.PI : 0; p.stamina ??= 100; p.stride ??= 0;
    });
  }
  match.homeTeam = cards;
  match.controlledPlayerIndex = clamp(Number.isInteger(match.controlledPlayerIndex) ? match.controlledPlayerIndex : Math.max(1, cards.findIndex(p => p.controlled)), 1, 10);
  const controlled = match.homePlayers[match.controlledPlayerIndex];
  match.playerX = Number.isFinite(match.playerX) ? match.playerX : controlled.x;
  match.playerY = Number.isFinite(match.playerY) ? match.playerY : controlled.y;
  match.ballX = Number.isFinite(match.ballX) ? match.ballX : match.playerX;
  match.ballY = Number.isFinite(match.ballY) ? match.ballY : match.playerY - 2;
  match.controlledPlayerName = match.homePlayers[match.controlledPlayerIndex]?.name || "FC Stars";
  match.simulationTime ??= 0;
  match.displaySeconds ??= Math.max(0, ((match.minute || 1) - 1) * 60);
  match.playerFacingX = Number.isFinite(match.playerFacingX) ? match.playerFacingX : 0;
  match.playerFacingY = Number.isFinite(match.playerFacingY) ? match.playerFacingY : -1;
  match.goals ||= []; match.phase = "play"; match.physicsVersion = 2; match.events = []; match.eventSequence = 0;
  match.ballVX ||= 0; match.ballVY ||= 0; match.ballVZ ||= 0; match.ballHeight ||= 0;
}

function startMatchPhysics() {
  if (matchPhysicsFrame || !state.activeMatch || document.hidden) return;
  normalizeMatchState(state.activeMatch);
  matchPhysicsPreviousTime = performance.now();
  matchAccumulator = 0;
  matchPhysicsFrame = requestAnimationFrame(stepMatchPhysics);
}

function stopMatchPhysics() {
  if (matchPhysicsFrame) cancelAnimationFrame(matchPhysicsFrame);
  matchPhysicsFrame = null; matchPhysicsPreviousTime = 0; matchAccumulator = 0;
}

function advanceMatch(match, elapsed) {
  matchAccumulator += Math.min(0.25, Math.max(0, elapsed));
  const dt = FCMatchPhysics.pitch.step;
  while (matchAccumulator + 1e-9 >= dt) {
    match.previousBall = { x: match.ballX, y: match.ballY, h: match.ballHeight };
    for (const p of [...match.homePlayers, ...match.awayPlayers]) {
      p.previousX = p.x; p.previousY = p.y;
    }
    match.simulationTime += dt;
    if (match.phase === "restart") {
      if (match.simulationTime >= match.restart.until) takeQuickRestart(match);
    } else if (match.phase === "goal") {
      if (match.simulationTime >= match.matchPausedUntil) setupKickoff(match);
    } else {
      match.displaySeconds = Math.min(5400, match.displaySeconds + dt * 60);
      simulateControlledPlayer(match, dt);
      simulateMatchAI(match, dt);
      resolvePlayerActions(match);
      simulateMatchBall(match, dt);
    }
    matchAccumulator -= dt;
  }
  match.renderAlpha = clamp(matchAccumulator / dt, 0, 1);
}

function stepMatchPhysics(time) {
  matchPhysicsFrame = null;
  const match = state.activeMatch;
  if (!match || document.hidden) return;
  advanceMatch(match, (time - matchPhysicsPreviousTime) / 1000);
  matchPhysicsPreviousTime = time;
  match.minute = Math.floor(match.displaySeconds / 60);
  if (match.displaySeconds >= 5400 && match.phase === "play") { endMatch(); return; }
  updateMatchField();
  if (match.simulationTime - (match.lastSaveTime || 0) >= 5) {
    match.lastSaveTime = match.simulationTime; saveState();
  }
  matchPhysicsFrame = requestAnimationFrame(stepMatchPhysics);
}

function beginQuickRestart(match, event) {
  if (match.phase !== "play") return;
  match.phase = "restart";
  match.restart = { ...event, until: match.simulationTime + 1 };
  match.possessionId = null;
  match.ballVX = match.ballVY = match.ballVZ = 0;
  match.announcement = event.type.toUpperCase().replace("-", " ");
  match.announcementUntil = match.restart.until;
}

function takeQuickRestart(match) {
  const restart = match.restart, players = match[restart.team + "Players"];
  const P = FCMatchPhysics;
  let bx = restart.x, bz = restart.z;
  if (restart.type === "goal-kick") { bx = 0; bz = restart.endSign * 12; }
  if (restart.type === "corner") { bx = Math.sign(bx || 1) * 8.7; bz = restart.endSign * 13.7; }
  const taker = restart.type === "goal-kick" ? players[0] : players.filter(p => p.role !== "GK")
    .sort((a, b) => Math.hypot(P.x(a.x) - bx, P.z(a.y) - bz) - Math.hypot(P.x(b.x) - bx, P.z(b.y) - bz))[0];
  taker.x = P.percentX(bx); taker.y = P.percentZ(bz);
  taker.previousX = taker.x; taker.previousY = taker.y; taker.vx = taker.vy = 0;
  if (taker.id === match.homePlayers[match.controlledPlayerIndex].id) {
    match.playerX = taker.x; match.playerY = taker.y; match.playerVX = match.playerVY = 0;
  }
  const target = players.filter(p => p.id !== taker.id && p.role !== "GK")
    .sort((a, b) => Math.hypot(P.x(a.x) - bx, P.z(a.y) - bz) - Math.hypot(P.x(b.x) - bx, P.z(b.y) - bz))[0];
  let dx = P.x(target.x) - bx, dz = P.z(target.y) - bz;
  if (restart.type === "corner") { dx = -bx; dz = restart.endSign * 10 - bz; }
  const length = Math.hypot(dx, dz) || 1;
  P.writeBall(match, { x: bx, z: bz, y: P.pitch.ballRadius, vx: 0, vz: 0, vy: 0, spin: 0 });
  const speed = restart.type === "corner" ? 8 : Math.sqrt(2 * P.pitch.rollingDeceleration * length) + 1.2;
  P.release(match, taker.id, taker.team, taker.name, dx / length * speed, dz / length * speed,
    restart.type === "corner" ? 4.5 : restart.type === "throw-in" ? 2.5 : 0.25);
  match.phase = "play"; match.restart = null;
  match.announcementUntil = 0;
}

function setupKickoff(match) {
  for (const p of [...match.homePlayers, ...match.awayPlayers]) {
    p.x = p.baseX; p.y = p.baseY; p.previousX = p.x; p.previousY = p.y; p.vx = p.vy = 0;
  }
  const team = match.celebratingTeam === "home" ? "away" : "home";
  const taker = match[team + "Players"][9];
  taker.x = 50; taker.y = team === "home" ? 52 : 48;
  const controlled = match.homePlayers[match.controlledPlayerIndex];
  match.playerX = controlled.x; match.playerY = controlled.y; match.playerVX = match.playerVY = 0;
  match.ballX = 50; match.ballY = 50; match.ballHeight = 0; match.ballVX = match.ballVY = match.ballVZ = 0;
  match.possessionId = taker.id; match.lastTouchTeam = team;
  match.phase = "play"; match.matchPausedUntil = null;
  match.announcement = "KICKOFF";
  match.announcementUntil = match.simulationTime + 1;
}

function steerMatchPlayer(player, dx, dz, speed, dt) {
  const P = FCMatchPhysics;
  const len = Math.hypot(dx, dz), amount = Math.min(1, len);
  dx = len > 0 ? dx / len : 0; dz = len > 0 ? dz / len : 0;
  let vx = (player.vx || 0) * 0.18, vz = (player.vy || 0) * 0.28;
  const currentSpeed = Math.hypot(vx, vz);
  const reversing = currentSpeed > 0.1 && (vx * dx + vz * dz) / currentSpeed < -0.3;
  const response = 1 - Math.exp(-(len === 0 ? 8 : reversing ? 5 : 6.5) * dt);
  vx += (dx * speed * amount - vx) * response; vz += (dz * speed * amount - vz) * response;
  if (Math.hypot(vx, vz) < 0.025 && len === 0) vx = vz = 0;
  const oldX = P.x(player.x), oldZ = P.z(player.y);
  const nextX = clamp(oldX + vx * dt, -8.5, 8.5), nextZ = clamp(oldZ + vz * dt, -13.35, 13.35);
  if (nextX === -8.5 || nextX === 8.5) vx = 0;
  if (nextZ === -13.35 || nextZ === 13.35) vz = 0;
  player.x = P.percentX(nextX); player.y = P.percentZ(nextZ); player.vx = vx / 0.18; player.vy = vz / 0.28;
  player.speed = Math.hypot(vx, vz);
  player.facing ??= player.team === "home" ? Math.PI : 0;
  if (player.speed > 0.15) {
    const target = Math.atan2(vx, vz);
    const delta = Math.atan2(Math.sin(target - player.facing), Math.cos(target - player.facing));
    player.facing += delta * (1 - Math.exp(-(speed > 4 ? 8 : 12) * dt));
  }
  const travelled = Math.hypot(nextX - oldX, nextZ - oldZ);
  player.travelled = (player.travelled || 0) + travelled;
  player.stride = (player.stride || 0) + travelled * Math.PI * 2 / 1.05;
}

function simulateControlledPlayer(match, dt) {
  const p = match.homePlayers[match.controlledPlayerIndex];
  if (!p) return;
  p.x = match.playerX; p.y = match.playerY; p.vx = match.playerVX || 0; p.vy = match.playerVY || 0;
  const input = matchMovementInput();
  p.stamina = Number.isFinite(p.stamina) ? p.stamina : match.stamina ?? 100;
  if (p.stamina <= 1) p.exhausted = true;
  if (p.stamina > 20) p.exhausted = false;
  p.sprinting = Boolean(match.sprinting && Math.hypot(input.x, input.y) > 0.2 && !p.exhausted);
  let speed = p.sprinting ? 5.3 : 3.2;
  if (p.action && match.simulationTime < p.action.until) speed *= p.action.kind === "tackle" ? 0.45 : 0.72;
  steerMatchPlayer(p, input.x, input.y, speed, dt);
  p.stamina = clamp(p.stamina + (p.sprinting ? -10 : 6) * dt, 0, 100);
  match.playerX = p.x; match.playerY = p.y; match.playerVX = p.vx; match.playerVY = p.vy;
  match.playerFacingX = Math.sin(p.facing); match.playerFacingY = Math.cos(p.facing);
  match.playerSpeed = p.speed; match.stamina = p.stamina;
  applyControlledDribbleTouch(match, dt, p.sprinting);
}

function simulateMatchAI(match, dt) {
  const P = FCMatchPhysics, all = [...match.homePlayers, ...match.awayPlayers], b = P.readBall(match);
  let owner = all.find(p => p.id === match.possessionId);
  if (owner && (P.distance(owner.x, owner.y, match.ballX, match.ballY) > 1.35 || b.y > 1)) owner = null;
  match.possessionId = owner?.id || null;
  if (match.simulationTime >= (match.nextTacticalUpdate || 0)) {
    match.nextTacticalUpdate = match.simulationTime + 0.15;
    for (const team of ["home", "away"]) assignTacticalTargets(match, team, owner);
  }
  for (const p of all) {
    if (p.id === match.homePlayers[match.controlledPlayerIndex].id) continue;
    if (p.role === "GK") { moveGoalkeeper(match, p, p.team, dt); continue; }
    const target = p.target || { x: P.x(p.baseX), z: P.z(p.baseY) };
    const dx = target.x - P.x(p.x), dz = target.z - P.z(p.y), distance = Math.hypot(dx, dz);
    const speed = Math.min(p.task === "press" || p.task === "receive" ? 3.45 : 2.65, distance * 2.5);
    steerMatchPlayer(p, distance > 0.03 ? dx / distance : 0, distance > 0.03 ? dz / distance : 0, speed, dt);
    dribbleMatchPlayer(match, p, dt);
    if (match.possessionId === p.id && match.simulationTime >= (p.nextDecision || 0)) {
      p.nextDecision = match.simulationTime + 0.45;
      const dir = p.team === "home" ? -1 : 1;
      const opponents = match[p.team === "home" ? "awayPlayers" : "homePlayers"];
      const pressure = Math.min(...opponents.map(q => P.distance(q.x, q.y, p.x, p.y)));
      if (P.z(p.y) * dir > 5.5 && Math.abs(P.x(p.x)) < 5) queuePlayerAction(match, p, "shoot", 0.55);
      else if (pressure < 1.8 || match.simulationTime - (p.carrySince || 0) > 1.8) {
        queuePlayerAction(match, p, "pass", 0.42, { x: Math.sin(p.facing) * 0.4, z: dir });
        p.carrySince = match.simulationTime;
      }
    }
  }
  // Light separation without teleporting players or collapsing the team's shape.
  for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
    const a = all[i], c = all[j], dx = P.x(a.x) - P.x(c.x), dz = P.z(a.y) - P.z(c.y), distance = Math.hypot(dx, dz);
    if (distance >= 0.58 || distance < 0.001) continue;
    const push = Math.min(0.035, (0.58 - distance) * 0.25);
    a.x += dx / distance * push / 0.18; a.y += dz / distance * push / 0.28;
    c.x -= dx / distance * push / 0.18; c.y -= dz / distance * push / 0.28;
  }
  const controlled = match.homePlayers[match.controlledPlayerIndex];
  match.playerX = controlled.x; match.playerY = controlled.y;
}

function assignTacticalTargets(match, team, owner) {
  const P = FCMatchPhysics, players = match[team + "Players"], opponents = match[team === "home" ? "awayPlayers" : "homePlayers"];
  const b = P.readBall(match), dir = team === "home" ? -1 : 1;
  const candidates = players.filter(p => p.role !== "GK" && p.id !== match.homePlayers[match.controlledPlayerIndex].id);
  candidates.sort((a, c) => P.distance(a.x,a.y,match.ballX,match.ballY) - P.distance(c.x,c.y,match.ballX,match.ballY));
  const key = team + "PressId", current = players.find(p => p.id === match[key]);
  if (!current || !candidates.includes(current) || candidates[0] && P.distance(current.x,current.y,match.ballX,match.ballY) > P.distance(candidates[0].x,candidates[0].y,match.ballX,match.ballY) + 1.1) match[key] = candidates[0]?.id;
  const marked = new Set();
  const possession = owner?.team === team;
  for (const p of players) {
    if (p.role === "GK") continue;
    let tx = P.x(p.baseX), tz = P.z(p.baseY) + b.z * 0.22;
    p.markId = null; p.task = "shape";
    if (owner?.id === p.id) {
      tx = clamp(P.x(p.x) * 0.8, -7, 7); tz = P.z(p.y) + dir * 3; p.task = "carry";
    } else if (p.id === match[key] && (!owner || !possession)) {
      tx = b.x + clamp(b.vx * 0.28, -1.8, 1.8); tz = b.z + clamp(b.vz * 0.28, -2.2, 2.2); p.task = "press";
    } else if (p.id === match.intendedReceiverId && !owner) {
      tx = b.x + b.vx * 0.45; tz = b.z + b.vz * 0.45; p.task = "receive";
    } else if (possession) {
      if (["ST","LW","RW"].includes(p.role)) {
        tz = clamp(Math.min(dir * P.z(p.baseY) + 3, dir * b.z + 4) * dir, -12.2, 12.2);
        tx += Math.sign(tx) * 0.5; p.task = "run";
      } else if (["CM","LM","RM"].includes(p.role)) {
        tx = tx * 0.65 + b.x * 0.35; tz = b.z - dir * (p.id.endsWith("5") ? 2 : 3.5); p.task = "support";
      }
    } else if (owner && ["CB","CM"].includes(p.role)) {
      const mark = opponents.filter(q => q.role !== "GK" && q.id !== owner.id && !marked.has(q.id))
        .sort((a,c) => P.distance(a.x,a.y,p.baseX,p.baseY)-P.distance(c.x,c.y,p.baseX,p.baseY))[0];
      if (mark) {
        marked.add(mark.id); p.markId = mark.id; p.task = "mark";
        tx = P.x(mark.x) * 0.6 + tx * 0.4; tz = P.z(mark.y) - dir * 0.85;
      }
    }
    p.target = { x: clamp(tx,-8,8), z: clamp(tz,-12.8,12.8) };
  }
}

function moveGoalkeeper(match, keeper, team, dt) {
  const P = FCMatchPhysics, b = P.readBall(match), dir = team === "home" ? 1 : -1;
  const goalZ = dir * 13.2, approaching = b.vz * dir > 2 && b.z * dir > 4;
  const flight = approaching ? (goalZ - b.z) / b.vz : Infinity;
  const predictedX = b.x + b.vx * clamp(flight, 0, 1.4);
  if (approaching && !keeper.threatAt) keeper.threatAt = match.simulationTime;
  if (!approaching) keeper.threatAt = null;
  const reaction = 0.18 - clamp((match.opponentMultiplier || 1) - 1, 0, 1.2) * 0.035;
  const ready = keeper.threatAt != null && match.simulationTime - keeper.threatAt >= reaction;
  const loose = !match.possessionId && Math.hypot(b.vx,b.vz) < 3 && b.y < 0.65;
  const rush = loose && b.z * dir > 9 && Math.abs(b.x) < 4;
  let tx = clamp(b.x * 0.38, -2.2, 2.2), tz = dir * (12.7 - clamp((14 - b.z * dir) * 0.04, 0, 0.7));
  if (rush) { tx = b.x; tz = b.z; }
  if (ready && flight > 0 && flight < 0.65 && Math.abs(predictedX) < 4 && match.simulationTime >= (keeper.recoverUntil || 0)) {
    const dx = predictedX - P.x(keeper.x);
    keeper.dive = { start: match.simulationTime, until: match.simulationTime + 0.65,
      direction: Math.sign(dx) || 1, height: clamp(b.y + b.vy * flight - 4.905 * flight * flight, 0.35, 2.3) };
    keeper.recoverUntil = match.simulationTime + 1.0;
  }
  const diving = keeper.dive && match.simulationTime < keeper.dive.until;
  if (diving) tx = P.x(keeper.x) + keeper.dive.direction * 1.5;
  const dx = tx - P.x(keeper.x), dz = tz - P.z(keeper.y), len = Math.hypot(dx,dz);
  steerMatchPlayer(keeper, len > 0.01 ? dx/len : 0, len > 0.01 ? dz/len : 0, Math.min(diving ? 4 : rush ? 3.6 : 2.5, len * 4), dt);
  keeper.facing = team === "home" ? Math.PI : 0;
  keeper.ready = ready;
}

function matchMovementInput() {
  const keyboardX = (matchMovementKeys.has("arrowright") || matchMovementKeys.has("d") ? 1 : 0)
    - (matchMovementKeys.has("arrowleft") || matchMovementKeys.has("a") ? 1 : 0);
  const keyboardY = (matchMovementKeys.has("arrowdown") || matchMovementKeys.has("s") ? 1 : 0)
    - (matchMovementKeys.has("arrowup") || matchMovementKeys.has("w") ? 1 : 0);
  const x = keyboardX || joystickVector.x;
  const y = keyboardY || joystickVector.y;
  const magnitude = Math.hypot(x, y);
  return magnitude > 1 ? { x: x / magnitude, y: y / magnitude } : { x, y };
}

function dribbleMatchPlayer(match, p, dt, sprinting = false) {
  const P = FCMatchPhysics, b = P.readBall(match);
  if (P.protectedRelease(match, p.id) || b.y > 0.7 || p.action && match.simulationTime < p.action.until) return;
  const dx = b.x - P.x(p.x), dz = b.z - P.z(p.y), distance = Math.hypot(dx, dz);
  const ballSpeed = Math.hypot(b.vx, b.vz);
  if (distance > 0.85 || ballSpeed > 6.3) {
    if (match.possessionId === p.id && distance > 1.3) match.possessionId = null;
    return;
  }
  const fx = Math.sin(p.facing), fz = Math.cos(p.facing);
  if (distance > 0.5 && dx * fx + dz * fz < -0.12) return;
  if ((p.speed || 0) < 0.2) {
    if (ballSpeed < 1.6) match.possessionId = p.id;
    return;
  }
  if ((p.travelled || 0) < (p.nextTouchTravel || 0)) return;
  const alignment = distance > 0.001 ? clamp((dx * fx + dz * fz) / distance, 0, 1) : 1;
  const touchSpeed = (p.speed || 0) + (sprinting ? 1.1 : 0.8);
  b.vx = fx * touchSpeed * (0.7 + 0.3 * alignment); b.vz = fz * touchSpeed * (0.7 + 0.3 * alignment);
  b.vy = 0; b.spin = 0;
  P.writeBall(match, b);
  p.nextTouchTravel = (p.travelled || 0) + (sprinting ? 1.15 : 0.55); p.touchAt = match.simulationTime;
  match.lastTouchTeam = p.team; match.lastTouchPlayer = p.name; match.lastTouchPlayerId = p.id; match.possessionId = p.id;
  match.releasePlayerId = p.id; match.releaseUntil = match.simulationTime + 0.1;
}

function applyControlledDribbleTouch(match, dt, sprinting) {
  const p = match.homePlayers?.[match.controlledPlayerIndex];
  if (p) dribbleMatchPlayer(match, p, dt, sprinting);
}

function simulateMatchBall(match, dt) {
  if (updateKeeperPossession(match, dt)) return;
  const result = FCMatchPhysics.step(match, dt, [...(match.homePlayers || []), ...(match.awayPlayers || [])]);
  if (result.boundary) {
    if (result.boundary.type === "goal") scorePhysicalGoal(match, result.boundary.team);
    else beginQuickRestart(match, result.boundary);
    return;
  }
  if (result.contact?.type === "post" || result.contact?.type === "bar") emitMatchEvent(match, result.contact.type);
  resolveGoalkeeperSave(match, "away");
  resolveGoalkeeperSave(match, "home");
  if (match.keeperHold) return;

}

function updateKeeperPossession(match, dt) {
  if (!match.keeperHold) return false;
  const keeper = match[match.keeperHold.team + "Players"][0];
  const P = FCMatchPhysics, team = keeper.team;
  match.keeperHold.time -= dt;
  P.writeBall(match, { x: P.x(keeper.x), z: P.z(keeper.y) + (team === "home" ? -0.3 : 0.3),
    y: 0.85, vx: 0, vz: 0, vy: 0, spin: 0 });
  if (match.keeperHold.time > 0) return true;
  const target = passTarget(match, keeper, { x: 0, z: team === "home" ? -1 : 1 });
  const b = P.readBall(match), dx = target.x-b.x, dz = target.z-b.z, distance = Math.hypot(dx,dz)||1;
  const speed = Math.sqrt(2 * P.pitch.rollingDeceleration * distance + 4);
  P.release(match, keeper.id, team, keeper.name, dx / distance * speed, dz / distance * speed, 0.4);
  match.releaseUntil = match.simulationTime + 0.65;
  match.keeperHold = null;
  emitMatchEvent(match, "kick", keeper, { power: 0.4 });
  return false;
}

function resolveGoalkeeperSave(match, team) {
  const P = FCMatchPhysics, keeper = match[team + "Players"]?.[0], b = P.readBall(match);
  if (!keeper || match.keeperHold || P.protectedRelease(match, keeper.id)) return;
  const speed = Math.hypot(b.vx,b.vz), dir = team === "home" ? 1 : -1;
  const coming = b.vz * dir > 1;
  if (speed > 4 && (!keeper.ready || !coming)) return;
  const diving = keeper.dive && match.simulationTime < keeper.dive.until;
  const progress = diving ? clamp((match.simulationTime - keeper.dive.start) / 0.28,0,1) : 0;
  const handX = P.x(keeper.x) + (diving ? keeper.dive.direction * 0.45 * progress : 0);
  const handZ = P.z(keeper.y) - dir * 0.23;
  const handY = diving ? 0.65 + (keeper.dive.height - 0.65) * progress : clamp(b.y,0.25,1.1);
  const previous = match.previousBall;
  const oldX = previous ? P.x(previous.x) : b.x, oldZ = previous ? P.z(previous.y) : b.z;
  const t = P.sweep(oldX,oldZ,b.x,b.z,handX,handZ,diving ? 0.58 : 0.55);
  if (t === null || Math.abs(b.y-handY) > (diving ? 0.5 : 0.55)) return;
  if (speed < 7 && b.y < 1.35 && !diving) {
    match.keeperHold = { team, time: 0.8 }; match.possessionId = keeper.id;
    match.lastTouchPlayerId = keeper.id; match.lastTouchPlayer = keeper.name; match.lastTouchTeam = team;
    match.pendingShooter = null;
    emitMatchEvent(match,"catch",keeper);
  } else {
    const side = Math.sign(b.x-P.x(keeper.x)) || (keeper.dive?.direction || 1);
    P.release(match,keeper.id,team,keeper.name,side*Math.max(3,Math.abs(b.vx)*0.6),-dir*Math.max(3,Math.abs(b.vz)*0.45),1.7);
    match.releaseUntil = match.simulationTime + 0.65;
    emitMatchEvent(match,"save",keeper);
  }
}

function scorePhysicalGoal(match, scoringTeam) {
  if (match.phase !== "play") return;
  match.phase = "goal";
  const scorer = [...match.homePlayers,...match.awayPlayers].find(p => p.id === match.lastTouchPlayerId);
  const ownGoal = scorer && scorer.team !== scoringTeam;
  const scorerName = match.pendingShooter || scorer?.name || match.lastTouchPlayer || (scoringTeam === "home" ? "FC Stars" : match.awayLeader);
  match[scoringTeam] += 1;
  const goalNumber = scoringTeam === "home" && !ownGoal ? addGoalForPlayer(scorerName) : 1;
  match.goals = [{scorer:scorerName,minute:Math.floor(match.displaySeconds/60),goalNumber,celebration:ownGoal?"Own goal":"Goal",team:scoringTeam},...match.goals].slice(0,12);
  match.celebratingTeam = scoringTeam; match.goalEventId = (match.goalEventId || 0) + 1;
  match.matchPausedUntil = match.simulationTime + 1.8;
  for (const p of [...match.homePlayers,...match.awayPlayers]) {
    p.vx = p.vy = p.speed = 0;
    if (p.team === scoringTeam && (p.id === scorer?.id || FCMatchPhysics.distance(p.x,p.y,match.ballX,match.ballY)<7))
      p.action = {kind:"celebrate",start:match.simulationTime,until:match.matchPausedUntil};
    else p.action = null;
  }
  match.playerVX = match.playerVY = 0; match.ballVX = match.ballVY = match.ballVZ = 0; match.possessionId = null;
  match.pendingShooter = null; cancelShotCharge();
  emitMatchEvent(match,"goal",scorer,{team:scoringTeam,ballX:match.ballX,ballY:match.ballY});
  matchScoreLabel.textContent = match.home + " - " + match.away;
  reportTitle.textContent = scorerName + (ownGoal ? " · own goal" : " scores");
  reportText.textContent = "FC Stars " + match.home + " – " + match.away + " " + match.awayLeader;
  saveState(); renderGoalFeed();
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function cleanText(value, maximum = 120) {
  return String(value ?? "").replace(/[\u0000-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim().slice(0, maximum);
}

function escapeHtml(value) {
  return cleanText(value, 240).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function isUsernameTaken(username, ignoredAccountId = null) {
  const key = cleanText(username, 24).toLocaleLowerCase();
  return accounts.some((account) => account.id !== ignoredAccountId && cleanText(account.username, 24).toLocaleLowerCase() === key);
}

function cancelShotCharge() {
  matchShootCharging = false;
  if (matchShootChargeFrame) cancelAnimationFrame(matchShootChargeFrame);
  matchShootChargeFrame = null;
  matchShootBtn.classList.remove("is-charging", "is-overpowered");
  if (matchShotPowerFill) matchShotPowerFill.style.width = "0%";
}

function stopMatchMovement() {
  cancelShotCharge();
  if (state.activeMatch) state.activeMatch.sprinting = false;
  activeJoystickPointer = null;
  matchMovementKeys.clear();
  joystickVector = { x: 0, y: 0 };
  if (matchShootCharging) {
    matchShootCharging = false;
    if (matchShootChargeFrame) cancelAnimationFrame(matchShootChargeFrame);
    matchShootChargeFrame = null;
  }
  if (matchShotPowerFill) matchShotPowerFill.style.width = "0%";
  if (matchJoystickKnob) matchJoystickKnob.style.transform = "translate(-50%, -50%)";
}

function updateJoystick(event) {
  const rect = matchJoystick.getBoundingClientRect();
  const max = Math.max(1, rect.width / 2 - 18);
  const x = event.clientX - (rect.left + rect.width / 2);
  const y = event.clientY - (rect.top + rect.height / 2);
  const distance = Math.min(max, Math.hypot(x, y));
  const angle = Math.atan2(y, x);
  const knobX = Math.cos(angle) * distance;
  const knobY = Math.sin(angle) * distance;
  matchJoystickKnob.style.transform = `translate(calc(-50% + ${knobX}px), calc(-50% + ${knobY}px))`;
  joystickVector = { x: knobX / max, y: knobY / max };
}

function chooseScorer() {
  const team = buildTeam().filter((player) => player.name && player.slot !== "GK");
  if (state.selectedStar && Math.random() < 0.28) return state.selectedStar;
  return team[Math.floor(Math.random() * team.length)] || state.selectedStar || cardPool[0];
}

function teamLeaderName() {
  return state.selectedStar?.name || activeAccount()?.username || "FC Stars";
}

function addGoalForPlayer(name) {
  const current = state.playerStats[name]?.goals || 0;
  state.playerStats[name] = {
    ...(state.playerStats[name] || {}),
    goals: current + 1
  };
  return state.playerStats[name].goals;
}

function xpForNextLevel(level = state.level) {
  return 500 + (Math.max(1, level) - 1) * 250;
}

function hasInfiniteLevel() {
  return Boolean(state.infiniteLevel);
}

function levelDisplay(level = state.level, infiniteLevel = state.infiniteLevel) {
  return infiniteLevel ? "∞" : level;
}

function addXp(amount) {
  if (hasInfiniteLevel()) {
    return { leveledUpTo: [], rewardMessages: ["Already at infinite level."] };
  }
  state.xp = Math.max(0, (state.xp || 0) + amount);
  const leveledUpTo = [];
  const rewardMessages = [];

  while (state.xp >= xpForNextLevel(state.level)) {
    state.xp -= xpForNextLevel(state.level);
    state.level += 1;
    leveledUpTo.push(state.level);
    rewardMessages.push(...claimLevelRewards(state.level));
  }

  return { leveledUpTo, rewardMessages };
}

function claimLevelRewards(level) {
  const reward = levelRewards[level];
  if (!reward || state.claimedLevelRewards.includes(String(level))) return [];

  state.claimedLevelRewards = uniqueNames([...state.claimedLevelRewards, String(level)]);
  if (reward.type === "xp") {
    state.xp += reward.xp;
    return [reward.message];
  }

  if (reward.type === "adminXp") {
    state.adminXp = reward.xp;
    state.xp = Number.MAX_SAFE_INTEGER;
    state.level = Math.max(Number(reward.level) || 50, state.level || 1);
    rewardMessages.push(`${reward.message} +${reward.xp} XP.`);
  }
  if (reward.type === "card") {
    const card = guaranteedCardForRarity(reward.rarity);
    if (!card) return [`${reward.message} Already owned every ${reward.rarity} card.`];
    state.inventory = addCardToInventory(state.inventory, card);
    return [`${reward.message} ${card.name} added to inventory.`];
  }
  if (reward.type === "badge") {
    state.badges = uniqueNames([...state.badges, reward.badge || reward.message]);
  }
  return [reward.message];
}

function syncEarnedLevelRewards() {
  if (hasInfiniteLevel()) return [];
  return Object.keys(levelRewards)
    .map(Number)
    .filter((level) => state.level >= level)
    .sort((a, b) => a - b)
    .flatMap((level) => claimLevelRewards(level));
}

function guaranteedCardForRarity(rarity) {
  const card = cardPool
    .filter((item) => item.rarity === rarity && !item.specialAccess && !ownedPlayerNames().has(item.name))
    .sort((a, b) => ratingSortValue(b) - ratingSortValue(a) || a.name.localeCompare(b.name))[0];
  return card ? { ...card, id: `reward-${rarity.toLowerCase()}-${Date.now()}-${Math.random().toString(16).slice(2)}` } : null;
}

function celebrationFor(player) {
  if (player.name.includes("Ronaldo")) return "Siuu";
  if (player.name.includes("Messi")) return "Ankara Messi";
  if (player.rarity === "Icon") return "Icon moment";
  if (player.rarity === "Legend" || player.rarity === "G.O.A.T") return "Legend celebration";
  return "Team celebration";
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderPitch() {
  document.querySelectorAll(".player-dot").forEach((node) => node.remove());

  buildTeam().forEach((player) => {
    pitch.appendChild(playerNode(player));
  });
}

function playerNode(player) {
  const node = document.createElement("div");
  const rarity = player.rarity || "Silver";
  const isGoat = rarityClass(rarity) === "goat" || player.specialAccess || player.rating === "∞";
  node.className = `player-dot rarity-${rarityClass(rarity)} ${isGoat ? "pitch-goat-card" : ""} ${player.controlled ? "controlled" : ""} ${state.replaceSlot === player.id ? "selected-slot" : ""}`;
  node.style.left = `${player.x}%`;
  node.style.top = `${player.y}%`;
  node.innerHTML = `
    <span class="pitch-player-head">
      <span>${escapeHtml(shortName(player.name))}</span>
      <strong>${escapeHtml(jerseyNumber(player))}</strong>
    </span>
    <span class="pitch-card-rating">
      <strong>${ratingLabel(player)}</strong>
      <span>${escapeHtml(player.slot)}</span>
    </span>
    <span class="tag">${player.controlled ? `YOU${isGoat ? " · G.O.A.T" : ""}` : rarity}</span>
  `;
  node.addEventListener("click", () => selectReplaceSlot(player));
  return node;
}

function jerseyNumber(player) {
  const numbers = {
    "Cristiano Ronaldo": 7,
    IshowSpeed: 7,
    "Lionel Messi": 10,
    Neymar: 10,
    "Neymar Jr": 10,
    Mbappu: 99,
    "Kylian Mbappe": 9,
    "Lamine Yamal": 19,
    Pele: 10,
    "Diego Maradona": 10,
    Xavi: 6,
    Ronaldinho: 10,
    "Zlatan Ibrahimović": 11,
    "Roy Keane": 16,
    "Gennaro Gattuso": 8,
    Pepe: 3,
    "Sergio Ramos": 4,
    "Jaap Stam": 6,
    "Manuel Neuer": 1,
    "Ronaldo Nazario": 9,
    "David Beckham": 7,
    "Luka Modric": 10,
    "Mohamed Salah": 11,
    "Son Heung-min": 7
  };
  if (numbers[player.name]) return numbers[player.name];
  if (player.slot === "GK") return 1;
  if (player.slot === "CB") return Math.max(2, Math.min(6, Number(player.rating) - 82 || 4));
  if (player.slot === "CM" || player.slot === "CDM") return Math.max(6, Math.min(8, Number(player.rating) - 80 || 8));
  if (player.slot === "LW" || player.slot === "RW" || player.slot === "RM" || player.slot === "LM") return 11;
  return 9;
}

function selectReplaceSlot(player) {
  state.replaceSlot = player.id;
  reportTitle.textContent = `${player.slot} selected`;
  reportText.textContent = state.currentCard
    ? `Press Replace Slot to put ${state.currentCard.name} at ${player.slot}, or choose a saved card from inventory.`
    : `Choose a saved ${player.slot} card from inventory to replace ${player.name}.`;
  saveState();
  render();
}

function shortName(name) {
  name = cleanText(name, 48) || "Player";
  if (name === "Cristiano Ronaldo") return "Cristiano...";
  if (name.length <= 13) return name;
  const parts = name.split(" ");
  return parts.length > 1 ? parts[parts.length - 1] : `${name.slice(0, 12)}.`;
}

function spinCard() {
  const card = weightedCard();
  if (!card) {
    saveState();
    render();
    return;
  }
  state.currentCard = { ...card, id: `${Date.now()}-${Math.random().toString(16).slice(2)}` };
  state.inventory = addCardToInventory(state.inventory, state.currentCard);
  state.currentCardSaved = true;
  reportTitle.textContent = `${card.name} rolled`;
  reportText.textContent = `${card.rarity} ${card.position}. ${chanceLabel(card)}. Added to your inventory — owned players cannot be rolled again.`;
  saveState();
  render();
}

function weightedCard() {
  const availableExactPlayers = Object.fromEntries(
    Object.entries(exactChancePlayers).filter(([name]) => !ownedPlayerNames().has(name))
  );
  const availableNormalPool = normalRollPool.filter((card) => !ownedPlayerNames().has(card.name));

  if (!Object.keys(availableExactPlayers).length && !availableNormalPool.length) {
    reportTitle.textContent = "Full collection";
    reportText.textContent = "You have rolled every player in this pool. Add more players to keep spinning new cards.";
    return null;
  }

  const exactRoll = Math.random() * 100;
  let exactFloor = 0;
  for (const [name, chance] of Object.entries(availableExactPlayers)) {
    exactFloor += chance;
    if (exactRoll < exactFloor) {
      return cardPool.find((card) => card.name === name);
    }
  }

  const availableTotalChance = availableNormalPool.reduce((sum, card) => sum + card.chance, 0);
  let roll = Math.random() * availableTotalChance;
  for (const card of availableNormalPool) {
    roll -= card.chance;
    if (roll <= 0) return card;
  }
  return availableNormalPool[availableNormalPool.length - 1];
}

function ownedPlayerNames() {
  return new Set([
    ...state.inventory.map((card) => card.name),
    ...Object.values(state.teamCards).map((card) => card.name),
    state.selectedStar?.name,
    state.currentCard?.name
  ].filter(Boolean));
}

function saveCurrentCard() {
  if (!state.currentCard || state.currentCardSaved) return;
  state.inventory = addCardToInventory(state.inventory, state.currentCard);
  state.currentCardSaved = true;
  reportTitle.textContent = "Card saved";
  reportText.textContent = `${state.currentCard.name} stayed as your latest rolled card and was added to inventory.`;
  saveState();
  render();
}

function becomeCurrentCard() {
  if (!state.currentCard) return;
  state.inventory = addCardToInventory(state.inventory, state.currentCard);
  state.currentCardSaved = true;
  state.selectedStar = state.currentCard;
  state.selectedStarSlot = bestSlotIdForPosition(state.currentCard.position);
  dedupeTeamCards();
  state.replaceSlot = null;
  reportTitle.textContent = `You became ${state.currentCard.name}`;
  reportText.textContent = `${state.currentCard.name} is now the player you control.`;
  saveState();
  render();
}

function replaceSelectedSlotWithCurrentCard() {
  if (!state.currentCard) {
    reportTitle.textContent = "No rolled card";
    reportText.textContent = "Spin a player first, then choose who it replaces.";
    return;
  }

  if (!state.replaceSlot) {
    reportTitle.textContent = "Pick a pitch player";
    reportText.textContent = "Click a card player on the ground, then press Replace.";
    return;
  }

  if (isControlledSlot(state.replaceSlot)) {
    if (state.selectedStar) {
      state.inventory = addCardToInventory(state.inventory, state.selectedStar);
    }
    state.inventory = addCardToInventory(state.inventory, state.currentCard);
    state.currentCardSaved = true;
    state.selectedStar = state.currentCard;
    state.selectedStarSlot = state.replaceSlot;
    dedupeTeamCards();
    state.replaceSlot = null;
    reportTitle.textContent = `You became ${state.currentCard.name}`;
    reportText.textContent = `${state.currentCard.name} replaced your controlled player.`;
    saveState();
    render();
    return;
  }

  if (state.selectedStar?.name === state.currentCard.name && !isControlledSlot(state.replaceSlot)) {
    state.replaceSlot = null;
    reportTitle.textContent = `${state.currentCard.name} already in your XI`;
    reportText.textContent = `${state.currentCard.name} is already your controlled player, so it cannot be placed twice.`;
    saveState();
    render();
    return;
  }

  const placed = placeCardOnTeam(state.currentCard, state.replaceSlot);
  state.inventory = addCardToInventory(state.inventory, state.currentCard);
  state.currentCardSaved = true;
  state.replaceSlot = null;
  reportTitle.textContent = `${state.currentCard.name} joined your XI`;
  reportText.textContent = `${state.currentCard.name} replaced the player at ${placed.targetSlot}.`;
  saveState();
  render();
}

function cancelCurrentCard() {
  if (!state.currentCard) return;
  const cancelledName = state.currentCard.name;
  state.currentCard = null;
  state.currentCardSaved = false;
  state.replaceSlot = null;
  reportTitle.textContent = "Card cancelled";
  reportText.textContent = `${cancelledName} was removed from the latest card slot.`;
  saveState();
  render();
}

function addCardToInventory(cards, card) {
  if (cards.some((item) => item.name === card.name)) return cards;
  return [card, ...cards];
}

function redeemCode() {
  if (!activeAccount()) {
    showQuickLogin();
    return;
  }

  openGamePrompt({
    title: "Redeem Code",
    label: "Enter code",
    submitLabel: "Redeem",
    onSubmit: finishRedeemCode
  });
}

function finishRedeemCode(code) {
  const trimmedCode = code?.trim().toUpperCase();
  if (!trimmedCode) return;
  const reward = redeemableCodes[trimmedCode];
  const redeemedCodeKey = reward?.daily ? `${trimmedCode}-${localDateKey()}` : trimmedCode;

  if (!reward) {
    if (activeAccount()?.isDev) {
      state.adminXp = (BigInt(state.adminXp || "0") + 10000n).toString();
      state.xp = Math.min(Number.MAX_SAFE_INTEGER, (state.xp || 0) + 10000);
      state.redeemedCodes = uniqueNames([...state.redeemedCodes, redeemedCodeKey]);
      state.inventoryOpen = true;
      closeGamePrompt();
      showCodeResult("success", "Admin code accepted", "Any admin code works. +10000 XP added.");
      saveState();
      render();
      return;
    }
    closeGamePrompt();
    showCodeResult("invalid", "Code invalid", "That code did not unlock a player.");
    render();
    return;
  }

  if (isCodeExpired(reward)) {
    closeGamePrompt();
    showCodeResult("invalid", "Code expired", `${trimmedCode} is no longer active.`);
    render();
    return;
  }

  if (reward.ownerOnly && !activeAccount()?.isDev) {
    closeGamePrompt();
    showCodeResult("invalid", "Owner code only", `${trimmedCode} only works on the dev account.`);
    render();
    return;
  }

  if (state.redeemedCodes.includes(redeemedCodeKey) && reward.type !== "infiniteCoins") {
    closeGamePrompt();
    showCodeResult("invalid", "Code already used", reward.daily
      ? `${trimmedCode} was already used today.`
      : `${trimmedCode} was already used on this account.`);
    render();
    return;
  }

  const rewardMessages = [];
  if (reward.type === "player") {
    const playerCard = codeOnlyCards.find((card) => card.name === reward.player);
    if (!playerCard || ownedPlayerNames().has(playerCard.name)) {
      closeGamePrompt();
      showCodeResult("invalid", "Code already used", `${reward.player} is already in this account.`);
      render();
      return;
    }
    state.inventory = addCardToInventory(state.inventory, {
      ...playerCard,
      id: `code-${playerCard.name.toLowerCase()}-${Date.now()}`
    });
    rewardMessages.push(reward.message);
  }

  if (reward.type === "xp") {
    const result = addXp(reward.xp);
    rewardMessages.push(`${reward.message} +${reward.xp} XP.`);
    if (result.leveledUpTo.length) {
      rewardMessages.push(`Leveled up to Level ${result.leveledUpTo[result.leveledUpTo.length - 1]}.`);
    }
    rewardMessages.push(...result.rewardMessages);
  }

  if (reward.type === "level") {
    const targetLevel = Math.max(1, Number(reward.level) || 1);
    const previousLevel = state.level || 1;
    if (previousLevel >= targetLevel) {
      rewardMessages.push(`Already Level ${previousLevel}.`);
    } else {
      state.level = targetLevel;
      state.xp = 0;
      for (let level = previousLevel + 1; level <= targetLevel; level += 1) {
        rewardMessages.push(...claimLevelRewards(level));
      }
      rewardMessages.push(`${reward.message} Reached Level ${targetLevel}.`);
    }
  }

  if (reward.type === "infiniteLevel") {
    state.infiniteLevel = true;
    state.level = Math.max(state.level || 1, 999999);
    state.xp = 0;
    state.badges = uniqueNames([...state.badges, "Infinite Level"]);
    Object.keys(levelRewards)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach((level) => rewardMessages.push(...claimLevelRewards(level)));
    rewardMessages.push(reward.message);
  }

  if (reward.type === "infiniteCoins") {
    state.infiniteCoins = true;
    rewardMessages.push(reward.message);
  }

  state.redeemedCodes = uniqueNames([...state.redeemedCodes, redeemedCodeKey]);
  state.inventoryOpen = true;
  showCodeResult("success", "Code succeeded", rewardMessages.join(" "));
  closeGamePrompt();
  saveState();
  render();
}

function isCodeExpired(reward) {
  if (reward.expiresAt) return Date.now() > new Date(reward.expiresAt).getTime();
  if (!reward.expires) return false;
  const expiresAt = new Date(`${reward.expires}T23:59:59`);
  return Date.now() > expiresAt.getTime();
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function showCodeResult(type, title, text) {
  selectorReportCard.classList.remove("code-success", "code-invalid");
  selectorReportCard.classList.add(type === "success" ? "code-success" : "code-invalid");
  reportTitle.textContent = title;
  reportText.textContent = text;
}

function uniqueCards(cards) {
  const seen = new Set();
  return cards.filter((card) => {
    if (!card) return false;
    if (seen.has(card.name)) return false;
    seen.add(card.name);
    return true;
  });
}

function uniqueNames(names) {
  return [...new Set(names.filter(Boolean))];
}

function uniqueFriends(friends) {
  const byUsername = new Map();
  (friends || []).forEach((friend, index) => {
    const username = String(friend?.username || friend || "").trim().slice(0, 24);
    const key = username.toLowerCase();
    if (!username) return;
    const nextFriend = {
      id: friend?.id || `friend-${Date.now()}-${index}`,
      username,
      accountId: friend?.accountId || "",
      status: friend?.status === "pending" ? "pending" : "accepted"
    };
    const savedFriend = byUsername.get(key);
    if (!savedFriend) {
      byUsername.set(key, nextFriend);
      return;
    }
    savedFriend.id = savedFriend.id || nextFriend.id;
    savedFriend.accountId = savedFriend.accountId || nextFriend.accountId;
    if (nextFriend.status === "accepted") savedFriend.status = "accepted";
  });
  return [...byUsername.values()];
}

function friendRecord(account, status = "accepted") {
  return {
    id: `friend-${account.id}`,
    username: account.username,
    accountId: account.id,
    status
  };
}

function accountForFriend(friend) {
  return accounts.find((account) => account.id === friend.accountId)
    || accounts.find((account) => account.username.toLowerCase() === friend.username.toLowerCase());
}

function hasActiveClan(accountState) {
  return Boolean(
    accountState?.selectedStar
    || Object.keys(accountState?.teamCards || {}).length
  );
}

function friendCard(friend, senderAccount = null) {
  return {
    id: `friend-${friend.id}`,
    name: friend.username,
    position: "ST",
    team: "Friend XI",
    rating: Math.max(72, Math.min(99, 70 + Math.floor((state.level || 1) / 2))),
    rarity: "Friend",
    realPlayer: true,
    friendId: friend.id,
    accountId: friend.accountId || "",
    fromAccountId: senderAccount?.id || "",
    fromUsername: senderAccount?.username || ""
  };
}

function renderCurrentCard() {
  if (!state.currentCard) {
    currentCardName.textContent = "No card yet";
    currentCardMeta.textContent = "Spin at the top to roll your player.";
    topCurrentCardName.textContent = "No card yet";
    topCurrentCardMeta.textContent = "Spin to roll.";
    becomeCardBtn.disabled = true;
    replaceCardBtn.disabled = true;
    cancelCardBtn.disabled = true;
    saveCardBtn.textContent = "Save";
    saveCardBtn.disabled = true;
    return;
  }

  currentCardName.textContent = state.currentCard.name;
  currentCardMeta.textContent = `${state.currentCard.position} · ${state.currentCard.rarity} · ${state.currentCard.team} · ${chanceLabel(state.currentCard)}`;
  topCurrentCardName.textContent = state.currentCard.name;
  topCurrentCardMeta.textContent = `${state.currentCard.position} · ${state.currentCard.rarity} · ${chanceLabel(state.currentCard)}`;
  becomeCardBtn.disabled = false;
  replaceCardBtn.disabled = !state.replaceSlot;
  cancelCardBtn.disabled = false;
  saveCardBtn.textContent = state.currentCardSaved ? "Saved" : "Save";
  saveCardBtn.disabled = state.currentCardSaved;
}

function renderInventory() {
  layout.classList.toggle("inventory-hidden", !state.inventoryOpen);
  inventoryPanel.hidden = !state.inventoryOpen;
  inventoryToggleBtn.textContent = state.inventoryOpen ? "Hide Inventory" : "Inventory";
  inventoryCount.textContent = `${state.inventory.length} card${state.inventory.length === 1 ? "" : "s"}`;
  inventory.className = `inventory ${state.inventory.length ? "" : "empty-state"}`;
  const selectedSpot = formation.find((spot) => spot.id === state.replaceSlot);
  const searchTerm = inventorySearch.value.trim().toLowerCase();
  clearReplaceFilterBtn.hidden = !selectedSpot;
  replaceHint.textContent = selectedSpot
    ? `Replacing ${selectedSpot.slot}. Position freedom is on — any saved player can play here.`
    : "Roll a card, save it, then click any pitch position to place any player there.";

  if (!state.inventory.length) {
    inventory.textContent = "No saved cards yet. Roll a player, then press Save.";
    return;
  }

  inventory.innerHTML = "";
  const visibleCards = state.inventory
    .map(enrichCard)
    .filter(Boolean)
    .filter((card) => card.name.toLowerCase().includes(searchTerm))
    .slice()
    .sort((a, b) => {
      if (!selectedSpot) return compareCardsByRarity(a, b);
      const aMatchesSlot = selectedSpot && canPlaySlot(a, selectedSpot.slot);
      const bMatchesSlot = selectedSpot && canPlaySlot(b, selectedSpot.slot);
      if (aMatchesSlot !== bMatchesSlot) return aMatchesSlot ? -1 : 1;
      return compareCardsByRarity(a, b);
    });

  if (!visibleCards.length) {
    inventory.className = "inventory empty-state";
    inventory.textContent = searchTerm ? "No players found" : "No saved cards yet. Roll a player, then press Save.";
    return;
  }

  visibleCards.forEach((card) => {
    const item = document.createElement("div");
    item.className = `inventory-card rarity-${rarityClass(card.rarity)}`;
    const canPlaceAtSelectedSpot = selectedSpot && canPlaySlot(card, selectedSpot.slot);
    item.innerHTML = `
      <div class="card-rating">
        <strong>${ratingLabel(card)}</strong>
        <span>${escapeHtml(card.position)}</span>
      </div>
      <div class="card-image-wrap">
        <img class="card-photo" alt="${escapeHtml(card.name)}" loading="eager" decoding="async">
      </div>
      <div class="card-details">
        <strong>${escapeHtml(card.name)}</strong>
        <span>${escapeHtml(card.team)}</span>
        <small>${escapeHtml(card.rarity)}</small>
      </div>
      <div class="inventory-actions">
        <button data-become>Become</button>
        <button class="${canPlaceAtSelectedSpot ? "secondary" : "danger-btn"}" data-card data-action="${canPlaceAtSelectedSpot ? "place" : "delete"}">${canPlaceAtSelectedSpot ? `Put at ${escapeHtml(selectedSpot.slot)}` : "Delete"}</button>
      </div>
    `;
    item.querySelector("[data-card]").addEventListener("click", (event) => {
      if (event.currentTarget.dataset.action === "delete") {
        deleteInventoryCard(card.id);
        return;
      }
      useCard(card.id);
    });
    item.querySelector("[data-become]").addEventListener("click", () => becomeInventoryCard(card.id));
    inventory.appendChild(item);
    const cardImage = item.querySelector("img");
    cardImage.src = playerPhoto(card);
    loadPlayerPhoto(cardImage, card);
  });
}

function rarityClass(rarity) {
  return rarity.toLowerCase().replaceAll(".", "").replaceAll(" ", "-");
}

function deleteInventoryCard(id) {
  const card = state.inventory.find((item) => item.id === id);
  if (!card) return;

  state.inventory = state.inventory.filter((item) => item.id !== id);
  state.deletedCardNames = uniqueNames([...state.deletedCardNames, card.name]);
  Object.entries(state.teamCards).forEach(([slot, teamCard]) => {
    if (teamCard.name === card.name) delete state.teamCards[slot];
  });
  if (state.selectedStar?.name === card.name) {
    state.selectedStar = null;
    state.selectedStarSlot = null;
  }
  if (state.currentCard?.name === card.name) {
    state.currentCard = null;
    state.currentCardSaved = false;
  }
  state.replaceSlot = null;
  reportTitle.textContent = `${card.name} deleted`;
  reportText.textContent = `${card.name} was removed from your inventory.`;
  saveState();
  render();
}

function becomeInventoryCard(id) {
  const card = state.inventory.find((item) => item.id === id);
  if (!card) return;

  state.selectedStar = card;
  state.selectedStarSlot = bestSlotIdForPosition(card.position);
  state.currentCard = card;
  state.currentCardSaved = true;
  dedupeTeamCards();
  state.replaceSlot = null;
  reportTitle.textContent = `You became ${card.name}`;
  reportText.textContent = `${card.name} is now the player you control from inventory.`;
  saveState();
  render();
}

function useCard(id) {
  if (!state.replaceSlot) {
    reportTitle.textContent = "Pick a position first";
    reportText.textContent = "Click a player on the pitch, like LW Son, then choose a card from inventory.";
    return;
  }

  const cardIndex = state.inventory.findIndex((item) => item.id === id);
  const card = state.inventory[cardIndex];
  if (!card) return;

  if (state.selectedStar?.name === card.name && !isControlledSlot(state.replaceSlot)) {
    state.replaceSlot = null;
    reportTitle.textContent = `${card.name} already in your XI`;
    reportText.textContent = `${card.name} is already your controlled player, so it cannot be placed twice.`;
    saveState();
    render();
    return;
  }

  if (isControlledSlot(state.replaceSlot)) {
    if (state.selectedStar) {
      state.inventory = addCardToInventory(state.inventory, state.selectedStar);
    }
    state.selectedStar = card;
    state.selectedStarSlot = state.replaceSlot;
    state.currentCard = card;
    state.currentCardSaved = true;
    dedupeTeamCards();
    state.replaceSlot = null;
    reportTitle.textContent = `You became ${card.name}`;
    reportText.textContent = `${card.name} replaced your controlled player.`;
    saveState();
    render();
    return;
  }

  const placed = placeCardOnTeam(card, state.replaceSlot);
  if (placed.oldCard) {
    state.inventory = addCardToInventory(state.inventory, placed.oldCard);
  }
  state.replaceSlot = null;

  reportTitle.textContent = `${card.name} joined your XI`;
  reportText.textContent = `${card.name} is now playing at ${placed.targetSlot}, with no position restriction.`;
  saveState();
  render();
}

function ensureJoinRequest() {
  return state.joinRequest;
}

function isRealJoinRequest(request) {
  return Boolean(request?.realPlayer);
}

function acceptJoinRequest() {
  const request = isRealJoinRequest(state.joinRequest) ? enrichCard(state.joinRequest) : null;
  if (!request) return;
  const targetSpot = firstBotSpot() || availableSpotFor(request.position);
  placeCardOnTeam(request, targetSpot.id);
  state.inventory = addCardToInventory(state.inventory, request);
  state.joinRequest = null;
  reportTitle.textContent = `${request.name} joined`;
  reportText.textContent = `${request.name} replaced a bot at ${targetSpot.slot}.`;
  saveState();
  render();
}

function rejectJoinRequest() {
  const rejectedName = state.joinRequest?.name || "The player";
  state.joinRequest = null;
  reportTitle.textContent = `${rejectedName} rejected`;
  reportText.textContent = "No real-player request is active.";
  saveState();
  render();
}

function firstBotSpot() {
  return formation.find((spot, index) => {
    if (state.teamCards[spot.id]) return false;
    if (isControlledSlot(spot.id)) return false;
    return Boolean(starterNames[index]);
  });
}

function placeCardOnTeam(card, forcedSlot) {
  const targetSpot = (forcedSlot ? formation.find((spot) => spot.id === forcedSlot) : null)
    || availableSpotFor(card.position);
  const oldCard = state.teamCards[targetSpot.id];
  Object.entries(state.teamCards).forEach(([slot, teamCard]) => {
    if (slot !== targetSpot.id && teamCard.name === card.name) {
      delete state.teamCards[slot];
    }
  });
  state.teamCards[targetSpot.id] = card;
  dedupeTeamCards();
  return { ...card, targetSlot: targetSpot.slot, oldCard };
}

function dedupeTeamCards() {
  const selectedName = state.selectedStar?.name;
  Object.entries(state.teamCards || {}).forEach(([slot, teamCard]) => {
    if (selectedName && teamCard?.name === selectedName) {
      delete state.teamCards[slot];
    }
  });
}

function isControlledSlot(slotId) {
  const selectedStarSlot = state.selectedStarSlot || bestSlotIdForPosition(state.selectedStar?.position);
  return Boolean(state.selectedStar && slotId === selectedStarSlot);
}

function canPlaySlot(card, slot) {
  return Boolean(card && slot);
}

function playableSlots(position) {
  const map = {
    CAM: ["CM"],
    CDM: ["CM"],
    CF: ["ST"],
    LB: ["CB"],
    RB: ["CB"],
    LM: ["LM", "LW"],
    LW: ["LW", "LM"],
    RM: ["RM", "RW"],
    RW: ["RW", "RM"]
  };
  return map[position] || [position];
}

function availableSpotFor(position) {
  const normalized = fallbackSlot(position);
  const exactSpot = formation.find((spot) => spot.slot === position && spot.id !== state.selectedStarSlot);
  if (exactSpot) return exactSpot;

  const fallback = formation.find((spot) => spot.slot === normalized && spot.id !== state.selectedStarSlot);
  if (fallback) return fallback;

  return formation.find((spot) => spot.id !== state.selectedStarSlot) || formation[5];
}

function bestSlotIdForPosition(position) {
  const normalized = fallbackSlot(position);
  return formation.find((spot) => spot.slot === position)?.id
    || formation.find((spot) => spot.slot === normalized)?.id
    || "cm-left";
}

function fallbackSlot(position) {
  const map = {
    CAM: "CM",
    CDM: "CM",
    CF: "ST",
    LM: "LW",
    RM: "RW"
  };
  return map[position] || "CM";
}

function chancePercent(card) {
  if (exactChancePlayers[card.name] !== undefined) {
    return formatChance(exactChancePlayers[card.name]);
  }
  const remainingChance = 100 - Object.values(exactChancePlayers).reduce((sum, chance) => sum + chance, 0);
  const displayChance = (card.chance / totalChance) * remainingChance;
  return formatChance(displayChance);
}

function formatChance(chance) {
  return chance < 0.1 ? chance.toFixed(2) : chance.toFixed(1);
}

function chanceLabel(card) {
  if (card.specialAccess) return "only special guest and devs";
  if (card.codeOnly) return "code only";
  if (card.realPlayer || card.rarity === "Friend") return "friended player";
  return `${chancePercent(card)}% chance`;
}

function chanceSortValue(card) {
  if (card.specialAccess) return -1;
  if (card.codeOnly) return -0.5;
  if (card.realPlayer || card.rarity === "Friend") return -0.25;
  return Number(chancePercent(card));
}

function raritySortValue(card) {
  const order = {
    "G.O.A.T": 0,
    Legend: 1,
    Icon: 2,
    Elite: 3,
    Hero: 4,
    Friend: 4.5,
    Gold: 5,
    Silver: 6,
    Bronze: 7
  };
  return order[card.rarity] ?? 99;
}

function compareCardsByRarity(a, b) {
  return raritySortValue(a) - raritySortValue(b)
    || ratingSortValue(b) - ratingSortValue(a)
    || chanceSortValue(a) - chanceSortValue(b)
    || a.name.localeCompare(b.name);
}

function ratingSortValue(card) {
  return card.rating === "∞" ? Number.POSITIVE_INFINITY : Number(card.rating) || 0;
}

function ratingLabel(card) {
  return card.rating === "∞" ? "∞" : card.rating;
}

function poolNameLabel(card) {
  return card.name;
}

function playerPhoto(card) {
  if (card.image) return card.image;
  const initials = encodeURIComponent(card.name);
  return `https://ui-avatars.com/api/?name=${initials}&background=111816&color=f2c14e&bold=true&size=128`;
}


function loadPlayerPhoto(image, card) {
  image.addEventListener("error", () => { image.src = playerFallbackPhoto(card); }, { once: true });
  if (card.image) return;
  const page = encodeURIComponent(wikiPageName(card.name));
  fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${page}`)
    .then((response) => response.ok ? response.json() : null)
    .then((data) => {
      if (data?.thumbnail?.source) image.src = data.thumbnail.source;
    })
    .catch(() => {});
}

function playerFallbackPhoto(card) {
  const initials = String(card?.name || "FC").split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#6f4bff"/><stop offset="1" stop-color="#d53a83"/></linearGradient></defs><rect width="320" height="320" rx="28" fill="#111816"/><circle cx="160" cy="126" r="72" fill="url(#g)"/><path d="M55 302c8-72 49-111 105-111s97 39 105 111" fill="url(#g)"/><text x="160" y="147" text-anchor="middle" font-family="Arial,sans-serif" font-size="54" font-weight="900" fill="white">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function wikiPageName(name) {
  const map = {
    Pele: "Pelé",
    "Cristiano Ronaldo": "Cristiano Ronaldo",
    "Lionel Messi": "Lionel Messi",
    "Sunil Chhetri": "Sunil Chhetri",
    "Lamine Yamal": "Lamine Yamal",
    Gvardiol: "Joško Gvardiol",
    Araujo: "Ronald Araújo"
  };
  return map[name] || name;
}

function renderStatus() {
  const account = activeAccount();
  const nextXp = xpForNextLevel(state.level);
  selectedPlayerLabel.textContent = state.selectedStar
    ? `${account?.username || "Guest"} · ${state.selectedStar.name} · ${state.selectedStar.team}`
    : `${account?.username || "Guest"} · Spin your player`;
  const visibleXp = account?.isDev && state.adminXp !== "0" ? state.adminXp : state.xp;
  levelLabel.textContent = hasInfiniteLevel() ? "Level ∞" : `Level ${state.level} · ${visibleXp}/${nextXp} XP`;
  profileMottoLabel.textContent = account?.motto || defaultProfileMotto;
  renderProfileAvatar(profileAvatar, account?.avatarStyle || "gold", account?.profilePhoto);
  unlockText.textContent = hasInfiniteLevel()
    ? "Infinite level active. Every current level reward is unlocked."
    : state.level >= 5
    ? nextLevelRewardLabel()
    : `Reach Level 5 to unlock stronger rival teams. Next level: ${nextXp - state.xp} XP.`;
  accountToggleBtn.textContent = account ? "Logout" : "Login";
  renderLevelRewards();
}

function renderProfileAvatar(target, style, photo = "") {
  const requestedStyle = avatarStyles[style] ? style : "gold";
  const avatarStyle = requestedStyle === "goat" && !canUseGoatProfile() ? "gold" : requestedStyle;
  const glowClass = avatarStyle === "goat" && canUseGoatProfile() ? " profile-avatar-reward-glow" : "";
  const photoClass = photo ? " profile-avatar-photo" : "";
  target.className = `profile-avatar profile-avatar-${avatarStyle}${glowClass}${photoClass}`;
  target.style.backgroundImage = photo ? `url("${photo}")` : "";
  target.textContent = photo ? "" : avatarStyles[avatarStyle];
}

function nextLevelRewardLabel() {
  const nextRewardLevel = nextRewardLevelNumber();
  if (!nextRewardLevel) return "Unlocked: stronger rival teams. More rewards coming soon.";
  return `Next reward at Level ${nextRewardLevel}: ${levelRewards[nextRewardLevel].message}`;
}

function renderLevelRewards() {
  levelRewardsList.innerHTML = "";
  Object.entries(levelRewards).forEach(([level, reward]) => {
    const rewardLevel = Number(level);
    const claimed = canUseGoatProfile() || state.claimedLevelRewards.includes(level);
    const next = !claimed && rewardLevel > state.level && rewardLevel === nextRewardLevelNumber();
    const row = document.createElement("div");
    row.className = `level-reward-row ${claimed ? "claimed" : next ? "next" : "locked"}`;
    row.innerHTML = `
      <span class="level-reward-level">Lv ${rewardLevel}</span>
      <span class="level-reward-text">${reward.message}</span>
      <strong>${claimed ? "Done" : next ? "Next" : "Locked"}</strong>
    `;
    levelRewardsList.appendChild(row);
  });
}

function renderFriends() {
  const friends = uniqueFriends(state.friends || []);
  state.friends = friends;
  friendsList.innerHTML = "";
  if (!friends.length) {
    friendsList.className = "friends-list empty-state";
    friendsList.textContent = "No friends yet.";
    return;
  }

  friendsList.className = "friends-list";
  friends.forEach((friend) => {
    const row = document.createElement("div");
    const activeInvite = hasPendingXiInvite(friend);
    const isPending = friend.status === "pending";
    row.className = "friend-row";
    if (isPending) {
      row.innerHTML = `
        <div>
          <strong>${escapeHtml(friend.username)}</strong>
          <span>Friend request pending</span>
        </div>
        <div class="friend-actions">
          <button type="button" data-accept-friend>Accept</button>
          <button class="secondary danger-btn" type="button" data-decline-friend>Decline</button>
        </div>
      `;
      row.querySelector("[data-accept-friend]").addEventListener("click", () => acceptFriendRequest(friend.id));
      row.querySelector("[data-decline-friend]").addEventListener("click", () => declineFriendRequest(friend.id));
    } else {
      row.innerHTML = `
        <div>
          <strong>${escapeHtml(friend.username)}</strong>
          <span>${activeInvite ? "Team request active" : "Friended"}</span>
        </div>
        <div class="friend-actions">
          <button class="secondary" type="button" data-invite>${activeInvite ? "Invited" : "Invite to your XI"}</button>
          <button class="secondary danger-btn" type="button" data-remove>Remove</button>
        </div>
      `;
      row.querySelector("[data-invite]").disabled = activeInvite;
      row.querySelector("[data-remove]").setAttribute("aria-label", `Remove ${friend.username}`);
      row.querySelector("[data-invite]").addEventListener("click", () => inviteFriend(friend.id));
      row.querySelector("[data-remove]").addEventListener("click", () => removeFriend(friend.id));
    }
    friendsList.appendChild(row);
  });
}

function hasPendingXiInvite(friend) {
  const senderAccount = activeAccount();
  const receiverAccount = accountForFriend(friend);
  const request = receiverAccount?.state?.joinRequest;
  return Boolean(senderAccount && isRealJoinRequest(request) && request.fromAccountId === senderAccount.id);
}

function nextRewardLevelNumber() {
  return Object.keys(levelRewards)
    .map(Number)
    .filter((level) => level > state.level)
    .sort((a, b) => a - b)[0] || null;
}

function renderMatch() {
  const match = state.activeMatch;
  matchPanel.hidden = !match;
  pitch.hidden = Boolean(match);
  endMatchBtn.disabled = !match;

  if (!match) { window.match3D?.update(null); return; }
  normalizeMatchState(match);

  homeLeaderLabel.textContent = match.homeLeader || teamLeaderName();
  awayLeaderLabel.textContent = match.awayLeader || "Rival XI";
  matchScoreLabel.textContent = `${match.home} - ${match.away}`;
  matchClockLabel.textContent = `Live · ${formatMatchClock(match)}`;
  updateMatchField();
  renderGoalFeed();
  if (!matchPhysicsFrame) startMatchPhysics();

}

function renderGoalFeed() {
  const goals = state.activeMatch?.goals || [];
  if (!goals.length) {
    goalFeed.className = "goal-feed empty-state";
    goalFeed.textContent = "No goals yet.";
    return;
  }

  goalFeed.className = "goal-feed";
  goalFeed.innerHTML = "";
  goals.forEach((goal) => {
    const item = document.createElement("div");
    item.className = "goal-feed-item";
    item.innerHTML = `
      <strong>${escapeHtml(goal.minute)}' ${escapeHtml(goal.scorer)}</strong>
      <span>${escapeHtml(goal.celebration)} · goal no. ${escapeHtml(goal.goalNumber)}</span>
    `;
    goalFeed.appendChild(item);
  });
}

function renderJoinRequest() {
  const request = isRealJoinRequest(state.joinRequest) ? enrichCard(state.joinRequest) : null;
  if (!request) {
    joinRequestTitle.textContent = "No request yet";
    joinRequestText.textContent = "Real players can ask to replace bots in your team.";
    acceptJoinBtn.disabled = true;
    rejectJoinBtn.disabled = true;
    acceptJoinBtn.hidden = true;
    rejectJoinBtn.hidden = true;
    return;
  }

  joinRequestTitle.textContent = request.name;
  joinRequestText.textContent = `${request.position} · ${request.rarity} · ${request.team} wants to join your team.`;
  acceptJoinBtn.disabled = false;
  rejectJoinBtn.disabled = false;
  acceptJoinBtn.hidden = false;
  rejectJoinBtn.hidden = false;
}

function render() {
  dedupeTeamCards();
  const rewardMessages = syncEarnedLevelRewards();
  if (rewardMessages.length) saveState();
  renderStars();
  renderPitch();
  renderCurrentCard();
  renderInventory();
  renderStatus();
  renderFriends();
  renderMatch();
  renderJoinRequest();
  window.syncPrototypeShell?.();
}

topSpinBtn.addEventListener("click", spinCard);
pitchPlayBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  startMatch();
});
matchPassBtn.addEventListener("click", () => matchAction("pass"));
matchThroughBtn.addEventListener("click", () => matchAction("through"));
matchCrossBtn.addEventListener("click", () => matchAction("cross"));
matchShootBtn.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  matchShootBtn.setPointerCapture?.(event.pointerId);
  beginShotCharge();
});
matchShootBtn.addEventListener("pointerup", releaseShotCharge);
matchShootBtn.addEventListener("pointercancel", cancelShotCharge);
matchShootBtn.addEventListener("lostpointercapture", cancelShotCharge);
matchShootBtn.addEventListener("click", (event) => { if (event.detail === 0) matchAction("shoot", 0.42); });
matchTackleBtn.addEventListener("click", () => matchAction("tackle"));
matchDribbleBtn.addEventListener("click", () => matchAction("dribble"));
matchSwitchBtn.addEventListener("click", switchControlledPlayer);
matchSprintBtn.addEventListener("pointercancel", () => { if (state.activeMatch) state.activeMatch.sprinting = false; });
matchSprintBtn.addEventListener("lostpointercapture", () => { if (state.activeMatch) state.activeMatch.sprinting = false; });
matchSprintBtn.addEventListener("pointerdown", (event) => {
  matchSprintBtn.setPointerCapture(event.pointerId);
  if (!state.activeMatch) return;
  state.activeMatch.sprinting = true;
  updateMatchField();
});
matchSprintBtn.addEventListener("pointerup", () => {
  if (!state.activeMatch) return;
  state.activeMatch.sprinting = false;
  updateMatchField();
});
matchSprintBtn.addEventListener("pointerleave", () => {
  if (!state.activeMatch) return;
  state.activeMatch.sprinting = false;
  updateMatchField();
});
matchJoystick.addEventListener("pointerdown", (event) => {
  if (!state.activeMatch) return;
  activeJoystickPointer = event.pointerId;
  matchJoystick.setPointerCapture(event.pointerId);
  updateJoystick(event);
});
matchJoystick.addEventListener("pointermove", (event) => {
  if (event.pointerId !== activeJoystickPointer) return;
  updateJoystick(event);
});
matchJoystick.addEventListener("pointerup", (event) => {
  if (event.pointerId !== activeJoystickPointer) return;
  stopMatchMovement();
});
matchJoystick.addEventListener("pointercancel", stopMatchMovement);
matchJoystick.addEventListener("lostpointercapture", stopMatchMovement);
window.addEventListener("keydown", (event) => {
  if (!state.activeMatch) return;
  if (event.key === "Shift") {
    state.activeMatch.sprinting = true;
    updateMatchField();
    return;
  }
  if (event.code === "Space") {
    event.preventDefault();
    if (!event.repeat) beginShotCharge();
    return;
  }
  if (event.key === "Tab") {
    event.preventDefault();
    if (!event.repeat) switchControlledPlayer();
    return;
  }
  const actionKeys = { p: "pass", P: "pass", q: "through", Q: "through", c: "cross", C: "cross", t: "tackle", T: "tackle", e: "dribble", E: "dribble" };
  if (actionKeys[event.key]) {
    event.preventDefault();
    if (!event.repeat) matchAction(actionKeys[event.key]);
    return;
  }
  if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d", "W", "A", "S", "D"].includes(event.key)) return;
  event.preventDefault();
  matchMovementKeys.add(event.key.toLowerCase());
});
window.addEventListener("keyup", (event) => {
  matchMovementKeys.delete(event.key.toLowerCase());
  if (event.code === "Space") {
    event.preventDefault();
    releaseShotCharge();
  }
  if (event.key === "Shift" && state.activeMatch) {
    state.activeMatch.sprinting = false;
    updateMatchField();
  }
});
window.addEventListener("blur", stopMatchMovement);
document.addEventListener("visibilitychange", () => {
  stopMatchMovement();
  if (document.hidden) stopMatchPhysics();
  else if (state.activeMatch) startMatchPhysics();
});
pitchFullscreenBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  togglePitchFullscreen();
});
document.addEventListener("fullscreenchange", updatePitchFullscreenButton);
redeemCodeBtn.addEventListener("click", redeemCode);
endMatchBtn.addEventListener("click", () => endMatch({ abandoned: true }));
acceptJoinBtn.addEventListener("click", acceptJoinRequest);
rejectJoinBtn.addEventListener("click", rejectJoinRequest);
inventorySearch.addEventListener("input", renderInventory);
pitch.addEventListener("click", (event) => {
  if (event.target.closest(".player-dot")) return;
  state.replaceSlot = null;
  state.inventoryOpen = true;
  reportTitle.textContent = "Full inventory";
  reportText.textContent = "Showing every saved card from highest rating to lowest.";
  saveState();
  render();
});
clearReplaceFilterBtn.addEventListener("click", () => {
  state.replaceSlot = null;
  saveState();
  render();
});
inventoryToggleBtn.addEventListener("click", () => {
  state.inventoryOpen = !state.inventoryOpen;
  saveState();
  render();
});
becomeCardBtn.addEventListener("click", becomeCurrentCard);
replaceCardBtn.addEventListener("click", replaceSelectedSlotWithCurrentCard);
saveCardBtn.addEventListener("click", saveCurrentCard);
cancelCardBtn.addEventListener("click", cancelCurrentCard);
accountToggleBtn.addEventListener("click", () => {
  if (activeAccount()) {
    logoutAccount();
    return;
  }
  settingsMenu.hidden = true;
  settingsBtn.setAttribute("aria-expanded", "false");
  showQuickLogin();
});
profileEditBtn.addEventListener("click", (event) => {
  if (event.target.closest(".profile-avatar-plus")) {
    openProfilePhotoPicker();
    return;
  }
  openProfileEditor();
});
profilePhotoInput.addEventListener("change", () => {
  saveProfilePhoto(profilePhotoInput.files?.[0]);
});
addFriendBtn.addEventListener("click", addFriend);
createAccountBtn.addEventListener("click", createAccount);
gamePromptForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!activePromptSubmit) return;
  activePromptSubmit(gamePromptInput.value);
});
gamePromptCancelBtn.addEventListener("click", closeGamePrompt);
gamePromptOverlay.addEventListener("click", (event) => {
  if (event.target === gamePromptOverlay) closeGamePrompt();
});
profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveProfile();
});
profileCancelBtn.addEventListener("click", closeProfileEditor);
profileOverlay.addEventListener("click", (event) => {
  if (event.target === profileOverlay) closeProfileEditor();
});
profileUsernameInput.addEventListener("input", updateProfilePreview);
profileMottoInput.addEventListener("input", updateProfilePreview);
profileAvatarStyleInputs.forEach((input) => {
  input.addEventListener("change", updateProfilePreview);
});
settingsBtn.addEventListener("click", () => {
  const willOpen = settingsMenu.hidden;
  settingsMenu.hidden = !willOpen;
  settingsBtn.setAttribute("aria-expanded", String(willOpen));
});
resetBtn.addEventListener("click", () => {
  const account = activeAccount();
  stopMatchPhysics();
  stopMatchMovement();
  state = freshState(accountInventoryGrant(account));
  if (account) {
    account.isDev = isDeveloperUsername(account.username);
    account.state = state;
    saveAccounts();
  }
  storageSet(saveKey, JSON.stringify(state));
  settingsMenu.hidden = true;
  settingsBtn.setAttribute("aria-expanded", "false");
  render();
});

render();
hydrateFromLocalDatabase();
window.setTimeout(() => {
  startSplashActive = false;
  startSplash.hidden = true;
  showQuickLoginAfterSplash();
}, 1500);
