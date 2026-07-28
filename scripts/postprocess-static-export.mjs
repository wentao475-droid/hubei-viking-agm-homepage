import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const outDir = join(process.cwd(), "out");
let updated = 0;

for (const file of walk(outDir)) {
  if (!file.endsWith(".html")) {
    continue;
  }

  const outputPath = relative(outDir, file).replaceAll("\\", "/");
  const expectedLanguage = outputPath.startsWith("zh/")
    ? "zh-CN"
    : outputPath.startsWith("vi/")
      ? "vi"
      : "en";
  const source = readFileSync(file, "utf8");
  const result = source.replace(
    /<html\s+lang="[^"]*"/,
    `<html lang="${expectedLanguage}"`
  );

  if (result !== source) {
    writeFileSync(file, result);
    updated += 1;
  }
}

console.log(`Updated language attributes in ${updated} static HTML files`);

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const file = join(directory, entry);
    return statSync(file).isDirectory() ? walk(file) : file;
  });
}
