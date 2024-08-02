//importar clases
import Enemigo from "../class/enemigo.js";
import Guerrero from "../class/guerrero.js";
import Bono from "../class/bono.js";
import Portal from "../class/portal.js";

//Importar funciones auxiliares
import { drawBG, colision } from "../function/funcionesAux.js";

//Importar constantes
import { ctx, canvas, keys } from "../constants/constants.js";

//importar variables
import { nivel } from "../variables/variables.js";

//Agregar el elemento canvas al html y definir los atributos de ancho y alto
document.body.appendChild(canvas);
canvas.width = innerWidth - 4;
canvas.height = innerHeight - 4;

//Instancias
const warrior = new Guerrero(
  74,
  64,
  70,
  10,
  keys,
  ctx,
  1000,
  100,
  1,
  canvas,
  "./../img/Warrior.png",
  75,
  "./../img/Sword.png"
);
const enemie1 = new Enemigo(
  canvas.width / 10.5,
  canvas.height / 6.5,
  74,
  64,
  70,
  10,
  keys,
  ctx,
  1000,
  200,
  2,
  canvas,
  "./../img/enemigos/enemigo1.png",
  75,
  "./../img/enemigos/espada1.png",
  2,
  2
);
const enemie5 = new Enemigo(
  canvas.width / 10.5,
  canvas.height / 6.5,
  74,
  64,
  70,
  10,
  keys,
  ctx,
  1000,
  200,
  2,
  canvas,
  "./../img/enemigos/enemigo5.png",
  75,
  "./../img/enemigos/espada5.png",
  2,
  2
);
const bonusList = [
  new Bono(
    warrior.position.x,
    enemie1.position.y + 100,
    75,
    75,
    "./../img/bono/bono13.png",
    "espada",
    30
  ),
];
const portales = [
  new Portal(
    warrior.position.x - 50,
    enemie1.position.y - 100,
    150,
    150,
    50,
    1
  ),
  new Portal(
    warrior.position.x - 50,
    enemie1.position.y + 400,
    150,
    150,
    50,
    2
  ),
];
//Disparador
export const update = () => {
  //
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //

  if (nivel == 1) {
    drawBG(ctx, canvas, "#1f5705");
    warrior.update();
    enemie1.update();
    bonusList.forEach((bono) => bono.draw(ctx));
    portales.forEach((portal) => {
      if (portal.numero == 1) {
        portal.draw(ctx);
      }
    });
    colision(warrior, enemie1, bonusList, portales);
  } else if (nivel == 2) {
    drawBG(ctx, canvas, "#323232");
    console.log("estoy dentro del nivel 2 update");
    warrior.update();
    enemie5.update();
    bonusList.forEach((bono) => bono.draw(ctx));
    portales.forEach((portal) => {
      if (portal.numero == 1) {
        portal.draw(ctx);
      }
    });
    colision(warrior, enemie5, bonusList, portales);
  }
  //
  requestAnimationFrame(update);
};

// listener de teclas
addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
addEventListener("keyup", (e) => (keys[e.key] = false));

update();
