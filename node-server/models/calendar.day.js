import mongoose from "mongoose";

export class CalendarDay {
  date;
  start;
  pirodeOfTime;
  events;
  constructor(date = new Date(), events = []) {
    this.events = events;
    this.date = date;
  }
}
export const CalendarDayModel = mongoose.model(
  "CalendarDay",
  new mongoose.Schema(
    {
      date: { type: String, required: true },
      pirodeOfTime: { type: String, required: false },
      events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event", required: false, default: [] }],
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { strict: false }
  )
);

export const EventModel = mongoose.model(
  "Event",
  new mongoose.Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: false },
      start: { type: String, required: false },
      end: { type: String, required: false },
      date: { type: String, required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      calendarDay: { type: mongoose.Schema.Types.ObjectId, ref: "CalendarDay" },
    },
    { strict: false }
  )
);
