import express from "express";
import { EventModel } from "../models/calendar.day.js";
import User from "../models/user.model.js";
import { formatDate, isValidDate, getHours } from "../utils/util.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("No user id provided");
    }
    
    const days = await EventModel.find({ user: req.params.id }).select("-user");
    res.json(days);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, date, user, start, end, duration } = req.body;

    // 1. Make sure the user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      throw new Error("User does not exist, event will not be saved");
    }
    const dateCalendar = new Date(date);
    if (!isValidDate(dateCalendar)) {
      throw new Error("Invalid date provided");
    }
    const formattedDate = formatDate(dateCalendar);
    // If no CalendarDay exists for this user/date, create it
    // 2. Save the event (user is valid)
    const event = await EventModel.create({
      title,
      description,
      time: getHours(dateCalendar),
      date: formattedDate,
      start,
      end,
      duration,
      user,
    });
    await event.save();

    const calendarDayEvent = await EventModel.findOne({
      user
    });
    // If you also want to know whether a CalendarDay was updated:
    if (!calendarDayEvent) {
      console.log(
        "Event saved, but no existing CalendarDay for this date/user",
      );
    }
    res.status(201).json({ calendarDayEvent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const calendarDayFound = await EventModel.findById(id);
    if (!calendarDayFound) {
      return res.status(404).json({ error: "Event not found" });
    }
    const eventResult = await EventModel.deleteOne({ _id: id });
    if (eventResult.deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "No associated events found to delete" });
    }
    res
      .status(200)
      .json({ message: "Event and associated CalendarDay deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
