import express from "express";
import cors from "cors";
import { dirname } from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

const app = express();

// Ensure CORS does not automatically end preflight (OPTIONS) requests.
// This makes the cors middleware call next() for OPTIONS so your own handlers can run.
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
      const filePath = `${__dirname}/items.json`;
      const content = await readFile(filePath, "utf8");
      const itemsFromFile = JSON.parse(content);
      return res.json(itemsFromFile);
    } catch (err) {
      if (err.code === "ENOENT") {
        // items.json doesn't exist yet — return empty list
        return res.json([]);
      }
      console.error("Error reading items.json:", err);
      res.status(500).json({ error: "Failed to read items" });
    }
  });

// Get item
app.get("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((i) => i.id === id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// Create item
app.post("/api/items", (req, res) => {
  const { name, data } = req.body;
  if (!name) return res.status(400).json({ error: "Missing name" });
  const item = {
    id: nextId++,
    name,
    data: data || null,
    createdAt: new Date().toISOString(),
  };
  items.push(item);
  res.status(201).json(item);
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
app.delete("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const [deleted] = items.splice(idx, 1);
  res.json(deleted);
});

const PORT = process.env.PORT || 4000;
console.log(process.env.PORT);
// In-memory store
let nextId = 1;
const items = [];



// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
