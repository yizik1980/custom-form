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

export async function updateItem(fileName = "items.json", id, updatedFields) {
 const nameList = fileName.match(first_word_regex)[0];
  const data = await readJson(fileName);  

  if (!Array.isArray(data[nameList])) {
    data[nameList] = [];
  }
  data[nameList] = data[nameList].map((item) => {
    if (item.id === id) {
      return { ...item, ...updatedFields };
    }
    return item;
  });
  return await rewriteData(fileName, data);
}

export async function getItemById(fileName = "items.json", id) {
 const nameList = fileName.match(first_word_regex)[0];
  const data = await readJson(fileName);
  if (!Array.isArray(data[nameList])) {
    data[nameList] = [];
  }   
  return data[nameList].find((item) => item.id === id);
}

export default {
  readJson,
  addItem,
  deleteItem,
  updateItem,
  getItemById,
};
