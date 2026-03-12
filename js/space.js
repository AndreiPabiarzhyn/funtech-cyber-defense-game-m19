import { ctx } from "./main.js"

const starsFar = []
const starsMid = []
const starsNear = []

const dust = []
const shootingStars = []

const planet = new Image()
planet.src = "../assets/planet.png"

let orbitAngle = 0
let ringAngle = 0
let shootingTimer = 0



// ⭐ дальние звезды
for (let i = 0; i < 80; i++) {
    starsFar.push(createStar(0.2, 1))
}

// ⭐ средние
for (let i = 0; i < 60; i++) {
    starsMid.push(createStar(0.4, 1.5))
}

// ⭐ ближние
for (let i = 0; i < 40; i++) {
    starsNear.push(createStar(0.7, 2))
}


// космическая пыль
for (let i = 0; i < 50; i++) {
    dust.push({
        x: Math.random() * 720,
        y: Math.random() * 520,
        speed: 0.1 + Math.random() * 0.2
    })
}



function createStar(speed, size) {
    return {
        x: Math.random() * 720,
        y: Math.random() * 520,
        speed,
        size,
        twinkle: Math.random() * Math.PI
    }
}



export function drawSpace() {

    drawNebula()

    drawDust()

    drawStarLayer(starsFar)
    drawStarLayer(starsMid)
    drawStarLayer(starsNear)

    spawnShootingStars()
    drawShootingStars()

    drawPlanet()

}



function drawNebula() {

    const g = ctx.createRadialGradient(
        400, 200, 50,
        400, 200, 400
    )

    g.addColorStop(0, "rgba(90,120,255,0.15)")
    g.addColorStop(1, "rgba(0,0,0,0)")

    ctx.fillStyle = g
    ctx.fillRect(0, 0, 720, 520)

}



function drawStarLayer(layer) {

    layer.forEach(s => {

        s.y += s.speed
        s.twinkle += 0.05

        if (s.y > 520) {
            s.y = 0
            s.x = Math.random() * 720
        }

        const alpha = 0.5 + Math.sin(s.twinkle) * 0.5

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()

    })

}



function drawDust() {

    dust.forEach(d => {

        d.y += d.speed

        if (d.y > 520) {
            d.y = 0
            d.x = Math.random() * 720
        }

        ctx.fillStyle = "rgba(255,255,255,0.1)"
        ctx.fillRect(d.x, d.y, 1, 1)

    })

}



function spawnShootingStars() {

    shootingTimer++

    // редко создаём
    if (shootingTimer > 200) {

        shootingTimer = 0

        const side = Math.floor(Math.random() * 4)

        let star

        if (side === 0) {
            star = { x: 0, y: Math.random() * 300, vx: 6, vy: 3 }
        }

        if (side === 1) {
            star = { x: 720, y: Math.random() * 300, vx: -6, vy: 3 }
        }

        if (side === 2) {
            star = { x: Math.random() * 720, y: 0, vx: -3, vy: 6 }
        }

        if (side === 3) {
            star = { x: Math.random() * 720, y: 0, vx: 3, vy: 6 }
        }

        shootingStars.push(star)

    }

}



function drawShootingStars() {

    for (let i = shootingStars.length - 1; i >= 0; i--) {

        const s = shootingStars[i]

        s.x += s.vx
        s.y += s.vy

        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - s.vx * 3, s.y - s.vy * 3)

        ctx.strokeStyle = "white"
        ctx.lineWidth = 2
        ctx.stroke()

        if (
            s.x < -50 ||
            s.x > 770 ||
            s.y > 570
        ) {
            shootingStars.splice(i, 1)
        }

    }

}



function drawPlanet() {

    orbitAngle += 0.01
    ringAngle += 0.02

    const floatOffset = Math.sin(orbitAngle) * 4

    ctx.save()

    ctx.translate(600, 420 + floatOffset)

    ctx.drawImage(planet, -80, -80, 160, 160)

    drawPlanetRings()

    ctx.restore()

}



function drawPlanetRings() {

    ctx.save()

    ctx.rotate(ringAngle)

    ctx.beginPath()
    ctx.ellipse(0, 0, 110, 35, 0, 0, Math.PI * 2)

    ctx.strokeStyle = "rgba(180,220,255,0.6)"
    ctx.lineWidth = 3
    ctx.stroke()

    ctx.restore()

}