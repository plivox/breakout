class Particle {
  constructor(x, y, vx, vy) {
    this.x = x || 0
    this.y = y || 0
    this.vx = vx || 0
    this.vy = vy || 0
  }

  update(vx, vy) {
    ;(vx = vx || 0), (vy = vy || 0)

    this.x += this.vx + vx
    this.y += this.vy + vy
  }
}

export default class ParticleSystem {
  constructor(center, count) {
    this.particles = []
    this.count = count || 0
    this.color = '#f9a85b'
    this.finished = false
    this.center = {
      x: center.x || 0,
      y: center.y || 0,
    }

    // Initialization
    for (let i = 0; i < this.count; i++) {
      var x = this.center.x,
        y = this.center.y,
        vx = Math.random() * 6 - 1.5,
        vy = Math.random() * 6 - 1.5

      this.particles.push(new Particle(x, y, vx, vy))
    }
  }

  draw(vx, vy) {
    var finished = 0

    for (let i = 0; i < this.count; i++) {
      if (
        this.particles[i].x > 0 &&
        this.particles[i].x < stage.width &&
        this.particles[i].y > 0 &&
        this.particles[i].y < stage.height
      ) {
        this.particles[i].update()

        stage.ctx.fillStyle = this.color
        stage.ctx.fillRect(this.particles[i].x, this.particles[i].y, 2, 2)
      } else {
        finished++
      }
    }

    if (finished == this.count) {
      console.log(finished)
      this.finished = true
    }
  }
}
