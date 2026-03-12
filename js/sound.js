const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

export function unlockAudio(){
    if(audioCtx.state === "suspended"){
        audioCtx.resume()
    }
}

function beep(freq,time){

const osc = audioCtx.createOscillator()
const gain = audioCtx.createGain()

osc.frequency.value = freq
osc.connect(gain)
gain.connect(audioCtx.destination)

osc.start()

gain.gain.setValueAtTime(0.2,audioCtx.currentTime)
gain.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+time)

osc.stop(audioCtx.currentTime+time)

}

export function soundShoot(){ beep(600,0.1) }
export function soundHit(){ beep(800,0.1) }
export function soundFail(){ beep(200,0.3) }
export function soundWin(){ beep(1000,0.2) }

export function soundHeart(){beep(900,0.08)
setTimeout(()=>{
    beep(1200,0.12)
},80)
}

export function soundDamage(){
    beep(180,0.15)
    setTimeout(()=>{
        beep(120,0.25)
    },120)
}

export function soundCollision(){
    beep(350,0.08)
    setTimeout(()=>{
        beep(250,0.12)
    },60)
}