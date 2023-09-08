import Player from './js/Player.js'
import Vector from './js/Vector.js'

const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')

const loopOptions = {
  FPMS: 1000 / 30,
  prevTime: 0,
  fpsOut: document.querySelector('#fps'),
}

let player = null
// let test = null
init()

function init() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  window.WIDTH = canvas.width
  window.HEIGHT = canvas.height
  window.mouseX = 0
  window.mouseY = 0
  window.isMouseDown = false

  document.addEventListener('mousemove', (ev) => {
    window.mouseX = ev.x
    window.mouseY = ev.y
  })

  // test = new Vector
  player = new Player(ctx)

  requestAnimationFrame(gameloop)
}

function gameloop() {
  let now = performance.now()
  let delta = now - loopOptions.prevTime
  if (!isGamePlaying || delta < loopOptions.FPMS) {
    requestAnimationFrame(gameloop)
    return
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  player.render()
  // test.set(mouseX, mouseY)
  
  // ctx.beginPath()
  // ctx.strokeStyle = 'hotpink'
  // ctx.translate(WIDTH / 2, HEIGHT / 2)
  // ctx.moveTo(0, 0)
  // ctx.lineTo(test.x - WIDTH / 2, test.y - HEIGHT / 2)
  // ctx.stroke()
  // console.log(Vector.toDegree(Math.atan2(test.x - WIDTH / 2, test.y - HEIGHT / 2)) )
  // ctx.setTransform(1, 0, 0, 1, 0, 0)

  
  let fps = (1000 / delta).toFixed(2)
  loopOptions.fpsOut.textContent = fps

  loopOptions.prevTime = now
  requestAnimationFrame(gameloop)
}