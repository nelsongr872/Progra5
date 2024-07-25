//importar clases
import Enemigo from "../archivosDepreciados/enemie.js";
import Guerrero from "../class/guerrero.js";

//Importar funciones auxiliares
import { drawBG, colision } from "../function/funcionesAux.js";

//Importar constantes
import { ctx, canvas, keys } from "../constants/constants.js";

//Agregar el elemento canvas al html y definir los atributos de ancho y alto
document.body.appendChild(canvas);
canvas.width = innerWidth - 4;
canvas.height = innerHeight - 4;

//Instancias
const warrior = new Guerrero(
  74,
  64,
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
  74,
  64,
  keys,
  ctx,
  1000,
  100,
  1,
  canvas,
  "./../img/enemie1.png",
  75,
  "./../img//enemie1Sword.png",
  2,
  2
);

//Disparador
const update = () => {
  //
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //
  drawBG(ctx, canvas);
  warrior.update();
  enemie1.update();
  colision(warrior, enemie1);
  //
  requestAnimationFrame(update);
};

// listener de teclas
addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
addEventListener("keyup", (e) => (keys[e.key] = false));

update();
