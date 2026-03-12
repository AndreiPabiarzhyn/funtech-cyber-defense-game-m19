
import { ctx } from "./main.js"
import { level, winGame, damage } from "./state.js"
import { bullets } from "./bullets.js"
import { isColliding } from "./collision.js"
import { createExplosion } from "./effects.js"
import { player } from "./player.js"
import { soundWin } from "./sound.js"
import { soundDamage } from "./sound.js"

let boss = null
let bossBullets = []

const img = new Image()
img.src = "../assets/boss.png"

export function spawnBoss(){

    if(level === 3 && !boss){

        boss = {
            x:260,
            y:80,
            vx:2,
            vy:1,
            hp:40,
            size:180,
            phase:1,
            shootTimer:0
        }

    }

}

export function resetBoss(){
    boss = null
    bossBullets = []
}

export function updateBoss(){

    if(!boss) return

    boss.x += boss.vx
    boss.y += boss.vy

    if(boss.x < 0 || boss.x > 540) boss.vx *= -1
    if(boss.y < 40 || boss.y > 200) boss.vy *= -1

    if(boss.hp < 25) boss.phase = 2
    if(boss.hp < 10) boss.phase = 3

    if(boss.phase === 2){
        boss.vx = Math.sign(boss.vx) * 2.5
    }

    if(boss.phase === 3){
        boss.vx = Math.sign(boss.vx) * 3
        boss.vy = Math.sign(boss.vy) * 2
    }

    boss.shootTimer++

    let shootDelay = 80

    if(boss.phase === 2) shootDelay = 50
    if(boss.phase === 3) shootDelay = 30

    if(boss.shootTimer > shootDelay){

        bossBullets.push({
            x: boss.x + boss.size/2,
            y: boss.y + boss.size,
            vx: (player.x - (boss.x + boss.size/2)) * 0.02,
            vy: 5,
            size:14
        })

        boss.shootTimer = 0
    }

    for(let i=bossBullets.length-1;i>=0;i--){

        let b = bossBullets[i]

        b.x += b.vx
        b.y += b.vy

        ctx.fillStyle="orange"
        ctx.fillRect(b.x,b.y,b.size,b.size)

        if(isColliding(b,player)){
            damage()
            soundDamage()
            bossBullets.splice(i,1)
            continue
        }

        if(b.y > 520){
            bossBullets.splice(i,1)
        }

    }

    ctx.drawImage(img,boss.x,boss.y,boss.size,boss.size)

    ctx.fillStyle="black"
    ctx.fillRect(boss.x,boss.y-22,160,14)

    ctx.fillStyle="red"
    ctx.fillRect(boss.x,boss.y-20,boss.hp*4,10)

    for(let i=bullets.length-1;i>=0;i--){
        let b = bullets[i]
        if(boss && isColliding(b,boss)){
            boss.hp--
            createExplosion(b.x,b.y)
            bullets.splice(i,1)
            if(boss.hp <= 0){
                for(let k=0;k<8;k++){
                    createExplosion(
                        boss.x + Math.random()*boss.size,
                        boss.y + Math.random()*boss.size
                    )
                }

                boss = null
                bossBullets = []
                winGame()
                soundWin()
            }
        }
    }
}
