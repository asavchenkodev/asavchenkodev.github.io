const fs = require("fs");
const path = require("path");
const { parseTextSource } = require("../src/text-format.js");

const root = path.resolve(__dirname, "..");
const textsDir = path.join(root, "texts");

function listedTextFiles() {
  return JSON.parse(fs.readFileSync(path.join(textsDir, "index.json"), "utf8"))
    .map((file) => String(file).trim())
    .filter(Boolean);
}

// Reads a .txt (inline-link format) or .json text file and returns { doc, errors, warnings }.
function readTextFile(file) {
  const filePath = path.isAbsolute(file) ? file : path.join(textsDir, file);
  return { filePath, ...parseTextSource(fs.readFileSync(filePath, "utf8")) };
}

module.exports = { root, textsDir, listedTextFiles, readTextFile };
