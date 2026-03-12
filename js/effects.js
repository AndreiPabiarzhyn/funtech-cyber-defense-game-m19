import { ctx } from "./main.js"

export const explosions = []
export let screenShake = 0

export function triggerShake(power = 12){
    screenShake = power
}

export function updateShake(){
    if(screenShake > 0){
        screenShake -= 0.8
        if(screenShake < 0) screenShake = 0
    }
}

export function createExplosion(x,y){
    for(let i=0;i<25;i++){
        explosions.push({
            x:x,
            y:y,
            vx:(Math.random()-0.5)*6,
            vy:(Math.random()-0.5)*6,
            life:30
        })
    }
}

export function updateExplosions(){
    for(let i=explosions.length-1;i>=0;i--){
        let p = explosions[i]
        p.x += p.vx
        p.y += p.vy
        p.life--
        ctx.beginPath()
        ctx.arc(p.x,p.y,3,0,Math.PI*2)
        ctx.fillStyle = "orange"
        ctx.fill()
        if(p.life <= 0){
            explosions.splice(i,1)
        }
    }
}

export function drawRescueGlow(x,y){

    ctx.beginPath()
    ctx.arc(x,y,30,0,Math.PI*2)

    let g = ctx.createRadialGradient(x,y,5,x,y,30)

    g.addColorStop(0,"rgba(0,255,150,0.8)")
    g.addColorStop(1,"rgba(0,255,150,0)")

    ctx.fillStyle = g
    ctx.fill()

}

export function createRescueEffect(x,y){

    for(let i=0;i<15;i++){
        explosions.push({
            x:x,
            y:y,
            vx:(Math.random()-0.5)*5,
            vy:(Math.random()-0.5)*5,
            life:20
        })
    }

}

export const floatingTexts=[]

export function createFloatingText(x,y,text){

floatingTexts.push({
x,
y,
text,
life:40
})

}

export function updateFloatingTexts(){

for(let i=floatingTexts.length-1;i>=0;i--){

let t=floatingTexts[i]

t.y -= 0.5
t.life--

ctx.fillStyle="lime"
ctx.font="18px Arial"
ctx.fillText(t.text,t.x,t.y)

if(t.life<=0){
floatingTexts.splice(i,1)
}

}

}