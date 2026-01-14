import Toast from "../../shared/Toast/Toast";
import { useI18n } from "../../i18n/I18nContext.js";

function CalendarDialog({
  formData,
  handleInputChange,
  handleSubmit,
  handleCloseDialog,
}) {
  const { t } = useI18n();
  let startTime = 0;
  let endTime = 0;
 

  const handleBlurEnd = (e) => {
    // Intentionally left blank for future enhancements
    endTime = parseInt(e.target.value);
    if (endTime <= startTime) {
      Toast.error(t('toast.endTimeError'));
      e.target.value = "";
    }
  };
  const handleBlurStart = (e) => {
    startTime = parseInt(e.target.value);
  };
  return (
    <div>
      <h3>{t('calendar.addEventTitle')}</h3>
      <form onSubmit={handleSubmit} >
        <label>
          {t('calendar.titleLabel')}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          {t('calendar.descriptionLabel')}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          {t('calendar.dateLabel')}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          {t('calendar.startTimeLabel')}
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
          {t('calendar.endTimeLabel')}
          <input
            type="time"
            name="end"
            value={formData.end}
            onBlur={handleBlurEnd}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">{t('calendar.addEventSubmit')}</button>
        <button type="button" onClick={handleCloseDialog}>
          {t('calendar.cancelButton')}
        </button>
      </form>
    </div>
  );
}

export default CalendarDialog;
