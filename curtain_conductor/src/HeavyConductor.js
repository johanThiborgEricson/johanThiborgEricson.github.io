function HeavyConductor(snappiness) {
  this.snappiness = snappiness;
}

HeavyConductor.prototype = new AbstractConductor();

HeavyConductor.prototype
.getPosition = function(phase) {
  var departure = (Math.PI/2)*(1+Math.pow(2, -this.snappiness));
  var x = [0, 0.5, 1];
  var y = [0, this.airTime(departure)/2+departure, 0];
  var time = this.distort(phase, x, y);
  var elevation = this.trampoline(time, departure);
  x = [-1, this.highest(departure)];
  y = [1, 0];
  return this.distort(elevation, x, y);
};

HeavyConductor.prototype
.trampoline = function(time, departure) {
  var elevation;
  if(time < departure) {
    elevation = -Math.cos(time);
  } else {
    var airTime = this.airTime(departure);
    if(time < departure + airTime) {
      var dt = time-departure;
      var t0 = departure;
      // f=-cos(t)
      // f(t0)+f'(t0)*(t-t0)+(f''(t0)/2)*(t-t0)^2
      // dt = (t-t0)
      elevation = -Math.cos(t0)+(Math.sin(t0)+(Math.cos(t0)/2)*dt)*dt;
    } else {
      elevation = -Math.cos(time-airTime-2*departure);
    }
  }
  
  return elevation;
};

HeavyConductor.prototype
.airTime = function(departure) {
  return -2*Math.tan(departure);
};

HeavyConductor.prototype
.highest = function(departure) {
  var airTime = this.airTime(departure);
  return this.trampoline(departure+airTime/2, departure);
};
