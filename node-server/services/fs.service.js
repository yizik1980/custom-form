import { dirname } from "path";
import { readFile } from "fs/promises";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";

const first_word_regex = /[^.]+/;
const buildPath = (fileName) => {
  const fileUrl = new URL(fileName, import.meta.url);
  const fileDirectory = fileURLToPath(fileUrl);
  const __dirname = dirname(fileDirectory);
  return `${__dirname}/${fileName}`;
};

export async function readJson(fileName = "items.json", encoding = "utf8") {
  const nameList = fileName.match(first_word_regex)[0];
  try {
    const path = buildPath(fileName);
    const fileContent = await readFile(path, { encoding, flag: "r" });
    return JSON.parse(fileContent);
  } catch (err) {
    return { [nameList]: [] };
  }
}
/**
 * Writes the provided data as pretty-printed JSON to the filesystem at the path
 * returned by buildPath(fileName), and returns a Promise that resolves to the
 * same data.
 *
 * The function uses a synchronous filesystem write internally (writeFileSync).
 * Any errors encountered while writing are caught and logged to the console;
 * they are not rethrown, and the returned Promise still resolves with the
 * original `data`.
 *
 * @template T
 * @param {string} fileName - File name or relative path to be passed to buildPath.
 * @param {T} data - The data to serialize to JSON and write to disk.
 * @returns {Promise<{items:Array<{value:string,type:string}>}>} A Promise that resolves to the same `data` value passed in.
 */
async function rewriteData(fileName, data) {
  try {
    writeFileSync(buildPath(fileName), JSON.stringify(data, null, 2), {
      encoding: "utf8",
      flag: "w",
    });
  } catch (err) {
    console.error("Error writing file:", err);
  }
  return data;
}

export async function addItem(fileName = "items.json", payloadObject) {
 const nameList = fileName.match(first_word_regex)[0];
  const data = await readJson(fileName);
  if (!Array.isArray(data[nameList])) {
    data[nameList] = [];
  }
  data[nameList] = [...data[nameList], payloadObject];
  return await rewriteData(fileName, data);
}

export async function deleteItem(fileName = "items.json", id) {
 const nameList = fileName.match(first_word_regex)[0];
  const data = await readJson(fileName);
  if (!Array.isArray(data[nameList])) {
    data[nameList] = [];
  }
  data[nameList] = [...data[nameList].filter((item) => item.id !== id)];
  return await rewriteData(fileName, data);
}

export default {
  readJson,
  addItem,
  deleteItem,
};
