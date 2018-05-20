var callPrintingParsers = {
  add: function(calcName, columns, calculator) {
    calculator.printer = new Printer(columns, 1);
    this[calcName] = calculator;
    var solve = RecursionSolver.prototype.solve;
    calculator.recursionSolver.solve = function(key, progress, rule, args, parser) {
      var rArgs = {
        type: "R",
        key: key,
      };
      
      var pmArgs = {
        type: "PM",
        key: key,
      };
      
      parser.printer.enter(parser, pmArgs);
      pmArgs.result = solve.call(this, key, progress, function() {
        this.printer.enter(this, rArgs);
        rArgs.result = rule.apply(this, arguments);
        this.printer.exit(this, rArgs);
        return rArgs.result;
      }, args, parser);
      parser.printer.exit(parser, pmArgs);
      return pmArgs.result;
    };
  },
  
};
