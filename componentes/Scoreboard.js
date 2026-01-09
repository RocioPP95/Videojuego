//Class para llevar el marcador del juego y poder reutilizarlo:
export class Scoreboard {

    constructor(scene) {
        this.relatedScene = scene;
        this.score = 0;

    }
    //metodos 
    create() {
        //añadimos texto de marcador:
        this.scoreText = this.relatedScene.add.text(16, 16, 'Llevar a Cuca a un hogar :0/1', {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        })
    }

    //metodo para incrementar los puntos en el marcador:
    //parametro (points)puntos a incrementar
    incrementPoints(points) {
        this.score += points;
        this.scoreText.setText('Llevar a Cuca a un hogar: ' + this.score);
    }
}