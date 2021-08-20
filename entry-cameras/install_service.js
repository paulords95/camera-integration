const Service = require("node-windows").Service;
const svc = new Service({
  name: "App-Cameras",
  description: "App-Cameras",
  script: "C:\\camera-integration\\entry-cameras\\index.js",
  env: {
    value: process.env.USER,
  },
});

svc.on("install", function () {
  svc.start();
  console.log("Serviço instalado");
});
svc.install();
