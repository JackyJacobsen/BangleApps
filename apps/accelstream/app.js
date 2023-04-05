g.clear();

Bangle.on('accel',function(a) {
  var d = [
    "A",
    Math.round(a.x * 100),
    Math.round(a.y * 100),
    Math.round(a.z * 100),
    Math.round(a.diff * 100),
    Math.round(a.mag * 100)
    ];
  Bluetooth.println(d.join(","));
})
