var rules = {
  sum: function() {
    if(this.parseSuccess) {
      var backtrack = this.position;
      var result = this.addition();
      if(!this.parseSuccess) {
        this.parseSuccess = true;
        this.position = backtrack;
        result = this.digit();
      }
      return result;
    }
  },
  
  addition: function() {
    var term1 = this.sum();
    if(this.expression[this.position] === "+"){
      this.position++;
    }
    var term2 = this.digit();
    return term1 + term2;
  },
  
  digit: function() {
    var digitRegex = new RegExp("0|1|2|3|4|5|6|7|8|9", "yg");
    digitRegex.lastIndex = this.position;
    var match = digitRegex.exec(this.expression);
    if(match && match.index === this.position) {
      this.position++;
      return Number(match[0]);
    }
  }
};
