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

function makePlayer(color, scale = 1) {
  const group = new THREE.Group();
  const jerseyMaterial = new THREE.MeshStandardMaterial({ color, roughness: 0.58 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.31 * scale, 0.55 * scale, 5, 10), jerseyMaterial);
  body.position.y = 0.72 * scale;
  body.castShadow = true;
  group.add(body);
  const shorts = new THREE.Mesh(
    new THREE.BoxGeometry(0.52 * scale, 0.24 * scale, 0.34 * scale),
    new THREE.MeshStandardMaterial({ color: 0x17202a, roughness: 0.7 })
  );
  shorts.position.y = 0.35 * scale;
  shorts.castShadow = true;
  group.add(shorts);
  [-0.15, 0.15].forEach((x) => {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.095 * scale, 0.12 * scale, 0.48 * scale, 8),
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
      new THREE.CylinderGeometry(0.07 * scale, 0.09 * scale, 0.5 * scale, 8),
      new THREE.MeshStandardMaterial({ color: 0xd99e73, roughness: 0.8 })
    );
    arm.position.set(side * 0.37 * scale, 0.73 * scale, 0);
    arm.rotation.z = side * -0.28;
    arm.castShadow = true;
    group.add(arm);
  });
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.22 * scale, 12, 8),
    new THREE.MeshStandardMaterial({ color: 0xd99e73, roughness: 0.8 })
  );
  head.position.y = 1.28 * scale;
  head.castShadow = true;
  group.add(head);
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.225 * scale, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.48),
    new THREE.MeshStandardMaterial({ color: 0x17191b, roughness: 0.9 })
  );
  hair.position.y = 1.38 * scale;
  hair.castShadow = true;
  group.add(hair);
  return group;
}

const controlled = makePlayer(0xf1bf35, 1.15);
const homeFormation = [
  [0, 11], [-4.2, 7], [0, 7], [4.2, 7], [-5.2, 3], [-1.8, 3], [1.8, 3], [5.2, 3],
  [-1.2, -1.5], [3.8, -1.5]
];
const awayFormation = [
  [0, -11], [-4.2, -7], [0, -7], [4.2, -7], [-5.2, -3], [-1.8, -3], [1.8, -3], [5.2, -3],
  [-3.8, 1.5], [1.2, 1.5], [0, 5]
];
const homePlayers = homeFormation.map(([x, z]) => {
  const player = makePlayer(0x327ed5, 0.88);
  player.position.set(x, 0, z);
  field.add(player);
  return player;
});
const awayPlayers = awayFormation.map(([x, z]) => {
  const player = makePlayer(0xd9554f, 0.92);
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
    const pressing = index === 8 || index === 9;
    const pressX = pressing && currentMatch ? (controlled.position.x - base.x) * 0.12 : 0;
    const pressZ = pressing && currentMatch ? (controlled.position.z - base.z) * 0.08 : 0;
    const targetX = base.x + pressX + Math.sin(matchTime * (0.42 + index * 0.04) + index) * 0.3;
    const targetZ = base.z + pressZ + Math.cos(matchTime * (0.5 + index * 0.02) + index) * 0.24;
    player.position.lerp(new THREE.Vector3(targetX, 0, targetZ), 0.04);
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
