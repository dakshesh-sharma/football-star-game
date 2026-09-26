import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const pitchPhysics = window.FCMatchPhysics;
const pitchDimensions = pitchPhysics.pitch;

const canvas = document.querySelector("#matchCanvas");
if (!canvas) throw new Error("Match canvas was not found.");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x12251f);
scene.fog = new THREE.Fog(0x12251f, 31, 58);

const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
camera.position.set(0, 11, 17);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;

scene.add(new THREE.HemisphereLight(0xeaf7ff, 0x14261d, 1.7));
const sun = new THREE.DirectionalLight(0xffffff, 2.4);
sun.position.set(-8, 18, 10);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -18;
sun.shadow.camera.right = 18;
sun.shadow.camera.top = 22;
sun.shadow.camera.bottom = -22;
scene.add(sun);

const field = new THREE.Group();
scene.add(field);

// One small procedural texture supplies mowing bands and subtle turf variation.
const turfCanvas=document.createElement("canvas");turfCanvas.width=256;turfCanvas.height=512;
const turf=turfCanvas.getContext("2d");let seed=4173;
for(let y=0;y<512;y++)for(let x=0;x<256;x++){
  seed=(Math.imul(seed,1664525)+1013904223)>>>0;
  const noise=(seed>>>30)-2,light=Math.floor(y/512*14)%2?9:0;
  turf.fillStyle=`rgb(${24+noise},${91+light+noise},${51+noise})`;turf.fillRect(x,y,1,1);
}
const turfTexture=new THREE.CanvasTexture(turfCanvas);turfTexture.colorSpace=THREE.SRGBColorSpace;
turfTexture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
const grass=new THREE.Mesh(new THREE.PlaneGeometry(18,28),
  new THREE.MeshStandardMaterial({map:turfTexture,roughness:1}));
grass.rotation.x=-Math.PI/2;grass.receiveShadow=true;field.add(grass);
const markingMaterial=new THREE.MeshBasicMaterial({color:0xe9f1e6});

function line(width, depth, x, z) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.035, depth),
    markingMaterial
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

const centerCircle = new THREE.Mesh(
  new THREE.RingGeometry(2.2, 2.27, 64),
  new THREE.MeshBasicMaterial({ color: 0xe9f7e9, side: THREE.DoubleSide })
);
centerCircle.rotation.x = -Math.PI / 2;
centerCircle.position.y = 0.04;
field.add(centerCircle);

function addSpot(z) {
  const spot=new THREE.Mesh(new THREE.CircleGeometry(0.075,12),markingMaterial);
  spot.rotation.x=-Math.PI/2;spot.position.set(0,0.042,z);field.add(spot);
}
addSpot(0);
for(const sign of [-1,1]) {
  // Both boxes join the goal line, with the smaller box outside the goal mouth.
  for(const [width,depth] of [[11,5],[7.8,2]]) {
    line(width,0.07,0,sign*(14-depth));
    for(const side of [-1,1])line(0.07,depth,side*width/2,sign*(14-depth/2));
  }
  addSpot(sign*10.5);
}

