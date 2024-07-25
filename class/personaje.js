export default class Personaje {
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
    this.w = w;
    this.h = h;
    this.keys = keys;
    this.ctx = ctx;
    this.energia = energia;
    this.espada = espada;
    this.ataque = ataque;
    this.canvas = canvas;

    //imagen del personaje
    this.image = new Image();
    this.image.src = personajeUrl;
    this.image.onload = this.draw;

    //radio del circulo para mecanica de colision
    this.radius = radius;

    //cargar imagen de espada
    this.swordImage = new Image();
    this.swordImage.src = swordUrl;
    this.swordImage.onload = this.draw.bind(this);

    this.rotationAngle = 0; //angulo de rotacion de espada
  }
  update() {
    this.draw();
  }
  draw() {
    if (!this.image) {
      return;
    }
    if (this.energia <= 0) {
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
}
