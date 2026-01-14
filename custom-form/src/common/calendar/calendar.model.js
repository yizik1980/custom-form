
export function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  } 
  return color;
}

export function calendarModel() {
  return {
    _id: "",
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    userId: "",
  };
}
export function formatDate(date) {
  const dateCalendar = new Date(date);
  const dateString = dateCalendar.getDate().toString().padStart(2, "0");
  const monthString = (dateCalendar.getMonth() + 1).toString().padStart(2, "0");
  const yearString = dateCalendar.getFullYear().toString();
  return `${dateString}-${monthString}-${yearString}`;
}
export function calendarGridDateStructure(list) {
  const listedDates = list.reduce((curent, day) => {
    const dayEvents = day.events.map((event) => ({...event,color:generateRandomColor()})) || [];
    return {
      ...curent,
      [day.date]: [...(curent[day.date] || []), ...dayEvents],
    };
  }, {});
  const today = new Date();
  const firstDayOfWeek = today.getDate() - today.getDay();

  return new Array(7).fill(0).map((_, i) => {
    const day = new Date(today.setDate(firstDayOfWeek + i));
    const key = formatDate(day);
    const dayEvents = listedDates[key] || [];
    const hoursEvents = dayEvents.reduce((curent, event) => {
      const eventDate = new Date(event.start);
      const hourKey = eventDate.getHours();
      return { ...curent, [hourKey]: [...(curent[hourKey] || []), event] };
    }, {});
    return new Array(12)
      .fill(0)
      .map((h, j) => j + 7)
      .map((hour) => ({
        day,
        key,
        events: hoursEvents[hour] || [],
        hour,
      }));
  });
}
