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

  const handleOpenDialog = () => {
    setShowDialog(true);
    setFormData({
      title: "ניסיון " + Math.floor(Math.random() * 100),
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
          {calendarDaysFromStore.map((date, index) => (
            <div key={index} className="day-header">
              <div>{daysLetter[index]}</div>
              {date.map((hourObj, idx) => (
                <div
                  key={idx}
                  className="hour-cell relative border-t border-gray-300"
                >
                  <span className=" align-center item-center font-weight-light font-small">
                    {hourObj.hour}
                  </span>
                  {hourObj.events.map((event, eIdx) => (
                    <div
                      key={eIdx}
                      style={{ backgroundColor: event.color }}
                      className="event p-2 m-1 rounded text-sm"
                    >
                      <h4>{event.title}</h4>
                      <p>{event.description}</p>
                      <p>{event.start}</p>
                    </div>
                  ))}
                </div>
              ))}
              <div className="row">{date.day}</div>
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
    </div>
  );
}
