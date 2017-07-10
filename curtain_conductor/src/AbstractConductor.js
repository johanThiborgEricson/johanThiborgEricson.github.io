function AbstractConductor() {
  
}

AbstractConductor.prototype
.handleEvent = function() {
  this.snappiness = Number(this.snapInput.value);
};

AbstractConductor.prototype
.distort = function(input, x, y) {
  var oldK = 0;
  var output = y[0];
  var k;
  var i = 0;
  while(input > x[i]) {
    k = (y[i+1]-y[i])/(x[i+1]-x[i]);
    output += (k-oldK)*(input-x[i]);
    oldK = k;
    i++;
  }
  
  return output;
};
