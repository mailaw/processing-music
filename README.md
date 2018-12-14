# processing-music

## **Technologies used**
- Processing IDE
- P5.js, p5.sound.js, p5.dom.js, p5.serialport.js
- Arduino IDE
- Adafruit_Trellis library
- Arduino in 3D-printed MIDI board

## **Functionality**
✅Connect Arduino MIDI to p5.js sketch through serial port

✅Connected MIDI key values (0-15) to notes to play

✅Notes from samples load into the program

✅Button sequences in UI trigger notes on a scale from different jazz samples

✅Play/pause beat function plays a drum pattern coded in a phrase

✅Phrases with leading and following instrumental sequences

✅Browser clicking frequency note player

✅Change pitch of a set sample by using keyboard HID, up and down arrows raise/lower pitch by 20

✅Keyboard HID with 'a' key

✅Change BPM of beat 


## **How to use**
- Connect Arduino Uno MIDI board to USB port
- Download p5.serialcontrol application and launch
- Select correct USB port where the Arduino is
- Load Arduino_uno_midi_controller sketch
- Open processing files(main file, index.html, p5.serialport)
- Run application in local browser
- Jam!

## **Upcoming**
- Toggle looping on any given sample
- Extend sliders to all samples
- Reset button bug fix
- Connect buttons in UI with MIDI event triggers so taht they are the same event
- Attach varying sensors to the serial port
- Ability to design beat patterns or switch between presets
