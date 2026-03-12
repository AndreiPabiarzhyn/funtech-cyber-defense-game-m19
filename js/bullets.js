import { ctx } from "./main.js"
import { enemies } from "./enemies.js"
import { isColliding } from "./collision.js"
import { addScore } from "./state.js"
import { createExplosion, triggerShake } from "./effects.js"
import { soundShoot, soundHit, soundFail } from "./sound.js"

export const bullets=[]

export function shoot(px,py,mx,my){
soundShoot()

let angle=Math.atan2(my-py,mx-px)

bullets.push({
x:px,
y:py,
vx:Math.cos(angle)*10,
vy:Math.sin(angle)*10,
size:8
})
}

export function updateBullets(){

for(let i=bullets.length-1;i>=0;i--){

let b=bullets[i]

b.x+=b.vx
b.y+=b.vy

ctx.strokeStyle="cyan"
ctx.lineWidth=3

ctx.beginPath()
ctx.moveTo(b.x,b.y)
ctx.lineTo(b.x-b.vx*2,b.y-b.vy*2)
ctx.stroke()

for(let j=enemies.length-1;j>=0;j--){

let e=enemies[j]

if(isColliding(b,e)){

// ❤️ сердце — пуля отскакивает
if(e.life){

b.vx *= -1
b.vy *= -1

b.x += b.vx
b.y += b.vy

createExplosion(b.x,b.y)

break
}

// ☣ вирус
if(e.danger){

addScore(1)
soundHit()

createExplosion(e.x,e.y)

enemies.splice(j,1)
bullets.splice(i,1)

break
}

// 🤖 хорошая программа
if(e.friend){

addScore(-1)
triggerShake()
soundFail()

createExplosion(e.x,e.y)

enemies.splice(j,1)
bullets.splice(i,1)

break
}

// если случайно попали во что-то другое
addScore(0)

bullets.splice(i,1)

break

}

}

}

}