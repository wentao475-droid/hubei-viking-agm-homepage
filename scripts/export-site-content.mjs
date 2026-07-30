import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import ts from "typescript";

const root = process.cwd();

function readSource(path) {
  return ts.createSourceFile(
    path,
    readFileSync(join(root, path), "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
}

function evaluate(node, scope) {
  if (!node) {
    return undefined;
  }

  if (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node)) {
    return evaluate(node.expression, scope);
  }

  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }

  if (ts.isNumericLiteral(node)) {
    return Number(node.text);
  }

  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return true;
  }

  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }

  if (ts.isTemplateExpression(node)) {
    let value = node.head.text;
    for (const span of node.templateSpans) {
      value += String(evaluate(span.expression, scope));
      value += span.literal.text;
    }
    return value;
  }

  if (ts.isIdentifier(node)) {
    if (!(node.text in scope)) {
      throw new Error(`Cannot evaluate identifier ${node.text}`);
    }
    return scope[node.text];
  }

  if (ts.isPropertyAccessExpression(node)) {
    const owner = evaluate(node.expression, scope);
    return owner?.[node.name.text];
  }

  if (ts.isElementAccessExpression(node)) {
    const owner = evaluate(node.expression, scope);
    const key = evaluate(node.argumentExpression, scope);
    return owner?.[key];
  }

  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((element) => evaluate(element, scope));
  }

  if (ts.isObjectLiteralExpression(node)) {
    const result = {};
    for (const property of node.properties) {
      if (ts.isSpreadAssignment(property)) {
        Object.assign(result, evaluate(property.expression, scope));
        continue;
      }

      if (ts.isPropertyAssignment(property)) {
        const key = propertyName(property.name, scope);
        result[key] = evaluate(property.initializer, scope);
        continue;
      }

      if (ts.isShorthandPropertyAssignment(property)) {
        result[property.name.text] = evaluate(property.name, scope);
      }
    }
    return result;
  }

  throw new Error(`Unsupported syntax: ${ts.SyntaxKind[node.kind]}`);
}

function propertyName(name, scope) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }

  if (ts.isComputedPropertyName(name)) {
    return evaluate(name.expression, scope);
  }

  throw new Error(`Unsupported property name: ${ts.SyntaxKind[name.kind]}`);
}

function collectConstants(path, names) {
  const source = readSource(path);
  const wanted = new Set(names);
  const scope = {};
  const found = {};

  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) {
      continue;
    }

    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !declaration.initializer) {
        continue;
      }

      const name = declaration.name.text;
      try {
        scope[name] = evaluate(declaration.initializer, scope);
      } catch (error) {
        if (wanted.has(name)) {
          throw error;
        }
        continue;
      }

      if (wanted.has(name)) {
        found[name] = scope[name];
      }
    }
  }

  for (const name of names) {
    if (!(name in found)) {
      throw new Error(`Could not find ${name} in ${path}`);
    }
  }

  return found;
}

const home = collectConstants("app/VikingHome.tsx", ["copy"]).copy;
const productConstants = collectConstants("app/ProductPage.tsx", [
  "content",
  "viContent",
  "koContent",
  "jaContent"
]);
const articleConstants = collectConstants("app/BlogArticlePage.tsx", [
  "articleCopy",
  "keyTechnicalCopy",
  "howToChooseCopy",
  "manufacturingDeliveryCopy",
  "performanceConsistencyCopy",
  "exportSupplyReadinessCopy",
  "upsVrlaTechnologySelectionCopy",
  "agmGlassFiberVsPvcSeparatorCopy"
]);
const seoConstants = collectConstants("app/seo.tsx", [
  "homeSeo",
  "sampleRequestSeo",
  "agmSeparatorSeo",
  "agmSeparatorRollsSeo",
  "agmSeparatorSheetsSeo",
  "agmSeparatorTestingSeo",
  "agmSeparatorVrlaApplicationSeo",
  "agmSeparatorUpsApplicationSeo",
  "agmSeparatorMotorcycleApplicationSeo",
  "agmSeparatorEnergyStorageApplicationSeo",
  "whatIsAgmSeparatorSeo",
  "keyTechnicalParametersSeo",
  "howToChooseAgmSeparatorSeo",
  "agmSeparatorManufacturingQualityDeliverySeo",
  "agmSeparatorPerformanceConsistencySeo",
  "agmSeparatorExportSupplyReadinessSeo",
  "upsVrlaTechnologySelectionSeo",
  "agmGlassFiberVsPvcSeparatorSeo"
]);

