import Field from "./../common/Field.js";
import AddField from "./../common/AddField.js";
import { useI18n } from "../i18n/I18nContext.js";

const Main = ({ items, addMethod, deleteMethod }) => {
  const { t } = useI18n();

  const handleDelete = (id) => {
    if (typeof deleteMethod === "function") {
      deleteMethod(id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-[var(--gb-800)] tracking-[-0.3px]">
          {t("home.title")}
        </h1>
        <AddField addField={addMethod} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-2xl border border-[var(--gb-100)] shadow-[0_2px_8px_rgba(51,74,82,0.05)] p-5 flex items-start gap-3 transition-all hover:shadow-lg"
            >
              <div className="form-group flex-1 min-w-0">
                <Field item={item} />
              </div>
              <button
                type="button"
                className="field-delete-btn shrink-0 mt-1 flex items-center justify-center w-7 h-7 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                aria-label={t("home.deleteLabel", { label: item?.label || "field" })}
                onClick={() => handleDelete(item._id)}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  width="16"
                  height="16"
                >
                  <line x1="5" y1="5" x2="15" y2="15" />
                  <line x1="15" y1="5" x2="5" y2="15" />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <div
            className="col-span-2 py-16 flex flex-col items-center justify-center text-center rounded-2xl border border-[var(--gb-100)] bg-[var(--gb-50)]"
          >
            <p className="text-base font-medium mb-1 text-[var(--gb-500)]">
              {t("home.noItems")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
