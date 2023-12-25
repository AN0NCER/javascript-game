import { GameEngine } from "../engine.js";

export class InputMouse{
    /**
     * @param {GameEngine} game 
     */
    constructor(game){
        this.game = game;
        window.addEventListener('mousedown', e => {
            if(e.button === 0 && this.game.buttons.indexOf('mousLeft') === -1){
                this.game.buttons.push('mousLeft')
            }
            if(e.button === 2 && this.game.buttons.indexOf('mousRight') === -1){
                this.game.buttons.push('mousRight')
            }
           
        })
        window.addEventListener('mouseup', e => {
            if(e.button === 0 && this.game.buttons.indexOf('mousLeft') > -1){
                this.game.buttons.splice(this.game.buttons.indexOf('mousLeft'), 1);
            }
            if(e.button === 2 && this.game.buttons.indexOf('mousRight') > -1){
                this.game.buttons.splice(this.game.buttons.indexOf('mousRight'), 1);
            }
        });
    }
}