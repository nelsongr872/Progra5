import CalcularDistancias from "../class/calcularDistancias.js";

//funciones auxiliares
//funncion de dibujar fondo
export const drawBG = (ctx, canvas) => {
  ctx.fillStyle = "#1f5705";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

//funcion de mecanica de colision
export const colision = (warrior, enemie1) => {
  //objetos de la clase Calculardistancias
  const distancia_je1 = new CalcularDistancias(warrior, enemie1);

  // mecanica de colision jugador-enemigo1
  if (enemie1.energia > 0) {
    if (distancia_je1.distancia <= distancia_je1.sumaDeRadios) {
      console.log("colision con el enemigo1");
      if (enemie1.espada > 0) {
        enemie1.espada += -warrior.ataque;
      } else {
        enemie1.energia += -warrior.ataque;
      }

      if (enemie1.energia === 0) {
        console.log("mataste al enemigo");
      }
    }
  }
};
