
function CalendarDialog({formData, handleInputChange, handleSubmit, handleCloseDialog}) {
  return (
    <div>
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
    </div>
  )
}


export default CalendarDialog

