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
export function calendarGridDateStructure() {
  const today = new Date();
  const firstDayOfWeek = today.getDate() - today.getDay();
  return new Array(7).fill(0).map((_, i) => {
    const day = new Date(today.setDate(firstDayOfWeek + i));
    return {
      key: formatDate(day),
      day,
      hours: new Array(12).fill(0).map((hour, j) => j + 7), // Hours from 7 to 18
    };
  });
}
