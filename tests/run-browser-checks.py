"""Run match regression fixtures against a dedicated local Chrome debugging profile.
Start the static server and open index.html in that profile first.
No pip dependencies. Example: python3 tests/run-browser-checks.py --port 9226
"""
import argparse, socket, urllib.request, urllib.parse, json, struct, os, base64, time
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument("--port",type=int,default=9226)
parser.add_argument("--screenshot",help="Write a PNG of the restored game page after checks")
parser.add_argument("--width",type=int,default=1440)
parser.add_argument("--height",type=int,default=1000)
parser.add_argument("--dashboard",action="store_true",help="Hide blocking dialogs before capturing the dashboard")
parser.add_argument("--view",choices=("Home","Season","Packs","Squad","Play","Club","Profile"),help="Dashboard view to capture")
parser.add_argument("--login",action="store_true",help="Show the login experience before capturing")
parser.add_argument("--prototype-lab",action="store_true",help="Run the standalone laptop prototype interaction checks")
parser.add_argument("--prime-demo",action="store_true",help="Click the login Prime Ronaldo showcase and verify the real squad card")
parser.add_argument("--visual-smoke",action="store_true",help="Open a visible match and verify the 3D renderer stays responsive")
parser.add_argument("--season",action="store_true",help="Verify career progression, reward pass, trophies and mobile screens")
parser.add_argument("--matchday",action="store_true",help="Verify match setup, pause, results, stats and radar")
args=parser.parse_args()
pages=json.load(urllib.request.urlopen(f'http://127.0.0.1:{args.port}/json/list'))
target_paths=('/prototypes.html',) if args.prototype_lab else ('/','/index.html')
page=next((p for p in pages if p['type']=='page'
  and urllib.parse.urlparse(p.get('url','')).hostname in ('127.0.0.1','localhost')
  and urllib.parse.urlparse(p.get('url','')).path in target_paths),None)
if not page:
 raise SystemExit('Open the requested local FC Stars page in the dedicated Chrome debugging profile first.')
u=urllib.parse.urlparse(page['webSocketDebuggerUrl'])
s=socket.create_connection((u.hostname,u.port),timeout=20)
key=base64.b64encode(os.urandom(16)).decode()
s.sendall(('GET '+u.path+' HTTP/1.1\r\nHost: '+u.netloc+'\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: '+key+'\r\nSec-WebSocket-Version: 13\r\n\r\n').encode())
header=b''
while not header.endswith(b'\r\n\r\n'): header+=s.recv(1)
assert b'101' in header,header
seq=0
events=[]
def exact(n):
 data=b''
 while len(data)<n:
  chunk=s.recv(n-len(data))
  if not chunk: raise RuntimeError('socket closed')
  data+=chunk
 return data
def call(method,params={}):
 global seq
 seq+=1
 data=json.dumps({'id':seq,'method':method,'params':params}).encode()
 n=len(data); mask=os.urandom(4)
 packet=bytes([129,128|n]) if n<126 else bytes([129,254])+struct.pack('!H',n) if n<65536 else bytes([129,255])+struct.pack('!Q',n)
 s.sendall(packet+mask+bytes(v^mask[i%4] for i,v in enumerate(data)))
 while True:
  a,b=exact(2); n=b&127
  if n==126:n=struct.unpack('!H',exact(2))[0]
  elif n==127:n=struct.unpack('!Q',exact(8))[0]
  msg=json.loads(exact(n))
  if msg.get('id')==seq:return msg
  events.append(msg)
def evaluate(js):
 r=call('Runtime.evaluate',{'expression':js,'returnByValue':True,'awaitPromise':True})
 if r.get('result',{}).get('exceptionDetails'):return r
 return r.get('result',{}).get('result',{}).get('value')

call("Runtime.enable")
call("Page.enable")
call("Page.bringToFront")
call("Emulation.setDeviceMetricsOverride",{"width":args.width,"height":args.height,"deviceScaleFactor":1,"mobile":args.width<800})
if args.season:
 result=evaluate("fetch('tests/season-tests.js',{cache:'no-store'}).then(r=>r.text()).then(source=>{(0,eval)(source);return runFCSeasonTests();})")
