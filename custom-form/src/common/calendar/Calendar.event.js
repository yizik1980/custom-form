function CalendarEvent({ events }) {
  return (
    <div className="event">
      {events.map((event, idx) => (
        <div key={idx} className="event">
          {event.title} ({event.duration / 3600}min)
        </div>
      ))}
    </div>
  );
}

export default CalendarEvent;
