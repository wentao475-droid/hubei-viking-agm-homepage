import { parentPort, workerData } from "node:worker_threads";
import readExcelFile from "read-excel-file/node";
import { parse } from "csv-parse/sync";

try {
  const buffer = Buffer.from(workerData.buffer);
  let sheets;
  if (workerData.extension === ".csv") {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
    sheets = [{ sheet: "CSV", data: parse(text, { bom: true, skip_empty_lines: true, relax_column_count: true, max_record_size: 100000 }) }];
  } else {
    sheets = await readExcelFile(buffer);
  }
  if (!Array.isArray(sheets) || sheets.length > 30) throw new Error("文件最多允许 30 个工作表");
  sheets = sheets.filter((sheet) => sheet.data.length).map(({ sheet, data }) => {
    if (data.length > 1001 || data.some((row) => row.length > 50)) throw new Error("每张表最多 1,000 条线索、50 列");
    return { sheet, data: data.map((row) => row.map((value) => {
      const text = value instanceof Date ? value.toISOString().slice(0, 19) : String(value ?? "");
      if (text.length > 5000) throw new Error("单元格最多 5,000 字符");
      return text;
    })) };
  });
  if (!sheets.length) throw new Error("文件没有可导入的数据");
  if (JSON.stringify(sheets).length > 6 * 1024 * 1024) throw new Error("表格解析后的数据过大");
  parentPort.postMessage({ sheets });
} catch (error) {
  parentPort.postMessage({ error: error.message });
}
