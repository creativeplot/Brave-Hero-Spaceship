

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

class Rectangle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    isCollidingWith(rect) {
        return !(this.x > rect.x + rect.width ||
                 this.x + this.width < rect.x ||
                 this.y > rect.y + rect.height ||
                 this.y + this.height < rect.y);
    }

    isCollidingWithCircle(circle) {
        const distX = Math.abs(circle.x - this.x - this.width / 2);
        const distY = Math.abs(circle.y - this.y - this.height / 2);

        if (distX > (this.width / 2 + circle.radius) || distY > (this.height / 2 + circle.radius)) {
            return false;
        }

        if (distX <= (this.width / 2) || distY <= (this.height / 2)) {
            return true;
        }

        const dx = distX - this.width / 2;
        const dy = distY - this.height / 2;
        return (dx * dx + dy * dy <= (circle.radius * circle.radius));
    }
}

class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    isCollidingWith(circle) {
        const dx = this.x - circle.x;
        const dy = this.y - circle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius + circle.radius;
    }
}

class Game {
    constructor() {
        this.rect1 = new Rectangle(100, 100, 150, 100, 'blue');
        this.rect2 = new Rectangle(200, 150, 150, 100, 'green');
        this.circle1 = new Circle(300, 300, 50, 'red');
        this.circle2 = new Circle(400, 300, 50, 'yellow');
    }

    update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.rect1.draw();
        this.rect2.draw();
        this.circle1.draw();
        this.circle2.draw();

        if (this.rect1.isCollidingWith(this.rect2)) {
            console.log('Rectangle Collision Detected!');
        }
        if (this.circle1.isCollidingWith(this.circle2)) {
            console.log('Circle Collision Detected!');
        }
        if (this.rect1.isCollidingWithCircle(this.circle1)) {
            console.log('Rectangle-Circle Collision Detected!');
        }

        requestAnimationFrame(this.update.bind(this));
    }

    start() {
        this.update();
    }
}

const game = new Game();
game.start();

