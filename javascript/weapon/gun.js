import { Vector2, getRandomNumber } from "../engine.js";
import { AreaColl, Entity } from "../entity/entity.js";
import { Game } from "../game.js";

export class Sleeve{

    /**
     * @param {Game} game 
     * @param {AreaColl} areaColl 
     */   
    constructor(game, areaColl){
        this.game = game;
        this.areaColl = new AreaColl(this.game, new Vector2(getRandomNumber(areaColl.position.x - 15, areaColl.position.x + 15), getRandomNumber(areaColl.position.y - 15, areaColl.position.y + 15)));
        this.areaColl.radius = 5;
        this.position = new Vector2(this.areaColl.position.x, this.areaColl.position.y);
        this.spriteWidth = 3;
        this.spriteHeight = 5;
        this.width = 3.75;
        this.height = 6.25;
        this.image = document.getElementById('ammo');

        this.game.gameObjects.push(this);
    }

    draw(context){
        this.areaColl.draw(context);
        context.drawImage(this.image, this.spriteWidth * 0, this.spriteHeight * 0, this.spriteWidth, this.spriteHeight, this.position.x-this.width*0.5, this.position.y-this.height*0.5, this.width, this.height);
    }

    update(){

    }

}

export class Gun{
    /**
     * @param {Game} game 
     * @param {Entity} entity 
     */
    constructor(game, entity){
        this.game = game;
        this.entity = entity;
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context){

    }

    update(){
        
    }

}

export class Shotgun extends Gun{
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
    draw(context){

        this.position.x = this.entity.bodyColl.position.x + this.entity.bodyColl.width;
        this.position.y = this.entity.bodyColl.position.y + this.entity.bodyColl.height * 0.5;

        if(!this.game.debug){
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

    update(){

    }

    fire(){
        if(this.ammunition > 0){
            this.ammunition--;
            return true;
        }else{
            return false;
        }
    }

    reload(){
        this.ammunition = this.maxAmmoMagazine;
        new Sleeve(this.game, this.entity.areaColl);
    }

}