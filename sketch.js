let objects = [];
const types = ['🪨', '📄', '✂️'];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 33; i++) {
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
    for (let obj of objects) {
        obj.move();
        obj.display();
        obj.checkCollisions(objects);
    }
    displayCounters();
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

function displayCounters() {
    let rockCount = 0;
    let paperCount = 0;
    let scissorsCount = 0;

    // Count each type
    for (let obj of objects) {
        if (obj.type === '🪨') rockCount++;
        else if (obj.type === '📄') paperCount++;
        else if (obj.type === '✂️') scissorsCount++;
    }

    textAlign(CENTER, BOTTOM);
    textSize(24);
    fill(0);
    textFont('Arial');
    text(`Rock: ${rockCount} | Paper: ${paperCount} | Scissors: ${scissorsCount}`, width / 2, height - 20);
}

