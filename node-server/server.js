import express from "express";
import cors from "cors";
import { dirname } from "path";

import { fileURLToPath } from "url";
import { addItem, deleteItem, readJson } from "./services/fs.service.js";
import { randomUUID } from "crypto";

const app = express();
const corsOptions = { preflightContinue: true };
app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Health
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Simple Express API" });
});

// List items
app.get("/api/items", async (req, res) => {
  try {
    const itemsFromFile = await readJson("items.json");
    return res.json(itemsFromFile);
  } catch (err) {
    if (err.code === "ENOENT") {
      return res.json([]);
    }
    console.error("Error reading items.json:", err);
    res.status(500).json({ error: "Failed to read items" });
  }
});

// Create item
app.post("/api/items", async (req, res) => {
  const { value, type } = req.body;
  if (!value || !type)
    return res.status(400).json({ error: "payload missing value or type" });
  const item = {
    id: randomUUID(),
    value,
    type,
  };
  const items = addItem("items.json", item);
  res.status(201).json(items);
});

// Update item
app.put("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((i) => i.id === id);
  if (!item) return res.status(404).json({ error: "Not found" });
  const { name, data } = req.body;
  if (name !== undefined) item.name = name;
  if (data !== undefined) item.data = data;
  res.json(item);
});

// Delete item
app.delete("/api/items/:id", async (req, res) => {
  const id = req.params.id;
  const data = await deleteItem('items.json',id);
  res.json(data);
});

const PORT = process.env.PORT || 4000;
console.log(process.env.PORT);
// In-memory store
let nextId = 1;
const items = [];

// Start server
// simple request logger middleware
app.use((req, res, next) => {
  const start = process.hrtime();
  res.on("finish", () => {
    const [s, ns] = process.hrtime(start);
    const ms = (s * 1e3 + ns / 1e6).toFixed(3);
    const bodyPreview = req.body && Object.keys(req.body).length ? ` body=${JSON.stringify(req.body)}` : "";
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${ms}ms${bodyPreview}`);
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
