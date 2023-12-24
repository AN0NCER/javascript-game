import { InputGamepad } from "./Inputs/InputGamepad.js";
import { InputKeyboard } from "./Inputs/InputKeyboard.js";
import { GameEngine, Vector2 } from "./engine.js";
import { Fermer } from "./entity/Fermer.js";
import { Zombie } from "./entity/Zombie.js";
import { Player } from "./objects/Player.js";

export class Game extends GameEngine {
    /**
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {
        super();
        this.debug = true;
        this.width = canvas.width;
        this.height = canvas.height;

        this.gameObjects = [];
        this.enemyObjects = [];
        this.entityObjects = [];

        this.keys = [];
        this.keyboardInput = new InputKeyboard(this);
    }

    init() {
        const farmer = new Fermer(this, new Vector2(100, 500));
        const zombie = new Zombie(this, new Vector2(400, 500));
        const player = new Player(this, farmer);
        this.gameObjects.push(farmer);
        this.gameObjects.push(player);
        this.gameObjects.push(zombie);
        this.entityObjects.push(zombie);
        this.entityObjects.push(farmer);
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     * @param {number} deltaTime 
     */
    render(context, deltaTime) {
        console.log(this.keys);
        if (this.timer > this.interval) {
            context.clearRect(0, 0, this.width, this.height);
            this.gameObjects.sort((a, b) => {
                return a.areaColl.position.y - b.areaColl.position.y;
            });
            this.gameObjects.forEach((object) => {
                object.draw(context);
                object.update();
            });
            this.countFps();
            this.timer = 0;
        }
        this.timer += deltaTime;
    }
}

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;

    ctx.fillStyle = 'white';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';

    const game = new Game(canvas);
    game.init();
    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.render(ctx, deltaTime);
        window.requestAnimationFrame(animate);
    }
    animate(0);
});