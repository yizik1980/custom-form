export function formatDate(date) {
  const dateCalendar = new Date(date);
  const dateString = dateCalendar.getDate().toString().padStart(2, "0");
  const monthString = (dateCalendar.getMonth() + 1).toString().padStart(2, "0");
  const yearString = dateCalendar.getFullYear().toString();
  return `${yearString}-${monthString}-${dateString}`;
}
export function parseDateFromYYYYMMDD(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}   
export function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}
export function getHours(date){
    return date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0")
}