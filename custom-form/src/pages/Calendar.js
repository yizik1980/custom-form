import { useEffect, useState } from "react";
import {
  getUserCalendarData,
  createCalendarEvent,
} from "../services/api.calendar.js";
import Dialog from "../shared/Dialog.js";
import { useToast } from "../shared/Toast/ToastContext.js";
import CalendarDialog from "../common/calendar/Calendar.dialog.js";
import { calendarDays } from "../storage/store.js";
import { useDispatch, useSelector } from "react-redux";

export default function Calendar({ title, selectedUser }) {
  const dispatch = useDispatch();
  const daysLetter = ["א", "ב", "ג", "ד", "ה", "ו", "שבת"];
  // const [hourStarts] = useState(7);
  const [calendarData, setCalendarData] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "",
  });
  const { addToast } = useToast();
  const calendarDaysFromStore = useSelector(
    (state) => state.app.calendarDays[selectedUser] || []
  );
  function formatDate(date) {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${y}-${m}-${d}`;
  }

  function getWeekDates() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const start = new Date(today);
    start.setDate(today.getDate() - dayOfWeek);
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return dates;
  }

  const weekDates = getWeekDates();

  const hours = Array.from({ length: 12 }, (_, i) => i + 7);

  const handleOpenDialog = () => {
    setShowDialog(true);
    setFormData({
      title: "ניסיון" + Math.floor(Math.random() * 100),
      description: "תיאור ניסיון",
      date: new Date().toISOString().substring(0, 10),
      start: new Date().toISOString().substring(11, 16),
      end: new Date(new Date().getTime() + 60 * 60 * 1000)
        .toISOString()
        .substring(11, 16),
    });
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setFormData({
      title: "",
      description: "",
      date: "",
      end: "",
      start: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      addToast("Please select a user before adding an event", "warning");
      return;
    }

    const { date, start, end } = formData;
    const startDate = new Date(`${date}T${start}`);
    const endDate = new Date(`${date}T${end}`);
    const dateTime = new Date(date);
    const eventData = {
      ...formData,
      date: dateTime.toISOString(),
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      user: selectedUser,
    };
    try {
      const result = await createCalendarEvent(eventData);
      if (!result) throw new Error("Failed to create event");
      addToast("Event created successfully", "success");
      // Refresh data
      const data = await getUserCalendarData(selectedUser);
      setCalendarData(data);
      dispatch(calendarDays({ list: data, user: selectedUser }));
      handleCloseDialog();
    } catch (error) {
      addToast("Error creating event", "error");
    }
  };

  useEffect(() => {
    if (selectedUser) {
      getUserCalendarData(selectedUser).then((data) => {
        dispatch(calendarDays({ list: data, user: selectedUser }));
        setCalendarData(data);
      });
    }
  }, [selectedUser, dispatch]);

  return (
    <div className="calendar-container">
      <h2>{title}</h2>
      <button onClick={handleOpenDialog} className="add-event-btn">
        Add Event
      </button>
      <div className="calendar-table">
        <div className="calendar-grid ">
          <div className="day-header empty-cell"></div>
          {weekDates.map((date, index) => (
            <div
              key={index}
              className="day-header flex gap-3 justify-center items-center"
            >
              <div>{daysLetter[index]}</div>
              <div>
                {date.getDate()}/{date.getMonth() + 1}
              </div>
            </div>
          ))}
        </div>
        <div className="calendar-body">
          {hours.map((hour) => (
            <div
              key={hour}
              className="calendar-grid justify-center items-start"
            >
              <div className="hour-cell">{hour}:00</div>
              {weekDates.map((date, dayIndex) => {
                const dayData = calendarData.find(
                  (d) => d.date === formatDate(date)
                );
                const events = dayData
                  ? dayData.events.filter(
                      (e) =>
                        e.time &&
                        e.time.startsWith(hour.toString().padStart(2, "0"))
                    )
                  : [];
                return (
                  <div key={dayIndex} className="day-cell">
                    {events.map((event, idx) => (
                      <div key={idx} className="event">
                        {event.title} ({event.duration}min)
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <Dialog isOpen={showDialog} onClose={handleCloseDialog}>
        <CalendarDialog
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleCloseDialog={handleCloseDialog}
        />
      </Dialog>
      {calendarDaysFromStore && (
        <div className="store-data">
          <h3>Calendar Days from Store:</h3>
          <pre>{JSON.stringify(calendarDaysFromStore, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
