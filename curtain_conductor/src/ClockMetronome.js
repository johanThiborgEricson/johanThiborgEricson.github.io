function ClockMetronome(clock) {
  this.clock = clock;
  this.bpm = 60;
}

ClockMetronome.prototype
.getPhase = function() {
  var now = this.clock.now();
  // bpm beats/minute =
  // (bpm beats/minute) * 1 =
  // (bpm beats/minute) * (minute/(60000 ms)) =
  // (bpm/60000) * (beats/ms) = 
  // beatsPerMillisecond (beats/ms)
  beatsPerMillisecond = this.bpm/60000;
  // now * ms * beatsPerMillisecond * (beats/ms) =
  // now * (bpm/60000) * beats =
  // currentBeatNumber beats
  var currentBeatNumber = Math.floor(now*beatsPerMillisecond);
  // 1 / ((bpm/60000) * (beats/ms)) =
  // (60000/bpm) * (ms/beat) =
  // millisecondsPerBeat (ms/beat)
  var millisecondsPerBeat = 60000/this.bpm;
  // currentBeatNumber * beats * millisecondsPerBeat (ms/beat) =
  // currentBeatNumbder * millisecondsPerBeat ms =
  // currentBeatStartTime ms
  var currentBeatStartTime = currentBeatNumber * millisecondsPerBeat;
  var currentBeatElapcedTimeInMs = now-currentBeatStartTime;
  // currentBeatElapcedTimeInMs * ms * beatsPerMillisecond (beats/ms) =
  // currentBeatElapcedTimeInMs * beatsPerMillisecond beats =
  // beatFraction beats
  var beatFraction = currentBeatElapcedTimeInMs * beatsPerMillisecond;
  return beatFraction;
};

ClockMetronome.prototype
.handleEvent = function() {
  this.bpm = Number(this.bpmInput.value);
};