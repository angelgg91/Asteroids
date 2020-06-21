class Laser {
    constructor(ship, LaserSpeed, maxDistance) {
        this.x = ship.x + 4 / 3 * ship.radius * Math.cos(ship.angle),
        this.y = ship.y - 4 / 3 * ship.radius * Math.sin(ship.angle)
        this.xVel = LaserSpeed * Math.cos(ship.angle) / FPS;
        this.yVel = -LaserSpeed * Math.sin(ship.angle) / FPS;
        this.distanceTravelled = 0;
        this.maxDistance = maxDistance;
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

}