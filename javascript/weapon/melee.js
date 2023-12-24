import { Vector2 } from "../engine.js";
import { Entity } from "../entity/entity.js";
import { Game } from "../game.js";

class Weapon {
    constructor() {

    }
    draw() {

    }
    update() {

    }
}

export class Melee extends Weapon {
    /**
     * @param {Game} game 
     * @param {Entity} entity 
     * @param {Object} [param2={}] 
     * @param {number} [param2.width=30] 
     * @param {number} [param2.height=70]  
     */
    constructor(game, entity, { width = 30, height = 70 } = {}) {
        super();
        this.game = game;
        this.entity = entity;
        this.position = new Vector2();
        this.width = width;
        this.height = height;
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        this.position.x = this.entity.bodyColl.position.x + this.entity.bodyColl.width;
        this.position.y = this.entity.bodyColl.position.y + this.entity.bodyColl.height * 0.5 - this.height * 0.5;
        if (this.game.debug) {
            context.save();
            context.beginPath();
            context.rect(this.position.x, this.position.y, this.width, this.height);
            context.fillStyle = 'blue';
            context.stroke();
            context.globalAlpha = 0.3;
            context.fill();
            context.restore();
        }
    }
}