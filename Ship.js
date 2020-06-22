class Ship {
    constructor(coordX, coordY, size, acceleration, invis_duration, blink_duration, FPS, friction) {
        this.x = coordX;
        this.y = coordY;
        this.radius = size / 2;
        this.angle = 90 / 180 * Math.PI;  // convert to radians
        this.rotation = 0;
        this.boosting = false;
        this.momentum = {
            x: 0,
            y: 0
        };
        this.acceleration = acceleration;
        this.blinkNum = Math.ceil(invis_duration / blink_duration);
        this.blinkTime = Math.ceil(blink_duration * FPS);
        this.explodeTime = 0;
        this.spaceFriction = friction;
        this.canShoot = true;
        this.lasers = [];
        this.dead = false;
    }


    drawBooster() {
        context.fillStyle = "red"
        context.strokeStyle = "yellow";
        context.lineWidth = this.radius / 5;
        context.beginPath();
        context.moveTo( // rear left
            this.x - this.radius * (2 / 3 * Math.cos(this.angle) + Math.sin(this.angle) / 2),
            this.y + this.radius * (2 / 3 * Math.sin(this.angle) - Math.cos(this.angle) / 2)
        );
        context.lineTo( // rear centre behind the ship
            this.x - this.radius * 4 / 3 * Math.cos(this.angle),
            this.y + this.radius * 4 / 3 * Math.sin(this.angle)
        );
        context.lineTo( // rear right
            this.x - this.radius * (2 / 3 * Math.cos(this.angle) - Math.sin(this.angle) / 2),
            this.y + this.radius * (2 / 3 * Math.sin(this.angle) + Math.cos(this.angle) / 2)
        );
        context.closePath(); // completes the triangle
        context.fill();
        context.stroke();
    }


    boostShip(exploding, blinkOn) {
        if (this.boosting && !this.dead) {
            this.momentum.x += this.acceleration * Math.cos(this.angle) / FPS;
            this.momentum.y -= this.acceleration * Math.sin(this.angle) / FPS;
            if (!exploding && blinkOn) {
                this.drawBooster();
            }
        } else {
            this.momentum.x -= this.spaceFriction * this.momentum.x / FPS;
            this.momentum.y -= this.spaceFriction * this.momentum.y / FPS;
        }
    }


    reappearWhenOutOfCanvas(canv) {
        if (this.x < 0 - this.radius) {
            this.x = canv.width + this.radius;
        } else if (this.x > canv.width + this.radius) {
            this.x = 0 - this.radius;
        }
        if (this.y < 0 - this.radius) {
            this.y = canv.height + this.radius;
        } else if (this.y > canv.height + this.radius) {
            this.y = 0 - this.radius;
        }
    }


    drawShip(context) {
        context.strokeStyle = "white";
        context.lineWidth = this.radius / 10;
        context.beginPath();
        context.moveTo( // head of the ship
            this.x + 4 / 3 * this.radius * Math.cos(this.angle),
            this.y - 4 / 3 * this.radius * Math.sin(this.angle)
        );
        context.lineTo( // rear left
            this.x - this.radius * (2 / 3 * Math.cos(this.angle) + Math.sin(this.angle)),
            this.y + this.radius * (2 / 3 * Math.sin(this.angle) - Math.cos(this.angle))
        );
        context.lineTo( // rear right
            this.x - this.radius * (2 / 3 * Math.cos(this.angle) - Math.sin(this.angle)),
            this.y + this.radius * (2 / 3 * Math.sin(this.angle) + Math.cos(this.angle))
        );
        context.closePath(); // completes the triangle
        context.stroke();
    }


    rotateShip() {
        this.angle += this.rotation;
    }


    moveShip() {
        this.x += this.momentum.x;
        this.y += this.momentum.y;
    }

    explodeShip() {
        this.explodeTime = Math.ceil(SHIP_EXPLODE_DUR * FPS);
    }

    drawExplosion(context) {
        context.fillStyle = "darkred";
        context.beginPath();
        context.arc(this.x, this.y, this.radius * 1.7, 0, Math.PI * 3, false);
        context.fill();
        context.fillStyle = "red";
        context.beginPath();
        context.arc(this.x, this.y, this.radius * 1.4, 0, Math.PI * 3, false);
        context.fill();
        context.fillStyle = "orange";
        context.beginPath();
        context.arc(this.x, this.y, this.radius * 1.1, 0, Math.PI * 3, false);
        context.fill();
        context.fillStyle = "yellow";
        context.beginPath();
        context.arc(this.x, this.y, this.radius * 0.8, 0, Math.PI * 3, false);
        context.fill();
        context.fillStyle = "white";
        context.beginPath();
        context.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 3, false);
        context.fill();
    }

    checkCollisions(Asteroids) {
        for (var i = 0; i < Asteroids.length; i++) {
            if (distanceBetweenPoints(this.x, this.y, Asteroids[i].x, Asteroids[i].y) < this.radius + Asteroids[i].radius) {
                this.explodeShip();
                // kamikaze
                Asteroids[i].destroyAsteroid(Asteroids, i);
            }
        }
    }
}