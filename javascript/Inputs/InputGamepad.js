import { GameEngine } from "../engine.js";

export class InputGamepad {
    /**
     * @param {GameEngine} game 
     */
    constructor(game) {
        this.game = game;
        this.gamepad = [];

        window.addEventListener('gamepadconnected', (e) => {
            this.gamepad.push(e.gamepad.index);
            if (this.game.debug) {
                console.log(
                    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
                    e.gamepad.index,
                    e.gamepad.id,
                    e.gamepad.buttons.length,
                    e.gamepad.axes.length,
                );
            }
        });

        window.addEventListener('gamepaddisconnected', (e) => {
            this.gamepad.splice(this.gamepad.indexOf(e.gamepad.index), 1)
            if (this.game.debug) {
                console.log(
                    "Gamepad disconected at index %d: %s. %d buttons, %d axes.",
                    e.gamepad.index,
                    e.gamepad.id,
                    e.gamepad.buttons.length,
                    e.gamepad.axes.length,
                );
            }
        })
    }
}