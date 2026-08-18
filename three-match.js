import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const canvas = document.querySelector("#matchCanvas");
if (!canvas) throw new Error("Match canvas was not found.");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x12251f);

const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
camera.position.set(0, 11, 17);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

scene.add(new THREE.HemisphereLight(0xeaf7ff, 0x14261d, 2.2));
const sun = new THREE.DirectionalLight(0xffffff, 3.2);
sun.position.set(-8, 18, 10);
sun.castShadow = true;
scene.add(sun);

const field = new THREE.Group();
scene.add(field);

const grass = new THREE.Mesh(
  new THREE.PlaneGeometry(18, 28),
  new THREE.MeshStandardMaterial({ color: 0x16814d, roughness: 0.92 })
);
grass.rotation.x = -Math.PI / 2;
grass.receiveShadow = true;
field.add(grass);

for (let i = -6; i <= 6; i += 2) {
  const stripe = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 1),
    new THREE.MeshBasicMaterial({ color: i % 4 === 0 ? 0x1c8e56 : 0x147948, transparent: true, opacity: 0.62 })
  );
  stripe.rotation.x = -Math.PI / 2;
  stripe.position.set(0, 0.012, i * 2);
  field.add(stripe);
}

function line(width, depth, x, z) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.035, depth),
    new THREE.MeshBasicMaterial({ color: 0xe9f7e9 })
  );
  mesh.position.set(x, 0.035, z);
  field.add(mesh);
}

function verticalLine(width, depth, x, z) {
  line(width, depth, x, z);
}

line(18, 0.07, 0, 0);
line(18, 0.07, 0, -14);
line(18, 0.07, 0, 14);
verticalLine(0.07, 28, -9, 0);
verticalLine(0.07, 28, 9, 0);
line(18, 0.07, 0, -0.03);

const centerCircle = new THREE.Mesh(
  new THREE.RingGeometry(2.2, 2.27, 64),
  new THREE.MeshBasicMaterial({ color: 0xe9f7e9, side: THREE.DoubleSide })
);
centerCircle.rotation.x = -Math.PI / 2;
centerCircle.position.y = 0.04;
field.add(centerCircle);

function addBox(z) {
  line(7, 0.07, 0, z);
  verticalLine(0.07, 5, -3.5, z > 0 ? z - 2.5 : z + 2.5);
  verticalLine(0.07, 5, 3.5, z > 0 ? z - 2.5 : z + 2.5);
}
addBox(11.5);
addBox(-11.5);

function addGoal(z, direction) {
  const goal = new THREE.Group();
  const frameMaterial = new THREE.MeshStandardMaterial({ color: 0xf4f4e9, roughness: 0.35 });
  const netMaterial = new THREE.MeshBasicMaterial({ color: 0xdce9e0, transparent: true, opacity: 0.28, wireframe: true });
  const postGeometry = new THREE.BoxGeometry(0.18, 2.4, 0.18);
  [-3.2, 3.2].forEach((x) => {
    const post = new THREE.Mesh(postGeometry, frameMaterial);
    post.position.set(x, 1.2, z);
    goal.add(post);
  });
  const crossbar = new THREE.Mesh(new THREE.BoxGeometry(6.55, 0.18, 0.18), frameMaterial);
  crossbar.position.set(0, 2.4, z);
  goal.add(crossbar);
  const net = new THREE.Mesh(new THREE.BoxGeometry(6.4, 2.3, 1.5), netMaterial);
  net.position.set(0, 1.15, z + direction * 0.72);
  goal.add(net);
  field.add(goal);
}

addGoal(-14, -1);
addGoal(14, 1);

