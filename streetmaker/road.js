class Road{
    constructor (startX, startY, endX, endY, a){
        this.start = createVector(startX, startY);
        this.end =  createVector(endX, endY);
        this.area = a;
    }

    draw() {
        push();
        stroke(255);
        line(this.start.x,this.start.y, this.end.x, this.end.y);
        pop();
    }

    setEnd(x, y) {
        this.end.x = x;
        this.end.y = y;
    }
}