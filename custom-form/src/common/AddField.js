import { useState } from "react";
import { useSelector } from "react-redux";
import { useI18n } from "../i18n/I18nContext.js";

const AddField = ({ addField }) => {
  const [isOpen, setIsOpen] = useState(false);
  const users = useSelector((state) => state.app.users);
  const { t } = useI18n();
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
    const label = formData.get("label")?.trim();
    const user = formData.get("user")?.trim();
    const valueInput = event.currentTarget.elements.value;
    if (!value || !type || !label || !user) {
      valueInput?.focus();
      return;
    }
    if (typeof addField === "function") {
      addField({value, type, label, user });
    }

    event.currentTarget.reset();
    handleClose();
  };

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={handleOpen}>
        {t('addField.button')}
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
                  {t('addField.title')}
                </h2>
                <p className="dialog-sub">
                  {t('addField.subtitle')}
                </p>
              </div>
              <button
                type="button"
                className="close-btn"
                onClick={handleClose}
                aria-label={t('addField.closeLabel')}
              >
                <span aria-hidden="true">x</span>
              </button>
            </header>

            <div className="dialog-body">
              <div>
                <label htmlFor="type">{t('addField.typeLabel')}</label>
                <select id="type" name="type" defaultValue="text">
                  <option value="text">{t('addField.fieldTypes.text')}</option>
                  <option value="number">{t('addField.fieldTypes.number')}</option>
                  <option value="date">{t('addField.fieldTypes.date')}</option>
                  <option value="textarea">{t('addField.fieldTypes.textarea')}</option>
                  <option value="checkbox">{t('addField.fieldTypes.checkbox')}</option>
                  <option value="radio">{t('addField.fieldTypes.radio')}</option>
                  <option value="select">{t('addField.fieldTypes.select')}</option>
                  <option value="email">{t('addField.fieldTypes.email')}</option>
                  <option value="password">{t('addField.fieldTypes.password')}</option>
                  <option value="url">{t('addField.fieldTypes.url')}</option>
                  <option value="tel">{t('addField.fieldTypes.tel')}</option>
                  <option value="file">{t('addField.fieldTypes.file')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="value">{t('addField.valueLabel')}</label>
                <input
                  id="value"
                  name="value"
                  type="text"
                  placeholder="Enter field value"
                  required
                />
                <p className="hint">
                  {t('addField.valueHint')}
                </p>
              </div>
              <div>
                <label htmlFor="label">{t('addField.labelLabel')}</label>
                <input
                  id="label"
                  name="label"
                  type="text"
                  placeholder="Enter field label"
                />
                <p className="hint">
                  {t('addField.labelHint')}
                </p>
              </div>
              <div>
                <label htmlFor="user">{t('addField.assignLabel')}</label>
                <select id="user" name="user" defaultValue="">
                  <option value="">{t('addField.selectUserPlaceholder')}</option>
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
                {t('addField.cancelButton')}
              </button>
              <button type="submit" className="btn btn-primary">
                {t('addField.createButton')}
              </button>
            </footer>
          </form>
        </div>
      )}
    </>
  );
};

export default AddField;
