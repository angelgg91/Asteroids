class Ship {
        constructor(coordX, coordY, size) {
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
        }


        drawBooster() {
        context.fillStyle = "red"
        context.strokeStyle = "yellow";
        context.lineWidth = SHIP_SIZE / 10;
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


        boostShip() {
            if (this.boosting) {
                this.momentum.x += SHIP_MOMENTUM * Math.cos(this.angle) / FPS;
                this.momentum.y -= SHIP_MOMENTUM * Math.sin(this.angle) / FPS;

                this.drawBooster();
            } else {
                this.momentum.x -= FRICTION * this.momentum.x / FPS;
                this.momentum.y -= FRICTION * this.momentum.y / FPS;
            }
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


        drawShip() {
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
    }