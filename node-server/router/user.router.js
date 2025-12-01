import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.find({ _id: req.params.id });
  res.json(user);
});

// POST create new user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE user by id
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: `${req.params.id} was Deleted` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
