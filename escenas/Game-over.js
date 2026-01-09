import { RestartButton } from "../componentes/RestartButton .js";

export class Gameover extends Phaser.Scene {
    constructor() {
        super({ key: 'gameover' });
        this.RestartButton = new RestartButton(this);
    }
    preload(){
        this.load.image('gameover', 'images/gameover.png');
        //precargamos el componente restarbutton:
        this.RestartButton.preload();
    }
    create(){
        this.add.image(410,250,'background');
    this.GameoverImage = this.add.image(400,90,'gameover'); // 👈 primero esto
    this.RestartButton.create();                            // 👈 y luego el botón
    
}
}