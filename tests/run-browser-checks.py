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
parser.add_argument("--view",choices=("Home","Packs","Squad","Play","Club"),help="Dashboard view to capture")
parser.add_argument("--login",action="store_true",help="Show the login experience before capturing")
args=parser.parse_args()
pages=json.load(urllib.request.urlopen(f'http://127.0.0.1:{args.port}/json/list'))
page=next((p for p in pages if p['type']=='page'
  and urllib.parse.urlparse(p.get('url','')).hostname in ('127.0.0.1','localhost')
  and urllib.parse.urlparse(p.get('url','')).path in ('/','/index.html')),None)
if not page:
 raise SystemExit('Open the local FC Stars index.html in the dedicated Chrome debugging profile first.')
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
  if n==127:n=struct.unpack('!Q',exact(8))[0]
  msg=json.loads(exact(n))
  if msg.get('id')==seq:return msg
  events.append(msg)
def evaluate(js):
 r=call('Runtime.evaluate',{'expression':js,'returnByValue':True,'awaitPromise':True})
 if r.get('result',{}).get('exceptionDetails'):return r
 return r.get('result',{}).get('result',{}).get('value')

call("Runtime.enable")
call("Page.enable")
call("Emulation.setDeviceMetricsOverride",{"width":args.width,"height":args.height,"deviceScaleFactor":1,"mobile":args.width<800})
result=evaluate("""Promise.all(['tests/match-tests.js','tests/game-tests.js'].map(path=>fetch(path,{cache:'no-store'}).then(r=>r.text()))).then(sources=>{
  const running=Boolean(matchPhysicsFrame);stopMatchPhysics();
  try{sources.forEach(source=>(0,eval)(source));return {match:runFCMatchTests(),game:runFCGameTests()};}
  finally{if(running)startMatchPhysics();}
})""")
if args.screenshot:
 if args.dashboard:
  evaluate("quickLoginOverlay.hidden=true;prototypeToast.classList.remove('is-visible');document.querySelectorAll('.prototype-modal,.prototype-pitch-overlay').forEach(node=>node.hidden=true)")
 if args.view: evaluate(f"selectPrototypeView({json.dumps(args.view)})")
 if args.login: evaluate("showQuickLogin()")
 shot=call("Page.captureScreenshot",{"format":"png","captureBeyondViewport":False})
 with open(args.screenshot,"wb") as output: output.write(base64.b64decode(shot["result"]["data"]))
errors=[e for e in events if e.get("method")=="Runtime.exceptionThrown"]
print(json.dumps({"checks":result,"runtimeErrors":errors},indent=2))
s.close()
raise SystemExit(0 if result and result.get("match",{}).get("passed") and result.get("game",{}).get("passed") and not errors else 1)
