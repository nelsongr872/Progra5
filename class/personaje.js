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
}