elif args.matchday:
 result=evaluate("fetch('tests/matchday-tests.js',{cache:'no-store'}).then(r=>r.text()).then(source=>{(0,eval)(source);return runFCMatchdayTests();})")
elif args.visual_smoke and not args.prototype_lab:
 result=evaluate("""(async()=>{for(let attempts=0;attempts<50&&(!window.match3D||!window.launchFCStarsMatch);attempts++)await new Promise(resolve=>setTimeout(resolve,100));showQuickLogin();document.querySelector('#primeRonaldoDemoBtn').click();await new Promise(resolve=>setTimeout(resolve,120));window.launchFCStarsMatch('Quick Match');document.querySelector('[data-md-kickoff]').click();await new Promise(resolve=>setTimeout(resolve,900));const info=window.match3D?.inspect();const finiteCamera=info?.camera?.every(Number.isFinite);return {passed:Boolean(info&&info.players.length===22&&finiteCamera&&Number.isFinite(info.drawCalls)&&info.drawCalls>0&&Number.isFinite(info.geometries)&&info.geometries>0&&info.rendering&&matchCanvas.width>0&&matchCanvas.height>0),players:info?.players.length,camera:info?.camera,drawCalls:info?.drawCalls,geometries:info?.geometries,rendering:info?.rendering,canvas:[matchCanvas.width,matchCanvas.height],score:matchScoreLabel.textContent};})()""")
elif args.prototype_lab:
 result=evaluate("""(async()=>{const results=[];const check=(name,value)=>results.push({name,passed:Boolean(value)});
	  if(innerWidth>=800){check('desktop prototype is visible',getComputedStyle(document.querySelector('#labDesktopPrototype')).display==='grid'&&getComputedStyle(document.querySelector('.phone')).display==='none');document.querySelector('[data-lab-desktop-view="packs"]').click();check('desktop packs view opens',Boolean(document.querySelector('#labDesktopWorkspace .pack-workspace')));document.querySelector('#labDesktopWorkspace [data-lab-desktop-open-pack]').click();check('desktop pack walkout renders',Boolean(document.querySelector('#labDesktopWorkspace .lab-desktop-walkout')));document.querySelector('[data-lab-desktop-view="squad"]').click();check('desktop squad view opens',Boolean(document.querySelector('#labDesktopWorkspace .squad-workspace')));}else{check('phone prototype is visible',getComputedStyle(document.querySelector('.phone')).display!=='none'&&getComputedStyle(document.querySelector('#labDesktopPrototype')).display==='none');}
  for(const screen of ['home','packs','squad','match','club','profile']){document.querySelector(`[data-screen="${screen}"]`).click();check(`${screen} opens`,document.querySelector(`[data-screen-panel="${screen}"]`).classList.contains('is-active'));}
  document.querySelector('[data-lab-profile-bg="royal"]').click();check('profile background changes',document.querySelector('#labProfileHero').classList.contains('background-royal'));document.querySelector('[data-lab-title]').click();check('profile title equips',document.querySelector('#labProfileTitle').textContent==='SIUUU STREAK');
  if(document.querySelector('#labBackgroundStudio').hidden)document.querySelector('#labSeeAllBackgrounds').click();check('background studio opens with three choices',!document.querySelector('#labBackgroundStudio').hidden&&document.querySelectorAll('[data-lab-bg-mode]').length===3&&document.querySelectorAll('#labBackgroundStudio [data-lab-profile-bg]').length===10);document.querySelector('[data-lab-bg-mode="ai"]').click();check('AI background uses real image generation',profileAiImageUrl('neon trophy night',42).startsWith('https://image.pollinations.ai/prompt/')&&profileAiImageUrl('neon trophy night',42).includes('model=flux'));
	  check('home shows Prime Ronaldo showcase',Boolean(document.querySelector('[data-screen-panel="home"] [data-go="squad"].prime-home-card'))&&document.querySelector('[data-screen-panel="home"] .prime-home-card').textContent.includes('PRIME RONALDO'));
  document.querySelector('[data-club-colour="cyan"]').click();check('preset colour changes whole theme',document.body.style.getPropertyValue('--club-primary')==='#087f9a');
  document.querySelector('#labSeeAllColours').click();const picker=document.querySelector('#labCustomColour');picker.value='#12ab67';picker.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('#labApplyCustomColour').click();check('custom colour is added and applied',document.body.style.getPropertyValue('--club-primary')==='#12ab67'&&document.querySelector('#labCustomSwatch').classList.contains('selected'));
  document.querySelector('#labClubName').value='TEST UNITED';document.querySelector('#labSaveClub').click();check('club name saves',document.querySelector('#labClubHeroName').textContent==='TEST UNITED');
  document.querySelector('[data-screen="packs"]').click();document.querySelector('#openPack').click();await new Promise(resolve=>setTimeout(resolve,750));check('pack opens',!document.querySelector('#revealCard').hidden);document.querySelector('#openPack').click();
  document.querySelector('[data-screen="squad"]').click();document.querySelector('.player-card').click();document.querySelector('#labSwapPlayer').click();check('squad player swaps',document.querySelector('#labTeamRating').textContent==='89');
  document.querySelector('[data-screen="match"]').click();document.querySelector('[data-match-action="pass"]').click();check('match action responds',document.querySelector('#labMoment').textContent.includes('PASS'));check('matchday graphics render',Boolean(document.querySelector('.match-crowd')&&document.querySelector('.match-status')&&document.querySelectorAll('.field-player small').length>=4));
  return {passed:results.every(item=>item.passed),results};})()""")
