import { CheckRadiusCollision } from "../engine.js";
import { Entity } from "../entity/entity.js";
import { Game } from "../game.js";

export class Player extends Entity {
    /**
     * @param {Game} game 
     * @param {Entity} entity 
     */
    constructor(game, entity) {
        super(game)
        this.game = game;
        this.entity = entity;
    }

    update() {
        let speed = this.entity.speedModifier;
        if (['down', 'up', 'left', 'right'].some(value => this.game.keys.includes(value))) {
            speed = this.speedModifier;
            this.entity.sprite.setState('move');
        } else {
            this.entity.sprite.setState('idle');
        }
        if (this.game.keys.indexOf('up') > -1 || this.game.keys.indexOf('down') > -1) {
            if (speed > 0) {
                speed = speed - 0.1;
                this.entity.sprite.setChanger(3);
            }
        }
        if (this.game.keys.indexOf('left') > -1) {
            if (speed > 0 && !this.entity.canRotate) {
                speed = speed - 0.3;
                this.entity.sprite.setChanger(5);
            } else if (this.entity.rotate != -1) {
                this.entity.rotate = this.entity.rotate * -1;
            }
        }

        if (this.game.keys.indexOf('right') > -1) {
            if (this.entity.canRotate && this.entity.rotate == -1) {
                this.entity.rotate = this.entity.rotate * -1;
            }
        }

        if (!this.entity.sprite.isBlock()) {
            if (this.game.keys.indexOf('up') > -1) {
                //Move player up
                this.entity.areaColl.position.y += -speed;
            }
            if (this.game.keys.indexOf('down') > -1) {
                //Move player bottom
                this.entity.areaColl.position.y += speed;
            }
            if (this.game.keys.indexOf('left') > -1) {
                //Move player left
                this.entity.areaColl.position.x += -speed;
            }
            if (this.game.keys.indexOf('right') > -1) {
                //Move player right
                this.entity.areaColl.position.x += speed;
            }
            // if (this.entity.gun) {
                if (this.game.keys.indexOf('reload') > -1) {
                    //Reload if isset gun
                    this.entity.sprite.setState('reload');
                }
            // }
        }

        this.game.entityObjects.forEach((objects) => {
            let [collision, distance, sumOfRadii, dx, dy] = CheckRadiusCollision(this.entity.areaColl, objects.areaColl);
            if (collision && this.entity != objects) {
                const unit_x = dx / distance;
                const unit_y = dy / distance;
                this.entity.areaColl.position.x = objects.areaColl.position.x + (sumOfRadii + 1) * unit_x;
                this.entity.areaColl.position.y = objects.areaColl.position.y + (sumOfRadii + 1) * unit_y;
            }
        });
    }
}