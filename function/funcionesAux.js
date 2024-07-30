import CalcularDistancias from "../class/calcularDistancias.js";

//funciones auxiliares
//funncion de dibujar fondo
export const drawBG = (ctx, canvas) => {
  ctx.fillStyle = "#1f5705";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

//funcion de mecanica de colision
export const colision = (jugador, enemigo) => {
  //objetos de la clase Calculardistancias
  const distancia_je = new CalcularDistancias(jugador, enemigo);

  // mecanica de colision jugador-enemigo teniendo jugador mayor ataque
  if (enemigo.energia > 0 && jugador.espada > enemigo.espada) {
    if (distancia_je.distancia <= distancia_je.sumaDeRadios) {
      console.log("colision con el enemigo1");
      if (enemigo.espada > 0) {
        enemigo.espada += -jugador.ataque;
      } else {
        enemigo.energia += -jugador.ataque;
      }

      if (enemigo.energia === 0) {
        console.log("mataste al enemigo");
      }
    }
  }

  // mecanica de colision jugador-enemigo teniendo enemigo mayor ataque
  if (jugador.energia > 0 && enemigo.espada > jugador.espada) {
    if (distancia_je.distancia <= distancia_je.sumaDeRadios) {
      console.log("colision con el enemigo");
      if (jugador.espada > 0) {
        jugador.espada += -enemigo.ataque;
      } else {
        jugador.energia += -enemigo.ataque;
      }

      if (jugador.energia === 0) {
        console.log("moriste por el enemigo");
      }
    }
  }
};
