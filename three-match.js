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

function makePlayer(color, scale = 1) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.34 * scale, 0.62 * scale, 5, 10),
    new THREE.MeshStandardMaterial({ color, roughness: 0.6 })
  );
  body.position.y = 0.58 * scale;
  body.castShadow = true;
  group.add(body);
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.22 * scale, 12, 8),
    new THREE.MeshStandardMaterial({ color: 0xd99e73, roughness: 0.8 })
  );
  head.position.y = 1.28 * scale;
  head.castShadow = true;
  group.add(head);
  return group;
}

const controlled = makePlayer(0xf1bf35, 1.15);
const teammate = makePlayer(0x327ed5, 0.88);
const opponent = makePlayer(0xd9554f, 0.95);
field.add(controlled, teammate, opponent);

const ball = new THREE.Mesh(
  new THREE.SphereGeometry(0.18, 16, 12),
  new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })
);
ball.position.y = 0.18;
ball.castShadow = true;
field.add(ball);

const stadium = new THREE.Group();
for (let side = -1; side <= 1; side += 2) {
  const stand = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 2.2, 30),
    new THREE.MeshStandardMaterial({ color: side < 0 ? 0x273f56 : 0x344a39, roughness: 1 })
  );
  stand.position.set(side * 10.2, 1.1, 0);
  stand.castShadow = true;
  stadium.add(stand);
}
scene.add(stadium);

let targetCamera = new THREE.Vector3();
let currentMatch = null;

function mapX(value) {
  return ((value - 50) / 100) * 18;
}

function mapZ(value) {
  return ((value - 50) / 100) * 28;
}

function update(match) {
  currentMatch = match;
  if (!match) return;
  controlled.position.set(mapX(match.playerX), 0, mapZ(match.playerY));
  teammate.position.set(mapX(Math.min(92, match.playerX + 18)), 0, mapZ(Math.max(12, match.playerY - 14)));
  opponent.position.set(mapX(Math.max(12, match.playerX + 30)), 0, mapZ(Math.min(88, match.playerY + 7)));
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
  camera.position.lerp(targetCamera, 0.08);
  camera.lookAt(controlled.position.x, 0, controlled.position.z - 1.5);
  controlled.rotation.y += currentMatch?.sprinting ? 0.045 : 0.018;
  renderer.render(scene, camera);
}

window.match3D = { update };
window.addEventListener("resize", resize);
resize();
animate();
