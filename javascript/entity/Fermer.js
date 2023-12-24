import { Vector2 } from "../engine.js";
import { Game } from "../game.js";
import { Shotgun } from "../weapon/gun.js";
import { Melee } from "../weapon/melee.js";
import { AreaColl, Entity, Animation } from "./entity.js";

export class Fermer extends Entity {
    /**
     * @param {Game} game 
     * @param {Vector2} position 
     */
    constructor(game, position) {
        super(game);
        this.game = game;
        this.areaColl.position = position;

        this.sprite = new Sprite(this.game, this.areaColl);
        this.melee = new Melee(this.game, this);
        this.gun = new Shotgun(this.game, this);
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        this.sprite.draw(context);
        this.melee.draw(context);
        this.gun.draw(context);
        this.drawEngine(context);
    }

    update(){
        this.gun.update()
    }
}

class Sprite extends Animation {
    /**
     * @param {Game} game 
     * @param {AreaColl} entity 
     */
    constructor(game, areaColl) {
        super(game, { staggerFrame: 20, countFrames: 3 });
        this.game = game;
        this.coll = areaColl;
        this.position = new Vector2();
        this.spriteWidth = 72;
        this.spriteHeight = 72;
        this.width = 100;
        this.height = 100;
        this.image = document.getElementById('pfarmer');
        this.state = [
            { id: 'idle', frameY: 0, countFrames: 3, staggerFrame: 20 },
            { id: 'move', frameY: 1, countFrames: 7, staggerFrame: 14 },
            { id: 'melee', frameY: 2, countFrames: 5, staggerFrame: 14 },
            { id: 'fire', frameY: 3, countFrames: 7, staggerFrame: 14 },
            { id: 'reload', frameY: 4, countFrames: 22, staggerFrame: 14 }
        ];
        this.blockState = ['melee', 'fire', 'reload'];
        this.blockReturns = ['reload', 'fire'];
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        this.position.x = this.coll.position.x - this.width * 0.5;
        this.position.y = this.coll.position.y - this.height + 10;
        context.drawImage(this.image, this.spriteWidth * this.frameX, this.spriteHeight * this.frameY, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.width, this.height);
        this.animate();
    }
}