else:
 result=evaluate("""Promise.all(['tests/match-tests.js','tests/game-tests.js'].map(path=>fetch(path,{cache:'no-store'}).then(r=>r.text()))).then(sources=>{
  const running=Boolean(matchPhysicsFrame);stopMatchPhysics();
  try{sources.forEach(source=>(0,eval)(source));return {match:runFCMatchTests(),game:runFCGameTests()};}
  finally{if(running)startMatchPhysics();}
})""")
prime_demo=None
if args.prime_demo and not args.prototype_lab:
 prime_demo=evaluate("""(async()=>{showQuickLogin();document.querySelector('#primeRonaldoDemoBtn').click();await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));const card=state.inventory.find(item=>item.name==='Prime Ronaldo');return {passed:Boolean(card&&card.rating==='∞ × ∞'&&card.rarity==='NIGHTMARE'&&state.infiniteCoins&&state.infiniteRankedPoints&&state.elDemonUnlocked&&state.profileTitle==='El Demon'&&state.profileBackground==='el-demon'&&prototypeCoins.textContent==='∞'&&prototypeGems.textContent==='∞'&&state.selectedStar?.name==='Prime Ronaldo'&&state.selectedStarSlot==='st'&&!document.querySelector('#prototypePitchOverlay').hidden&&inventorySearch.value==='Prime Ronaldo'),card:card&&{name:card.name,rating:card.rating,rarity:card.rarity,image:card.image},balances:{rankedPoints:prototypeCoins.textContent,coins:prototypeGems.textContent},elDemon:{unlocked:state.elDemonUnlocked,title:state.profileTitle,background:state.profileBackground},squad:state.selectedStar?.name,inventoryOpen:!document.querySelector('#prototypePitchOverlay').hidden};})()""")
if args.screenshot:
 if not args.matchday: evaluate("document.querySelector('#matchdayDialog')?.close()")
 if args.dashboard:
  evaluate("quickLoginOverlay.hidden=true;prototypeToast.classList.remove('is-visible');document.querySelectorAll('.prototype-modal,.prototype-pitch-overlay').forEach(node=>node.hidden=true)")
 if args.view: evaluate(f"selectPrototypeView({json.dumps(args.view)})")
 if args.login: evaluate("showQuickLogin()")
 shot=call("Page.captureScreenshot",{"format":"png","captureBeyondViewport":False})
 with open(args.screenshot,"wb") as output: output.write(base64.b64decode(shot["result"]["data"]))
errors=[e for e in events if e.get("method")=="Runtime.exceptionThrown"]
print(json.dumps({"checks":result,"primeDemo":prime_demo,"runtimeErrors":errors},indent=2))
s.close()
passed=result.get("passed") if (args.prototype_lab or args.visual_smoke or args.matchday or args.season) and result else result and result.get("match",{}).get("passed") and result.get("game",{}).get("passed")
if args.prime_demo: passed=passed and prime_demo and prime_demo.get("passed")
raise SystemExit(0 if passed and not errors else 1)
