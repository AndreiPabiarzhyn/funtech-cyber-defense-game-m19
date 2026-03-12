import { ctx } from "./main.js"
import { level, damage, addLife } from "./state.js"
import { player } from "./player.js"
import { isColliding } from "./collision.js"
import { soundHeart } from "./sound.js"
import { soundDamage } from "./sound.js"
import { soundCollision } from "./sound.js"
import { triggerShake, createExplosion } from "./effects.js"
import { floatingTexts, createFloatingText } from "./effects.js"

export const enemies = []

const types=[
{img:"virus.png",danger:true},
{img:"phishing.png",danger:true},
{img:"friend.png",danger:false},
{img:"heart.png",life:true}
]

export function spawnEnemies(){

// меньше объектов
if(Math.random() < 0.01){

let t = types[Math.floor(Math.random()*types.length)]

let img = new Image()
img.src="./assets/"+t.img

enemies.push({
x:Math.random()*650,
y:-60,
speed:1 + level*0.4,
size:70,
danger:t.danger,
life:t.life,
friend:!t.danger && !t.life,
rescued:false,
img:img
})

}

}

export function updateEnemies(){

for(let i=enemies.length-1;i>=0;i--){

let e=enemies[i]

e.y+=e.speed

ctx.drawImage(e.img,e.x,e.y,e.size,e.size)

// столкновение со щитом
if(isColliding(e,player)){

// ❤️ сердце
if(e.life){
addLife()
soundHeart()
enemies.splice(i,1)
continue
}

// ☣ вирус
if(e.danger){
soundCollision()
createExplosion(e.x,e.y)
enemies.splice(i,1)
continue
}

// 🤖 хорошая программа
if(e.friend && !e.rescued){

// текст SAFE
createFloatingText(e.x,e.y,"SAFE!")

// щит-волна
createExplosion(player.x,player.y)

// свечение
e.rescued = true
e.glow = 40

// быстро улетает
e.vx = 8
e.vy = -3

}

}

// анимация улетающего друга
if(e.rescued){

e.x += e.vx
e.y += e.vy

// уменьшаем свечение
if(e.glow > 0){
e.glow -= 1

ctx.beginPath()
ctx.arc(e.x+35,e.y+35,50,0,Math.PI*2)

let g = ctx.createRadialGradient(e.x+35,e.y+35,5,e.x+35,e.y+35,50)
g.addColorStop(0,"rgba(0,255,150,0.7)")
g.addColorStop(1,"rgba(0,255,150,0)")

ctx.fillStyle = g
ctx.fill()
}

if(e.x>760 || e.y<-80){
enemies.splice(i,1)
}

continue
}

// если улетел вниз
if(e.y>520){

if(e.danger){
damage()
soundDamage()
}

enemies.splice(i,1)

}

}

}