g.clear();

Bangle.on('accel', function(a) {
  var d = [
    "A",
    +a.x.toFixed(5),
    +a.y.toFixed(5),
    +a.z.toFixed(5),
    +a.diff.toFixed(5),
    +a.mag.toFixed(5)
    ];
  Bluetooth.println(d.join(","));
})
