const fs = require("fs");

const fileExists = async (file) => {
  try {
    await fs.promises.access(file);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = fileExists;
