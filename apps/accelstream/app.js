g.clear();

Bangle.on('accel',function(a) {
  var d = [
    "A",
    Math.round((a.x + Number.EPSILON) * 100) / 100,
    Math.round((a.y + Number.EPSILON) * 100) / 100,
    Math.round((a.z + Number.EPSILON) * 100) / 100,
    Math.round((a.diff + Number.EPSILON) * 100) / 100,
    Math.round((a.mag + Number.EPSILON) * 100) / 100
    ];
  Bluetooth.println(d.join(","));
})
