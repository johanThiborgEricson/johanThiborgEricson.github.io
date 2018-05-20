function checkCalls(calculatorName, ruleName) {
  var calculator = callPrintingParsers[calculatorName];
  calculator[ruleName]();
  var actuall = calculator.printer.lines;
  var expected = document.getElementById(calculatorName).innerHTML;
  if(actuall.trim() !== expected.trim()) {
    console.log(calculatorName);
    console.log(actuall.trim());
  }
  expect(actuall.trim()).toBe(expected.trim());
}