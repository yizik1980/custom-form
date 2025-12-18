import { useEffect, useState } from "react";
import { getUserCalendarData, createCalendarEvent } from "../services/api.calendar.js";
import Dialog from "../shared/Dialog.js";

export default function Calendar({ title, selectedUser }) {
  const daysLetter = ["א", "ב", "ג", "ד", "ה", "ו", "שבת"];
  // const [hourStarts] = useState(7);
  const [calendarData, setCalendarData] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '',
  });

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
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    const { date, time, ...rest } = formData;
    const dateTime = new Date(`${date}T${time}`);
    const eventData = {
      ...rest,
      date: dateTime.toISOString(),
      user: selectedUser,
    };
    try {
      await createCalendarEvent(eventData);
      // Refresh data
      const data = await getUserCalendarData(selectedUser);
      setCalendarData(data);
      handleCloseDialog();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  useEffect(() => {
    console.log("Calendar received selectedUser prop:", selectedUser);
    if (selectedUser) {
      getUserCalendarData(selectedUser).then((data) => {
        console.log("Fetched calendar data for user:", data);
        setCalendarData(data);
      });
    }
  }, [selectedUser]);

  return (
    <div className="calendar-container">
      <h2>{title}</h2>
      <button onClick={handleOpenDialog} className="add-event-btn">Add Event</button>
      <table className="calendar-table">
        <thead>
          <tr>
            <th></th>
            {weekDates.map((date, index) => (
              <th key={index} className="day-header">
                <div>{daysLetter[index]}</div>
                <div>{date.getDate()}/{date.getMonth() + 1}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map(hour => (
            <tr key={hour}>
              <td className="hour-cell">{hour}:00</td>
              {weekDates.map((date, dayIndex) => {
                const dayData = calendarData.find(d => d.date === formatDate(date));
                const events = dayData ? dayData.events.filter(e => e.time && e.time.startsWith(hour.toString().padStart(2, '0'))) : [];
                return (
                  <td key={dayIndex} className="day-cell">
                    {events.map((event, idx) => (
                      <div key={idx} className="event">
                        {event.title} ({event.duration}min)
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog isOpen={showDialog} onClose={handleCloseDialog}>
        <h3>Add New Event</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleInputChange} />
          </label>
          <label>
            Date:
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
          </label>
          <label>
            Time:
            <input type="time" name="time" value={formData.time} onChange={handleInputChange} required />
          </label>
          <label>
            Duration (minutes):
            <input type="number" name="duration" value={formData.duration} onChange={handleInputChange} required />
          </label>
          <button type="submit">Add Event</button>
          <button type="button" onClick={handleCloseDialog}>Cancel</button>
        </form>
      </Dialog>
    </div>
  );
}
