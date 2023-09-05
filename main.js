const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')

const loopOptions = {
  FPMS: 1000 / 30,
  prevTime: 0,
  fpsOut: document.querySelector('#fps'),
}

init()

function init() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  
  requestAnimationFrame(gameloop)
}

function gameloop() {
  let now = performance.now()
  let delta = now - loopOptions.prevTime
  if (!isGamePlaying || delta < loopOptions.FPMS) {
    requestAnimationFrame(gameloop)
    return
  }
  
  let fps = (1000 / delta).toFixed(2)
  loopOptions.fpsOut.textContent = fps

  loopOptions.prevTime = now
  requestAnimationFrame(gameloop)
}