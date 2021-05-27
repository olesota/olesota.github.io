class Particle {
    constructor() {
        this.pos = createVector(60, height/3);
        this.vel = createVector(0, 0);
        this.grav = createVector(0, 0.12);
        this.hopPower = createVector(0, -4.3);
        this.xRad = 10;
        this.yRad = 20;
        this.hopTimer = -1;
        this.hitTimer = -1;
        this.hopCD = 10;
        this.passTimer = -1;
    }

    decTimers(){
        if (this.hitTimer >= 0) this.hitTimer--;
        if (this.hopTimer >= 0) this.hopTimer--;
        if (this.passTimer >= 0) this.passTimer--;
    }

    move() {
        this.decTimers();
        this.vel.add(this.grav);
        this.pos.add(this.vel);
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(166, 151, 178);
        fill(166, 151, 178);
        ellipse(0, 0, this.xRad, this.yRad);
        pop();
    }

    hop() {
        if (this.hopTimer >= 0) return;
        this.vel.add(this.hopPower);
        this.hopTimer = this.hopCD;
    }

    checkCollision(Gposx, Gposy, Gwidth) {
        //if (this.hitTimer >= 0) return;
        if (((this.pos.x - this.xRad/2.02) <= Gposx) & (Gposx <= (this.pos.x + this.xRad/2.02))) {
        //if (((this.pos.x - this.xRad/2) <= Gposx) & (Gposx <= (this.pos.x + this.xRad/2))) {
            if (((this.pos.y - this.yRad/2.02) >= Gposy - Gwidth/2) & ((this.pos.y + this.yRad/2.02) <= Gposy + Gwidth/2)) {
                console.log("clear gates!")
                return 1;
            }
            else {
                console.log("BOOM!");
                this.hitTimer = this.xRad + 1;
                return 0;
            }
        }
        return 0;
    }
}
