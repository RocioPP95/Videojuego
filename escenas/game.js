import { Scoreboard } from "../componentes/Scoreboard.js";

export class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }
    //Inicializamos marcador:
    init() {
        this.Scoreboard = new Scoreboard(this);
    }

    //metodo que se llama cuando se ejecuta una colision entree la bola y la plataforma
    platformImpact(ball, platform) {
        this.Scoreboard.incrementPoints(1);
        //Conseguimos la posicion relativa de la colision entre la bola y la platafroma para que la bola coja angulo al chocar y rebotar
        let relativeImpact = ball.x - platform.x;

        //ajustamos la velocidad:
        if (relativeImpact < 0.1 && relativeImpact > -0.1) {
            ball.setVelocityX(Phaser.Math.Between(-10, 10))
        } else {
            ball.setVelocityX(10 * relativeImpact);
        }
    }
    brickImpact(ball, brick) {
        //eliminamos ladrillos
        brick.disableBody(true, true);
        //aumentamos marcador:
        this.Scoreboard.incrementPoints(10);

        //comprobamos si el nnumero de elementos de ladrillos ha llegado a cero:
        if (this.bricks.countActive() === 0) {
            this.showCongratulations();
        }
    }
   


    preload() {
        this.load.image('background', 'images/background.png');
        
        this.load.image('platform', 'images/platform.png')
        this.load.image('ball', 'images/ball.png')
        //los bricks(ladrillos)
        this.load.image('bluebrick', 'images/brickBlue.png');
        this.load.image('blackbrick', 'images/brickBlack.png');
        this.load.image('greenbrick', 'images/brickGreen.png');
        this.load.image('orangebrick', 'images/brickOrange.png');
        this.load.image('congratulations', 'images/congratulations.png');


    }
    create() {
        //Seteamos el sistema fisico de bordes de rebote:
        //borde izq, derech,superior, inferior
        this.physics.world.setBoundsCollision(true, true, true, false);

        //el 400 es la x y el 250 es la y que es la mitad de cada una para que sea justo en el centro
        this.add.image(400, 250, 'background');


        //llamamos al metodo que coloca el marcador:
        this.Scoreboard.create();

        //colocamos los grupos de bricks para que salgan repetidos, se coloca de izq a derecha y hacia abajo 
        this.bricks = this.physics.add.staticGroup({
            key: ['bluebrick', 'blackbrick', 'greenbrick', 'orangebrick'],
            frameQuantity: 1,
            gridAlign: {
                width: 10,
                heigth: 4,
                cellWidth: 67,
                cellHeight: 34,
                x: 112,
                y: 100
            }
        });

        //colocamos los grupos de los  ladrilloa de bricks

        // this.miGrupo = this.physics.add.staticGroup();
        //this.miGrupo.create(254, 244, 'bluebrick');
        //this.miGrupo.create(375, 232, 'greenbrick');



        this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();

        this.platform.body.allowGravity = false

        this.ball = this.physics.add.image(385, 440, 'ball');

        //esta variable es para controlar que la bola se mueva o no en la misma direccion que la plataforma 
        this.ball.setData('glue', true);

        this.ball.setCollideWorldBounds(true);

        //añadimos velocidad y direccion aleatoria a la bola:
        /*let velocity = 100 * Phaser.Math.Between(1.3, 2);
        if (Phaser.Math.Between(0, 10) > 5) {
            velocity = 0 - velocity;
        }
        this.ball.setVelocity(velocity, 10);*/



        //añadimos colisión bola contra plataforma
        this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this)

        //añadimos colision grupo de ladrillos de migrupo contra la bola 
        // this.physics.add.collider(this.ball, this.miGrupo, this.platformImpact, null, this)

        //añadimos colision entre grupo de ladrillos del grupo brick  y la bola
        this.physics.add.collider(this.ball, this.bricks, this.brickImpact, null, this)


        //programamos el rebote
        this.ball.setBounce(1);

        // control de la escucha de los cursores
        this.cursors = this.input.keyboard.createCursorKeys();

        //la gravedad afecta a todos los elementos pero la velocidad solo a un elemento en concreto
        // this.platform.setVelocity(100,10)

    }
    update() {
        //si se ha pulsado el cursor de la tecla izq como es a la izq lo ponemos en negativo para que vaya atras
        if (this.cursors.left.isDown) {
            this.platform.setVelocityX(-500);


            if (this.ball.getData('glue')) {
                this.ball.setVelocityX(-500);
            }
        }
        // si pulsa el derecho 
        else if (this.cursors.right.isDown) {
            this.platform.setVelocityX(500);
            if (this.ball.getData('glue')) {
                this.ball.setVelocityX(500);
            }
        }
        //si no pulsas nada no se mueve
        else {
            this.platform.setVelocityX(0)
            if (this.ball.getData('glue')) {
                this.ball.setVelocityX(0);
            }
        }
        //control de fin de partida al escaparse la bola por la pantalla de abajo por eso pone si es menor de 500 
        //porque la pantalla mide de alto 500 que es la medida configurada en el archivo index.js


        if (this.ball.y > 500) {
            console.log("fin de partida...");
            //this.gameoverImage.visible = true;
            //this.scene.pause();
            //this.bricks.setVisible(false);
            this.showGameOver();
        }
        if (this.cursors.up.isDown) {
            this.ball.setVelocity(-75, -300);
            this.ball.setData('glue', false)
        }
    }
    //cambio de escen cuando se pierde la partida
    showGameOver(){
        this.scene.start('gameover');
    }
    showCongratulations(){
        this.scene.start('congratulations');
        
    }
    // metodo que se le llama cuando se ejecuta una colicion entre la bnola y la plataforma :
    ejecutar() {
        console.log("ha chocado");
        this.ball.setVelocity(10, -800);
    }









}
