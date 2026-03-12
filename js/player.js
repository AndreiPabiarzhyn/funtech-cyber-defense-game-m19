import { ctx } from "./main.js"

export const player = {
x:320,
y:440,
width:70,
height:70,
size:70
}

const img = new Image()
img.src = "../assets/shield.svg"

export function updatePlayer(){}

export function drawPlayer(){

ctx.drawImage(img,player.x,player.y,player.width,player.height)

}