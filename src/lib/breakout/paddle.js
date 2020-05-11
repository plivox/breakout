export default class Paddle {
  constructor() {
    this.width = 50
    this.height = 10
    this.x = stage.width / 2 - this.width / 2
    this.color = '#449FD1'

    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
  }

  draw() {
    stage.ctx.beginPath()
    stage.ctx.fillStyle = this.color
    stage.ctx.rect(this.x, stage.height - this.height, this.width, this.height)
    stage.ctx.closePath()
    stage.ctx.fill()
  }

  onKeyDown = (event) => {
    if (event.keyCode == 39) this.right = true
    else if (event.keyCode == 37) this.left = true
  }

  onKeyUp = (event) => {
    if (event.keyCode == 39) this.right = false
    else if (event.keyCode == 37) this.left = false
  }
}
