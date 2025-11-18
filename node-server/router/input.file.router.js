import express from "express";
import {
  addItem,
  deleteItem,
  readJson,
  updateItem,
} from "../services/fs.service.js";
import { randomUUID } from "crypto";

const router = express.Router();
// List items
router.get("/api/items", async (req, res) => {
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

// Get item by ID
router.get("/api/items/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const item = await getItemById("items.json", id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    console.error("Error retrieving item:", err);
    res.status(500).json({ error: "Failed to retrieve item" });
  }
});

// Create item
router.post("/api/items", async (req, res) => {
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
router.put("/api/items/:id", (req, res) => {
  const id = req.params.id;
  const { value, type } = req.body;
  const item = { id, value, type };
  const data = updateItem("items.json", id, item);
  res.json(data);
});

// Delete item
router.delete("/api/items/:id", async (req, res) => {
  const id = req.params.id;
  const data = await deleteItem("items.json", id);
  res.json(data);
});

export default router;