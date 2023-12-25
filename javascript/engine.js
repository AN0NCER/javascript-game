import { AreaColl } from "./entity/entity.js";

export class GameEngine {
    constructor() {
        this.debug = false;
        this.frameCount = 0;
        this.lastTime = Date.now();
        this.timer = 0;
        this.fps = 120;
        this.interval = 700 / this.fps;
    }

    countFps() {
        this.frameCount++;
        const currentTime = Date.now();
        const elapsedTime = currentTime - this.lastTime;
        if (elapsedTime >= 1000) {
            // Рассчитываем FPS и обновляем переменные
            if (this.debug) {
                this.fps = Math.round((this.frameCount / elapsedTime) * 1000);
                // Выводим FPS в консоль (или куда-то еще, например, на экран)
                console.log(`FPS: ${this.fps}`);
            }
            this.frameCount = 0;
            this.lastTime = currentTime;
        }
    }
}

export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

/**
 * @param {AreaColl} a 
 * @param {AreaColl} b 
 * @returns [boolea, ce, sumOfRadii, dx, dy]
 */
export function CheckRadiusCollision(a, b) {
    const dx = a.position.x - b.position.x;
    const dy = a.position.y - b.position.y;
    const distance = Math.hypot(dy, dx);
    const sumOfRadii = a.radius + b.radius;
    return [(distance < sumOfRadii), distance, sumOfRadii, dx, dy];
}

/**
 * @param {number} min 
 * @param {number} max 
 * @returns number
 */
export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}