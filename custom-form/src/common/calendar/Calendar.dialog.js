import Toast from "../../shared/Toast/Toast";

function CalendarDialog({
  formData,
  handleInputChange,
  handleSubmit,
  handleCloseDialog,
}) {
  let startTime = 0;
  let endTime = 0;
 

  const handleBlurEnd = (e) => {
    // Intentionally left blank for future enhancements
    endTime = parseInt(e.target.value);
    if (endTime <= startTime) {
      Toast.error("End time must be after start time");
      e.target.value = "";
    }
  };
  const handleBlurStart = (e) => {
    startTime = parseInt(e.target.value);
  };
  return (
    <div>
      <h3>Add New Event</h3>
      <form onSubmit={handleSubmit} >
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Start Time:
          <input
            type="time"
            name="start"
            value={formData.start}
            onBlur={handleBlurStart}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            name="end"
            value={formData.end}
            onBlur={handleBlurEnd}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Add Event</button>
        <button type="button" onClick={handleCloseDialog}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CalendarDialog;
