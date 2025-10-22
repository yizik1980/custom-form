import { useState } from "react";
import Field from "./Field.js";

  const Main = ({ items }) => {
    const [title] = useState("Dynamic Input Form");

    return (
      <div className="min-h-screen flex flex-col items-center justify-start p-8 bg-gray-50 tailwind-inputs">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">{title}</h1>
      {Array.isArray(items) && items.length > 0 ? (
        <div className="grid gap-6 w-full max-w-5xl sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4">
          <div className="form-group">
            <Field item={item} />
          </div>
          </div>
        ))}
        </div>
      ) : (
        <p className="text-gray-500">No items to display</p>
      )}
      </div>
    );
  };

export default Main;
