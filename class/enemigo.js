import Personaje from "./personaje.js";

export default class Enemigos extends Personaje {
  constructor(
    x,
    y,
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
    swordUrl,
    num1,
    num2
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
    this.x = x;
    this.y = y;
    this.position = {
      x: x - this.w / num1,
      y: y - this.h / num2,
    };
  }
  draw() {
    if (this.energia <= 0) {
      return;
    }
    if (!this.ctx) {
      return;
    }
    this.ctx.save();

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

    //dibujar a enemigo
    this.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.w,
      this.h
    );

    //dibujar la espada
    if (this.espada > 0) {
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
    }

    this.ctx.restore();

    this.rotationAngle += 0.095;
  }
  update() {
    this.draw();
  }
}
