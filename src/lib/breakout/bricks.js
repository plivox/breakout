export default class Bricks {
  constructor() {
    this.rows = 5
    this.cols = 8
    this.width = stage.width / this.cols - 2
    this.height = 20
    this.padding = 2
    this.color = '#F99637'
    this.elements = new Array(this.rows)

    // Initialize bricks array
    for (let i = 0; i < this.rows; i++) {
      this.elements[i] = new Array(this.cols)
      for (let j = 0; j < this.cols; j++) this.elements[i][j] = 1
    }
  }

  draw() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // Draw or not draw the brick
        if (this.elements[i][j] == 1) {
          stage.ctx.beginPath()
          stage.ctx.fillStyle = this.color
          stage.ctx.rect(
            j * (this.width + this.padding) + this.padding,
            i * (this.height + this.padding) + this.padding,
            this.width,
            this.height,
          )
          stage.ctx.closePath()
          stage.ctx.fill()
        }
      }
    }
  }

  colWidth() {
    return this.width + this.padding
  }

  rowHeight() {
    return this.height + this.padding
  }
}
