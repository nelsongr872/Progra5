export default class Personaje {
  constructor(
    w,
    h,
    wb,
    hb,
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
    this.wb = wb;
    this.hb = hb;
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

    //cargar imagen del bono de vida
    if (energia == 1000) {
      this.bonoUrl = "./../img/bono/Bono10.png";
    } else if (energia >= 900 && energia < 1000) {
      this.bonoUrl = "./../img/bono/Bono9.png";
    } else if (energia >= 800 && energia < 900) {
      this.bonoUrl = "./../img/bono/Bono8.png";
    } else if (energia >= 700 && energia < 800) {
      this.bonoUrl = "./../img/bono/Bono7.png";
    } else if (energia >= 600 && energia < 700) {
      this.bonoUrl = "./../img/bono/Bono6.png";
    } else if (energia >= 500 && energia < 600) {
      this.bonoUrl = "./../img/bono/Bono5.png";
    } else if (energia >= 400 && energia < 500) {
      this.bonoUrl = "./../img/bono/Bono4.png";
    } else if (energia >= 300 && energia < 400) {
      this.bonoUrl = "./../img/bono/Bono3.png";
    } else if (energia >= 200 && energia < 300) {
      this.bonoUrl = "./../img/bono/Bono2.png";
    } else if (energia >= 100 && energia < 200) {
      this.bonoUrl = "./../img/bono/Bono1.png";
    } else {
      this.bonoUrl = "./../img/bono/Bono0.png";
    }
    this.bonoImage = new Image();
    this.bonoImage.src = this.bonoUrl;
    this.bonoImage.onload = this.draw.bind(this);

    console.log(this.bonoImage);
    this.rotationAngle = 0; //angulo de rotacion de espada
  }
}
