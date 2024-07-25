import Personaje from "./personaje.js";

export default class Guerrero extends Personaje {
  constructor(
    w,
    h,
    keys,
    ctx,
    energia,
    espada,
    ataque,
    canvas,
    personajeUrl,
    radius,
    swordUrl
  ) {
    super(
      w,
      h,
      keys,
      ctx,
      energia,
      espada,
      ataque,
      canvas,
      personajeUrl,
      radius,
      swordUrl
    );
    this.position = {
      x: this.canvas.width / 2 - this.w / 2,
      y: this.canvas.height / 2 - this.h / 2,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.friction = 0.44;
  }

  update() {
    this.draw();
    this.mover();
  }

  limiteBordes() {
    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x = 0;
    } else if (this.position.x > this.canvas.width - this.w) {
      this.position.x = this.canvas.width - this.w;
      this.velocity.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y = 0;
    } else if (this.position.y > this.canvas.height - this.h) {
      this.position.y = this.canvas.height - this.h;
      this.velocity.y = 0;
    }
  }

  mover() {
    if (this.keys["ArrowRight"]) {
      this.velocity.x++;
    }
    if (this.keys["ArrowLeft"]) {
      this.velocity.x--;
    }
    if (this.keys["ArrowDown"]) {
      this.velocity.y++;
    }
    if (this.keys["ArrowUp"]) {
      this.velocity.y--;
    }
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.y *= this.friction;
    this.velocity.x *= this.friction;
    this.limiteBordes();
  }

  draw() {
    if (!this.image) {
      return;
    }
    if (this.energia <= 0) {
      return;
    }
    // rotation
    this.ctx.save();
    if (this.keys["ArrowLeft"]) {
      this.ctx.translate(
        this.position.x + this.w / 2,
        this.position.y + this.h / 2
      );
      this.ctx.rotate(-0.25);
      this.ctx.translate(
        -this.position.x - this.w / 2,
        -this.position.y - this.h / 2
      );
    } else if (this.keys["ArrowRight"]) {
      this.ctx.translate(
        this.position.x + this.w / 2,
        this.position.y + this.h / 2
      );
      this.ctx.rotate(0.25);
      this.ctx.translate(
        -this.position.x - this.w / 2,
        -this.position.y - this.h / 2
      );
    }

    //dibujar circulo para mecanica de colision
    this.ctx.beginPath();
    this.ctx.arc(
      this.position.x + this.w / 2,
      this.position.y + this.h / 2,
      this.radius,
      0,
      2 * Math.PI
    );
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    this.ctx.fill();

    //dibujar personaje
    this.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.w,
      this.h
    );

    //dibujar la espada
    this.ctx.translate(
      this.position.x + this.w / 2,
      this.position.y + this.h / 2
    );
    this.ctx.rotate(this.rotationAngle);
    this.ctx.translate(
      -(this.position.x + this.w),
      -(this.position.y + this.h)
    );
    this.ctx.drawImage(
      this.swordImage,
      this.position.x,
      this.position.y - this.h / 4,
      this.w / 2,
      this.h / 2
    );

    this.ctx.restore();

    this.rotationAngle += 0.095;
  }
}
