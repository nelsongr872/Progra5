//Clase Calcular Distancias
export default class CalcularDistancias {
  constructor(jugador, elemento) {
    this.dx = jugador.position.x - elemento.position.x;
    this.dy = jugador.position.y - elemento.position.y;
    this.distancia = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    this.sumaDeRadios = jugador.radius + elemento.radius;
  }
}