const products = structuredClone(productConstants.content);
for (const [page, value] of Object.entries(productConstants.viContent)) {
  products[page] = {
    ...products[page],
    vi: value
  };
}
for (const [page, value] of Object.entries(productConstants.koContent)) {
  products[page] = {
    ...products[page],
    ko: value
  };
}
for (const [page, value] of Object.entries(productConstants.jaContent)) {
  products[page] = {
    ...products[page],
    ja: value
  };
}

const content = {
  home,
  products,
  articles: {
    whatIsAgmSeparator: articleConstants.articleCopy,
    keyTechnicalParameters: articleConstants.keyTechnicalCopy,
    howToChooseAgmSeparator: articleConstants.howToChooseCopy,
    agmSeparatorManufacturingQualityDelivery:
      articleConstants.manufacturingDeliveryCopy,
    agmSeparatorPerformanceConsistency:
      articleConstants.performanceConsistencyCopy,
    agmSeparatorExportSupplyReadiness:
      articleConstants.exportSupplyReadinessCopy,
    upsVrlaTechnologySelection:
      articleConstants.upsVrlaTechnologySelectionCopy,
    agmGlassFiberVsPvcSeparator:
      articleConstants.agmGlassFiberVsPvcSeparatorCopy
  },
  seo: {
    home: seoConstants.homeSeo,
    sampleRequest: seoConstants.sampleRequestSeo,
    agmSeparator: seoConstants.agmSeparatorSeo,
    agmSeparatorRolls: seoConstants.agmSeparatorRollsSeo,
    agmSeparatorSheets: seoConstants.agmSeparatorSheetsSeo,
    agmSeparatorTesting: seoConstants.agmSeparatorTestingSeo,
    agmSeparatorVrlaApplication: seoConstants.agmSeparatorVrlaApplicationSeo,
    agmSeparatorUpsApplication: seoConstants.agmSeparatorUpsApplicationSeo,
    agmSeparatorMotorcycleApplication:
      seoConstants.agmSeparatorMotorcycleApplicationSeo,
    agmSeparatorEnergyStorageApplication:
      seoConstants.agmSeparatorEnergyStorageApplicationSeo,
    whatIsAgmSeparator: seoConstants.whatIsAgmSeparatorSeo,
    keyTechnicalParameters: seoConstants.keyTechnicalParametersSeo,
    howToChooseAgmSeparator: seoConstants.howToChooseAgmSeparatorSeo,
    agmSeparatorManufacturingQualityDelivery:
      seoConstants.agmSeparatorManufacturingQualityDeliverySeo,
    agmSeparatorPerformanceConsistency:
      seoConstants.agmSeparatorPerformanceConsistencySeo,
    agmSeparatorExportSupplyReadiness:
      seoConstants.agmSeparatorExportSupplyReadinessSeo,
    upsVrlaTechnologySelection:
      seoConstants.upsVrlaTechnologySelectionSeo,
    agmGlassFiberVsPvcSeparator:
      seoConstants.agmGlassFiberVsPvcSeparatorSeo
  }
};

if (process.argv.includes("--stdout")) {
  process.stdout.write(`${JSON.stringify(content, null, 2)}\n`);
  process.exit(0);
}

const outputArgIndex = process.argv.indexOf("--output");
const outputPath =
  outputArgIndex >= 0 && process.argv[outputArgIndex + 1]
    ? resolve(root, process.argv[outputArgIndex + 1])
    : join(root, "content/site-content.json");
mkdirSync(dirname(outputPath), { recursive: true });
const output =
  process.argv.includes("--merge-missing") && existsSync(outputPath)
    ? mergeMissing(JSON.parse(readFileSync(outputPath, "utf8")), content)
    : content;
writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Exported editable site content to ${outputPath}`);

function mergeMissing(current, defaults) {
  if (Array.isArray(current) || Array.isArray(defaults)) {
    return current === undefined ? defaults : current;
  }

  if (
    !current ||
    typeof current !== "object" ||
    !defaults ||
    typeof defaults !== "object"
  ) {
    return current === undefined ? defaults : current;
  }

  const merged = { ...current };
  for (const [key, value] of Object.entries(defaults)) {
    merged[key] =
      key in merged ? mergeMissing(merged[key], value) : value;
  }
  return merged;
}
