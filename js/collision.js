export function isColliding(a,b){

const aw = a.size || a.width
const ah = a.size || a.height

const bw = b.size || b.width
const bh = b.size || b.height

return(
a.x < b.x + bw &&
a.x + aw > b.x &&
a.y < b.y + bh &&
a.y + ah > b.y
)

}