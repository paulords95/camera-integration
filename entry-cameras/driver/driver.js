const router = require("express").Router();
var NodeWebcam = require("node-webcam");

const saveToPath = require('./savetoPath')

var opts = {
    callbackReturn: "base64",
    width: 900,
    height: 600,
    output: "jpeg",
    quality: 30,
    device: ['2'],
  };
  
  
  const takePicture = (id) => {
    return new Promise((resolve, reject) => {
      NodeWebcam.capture(`${id}_MOTORI`, opts, function (err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  };



router.get("/driver/:id", async (req, res) => {
    const { id } = req.params;
    takePicture(id)
      .then((pic) => {
        res.json(`${pic}`);
      })
      .catch((e) => {
        console.log(e);
        res.send("Não foi possível acessar a câmera");
      });
  });


router.get("/driver/save/:id", async (req, res) => {
    const { id } = req.params;
    const name = `${id}_MOTORI`
    const response = await saveToPath(name)
    res.json(response)

  });


  module.exports = router;
