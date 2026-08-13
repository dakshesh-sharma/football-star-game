const cardPool = [
  { name: "Cristiano Ronaldo", position: "ST", team: "Portugal", rating: "∞", rarity: "G.O.A.T", chance: 0, specialAccess: true },
  { name: "Pele", position: "CF", team: "Brazil", rating: 95, rarity: "Icon", chance: 1 },
  { name: "Diego Maradona", position: "CAM", team: "Argentina", rating: 95, rarity: "Icon", chance: 1 },
  { name: "Mbappu", position: "LM", team: "India", rating: 99, rarity: "Legend", chance: 0.1, image: "assets/mbappu.png" },
  { name: "Lionel Messi", position: "RW", team: "Argentina", rating: 93, rarity: "Icon", chance: 2 },
  { name: "Sunil Chhetri", position: "ST", team: "India", rating: 84, rarity: "Hero", chance: 6 },
  { name: "Lamine Yamal", position: "RW", team: "Barcelona", rating: 88, rarity: "Gold", chance: 0.2 },
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
  { name: "Neymar Jr", position: "LW", team: "Santos", rating: 88, rarity: "Elite", chance: 4 },
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
  { name: "IshowSpeed", position: "RM", team: "Portugal", rating: 90, rarity: "Legend", chance: 0, codeOnly: true, image: "assets/ishowspeed.png" }
];

