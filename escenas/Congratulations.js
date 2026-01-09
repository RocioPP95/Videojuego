export class Congratulations extends Phaser.Scene {
  constructor() {
    super({ key: "congratulations" });
  }

  preload() {
    // por si esta escena se abre sin pasar por Inicio
    this.load.image("start", "images/start.png");
  }

  create() {
    const { width, height } = this.scale;

    // Imagen centrada
    const img = this.add.image(width / 2, height / 2, "congratulations");

    // Escala para que se vea entera
    const scaleX = width / img.width;
    const scaleY = height / img.height;
    const scale = Math.min(scaleX, scaleY);
    img.setScale(scale);
    img.setDepth(10);

    // ───────── BOTÓN START para volver a jugar ─────────
    const startBtn = this.add.image(width / 2, height * 0.85, "start");
    startBtn.setDepth(20);
    startBtn.setScale(0.3);
    startBtn.setInteractive({ useHandCursor: true });

    startBtn.on("pointerdown", () => {
      // reinicia el juego
      this.scene.start("game");
      // si prefieres volver al menú:
      // this.scene.start("inicio");
    });

    // hover (opcional)
    startBtn.on("pointerover", () => startBtn.setScale(0.32));
    startBtn.on("pointerout", () => startBtn.setScale(0.3));
  }
}
