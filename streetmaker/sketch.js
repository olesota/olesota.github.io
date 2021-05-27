const width = 700; //529
const height = 700;

let noise_off = 0.0;
const noise_step = 17.1

const k = 600;
let points = [];
let roads = [];

let bg_city;

let drawing = false;

let slider;

function setup() {
  bg_city = loadImage('tokyo.jpg')
  cnv = createCanvas(width, height);

  cnv.parent("content");
  cnv.mousePressed(startRoad);
  cnv.mouseReleased(endRoad);

  slider = createSlider(0, 255, 255);
  slider.parent("content");
  //slider.position(width/2 - 55, height - 10)

  for(i = 0; i < k; i++) {
    points.push(new Song(width * noise(noise_off), height * noise(noise_off + noise_step), 15));
    noise_off += 3.2;
  }
  //roads.push(new Road(302, 40, 304, 80))
  //points.push(new Song(300, 150));
  //points.push(new Song(305, 150));
}

function draw() {
    background(bg_city);
    push();
    stroke(255);
    fill(255, 255, 255, slider.value())
    rect(0, 0, width, height)
    pop();
    for(i = 0; i < points.length; i++) {
        for(m = 0; m < roads.length; m++) {
            points[i].interactWithRoad(roads[m]);
        }
        for(j = 0; j < points.length; j++) {
            if (i == j) continue;
            points[i].interactWithPoint(points[j].pos);
        }
    }

    for(i = 0; i < points.length; i++) {
        points[i].draw();
    }


    if (drawing) {
        roads[roads.length - 1].setEnd(mouseX, mouseY);
    }
    for(i = 0; i < roads.length; i++) {
        roads[i].draw();
    }
}

function startRoad() {
    roads.push(new Road(mouseX, mouseY, mouseX, mouseY, 50));
    drawing = true;
}

function endRoad() {
    drawing = false;
}