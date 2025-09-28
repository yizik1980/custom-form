import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AnyField, FormSchema, FormValues } from "../models/types";
import { nanoid } from "nanoid";

const initialState: { schema: FormSchema; values: FormValues } = {
  schema: {
    title: "CustomForm",
    fields: [
      {
        id: nanoid(),
        type: "input",
        label: "Full name",
        required: true,
        placeholder: "John Doe",
      },
      {
        id: nanoid(),
        type: "select",
        label: "Role",
        options: ["Admin", "Editor", "Viewer"],
      },
      {
        id: nanoid(),
        type: "checkbox",
        label: "Agree to terms",
        required: true,
      },
    ],
  },
  values: {},
};

type UpdateFieldPayload = { id: string; patch: Partial<AnyField> };

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setSchema(state, action: PayloadAction<FormSchema>) {
      state.schema = action.payload;
      state.values = {};
    },
    addField(state, action: PayloadAction<AnyField>) {
      state.schema.fields.push(action.payload);
    },
    removeField(state, action: PayloadAction<string>) {
      state.schema.fields = state.schema.fields.filter(
        (f) => f.id !== action.payload
      );
      delete state.values[action.payload];
    },
    updateField(state, action: PayloadAction<UpdateFieldPayload>) {
      const idx = state.schema.fields.findIndex(
        (f) => f.id === action.payload.id
      );
      if (idx !== -1)
        state.schema.fields[idx] = {
          ...state.schema.fields[idx],
          ...action.payload.patch,
        } as AnyField;
    },
    reorderFields(state, action: PayloadAction<{ from: number; to: number }>) {
      const arr = state.schema.fields;
      const [moved] = arr.splice(action.payload.from, 1);
      arr.splice(action.payload.to, 0, moved);
    },
    setValue(state, action: PayloadAction<{ id: string; value: unknown }>) {
      state.values[action.payload.id] = action.payload.value;
    },
    resetValues(state) {
      state.values = {};
    },
  },
});

export const {
  setSchema,
  addField,
  removeField,
  updateField,
  reorderFields,
  setValue,
  resetValues,
} = formSlice.actions;

export default formSlice.reducer;
