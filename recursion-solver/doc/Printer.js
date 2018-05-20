function Printer(columns, indentStep) {
  this.columns = columns;
  this.lineNumber = 1;
  this.indentStep = indentStep;
  this.indent = 0;
  this.lines = "";
  this.printHeaders();
}

Object.assign(Printer.prototype, {
  enter: function(calc, args) {
    args.slash = "\\";
    args.result = "";
    var row = this.printRow(calc, args);
    this.indent += this.indentStep;
    return row;
  },
  
  exit: function(calc, args) {
    args.slash = "/";
    this.indent -= this.indentStep;
    return this.printRow(calc, args);
  },
  
  printHeaders: function() {
    var i = 0;
    var row = "";
    while(i < this.columns.length) {
      row += this.columns[i++].padEnd(this.columns[i++]);
    }
    this.lines += row + "\n";
  },
  
  printRow: function(calc, args) {
    var i = 0;
    var line = "";
    while(i < this.columns.length) {
      var cell = this[this.columns[i++]](calc, args);
      if(cell === undefined){
        throw this.columns[i-1];
      }
      line += cell.padEnd(this.columns[i++]);
    }
    this.lineNumber++;
    this.lines += line.match(/\s*/)[0] + line.trim() + "\n";
  },
  
  Line: function(calc) {
    return ""+this.lineNumber;
  },
  
  "Parse tree": function(calc, args) {
    var indent = "".padEnd(this.indent);
    var key = args.key;
    return indent + args.slash + key;
  },
  
  result: function(calc, args) {
    return "" + args.result;
  },
  
  position: function(calc) {
    var e = calc.expression
    var p = calc.position;
    return e.substring(0, p) + "|" + e.substring(p);
  },
  
  parseSuccess: function(calc) {
    return "" + calc.parseSuccess;
  },
  
  isRecursive: function(calc) {
    return "" + calc.recursionSolver.isRecursive;
  },
  
  stack: function(calc) {
    var onStack = [];
    var stack = calc.recursionSolver.stack;
    for(var key in stack){
      onStack.push(key);
    }
    return "{" + onStack.join(", ") + "}";
  },
  
  memo: function(calc, args) {
    var lrs = calc.recursionSolver;
    var rec;
    if(args.type === "PM"){
      rec = lrs.memo[args.key];
    }
    return rec ? ""+rec.result : "";
  },
  
});
