
import { initInput } from "./input.js"
import { updatePlayer, drawPlayer } from "./player.js"
import { spawnEnemies, updateEnemies, enemies } from "./enemies.js"
import { updateBullets, bullets } from "./bullets.js"
import { spawnBoss, updateBoss, resetBoss } from "./boss.js"
import { drawSpace } from "./space.js"
import { unlockAudio } from "./sound.js"

import { score, lives, level, gameState, restartGame } from "./state.js"
import { updateExplosions, screenShake, updateShake, updateFloatingTexts } from "./effects.js"

const restartBtn = document.getElementById("restartBtn")

const canvas = document.getElementById("game")
export const ctx = canvas.getContext("2d")

const startBtn = document.getElementById("startBtn")
const startScreen = document.getElementById("startScreen")

initInput(canvas)

let bossSpawned = false

startBtn.onclick = () => {
    unlockAudio()
    startScreen.style.display = "none"
    restartAll()
}

function restartAll(){
    restartGame()
    enemies.length = 0
    bullets.length = 0
    resetBoss()
    bossSpawned = false
    restartBtn.style.display = "none"
}

function update(){
    ctx.clearRect(0,0,720,520)

    // обновляем тряску
    updateShake()

    // применяем тряску камеры
    if(screenShake > 0){
        ctx.save()
        ctx.translate(
            (Math.random()-0.5) * screenShake,
            (Math.random()-0.5) * screenShake
        )
    }

    drawSpace()

    if(gameState === "play"){

        if(level < 3){
            spawnEnemies()
            updateEnemies()
        }

        if(level === 3 && !bossSpawned){
            spawnBoss()
            bossSpawned = true
        }

        updateBoss()

        updatePlayer()
        drawPlayer()

        updateBullets()
        updateFloatingTexts()
        updateExplosions()
    }

    drawUI()

    if(gameState === "gameover"){
        drawGameOver()
    }

    if(gameState === "win"){
        drawWin()
    }

    // возвращаем canvas после тряски
    if(screenShake > 0){
        ctx.restore()
    }
}

function drawUI(){
    ctx.fillStyle = "white"
    ctx.font = "20px Arial"
    ctx.fillText("Score: " + score,20,30)
    ctx.fillText("Lives: " + lives,20,55)
    ctx.fillText("Level: " + level,20,80)
}

function drawGameOver(){

    ctx.fillStyle="red"
    ctx.font="40px Arial"
    ctx.fillText("GAME OVER",240,260)

    ctx.font="20px Arial"
    ctx.fillText("Click to restart",280,310)
}

function drawWin(){

    ctx.fillStyle="rgba(0,0,0,0.6)"
    ctx.fillRect(0,0,720,520)

    ctx.fillStyle="lime"
    ctx.font="48px Arial"
    ctx.fillText("PLANET SAVED!",150,240)

    ctx.font="24px Arial"
    ctx.fillText("Press START to play again",210,300)
    restartBtn.style.display = "block"
}

canvas.addEventListener("click",()=>{

    if(gameState === "gameover"){
        restartAll()
    }

})

function loop(){
    update()
    requestAnimationFrame(loop)
}

restartBtn.onclick = () => {
restartAll()
}

loop()
