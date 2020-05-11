export default class Stage {
  constructor() {
    this.canvas = document.getElementById('stage')
    this.ctx = this.canvas.getContext('2d')
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.color = 'black'
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  draw() {
    // Optional if not background
    this.clear()

    this.ctx.beginPath()
    this.ctx.fillStyle = this.color
    this.ctx.rect(0, 0, this.width, this.height)
    this.ctx.closePath()
    this.ctx.fill()
  }
}
