function checkCalls(name) {
  var calculator = callPrintingCalculators[name];
  calculator.sum();
  var actuall = calculator.lines;
  var expected = document.getElementById(name).innerHTML;
  if(actuall.trim() !== expected.trim()) {
    console.log(actuall.trim());
  }
  expect(actuall.trim()).toBe(expected.trim());
}