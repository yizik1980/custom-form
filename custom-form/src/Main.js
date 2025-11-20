import { useState } from "react";
import Field from "./Field.js";
import AddField from "./AddField.js";

const Main = ({ items, addMethod, deleteMethod }) => {
  const [title] = useState("Dynamic Input Form");
  const handleDelete = (id) => {
    if (typeof deleteMethod === "function") {
      deleteMethod(id);
    }
  };

  return (
    <div className="w-container mx-auto p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">{title}</h1>
      <section>
        <AddField addField={addMethod} ></AddField>
      </section>
      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow p-4 flex items-center gap-4"
            >
              <div className="form-group flex-1">
                <Field item={item} />
              </div>
              <button
                type="button"
                className="shrink-0 inline-flex items-center justify-center rounded-full bg-red-500 text-white w-11 h-11 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                aria-label={`Delete ${item?.label || "field"}`}
                onClick={() => handleDelete(item._id)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No items to display</p>
        )}
      </div>
    </div>
  );
};

export default Main;
