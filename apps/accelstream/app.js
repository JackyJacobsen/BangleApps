var intervalId;
var hzCounterIntervalId;
var hzCounter = 0;

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
  hzCounter++;
  var a = Bangle.readAccel();
  Bluetooth.println("A"
    + "," + (a.x).toFixed(5) 
    + "," + (a.y).toFixed(5) 
    + "," + (a.z).toFixed(5)
  );
}

function checkHz() {
  Terminal.println("hz: " + hzCounter);
  hzCounter = 0;
}

function exit() {
  clearInterval(intervalId);
  clearInterval(hzCounterIntervalId);
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
  hzCounterIntervalId = setInterval(checkHz, 1000);
}

Bangle.loadWidgets();
Bangle.drawWidgets();
init();