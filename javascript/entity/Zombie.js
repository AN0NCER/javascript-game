import { Vector2 } from "../engine.js";
import { Animation, Entity } from "./entity.js";

export class Zombie extends Entity {
    /**
     * @param {Game} game 
     * @param {Vector2} position 
     */
    constructor(game, position) {
        super(game);
        this.game = game;
        this.areaColl.position = position;

        this.sprite = new Sprite(this.game, this.areaColl, this);
        this.canRotate = true;
        this.rotate = -1;
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        this.sprite.draw(context);
        this.drawEngine(context);
    }
}

class Sprite extends Animation {
    /**
     * @param {Game} game 
     * @param {AreaColl} areaColl
     * @param {Entity} entity 
     */
    constructor(game, areaColl, entity) {
        super(game, { staggerFrame: 15, countFrames: 3 });
        this.game = game;
        this.coll = areaColl;
        this.entity = entity;
        this.position = new Vector2();
        this.spriteWidth = 72;
        this.spriteHeight = 72;
        this.width = 100;
        this.height = 100;
        this.image = document.getElementById('zombie');
        this.state = [
            { id: 'idle', frameY: 0, countFrames: 3, staggerFrame: 15 },
            { id: 'move', frameY: 1, countFrames: 7, staggerFrame: 14 }
        ];
        this.blockState = [];
        this.blockReturns = [];
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        this.position.x = (this.coll.position.x - (this.width * this.entity.rotate) * 0.5) * this.entity.rotate;
        this.position.y = this.coll.position.y - this.height + 10;
        context.save();
        context.scale(this.entity.rotate, 1);
        context.drawImage(this.image, this.spriteWidth * this.frameX, this.spriteHeight * this.frameY, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.width, this.height);
        context.restore();
        this.animate();
    }
}