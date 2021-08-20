const router = require("express").Router();

const fs = require("fs");
const currentDate = require("../date");

const basePath = `\\\\qcolweb01.quimtia.net.br\\c$\\Imagens-entrada-de-veículos\\${currentDate()}\\`;

const fileExists = async (file) => {
  try {
    await fs.promises.access(file);
    return true;
  } catch (error) {
    return false;
  }
};

router.get("/saved/:type/:id/:plate", async (req, res) => {
  const { id, plate, type } = req.params;
  let name = `${plate}_${id}_${type}`;
  let file = `${basePath}${name}.jpg`;

  res.json(await fileExists(file));
});

module.exports = router;
