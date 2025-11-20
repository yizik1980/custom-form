import { useState } from "react";
import { useSelector } from "react-redux";
import "./AddField.css";

const AddField = ({ addField }) => {
  const [isOpen, setIsOpen] = useState(false);
  const users = useSelector((state) => state.app.users);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const type = formData.get("type");
    const value = formData.get("value")?.trim();
    const valueInput = event.currentTarget.elements.value;

    if (!value) {
      valueInput?.focus();
      return;
    }

    if (typeof addField === "function") {
      addField(value, type);
    }

    event.currentTarget.reset();
    handleClose();
  };

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={handleOpen}>
        Add Field
      </button>

      {isOpen && (
        <div
          className="add-field-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-field-title"
          onClick={handleOverlayClick}
        >
          <form className="add-field-dialog" onSubmit={handleSubmit}>
            <header className="dialog-header">
              <div>
                <h2 id="add-field-title" className="dialog-title">
                  Add New Field
                </h2>
                <p className="dialog-sub">
                  Choose a field type and label to extend the form.
                </p>
              </div>
              <button
                type="button"
                className="close-btn"
                onClick={handleClose}
                aria-label="Close add field dialog"
              >
                <span aria-hidden="true">x</span>
              </button>
            </header>

            <div className="dialog-body">
              <div>
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
              </div>

              <div>
                <label htmlFor="value">value</label>
                <input
                  id="value"
                  name="value"
                  type="text"
                  placeholder="Enter field value"
                  required
                />
                <p className="hint">
                  This label is displayed alongside the new input field.
                </p>
              </div>
              <div>
                <label htmlFor="label">Label</label>
                <input
                  id="label"
                  name="label"
                  type="text"
                  placeholder="Enter field label"
                />
                <p className="hint">
                  This label is displayed alongside the new input field.
                </p>
              </div>
              <div>
                <label htmlFor="user">Assign to User</label>
                <select id="user" name="user" defaultValue="">
                  <option value=""> Select User</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <footer className="dialog-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create Field
              </button>
            </footer>
          </form>
        </div>
      )}
    </>
  );
};

export default AddField;
