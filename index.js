import { Congratulations } from './escenas/Congratulations.js';
import { Gameover } from './escenas/Game-over.js';
import { Game } from './escenas/game.js'
import { Inicio } from './escenas/Inicio.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    scene: [Inicio,Game, Congratulations,Gameover],
    physics: {
        default: 'arcade',
        arcade: {
           // gravity: { y: 400},
            debug: false

        }
    }
}
// creamos un objeto y le pasamos la configuración del objeto
var game = new Phaser.Game(config); 