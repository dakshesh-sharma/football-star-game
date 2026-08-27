const cardPool = [
  { name: "Cristiano Ronaldo", position: "ST", team: "Portugal", rating: "∞", rarity: "G.O.A.T", chance: 0, specialAccess: true, image: "assets/ronaldo.png" },
  { name: "Pele", position: "CF", team: "Brazil", rating: 95, rarity: "Icon", chance: 1 },
  { name: "Diego Maradona", position: "CAM", team: "Argentina", rating: 95, rarity: "Icon", chance: 1 },
  { name: "Mbappu", position: "LM", team: "India", rating: 99, rarity: "Legend", chance: 0.3, image: "assets/mbappu.png" },
  { name: "Lionel Messi", position: "RW", team: "Argentina", rating: "∞", rarity: "G.O.A.T", chance: 0.1, image: "assets/messi.png" },
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
  { name: "Manuel Neuer", position: "GK", team: "Bayern", rating: 87, rarity: "Gold", chance: 8 },
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
  { name: "Zinedine Zidane", position: "CAM", team: "France", rating: 94, rarity: "Icon", chance: 1 },
  { name: "Ronaldo Nazario", position: "ST", team: "Brazil", rating: 94, rarity: "Icon", chance: 1 },
  { name: "Ronaldinho", position: "LW", team: "Brazil", rating: 94, rarity: "Icon", chance: 1 },
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
  "David Beckham": 0.05
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
  INFINITECOINS: { type: "infiniteCoins", expiresAt: "2026-08-27T14:46:00+05:30", message: "Unlimited Coins unlocked permanently." }
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
let matchMoveTimer = null;
let activeJoystickPointer = null;
let joystickVector = { x: 0, y: 0 };
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
const matchJoystick = document.querySelector("#matchJoystick");
const matchJoystickKnob = document.querySelector("#matchJoystickKnob");
const matchPassBtn = document.querySelector("#matchPassBtn");
const matchSprintBtn = document.querySelector("#matchSprintBtn");
const matchShootBtn = document.querySelector("#matchShootBtn");
const matchTackleBtn = document.querySelector("#matchTackleBtn");
const matchDribbleBtn = document.querySelector("#matchDribbleBtn");
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
  const devAccounts = savedAccounts.filter((account) => isDeveloperUsername(account.username));
  const mergedDevAccount = mergeDeveloperAccounts(devAccounts, preferredActiveAccountId);
  return [
    ...(mergedDevAccount ? [mergedDevAccount] : []),
    ...savedAccounts.filter((account) => !isDeveloperUsername(account.username))
  ]
    .map((account, index) => normalizeAccount(account, index, preferredActiveAccountId));
}

function normalizeAccount(account, index) {
  const id = account.id || `account-${Date.now()}-${index}`;
  const isDev = isDeveloperUsername(account.username);
  const inventoryGrant = isDev ? "dev" : hasFullInventoryUsername(account.username) ? "special" : false;
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
    username: isDev ? developerUsername : account.username || `Player ${index + 1}`,
    motto: account.motto || defaultProfileMotto,
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
  return {
    ...baseState,
    ...incomingState,
    level: Math.max(baseState.level || 1, incomingState.level || 1),
    xp: Math.max(baseState.xp || 0, incomingState.xp || 0),
    adminXp: String(baseState.adminXp || "0").length >= String(incomingState.adminXp || "0").length
      ? String(baseState.adminXp || "0")
      : String(incomingState.adminXp || "0"),
    infiniteLevel: Boolean(baseState.infiniteLevel || incomingState.infiniteLevel),
    inventory: uniqueCards([...(baseState.inventory || []), ...(incomingState.inventory || [])]),
    teamCards: { ...(baseState.teamCards || {}), ...(incomingState.teamCards || {}) },
    deletedCardNames: uniqueNames([...(baseState.deletedCardNames || []), ...(incomingState.deletedCardNames || [])]),
    redeemedCodes: uniqueNames([...(baseState.redeemedCodes || []), ...(incomingState.redeemedCodes || [])]),
    claimedLevelRewards: uniqueNames([...(baseState.claimedLevelRewards || []), ...(incomingState.claimedLevelRewards || [])]),
    badges: uniqueNames([...(baseState.badges || []), ...(incomingState.badges || [])]),
    friends: uniqueFriends([...(baseState.friends || []), ...(incomingState.friends || [])]),
    playerStats: { ...(baseState.playerStats || {}), ...(incomingState.playerStats || {}) },
    selectedStar: baseState.selectedStar || incomingState.selectedStar || null,
    selectedStarSlot: baseState.selectedStarSlot || incomingState.selectedStarSlot || null,
    currentCard: baseState.currentCard || incomingState.currentCard || null,
    currentCardSaved: Boolean(baseState.currentCardSaved || incomingState.currentCardSaved)
  };
}

