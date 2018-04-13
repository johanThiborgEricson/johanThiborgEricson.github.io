function Printer(columns, indentStep) {
  this.columns = columns;
  this.lineNumber = 1;
  this.indentStep = indentStep;
  this.indent = 0;
}

Object.assign(Printer.prototype, {
  enter: function(calc, name, type) {
    var row = this.printRow(calc, name, type, "", "");
    this.indent += this.indentStep;
    return row;
  },
  
  exit: function(calc, name, type, result) {
    this.indent -= this.indentStep;
    return this.printRow(calc, name, type, "/", result);
  },
  
  printHeaders: function() {
    var i = 0;
    var row = "";
    while(i < this.columns.length) {
      row += this.columns[i++].padEnd(this.columns[i++]);
    }
    return row + "\n";
  },
  
  printRow: function(calc, id, type, slash, result) {
    var args = {
      slash: slash,
      id: id,
      type: type,
      result: result,
    };
    var i = 0;
    var line = "";
    while(i < this.columns.length) {
      line += this[this.columns[i++]](calc, args).padEnd(this.columns[i++]);
    }
    this.lineNumber++;
    return line+"\n";
  },
  
  Line: function(calc) {
    return ""+this.lineNumber;
  },
  
  "Parse tree": function(calc, args) {
    var indent = "".padEnd(this.indent);
    var name = calc.names ? calc.names[args.id] : args.id;
    return indent + args.slash + name + args.type;
  },
  
  result: function(calc, args) {
    return ""+args.result;
  },
  
  position: function(calc) {
    var e = calc.expression, p = calc.position;
    return e.substring(0, p) + "|" + e.substring(p);
  },
  
  parseSuccess: function(calc) {
    return ""+calc.parseSuccess;
  },
  
  isRecursive: function(calc) {
    var is = calc.isRecursive;
    return is === undefined ? "undefined" : calc.names[is];
  },
  
  stack: function(calc) {
    var onStack = [];
    for(var stackID in calc.leftRecursionSolver.stack) {
      onStack.push(calc.names[stackID]);
    }
    return "{" + onStack.join(", ") + "}";
  },
  
});
