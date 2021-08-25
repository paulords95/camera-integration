const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const mv = require("mv");
const cors = require("cors");

const currentDate = require("./date");
const fileExists = require("./save-confirmation/filesExists");

app.use(express.static(path.join(__dirname, "..", "build")));

app.use(express.json());
app.use(cors());
var NodeWebcam = require("node-webcam");

var opts = {
  callbackReturn: "base64",
  width: 900,
  height: 600,
  output: "jpeg",
  quality: 30,
  device: ["1"],
};

const takePicture = (id) => {
  return new Promise((resolve, reject) => {
    NodeWebcam.capture(`${id}`, opts, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const saveCNHToPath = (id) => {
  return new Promise((resolve, reject) => {
    const currentPath = path.join(__dirname, "./", `${id}_CNH.jpg`);
    const destinationPath = path.join(
      `\\\\qcolweb01.quimtia.net.br\\c$\\Imagens-entrada-de-veículos\\${currentDate()}`,
      `${id}_CNH.jpg`
    );

    fs.access(
      `\\\\qcolweb01.quimtia.net.br\\c$\\Imagens-entrada-de-veículos\\${currentDate()}`,
      (error) => {
        if (!error) {
          mv(currentPath, destinationPath, function (err) {
            if (err) {
              resolve("Nenhuma foto");
            } else {
              resolve("Salvo");
            }
          });
        } else {
          fs.mkdir(
            path.join(
              "\\\\qcolweb01.quimtia.net.br\\c$\\Imagens-entrada-de-veículos",
              `${currentDate()}`
            ),
            (err) => {
              if (err) {
                return console.error(err);
              }
              mv(currentPath, destinationPath, function (err) {
                if (err) {
                  reject("Erro");
                } else {
                  resolve("Salvo");
                }
              });
            }
          );
        }
      }
    );
  });
};

app.use("/webcam", require("./driver/driver"));

app.get("/webcam/:id/:plate", async (req, res) => {
  const { id, plate } = req.params;

  takePicture(id + "_CNH")
    .then(async (pic) => {
      const response = await saveCNHToPath(id);

      res.json(`${pic}`);
    })
    .catch((e) => {
      console.log(e);
      res.send("Não foi possível acessar a câmera");
    });
});

app.get("/webcam/save/:id/:plate", async (req, res) => {
  const { id, plate } = req.params;

  const basePath = `\\\\qcolweb01.quimtia.net.br\\c$\\Imagens-entrada-de-veículos\\${currentDate()}\\`;
  let name = `${plate}_${id}_CNH`;
  let file = `${basePath}${name}.jpg`;

  if (await fileExists(file)) {
    try {
      const response = await saveCNHToPath(id);
      res.json(response);
    } catch (error) {
      res.json("Erro");
    }
  } else {
    res.json("Salvo");
  }
});

app.use("/onvif", require("./onvif/onvifaccess"));
app.use("/pic", require("./save-confirmation/saveConfimation"));

app.listen(1000, () => {
  console.log(`Servidor rodando na porta 1000`);
});
