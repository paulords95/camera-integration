var Service = require("node-windows").Service;
var svc = new Service({
  name: "App-Cameras",
  description: "App-Cameras",
  script: "C:\\camera-integration\\entry-cameras\\index.js",
});
svc.on("uninstall", function () {
  console.log("Uninstall complete.");
});
svc.uninstall();
