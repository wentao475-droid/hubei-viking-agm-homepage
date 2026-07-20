import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const sourceRoots = ["app", "content"];
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".json"]);
const assetPattern = /["'`](\/(?:images|videos|downloads)\/[^"'`?#]+)["'`]/g;
const references = new Set();

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

for (const sourceRoot of sourceRoots) {
  const directory = join(root, sourceRoot);

  for (const file of walk(directory)) {
    if (!sourceExtensions.has(extname(file))) {
      continue;
    }

    const source = readFileSync(file, "utf8");
    for (const match of source.matchAll(assetPattern)) {
      references.add(match[1]);
    }
  }
}

const missing = [...references].filter(
  (assetPath) => !existsSync(join(root, "public", assetPath.slice(1)))
);

if (missing.length > 0) {
  console.error("Missing public assets:");
  for (const assetPath of missing) {
    console.error(`- ${assetPath}`);
  }
  process.exit(1);
}

const forbiddenArtifacts = [
  "public/images/.DS_Store",
  "public/images/banner_logo.png",
  "public/images/sheets1.png",
  "public/images/sheets2.png",
  "tsconfig.tsbuildinfo"
].filter((path) => existsSync(join(root, path)));

if (forbiddenArtifacts.length > 0) {
  console.error("Remove generated or superseded artifacts:");
  for (const path of forbiddenArtifacts) {
    console.error(`- ${relative(root, join(root, path))}`);
  }
  process.exit(1);
}

console.log(`Verified ${references.size} referenced public assets`);
