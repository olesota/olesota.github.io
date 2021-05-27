class Song {

    constructor (x, y, a) {
        this.home = createVector(x, y);
        this.pos = createVector(x, y);
        this.popul = pop;

        this.vel = createVector(0, 0);

        this.area = a;
        this.r = a/2;
        this.att = 1.5 * a;
        this.inter_cutoff = 15;
    }

    draw() {
        push();

        this.attractToHome();
        if (this.vel.mag() < 0.1) this.vel = createVector(0, 0);
        if (this.vel.mag() > 10) this.vel.setMag(10);
        this.pos = p5.Vector.add(this.vel,this.pos);
        
        circle(this.pos.x, this.pos.y, this.r)
        this.vel = createVector(0, 0);

        pop();
    }

    interactWithPoint(targetPos) {
        const d = this.pos.dist(targetPos);

        if (d > this.inter_cutoff) return;

        const addVel = (p5.Vector.sub(this.pos, targetPos)).setMag((this.att)/d/d);
        this.vel = p5.Vector.add(this.vel, addVel);
        this.vel.setMag(max(0.1, this.vel.mag()))
    }

    attractToHome() {
        const d = this.home.dist(this.pos);
        const toHome = (p5.Vector.sub(this.home, this.pos)).setMag(d*0.01);
        this.vel = p5.Vector.add(this.vel, toHome);
    }
    /* Dists to lines */
    orthogonalProjection2(a, b) {
  
        // find nearest point alont a SEGMENT 
        
        const d1 = p5.Vector.sub(b, a);
        const d2 = p5.Vector.sub(this.pos, a);
        const l1 = d1.mag();
        
        const dotp = constrain(d2.dot(d1.normalize()), 0, l1);
            
        return p5.Vector.add(a, d1.mult(dotp))
        
      }

    interactWithRoad(road) {
        const op = this.orthogonalProjection2(road.start, road.end);
        this.interactWithPoint(op);
    }
}