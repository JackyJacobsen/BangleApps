var intervalId;
var counterIntervalId;
var counter = 0;

function setAccelHighOutput() {
  Bangle.accelWr(0x18,0b01110100); // off, +-8g
  Bangle.accelWr(0x1B,0x07 | 0x40); // 1600hz output, ODR/2 filter
  Bangle.accelWr(0x18,0b11110100); // +-8g
  
  //Bangle.accelWr(0x18,0b01110100); // off, +-8g
  //Bangle.accelWr(0x1B,0x03 | 0x40); // 100hz output, ODR/2 filter
  //Bangle.accelWr(0x18,0b11110100); // +-8g
  //Bangle.setPollInterval(10); // 100hz input
}

function resetAccelOutput() {
  Bangle.setPollInterval(80); // default poll interval
  Bangle.accelWr(0x18,0b01101100); // off, +-4g
  Bangle.accelWr(0x1B,0x0); // default 12.5hz output
  Bangle.accelWr(0x18,0b11101100); // +-4g
}

function accelBluetoothHandler() {
  counter++;
  var a = Bangle.readAccel();
  var d = [
    "A",
    (a.x * 10).toFixed(5),
    (a.y * 10).toFixed(5),
    (a.z * 10).toFixed(5)
  ];
  Bluetooth.println(d.join(","));
}

function checkHz() {
  Terminal.println("hz: " + counter);
  counter = 0;
}

function exit() {
  clearInterval(intervalId);
  clearInterval(counterIntervalId);
  resetAccelOutput();
  load();
}

function init() {
  g.clear();
  setWatch(() => {
    exit();
  }, BTN);
  setAccelHighOutput();

  intervalId = setInterval(accelBluetoothHandler, 1);
  counterIntervalId = setInterval(checkHz, 1000);
}

Bangle.loadWidgets();
Bangle.drawWidgets();
init();