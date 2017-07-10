window.addEventListener("load", function() {
  var metronome = new Metronome(Date);
  var conductor = new HeavyConductor(5);
  var gui = new Gui(metronome, conductor);
  gui.attachTo(document.body);
});