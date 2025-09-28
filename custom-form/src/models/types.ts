export type FieldType = 'input' | 'select' | 'checkbox';

export interface BaseField {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
}

export interface InputField extends BaseField {
  type: 'input';
  placeholder?: string;
}

export interface SelectField extends BaseField {
  type: 'select';
  options: string[];
}

export interface CheckboxField extends BaseField {
  type: 'checkbox';
}

export type AnyField = InputField | SelectField | CheckboxField;

export interface FormSchema {
  title: string;
  fields: AnyField[];
}

export type FormValues = Record<string, unknown>;