const goalNets=[];
const frameMaterial=new THREE.MeshStandardMaterial({color:0xf4f4e9,roughness:0.4});
const postGeometry=new THREE.CylinderGeometry(pitchDimensions.postRadius,pitchDimensions.postRadius,pitchDimensions.goalHeight,10);
const barGeometry=new THREE.CylinderGeometry(pitchDimensions.postRadius,pitchDimensions.postRadius,pitchDimensions.goalHalfWidth*2,10);
const netMaterial=new THREE.LineBasicMaterial({color:0xdce9e0,transparent:true,opacity:0.32});
function addGoal(sign) {
  const z=sign*pitchDimensions.halfLength,w=pitchDimensions.goalHalfWidth,h=pitchDimensions.goalHeight,depth=1.5;
  for(const x of [-w,w]){
    const post=new THREE.Mesh(postGeometry,frameMaterial);post.position.set(x,h/2,z);post.castShadow=true;field.add(post);
  }
  const bar=new THREE.Mesh(barGeometry,frameMaterial);bar.rotation.z=Math.PI/2;bar.position.set(0,h,z);bar.castShadow=true;field.add(bar);
  const points=[],segment=(a,b)=>points.push(...a,...b);
  // Back, roof, and two sides; the goal mouth is open.
  for(let i=0;i<=32;i++){
    const x=-w+2*w*i/32;
    segment([x,0,z+sign*depth],[x,h,z+sign*depth]);
    segment([x,h,z],[x,h,z+sign*depth]);
  }
  for(let j=0;j<=12;j++){
    const y=h*j/12;segment([-w,y,z+sign*depth],[w,y,z+sign*depth]);
    for(const x of [-w,w])segment([x,y,z],[x,y,z+sign*depth]);
  }
  for(let k=0;k<=8;k++){
    const nz=z+sign*depth*k/8;segment([-w,h,nz],[w,h,nz]);
    for(const x of [-w,w])segment([x,0,nz],[x,h,nz]);
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute("position",new THREE.Float32BufferAttribute(points,3));
  const net=new THREE.LineSegments(geometry,netMaterial);
  net.userData={rest:Float32Array.from(points),sign,hitAt:-10,hitX:0};goalNets.push(net);field.add(net);
}
addGoal(-1);addGoal(1);

const playerMaterials = new Map();
const playerShapes = new Map();
function playerMaterial(color) {
  if (!playerMaterials.has(color)) playerMaterials.set(color, new THREE.MeshStandardMaterial({ color, roughness: 0.8 }));
  return playerMaterials.get(color);
}
function playerShape(key, factory) {
  if (!playerShapes.has(key)) playerShapes.set(key, factory());
  return playerShapes.get(key);
}
function makePlayer(color, index) {
  const group = new THREE.Group();
  group.scale.setScalar(0.78);
  group.userData.legs = []; group.userData.knees = []; group.userData.arms = []; group.userData.boots = [];
  const skin = playerMaterial([0xb97852,0xd5a17b,0x734a34,0xa56a46][index % 4]);
  const kit = playerMaterial(color), dark = playerMaterial(0x172a38), boots = playerMaterial(index % 3 ? 0x172229 : 0xe8d061);
  const mesh = (shape, material, parent, x, y, z) => {
    const m = new THREE.Mesh(shape, material); m.position.set(x,y,z); m.castShadow = true; parent.add(m); return m;
  };
  const torso = mesh(playerShape("torso", () => new THREE.CapsuleGeometry(0.235,0.34,4,8)), kit, group,0,0.99,0);
  torso.scale.z = 0.75; group.userData.body = torso;
  mesh(playerShape("shorts", () => new THREE.BoxGeometry(0.46,0.22,0.3)),dark,group,0,0.65,0);
  for (const side of [-1,1]) {
    const hip = new THREE.Group(); hip.position.set(side*0.13,0.60,0); group.add(hip);
    mesh(playerShape("thigh",()=>new THREE.CylinderGeometry(0.09,0.075,0.27,7)),skin,hip,0,-0.135,0);
    const knee = new THREE.Group(); knee.position.y=-0.27; hip.add(knee);
    mesh(playerShape("shin",()=>new THREE.CylinderGeometry(0.065,0.05,0.25,7)),kit,knee,0,-0.125,0);
    const boot = mesh(playerShape("boot",()=>new THREE.BoxGeometry(0.15,0.1,0.27)),boots,knee,0,-0.26,0.06);
    group.userData.legs.push(hip); group.userData.knees.push(knee); group.userData.boots.push(boot);
    const shoulder = new THREE.Group(); shoulder.position.set(side*0.30,1.16,0); group.add(shoulder);
    mesh(playerShape("sleeve",()=>new THREE.CylinderGeometry(0.085,0.07,0.18,7)),kit,shoulder,0,-0.09,0);
    mesh(playerShape("forearm",()=>new THREE.CylinderGeometry(0.058,0.05,0.27,7)),skin,shoulder,0,-0.29,0.02);
    group.userData.arms.push(shoulder);
  }
  mesh(playerShape("neck",()=>new THREE.CylinderGeometry(0.075,0.08,0.12,7)),skin,group,0,1.29,0);
  mesh(playerShape("head",()=>new THREE.SphereGeometry(0.18,10,8)),skin,group,0,1.46,0);
  mesh(playerShape("hair",()=>new THREE.SphereGeometry(0.185,10,6,0,Math.PI*2,0,Math.PI*0.48)),playerMaterial(index%4?0x25201d:0x473527),group,0,1.47,0);
  const label=document.createElement("canvas"); label.width=256; label.height=48;
  const texture = new THREE.CanvasTexture(label);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,depthTest:false}));
  sprite.position.set(0,1.98,0); sprite.scale.set(2.1,0.39,1); sprite.visible=false;
  group.add(sprite); group.userData.label=sprite; group.userData.labelCanvas=label;
  field.add(group); return group;
}

