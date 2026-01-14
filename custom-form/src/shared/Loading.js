import { useI18n } from "../i18n/I18nContext.js";

function Loading({ isLoading }) {
  const { t } = useI18n();
  return (
    <div>
     {isLoading && (
        <div className="preloader-overlay" role="status" aria-live="polite">
          <div className="preloader-card">
            <div className="preloader-spinner" aria-hidden="true" />
            <p className="preloader-text">{t('loading.text')}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Loading
