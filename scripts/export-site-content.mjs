import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import ts from "typescript";
import {
  articleKinds,
  buildSecondaryArticleSeo,
  secondaryArticleCopy,
  secondaryResourceData,
  secondaryResourceLocales
} from "../content/secondary-resources.mjs";
import {
  thermalInsulationPaperContent,
  thermalInsulationPaperSeo
} from "../content/thermal-insulation-paper.mjs";

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
const sampleRequest = collectConstants("app/SampleRequestPage.tsx", [
  "pageCopy"
]).pageCopy;
const productConstants = collectConstants("app/ProductPage.tsx", [
  "content",
  "viContent",
  "koContent",
  "jaContent",
  "additionalAgmContent",
  "commonRelated",
  "footerCopy",
  "secondaryDetailCopy",
  "detailFormImages",
  "secondaryApplicationCopy",
  "secondaryApplicationImages",
  "secondaryApplicationPaths",
  "motorcycleApplicationCopy",
  "motorcycleFormImages"
]);
const articleConstants = collectConstants("app/BlogArticlePage.tsx", [
  "articleCopy",
  "keyTechnicalCopy",
  "howToChooseCopy",
  "manufacturingDeliveryCopy",
  "performanceConsistencyCopy",
  "exportSupplyReadinessCopy",
  "upsVrlaTechnologySelectionCopy",
  "dataCenterBackupPowerAgmSeparatorCopy",
  "earlyChinaLeadAcidBatteryManufacturingCopy",
  "agmSeparatorPressureRetentionCopy",
  "agmSeparatorBatchProcessControlCopy",
  "agmSeparatorSupplyChainCopy",
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
  "dataCenterBackupPowerAgmSeparatorSeo",
  "earlyChinaLeadAcidBatteryManufacturingSeo",
  "agmSeparatorPressureRetentionSeo",
  "agmSeparatorBatchProcessControlSeo",
  "agmSeparatorSupplyChainSeo",
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
for (const [locale, value] of Object.entries(
  productConstants.additionalAgmContent
)) {
  products.agmSeparator = {
    ...products.agmSeparator,
    [locale]: value
  };
}

products.glassFiberThermalInsulationPaper = structuredClone(
  thermalInsulationPaperContent
);

for (const [locale, detailCopy] of Object.entries(
  productConstants.secondaryDetailCopy
)) {
  const base = products.agmSeparator[locale];

  for (const [page, variant] of [
    ["agmSeparatorRolls", "rolls"],
    ["agmSeparatorSheets", "sheets"],
    ["agmSeparatorTesting", "testing"]
  ]) {
    const copy = detailCopy[variant];
    const images = productConstants.detailFormImages[variant];
    const path = page === "agmSeparatorTesting"
      ? "/quality-control/agm-separator-testing/"
      : page === "agmSeparatorRolls"
        ? "/products/agm-separator-rolls/"
        : "/products/agm-separator-sheets/";
    const heroImage = page === "agmSeparatorTesting"
      ? ["/images/agm-quality-control-1200.webp", 1200, 900]
      : images[0];
    const forms = page === "agmSeparatorTesting"
      ? copy.testCards.map(([title, text, alt], index) => [
          title,
          text,
          images[index][0],
          alt,
          images[index][1],
          images[index][2]
        ])
      : base.forms.items.map(([title, text, , alt], index) => [
          title,
          text,
          images[index][0],
          alt,
          images[index][1],
          images[index][2]
        ]);

    products[page] = {
      ...products[page],
      [locale]: {
        ...base,
        languagePath: path,
        hero: {
          eyebrow: copy.hero[0],
          title: copy.hero[1],
          subtitle: copy.hero[2],
          primary: copy.hero[3],
          secondary: base.hero.secondary,
          proof: copy.proof,
          image: {
            src: heroImage[0],
            alt: copy.hero[1],
            width: heroImage[1],
            height: heroImage[2]
          }
        },
        overview: {
          eyebrow: base.overview.eyebrow,
          title: copy.overview[0],
          paragraphs: [copy.overview[1], copy.overview[2]]
        },
        parameters: {
          eyebrow: base.parameters.eyebrow,
          title: copy.parameters[0],
          text: copy.parameters[1],
          items: base.parameters.items
        },
        forms: {
          eyebrow: base.forms.eyebrow,
          title: copy.formsTitle,
          items: forms
        },
        related: {
          ...base.related,
          items: productConstants.commonRelated[locale]
        },
        inquiry: {
          ...base.inquiry,
          title: copy.inquiry[0],
          text: copy.inquiry[1]
        }
      }
    };
  }
}

for (const [locale, applications] of Object.entries(
  productConstants.secondaryApplicationCopy
)) {
  const base = products.agmSeparator[locale];

  for (const [page, copy] of Object.entries(applications)) {
    const image = productConstants.secondaryApplicationImages[page];
    const forms = [
      ...base.forms.items.slice(0, 2),
      [copy.hero[1], copy.overview[1], image[0], copy.hero[1], image[1], image[2]],
      [
        base.quality.title,
        base.quality.text,
        "/images/agm-quality-control-1200.webp",
        base.quality.title,
        1200,
        900
      ]
    ];

    products[page] = {
      ...products[page],
      [locale]: {
        ...base,
        homePath: `/${locale}/`,
        languagePath: productConstants.secondaryApplicationPaths[page],
        hero: {
          eyebrow: copy.hero[0],
          title: copy.hero[1],
          subtitle: copy.hero[2],
          primary: copy.hero[3],
          secondary: base.hero.secondary,
          proof: copy.proof,
          image: {
            src: image[0],
            alt: copy.hero[1],
            width: image[1],
            height: image[2]
          }
        },
        overview: {
          eyebrow: base.overview.eyebrow,
          title: copy.overview[0],
          paragraphs: [copy.overview[1], copy.overview[2]]
        },
        parameters: {
          eyebrow: base.parameters.eyebrow,
          title: copy.parameters[0],
          text: copy.parameters[1],
          items: base.parameters.items
        },
        forms: {
          eyebrow: base.forms.eyebrow,
          title: copy.formsTitle,
          items: forms
        },
        applications: {
          eyebrow: base.applications.eyebrow,
          title: copy.applications[0],
          items: copy.applications[1]
        },
        related: {
          ...base.related,
          items: productConstants.commonRelated[locale]
        },
        inquiry: {
          ...base.inquiry,
          title: copy.inquiry[0],
          text: copy.inquiry[1],
          placeholder: copy.inquiry[2]
        }
      }
    };
  }
}

for (const [locale, copy] of Object.entries(
  productConstants.motorcycleApplicationCopy
)) {
  const images = productConstants.motorcycleFormImages;
  products.agmSeparatorMotorcycleApplication = {
    ...products.agmSeparatorMotorcycleApplication,
    [locale]: {
      homePath: `/${locale}/`,
      languagePath: "/applications/agm-separator-for-motorcycle-battery/",
      quote: copy.quote,
      hero: {
        eyebrow: copy.eyebrow,
        title: copy.title,
        subtitle: copy.subtitle,
        primary: copy.primary,
        secondary: copy.secondary,
        proof: copy.proof,
        image: {
          src: images[2][0],
          alt: copy.imageAlt,
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: copy.overview[0],
        title: copy.overview[1],
        paragraphs: [copy.overview[2], copy.overview[3]]
      },
      parameters: {
        eyebrow: copy.parameters[0],
        title: copy.parameters[1],
        text: copy.parameters[2],
        items: copy.parameters[3]
      },
      forms: {
        eyebrow: copy.forms[0],
        title: copy.forms[1],
        items: copy.forms[2].map(([title, text, alt], index) => [
          title,
          text,
          images[index][0],
          alt,
          images[index][1],
          images[index][2]
        ])
      },
      applications: {
        eyebrow: copy.applications[0],
        title: copy.applications[1],
        items: copy.applications[2]
      },
      quality: {
        eyebrow: copy.quality[0],
        title: copy.quality[1],
        text: copy.quality[2],
        cards: copy.quality[3]
      },
      related: {
        eyebrow: copy.related[0],
        title: copy.related[1],
        items: productConstants.commonRelated[locale]
      },
      inquiry: copy.inquiry,
      footer: productConstants.footerCopy[locale]
    }
  };
}

const articles = {
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
  dataCenterBackupPowerAgmSeparator:
    articleConstants.dataCenterBackupPowerAgmSeparatorCopy,
  earlyChinaLeadAcidBatteryManufacturing:
    articleConstants.earlyChinaLeadAcidBatteryManufacturingCopy,
  agmSeparatorPressureRetention:
    articleConstants.agmSeparatorPressureRetentionCopy,
  agmSeparatorBatchProcessControl:
    articleConstants.agmSeparatorBatchProcessControlCopy,
  agmSeparatorSupplyChain: articleConstants.agmSeparatorSupplyChainCopy,
  agmGlassFiberVsPvcSeparator:
    articleConstants.agmGlassFiberVsPvcSeparatorCopy
};

const articleSeo = {
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
  dataCenterBackupPowerAgmSeparator:
    seoConstants.dataCenterBackupPowerAgmSeparatorSeo,
  earlyChinaLeadAcidBatteryManufacturing:
    seoConstants.earlyChinaLeadAcidBatteryManufacturingSeo,
  agmSeparatorPressureRetention:
    seoConstants.agmSeparatorPressureRetentionSeo,
  agmSeparatorBatchProcessControl:
    seoConstants.agmSeparatorBatchProcessControlSeo,
  agmSeparatorSupplyChain: seoConstants.agmSeparatorSupplyChainSeo,
  agmGlassFiberVsPvcSeparator:
    seoConstants.agmGlassFiberVsPvcSeparatorSeo
};

for (const locale of secondaryResourceLocales) {
  for (const kind of articleKinds) {
    articles[kind] = {
      ...articles[kind],
      [locale]: secondaryArticleCopy[locale][kind]
    };
    articleSeo[kind] = {
      ...articleSeo[kind],
      [locale]: buildSecondaryArticleSeo(locale, kind)
    };
  }
}

const content = {
  home,
  sampleRequest,
  products,
  resources: secondaryResourceData,
  articles,
  seo: {
    home: seoConstants.homeSeo,
    sampleRequest: seoConstants.sampleRequestSeo,
    agmSeparator: seoConstants.agmSeparatorSeo,
    agmSeparatorRolls: seoConstants.agmSeparatorRollsSeo,
    agmSeparatorSheets: seoConstants.agmSeparatorSheetsSeo,
    glassFiberThermalInsulationPaper: thermalInsulationPaperSeo,
    agmSeparatorTesting: seoConstants.agmSeparatorTestingSeo,
    agmSeparatorVrlaApplication: seoConstants.agmSeparatorVrlaApplicationSeo,
    agmSeparatorUpsApplication: seoConstants.agmSeparatorUpsApplicationSeo,
    agmSeparatorMotorcycleApplication:
      seoConstants.agmSeparatorMotorcycleApplicationSeo,
    agmSeparatorEnergyStorageApplication:
      seoConstants.agmSeparatorEnergyStorageApplicationSeo,
    ...articleSeo
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
