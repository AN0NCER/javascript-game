import { Bezier3Animate } from "../bazier.js";
import { GameEngine, Vector2, getRandomNumber } from "../engine.js";
import { AreaColl, Entity } from "../entity/entity.js";
import { Game } from "../game.js";

export class JumpSleeve {
    /**
     * @param {Vector2} position
     */
    constructor(position) {
        this.animation = new Bezier3Animate(
            new Vector2(position.x, position.y),
            new Vector2(position.x + 30, position.y - 25),
            new Vector2(position.x + 30, position.y + getRandomNumber(30, 62)),
            { once: true, step: 0.02 }
        );
        this.kof = 1;
        this.pos = getRandomNumber(-1, 1);
    }
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        this.animation.draw(context);
    }

    update() {
        if (this.animation.t >= 1 && this.kof >= 0) {
            const random = getRandomNumber(5, 20);
            this.animation = new Bezier3Animate(
                new Vector2(this.animation.position.x, this.animation.position.y),
                new Vector2(this.animation.position.x + random * this.kof * this.pos, this.animation.position.y - 4 * this.kof),
                new Vector2(this.animation.position.x + random * this.kof * this.pos, this.animation.position.y + 2 * this.kof),
                { step: 0.05 }
            );
            this.kof -= 0.3;
        }
    }
}

export class Sleeve {
    /**
     * @param {Game} game 
     * @param {AreaColl} areaColl 
     * @param {Vector2} margin 
     */
    constructor(game, areaColl, margin) {
        this.game = game;
        this.areaColl = new AreaColl(this.game, new Vector2(areaColl.position.x + margin.x, areaColl.position.y + margin.y));
        this.areaColl.radius = 5;
        this.spriteWidth = 3;
        this.spriteHeight = 5;
        this.width = 3.75;
        this.height = 6.25;
        this.image = document.getElementById('ammo');
        this.staggerFrame = 10;
        this.countFrames = 6;
        this.frame = 0;
        this.enable = false;
        this.alpha = 0;
        this.timeLeave = Date.now();

        this.game.gameObjects.push(this);
        this.jumpSleeve = new JumpSleeve(new Vector2(this.areaColl.position.x, this.areaColl.position.y));
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        if (this.game.frameCount % this.staggerFrame == 0) {
            if (this.frame < this.countFrames) {
                this.frame++;
            }
            else {
                this.enable = true;
            }
        }
        if (!this.enable) {
            return;
        }
        this.game.fps = -100;
        this.areaColl.position.x = this.jumpSleeve.animation.position.x;
        this.areaColl.position.y = this.jumpSleeve.animation.position.y;
        context.save();
        context.globalAlpha = this.alpha;
        context.drawImage(this.image, this.spriteWidth * 0, this.spriteHeight * 0, this.spriteWidth, this.spriteHeight, this.areaColl.position.x - this.width * 0.5, this.areaColl.position.y - this.height * 0.5, this.width, this.height);
        context.restore();
        this.areaColl.draw(context);
        this.jumpSleeve.draw(context);
    }

    update() {
        this.jumpSleeve.update();
        if (this.timeLeave + 5000 <= Date.now()) {
            if(this.alpha >= 0){
                this.alpha += -0.003;
            }else{
                this.game.gameObjects.splice(this.game.gameObjects.indexOf(this), 1);
            }
        } else if (this.enable && this.alpha <= 1) {
            this.alpha += 0.3;
        }
    }
}

export class Gun {
    /**
     * @param {Game} game 
     * @param {Entity} entity 
     */
    constructor(game, entity) {
        this.game = game;
        this.entity = entity;
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {

    }

    update() {

    }

}

export class Shotgun extends Gun {
    /**
     * @param {Game} game 
     * @param {Entity} entity 
     */
    constructor(game, entity) {
        super(game, entity)
        this.maxAmmoMagazine = 2;
        this.ammunition = 2;
        this.position = new Vector2(300, 300);
        this.width = 200;
        this.height = 70;
    }

    /**
    * @param {CanvasRenderingContext2D} context 
    */
    draw(context) {

        this.position.x = this.entity.bodyColl.position.x + this.entity.bodyColl.width;
        this.position.y = this.entity.bodyColl.position.y + this.entity.bodyColl.height * 0.5;

        if (!this.game.debug) {
            return;
        }

        context.save();
        context.beginPath();
        context.moveTo(this.position.x, this.position.y);
        context.lineTo(this.position.x + this.width, this.position.y + this.height * 0.5);
        context.lineTo(this.position.x + this.width, this.position.y - this.height * 0.5);
        context.lineTo(this.position.x, this.position.y);
        context.fillStyle = 'green';
        context.stroke();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();

    }

    update() {

    }

    fire() {
        if (this.ammunition > 0) {
            this.ammunition--;
            return true;
        } else {
            return false;
        }
    }

    reload() {
        this.ammunition = this.maxAmmoMagazine;
        new Sleeve(this.game, this.entity.areaColl, new Vector2(30, -44));
        new Sleeve(this.game, this.entity.areaColl, new Vector2(25, -30));
    }

}