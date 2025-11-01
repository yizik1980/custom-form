import "./AddField.css";
const AddField = ({ addField }) => {
  return (
    <div className="add-field-container">
      <form
        className="add-field-dialog"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.target);
          addField(data.get("value"), data.get("type"));
          console.log(data.get("type"), data.get("value"));
        }}
      >
        <div className="close-btn">x</div>
        <div>
          <div className="dialog-header">Add New Field</div>
        </div>
        <div className="dialog-body ">
          <label htmlFor="type">Type</label>
          <select id="type" name="type" defaultValue="text">
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="textarea">Textarea</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
            <option value="select">Select</option>
            <option value="email">Email</option>
            <option value="password">Password</option>
            <option value="url">URL</option>
            <option value="tel">Telephone</option>
            <option value="file">File</option>
          </select>
          <div className="mt-4 dialog-field">
            <label htmlFor="value">value</label>
            <input
              id="value"
              name="value"
              type="text"
              placeholder="Enter field value"
            />
          </div>
          <button type="submit">Create field</button>
        </div>
      </form>
    </div>
  );
};

export default AddField;
