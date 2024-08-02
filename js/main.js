//importar clases
import Enemigo from "../class/enemigo.js";
import Guerrero from "../class/guerrero.js";
import Bono from "../class/bono.js";

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

// Crear lista de bonos con posiciones correctas
const bonusList = [
  new Bono(
    enemie1.position.x / 2,
    enemie1.position.y,
    75,
    75,
    "./../img/bono/bono13.png",
    "espada",
    30
  ),
];

//Disparador
const update = () => {
  //
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //
  drawBG(ctx, canvas);
  warrior.update();
  enemie1.update();
  colision(warrior, enemie1, bonusList);
  //
  requestAnimationFrame(update);
};

// listener de teclas
addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
addEventListener("keyup", (e) => (keys[e.key] = false));

update();
