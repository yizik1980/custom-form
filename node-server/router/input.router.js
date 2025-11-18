import express from "express";
import InputModel from "../models/inputs.model.js";
const router = express.Router();

// GET all inputs
router.get("/", async (req, res) => {
  const inputs = await InputModel.find();
  res.json(inputs);
});

// POST create new input
router.post("/", async (req, res) => {
  try {
    const input = await InputModel.create(req.body);
    res.status(201).json(input);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 

});

router.put("/:id", async (req, res) => {
  try {
    const input = await InputModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(input);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// DELETE input by id
router.delete("/:id", async (req, res) => {
  await InputModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
