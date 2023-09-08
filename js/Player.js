import Vector from './Vector.js'
import {random} from './Math.js'

export default class Player {
  constructor(ctx) {
    this.pos = new Vector(WIDTH / 2 - 25, HEIGHT / 2)
    this.vel = new Vector
    this.acc = 0
    this.w = 50
    this.h = 105
    this.ctx = ctx
    this.image = new Image
    this.image.src = '../assets/car3.svg'
    this.pressedKeys = []
    this.prevVelHead = 0


    this.control()
  }

  render() {
    this.move()
    this.update()
  }
  
  update() {
    let angle = this.vel.heading()
    let t = 0
    if (angle > this.prevVelHead) t = Math.abs(angle) - Math.abs(this.prevVelHead) 
    else if (this.prevVelHead > angle) t = Math.abs(this.prevVelHead) - Math.abs(angle) 
    
    if (t > 1) {
      console.log('t', t);
      // console.log('curr', angle);
      // angle = this.prevVelHead
    }
    // ctx.beginPath()
    // ctx.strokeStyle = 'hotpink'
    // ctx.moveTo(0, 0)
    // ctx.lineTo(test.x - WIDTH / 2, test.y - HEIGHT / 2)
    // ctx.stroke()
    // console.log(Vector.toDegree(Math.atan2(test.x - WIDTH / 2, test.y - HEIGHT / 2)) )
    // let angle = Vector.heading(this.pos, new Vector(mouseX, mouseY))
    // console.log(Vector.toDegree(angle));
    // this.acc = random(-0.1, 0.1)
    this.vel.add(this.acc)
    
    this.vel.limit(10)
    this.pos.add(this.vel)
    let mouseV = new Vector(mouseX, mouseY)
    let translateV = new Vector(this.pos.x + this.w / 2, this.pos.y + this.h / 2)
    let arcV = Vector.sub(mouseV, translateV)

    this.ctx.translate(translateV.x, translateV.y)

    // console.log(this.vel.toString());

    // this.ctx.fillStyle = 'hotpink'
    // this.ctx.strokeStyle = 'hotpink'
    // this.ctx.beginPath()
    // this.ctx.arc(arcV.x, arcV.y, 5, 0, 2 * Math.PI)

    // this.ctx.moveTo(0, 0)
    // let h = this.vel.copy()
    // h.setMag(100)
    // this.ctx.lineTo(this.vel.x * 100, this.vel.y * 100)

    // this.ctx.closePath()
    // this.ctx.fill()
    // this.ctx.stroke()
    
    // let a = this.vel.heading()
    // console.log(Vector.toDegree(a));
    this.ctx.rotate(angle + (Math.PI / 2))
    this.ctx.translate((this.pos.x + this.w / 2) * -1, (this.pos.y + this.h / 2) * -1)

    this.ctx.drawImage(this.image, this.pos.x, this.pos.y, this.w, this.h)


    
    this.ctx.resetTransform() //reset transform matrix
    this.prevVelHead = this.vel.heading()
  }

  move() {
    if (isMouseDown) {
      let mouseV = new Vector(mouseX, mouseY)
      let translateV = new Vector(this.pos.x + this.w / 2, this.pos.y + this.h / 2)
      let mV = Vector.sub(mouseV, translateV)
      // mV.normalize()
      // mV.limit(5)
      // TODO smoother rotate 
      // let a = mV.angleBetween(this.vel)
      // if (a > Math.PI / 4) {
      //   this.vel.rotate(a - Math.PI / 4)
      //   return
      // } else 
      // console.log('AAA', Vector.toDegree(a));
      if (mV.mag() > 80) this.vel.add(mV)
      // console.log(this.acc);

      // this.acc = 0.01
    } else {
      if (this.vel.x > 0) this.vel.x -= 0.222
      if (this.vel.y > 0) this.vel.y -= 0.222
      if (this.vel.x < 0) this.vel.x += 0.222
      if (this.vel.y < 0) this.vel.y += 0.222
      // console.log(this.vel.toString('velocity'));
      // this.acc = 0
      // this.vel = Vector.fromAngle(this.vel.heading())
      // this.vel.limit(0)
    }
    
    if (this.isKeyPressed('ArrowLeft')) {
      if (this.pos.x > 0) {
        this.pos.x -= 3
      } 
    }
    if (this.isKeyPressed('ArrowRight')) {
      if (this.pos.x < this.ctx.canvas.width - this.w) {
        this.pos.x += 3
      } 
    }
    if (this.isKeyPressed('ArrowUp')) {
      if (this.pos.y > 0) {
        this.pos.y -= 3
      } 
    }
    if (this.isKeyPressed('ArrowDown')) {
      if (this.pos.y < this.ctx.canvas.height - this.h) {
        this.pos.y += 3
      }
    }
  }


  control() {
    window.addEventListener('keydown', keyHandler.bind(this))
    window.addEventListener('keyup', keyHandler.bind(this))

    window.addEventListener('mousedown', () => {window.isMouseDown = true})
    window.addEventListener('mouseup', () => {window.isMouseDown = false})


    function keyHandler(ev) {
      if (ev.type === 'keydown') {
        if (this.pressedKeys.includes(ev.key)) return
        this.pressedKeys.push(ev.key)
      }
      if (ev.type === 'keyup') {
        let index = this.pressedKeys.indexOf(ev.key)
        if (index === -1) return
        this.pressedKeys.splice(index, 1)
      }
    }
  }

  isKeyPressed(key) {
    return this.pressedKeys.includes(key)
  }
}