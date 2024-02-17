let objects = [];
const types = ['🪨', '📄', '✂️'];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 50; i++) {
        objects.push(new GameObject('🪨'));
        objects.push(new GameObject('📄'));
        objects.push(new GameObject('✂️'));
    }
}

function draw() {
    background(250);
    textSize(64);
    textAlign(LEFT);
    textFont('Arial');
    stroke(250);
    //text('Rock - Paper - Scissors', 20, 80);
    for (let obj of objects) {
        obj.move();
        obj.display();
        obj.checkCollisions(objects);
    }
}

class GameObject {
    constructor(type) {
        this.x = random(width);
        this.y = random(height);
        this.type = type;
        this.velocity = createVector(random(-3, 3), random(-3, 3));
    }

    move() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Wrap around edges
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
    }

    display() {
        textSize(32);
        text(this.type, this.x, this.y);
    }

    checkCollisions(others) {
        for (let other of others) {
            if (other !== this && dist(this.x, this.y, other.x, other.y) < 20) {

                this.velocity.x *= -1;
                this.velocity.y *= -1;
                other.velocity.x *= -1;
                other.velocity.y *= -1;

                //Conversion
                if (this.type === '🪨' && other.type === '✂️') {
                    other.type = '🪨';
                } else if (this.type === '✂️' && other.type === '📄') {
                    other.type = '✂️';
                } else if (this.type === '📄' && other.type === '🪨') {
                    other.type = '📄';
                }
            }
        }
    }

}
