import { dirname } from "path";
import { readFile } from "fs/promises";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";

const buildPath = (fileName) => {
  const fileUrl = new URL(fileName, import.meta.url);
  const fileDirectory = fileURLToPath(fileUrl);
  const __dirname = dirname(fileDirectory);
  return `${__dirname}/${fileName}`;
};

export async function readJson(fileName, encoding = "utf8") {
  const path = buildPath(fileName);
  const fileContent = await readFile(path, { encoding, flag: "r" });
  return JSON.parse(fileContent);
}

export async function editingFileJson(
  fileName = "items.json",
  payloadObject,
  nameList = "items"
) {
  let data;
  try {
    data = await readJson(fileName);
  } catch (err) {
    data = { [nameList]: [] };
  }

  if (!Array.isArray(data[nameList])) {
    data[nameList] = [];
  }
  data[nameList] = [...data[nameList], payloadObject];
  writeFileSync(buildPath(fileName), JSON.stringify(data, null, 2), {
    encoding: "utf8",
    flag: "w",
  });
  return data;
}

export default {
  readJson,
  editingFileJson,
};
