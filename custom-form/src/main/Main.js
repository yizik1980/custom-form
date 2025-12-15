import { useState } from "react";
import Field from "./../common/Field.js";
import AddField from "./../common/AddField.js";
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
      <section className="grid gap-2 items-center justify-center">
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
                <h3 >{item?.user?.name}</h3>
                <Field item={item} />
              </div>
              <button
                type="button"
                className="block p-0 border-0 !pb-0 cursor-pointer hover:text-red-600"
                aria-label={`Delete ${item?.label || "field"}`}
                onClick={() => handleDelete(item._id)}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  width="20"
                  height="20"
                >
                  <line x1="5" y1="5" x2="15" y2="15" />
                  <line x1="15" y1="5" x2="5" y2="15" />
                </svg>
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
