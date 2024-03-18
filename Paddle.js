import Renderer from "./Renderer.js";

export default class Paddle {
    constructor( {score, x, y, width, height, color, canvas} ) {
        this.score = score;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.canvas = canvas;

        this.renderer = Renderer.getInstance();
    }

    getScore = () => {
        return this.score;
    }

    addPoint = () => {
        this.score++;
    }


    computeAI = (ball) => {
        this.y += (ball.y - (this.y + this.height/2) ) * 0.05;
    }

    getRect = () => {
        return {
            top: this.y,
            bottom: this.y + this.height,
            left: this.x,
            right: this.x + this.width
        }
    }

    checkCollision = (ball) => {
        const b = ball.getRect(); // ball square
        const p = this.getRect(); // paddle rectangle

        return b.top <= p.bottom // on y axis
            && b.right >= p.left // x axis
            && b.bottom >= p.top // y axis
            && b.left <= p.right; // x axis
    }

    // collision poin betweel palette and the ball
    getCollisionPoint =  (ball) => {
        let collidePoint = ball.y - (this.y + this.height / 2 );
        collidePoint = collidePoint / (this.height/2);
        return collidePoint;
    }

    movePaddle = (e) => {
        let rect = this.canvas.getBoundingClientRect();
        this.y = e.clientY - rect.top - this.height / 2;
    }

    draw = () => {
        this.renderer.drawRect(this.x, this.y, 
            this.width, this.height, this.color);
    }
}