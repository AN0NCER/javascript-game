import { Vector2 } from "./engine.js";

//@AN0NCER
export class Bezier {
    /**
     * @param {Vector2} v1 
     * @param {Vector2} v2 
     * @param {Vector2} v3 
     */
    constructor(v1, v2, v3) {
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
        this.showPoints = false;
        this.t = 0;
        this.step = 0.05;
        this.pointsRadius = 3;
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) { }
    /**
    * @param {CanvasRenderingContext2D} context 
    */
    debug(context) {
        if (!this.showPoints) {
            return
        }
        context.beginPath();
        context.arc(this.v1.x, this.v1.y, this.pointsRadius, 0, Math.PI * 2);
        context.fill();
        context.beginPath();
        context.arc(this.v2.x, this.v2.y, this.pointsRadius, 0, Math.PI * 2);
        context.fill();
        context.beginPath();
        context.arc(this.v3.x, this.v3.y, this.pointsRadius, 0, Math.PI * 2);
        context.fill();
    }

    update() { }
}
//@AN0NCER
export class Bezier3Animate extends Bezier {
    /**
     * @param {Vector2} v1 
     * @param {Vector2} v2 
     * @param {Vector2} v3 
     * @param {Object} [param3={}] 
     * @param {boolean} [param3.showPoints=false] 
     * @param {number} [param3.step=0.05] 
     * @param {boolean} [param3.once=true] 
     */
    constructor(v1, v2, v3, { showPoints = false, step = 0.05, once = true } = {}) {
        super(v1, v2, v3);
        this.showPoints = showPoints;
        this.step = step;
        this.once = once;
        this.position = new Vector2();
    }
    /**
    * @param {CanvasRenderingContext2D} context 
    */
    draw(context) {
        this.debug(context);
        if (this.t < 1) {
            this.t += this.step;
        } else if (!this.once) {
            this.t = 0;
        }
        const x1 = this.v1.x + (this.v2.x - this.v1.x) * this.t;
        const y1 = this.v1.y + (this.v2.y - this.v1.y) * this.t;
        const x2 = this.v2.x + (this.v3.x - this.v2.x) * this.t;
        const y2 = this.v2.y + (this.v3.y - this.v2.y) * this.t;
        const x3 = x1 + (x2 - x1) * this.t;
        const y3 = y1 + (y2 - y1) * this.t;
        this.position.x = x3;
        this.position.y = y3;
        if (!this.showPoints) {
            return;
        }
        context.beginPath();
        context.arc(x3, y3, this.pointsRadius, 0, Math.PI * 2);
        context.stroke();
    }
}

//@AN0NCER
export class Bezier3Draw extends Bezier {
    /**
    * @param {Vector2} v1 
    * @param {Vector2} v2 
    * @param {Vector2} v3 
    * @param {Object} [param3={}] 
    * @param {boolean} [param3.showPoints=false] 
    * @param {number} [param3.step=0.05] 
    * @param {boolean} [param3.once=true] 
    */
    constructor(v1, v2, v3, { showPoints = false, step = 0.05 } = {}) {
        super(v1, v2, v3);
        this.showPoints = showPoints;
        this.step = step;
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        this.debug(context);
        context.beginPath();
        for (this.t = 0; this.t <= 1; this.t += this.step) {
            const x1 = this.v1.x + (this.v2.x - this.v1.x) * this.t;
            const y1 = this.v1.y + (this.v2.y - this.v1.y) * this.t;
            const x2 = this.v2.x + (this.v3.x - this.v2.x) * this.t;
            const y2 = this.v2.y + (this.v3.y - this.v2.y) * this.t;
            const x3 = x1 + (x2 - x1) * this.t;
            const y3 = y1 + (y2 - y1) * this.t;
            context.lineTo(x3, y3);
        }
        context.stroke();
    }
}