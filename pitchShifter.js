//SOUND VARS
var sample, sample1, beat, box, drum, myPart;

//PATTERNING
var boxPat = [1,0,0,2,0,2,0,0];
var drumPat = [0,1,1,0,2,0,1,0];


//SENSOR VALUES
var pitch_slider;
var bpm_slider;
var playing = false;
var colorValue = 70;

var wave;
var button;



// The midi notes of a scale
// C is 60, C# is 61, D is 62, 71 is A#, other C is 73
var notes = [ 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73];
var index = 0;
var song = [
  { note: 0, duration: 200, display: "C" },
  { note: 1, duration: 200, display: "C#" },
  { note: 2, duration: 700, display: "D" },
  { note: 3, duration: 200, display: "D#" },
  { note: 4, duration: 400, display: "E" },
  { note: 10, duration: 700, display: "A#" },
  { note: 5, duration: 400, display: "F" },
  { note: 6, duration: 400, display: "F#" },
  { note: 10, duration: 400, display: "C"},
  { note: 7, duration: 700, display: "G" },
  { note: 8, duration: 700, display: "G#" },
  { note: 9, duration: 400, display: "A" },
  { note: 10, duration: 200, display: "A#" },
];
var trigger = 0;
var autoplay = false;


function preload() {
  sample1 = loadSound('samples/piano_trill.wav');
  drum = loadSound('samples/hats.wav');
  beat = loadSound('samples/beat_groove.wav');
  box = loadSound('samples/Sonny_bright_note.wav');
  
}

function setup() {
    //CANVAS
    canvas = createCanvas(1100, 900);
    canvas.position(100,200);
    
    //HEADER
    header = createP("H U M A N - S E N S O R - M U S I C");
    header.position(400,20);
    header.style("font-family","Fugaz One");
    header.style("color", "#FFFFFF");
    header.style("font-size", "20pt");
  
    img = createImg("https://fuzzywobble.com/images/sin_03.gif");
    img.position(200,100);
    img.size(800,30);
    
    //MIDI BOARD
    var midi_div = createDiv("Click to play notes or ");
    midi_div.id("instructions");
    var button = createButton("play song automatically.");
    button.parent("instructions");
    // Trigger automatically playing
    button.mousePressed(function() {
      if (!autoplay) {
        index = 0;
        autoplay = true;
      }
    });
    midi_div.position(100,230);
  
    //FREQUENCIES TO BE CHANGED
    wave = new p5.Oscillator();
    wave.setType('sine');
    wave.start();
    wave.amp(0);

    var pitch_div = createDiv("Pitch slider here");
    pitch_div.id("pitch");
    var pitch_slider = createSlider(20, 200, 100); //starts at A note, fre between 100-1200
    pitch_slider.parent("pitch");
    pitch_div.position(100,700);
    
    var pitch_info = createDiv("Use up & down arrows to adjust pitch");
    pitch_info.position(500,650);
    
    var bpm_div = createDiv("BPM slider here ");
    bpm_div.id("bpm");
    bpm_slider = createSlider(0, 160, 50);
    bpm_slider.parent("bpm");
    bpm_div.position(400,700);
    
    play_button = createButton('Play/Pause beat');
    play_button.mousePressed(toggle);
    play_button.position(100,630);
    
}
  


// KEYBOARD FUNCTION: A function to play a note
function playNote(note, duration) {
  wave.freq(midiToFreq(note));
  // Fade it in
  wave.fade(0.5,0.2);

  // If we set a duration, fade it out
  if (duration) {
    setTimeout(function() {
      wave.fade(0,0.2);
    }, duration-50);
  }
}


function toggle(){
  if(!playing){
    wave.amp(0.5, 1); //1 second fade in
    playing = true;
    myPart.loop()
  } else {
    //wave.stop();
    wave.amp(0, 1);
    playing = false;
    myPart.stop();
    
  }
}

