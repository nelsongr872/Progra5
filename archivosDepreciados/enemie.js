//Clase Enemigo
export default class Enemie {
  constructor(x, y, context) {
    this.w = 74;
    this.h = 64;
    this.ctx = context;
    this.energia = 1000;
    this.espada = 100;
    this.ataque = 1;
    this.position = {
      x: x - this.w / 2,
      y: y - this.h / 2,
    };

    //cargar imagen de enemigo
    this.url = "./../img/enemie1.png";
    this.image = new Image();
    this.image.src = this.url;
    this.image.onload = this.draw.bind(this);

    //radio del circulo para mecanica de colision
    this.radius = 75;

    //cargar imagen de espada
    this.swordUrl = "./../img/enemie1Sword.png";
    this.swordImage = new Image();
    this.swordImage.src = this.swordUrl;
    this.swordImage.onload = this.draw.bind(this);

    this.rotationAngle = 0;
  }

  draw() {
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
  update() {
    this.draw();
  }
}
