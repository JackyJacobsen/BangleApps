var intervalId;
var hzCounterIntervalId;
var hzCounter = 0;

function setAccelHighOutput() {
  Bangle.stopAccelPolling();
  Bangle.setPollInterval(1000); // reduce poll interval, as we read the accel values manually
  Bangle.accelWr(0x18,0b01100100); // off, +-2g
  Bangle.accelWr(0x1B,0x07 | 0x40); // 1600hz output, ODR/2 filter
  Bangle.accelWr(0x18,0b11100100); // +-2g

  
  // Bangle.accelWr(0x18,0b01110100); // off, +-8g
  // Bangle.accelWr(0x1B,0x07 | 0x40); // 1600hz output, ODR/2 filter
  // Bangle.accelWr(0x18,0b11110100); // +-8g
}

function resetAccelOutput() {
  Bangle.startAccelPolling();
  Bangle.setPollInterval(80); // default poll interval
  Bangle.accelWr(0x18,0b01101100); // off, +-4g
  Bangle.accelWr(0x1B,0x0); // default 12.5hz output
  Bangle.accelWr(0x18,0b11101100); // +-4g
}

function accelBluetoothHandler() {
  Bangle.streamAccel();
  //hzCounter++;
}

function checkHz() {
  Terminal.println("hz: " + hzCounter);
  hzCounter = 0;
}

function exit() {
  clearInterval(intervalId);
  //clearInterval(hzCounterIntervalId);
  resetAccelOutput();
  load();
}

function init() {
  g.clear();
  setWatch(() => {
    exit();
  }, BTN);
  setAccelHighOutput();
  
  Bangle.initStreamAccel(Bluetooth);

  intervalId = setInterval(accelBluetoothHandler, 1);
  //hzCounterIntervalId = setInterval(checkHz, 1000);
}

Bangle.loadWidgets();
Bangle.drawWidgets();
init();