function draw() {    
    var bpm_value = bpm_slider.value();
    
    var boxPhrase = new p5.Phrase('box', playBox, boxPat);
    var drumPhrase = new p5.Phrase('drum', playDrum, drumPat);
    myPart = new p5.Part();
    myPart.addPhrase(boxPhrase);
    myPart.addPhrase(drumPhrase);
    myPart.setBPM(bpm_value);
    masterVolume(0.1);
    
  
    //PITCH SHIFTER
    background(255, 191, 0);
    if (mouseButton == LEFT) {
      fill(0);   // Black
    }
    else if (mouseButton == RIGHT) {
      fill(255); // White
    }
    else {
      fill(126); // Gray
    }
    //rect(40, 20, 40, 60);
  
    //OSCILLATOR FREQUENCY
    //var freq = map(mouseX, 0, width, 40, 880);
    //wave.freq(freq);
    // change oscillator frequency based on slider
    //wave.freq(pitch_slider.value());
    
    //KEYBOARD
    
    //Keyboard autoplay
    // If we are autoplaying and it's time for the next note
    if (autoplay && millis() > trigger){
      playNote(notes[song[index].note], song[index].duration);
      trigger = millis() + song[index].duration;
      // Move to the next note
      index ++;
    // We're at the end, stop autoplaying.
    } else if (index >= song.length) {
        autoplay = false;
    }


  // DRAW KEYBOARD
  //var w = width / notes.length; // key width
  var w = 100;
  for (var i = 0; i < notes.length; i++) {
    var x = i * w;
    // If the mouse is over the key
    if (mouseX > x && mouseX < x + w && mouseY < height) {
      // If we're clicking
      if (mouseIsPressed) {
        fill(100,255,200);
      // Or just rolling over
      } else {
        fill(255, 235, 15);
      }
    } else {
      fill(255, 225, 130);
    }

    // Or if we're playing the song, let's highlight it too
    if (autoplay && i === song[index-1].note) {
      fill(100,255,200);
    }

    // Draw the key
    rect(x, 70, w-1, 300);
  }
   
    //draw buttons
    button(150,420,50,50, beat);
    button(240,420,50,50, drum);
    button(330,420,50,50, sample1);
    
    //draw pitch circle
    fill(colorValue,0,200);
    ellipse(700, 450, 50, 50);
}

//MAKES A BUTTON
var button = function(x,y,w,h, sampleSwitch){
  fill(255,0,0);
  if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h){
    fill(0,51,255);
    if(mouseIsPressed){
      sample = sampleSwitch;
    }
  }
  rect(x,y,w,h);
  
}

//SPECIFIES KEY ACTIONS
function keyPressed() {
    sample1.stop();
    if(keyCode == UP_ARROW) {
        colorValue -= 20;
        //pitchVal = pitch_slider.value() - 10;
        playNotePitched(colorValue, sample1);
    } else if (keyCode == DOWN_ARROW) {
        colorValue += 20;
        //pitch_slider.value(colorValue);
        playNotePitched(colorValue, sample1);
    }
    return 0;
}

function playNotePitched(val, soundName){
  console.log(val);
  var speed = val/10;
  speed = constrain(speed, 0.01, 4);
  soundName.rate(speed);
  soundName.play();
}

function playBeat(soundName){
  soundName.setBPM(100);
  soundName.loop();
  
}

function playBox(time, playbackRate) {
  box.rate(playbackRate);
  box.play(time);
}

function playDrum(time, playbackRate) {
  drum.rate(playbackRate);
  drum.play(time);
}
 
// KEYBOARD FUNCTION: When we click
function mousePressed() {
  // Map mouse to the key index
  var key = floor(map(mouseX, 0, width, 0, notes.length));
  playNote(notes[key]);
}

// KEYBOARD FUNCTION: Fade it out when we release
function mouseReleased() {
  wave.fade(0,0.5);
}
