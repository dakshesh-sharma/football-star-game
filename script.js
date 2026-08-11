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

const selectablePlayers = cardPool;
const exactChancePlayers = {
  Mbappu: 0.1,
  "Lamine Yamal": 0.2
};
const normalRollPool = cardPool.filter((card) => !card.specialAccess && exactChancePlayers[card.name] === undefined);
const totalChance = normalRollPool.reduce((sum, card) => sum + card.chance, 0);

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
const guaranteedInventoryNames = ["Mbappu", "Son Heung-min"];

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
  deletedCardNames: []
};

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
const reportTitle = document.querySelector("#reportTitle");
const reportText = document.querySelector("#reportText");
const unlockText = document.querySelector("#unlockText");
const resetBtn = document.querySelector("#resetBtn");

function loadState() {
  const saved = localStorage.getItem("star-xi-trial");
  return saved ? migrateState({ ...defaultState, ...JSON.parse(saved) }) : freshState();
}

function freshState() {
  return {
    ...defaultState,
    inventory: guaranteedInventoryCards(),
    teamCards: {},
    deletedCardNames: []
  };
}

function saveState() {
  localStorage.setItem("star-xi-trial", JSON.stringify(state));
}

function migrateState(savedState) {
  savedState.selectedStar = savedState.selectedStar ? enrichCard(savedState.selectedStar) : null;
  savedState.deletedCardNames = savedState.deletedCardNames || [];
  savedState.inventory = uniqueCards((savedState.inventory || []).map(enrichCard));
  savedState.currentCard = savedState.currentCard ? enrichCard(savedState.currentCard) : null;
  if (!savedState.currentCard && savedState.selectedStar) {
    savedState.currentCard = {
      ...savedState.selectedStar,
      id: `${Date.now()}-restored`
    };
    savedState.currentCardSaved = true;
  }
  savedState.teamCards = Object.fromEntries(
    Object.entries(savedState.teamCards || {}).map(([slot, card]) => {
      const enrichedCard = enrichCard(card);
      return [slotIdFromSave(slot, enrichedCard), enrichedCard];
    })
  );
  savedState.inventory = uniqueCards([
    ...savedState.inventory,
    ...Object.values(savedState.teamCards),
    savedState.selectedStar,
    savedState.currentCard,
    ...guaranteedInventoryCards()
  ]).filter((card) => !savedState.deletedCardNames.includes(card.name));
  if (savedState.selectedStar && (!savedState.selectedStarSlot || savedState.selectedStar.position === "CF")) {
    savedState.selectedStarSlot = bestSlotIdForPosition(savedState.selectedStar.position);
  }
  savedState.inventory = uniqueCards(savedState.inventory);
  return savedState;
}

function enrichCard(card) {
  const fullCard = cardPool.find((item) => item.name === card.name);
  return fullCard ? { ...card, ...fullCard, id: card.id } : card;
}

function guaranteedInventoryCards() {
  return guaranteedInventoryNames
    .map((name) => cardPool.find((card) => card.name === name))
    .filter(Boolean)
    .map((card) => ({ ...card, id: `guaranteed-${card.name.toLowerCase().replaceAll(" ", "-")}` }));
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

function renderStars() {
  starList.innerHTML = "";
  selectablePlayers.forEach((star) => {
    const card = document.createElement("div");
    card.className = `star-card ${state.selectedStar?.name === star.name ? "active" : ""}`;
    card.innerHTML = `
      <span>
        <strong>${star.name}</strong>
        <span class="meta">${star.position} · ${star.rarity} · ${star.team} · ${chanceLabel(star)}</span>
      </span>
      <span class="rating">${ratingLabel(star)}</span>
    `;
    starList.appendChild(card);
  });
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

    const player = starterNames[index] || cardPool[index % cardPool.length].name;
    return {
      ...spot,
      name: player,
      team: "Card XI",
      rating: 78 + Math.min(state.level, 10),
      controlled: false
    };
  });
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
    <span class="pitch-card-rating">
      <strong>${ratingLabel(player)}</strong>
      <span>${player.slot}</span>
    </span>
    <span class="name">${shortName(player.name)}</span>
    <span class="tag">${player.controlled ? `YOU${isGoat ? " · G.O.A.T" : ""}` : rarity}</span>
  `;
  node.addEventListener("click", () => selectReplaceSlot(player));
  return node;
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
    .filter((card) => card.name.toLowerCase().includes(searchTerm))
    .slice()
    .sort((a, b) => {
      if (!selectedSpot) return ratingSortValue(b) - ratingSortValue(a);
      const aMatchesSlot = selectedSpot && canPlaySlot(a, selectedSpot.slot);
      const bMatchesSlot = selectedSpot && canPlaySlot(b, selectedSpot.slot);
      if (aMatchesSlot !== bMatchesSlot) return aMatchesSlot ? -1 : 1;
      return chanceSortValue(a) - chanceSortValue(b) || ratingSortValue(b) - ratingSortValue(a);
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
    return exactChancePlayers[card.name].toFixed(1);
  }
  const remainingChance = 100 - Object.values(exactChancePlayers).reduce((sum, chance) => sum + chance, 0);
  const displayChance = (card.chance / totalChance) * remainingChance;
  return Math.max(displayChance, 0.2).toFixed(1);
}

function chanceLabel(card) {
  if (card.specialAccess) return "only special guest and devs";
  return `${chancePercent(card)}% chance`;
}

function chanceSortValue(card) {
  if (card.specialAccess) return -1;
  return Number(chancePercent(card));
}

function ratingSortValue(card) {
  return card.rating === "∞" ? Number.POSITIVE_INFINITY : Number(card.rating) || 0;
}

function ratingLabel(card) {
  return card.rating === "∞" ? "∞" : card.rating;
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
  selectedPlayerLabel.textContent = state.selectedStar
    ? `${state.selectedStar.name} · ${state.selectedStar.team}`
    : "Spin your player";
  levelLabel.textContent = `Level ${state.level}`;
  unlockText.textContent = state.level >= 5
    ? "Unlocked: stronger rival teams. Online real players can be added later."
    : "Reach Level 5 to unlock stronger rival teams.";
}

function render() {
  renderStars();
  renderPitch();
  renderCurrentCard();
  renderInventory();
  renderStatus();
}

topSpinBtn.addEventListener("click", spinCard);
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
resetBtn.addEventListener("click", () => {
  localStorage.removeItem("star-xi-trial");
  state = freshState();
  render();
});

render();
