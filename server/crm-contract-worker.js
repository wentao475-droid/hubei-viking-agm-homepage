import { parentPort, workerData } from "node:worker_threads";
import { unzipSync, strFromU8 } from "fflate";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const maxText = 1000000;
const decodeXml = (text) => text.replace(/&(?:#x([0-9a-f]+)|#(\d+)|amp|lt|gt|quot|apos);/gi, (entity, hex, decimal) => {
  if (hex || decimal) {
    const point = parseInt(hex || decimal, hex ? 16 : 10);
    return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : "";
  }
  return ({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'" })[entity.toLowerCase()];
});

try {
  const data = new Uint8Array(workerData.buffer);
  let text = "";
  if (workerData.extension === "pdf") {
    if (Buffer.from(data.subarray(0, 5)).toString() !== "%PDF-") throw new Error("PDF 格式无效");
    const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const root = dirname(fileURLToPath(import.meta.resolve("pdfjs-dist/package.json")));
    const task = getDocument({ data, verbosity: 0, isEvalSupported: false, useSystemFonts: false,
      disableFontFace: true, useWorkerFetch: false, cMapUrl: join(root, "cmaps/"), cMapPacked: true,
      standardFontDataUrl: join(root, "standard_fonts/"), stopAtErrors: true });
    let pdf;
    try {
      pdf = await task.promise;
      if (pdf.numPages > 50) throw new Error("最多支持 50 页合同，请缩小文件或手动录入");
      for (let n = 1; n <= pdf.numPages; n++) {
        const page = await pdf.getPage(n), content = await page.getTextContent();
        let previous = null;
        for (const item of content.items) {
          if (item.str == null) continue;
          if (previous && !text.endsWith("\n")) {
            if (Math.abs(item.transform[5] - previous.transform[5]) > 2) text += "\n";
            else if (item.transform[4] - previous.transform[4] - previous.width > 1) text += " ";
          }
          text += item.str + (item.hasEOL ? "\n" : ""); previous = item;
        }
        text += "\n";
        page.cleanup();
        if (text.length > maxText) throw new Error("合同文字过多，请手动录入");
      }
    } finally { await task.destroy(); }
  } else {
    let size = 0;
    const files = unzipSync(data, { filter: (file) => {
      if (!/^word\/(?:document|header\d+|footer\d+)\.xml$/.test(file.name)) return false;
      size += file.originalSize;
      if (size > 8 * 1024 * 1024) throw new Error("Word 解压后内容过大");
      return true;
    } });
    if (!files["word/document.xml"]) throw new Error("不是有效的 .docx 文件");
    for (const bytes of Object.values(files)) {
      const xml = strFromU8(bytes);
      if (/<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error("Word 含有不支持的实体定义");
      text += decodeXml(xml.replace(/<w:(?:p|tr)\b[^>]*>/g, "\n").replace(/<\/w:tc>/g, "\t").replace(/<w:(?:br|tab)\b[^>]*\/>/g, "\n").replace(/<[^>]*>/g, "")) + "\n";
      if (text.length > maxText) throw new Error("合同文字过多，请手动录入");
    }
  }
  parentPort.postMessage({ text });
} catch (error) {
  const message = error.name === "PasswordException" ? "PDF 已加密，请解除密码后上传或手动录入"
    : /最多支持|文字过多|过大|不是有效|格式无效|实体定义/.test(error.message) ? error.message : "合同无法解析，请确认文件完整或手动录入";
  parentPort.postMessage({ error: message });
}
