let bgR = 7
let bgG = 0
let bgB = 13
let p;
let g = [];
let offs = 0.0;
let polySynth;

function setup()
{
    createCanvas(600,600);
    background(bgR, bgG, bgB);
    p = new Particle();
    polySynth = new p5.PolySynth();
}

function draw()
{
    /*bgR += 17;
    bgG += 0.2 * 17;
    bgB += 17 * 0.3;*/
    if (frameCount % 60 == 0) {
    	const py = height/2 + (noise(offs)-0.5) * height / 2;
    	//console.log(py);
    	g.unshift(new Gate(-0.9, 125, py));
    	offs += 0.595;
    }

    background(231);
    p.move();
    p.show();
    let beep = 0;
    for (let i = 0; i < g.length; i++){
    	g[i].move();
    	if (g[i].posx < 0) g.pop()
    	else {
    			through = p.checkCollision(g[i].posx, g[i].posy, g[i].width);
    			beep += through;
    			if (through) g[i].show("red");
    			else g[i].show();
    		}
	}
	if (frameCount % 15 == 0) {
    	if (beep) playSynth(1);
    	else playSynth(0);
    }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    p.hop();
  }
  return false; // prevent any default behavior
}

function playSynth(bg) {
  userStartAudio();
  // note duration (in seconds)
  let velBass = 0.3;
  if (frameCount % 60 == 0) velBass = 0.45;
  let dur = 0.05;

  // time from now (in seconds)
  let time = 0;

  // velocity (volume, from 0 to 1)
  let vel = 0.3;
  if (bg == 0) {
  	polySynth.play('G2', velBass, 0, dur*3);
  	polySynth.play('D3', velBass, 0, dur*3);
  }
  else
  {
	  polySynth.play('G2', velBass, 0, dur*3);
	  polySynth.play('D3', velBass, 0, dur*3);
	  if (random() > 0.75) polySynth.play('D4', vel, 0, dur);
	  else polySynth.play('F4', vel, 0, dur);
  }	
  //polySynth.play('F4', vel, dur*2, dur);
  //polySynth.play('C3', vel, 0, dur);
}