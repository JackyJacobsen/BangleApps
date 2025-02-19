var intervalId;

function setAccelHighOutput() {
  Bangle.stopAccelPolling();
  Bangle.setPollInterval(4000); // reduce poll interval, as we read the accel values manually  
  Bangle.accelWr(0x18,0b01110100); // off, +-8g
  Bangle.accelWr(0x1B,0x07 | 0x40); // 1600hz output, ODR/2 filter
  Bangle.accelWr(0x18,0b11110100); // +-8g
}

function resetAccelOutput() {
  Bangle.startAccelPolling();
  Bangle.setPollInterval(80); // default poll interval
  Bangle.accelWr(0x18,0b01101100); // off, +-4g
  Bangle.accelWr(0x1B,0x0); // default 12.5hz output
  Bangle.accelWr(0x18,0b11101100); // +-4g
}

function accelBluetoothHandler() {
  Bangle.streamAccelBatch();
}

function exit() {
  clearInterval(intervalId);
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

  intervalId = setInterval(accelBluetoothHandler, 20);
}

Bangle.loadWidgets();
Bangle.drawWidgets();
init();