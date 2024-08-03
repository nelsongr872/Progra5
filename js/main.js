// main.js

//importar clases
import Enemigo from "../class/enemigo.js";
import Guerrero from "../class/guerrero.js";
import Bono from "../class/bono.js";
import Portal from "../class/portal.js";

//Importar funciones auxiliares
import { drawBG, colision, drawStars } from "../function/funcionesAux.js";

//Importar constantes
import { ctx, canvas, keys } from "../constants/constants.js";

//importar variables
import { gameState } from "../variables/variables.js";

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
//array de enemigos segun su nivel
let enemigoNivel1 = [
  new Enemigo(
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
  ),
];
let enemigoNivel2 = [
  new Enemigo(
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
  ),
];
let enemigoNivel3 = [];

//array de bonos segun su nivel
let bonusNivel1 = [
  new Bono(
    warrior.position.x,
    enemigoNivel1[0].position.y + 100,
    75,
    75,
    "./../img/bono/bono13.png",
    "espada",
    30
  ),
];
let bonusNivel2 = [
  new Bono(
    warrior.position.x,
    enemigoNivel1[0].position.y + 100,
    75,
    75,
    "./../img/bono/bono13.png",
    "espada",
    30
  ),
];
let bonusNivel3 = [
  new Bono(
    warrior.position.x,
    enemigoNivel1[0].position.y + 100,
    75,
    75,
    "./../img/bono/bono13.png",
    "espada",
    30
  ),
];

//array de portales segun su nivel
let portalesNivel1 = [
  new Portal(
    warrior.position.x - 50,
    enemigoNivel1[0].position.y - 100,
    150,
    150,
    50,
    1
  ),
];
let portalesNivel2 = [
  new Portal(
    warrior.position.x - 50,
    enemigoNivel1[0].position.y + 400,
    150,
    150,
    50,
    2
  ),
  new Portal(
    warrior.position.x - 50,
    enemigoNivel1[0].position.y + 400,
    150,
    150,
    50,
    2
  ),
];
let portalesNivel3 = [
  new Portal(
    warrior.position.x - 50,
    enemigoNivel1[0].position.y - 100,
    150,
    150,
    50,
    1
  ),
];
let nivelAnterior = gameState.nivel;

let enemigosNivel1R = enemigoNivel1;
let bonusNivel1R = bonusNivel1;
let portalesNivel1R = portalesNivel1;

let enemigosNivel2R = enemigoNivel2;
let bonusNivel2R = bonusNivel2;
let portalesNivel2R = portalesNivel2;

let enemigosNivel3R = enemigoNivel3;
let bonusNivel3R = bonusNivel3;
let portalesNivel3R = portalesNivel3;
//Disparador
export const update = () => {
  //
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log(enemigoNivel1);
  drawBG(ctx, canvas, "#121212");
  drawStars(20, ctx, canvas);
  if (gameState.nivel !== nivelAnterior) {
    nivelAnterior = gameState.nivel;

    // Reposicionar al guerrero en el centro del canvas
    warrior.position.x = canvas.width / 2 - warrior.w / 2;
    warrior.position.y = canvas.height / 2 - warrior.h / 2;
  }

  // Detectar el nivel para renderizar los enemigos y portales correspondientes
  if (gameState.nivel === 1) {
    enemigoNivel1 = enemigosNivel1R;
    bonusNivel1 = bonusNivel1R;
    portalesNivel1 = portalesNivel1R;

    enemigoNivel2 = [];
    bonusNivel2 = [];
    portalesNivel2 = [];

    enemigoNivel3 = [];
    bonusNivel3 = [];
    portalesNivel3 = [];

    warrior.update();
    enemigoNivel1.forEach((enemigo) => enemigo.draw(ctx));
    bonusNivel1.forEach((bonus) => bonus.draw(ctx));
    portalesNivel1.forEach((portal) => portal.draw(ctx));
    colision(warrior, enemigoNivel1, bonusNivel1, portalesNivel1, gameState);
  } else if (gameState.nivel === 2) {
    enemigoNivel2 = enemigosNivel2R;
    bonusNivel2 = bonusNivel2R;
    portalesNivel2 = portalesNivel2R;

    enemigoNivel1 = [];
    bonusNivel1 = [];
    portalesNivel1 = [];

    enemigoNivel3 = [];
    bonusNivel3 = [];
    portalesNivel3 = [];

    warrior.update();
    enemigoNivel2.forEach((enemigo) => enemigo.draw(ctx));
    bonusNivel2.forEach((bonus) => bonus.draw(ctx));
    portalesNivel2.forEach((portal) => portal.draw(ctx));
    colision(warrior, enemigoNivel2, bonusNivel2, portalesNivel2, gameState);
  } else if (gameState.nivel === 3) {
    enemigoNivel3 = enemigosNivel3R;
    bonusNivel3 = bonusNivel3R;
    portalesNivel3 = portalesNivel3R;

    enemigoNivel1 = [];
    bonusNivel1 = [];
    portalesNivel1 = [];

    enemigoNivel2 = [];
    bonusNivel2 = [];
    portalesNivel2 = [];

    warrior.update();
    enemigoNivel3.forEach((enemigo) => enemigo.draw(ctx));
    bonusNivel3.forEach((bonus) => bonus.draw(ctx));
    portalesNivel3.forEach((portal) => portal.draw(ctx));
    colision(warrior, enemigoNivel3, bonusNivel3, portalesNivel3, gameState);
  }

  requestAnimationFrame(update);
};

// listener de teclas
addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
addEventListener("keyup", (e) => (keys[e.key] = false));

update();
