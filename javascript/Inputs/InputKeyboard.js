import { GameEngine } from "../engine.js";

export class InputKeyboard {
    /**
     * @param {GameEngine} game 
     */
    constructor(game) {
        this.game = game;

        window.addEventListener('keydown', e => {
            if (((e.key === 'w') ||
                (e.key === 'W') ||
                (e.key === 'ArrowUp') ||
                (e.key === 'Ц') ||
                (e.key === 'ц')
            ) && this.game.keys.indexOf('up') === -1) {
                this.game.keys.push('up');
            }
            if (((e.key === 's') ||
                (e.key === 'S') ||
                (e.key === 'ArrowDown') ||
                (e.key === 'Ы') ||
                (e.key === 'ы')
            ) && this.game.keys.indexOf('down') === -1) {
                this.game.keys.push('down');
            }
            if (((e.key === 'a') ||
                (e.key === 'A') ||
                (e.key === 'ArrowLeft') ||
                (e.key === 'Ф') ||
                (e.key === 'ф')
            ) && this.game.keys.indexOf('left') === -1) {
                this.game.keys.push('left');
            }
            if (((e.key === 'd') ||
                (e.key === 'D') ||
                (e.key === 'ArrowRight') ||
                (e.key === 'В') ||
                (e.key === 'в')
            ) && this.game.keys.indexOf('right') === -1) {
                this.game.keys.push('right');
            }
            if (((e.key === 'r') ||
                (e.key === 'R') ||
                (e.key === 'у') ||
                (e.key === 'У')
            ) && this.game.keys.indexOf('reload') === -1) {
                this.game.keys.push('reload');
            }
            if (e.key == '`') this.game.debug = !this.game.debug;
        });
        window.addEventListener('keyup', e => {
            if (((e.key === 'w') ||
                (e.key === 'W') ||
                (e.key === 'ArrowUp') ||
                (e.key === 'Ц') ||
                (e.key === 'ц')
            ) && this.game.keys.indexOf('up') > -1) {
                this.game.keys.splice(this.game.keys.indexOf('up'), 1);
            }
            if (((e.key === 's') ||
                (e.key === 'S') ||
                (e.key === 'ArrowDown') ||
                (e.key === 'Ы') ||
                (e.key === 'ы')
            ) && this.game.keys.indexOf('down') > -1) {
                this.game.keys.splice(this.game.keys.indexOf('down'), 1);
            }
            if (((e.key === 'a') ||
                (e.key === 'A') ||
                (e.key === 'ArrowLeft') ||
                (e.key === 'Ф') ||
                (e.key === 'ф')
            ) && this.game.keys.indexOf('left') > -1) {
                this.game.keys.splice(this.game.keys.indexOf('left'), 1);
            }
            if (((e.key === 'd') ||
                (e.key === 'D') ||
                (e.key === 'ArrowRight') ||
                (e.key === 'В') ||
                (e.key === 'в')
            ) && this.game.keys.indexOf('right') > -1) {
                this.game.keys.splice(this.game.keys.indexOf('right'), 1);
            }
            if (((e.key === 'r') ||
                (e.key === 'R') ||
                (e.key === 'у') ||
                (e.key === 'У')
            ) && this.game.keys.indexOf('reload') > -1) {
                this.game.keys.splice(this.game.keys.indexOf('reload'), 1);
            }
        })
    }
}