import {  useState } from "react";
import { useDispatch } from "react-redux";
import type { AnyField, FieldType } from "../models/types";
import { addField, removeField, updateField } from "../form/formSlice";

export const AddFieldPanel: React.FC = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState<FieldType>("input");



  return (
    <div className="flex gap-2 items-end">
      <div>
        <label className="block text-sm">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as FieldType)}
          className="border p-2 rounded"
        >
          <option value="input">Input</option>
          <option value="select">Select</option>
          <option value="checkbox">Checkbox</option>
        </select>
      </div>
      <button
        className="border px-3 py-2 rounded"
        onClick={() => dispatch(addField(
          type === "input"
            ? { id: crypto.randomUUID(), type: "input", label: "New Input", placeholder: "" }
            : type === "select"
            ? { id: crypto.randomUUID(), type: "select", label: "New Select", options: [] }
            : { id: crypto.randomUUID(), type: "checkbox", label: "New Checkbox" }
        ))}
      >
        Add field
      </button>
    </div>
  );
};

export const FieldEditorRow: React.FC<{
  field: AnyField;
}> = ({ field }) => {
  const dispatch = useDispatch();
  const isSelect = field.type === "select";

  return (
    <div className="border rounded p-2 flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          className="border p-2 rounded flex-1"
          value={field.label}
          onChange={(e) =>
            dispatch(
              updateField({ id: field.id, patch: { label: e.target.value } })
            )
          }
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={Boolean(field.required)}
            onChange={(e) =>
              dispatch(
                updateField({
                  id: field.id,
                  patch: { required: e.target.checked },
                })
              )
            }
          />
          required
        </label>
        <button
          className="border px-3 rounded"
          onClick={() => dispatch(removeField(field.id))}
        >
          Remove
        </button>
      </div>

      {field.type === "input" && (
        <input
          className="border p-2 rounded"
          placeholder="placeholder"
          value={(field as any).placeholder ?? ""}
          onChange={(e) =>
            dispatch(
              updateField({
                id: field.id,
                patch: { placeholder: e.target.value },
              })
            )
          }
        />
      )}

      {isSelect && (
        <textarea
          className="border p-2 rounded"
          placeholder="options, comma separated"
          value={(field as any).options?.join(",") ?? ""}
          onChange={(e) =>
            dispatch(
              updateField({
                id: field.id,
                patch: {
                  options: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                } as any,
              })
            )
          }
        />
      )}
    </div>
  );
};
