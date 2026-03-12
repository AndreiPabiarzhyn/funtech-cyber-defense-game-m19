const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const scoreUI = document.getElementById("score")
const startBtn = document.getElementById("startBtn")
const startScreen = document.getElementById("startScreen")

let score = 0
let level = 1
let running = false

let objects = []
let bullets = []
let explosions = []
let stars = []

let mouseX = 0
let mouseY = 0

let time = 0

let boss = null

// PLAYER
let player = {
x:320,
y:440,
width:70,
height:70
}

// IMAGES
const images = {}

function loadImage(name,src){
let img = new Image()
img.src = src
images[name] = img
}

loadImage("virus","assets/virus.svg")
loadImage("phishing","assets/phishing.svg")
loadImage("skull","assets/skull.svg")
loadImage("star","assets/star.svg")
loadImage("friend","assets/friend.svg")
loadImage("shield","assets/shield.svg")

// START
startBtn.onclick = ()=>{
startScreen.style.display="none"
running=true
initStars()
loop()
}

// CONTROLS
canvas.addEventListener("mousemove",e=>{
const rect = canvas.getBoundingClientRect()
mouseX = e.clientX - rect.left
mouseY = e.clientY - rect.top
player.x = mouseX - player.width/2
})

canvas.addEventListener("click",()=>{

if(level < 1) return

let angle = Math.atan2(mouseY-player.y,mouseX-player.x)

bullets.push({
x:player.x+player.width/2,
y:player.y,
vx:Math.cos(angle)*9,
vy:Math.sin(angle)*9
})

})

// AUDIO
const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

function beep(freq,time){
const osc = audioCtx.createOscillator()
const gain = audioCtx.createGain()

osc.frequency.value=freq
osc.type="square"

osc.connect(gain)
gain.connect(audioCtx.destination)

osc.start()

gain.gain.setValueAtTime(0.2,audioCtx.currentTime)
gain.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+time)

osc.stop(audioCtx.currentTime+time)
}

function soundCatch(){ beep(700,0.12) }
function soundFail(){ beep(200,0.3) }
function soundWin(){ beep(900,0.2) }

// SPACE
function initStars(){

for(let i=0;i<120;i++){

stars.push({
x:Math.random()*720,
y:Math.random()*520,
speed:0.2+Math.random()*0.8,
size:1+Math.random()*2
})

}

}

function drawSpace(){

stars.forEach(s=>{

s.y+=s.speed

if(s.y>520){
s.y=0
s.x=Math.random()*720
}

ctx.beginPath()
ctx.arc(s.x,s.y,s.size,0,Math.PI*2)
ctx.fillStyle="white"
ctx.fill()

})

}

// PLANET
function drawPlanet(){

ctx.beginPath()
ctx.arc(600,80,90,0,Math.PI*2)
ctx.fillStyle="#2c6df2"
ctx.fill()

ctx.beginPath()
ctx.arc(580,70,20,0,Math.PI*2)
ctx.fillStyle="#1f4ab8"
ctx.fill()

}

// SPAWN
function spawn(){

let danger = Math.random()<0.65
let type

if(danger){
let monsters=["virus","phishing","skull"]
type = monsters[Math.floor(Math.random()*monsters.length)]
}else{
let safe=["star","friend"]
type = safe[Math.floor(Math.random()*safe.length)]
}

objects.push({
x:Math.random()*650,
y:-60,
speed:0.6+level*0.5,
type:type,
danger:danger,
size:70
})

}

setInterval(spawn,1200)

// COLLISION
function circleCollision(ax,ay,ar,bx,by,br){

let dx=ax-bx
let dy=ay-by

let dist=Math.sqrt(dx*dx+dy*dy)

return dist<ar+br

}

// MONSTER
function drawMonster(obj){

let wobble = Math.sin(time*0.1 + obj.x)*6

ctx.drawImage(
images[obj.type],
obj.x+wobble,
obj.y,
obj.size,
obj.size
)

}

// PLAYER
function drawPlayer(){

let glow = Math.sin(time*0.2)*4

ctx.drawImage(
images.shield,
player.x,
player.y+glow,
player.width,
player.height
)

}

// BULLETS
function drawBullets(){

bullets.forEach((b,i)=>{

b.x+=b.vx
b.y+=b.vy

ctx.beginPath()
ctx.arc(b.x,b.y,6,0,Math.PI*2)
ctx.fillStyle="cyan"
ctx.fill()

if(b.x<0||b.x>720||b.y<0||b.y>520){
bullets.splice(i,1)
}

})

}

// EXPLOSION
function createExplosion(x,y){

for(let i=0;i<18;i++){

explosions.push({
x:x,
y:y,
vx:(Math.random()-0.5)*6,
vy:(Math.random()-0.5)*6,
life:40,
size:4+Math.random()*4
})

}

}

function drawExplosions(){

explosions.forEach((p,i)=>{

p.x+=p.vx
p.y+=p.vy
p.life--

ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
ctx.fillStyle=`rgba(255,200,0,${p.life/40})`
ctx.fill()

if(p.life<=0) explosions.splice(i,1)

})

}

// BOSS
function spawnBoss(){

boss={
x:300,
y:60,
hp:20,
size:140
}

}

function drawBoss(){

if(!boss) return

let wobble = Math.sin(time*0.1)*10

ctx.drawImage(
images.virus,
boss.x+wobble,
boss.y,
boss.size,
boss.size
)

ctx.fillStyle="red"
ctx.fillRect(boss.x, boss.y-20, boss.hp*5, 10)

}

// UPDATE
function update(){

time++

ctx.clearRect(0,0,720,520)

drawSpace()
drawPlanet()
drawPlayer()

objects.forEach((obj,i)=>{

obj.y+=obj.speed

drawMonster(obj)

let shieldX = player.x + player.width/2
let shieldY = player.y + player.height/2

let objX = obj.x + obj.size/2
let objY = obj.y + obj.size/2

if(circleCollision(shieldX,shieldY,30,objX,objY,30)){

if(obj.danger){
score++
soundCatch()
createExplosion(objX,objY)
}else{
score--
soundFail()
}

scoreUI.innerText = score
objects.splice(i,1)

}

if(obj.y>560) objects.splice(i,1)

})

// BULLET COLLISION
bullets.forEach((b,bi)=>{

objects.forEach((obj,oi)=>{

let objX = obj.x + obj.size/2
let objY = obj.y + obj.size/2

if(circleCollision(b.x,b.y,6,objX,objY,30)){

createExplosion(objX,objY)

if(obj.danger){
score++
soundCatch()
}else{
score--
soundFail()
}

scoreUI.innerText = score

bullets.splice(bi,1)
objects.splice(oi,1)

}

})

// BOSS HIT
if(boss){

if(circleCollision(b.x,b.y,6,boss.x+boss.size/2,boss.y+boss.size/2,60)){

boss.hp--
createExplosion(boss.x+60,boss.y+60)
bullets.splice(bi,1)

if(boss.hp<=0){
createExplosion(boss.x+60,boss.y+60)
score+=10
boss=null
soundWin()
}

}

}

})

drawBullets()
drawExplosions()

if(score>10) level=2
if(score>20 && !boss){
level=3
spawnBoss()
}

drawBoss()

}

// LOOP
function loop(){

if(!running) return

update()
requestAnimationFrame(loop)

}