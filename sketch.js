var song1;
var song2;
var song3;
var song4;
var buttonA;
var buttonB;
var buttonC;
var buttonD;
var slider;
var fft
var particles = []




function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  fft = new p5.FFT(0.3)
  song1 = loadSound("summer.mp3", loaded);
  song2 = loadSound("motion.mp3", loaded);
  song3 = loadSound("dream.mp3", loaded);
  song4 = loadSound("moose.mp3", loaded);
  buttonA = createButton("summer");
  buttonB = createButton("motion");
  buttonC = createButton("dream");
  buttonD = createButton("moose");
  buttonA.mousePressed(togglePlaying1);
  buttonB.mousePressed(togglePlaying2);
  buttonC.mousePressed(togglePlaying3);
  buttonD.mousePressed(togglePlaying4);
    
  slider = createSlider(0, 255, 100);
  slider.position(20, 25);
  slider.style("width", "80px");
  slider.style("accent-color", "#00BCD4");
  colorPicker = createColorPicker('#ed225d');
  colorPicker2 = createColorPicker('#ed225d');

}
function loaded() {
  console.log("loaded");
}

function togglePlaying1() {
  if (!song1.isPlaying()) {
    song1.play();
    song1.setVolume(0.3);
    buttonA.html("pause");
  } else {
    song1.pause();
    buttonA.html("summer");
  }
}
function togglePlaying2() {  
  if (!song2.isPlaying()) {
    song2.play();
    song2.setVolume(0.3);
    buttonB.html("pause");
  } else {
    song2.pause();
    buttonB.html("motion");
  }
}
function togglePlaying3() {
  if (!song3.isPlaying()) {
    song3.play();
    song3.setVolume(0.3);
    buttonC.html("pause");
  } else {
    song3.pause();
    buttonC.html("dream");
  }
}
function togglePlaying4() {
  if (!song4.isPlaying()) {
    song4.play();
    song4.setVolume(0.3);
    buttonD.html("pause");
  } else {
    song4.pause();
    buttonD.html("moose");
  }
}

function draw() {

  stroke(colorPicker.color())
  strokeWeight(3)
  noFill()

  var val = slider.value();
  background(val);

  translate(width/2,height / 2)

  fft.analyze()
  amp=fft.getEnergy(20,200)

  var wave = fft.waveform()

  for (var t = -1; t<= 1; t+=2) {
  beginShape()

  for (var i = 0; i<= 180; i+=0.5){
    var index = floor(map(i,0,180,0,wave.length-1))
    var r = map(wave[index],-1,1,150,350)

    var x = r * sin(i) * t
    var y = r* cos(i)
    vertex (x,y)

  }
  endShape()

 
}
var p = new Particle()
particles.push(p)

for (var i =particles.length -1; i >= 0; i--){
  if (!particles[i].edges()) {
  particles[i].update(amp>20)
  particles[i].show()
}else {
  particles.splice(i,1)
}
}

}





class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(250)
    this.vel = createVector(0,0)
    this.acc = this.pos.copy().mult(random(0.0001,0.00001))

    this.w = random(3,5)
  

    this.color = [random(200,255),random(200,255),random(200,255),]
  
  }

  update(cond){
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    if (cond) {
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)

    }
  }
  edges() {
    if (this.pos.x < -width / 2 || this.pos.x > width/ 2 || this.pos.y < -height/ 2 || this.pos.y > height/ 2) {
      return true
    } else {
      return false
    }
  }
  show() {
    noStroke()
    fill(this.color)
    this.color = (colorPicker2.color())
    ellipse(this.pos.x, this.pos.y,this.w)
  }
  }














