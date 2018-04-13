function CallPrintingCalculator(expression, columns, printLine) {
  Calculator.call(this, expression);
  this.printer = new Printer(columns, 1);
  this.lines = this.printer.printHeaders();
  this.names = ["sum", "addition", "digit"];
  var that = this;
  this.names.map(function(name) {
    var id = rdpl.id;
    var pm = rdpl(function() {
      this.lines += this.printer.enter(this, id, "R");
      var result = rules[name].call(this);
      this.lines += this.printer.exit(this, id, "R", result);
      return result;
    });
    
    that[name] = function() {
      this.lines += this.printer.enter(this, id, "PM");
      var result = pm.call(this);
      this.lines += this.printer.exit(this, id, "PM", result);
      return result;
    };
  });
  
}
