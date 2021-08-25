const router = require("express").Router();
const onvif = require("node-onvif");
const fs = require("fs");

const path = require("path");
const fullPathAdress = path.resolve("./address.json");

const savePicToPath = require("./saveToPath");
const fileExists = require("../save-confirmation/filesExists");
const { response } = require("express");

let rawdata = fs.readFileSync(fullPathAdress);
let address = JSON.parse(rawdata);

let frontPlate = new onvif.OnvifDevice({
  xaddr: `http://${address.frente.xaddr}/onvif/device_service`,
  user: address.frente.user,
  pass: address.frente.pass,
});

let backPlate = new onvif.OnvifDevice({
  xaddr: `http://${address.traseira.xaddr}/onvif/device_service`,
  user: address.traseira.user,
  pass: address.traseira.pass,
});

let sidePlate = new onvif.OnvifDevice({
  xaddr: `http://${address.lateral.xaddr}/onvif/device_service`,
  user: address.lateral.user,
  pass: address.lateral.pass,
});

const getSnapshot = (cam, name) => {
  return new Promise((resolve, reject) => {
    cam
      .init()
      .then(async (info) => {
        cam
          .fetchSnapshot()
          .then((res) => {
            let ext = "bin";
            let mime_pair = res.headers["content-type"].split("/");
            if (mime_pair[0] === "image") {
              ext = mime_pair[1];
            }
            let fname = `${name}.` + ext;

            fs.writeFileSync(fname, res.body, { encoding: "binary" });
            resolve(res.body);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

router.get("/placa-frente/:id/:plate", async (req, res) => {
  const { id } = req.params;
  getSnapshot(sidePlate, `${id}_LATERAL`).then(async (response) => {
    const saveSide = `${id}_LATERAL`;
    const saveResponseSide = await savePicToPath(saveSide);
  });
  getSnapshot(frontPlate, `${id}_FRENTE`)
    .then((response) => {
      const pic1 = `data:image/png;base64, ${response.toString("base64")}`;
      res.json(pic1);
    })
    .then(async (response) => {
      const saveFront = `${id}_FRENTE`;
      const saveBack = `${id}_TRAS`;

      const saveResponse = await savePicToPath(saveFront);
      const saveResponseBack = await savePicToPath(saveBack);
    });
});

router.get("/placa-atras/:id", async (req, res) => {
  const { id } = req.params;
  getSnapshot(backPlate, `${id}_TRAS`).then((response) => {
    const pic = `data:image/png;base64, ${response.toString("base64")}`;
    res.json(pic);
  });
});

router.post("/save/:id", async (req, res) => {
  const { id } = req.params;
  const saveFront = `${id}_FRENTE`;
  const saveBack = `${id}_TRAS`;
  const saveSide = `${id}_LATERAL`;
  const saveResponse = await savePicToPath(saveFront);
  const saveResponseBack = await savePicToPath(saveBack);
  const saveResponseSide = await savePicToPath(saveSide);
  const response = {
    front: saveResponse,
    back: saveResponseBack,
    side: saveResponseSide,
  };
  res.json(response);
});

module.exports = router;
