import Personaje from "./personaje.js";

export default class Enemigos extends Personaje {
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
    this.position = {
      x: x - this.w / num1,
      y: y - this.h / num2,
    };
  }
}
