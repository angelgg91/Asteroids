class Laser {
    constructor(ship, LaserSpeed, maxDistance) {
        this.x = ship.x + 4 / 3 * ship.radius * Math.cos(ship.angle),
        this.y = ship.y - 4 / 3 * ship.radius * Math.sin(ship.angle)
        this.xVel = LaserSpeed * Math.cos(ship.angle) / FPS;
        this.yVel = -LaserSpeed * Math.sin(ship.angle) / FPS;
        this.distanceTravelled = 0;
        this.maxDistance = maxDistance;
        this.explodeDuration = 0;
    }

    drawLaser(context) {
        // check if laser is not exploding
        if (this.explodeDuration == 0) {
            context.fillStyle = "red";
            context.beginPath();
            context.arc(this.x, this.y, SHIP_SIZE / 15, 0, Math.PI * 2, false);
            context.fill();
        } else { // draw explosion
            context.fillStyle = "darkred";
            context.beginPath();
            context.arc(this.x, this.y, SHIP_SIZE * 0.5, 0, Math.PI * 2, false);
            context.fill();
            context.fillStyle = "red";
            context.beginPath();
            context.arc(this.x, this.y, SHIP_SIZE * 0.25 , 0, Math.PI * 2, false);
            context.fill();
            context.fillStyle = "orange";
            context.beginPath();
            context.arc(this.x, this.y, SHIP_SIZE * 0.1 , 0, Math.PI * 2, false);
            context.fill();
        }
    }

    reappearWhenOutOfCanvas(canv) {
        if (this.x < 0) {
            this.x = canv.width;
        } else if (this.x > canv.width) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = canv.height;
        } else if (this.y > canv.height) {
            this.y = 0;
        }
    }


    calculateDistanceTravelled() {
        this.distanceTravelled += Math.sqrt(Math.pow(this.xVel, 2) + Math.pow(this.yVel, 2));
    }


    moveLaser(){
        this.x += this.xVel;
        this.y += this.yVel;
    }
}