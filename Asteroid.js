class Asteroid {
    constructor(coordX, coordY, size, speed, nvertices, jag) {
        this.x = coordX;
        this.y = coordY;
        this.xVelocity = Math.random() * speed / FPS * (Math.random() < 0.5 ? 1: -1);
        this.yVelocity = Math.random() * speed / FPS * (Math.random() < 0.5 ? 1: -1);
        this.radius = size / 2;
        this.angle = Math.random() * Math.PI * 2; // in radians
        this.vertices = Math.floor(nvertices - Math.random() * 10 + 5);
        this.offset = [];
        this.jaggedness = jag;
        for (var i = 0; i < this.vertices; i++) {
            this.offset.push(Math.random() * this.jaggedness * 2 + 1 - this.jaggedness);
        }
    }


    drawAsteroid() {
        context.strokeStyle = "grey";
        context.lineWidth = ASTEROID_SIZE / 30;
        // draw path
        context.beginPath();
        context.moveTo(
            this.x + this.radius * this.offset[0] * Math.cos(this.angle),
            this.y + this.radius * this.offset[0] * Math.sin(this.angle)
        );
        // draw the polygon
        for (var j = 0; j < this.vertices; j++) {
            context.lineTo(
                this.x + this.radius * this.offset[j] * Math.cos(this.angle + j * Math.PI * 2 / this.vertices),
                this.y + this.radius * this.offset[j] * Math.sin(this.angle + j * Math.PI * 2 / this.vertices)
            );
        }
        context.closePath();
        context.stroke();
    }


    moveAsteroid() {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
    }

    
    reappearWhenOutOfCanvas() {
        if (this.x < 0 - this.radius) {
            this.x = canv.width + this.radius;
        } else if (this.x > canv.width + this.radius){
            this.x = 0 - this.radius;
        }
        if (this.y < 0 - this.radius) {
            this.y = canv.height + this.radius;
        } else if (this.y > canv.height + this.radius){
            this.y = 0 - this.radius;
        }
    }
}