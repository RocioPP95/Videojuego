export class Inicio extends Phaser.Scene {
    constructor() {
      super({ key: "inicio" });
    }
  
    preload() {
      this.load.image("inicio", "images/inicio.png");
      this.load.image("start", "images/start.png");
    }
  
    create() {
      const { width, height } = this.scale;
  
      // ───────── FONDO (inicio.png) ─────────
      const bg = this.add.image(width / 2, height / 2, "inicio");
  
      // Escala automática para que se vea ENTERA
      const scaleX = width / bg.width;
      const scaleY = height / bg.height;
      const scale = Math.min(scaleX, scaleY);
      bg.setScale(scale);
  
      // ───────── BOTÓN START ─────────
      const startBtn = this.add.image(width / 2, height * 0.75, "start");
  
      // Escala del botón (ajusta si lo quieres más grande/pequeño)
      startBtn.setScale(0.3);
  
      // Hacerlo interactivo
      startBtn.setInteractive({ useHandCursor: true });
  
      // Al hacer click → ir al juego
      startBtn.on("pointerdown", () => {
        this.scene.start("game");
      });
  
      // (Opcional) efecto hover
      startBtn.on("pointerover", () => {
        startBtn.setScale(0.3);
      });
  
      startBtn.on("pointerout", () => {
        startBtn.setScale(0.3);
      });
    }
  }
  