function makePlayer(color, scale = 1, card = null, isBot = false) {
  const group = new THREE.Group();
  group.userData.card = card;
  group.userData.isBot = isBot;
  const jerseyMaterial = new THREE.MeshStandardMaterial({ color, roughness: 0.58 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.29 * scale, 0.62 * scale, 8, 16), jerseyMaterial);
  body.position.y = 0.72 * scale;
  body.castShadow = true;
  group.add(body);
  const shorts = new THREE.Mesh(
    new THREE.BoxGeometry(0.56 * scale, 0.24 * scale, 0.38 * scale),
    new THREE.MeshStandardMaterial({ color: 0x17202a, roughness: 0.7 })
  );
  shorts.position.y = 0.35 * scale;
  shorts.castShadow = true;
  group.add(shorts);
  [-0.15, 0.15].forEach((x) => {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.085 * scale, 0.12 * scale, 0.52 * scale, 10),
      new THREE.MeshStandardMaterial({ color: 0xd99e73, roughness: 0.8 })
    );
    leg.position.set(x * scale, 0.06 * scale, 0);
    leg.castShadow = true;
    group.add(leg);
    const boot = new THREE.Mesh(
      new THREE.BoxGeometry(0.2 * scale, 0.1 * scale, 0.32 * scale),
      new THREE.MeshStandardMaterial({ color: 0x101418, roughness: 0.45 })
    );
    boot.position.set(x * scale, -0.2 * scale, -0.05 * scale);
    boot.castShadow = true;
    group.add(boot);
  });
  [-1, 1].forEach((side) => {
    const arm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065 * scale, 0.085 * scale, 0.52 * scale, 10),
      new THREE.MeshStandardMaterial({ color: 0xd99e73, roughness: 0.8 })
    );
    arm.position.set(side * 0.37 * scale, 0.73 * scale, 0);
    arm.rotation.z = side * -0.28;
    arm.castShadow = true;
    group.add(arm);
  });
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1 * scale, 0.12 * scale, 0.16 * scale, 12),
    new THREE.MeshStandardMaterial({ color: 0xb97852, roughness: 0.72 })
  );
  neck.position.y = 1.18 * scale;
  neck.castShadow = true;
  group.add(neck);
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.225 * scale, 20, 14),
    new THREE.MeshStandardMaterial({ color: 0xb97852, roughness: 0.72 })
  );
  head.position.y = 1.28 * scale;
  head.castShadow = true;
  group.add(head);
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.225 * scale, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.48),
    new THREE.MeshStandardMaterial({ color: isBot ? 0x29211d : 0x17191b, roughness: 0.86 })
  );
  hair.position.y = 1.38 * scale;
  hair.castShadow = true;
  group.add(hair);
  if (card?.name) {
    const label = document.createElement("canvas");
    label.width = 420;
    label.height = 72;
    const context = label.getContext("2d");
    context.fillStyle = "rgba(7, 16, 13, 0.78)";
    context.roundRect(4, 4, 412, 64, 18);
    context.fill();
    context.font = "700 25px Arial";
    context.textAlign = "center";
    context.fillStyle = "#ffffff";
    context.fillText(isBot ? `BOT · ${card.name}` : card.name, 210, 42);
    const labelSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(label), transparent: true, depthTest: false }));
    labelSprite.position.set(0, 2.02 * scale, 0);
    labelSprite.scale.set(1.42 * scale, 0.24 * scale, 1);
    labelSprite.userData.playerLabel = true;
    labelSprite.userData.labelCanvas = label;
    group.add(labelSprite);
  }
  return group;
}

const controlled = makePlayer(0xf1bf35, 1.15, { name: "YOU" });
const homeFormation = [
  [0, 11], [-4.2, 7], [0, 7], [4.2, 7], [-5.2, 3], [-1.8, 3], [1.8, 3], [5.2, 3],
  [-1.2, -1.5], [3.8, -1.5]
];
const awayFormation = [
  [0, -11], [-4.2, -7], [0, -7], [4.2, -7], [-5.2, -3], [-1.8, -3], [1.8, -3], [5.2, -3],
  [-3.8, 1.5], [1.2, 1.5], [0, 5]
];
const homePlayers = homeFormation.map(([x, z], index) => {
  const player = makePlayer(0x2479d0, 0.88, { name: `Player ${index + 1}` });
  player.position.set(x, 0, z);
  field.add(player);
  return player;
});
const awayPlayers = awayFormation.map(([x, z], index) => {
  const player = makePlayer(0xb83d48, 0.92, { name: `Rival Bot ${index + 1}` }, true);
  player.position.set(x, 0, z);
  field.add(player);
  return player;
});
field.add(controlled);
const homeBasePositions = homePlayers.map((player) => player.position.clone());
const awayBasePositions = awayPlayers.map((player) => player.position.clone());

const ball = new THREE.Mesh(
  new THREE.SphereGeometry(0.18, 16, 12),
  new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })
);
ball.position.y = 0.18;
ball.castShadow = true;
field.add(ball);

const stadium = new THREE.Group();
for (let side = -1; side <= 1; side += 2) {
  for (let row = 0; row < 3; row += 1) {
    const stand = new THREE.Mesh(
      new THREE.BoxGeometry(1.45, 0.42, 29),
      new THREE.MeshStandardMaterial({ color: row % 2 ? 0x344f63 : 0x415d6d, roughness: 1 })
    );
    stand.position.set(side * (9.9 + row * 0.65), 0.45 + row * 0.48, 0);
    stand.castShadow = true;
    stadium.add(stand);
  }
}
for (let end = -1; end <= 1; end += 2) {
  for (let row = 0; row < 2; row += 1) {
    const stand = new THREE.Mesh(
      new THREE.BoxGeometry(22, 0.42, 1.1),
      new THREE.MeshStandardMaterial({ color: row ? 0x3b5961 : 0x536a70, roughness: 1 })
    );
    stand.position.set(0, 0.42 + row * 0.5, end * 16);
    stand.castShadow = true;
    stadium.add(stand);
  }
}
scene.add(stadium);

let targetCamera = new THREE.Vector3();
let currentMatch = null;
let matchTime = 0;
let lastBotTouch = 0;
const textureLoader = new THREE.TextureLoader();