const homePlayers=Array.from({length:11},(_,i)=>makePlayer(i===0?0xe4af4b:0x287ec4,i));
const awayPlayers=Array.from({length:11},(_,i)=>makePlayer(i===0?0x77bd85:0xc44e59,i+2));
const controlledIndicator=new THREE.Mesh(new THREE.RingGeometry(0.36,0.43,32),
  new THREE.MeshBasicMaterial({color:0xffdf74,side:THREE.DoubleSide,transparent:true,opacity:0.9}));
controlledIndicator.rotation.x=-Math.PI/2; field.add(controlledIndicator);

const ballTextureCanvas = document.createElement("canvas");
ballTextureCanvas.width = 256;
ballTextureCanvas.height = 128;
const ballTextureContext = ballTextureCanvas.getContext("2d");
ballTextureContext.fillStyle = "#f4f1e8";
ballTextureContext.fillRect(0, 0, 256, 128);
ballTextureContext.fillStyle = "#181c1c";
[[32, 30], [92, 72], [154, 28], [218, 76], [26, 111], [184, 112]].forEach(([x, y]) => {
  ballTextureContext.beginPath();
  for (let side = 0; side < 5; side += 1) {
    const angle = -Math.PI / 2 + side * Math.PI * 0.4;
    const px = x + Math.cos(angle) * 10;
    const py = y + Math.sin(angle) * 10;
    if (side === 0) ballTextureContext.moveTo(px, py); else ballTextureContext.lineTo(px, py);
  }
  ballTextureContext.closePath();
  ballTextureContext.fill();
});
const ballTexture = new THREE.CanvasTexture(ballTextureCanvas);
ballTexture.colorSpace = THREE.SRGBColorSpace;
const ball = new THREE.Mesh(
  new THREE.SphereGeometry(0.18, 16, 12),
  new THREE.MeshStandardMaterial({ map: ballTexture, roughness: 0.48 })
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

const crowdGeometry = new THREE.BoxGeometry(0.1, 0.18, 0.1);
const crowdMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 });
const crowd = new THREE.InstancedMesh(crowdGeometry, crowdMaterial, 520);
const crowdDummy = new THREE.Object3D();
const crowdColors = [0xf2c14e, 0xe95d4f, 0x4ea7f2, 0xe7eceb, 0x243b53];
for (let index = 0; index < 520; index += 1) {
  const side = index % 2 ? -1 : 1;
  const row = index % 4;
  crowdDummy.position.set(side * (9.55 + row * 0.46), 0.92 + row * 0.43, -13.5 + ((index * 0.73) % 27));
  crowdDummy.rotation.y = side * Math.PI * 0.5;
  crowdDummy.updateMatrix();
  crowd.setMatrixAt(index, crowdDummy.matrix);
  crowd.setColorAt(index, new THREE.Color(crowdColors[index % crowdColors.length]));
}
crowd.instanceMatrix.needsUpdate = true;
if (crowd.instanceColor) crowd.instanceColor.needsUpdate = true;
crowd.castShadow = false;
scene.add(crowd);

const targetCamera = new THREE.Vector3();
const targetLook = new THREE.Vector3();
const currentLook = new THREE.Vector3();
let currentMatch = null;
let lastVisualEvent=0;
let shotImpulseAt=-10;
let shotImpulsePower=0;
function setPlayerCard(player, name) {
  if (player.userData.name === name) return;
  player.userData.name=name;
  const context=player.userData.labelCanvas.getContext("2d");
  context.clearRect(0,0,256,48); context.fillStyle="rgba(8,19,27,0.85)";
  context.beginPath(); context.roundRect(2,2,252,44,10);context.fill();
  context.font="600 19px system-ui";context.textAlign="center";context.fillStyle="#fff";
  context.fillText(name.replace(/^Bot /i,"").slice(0,24),128,30);
  player.userData.label.material.map.needsUpdate=true;
}

function mapX(value) {
  return pitchPhysics.x(value);
}

function mapZ(value) {
  return pitchPhysics.z(value);
}

function update(match) {
  if (currentMatch !== match) {
    lastVisualEvent=match?.eventSequence||0;shotImpulseAt=-10;
    goalNets.forEach(net=>net.userData.hitAt=-10);
  }
  currentMatch=match;
  if (!match) return;
  requestMatchFrame();
  for (const team of ["home","away"]) {
    const meshes=team==="home"?homePlayers:awayPlayers;
    (match[team+"Players"]||[]).forEach((p,i)=>{
      meshes[i].userData.unit=p; meshes[i].userData.playerId=p.id;
      setPlayerCard(meshes[i],p.name);
    });
  }
}

