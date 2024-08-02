import CalcularDistancias from "../class/calcularDistancias.js";
import { update } from "../js/main.js";
//funciones auxiliares
//funncion de dibujar fondo
export const drawBG = (ctx, canvas, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

//funcion de mecanica de colision
export const colision = (jugador, enemigo, bonos, portales, nivel) => {
  //objetos de la clase Calculardistancias
  const distancia_je = new CalcularDistancias(jugador, enemigo);

  // mecanica de colision jugador-enemigo teniendo jugador mayor ataque
  if (enemigo.energia > 0 && jugador.ataque > enemigo.ataque) {
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
  if (jugador.energia > 0 && enemigo.ataque > jugador.ataque) {
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
  // mecanica de colisión entre jugador y bonos
  bonos.forEach((bono) => {
    const distancia_jb = new CalcularDistancias(jugador, bono);

    if (distancia_jb.distancia <= distancia_jb.sumaDeRadios) {
      console.log("colision con el bono");
      if (bono.bonoTipo === "espada") {
        jugador.espada += 150;
        jugador.ataque += 3;
        console.log(jugador);
      }
      // Eliminar el bono después de ser recogido
      bono.position.x = -1000; // Mueve el bono fuera del canvas
      bono.position.y = -1000;
    }
  });

  //mecanica de colision entre jugador y portal
  portales.forEach((portal) => {
    const distancia_jp = new CalcularDistancias(jugador, portal);

    if (distancia_jp.distancia <= distancia_jp.sumaDeRadios) {
      if (portal.numero == 1) {
        //ir a hacia el nivel dos
        nivel = 2;
        console.log("colisione con el portal", " nivel -->", nivel);
      } else if (portal.numero == 2) {
        //ir hacia el nivel uno
        nivel = 1;
      } else if (portal.numero == 3) {
        //ir hacia el nivel tres
        nivel = 3;
      } else if (portal.numero == 4) {
        //ir hacia el nivel dos
        nivel = 2;
      }
    }
  });
};
