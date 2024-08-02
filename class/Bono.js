// bono.js
export default class Bono {
  constructor(x, y, w, h, imageUrl, bonoTipo, radius) {
    this.position = { x, y };
    this.w = w;
    this.h = h;
    this.radius = radius;
    this.bonoTipo = bonoTipo;

    this.image = new Image();
    this.image.src = imageUrl;

    this.imageLoaded = false;
    this.image.onload = () => {
      this.imageLoaded = true;
    };
  }

  draw(ctx) {
    if (this.imageLoaded) {
      // Dibuja la imagen del bono
      ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.w,
        this.h
      );
    } else {
      // Imagen aún no cargada, no dibujar nada
      console.log("Imagen del bono aún no cargada");
    }

    // Dibuja el círculo gris de colisión
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
  }
}
