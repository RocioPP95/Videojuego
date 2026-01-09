import { Scoreboard } from "../componentes/Scoreboard.js";

export class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  // Inicializamos marcador:
  init() {
    this.Scoreboard = new Scoreboard(this);
  }

  
  tiendaImpact(perro, tienda) {
    // si choca con una tienda pierde:
    this.showGameOver();
  }

  preload() {
    this.load.image("background", "images/background.png");

    this.load.image("voluntaria", "images/voluntaria.png");
    this.load.image("perro", "images/perro.png");
    this.load.image("tienda", "images/tienda.png");
    this.load.image("protectora", "images/protectora.png");
    this.load.image("congratulations", "images/congratulations.png");
  }

  create() {
    // Bordes de colisión del mundo:
    // izq, der, arriba, abajo
    this.physics.world.setBoundsCollision(true, true, true, true);

    const bg = this.add.image(400, 250, "background");
    bg.setDisplaySize(800, 500);

    // Marcador
    this.Scoreboard.create();
    this.canScoreOnvolVoluntaria = true;

    // Grupo de tiendas (estáticas)
    this.tiendas = this.physics.add.staticGroup();

    const cols = 1; // una columna
    const rows = 3; // tres tiendas

    const startX = 400; // centrado horizontal
    const startY = 100; // altura inicial

    const stepX = 0; // no se mueven en X
    const stepY = 130; // separación vertical

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let x = startX + col * stepX;

        if (row === 1) {
          x -= 160; // medio a la izquierda
        } else if (row === 2) {
          x += 40; // abajo un poco más a la izquierda
        } else {
          x += 100; // arriba a la derecha
        }

        let y = startY + row * stepY;

        if (row === 2) {
          y += 40; // abajo un poco más hacia abajo
        }

        const b = this.tiendas.create(x, y, "tienda");
        b.setScale(0.16);
        b.body.setSize(b.displayWidth, b.displayHeight, true);
        b.refreshBody();
      }
    }

    //  PROTECTORA al final, a la derecha, en medio
    this.protectora = this.physics.add.staticImage(720, 250, "protectora");
    this.protectora.setScale(0.13);
    this.protectora.refreshBody();

    // Voluntaria y perro (solo visual)
    this.voluntaria = this.physics.add.image(60, 250, "voluntaria").setImmovable();
    this.voluntaria.body.allowGravity = false;
    this.voluntaria.setScale(0.1);
    this.voluntaria.refreshBody();

    this.perro = this.physics.add.image(85, 250, "perro");
    this.perro.setScale(0.1);
    this.perro.refreshBody();
    this.perro.body.setSize(this.perro.displayWidth * 0.9, this.perro.displayHeight * 0.9, true);
    this.perro.body.setOffset(
      (this.perro.displayWidth - this.perro.body.width) / 2,
      (this.perro.displayHeight - this.perro.body.height) / 2
    );

    //  Quitamos cuerpos físicos para que NO tengan colisión (solo visual)
    this.voluntaria.body.destroy();
    this.perro.body.destroy();

    // Variable para posicionarlos alrededor del centro
    this.perro.setData("glue", true);
    this.perroOffsetX = 25;
    this.perroOffsetY = 0;

    // Los colocamos pegados desde el inicio
    this.perro.x = this.voluntaria.x + this.perroOffsetX;
    this.perro.y = this.voluntaria.y + this.perroOffsetY;

    // HITBOX CENTRAL ENTRE VOLUNTARIA Y PERRO
    this.hitbox = this.add.rectangle(
      (this.voluntaria.x + this.perro.x) / 2,
      (this.voluntaria.y + this.perro.y) / 2,
      30,
      30,
      0x000000,
      0
    );

    this.physics.add.existing(this.hitbox);

    // el hitbox NO se ve
    this.hitbox.setVisible(false);

    // sin gravedad
    this.hitbox.body.allowGravity = false;

    // inmóvil
    this.hitbox.body.immovable = true;

    // colisión con bordes
    this.hitbox.body.setCollideWorldBounds(true);

    // colision con tiendas
    this.physics.add.collider(this.hitbox, this.tiendas);

    // si toca tienda pierde
    this.physics.add.overlap(this.hitbox, this.tiendas, () => this.showGameOver(), null, this);

    // si toca protectora gana
    this.physics.add.overlap(this.hitbox, this.protectora, () => this.showCongratulations(), null, this);

    // cursores
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    let vx = 0;
    let vy = 0;

    const speed = 350;

    if (this.cursors.left.isDown) vx = -speed;
    else if (this.cursors.right.isDown) vx = speed;

    if (this.cursors.up.isDown) vy = -speed;
    else if (this.cursors.down.isDown) vy = speed;

    this.hitbox.body.setVelocity(vx, vy);

    this.voluntaria.x = this.hitbox.x - this.perroOffsetX / 2;
    this.voluntaria.y = this.hitbox.y - this.perroOffsetY / 2;

    this.perro.x = this.hitbox.x + this.perroOffsetX / 2;
    this.perro.y = this.hitbox.y + this.perroOffsetY / 2;

   
  }

  // cambio de escena cuando se pierde la partida
  showGameOver() {
    this.scene.start("gameover");
  }

    // cambio de escena cuando se gana la partida

  showCongratulations() {
    this.scene.start("congratulations");
  }
}
