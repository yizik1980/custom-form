import { type JSX } from "react";
import type { AnyField } from "../models/types";

type Renderer = (props: {
  field: AnyField;
  value: unknown;
  onChange: (val: unknown) => void;
}) => JSX.Element;

export const rendererRegistry: Record<string, Renderer> = {
  input: ({ field, value, onChange }) => (
    <input
      aria-label={field.label}
      placeholder={(field as any).placeholder}
      value={(value as string) ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2 w-full"
    />
  ),
  select: ({ field, value, onChange }) => {
    const opts = (field as any).options as string[];
    return (
      <select
        aria-label={field.label}
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded p-2 w-full"
      >
        <option value="">-- choose --</option>
        {opts?.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  },
  checkbox: ({ field, value, onChange }) => (
    <input
      type="checkbox"
      aria-label={field.label}
      checked={Boolean(value)}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4"
    />
  ),
};

export const FieldRenderer: Renderer = (props) => {
  const r = rendererRegistry[props.field.type];
  if (!r) return <span>Unsupported field type: {props.field.type}</span>;
  return r(props);
};
