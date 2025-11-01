import { useState } from "react";
import Field from "./Field.js";
import AddField from "./AddField.js";

const Main = ({ items , addMethod}) => {
  const [title] = useState("Dynamic Input Form");

  return (
    <div className="w-container mx-auto p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">{title}</h1>
      <section>
        <AddField addField={addMethod} ></AddField>
      </section>
      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4">
              <div className="form-group">
                <Field item={item} />
              </div>
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
