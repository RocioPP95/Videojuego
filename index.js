import { Congratulations } from './escenas/congratulations.js';
import { Gameover } from './escenas/game-over.js';
import { Game } from './escenas/game.js'

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    scene: [Game, Congratulations,Gameover],
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