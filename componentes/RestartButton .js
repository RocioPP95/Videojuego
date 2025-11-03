
export class RestartButton {
    // se le manda el parametro de la escena en la que se quiere pintar el boton

    constructor(scene) {
        this.relatedScene = scene;

    }

    //Precargamos el boton:
    preload() {
        this.relatedScene.load.spritesheet('button', 'images/restart.png', { frameWidth: 190, frameHeight: 49 })
    }
    // crear el boton precargado en la escena:
    create() {
        this.startButton = this.relatedScene.add.sprite(400, 230, 'button').setInteractive();

        //Definiendo efectos del movimiento del raton por el botón:
        this.startButton.on('pointerover', () => {
            this.startButton.setFrame(1);
        });
        this.startButton.on('pointerout', () => {
            this.startButton.setFrame(0);
        }
        );
        this.startButton.on('pointerdown', () => {
            console.log("pasa por aqui");
            this.relatedScene.scene.start('game');
        });
    }
}