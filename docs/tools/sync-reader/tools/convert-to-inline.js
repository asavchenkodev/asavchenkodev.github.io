const fs = require("fs");
const path = require("path");
const { serializeInline } = require("../src/text-format.js");

// Converts sentence-scoped JSON texts to the inline-link .txt format (see FORMAT.md).
// Usage: node tools/convert-to-inline.js texts/some-text.json [more.json ...]
// Writes some-text.txt next to each input; the JSON file is left in place.
const inputs = process.argv.slice(2);
if (!inputs.length) {
  console.error("Usage: node tools/convert-to-inline.js <file.json> [...]");
  process.exit(1);
}

inputs.forEach((input) => {
  const data = JSON.parse(fs.readFileSync(input, "utf8"));
  const docs = Array.isArray(data) ? data : [data];
  docs.forEach((doc, index) => {
    const suffix = docs.length > 1 ? `-${index + 1}` : "";
    const output = input.replace(/\.json$/i, "") + `${suffix}.txt`;
    const { text, problems } = serializeInline(doc);
    fs.writeFileSync(output, text);
    problems.forEach((problem) => console.error(`WARN ${input}: ${problem}`));
    console.log(`Wrote ${output}`);
  });
});
