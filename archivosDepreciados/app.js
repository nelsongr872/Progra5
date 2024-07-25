//variables para generar el componente canvas
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = innerWidth - 4;
canvas.height = innerHeight - 4;
const ctx = canvas.getContext("2d");

//array para el guardado de teclas
const keys = {};

//DECLARACION DE CLASES
// Clase Jugador
class Warrior {
  constructor() {
    this.w = 74;
    this.h = 64;
    this.energia = 1000;
    this.espada = 100;
    this.ataque = 1;
    this.position = {
      x: canvas.width / 2 - this.w / 2,
      y: canvas.height / 2 - this.h / 2,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.friction = 0.44;
    this.url = "./../img/Warrior.png";
    //this.url = './images/alien.png'
    this.image = new Image();
    this.image.src = this.url;
    this.image.onload = this.draw;

    //radio del circulo para mecanica de colision
    this.radius = 75;

    //cargar imagen de espada
    this.swordUrl = "./../img/Sword.png"; // Sword image
    this.swordImage = new Image();
    this.swordImage.src = this.swordUrl;
    this.swordImage.onload = this.draw.bind(this);

    this.rotationAngle = 0; // Rotation angle for the sword
  }

  update() {
    this.draw();
    this.mover();
  }

  limiteBordes() {
    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x = 0;
    } else if (this.position.x > canvas.width - this.w) {
      this.position.x = canvas.width - this.w;
      this.velocity.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y = 0;
    } else if (this.position.y > canvas.height - this.h) {
      this.position.y = canvas.height - this.h;
      this.velocity.y = 0;
    }
  }

  mover() {
    if (keys["ArrowRight"]) {
      this.velocity.x++;
    }
    if (keys["ArrowLeft"]) {
      this.velocity.x--;
    }
    if (keys["ArrowDown"]) {
      this.velocity.y++;
    }
    if (keys["ArrowUp"]) {
      this.velocity.y--;
    }
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.y *= this.friction;
    this.velocity.x *= this.friction;
    this.limiteBordes();
  }

  draw() {
    if (!this.image) {
      return;
    }
    // rotation
    ctx.save();
    if (keys["ArrowLeft"]) {
      ctx.translate(this.position.x + this.w / 2, this.position.y + this.h / 2);
      ctx.rotate(-0.25);
      ctx.translate(
        -this.position.x - this.w / 2,
        -this.position.y - this.h / 2
      );
    } else if (keys["ArrowRight"]) {
      ctx.translate(this.position.x + this.w / 2, this.position.y + this.h / 2);
      ctx.rotate(0.25);
      ctx.translate(
        -this.position.x - this.w / 2,
        -this.position.y - this.h / 2
      );
    }

    //dibujar circulo para mecanica de colision
    ctx.beginPath();
    ctx.arc(
      this.position.x + this.w / 2,
      this.position.y + this.h / 2,
      this.radius,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fill();

    //dibujar personaje
    ctx.drawImage(this.image, this.position.x, this.position.y, this.w, this.h);

    //dibujar la espada
    ctx.translate(this.position.x + this.w / 2, this.position.y + this.h / 2);
    ctx.rotate(this.rotationAngle);
    ctx.translate(-(this.position.x + this.w), -(this.position.y + this.h));
    ctx.drawImage(
      this.swordImage,
      this.position.x,
      this.position.y - this.h / 4,
      this.w / 2,
      this.h / 2
    );

    ctx.restore();

    this.rotationAngle += 0.095;
  }
}

//Clase Enemigo
class Enemie {
  constructor(x, y) {
    this.w = 74;
    this.h = 64;
    this.energia = 1000;
    this.espada = 100;
    this.ataque = 1;
    this.position = {
      x: x - this.w / 2,
      y: y - this.h / 2,
    };

    //cargar imagen de enemigo
    this.url = "./../img/enemie1.png";
    this.image = new Image();
    this.image.src = this.url;
    this.image.onload = this.draw.bind(this);

    //radio del circulo para mecanica de colision
    this.radius = 75;

    //cargar imagen de espada
    this.swordUrl = "./../img/enemie1Sword.png";
    this.swordImage = new Image();
    this.swordImage.src = this.swordUrl;
    this.swordImage.onload = this.draw.bind(this);

    this.rotationAngle = 0;
  }

