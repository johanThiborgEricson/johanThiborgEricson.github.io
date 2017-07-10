function Gui(metronome, conductor) {
  var that = this;
  this.metronome = metronome;
  this.conductor = conductor;
  this.element = document.createElement("form");
  
  var bpmLabel = document.createElement("label");
  bpmLabel["for"] = "bpm";
  bpmLabel.innerHTML = "bpm:";
  this.element.appendChild(bpmLabel);
  
  this.bpmInput = this.createBpmInput();
  this.bpmInput.addEventListener("input", this.metronome);
  this.element.appendChild(this.bpmInput);
  this.metronome.bpmInput = this.bpmInput;
  this.metronome.handleEvent();
  // TODO: Call metronome.handleEvent to initially sync with gui
  
  var snapLabel = document.createElement("label");
  snapLabel["for"] = "snap";
  snapLabel.innerHTML = "Snappiness:";
  this.element.appendChild(snapLabel);
  
  this.snapInput = this.createSnapInput();
  this.snapInput.addEventListener("input", this.conductor);
  this.element.appendChild(this.snapInput);
  this.conductor.snapInput = this.snapInput;
  this.conductor.handleEvent();
  
  this.element.appendChild(document.createElement("br"));
  
  this.startButton = this.createStartButton();
  this.element.appendChild(this.startButton);
  
  this.stopButton = this.createStopButton();
  this.element.appendChild(this.stopButton);
  
  this.canvas = document.createElement("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.element.appendChild(this.canvas);
  this.setCurtainPos(1);
  
}

Gui.prototype
.createBpmInput = function() {
  var bpmInput = document.createElement("input");
  bpmInput.id = "bpm";
  bpmInput.type = "number";
  bpmInput.value = "60";
  bpmInput.min = "1";
  // The Nyquist frequency
  bpmInput.max = 60*60/2;
  return bpmInput;
};

Gui.prototype
.createSnapInput = function() {
  var snapInput = document.createElement("input");
  snapInput.id = "snap";
  snapInput.type = "number";
  snapInput.value = "5";
  snapInput.min = "0";
  snapInput.max = "9";
  return snapInput;
};

Gui.prototype
.createStartButton = function() {
  var startButton = document.createElement("input");
  startButton = startButton;
  startButton.type = "button";
  startButton.value = "Start";
  var that = this;
  startButton.addEventListener("click", function() {
    that.start(60);
  });
  
  return startButton;
};

Gui.prototype
.createStopButton = function () {
  var stopButton = document.createElement("input");
  stopButton = stopButton;
  stopButton.type = "button";
  stopButton.value = "Stop";
  var that = this;
  stopButton.addEventListener("click", function() {
    that.stop();
  });
  
  return stopButton;
};

Gui.prototype
.attachTo = function(container) {
  container.appendChild(this.element);
};

Gui.prototype
.start = function(fps) {
  if(this.intervalID) {
    this.stop();
  }
  
  this.intervalID = setInterval(function(gui) {
    var position = gui.computePosition();
    gui.setCurtainPos(position);
  }, 1000/fps, this);
};

Gui.prototype
.computePosition = function() {
  var phase = this.metronome.getPhase();
  return this.conductor.getPosition(phase);
};

Gui.prototype
.setCurtainPos = function(fraction) {
  this.canvas.height = window.innerHeight;
  this.canvas.width = window.innerWidth;
  var h = this.canvas.height;
  var w = this.canvas.width;
    
  this.ctx.fillStyle = "#000";
  this.ctx.fillRect(0, 0, w, fraction*h);
  this.ctx.fillStyle = "#fff";
  this.ctx.fillRect(0, fraction*h, w, (1-fraction)*h);
};

Gui.prototype
.stop = function() {
  clearInterval(this.intervalID);
};
