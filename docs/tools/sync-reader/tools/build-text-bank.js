const fs = require("fs");
const path = require("path");
const { root, textsDir, listedTextFiles, readTextFile } = require("./text-files.js");

const outputPath = path.join(textsDir, "text-bank.js");

const texts = listedTextFiles().map((file) => {
  const { doc, errors } = readTextFile(file);
  if (errors.length) throw new Error(`${file}: ${errors.map((entry) => entry.message).join(" ")}`);
  return doc;
});

fs.writeFileSync(outputPath, `window.SYNC_READER_TEXTS = ${JSON.stringify(texts)};\n`);
console.log(`Wrote ${texts.length} texts to ${path.relative(root, outputPath)}`);