function isDeveloperUsername(username) {
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
  savedState.deletedCardNames = savedState.deletedCardNames || [];
  savedState.redeemedCodes = savedState.redeemedCodes || [];
  savedState.claimedLevelRewards = savedState.claimedLevelRewards || [];
  savedState.badges = savedState.badges || [];
  savedState.friends = uniqueFriends(savedState.friends || []);
  savedState.playerStats = savedState.playerStats || {};
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
  savedState.activeMatch = savedState.activeMatch || null;
  savedState.inventory = uniqueCards((savedState.inventory || []).map(enrichCard));
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
    Object.entries(savedState.teamCards || {}).flatMap(([slot, card]) => {
      const enrichedCard = enrichCard(card);
      if (!isDeveloperInventory && isExcludedFullInventoryGrant(enrichedCard)) return [];
      if (!hasFullInventory && isDevGrantedCard(enrichedCard)) return [];
      return enrichedCard ? [[slotIdFromSave(slot, enrichedCard), enrichedCard]] : [];
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
  if (!card?.name) return null;
  const fullCard = [...cardPool, ...codeOnlyCards].find((item) => item.name === card.name);
  return fullCard ? { ...card, ...fullCard, id: card.id } : card;
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
      <strong>${account.username}</strong>
      <span>${selectedName} · Level ${accountLevel}${accessLabel}</span>
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
  quickLoginTitle.textContent = accounts.length ? "Quick Login" : "Create your username";
  createAccountBtn.textContent = accounts.length ? "Create Account" : "Create Username";
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
  activeAccountId = null;
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
  const trimmedUsername = username?.trim();
  if (!trimmedUsername) return;

  const savedUsername = trimmedUsername.slice(0, 24);
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
  const trimmedUsername = username?.trim();
  if (!trimmedUsername) return;
  const savedUsername = trimmedUsername.slice(0, 24);
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
  const trimmedUsername = profileUsernameInput.value?.trim();
  if (!trimmedUsername) {
    showProfileEditorMessage("Username cannot be empty.");
    return;
  }
  const savedUsername = trimmedUsername.slice(0, 24);
  if (savedUsername === developerUsername && isDeveloperNameTaken(account.id)) {
    showProfileEditorMessage("That dev username is already taken.");
    return;
  }
  account.username = savedUsername;
  account.motto = (profileMottoInput.value?.trim() || defaultProfileMotto).slice(0, 42);
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

function startMatch() {
  if (!activeAccount()) {
    showQuickLogin();
    return;
  }

  const featuredPlayer = state.selectedStar || buildTeam().find((player) => player.name && player.image) || cardPool[0];
  const opponent = opponentTeams[Math.floor(Math.random() * opponentTeams.length)];
  state.activeMatch = {
    home: 0,
    away: 0,
    minute: 1,
    goals: [],
    homeLeader: teamLeaderName(),
    awayLeader: opponent.name,
    opponentMultiplier: opponent.multiplier,
    playerX: 24,
    playerY: 50,
    ballX: 29,
    ballY: 50,
    lastShotAt: 0,
    lastShotPosition: null,
    sprinting: false,
    playerImage: featuredPlayer?.image || "",
    homeTeam: buildTeam().map(({ id, name, position, team, rating, image, controlled }) => ({
      id, name, position, team, rating, image: image || "", controlled: Boolean(controlled)
    }))
  };
  state.inventoryOpen = false;
  reportTitle.textContent = "Match started";
  reportText.textContent = `${state.activeMatch.homeLeader} leads FC Stars against ${state.activeMatch.awayLeader}.`;
  saveState();
  render();
  matchPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  sceneGoalText.textContent = "Kickoff";
  updateMatchField();
  scheduleNextMatchMoment();
}

function endMatch() {
  if (!state.activeMatch) return;
  clearMatchTimer();
  stopMatchMovement();
  const score = `${state.activeMatch.home}-${state.activeMatch.away}`;
  const won = state.activeMatch.home > state.activeMatch.away;
  const drew = state.activeMatch.home === state.activeMatch.away;
  const winXp = won ? matchWinXp(state.activeMatch.home, state.activeMatch.away) : 0;
  const tablePoints = won ? 10 : 0;
  const coinReward = Math.max(0, Number(state.activeMatch.home) || 0) * 25;
  if (won) {
    state.rankedPoints = Math.max(0, Number(state.rankedPoints) || 0) + tablePoints;
  }
  state.matchPoints = Math.max(0, Number(state.matchPoints) || 0) + coinReward;
  const xpResult = won ? addXp(winXp) : { leveledUpTo: [], rewardMessages: [] };
  const levelMessage = xpResult.leveledUpTo.length
    ? ` Level ${xpResult.leveledUpTo[xpResult.leveledUpTo.length - 1]} reached.`
    : "";
  state.activeMatch = null;
  sceneGoalText.textContent = `Final score ${score}`;
  reportTitle.textContent = "Full time";
  reportText.textContent = won
    ? `Victory! FC Stars won ${score}. +10 Ranked Points, +${coinReward} Coins, and +${winXp} XP.${levelMessage}`
    : drew
      ? `Draw ${score}. +${coinReward} Coins for your goals. Win the next match to earn XP.`
      : `Defeat ${score}. +${coinReward} Coins for your goals. Win a match to earn XP.`;
  saveState();
  render();
  window.dispatchEvent(new CustomEvent("fc-stars-match-ended", { detail: { won, tablePoints, coinReward, score } }));
}

function matchWinXp(homeGoals, awayGoals) {
  const goals = Math.max(0, Number(homeGoals) || 0);
  const margin = Math.max(0, goals - (Number(awayGoals) || 0));
  return 150 + goals * 75 + margin * 125;
}

function scheduleNextMatchMoment() {
  clearMatchTimer();
  if (!state.activeMatch) return;
  matchTimer = window.setTimeout(playAutoMatchMoment, 1000);
}

function clearMatchTimer() {
  if (!matchTimer) return;
  window.clearTimeout(matchTimer);
  matchTimer = null;
}

function playAutoMatchMoment() {
  if (!state.activeMatch) return;
  state.activeMatch.minute += 1;

  if (state.activeMatch.minute >= 90) {
    endMatch();
    return;
  }
  saveState();
  render();
  scheduleNextMatchMoment();
}

function updateMatchField() {
  const match = state.activeMatch;
  if (!match) return;
  match.playerX = Number.isFinite(match.playerX) ? match.playerX : 24;
  match.playerY = Number.isFinite(match.playerY) ? match.playerY : 50;
  match.ballX = Number.isFinite(match.ballX) ? match.ballX : match.playerX + 5;
  match.ballY = Number.isFinite(match.ballY) ? match.ballY : match.playerY;
  matchAvatar.textContent = shortName(state.selectedStar?.name || activeAccount()?.username || "YOU");
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

function moveMatchPlayer(x, y) {
  const match = state.activeMatch;
  if (!match) return;
  const speed = match.sprinting ? 2.2 : 1.2;
  match.playerX = Math.max(7, Math.min(93, match.playerX + x * speed));
  match.playerY = Math.max(9, Math.min(91, match.playerY + y * speed));
  if (Math.hypot(match.ballX - match.playerX, match.ballY - match.playerY) < 13) {
    match.ballX = match.playerX;
    match.ballY = match.playerY;
  }
  updateMatchField();
}

function matchAction(action) {
  const match = state.activeMatch;
  if (!match) return;
  const attackDirection = match.playerY >= 50 ? 1 : -1;
  if (action === "pass") {
    match.ballX = match.playerX;
    match.ballY = Math.max(8, Math.min(92, match.playerY + attackDirection * 16));
    sceneGoalText.textContent = "Pass";
    reportText.textContent = "Pass played into space.";
  }
  if (action === "shoot") {
    const now = Date.now();
    const distanceToBall = Math.hypot(match.ballX - match.playerX, match.ballY - match.playerY);
    const distanceFromPreviousShot = match.lastShotPosition
      ? Math.hypot(match.playerX - match.lastShotPosition.x, match.playerY - match.lastShotPosition.y)
      : Infinity;
    const scorer = state.selectedStar || buildTeam().find((player) => player.slot !== "GK") || cardPool[0];
    const closeEnoughToGoal = attackDirection > 0 ? match.playerY > 78 : match.playerY < 22;
    const inShootingLane = Math.abs(match.playerX - 50) < 19;
    const shotOnCooldown = now - (match.lastShotAt || 0) < 1400;

    if (distanceToBall > 10) {
      sceneGoalText.textContent = "NO POSSESSION";
      reportTitle.textContent = "Get to the ball";
      reportText.textContent = "Move onto the ball before shooting again.";
      updateMatchField();
      return;
    }
    if (shotOnCooldown || distanceFromPreviousShot < 12) {
      sceneGoalText.textContent = "BUILD THE PLAY";
      reportTitle.textContent = "Shot blocked";
      reportText.textContent = "Create space before your next attempt — holding Space will not score.";
      updateMatchField();
      return;
    }

    match.lastShotAt = now;
    match.lastShotPosition = { x: match.playerX, y: match.playerY };
    match.ballX = match.playerX;
    match.ballY = attackDirection > 0 ? 94 : 6;
    const scored = closeEnoughToGoal && inShootingLane && Math.random() < 0.18;
    sceneGoalText.textContent = scored ? "GOAL!" : "SAVED";
    if (scored) {
      match.home += 1;
      const goalNumber = addGoalForPlayer(scorer.name);
      match.goals = [{ scorer: scorer.name, minute: match.minute, goalNumber, celebration: "Goal" }, ...match.goals].slice(0, 12);
      reportTitle.textContent = `${scorer.name} scores`;
      reportText.textContent = `A controlled finish. FC Stars lead ${match.home}-${match.away}.`;
      match.ballX = 50;
      match.ballY = 50;
    } else {
      reportTitle.textContent = "Shot saved";
      reportText.textContent = closeEnoughToGoal && inShootingLane
        ? "The rival goalkeeper kept it out. Reposition for another chance."
        : "The angle was wrong. Get central and closer to goal.";
      match.ballX = Math.max(8, Math.min(92, match.playerX + (match.playerX < 50 ? 11 : -11)));
      match.ballY = Math.max(8, Math.min(92, match.playerY - attackDirection * 10));
    }
  }
  if (action === "dribble") {
    match.ballX = match.playerX;
    match.ballY = Math.max(8, Math.min(92, match.playerY + attackDirection * 8));
    match.ballY = match.playerY;
    sceneGoalText.textContent = "DRIBBLE";
    reportTitle.textContent = "Dribbling";
    reportText.textContent = "Close control keeps the ball at your feet.";
  }
  if (action === "tackle") {
    match.ballX = Math.max(8, match.playerX - 5);
    match.ballY = match.playerY;
    sceneGoalText.textContent = "TACKLE";
    reportTitle.textContent = "Challenge won";
    reportText.textContent = "You won the tackle and recovered possession.";
  }
  updateMatchField();
  saveState();
  render();
}

function stopMatchMovement() {
  if (matchMoveTimer) window.clearInterval(matchMoveTimer);
  matchMoveTimer = null;
  activeJoystickPointer = null;
  joystickVector = { x: 0, y: 0 };
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
      <span>${shortName(player.name)}</span>
      <strong>${jerseyNumber(player)}</strong>
    </span>
    <span class="pitch-card-rating">
      <strong>${ratingLabel(player)}</strong>
      <span>${player.slot}</span>
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

  if (state.redeemedCodes.includes(redeemedCodeKey)) {
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
    ? `Replacing ${selectedSpot.slot}. Matching cards are shown first, but all saved cards stay visible.`
    : "Roll a card, then become it, save it, or click a pitch player to replace.";

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
        <span>${card.position}</span>
      </div>
      <div class="card-image-wrap">
        <img class="card-photo" src="${playerPhoto(card)}" alt="${card.name}" loading="lazy">
      </div>
      <div class="card-details">
        <strong>${card.name}</strong>
        <span>${card.team}</span>
        <small>${card.rarity}</small>
      </div>
      <div class="inventory-actions">
        <button data-become="${card.id}">Become</button>
        <button class="${canPlaceAtSelectedSpot ? "secondary" : "danger-btn"}" data-card="${card.id}" data-action="${canPlaceAtSelectedSpot ? "place" : "delete"}">${canPlaceAtSelectedSpot ? `Put at ${selectedSpot.slot}` : "Delete"}</button>
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
    loadPlayerPhoto(item.querySelector("img"), card);
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

  const selectedSpot = formation.find((spot) => spot.id === state.replaceSlot);
  if (selectedSpot && !canPlaySlot(card, selectedSpot.slot)) {
    state.replaceSlot = null;
    reportTitle.textContent = `Choose a ${card.position} spot`;
    reportText.textContent = `${card.name} cannot play ${selectedSpot.slot}. Pick a matching pitch player, then place the card.`;
    saveState();
    render();
    return;
  }

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
  reportText.textContent = `${card.name} replaced the named card player at ${placed.targetSlot}. Real players can replace these cards later.`;
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
  const targetSpot = forcedSlot
    ? formation.find((spot) => spot.id === forcedSlot)
    : availableSpotFor(card.position);
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
  return playableSlots(card.position).includes(slot);
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
  if (card.image) return;
  const page = encodeURIComponent(wikiPageName(card.name));
  fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${page}`)
    .then((response) => response.ok ? response.json() : null)
    .then((data) => {
      if (data?.thumbnail?.source) image.src = data.thumbnail.source;
    })
    .catch(() => {});
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
          <strong>${friend.username}</strong>
          <span>Friend request pending</span>
        </div>
        <div class="friend-actions">
          <button type="button" data-accept-friend="${friend.id}">Accept</button>
          <button class="secondary danger-btn" type="button" data-decline-friend="${friend.id}">Decline</button>
        </div>
      `;
      row.querySelector("[data-accept-friend]").addEventListener("click", () => acceptFriendRequest(friend.id));
      row.querySelector("[data-decline-friend]").addEventListener("click", () => declineFriendRequest(friend.id));
    } else {
      row.innerHTML = `
        <div>
          <strong>${friend.username}</strong>
          <span>${activeInvite ? "Team request active" : "Friended"}</span>
        </div>
        <div class="friend-actions">
          <button class="secondary" type="button" data-invite="${friend.id}">${activeInvite ? "Invited" : "Invite to your XI"}</button>
          <button class="secondary danger-btn" type="button" data-remove="${friend.id}" aria-label="Remove ${friend.username}">Remove</button>
        </div>
      `;
      row.querySelector("[data-invite]").disabled = activeInvite;
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

  if (!match) return;

  homeLeaderLabel.textContent = match.homeLeader || teamLeaderName();
  awayLeaderLabel.textContent = match.awayLeader || "Rival XI";
  matchScoreLabel.textContent = `${match.home} - ${match.away}`;
  matchClockLabel.textContent = `${match.minute}' · Play now`;
  updateMatchField();
  renderGoalFeed();
  if (!matchTimer) scheduleNextMatchMoment();
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
      <strong>${goal.minute}' ${goal.scorer}</strong>
      <span>${goal.celebration} · goal no. ${goal.goalNumber}</span>
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
}

topSpinBtn.addEventListener("click", spinCard);
pitchPlayBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  startMatch();
});
matchPassBtn.addEventListener("click", () => matchAction("pass"));
matchShootBtn.addEventListener("click", () => matchAction("shoot"));
matchTackleBtn.addEventListener("click", () => matchAction("tackle"));
matchDribbleBtn.addEventListener("click", () => matchAction("dribble"));
matchSprintBtn.addEventListener("pointerdown", () => {
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
  moveMatchPlayer(joystickVector.x, joystickVector.y);
});
matchJoystick.addEventListener("pointerup", (event) => {
  if (event.pointerId !== activeJoystickPointer) return;
  stopMatchMovement();
});
matchJoystick.addEventListener("pointercancel", stopMatchMovement);
window.addEventListener("keydown", (event) => {
  if (!state.activeMatch) return;
  if (event.key === "Shift") {
    state.activeMatch.sprinting = true;
    updateMatchField();
    return;
  }
  if (event.code === "Space") {
    event.preventDefault();
    matchAction("shoot");
    return;
  }
  const actionKeys = { p: "pass", P: "pass", t: "tackle", T: "tackle", e: "dribble", E: "dribble" };
  if (actionKeys[event.key]) {
    event.preventDefault();
    matchAction(actionKeys[event.key]);
    return;
  }
  if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d", "W", "A", "S", "D"].includes(event.key)) return;
  event.preventDefault();
  const x = event.key === "ArrowRight" || event.key.toLowerCase() === "d" ? 1 : event.key === "ArrowLeft" || event.key.toLowerCase() === "a" ? -1 : 0;
  const y = event.key === "ArrowDown" || event.key.toLowerCase() === "s" ? 1 : event.key === "ArrowUp" || event.key.toLowerCase() === "w" ? -1 : 0;
  moveMatchPlayer(x, y);
});
window.addEventListener("keyup", (event) => {
  if (event.key !== "Shift" || !state.activeMatch) return;
  state.activeMatch.sprinting = false;
  updateMatchField();
});
pitchFullscreenBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  togglePitchFullscreen();
});
document.addEventListener("fullscreenchange", updatePitchFullscreenButton);
redeemCodeBtn.addEventListener("click", redeemCode);
endMatchBtn.addEventListener("click", endMatch);
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
