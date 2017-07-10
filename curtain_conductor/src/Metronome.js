function Metronome(clock) {
  this.clock = clock;
  this.isFirstCall = true;
  this.bpm = 60;
}

Metronome.prototype
.getPhase = function() {
  var time = this.clock.now();
  if(this.isFirstCall) {
    this.previousTime = time;
    this.previousPhase = 0.0;
    this.isFirstCall = false;
  }
  
  var elapsedTime = time-this.previousTime;
  this.previousTime = time;
  // bpm (beats/minute) * 1 * elapsedTime ms =
  // bpm (beats/minute) * (minute/(60000 ms)) * elapsedTime ms =
  // elapsedTime * (bpm/60000) beats
  var deltaPhase = elapsedTime*this.bpm/60000;
  var sumPhase = this.previousPhase+deltaPhase;
  var currentPhase = sumPhase-Math.floor(sumPhase);
  this.previousPhase = currentPhase;
  return currentPhase;
};

Metronome.prototype
.handleEvent = function() {
  this.bpm = Number(this.bpmInput.value);
};