const selectablePlayers = [...cardPool, ...codeOnlyCards];
const exactChancePlayers = {
  Mbappu: 0.1,
  "Lamine Yamal": 0.2,
  Pele: 0.05,
  "Diego Maradona": 0.05,
  "Lionel Messi": 0.05,
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
const opponentLeaders = ["Rival Captain", "Street King", "Madrid Boss", "Barcelona Ace", "Legend XI"];
let databasePromise = null;
let databaseReady = false;
let matchTimer = null;
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

const starterNames = ["Maignan", "Ruben Dias", "Araujo", "Saliba", "Son", "Pedri", "Modric", "Salah", "Neymar Jr", "Mbappe", "Yamal"];
const defaultState = {
  selectedStar: null,
  level: 1,
  xp: 0,
  inventory: [],
  teamCards: {},
  selectedStarSlot: null,
  replaceSlot: null,
  inventoryOpen: true,
  currentCard: null,
  currentCardSaved: false,
  deletedCardNames: [],
  redeemedCodes: [],
  playerStats: {},
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

const starList = document.querySelector("#starList");
const layout = document.querySelector(".layout");
const pitch = document.querySelector("#pitch");
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
const joinRequestTitle = document.querySelector("#joinRequestTitle");
const joinRequestText = document.querySelector("#joinRequestText");
const acceptJoinBtn = document.querySelector("#acceptJoinBtn");
const rejectJoinBtn = document.querySelector("#rejectJoinBtn");
const settingsBtn = document.querySelector("#settingsBtn");
const settingsMenu = document.querySelector("#settingsMenu");
const accountToggleBtn = document.querySelector("#accountToggleBtn");
const changeUsernameBtn = document.querySelector("#changeUsernameBtn");
const resetBtn = document.querySelector("#resetBtn");
const startSplash = document.querySelector("#startSplash");
const quickLoginOverlay = document.querySelector("#quickLoginOverlay");
const loginCardBackdrop = document.querySelector("#loginCardBackdrop");
const quickLoginTitle = document.querySelector("#quickLoginTitle");
const accountList = document.querySelector("#accountList");
const createAccountBtn = document.querySelector("#createAccountBtn");
const matchPanel = document.querySelector("#matchPanel");
const homeLeaderLabel = document.querySelector("#homeLeaderLabel");
const awayLeaderLabel = document.querySelector("#awayLeaderLabel");
const matchScoreLabel = document.querySelector("#matchScoreLabel");
const scenePlayer = document.querySelector("#scenePlayer");
const sceneBall = document.querySelector("#sceneBall");
const sceneGoalText = document.querySelector("#sceneGoalText");
const matchClockLabel = document.querySelector("#matchClockLabel");
const endMatchBtn = document.querySelector("#endMatchBtn");
const goalFeed = document.querySelector("#goalFeed");

function loadAccounts() {
  const storedActiveAccountId = storageGet(activeAccountKey);
  const savedAccounts = safeJson(storageGet(accountsKey));
  if (Array.isArray(savedAccounts) && savedAccounts.length) {
    return savedAccounts.map((account, index) => normalizeAccount(account, index, storedActiveAccountId));
  }

  const legacySave = safeJson(storageGet(saveKey));
  if (legacySave) {
    const username = legacySave.username || legacySave.selectedStar?.name || "Player 1";
    const isDev = isDeveloperUsername(username);
    const hasFullInventory = hasFullInventoryUsername(username);
    const account = {
      id: `account-${Date.now()}`,
      username,
      isDev,
      state: migrateState({ ...defaultState, ...legacySave }, hasFullInventory)
    };
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

function freshState(hasDevInventory = false) {
  return {
    ...defaultState,
    inventory: hasDevInventory ? allInventoryCards() : [],
    teamCards: {},
    deletedCardNames: [],
    playerStats: {},
    joinRequest: null,
    activeMatch: null
  };
}

function saveState() {
  const account = activeAccount();
  if (!account) return;
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

function normalizeAccount(account, index, devAccountId = null) {
  const id = account.id || `account-${Date.now()}-${index}`;
  const isDev = isDeveloperUsername(account.username);
  const hasFullInventory = hasFullInventoryUsername(account.username);
  return {
    id,
    username: account.username || `Player ${index + 1}`,
    isDev,
    state: migrateState({ ...defaultState, ...(account.state || {}) }, hasFullInventory)
  };
}

function isDeveloperUsername(username) {
  return String(username || "").trim() === "Noxify_Vo1d";
}

function hasFullInventoryUsername(username) {
  return ["Noxify_Vo1d", "1029384756", "ROBLOXBESTGAME"].includes(String(username || "").trim());
}

function migrateState(savedState, hasDevInventory = false) {
  savedState.selectedStar = savedState.selectedStar ? enrichCard(savedState.selectedStar) : null;
  savedState.deletedCardNames = savedState.deletedCardNames || [];
  savedState.redeemedCodes = savedState.redeemedCodes || [];
  savedState.playerStats = savedState.playerStats || {};
  savedState.joinRequest = isRealJoinRequest(savedState.joinRequest) ? enrichCard(savedState.joinRequest) : null;
  savedState.activeMatch = savedState.activeMatch || null;
  savedState.inventory = uniqueCards((savedState.inventory || []).map(enrichCard));
  if (!hasDevInventory) {
    savedState.inventory = savedState.inventory.filter((card) => !isDevGrantedCard(card));
  }
  savedState.currentCard = savedState.currentCard ? enrichCard(savedState.currentCard) : null;
  if (!hasDevInventory && isDevGrantedCard(savedState.selectedStar)) {
    savedState.selectedStar = null;
    savedState.selectedStarSlot = null;
  }
  if (!hasDevInventory && isDevGrantedCard(savedState.currentCard)) {
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
      if (!hasDevInventory && isDevGrantedCard(enrichedCard)) return [];
      return enrichedCard ? [[slotIdFromSave(slot, enrichedCard), enrichedCard]] : [];
    })
  );
  savedState.inventory = uniqueCards([
    ...savedState.inventory,
    ...Object.values(savedState.teamCards),
    savedState.selectedStar,
    savedState.currentCard,
    ...(hasDevInventory ? allInventoryCards() : [])
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

function enrichCard(card) {
  if (!card?.name) return null;
  const fullCard = [...cardPool, ...codeOnlyCards].find((item) => item.name === card.name);
  return fullCard ? { ...card, ...fullCard, id: card.id } : card;
}

function allInventoryCards() {
  return cardPool.map((card) => ({
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

      accounts = databaseAccounts.map((account, index) => normalizeAccount(account, index, databaseActiveAccountId));
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
    const hasFullInventory = hasFullInventoryUsername(account.username);
    const accountState = account.state || freshState(hasFullInventory);
    const selectedName = accountState.selectedStar?.name || "No player yet";
    const accessLabel = account.isDev ? " · Dev" : hasFullInventory ? " · Special" : "";
    accountRow.className = "account-row";
    accountButton.className = "account-card secondary";
    accountButton.type = "button";
    accountButton.innerHTML = `
      <strong>${account.username}</strong>
      <span>${selectedName} · Level ${accountState.level || 1}${accessLabel}</span>
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
  renderAccounts();
  quickLoginOverlay.hidden = false;
}

function showQuickLoginAfterSplash() {
  if (startSplashActive || activeAccount()) return;
  showQuickLogin();
}

function hideQuickLogin() {
  quickLoginOverlay.hidden = true;
}

function loginAccount(id) {
  const account = accounts.find((item) => item.id === id);
  if (!account) return;
  const hasFullInventory = hasFullInventoryUsername(account.username);
  activeAccountId = account.id;
  account.isDev = isDeveloperUsername(account.username);
  storageSet(activeAccountKey, activeAccountId);
  state = migrateState({ ...defaultState, ...(account.state || {}) }, hasFullInventory);
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
  const username = prompt("Choose a username:", `Player ${accounts.length + 1}`);
  const trimmedUsername = username?.trim();
  if (!trimmedUsername) return;

  const savedUsername = trimmedUsername.slice(0, 24);
  const hasFullInventory = hasFullInventoryUsername(savedUsername);
  const account = {
    id: `account-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    username: savedUsername,
    isDev: isDeveloperUsername(savedUsername),
    state: freshState(hasFullInventory)
  };
  accounts = [account, ...accounts];
  saveAccounts();
  loginAccount(account.id);
}

function changeUsername() {
  const account = activeAccount();
  if (!account) return;
  const username = prompt("Change username:", account.username);
  const trimmedUsername = username?.trim();
  if (!trimmedUsername) return;
  account.username = trimmedUsername.slice(0, 24);
  account.isDev = isDeveloperUsername(account.username);
  state = migrateState({ ...defaultState, ...state }, hasFullInventoryUsername(account.username));
  account.state = state;
  saveAccounts();
  settingsMenu.hidden = true;
  settingsBtn.setAttribute("aria-expanded", "false");
  render();
}

function buildTeam() {
  const selectedStarSlot = state.selectedStarSlot || bestSlotIdForPosition(state.selectedStar?.position);
  return formation.map((spot, index) => {
    const star = state.selectedStar;
    if (star && spot.id === selectedStarSlot) {
      return { ...spot, ...star, id: spot.id, cardId: star.id, slot: star.position, controlled: true };
    }

    const savedCard = state.teamCards[spot.id];
    if (savedCard) {
      return {
        ...spot,
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
        ...spot,
        ...starterCard,
        id: spot.id,
        cardId: `starter-${starterCard.name.toLowerCase().replaceAll(" ", "-")}`,
        slot: starterCard.position,
        controlled: false
      };
    }

    return {
      ...spot,
      name: botName(spot),
      team: "Starter Bots",
      rating: 60 + Math.min(state.level, 10),
      rarity: "Bronze",
      controlled: false
    };
  });
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

  state.activeMatch = {
    home: 0,
    away: 0,
    minute: 1,
    goals: [],
    homeLeader: teamLeaderName(),
    awayLeader: opponentLeaders[Math.floor(Math.random() * opponentLeaders.length)]
  };
  state.inventoryOpen = false;
  reportTitle.textContent = "Match started";
  reportText.textContent = `${state.activeMatch.homeLeader} leads FC Stars against ${state.activeMatch.awayLeader}.`;
  saveState();
  render();
  animateChance(state.selectedStar || buildTeam()[9], "Kickoff");
  speakCommentary(`${state.activeMatch.homeLeader} versus ${state.activeMatch.awayLeader}. Kickoff.`);
  scheduleNextMatchMoment();
}

function endMatch() {
  if (!state.activeMatch) return;
  clearMatchTimer();
  const score = `${state.activeMatch.home}-${state.activeMatch.away}`;
  state.activeMatch = null;
  sceneGoalText.textContent = `Final score ${score}`;
  reportTitle.textContent = "Full time";
  reportText.textContent = `FC Stars finished ${score} against Rival XI.`;
  saveState();
  render();
}

function scheduleNextMatchMoment() {
  clearMatchTimer();
  if (!state.activeMatch) return;
  matchTimer = window.setTimeout(playAutoMatchMoment, randomInt(2600, 4300));
}

function clearMatchTimer() {
  if (!matchTimer) return;
  window.clearTimeout(matchTimer);
  matchTimer = null;
}

function playAutoMatchMoment() {
  if (!state.activeMatch) return;
  state.activeMatch.minute = Math.min(90, state.activeMatch.minute + randomInt(5, 11));

  if (state.activeMatch.minute >= 90) {
    endMatch();
    return;
  }

  const opponentChance = Math.random() < 0.24;
  if (opponentChance) {
    playOpponentMoment();
    scheduleNextMatchMoment();
    return;
  }

  const scorer = chooseScorer();
  const didScore = Math.random() > 0.38;

  if (!didScore) {
    animateChance(scorer, "Saved");
    speakCommentary(`${scorer.name} shoots. Great save by the keeper.`);
    reportTitle.textContent = "Chance missed";
    reportText.textContent = `${scorer.name} forced a save in minute ${state.activeMatch.minute}.`;
    saveState();
    render();
    scheduleNextMatchMoment();
    return;
  }

  state.activeMatch.home += 1;
  const goalNumber = addGoalForPlayer(scorer.name);
  const goal = {
    scorer: scorer.name,
    minute: state.activeMatch.minute,
    goalNumber,
    celebration: celebrationFor(scorer)
  };
  state.activeMatch.goals = [goal, ...state.activeMatch.goals].slice(0, 12);
  animateChance(scorer, "GOAL!");
  speakGoal(scorer, goal.celebration);
  reportTitle.textContent = `${scorer.name} scores`;
  reportText.textContent = `${goal.celebration}. Goal no. ${goalNumber} for ${scorer.name}.`;
  saveState();
  render();
  scheduleNextMatchMoment();
}

function playOpponentMoment() {
  const didScore = Math.random() > 0.58;
  const opponentName = state.activeMatch.awayLeader || "Rival Captain";

  if (!didScore) {
    scenePlayer.textContent = shortName(opponentName);
    animateChance({ name: opponentName }, "Blocked");
    speakCommentary(`${opponentName} attacks, but FC Stars blocks it.`);
    reportTitle.textContent = "Defended";
    reportText.textContent = `${opponentName} was stopped in minute ${state.activeMatch.minute}.`;
    saveState();
    render();
    return;
  }

  state.activeMatch.away += 1;
  const goal = {
    scorer: opponentName,
    minute: state.activeMatch.minute,
    goalNumber: state.activeMatch.away,
    celebration: "Rival goal"
  };
  state.activeMatch.goals = [goal, ...state.activeMatch.goals].slice(0, 12);
  animateChance({ name: opponentName }, "Rival Goal");
  speakCommentary(`${opponentName} scores for Rival XI.`);
  reportTitle.textContent = `${opponentName} scores`;
  reportText.textContent = `Rival XI makes it ${state.activeMatch.home}-${state.activeMatch.away}.`;
  saveState();
  render();
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

function celebrationFor(player) {
  if (player.name.includes("Ronaldo")) return "Siuu";
  if (player.name.includes("Messi")) return "Ankara Messi";
  if (player.rarity === "Icon") return "Icon moment";
  if (player.rarity === "Legend" || player.rarity === "G.O.A.T") return "Legend celebration";
  return "Team celebration";
}

function animateChance(player, text) {
  scenePlayer.textContent = shortName(player.name);
  sceneGoalText.textContent = text;
  sceneBall.classList.remove("ball-shot");
  scenePlayer.classList.remove("player-run");
  scenePlayer.classList.remove("scene-celebrate");
  void sceneBall.offsetWidth;
  sceneBall.classList.add("ball-shot");
  scenePlayer.classList.add("player-run");
  if (text.toLowerCase().includes("goal")) {
    window.setTimeout(() => scenePlayer.classList.add("scene-celebrate"), 760);
  }
}

function speakGoal(player, celebration) {
  const line = celebration === "Ankara Messi"
    ? `Ankara Messi, Ankara Messi, Ankara Messi, goal! ${player.name} scores.`
    : celebration === "Siuu"
      ? `Siuu! ${player.name} scores a brilliant goal.`
      : `Goal! ${player.name} scores for FC Stars.`;
  speakCommentary(line);
}

function speakCommentary(line) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(line);
  const voices = window.speechSynthesis.getVoices();
  utterance.voice = voices.find((voice) => voice.lang.startsWith("en") && /Daniel|Thomas|Google|Microsoft/i.test(voice.name)) || voices.find((voice) => voice.lang.startsWith("en")) || null;
  utterance.rate = 1;
  utterance.pitch = 0.95;
  window.speechSynthesis.speak(utterance);
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
  state.currentCardSaved = false;
  reportTitle.textContent = `${card.name} rolled`;
  reportText.textContent = `${card.rarity} ${card.position}. ${chanceLabel(card)}. Choose Become, Save, or click a pitch player and Replace Slot.`;
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
    state.replaceSlot = null;
    reportTitle.textContent = `You became ${state.currentCard.name}`;
    reportText.textContent = `${state.currentCard.name} replaced your controlled player.`;
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

  const code = prompt("Enter code:");
  const trimmedCode = code?.trim();
  if (!trimmedCode) return;

  if (trimmedCode !== "CR7THEGOAT") {
    showCodeResult("invalid", "Code invalid", "That code did not unlock a player.");
    render();
    return;
  }

  if (state.redeemedCodes.includes(trimmedCode) || ownedPlayerNames().has("IshowSpeed")) {
    showCodeResult("invalid", "Code already used", "IshowSpeed is already in this account.");
    render();
    return;
  }

  const speedCard = {
    ...codeOnlyCards[0],
    id: `code-ishowspeed-${Date.now()}`
  };
  state.inventory = addCardToInventory(state.inventory, speedCard);
  state.redeemedCodes = uniqueNames([...state.redeemedCodes, trimmedCode]);
  state.inventoryOpen = true;
  showCodeResult("success", "Code succeeded", "IshowSpeed joined your inventory as a Legend Portugal card.");
  saveState();
  render();
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

  if (isControlledSlot(state.replaceSlot)) {
    if (state.selectedStar) {
      state.inventory = addCardToInventory(state.inventory, state.selectedStar);
    }
    state.selectedStar = card;
    state.selectedStarSlot = state.replaceSlot;
    state.currentCard = card;
    state.currentCardSaved = true;
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
  return { ...card, targetSlot: targetSpot.slot, oldCard };
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
  return `${chancePercent(card)}% chance`;
}

function chanceSortValue(card) {
  if (card.specialAccess) return -1;
  if (card.codeOnly) return -0.5;
  return Number(chancePercent(card));
}

function raritySortValue(card) {
  const order = {
    "G.O.A.T": 0,
    Legend: 1,
    Icon: 2,
    Elite: 3,
    Hero: 4,
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
  selectedPlayerLabel.textContent = state.selectedStar
    ? `${account?.username || "Guest"} · ${state.selectedStar.name} · ${state.selectedStar.team}`
    : `${account?.username || "Guest"} · Spin your player`;
  levelLabel.textContent = `Level ${state.level}`;
  unlockText.textContent = state.level >= 5
    ? "Unlocked: stronger rival teams. Online real players can be added later."
    : "Reach Level 5 to unlock stronger rival teams.";
  accountToggleBtn.textContent = account ? "Logout" : "Login";
  changeUsernameBtn.hidden = !account;
}

function renderMatch() {
  const match = state.activeMatch;
  matchPanel.hidden = !match;
  endMatchBtn.disabled = !match;

  if (!match) return;

  homeLeaderLabel.textContent = match.homeLeader || teamLeaderName();
  awayLeaderLabel.textContent = match.awayLeader || "Rival XI";
  matchScoreLabel.textContent = `${match.home} - ${match.away}`;
  matchClockLabel.textContent = `${match.minute}' · Watching live`;
  if (!scenePlayer.textContent || scenePlayer.textContent === "Ready") {
    scenePlayer.textContent = state.selectedStar ? shortName(state.selectedStar.name) : "FC Stars";
  }
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
  renderStars();
  renderPitch();
  renderCurrentCard();
  renderInventory();
  renderStatus();
  renderMatch();
  renderJoinRequest();
}

topSpinBtn.addEventListener("click", spinCard);
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
changeUsernameBtn.addEventListener("click", changeUsername);
createAccountBtn.addEventListener("click", createAccount);
settingsBtn.addEventListener("click", () => {
  const willOpen = settingsMenu.hidden;
  settingsMenu.hidden = !willOpen;
  settingsBtn.setAttribute("aria-expanded", String(willOpen));
});
resetBtn.addEventListener("click", () => {
  const account = activeAccount();
  state = freshState(hasFullInventoryUsername(account?.username));
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
