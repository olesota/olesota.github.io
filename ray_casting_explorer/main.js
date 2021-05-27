let walls = [];
let particle;

let width = 1200;
let height = 800;

function setup() {
    createCanvas(width, height);
    for (let i = 0; i < 6; i++){
        let x1 = random(width);
        let y1 = random(height);
        let x2 = random(width);
        let y2 = random(height);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }
    walls.push(new Boundary(0,0,0,height));
    walls.push(new Boundary(0,0,width,0));
    walls.push(new Boundary(width,0,width,height));
    walls.push(new Boundary(0,height,width,height));
    particle = new Particle();
}
  
function draw() {
    background(0);
    //ray.lookAt(mouseX, mouseY);
    walls.forEach(wall => {
        wall.show();
    });
    if (keyIsDown(68)) {
        particle.rotate(3);
    } else if (keyIsDown(65)) {
        particle.rotate(-3);
    }
    if (keyIsDown(87)) {
        particle.move(1, walls);
    } else if (keyIsDown(83)) {
        particle.move(-1, walls);
    }
    //ray.show();
    particle.look(walls);
    //particle.pointAt(mouseX,mouseY);
    particle.show();

    // let pt = ray.cast(wall);
    // if (pt){        
    //     fill(255);
    //     ellipse(pt.x, pt.y, 10, 10);
    // }
    //noLoop();
}