  draw() {
    if (this.energia <= 0) {
      return;
    }
    ctx.save();

    //dibujar circulo para mecanica de colision
    ctx.beginPath();
    ctx.arc(
      this.position.x + this.w / 2,
      this.position.y + this.h / 2,
      this.radius,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fill();

    //dibujar a enemigo
    ctx.drawImage(this.image, this.position.x, this.position.y, this.w, this.h);

    //dibujar la espada
    if (this.espada > 0) {
      ctx.translate(this.position.x + this.w / 2, this.position.y + this.h / 2);
      ctx.rotate(this.rotationAngle);
      ctx.translate(-(this.position.x + this.w), -(this.position.y + this.h));
      ctx.drawImage(
        this.swordImage,
        this.position.x,
        this.position.y - this.h / 4,
        this.w / 2,
        this.h / 2
      );
    }

    ctx.restore();

    this.rotationAngle += 0.095;
  }
  update() {
    this.draw();
  }
}

//Clase Calcular Distancias
class CalcularDistancias {
  constructor(jugador, elemento) {
    this.dx = jugador.position.x - elemento.position.x;
    this.dy = jugador.position.y - elemento.position.y;
    this.distancia = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    this.sumaDeRadios = jugador.radius + elemento.radius;
  }
}

//Clase bono espada
class BonoEspada {
  constructor(x, y, bono) {
    this.w = 25;
    this.h = 25;
    this.vida = bono;
    this.position = {
      x: x - this.w / 2,
      y: y - this.h / 2,
    };

    //radio del circulo para mecanica de colision
    this.radius = 25;

    //cargar imagen del bono de espada
    this.url = "./../img/bonoEspada.png";
    this.image = new Image();
    this.image.src = this.url;
    this.image.onload = this.draw.bind(this);
  }

  draw() {
    ctx.save();

    //dibujar circulo para mecanica de colision
    ctx.beginPath();
    ctx.arc(
      this.position.x + this.w / 2,
      this.position.y + this.h / 2,
      this.radius,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fill();

    //dibujar a enemigo
    ctx.drawImage(this.image, this.position.x, this.position.y, this.w, this.h);

    ctx.restore();
  }

  update() {
    this.draw();
  }
}

//Clase bono vida
class BonoVida {}

//Clase Portal para los distintos niveles

//funciones auxiliares
const drawPlants = (number = 10) => {
  for (let i = 0; i < number; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let size = Math.random() * 10 + 5; // Random plant size

    // Draw the grass base
    ctx.fillStyle = "#022C28"; // Green color for grass
    ctx.fillRect(x - size / 2, y, size, size / 2);

    // Draw the plant stem
    ctx.fillStyle = "#6B8E23"; // Darker green for stem
    ctx.fillRect(x - 2, y - size / 2, 4, size / 2);

    // Draw the plant leaves
    ctx.fillStyle = "#022C28"; // Green for leaves
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x - size / 4, y - size);
    ctx.lineTo(x + size / 4, y - size);
    ctx.fill();
  }
};

const drawBG = () => {
  ctx.fillStyle = "#1f5705";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawPlants();
};

const colision = () => {
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

// Instancias
const warrior = new Warrior();
const enemie1 = new Enemie(canvas.width / 10.5, canvas.height / 6.5);

//Disparador
const update = () => {
  //
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //
  drawBG();
  warrior.update();
  enemie1.update();
  colision();
  //
  requestAnimationFrame(update);
};

// listener de teclas
addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
addEventListener("keyup", (e) => (keys[e.key] = false));

update();
