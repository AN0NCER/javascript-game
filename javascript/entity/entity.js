import { CheckRadiusCollision, GameEngine, Vector2 } from "../engine.js";
import { Game } from "../game.js";

export class AreaColl {
    /**
     * @param {GameEngine} game 
     * @param {Vector2} [position=new Vector2(0, 0)]
     */
    constructor(game, position = new Vector2(0, 0)) {
        this.game = game;
        this.position = position;
        this.radius = 13;
    }
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        if (this.game.debug) {
            context.beginPath();
            context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
            context.save();
            context.globalAlpha = 0.4;
            context.fill();
            context.restore();
            context.stroke();
        }
    }
}

export class BodyColl {
    /**
     * @param {GameEngine} game 
     * @param {Entity} entity 
     * @param {Object} [param1={ }] 
     * @param {number} [param1.width=0] 
     * @param {number} [param1.height=0] 
     */
    constructor(game, entity, { width = 0, height = 0 } = {}) {
        this.game = game;
        this.area = entity.areaColl;
        this.position = new Vector2(this.area.position.x, this.area.position.y);
        this.width = width;
        this.height = height;
    }
    /**
    * @param {CanvasRenderingContext2D} context 
    */
    draw(context) {
        this.position.x = this.area.position.x - this.width * 0.5;
        this.position.y = this.area.position.y - this.height;
        if (this.game.debug) {
            context.stroke();
            context.beginPath();
            context.rect(this.position.x, this.position.y, this.width, this.height);
            context.save();
            context.globalAlpha = 0.5;
            context.fillStyle = 'green';
            context.fill();
            context.restore();
            context.stroke();
        }
    }
}

export class Entity {
    /**
     * @param {Game} game 
     */
    constructor(game) {
        this.game = game;
        this.areaColl = new AreaColl(game);
        this.bodyColl = new BodyColl(game, this, { width: 25, height: 50 });
        this.sprite = new Animation(game)
        this.speedModifier = 0.7;
        this.canRotate = false;
        this.rotate = 1;
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
    }
    /**
    * @param {CanvasRenderingContext2D} context 
    */
    drawEngine(context) {
        this.areaColl.draw(context);
        this.bodyColl.draw(context);
    }

    update() {
    }
}

export class Animation {
    /**
     * @param {Game} game 
     * @param {Object} [param1={}] 
     * @param {string} [param1.name='idle'] 
     * @param {number} [param1.frameY=0] 
     * @param {number} [param1.staggerFrame=0] 
     * @param {number} [param1.countFrames=0] 
     */
    constructor(game, { name = 'idle', frameY = 0, staggerFrame = 0, countFrames = 0 } = {}) {
        this.game = game;
        this.name = name;
        this.frameY = frameY;
        this.frameX = 0;
        this.staggerFrame = staggerFrame;
        this.countFrames = countFrames;
        this.stagerChanger = 0;
        this.state = [{ id: 'idle', frameY: 0, countFrames: 3, staggerFrame: 20 }];
        this.blockState = [];
        this.blockReturns = [];
        this.ended = 0
    }

    animate() {
        if (this.game.frameCount % (this.staggerFrame + this.stagerChanger) == 0) {
            if (this.frameX < this.countFrames) { this.frameX++; }
            else if (this.blockReturns.indexOf(this.name) > -1) this.name = 'none';
            else { this.frameX = 0; this.ended++; if (this.ended > 9) this.ended = 0; }
        }
    }

    /**
     * @param {string} state 
     */
    setState(state) {
        if (this.name == state || this.blockReturns.indexOf(this.name) != -1) {
            return;
        }
        const index = this.state.findIndex(x => x.id == state);
        if (index > -1) {
            const animation = this.state[index];
            this.name = animation.id;
            this.frameX = 0;
            this.frameY = animation.frameY;
            this.countFrames = animation.countFrames;
            this.staggerFrame = animation.staggerFrame;
            this.ended = 0;
        }
    }

    setChanger(stagerChanger) {
        if (stagerChanger == this.stagerChanger) {
            return;
        } else {
            this.stagerChanger = stagerChanger;
            return;
        }
    }

    isBlock() {
        if (this.blockReturns.indexOf(this.name) > -1) {
            return true;
        }
        return false;
    }
}