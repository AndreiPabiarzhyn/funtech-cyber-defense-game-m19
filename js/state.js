export let level = 1
export let score = 0
export let lives = 10

export let gameState = "menu"

export function addScore(n){
score = Math.max(0, score + n)

if(score > 10) level = 2
if(score > 25) level = 3
}

export function damage(){
lives--

if(lives <= 0){
gameState = "gameover"
}
}

export function addLife(){
if(lives < 10){
lives++
}
}

export function winGame(){
gameState = "win"
}

export function restartGame(){

level = 1
score = 0
lives = 10
gameState = "play"

}
