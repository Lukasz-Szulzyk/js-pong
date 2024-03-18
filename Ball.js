import Renderer from "./Renderer.js";

export default class Ball {
    constructor( {x, y, radius, 
                    speedX, speedY, speed = 5, 
                    canvas, color} ) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX; // wektor przesuniecia na osi x 
        this.speedY = speedY;
        this.speed = speed;
        this.canvas = canvas;
        this.color = color;

        this.renderer = Renderer.getInstance();
    }

    reset = () => {
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2;

        this.speedX = -Math.sign(this.speedX) * 3;
        this.speedY = Math.sign(this.speedY) * 3;
    }

    update = () => {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    checkWallCollision = () => {
        if (this.y - this.radius < 0 // according to top wall
           || this.y + this.radius > this.canvas.height) { // bottom wall
            this.speedY = -this.speedY; // bounceback
           } 
    }

    // square covering the ball, needed for collision checking
    getRect = () => {
        return {
            top: this.y - this.radius,
            bottom: this.y + this.radius,
            left: this.x - this.radius,
            right: this.x + this.radius
        }
    }

    getBallDirection = () => {
        if (this.x + this.radius < this.canvas.width/2) {
            return 1; // ball on player's side
        } else {
            return -1; // ball on computer's side
        }
    }

    draw = () => {
        this.renderer.drawCircle(this.x, this.y,
            this.radius, this.color);
    }
}