function applyPortrait(url) {
  if (!url || controlled.userData.portraitUrl === url) return;
  controlled.userData.portraitUrl = url;
  textureLoader.load(url, (texture) => {
    const portrait = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }));
    portrait.position.set(0, 1.55, 0);
    portrait.scale.set(0.62, 0.82, 1);
    portrait.userData.isPortrait = true;
    controlled.children.filter((child) => child.userData.isPortrait).forEach((child) => controlled.remove(child));
    controlled.add(portrait);
  });
}

function applyPortraitToPlayer(player, url) {
  if (!url || player.userData.portraitUrl === url) return;
  player.userData.portraitUrl = url;
  textureLoader.load(url, (texture) => {
    const portrait = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }));
    portrait.position.set(0, 1.43, 0.19);
    portrait.scale.set(0.42, 0.58, 1);
    portrait.userData.isPortrait = true;
    player.children.filter((child) => child.userData.isPortrait).forEach((child) => player.remove(child));
    player.add(portrait);
  });
}

function setPlayerCard(player, card, isBot = false) {
  if (!card) return;
  player.userData.card = card;
  player.userData.isBot = isBot;
  const labelSprite = player.children.find((child) => child.userData.playerLabel);
  if (labelSprite?.userData.labelCanvas) {
    const context = labelSprite.userData.labelCanvas.getContext("2d");
    context.clearRect(0, 0, 420, 72);
    context.fillStyle = "rgba(7, 16, 13, 0.78)";
    context.roundRect(4, 4, 412, 64, 18);
    context.fill();
    context.font = "700 25px Arial";
    context.textAlign = "center";
    context.fillStyle = "#ffffff";
    context.fillText(isBot ? `BOT · ${card.name}` : card.name, 210, 42);
    labelSprite.material.map.needsUpdate = true;
  }
  applyPortraitToPlayer(player, card.image);
}

function mapX(value) {
  return ((value - 50) / 100) * 18;
}

function mapZ(value) {
  return ((value - 50) / 100) * 28;
}

function update(match) {
  currentMatch = match;
  if (!match) return;
  applyPortrait(match.playerImage);
  const realTeam = Array.isArray(match.homeTeam) ? match.homeTeam : [];
  const fieldCards = realTeam.filter((card) => !card.controlled);
  homePlayers.forEach((player, index) => setPlayerCard(player, fieldCards[index] || { name: `Bot ${index + 1}` }, !fieldCards[index]?.name));
  const controlledCard = realTeam.find((card) => card.controlled) || realTeam[0];
  setPlayerCard(controlled, controlledCard || { name: "YOU" });
  controlled.position.set(mapX(match.playerX), 0, mapZ(match.playerY));
  ball.position.set(mapX(match.ballX), 0.18, mapZ(match.ballY));
  targetCamera.set(controlled.position.x * 0.36, 10.5, controlled.position.z + 12.5);
}

function resize() {
  const width = canvas.clientWidth || 1;
  const height = canvas.clientHeight || 1;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  resize();
  matchTime += 0.016;
  homePlayers.forEach((player, index) => {
    const base = homeBasePositions[index];
    const supportRun = index === 8 || index === 9;
    const targetX = base.x + Math.sin(matchTime * (0.55 + index * 0.03) + index) * (supportRun ? 0.75 : 0.28);
    const targetZ = base.z + Math.cos(matchTime * (0.48 + index * 0.02) + index) * (supportRun ? 0.5 : 0.22);
    player.position.lerp(new THREE.Vector3(targetX, 0, targetZ), 0.045);
  });
  awayPlayers.forEach((player, index) => {
    const base = awayBasePositions[index];
    const ballDistance = player.position.distanceTo(ball.position);
    const isChaser = index === awayPlayers.reduce((best, candidate, candidateIndex) => {
      return candidate.position.distanceTo(ball.position) < awayPlayers[best].position.distanceTo(ball.position) ? candidateIndex : best;
    }, 0);
    const pressing = index === 8 || index === 9;
    const chaseBall = isChaser || (pressing && ballDistance < 7);
    const target = chaseBall
      ? new THREE.Vector3(ball.position.x, 0, ball.position.z)
      : new THREE.Vector3(
        base.x + (controlled.position.x - base.x) * 0.08 + Math.sin(matchTime * (0.42 + index * 0.04) + index) * 0.3,
        0,
        base.z + (controlled.position.z - base.z) * 0.05 + Math.cos(matchTime * (0.5 + index * 0.02) + index) * 0.24
      );
    player.position.lerp(target, chaseBall ? 0.075 : 0.04);
    if (currentMatch && isChaser && ballDistance < 0.82 && matchTime - lastBotTouch > 2.4) {
      lastBotTouch = matchTime;
      ball.position.set(player.position.x, 0.18, player.position.z);
      currentMatch.botPossession = true;
      currentMatch.botName = player.userData.card?.name || `Rival Bot ${index + 1}`;
    }
  });
  camera.position.lerp(targetCamera, 0.08);
  camera.lookAt(controlled.position.x, 0, controlled.position.z - 1.5);
  controlled.rotation.y += currentMatch?.sprinting ? 0.045 : 0.018;
  renderer.render(scene, camera);
}

window.match3D = { update };
window.addEventListener("resize", resize);
resize();
animate();
