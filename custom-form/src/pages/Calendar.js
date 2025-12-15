import { useEffect, useState } from "react";
import { getUserCalendarData } from "../services/api.calendar.js";

export default function Calendar({ title, selectedUser }) {
  const daysLetter = ["א", "ב", "ג", "ד", "ה", "ו", "שבת"];
   const [hourStarts] = useState(7);
  // const [dayHours, setDayHour] = useState(8);
  useEffect(() => {
    console.log("Calendar received selectedUser prop:", selectedUser);
    selectedUser &&
      getUserCalendarData(selectedUser).then((data) => {
        console.log("Fetched calendar data for user:", data);
      });
  }, [selectedUser]);
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {daysLetter.map((letter) => (
          <li>{letter}</li>
        ))}
      </ul>
      {hourStarts}
    </div>
  );
}
