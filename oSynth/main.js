let bgR = 70
let bgG = 50
let bgB = 130
let p;
let g = [];
let offs = 0.0;

let oSynth;
let masterSound;
let slider;

let osc;
let playing;
let cnv;

function setup()
{
  cnv = createCanvas(100,100);
  background(bgR, bgG, bgB);

  freqs_1 = [
    650, 2300, 300, 3650, 2450, 4700, 2000, 750, 900, 1200, 2100, 700, 2250, 800,
    2500, 2600, 500, 250, 1600, 0, 1650, 1550, 1500, 1450, 1400, 1350, 1300, 1250,
    1700, 1150, 1100, 1750, 1800, 1850, 1900, 1950, 2050, 2150, 2550, 600, 550, 2800,
    3350, 3700, 3950, 4200, 4600, 4950, 5300, 3200
  ]
  freqs_1_1 = []

  for(let i=0; i<freqs_1.length; i++){
    freqs_1_1.push(Math.trunc(freqs_1[i]/2));
  }

  amps_1 = [
    0.378336237, 0.379754013, 0.385076473, 0.386142612, 0.388479545, 0.398532458,
      0.398738378, 0.406690404, 0.407841465, 0.408639807, 0.419549237, 0.435534282,
      0.41681191, 0.430925707, 0.433868181, 0.424477292, 0.420628127, 0.415510981,
      0.413423169, 0.449478705, 0.629157642, 0.608013229, 0.481689906, 0.688126801,
      0.464216738, 0.664263497, 0.717689042, 0.678924518, 1, 0.522928296, 0.522408053,
      0.720048604, 0.708950773, 0.712231165, 0.955338653, 0.883894441, 0.563471087,
      0.595923585, 0.716914956, 0.539459763, 0.490057894, 0.465489947, 0.46416344,
      0.488470669, 0.595537319, 0.491100078, 0.457367287, 0.484729634, 0.486817558,
      0.462447225
  ]

  oSynth = new oscSynth(
    //frequencies
    freqs_1_1,
    //amplitudes
    amps_1,
    // ignore for now
    0.9);

  //var slider = document.getElementById("masterSlider");
  //slider.oninput = function() {
  //  masterSound = this.value;
  //}

  //cnv.mousePressed(oSynth.startOscSynth);
}
function mousePressed() {
  oSynth.startOscSynth()
}
function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  oSynth.stopOscSynth();
}

function draw()
{
  
}