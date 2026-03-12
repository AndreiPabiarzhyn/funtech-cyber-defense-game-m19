import { player } from "./player.js"
import { shoot } from "./bullets.js"

let mouseX = 0
let mouseY = 0

export function initInput(canvas){

canvas.addEventListener("mousemove", e => {

const rect = canvas.getBoundingClientRect()

mouseX = e.clientX - rect.left
mouseY = e.clientY - rect.top

player.x = mouseX - player.width/2

})

canvas.addEventListener("click", () => {

shoot(player.x + player.width/2, player.y, mouseX, mouseY)

})

}