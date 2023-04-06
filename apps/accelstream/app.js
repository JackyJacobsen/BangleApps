function setAccelHighOutput() {
  Bangle.accelWr(0x18,0b01110100); // off, +-8g
  Bangle.accelWr(0x1B,0x08 | 0x40); // 1600hz output, ODR/2 filter
  Bangle.accelWr(0x18,0b11110100); // +-8g
  Bangle.setPollInterval(0.625); // 1600hz input
}

function resetAccelOutput() {
  Bangle.setPollInterval(80); // default poll interval
  Bangle.accelWr(0x18,0b01101100); // off, +-4g
  Bangle.accelWr(0x1B,0x0); // default 12.5hz output
  Bangle.accelWr(0x18,0b11101100); // +-4g
}

function accelBluetoothHandler(a) {
  var d = [
    "A",
    +a.x.toFixed(5),
    +a.y.toFixed(5),
    +a.z.toFixed(5)
    // +a.diff.toFixed(5),
    // +a.mag.toFixed(5)
  ];
  Bluetooth.println(d.join(","));
}

function exit() {
  Bangle.removeListener('accel', accelBluetoothHandler);
  resetAccelOutput();
  load();
}

function init() {
  g.clear();
  setWatch(exit, BTN2);
  setAccelHighOutput();
  Bangle.on('accel', accelBluetoothHandler);
}

init();