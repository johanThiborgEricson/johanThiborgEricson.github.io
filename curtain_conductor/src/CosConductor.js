function CosConductor() {
  this.snappiness = 1;
}

CosConductor.prototype
.getPosition = function(phase) {
  var normalizedCosine = (1+Math.cos(phase*2*Math.PI))/2;
  return Math.pow(normalizedCosine, this.snappiness);
};

CosConductor.prototype
.handleEvent = function() {
  this.snappiness = Number(this.snapInput.value);
};