import { Worker } from "node:worker_threads";
import { fail } from "./crm-store.js";

let reading = false;

export function contractNumbers(text) {
  const candidates = new Map();
  const label = /(?:合\s*同\s*(?:编\s*号|号\s*码|号)|合\s*约\s*编\s*号|(?:sales\s+)?(?:contract|agreement)\s*(?:no\.?|number|#)(?![A-Za-z]))\s*[:：#]?\s*[\r\n\t ]*/giu;
  for (const match of text.matchAll(label)) {
    const tail = text.slice(match.index + match[0].length);
    const number = tail.match(/^[A-Za-z0-9\u4e00-\u9fff][A-Za-z0-9\u4e00-\u9fff/_.()\-－—–]*/u)?.[0];
    if (!number || number.length > 100 || !/[A-Za-z0-9]/.test(number) || /^(?:未填|待定|暂无|买方|卖方|签订|日期|签约|签署|甲方|乙方|none$|tbd$)/i.test(number)) continue;
    const context = text.slice(match.index, match.index + match[0].length + number.length).replace(/\s+/g, " ").slice(0, 220);
    if (!candidates.has(number)) candidates.set(number, { number, context });
    if (candidates.size > 20) fail("合同中编号过多，请手动核对并录入订单号");
  }
  return [...candidates.values()];
}

export async function readContract(file) {
  if (!file?.buffer?.length) fail("请选择合同文件");
  if (file.size > 10 * 1024 * 1024) fail("合同不能超过 10 MiB", 413);
  const extension = file.originalname.split(".").pop().toLowerCase();
  if (!["pdf", "docx"].includes(extension)) fail("识别仅支持可复制文字的 PDF 和 .docx；扫描件、图片和旧 .doc 请手动录入");
  if (reading) fail("正在识别另一份合同，请稍后重试", 429);
  reading = true;
  try {
    const result = await new Promise((resolve, reject) => {
      const worker = new Worker(new URL("./crm-contract-worker.js", import.meta.url), {
        workerData: { buffer: file.buffer, extension }, resourceLimits: { maxOldGenerationSizeMb: 192 }
      });
      let settled = false;
      const finish = (error, data) => {
        if (settled) return; settled = true;
        clearTimeout(timer); worker.terminate();
        error ? reject(Object.assign(new Error(error), { status: 400 })) : resolve(data);
      };
      const timer = setTimeout(() => finish("合同识别超时，请缩小文件或手动录入"), 15000);
      worker.once("message", (data) => finish(data.error, data));
      worker.once("error", () => finish("合同无法解析或超出内存限制，请手动录入"));
      worker.once("exit", () => finish("合同识别已中止，请重试或手动录入"));
    });
    return { candidates: contractNumbers(result.text), has_text: Boolean(result.text.trim()) };
  } finally { reading = false; }
}
