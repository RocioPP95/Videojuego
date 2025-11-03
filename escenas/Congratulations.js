import { RestartButton } from "../componentes/RestartButton .js";

export class Congratulations extends Phaser.Scene {
    constructor(){
        super({key: 'congratulations'});
        this.RestartButton = new RestartButton(this);
    }
    preload(){
        this.load.image('congratulations', 'images/congratulations.png');
        //precargamos el componente restarbutton:
       this.RestartButton.preload();
    }
    create(){
        this.add.image(410,250,'background'); // No necesita precarga, ya estaba precargada en la escena game.js
        this.RestartButton.create();
        this.GameoverImage=this.add.image(400,90,'congratulations');
    }
}