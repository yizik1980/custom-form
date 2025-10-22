export class FieldType {
  name;
  value;
  // type can be one of several string values, but type annotations are not allowed in JS
  // You can document the possible values in a comment:
  // type: "input" | "select" | "checkbox" | "radio" | "textarea" | "date" | "number" | "password" | "email" | "url" | "tel" | "file" | "color" | "range" | "time" | "datetime-local" | "month" | "week"
  type;
  // options: Array<{ label: string, value: AnyActionArg }>; // Options for select, radio, etc.
  options; // Options for select, radio, etc.
  placeholder;
  required;
  disabled;
  readonly;
  min;
  max;
  step;
  pattern; // Regex pattern for validation
  rows; // For textarea
  cols; // For textarea
  multiple; // For file input
  accept; // For file input
  className;
}
