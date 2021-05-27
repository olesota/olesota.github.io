class Particle{
    constructor(fOV = 60){
        this.rays = [];
        this.tactile = [];
        this.radius = 6;
        this.pos = createVector(width/2, height - this.radius * 3);
        this.fieldOfView = fOV;
        this.heading = -90;
        this.speed = 4;
        this.lightBrightness = 1;
        this.lightOffs = 0.0;
        for (let i=0; i < this.fieldOfView; i+= 1) {
            this.rays.push(new Ray(this.pos, radians(this.heading + i - this.fieldOfView/2)));
        }
        for (let i=0; i < 2; i+=1) {
            this.tactile.push(new Ray(this.pos, radians(this.heading + i*180)));
        }
        /*this.pos = createVector(width/2, 70);
        for (let i=-1; i < 2; i+= 2) {
            this.rays.push(new Ray(this.pos, radians(90*i)));
        }*/
    }

    blinkLight(){
        this.lightOffs += 0.1
        this.lightBrightness = noise(this.lightOffs)
    }

    show() {
        this.blinkLight()
        push();
        fill(255);
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, this.radius);
        /*for (let t of this.tactile) {
            stroke(90,0,0);
            line(0, 0, t.dir.x*10, t.dir.y*10);
        }*/
        pop();
    }

    rotate(angle) {
        this.heading += angle;
        for (let i=0; i < this.rays.length; i+= 1) {
            this.rays[i].setAngle(radians(this.heading + i - this.fieldOfView/2));
        }
        for (let i=0; i < 2; i+=1) {
            this.tactile[i].setAngle(radians(this.heading + i*180));
        }
        //console.log(x,y,this.dir,this.angle);
    }

    move(dir, walls) {
        const offsetVector = p5.Vector.fromAngle(radians(this.heading)).mult(this.speed * dir);
        let t = null;
        if (dir < 0) {
            t = this.tactile[1];
        }
        else {
            t = this.tactile[0];
        }
            let record = Infinity;
            let closest = null;
            let closestWall = null;
            for(let wall of walls) {
                const pt = t.cast(wall);
                if (pt) {
                    //line(this.pos.x, this.pos.y, pt.x, pt.y);
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                        closestWall = wall;
                    }
                }
            }
            if ((closest != null) && (record <= 2* this.radius)) {
               // this.pos = this.pos.add(offsetVector.mult((record-this.radius)/this.speed));
               const wallVector = createVector(closestWall.a.x - closestWall.b.x, closestWall.a.y - closestWall.b.y);
               const angle = (degrees(wallVector.angleBetween(offsetVector)));
               const angleRate = 0;
               console.log(angle);
               if (angle > 0) {
                    if (angle < 90){
                       this.rotate( -angle * angleRate);
                    }
                    else {
                        this.rotate( -(angle -180) * angleRate);
                    }
                } else {
                    if (angle > -90){
                        this.rotate( abs(angle) * angleRate);
                    }
                    else if (angle < -90) {
                         this.rotate( -(angle+180) * angleRate);
                    }
                }
            } else {
                this.pos = this.pos.add(offsetVector);
            }
    }

    look(walls) {
        for (let ray of this.rays) {
            let record = Infinity;
            let closest = null;
            //let index = 0;
            for(let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    //line(this.pos.x, this.pos.y, pt.x, pt.y);
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
                //index += 1;
            }
            if (closest != null) {
                stroke(255, 70 + 70*this.lightBrightness);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
        }
    }

    update(x,y){
        this.pos.set(x,y);
        //this.pos = createVector(x,y); // why doexn't work?
    }
}