let lastWidth=0,lastHeight=0;
function resize() {
  const width = canvas.clientWidth || 1;
  const height = canvas.clientHeight || 1;
  if(width===lastWidth && height===lastHeight)return;
  lastWidth=width;lastHeight=height;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function animatePlayer(mesh,p,dt) {
  const rig=mesh.userData, blend=1-Math.exp(-22*dt);
  const movement=THREE.MathUtils.clamp((p.speed||0)/3.2,0,1.25);
  const phase=p.stride||0, stride=Math.sin(phase)*0.72*movement;
  const now=currentMatch.simulationTime, a=p.action;
  const active=a && now<a.until;
  const celebrate=active && a.kind==="celebrate";
  const kick=active && ["pass","through","shoot","cross","dribble"].includes(a.kind);
  const tackle=active && a.kind==="tackle";
  let kickPose=0, actionWeight=0;
  if (active) {
    const elapsed=now-a.start,duration=a.until-a.start;
    actionWeight=Math.sin(Math.PI*THREE.MathUtils.clamp(elapsed/duration,0,1));
    if(kick) {
      const contact=a.contactAt-a.start;
      if(elapsed<contact*0.5) kickPose=0.65*elapsed/(contact*0.5);
      else if(elapsed<contact) kickPose=THREE.MathUtils.lerp(0.65,-1,(elapsed-contact*0.5)/(contact*0.5));
      else kickPose=-Math.pow(1-(elapsed-contact)/(duration-contact),2);
    }
  }
  rig.legs.forEach((hip,i)=>{
    let target=i?-stride:stride;
    if(kick && i===1)target=kickPose;
    if(tackle)target=(i?-1.2:0.7)*actionWeight;
    hip.rotation.x=THREE.MathUtils.lerp(hip.rotation.x,target,blend);
    const knee=rig.knees[i];
    let kneeTarget=Math.max(0,Math.sin(phase+(i?Math.PI:0)))*0.72*movement;
    if(kick && i===1)kneeTarget=Math.max(0,kickPose)*0.8;
    if(tackle)kneeTarget=i?0:1.1*actionWeight;
    knee.rotation.x=THREE.MathUtils.lerp(knee.rotation.x,kneeTarget,blend);
  });
  const dive=p.dive && now<p.dive.until;
  const diveWeight=dive?Math.sin(Math.PI*THREE.MathUtils.clamp((now-p.dive.start)/(p.dive.until-p.dive.start),0,1)):0;
  rig.arms.forEach((arm,i)=>{
    const side=i?1:-1;
    let ax=(i?stride:-stride)*0.45,az=side*0.12;
    if(celebrate){ax=-0.2;az=side*2.45*actionWeight;}
    if(dive){ax=-0.95*diveWeight;az=side*1.05*diveWeight;}
    arm.rotation.x=THREE.MathUtils.lerp(arm.rotation.x,ax,blend);
    arm.rotation.z=THREE.MathUtils.lerp(arm.rotation.z,az,blend);
  });
  rig.body.rotation.x=THREE.MathUtils.lerp(rig.body.rotation.x,tackle?-0.3*actionWeight:0.055*movement,blend);
  const tilt=dive?-p.dive.direction*Math.cos(p.facing)*0.95*diveWeight:0;
  mesh.rotation.z=THREE.MathUtils.lerp(mesh.rotation.z,tilt,blend);
  mesh.position.y=dive?diveWeight*0.15:celebrate?Math.sin(actionWeight*Math.PI)*0.12:0;
}

let previousFrameTime=0,renderFrame=0;
function requestMatchFrame(){
  if(!renderFrame && currentMatch && !document.hidden && canvas.offsetParent!==null){
    previousFrameTime=performance.now();renderFrame=requestAnimationFrame(animate);
  }
}
function animate(time=performance.now()) {
  renderFrame=0;
  const dt=Math.min(0.05,Math.max(0,(time-previousFrameTime)/1000));previousFrameTime=time;
  if (!currentMatch || document.hidden || canvas.offsetParent===null) return;
  renderFrame=requestAnimationFrame(animate);
  resize();
  const match=currentMatch, alpha=match.renderAlpha??1;
  for(const team of ["home","away"]) {
    const meshes=team==="home"?homePlayers:awayPlayers;
    (match[team+"Players"]||[]).forEach((p,i)=>{
      const mesh=meshes[i];
      mesh.position.set(mapX(THREE.MathUtils.lerp(p.previousX??p.x,p.x,alpha)),0,mapZ(THREE.MathUtils.lerp(p.previousY??p.y,p.y,alpha)));
      mesh.rotation.y=p.facing;
      mesh.userData.label.visible=team==="home"&&i===match.controlledPlayerIndex;
      animatePlayer(mesh,p,dt);
    });
  }
  const controlled=homePlayers[match.controlledPlayerIndex];
  controlledIndicator.position.set(controlled.position.x,0.027,controlled.position.z);
  const previous=match.previousBall;
  const nextX=mapX(THREE.MathUtils.lerp(previous?.x??match.ballX,match.ballX,alpha));
  const nextZ=mapZ(THREE.MathUtils.lerp(previous?.y??match.ballY,match.ballY,alpha));
  ball.rotation.x+=(nextZ-ball.position.z)/pitchDimensions.ballRadius;
  ball.rotation.z-=(nextX-ball.position.x)/pitchDimensions.ballRadius;
  ball.position.set(nextX,pitchDimensions.ballRadius+THREE.MathUtils.lerp(previous?.h??match.ballHeight,match.ballHeight,alpha),nextZ);
  const playX=THREE.MathUtils.clamp(controlled.position.x*0.2+ball.position.x*0.8,-5.4,5.4);
  const playZ=THREE.MathUtils.clamp(controlled.position.z*0.15+ball.position.z*0.85,-9,9);
  const speed=Math.hypot(match.ballVX*0.18,match.ballVY*0.28);
  const zoom=THREE.MathUtils.clamp(controlled.position.distanceTo(ball.position)*0.09+speed*0.055,0,2.6);
  // A stable elevated view; damping is independent of rendering frequency.
  targetCamera.set(playX*0.32,13.5+zoom*0.5,playZ+16+zoom);
  targetLook.set(playX,0,playZ-1.7);
  camera.position.lerp(targetCamera,1-Math.exp(-3*dt));
  currentLook.lerp(targetLook,1-Math.exp(-4.5*dt));
  for(const event of match.events||[]){
    if(event.id<=lastVisualEvent)continue;
    if(event.type==="kick" && event.action==="shoot" && event.power>0.7){
      shotImpulseAt=event.time;shotImpulsePower=event.power;
    }
    if(event.type==="goal"){
      const net=goalNets.find(n=>n.userData.sign===(event.team==="home"?-1:1));
      if(net){net.userData.hitAt=event.time;net.userData.hitX=mapX(event.ballX);}
    }
    lastVisualEvent=event.id;
  }
  const age=match.simulationTime-shotImpulseAt;
  const impulse=age>=0 && age<0.35?Math.sin(age/0.35*Math.PI)*shotImpulsePower*0.055:0;
  targetLook.copy(currentLook);targetLook.y+=impulse;camera.lookAt(targetLook);
  for(const net of goalNets){
    const data=net.userData,age=match.simulationTime-data.hitAt;
    if(age<0 || age>1.5 && !data.deforming)continue;
    const points=net.geometry.attributes.position;
    for(let i=0;i<points.count;i++){
      const x=data.rest[i*3],y=data.rest[i*3+1],z=data.rest[i*3+2];
      const depth=Math.min(1,Math.abs(z-data.sign*14)/1.5);
      const pulse=age<1.5?Math.sin(age*17)*Math.exp(-age*3.5)*0.24:0;
      points.setZ(i,z+data.sign*pulse*depth*Math.exp(-Math.pow(x-data.hitX,2)/5)*Math.sin(Math.PI*y/2.4));
    }
    points.needsUpdate=true;data.deforming=age<1.5;
  }

  renderer.render(scene,camera);
}

window.match3D = {
  update,
  inspect: () => ({ players:[...homePlayers,...awayPlayers].map(mesh=>({
    id:mesh.userData.playerId,mesh:mesh.uuid,x:mesh.position.x,z:mesh.position.z,
    attachedBoots:mesh.userData.boots.every((boot,i)=>boot.parent===mesh.userData.knees[i])
  })),camera:camera.position.toArray(),drawCalls:renderer.info.render.calls,geometries:renderer.info.memory.geometries,rendering:Boolean(renderFrame),lastVisualEvent })
};
window.addEventListener("resize",()=>{resize();requestMatchFrame();});
document.addEventListener("visibilitychange",requestMatchFrame);
resize();
