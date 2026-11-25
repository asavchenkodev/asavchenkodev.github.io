const path = require("path");
const { root, listedTextFiles, readTextFile } = require("./text-files.js");

const requested = process.argv.slice(2);
const files = requested.length ? requested : listedTextFiles();
let problemCount = 0;

files.forEach((requestedFile) => {
  const { filePath, doc, errors, warnings } = readTextFile(requestedFile);
  const displayPath = path.relative(root, filePath);
  const name = doc?.id || "document";
  errors.forEach((entry) => report("ERROR", displayPath, name, entry));
  warnings.forEach((entry) => report("WARN", displayPath, name, entry));
  problemCount += errors.length + warnings.length;
});

if (problemCount) {
  console.error(`Found ${problemCount} text mapping problem${problemCount === 1 ? "" : "s"}.`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${files.length} text file${files.length === 1 ? "" : "s"} with full RU/DE word coverage.`);
}

function report(level, file, name, entry) {
  console.error(`${level} ${file} ${name} ${entry.path}: ${entry.message}`);
}
