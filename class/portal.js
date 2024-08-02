export default class Portal {
  constructor(x, y, w, h, radius, numero) {
    this.position = { x, y };
    this.w = w;
    this.h = h;
    this.radius = radius;
    this.numero = numero;

    this.image = new Image();
    this.image.src = "./../img/portal/portal.png";

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
