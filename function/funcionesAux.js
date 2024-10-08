import CalcularDistancias from "../class/calcularDistancias.js";
import { canvas, ctx } from "../constants/constants.js";
//funciones auxiliares
//funncion de dibujar fondo
export const drawBG = (ctx, canvas, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// Definir una variable global para manejar el estado del juego
let gameOver = false;

export const colision = (
  jugador,
  enemigosNivel,
  bonos,
  portales,
  gameState
) => {
  if (gameOver) return; // Detener colisiones si el juego ha terminado

  // objetos de la clase CalcularDistancias

  enemigosNivel.forEach((enemigo) => {
    const distancia_je = new CalcularDistancias(jugador, enemigo);
    // mecánica de colisión jugador-enemigo
    if (enemigo.energia > 0 && jugador.ataque > enemigo.ataque) {
      if (distancia_je.distancia <= distancia_je.sumaDeRadios) {
        console.log("colisión con el enemigo1");
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
    // mecánica de colisión jugador-enemigo teniendo enemigo mayor ataque
    if (jugador.energia > 0 && enemigo.ataque > jugador.ataque) {
      if (distancia_je.distancia <= distancia_je.sumaDeRadios) {
        console.log("colisión con el enemigo");
        if (jugador.espada > 0) {
          jugador.espada += -enemigo.ataque;
        } else {
          jugador.energia += -enemigo.ataque;
        }

        if (jugador.energia <= 0) {
          gameState.juegoEnProgreso = false;
          mostrarMensajeDerrota(jugador.canvas);
        }
      }
    }
  });

  // mecánica de colisión entre jugador y bonos
  bonos.forEach((bono) => {
    const distancia_jb = new CalcularDistancias(jugador, bono);

    if (distancia_jb.distancia <= distancia_jb.sumaDeRadios) {
      console.log("colisión con el bono");
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

  // mecánica de colisión entre jugador y portal
  portales.forEach((portal) => {
    const distancia_jp = new CalcularDistancias(jugador, portal);
    if (distancia_jp.distancia <= distancia_jp.sumaDeRadios) {
      if (portal.numero == 1) {
        // Ir hacia el nivel dos
        gameState.nivel = 2;
        console.log("Colisión con el portal", "nivel -->", gameState.nivel);
      } else if (portal.numero == 2) {
        // Ir hacia el nivel uno
        gameState.nivel = 1;
      } else if (portal.numero == 3) {
        // Ir hacia el nivel tres
        gameState.nivel = 3;
      } else if (portal.numero == 4) {
        // Ir hacia el nivel dos
        gameState.nivel = 2;
      }
    }
  });
};

export const mostrarMensajeDerrota = (canvas) => {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "red";
  ctx.font = "48px impact";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  ctx.font = "24px impact";
  ctx.fillText(
    "Recarga la ventana para volver a jugar.",
    canvas.width / 2,
    canvas.height / 2 + 40
  );
};

//dibujar estrellas
export const drawStars = (number = 40, ctx, canvas) => {
  for (let i = 0; i < number; i++) {
    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, 1, 3);
    ctx.fillRect(--x, ++y, 3, 1);
  }
};
