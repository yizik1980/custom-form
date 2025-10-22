import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: 'Hello from Redux',
  items: [
    {
      id: 1,
      type: "text",
      value: "noteable earea",
      label: "Text Input",
    },
    {
      id: 2,
      type: "password",
      value: "password",
      label: "Password Input",
    },
    { id: 3, type: "checkbox", value: "checkbox" },
    { id: 4, type: "radio", value: "radio", label: "Radio Button" },
    { id: 5, type: "number", value: "number", label: "Number Input" },
    { id: 6, type: "date", value: "date", label: "Date Input" },
    { id: 7, type: "email", value: "email" , label: "Email Input" },
    { id: 8, type: "file", value: "file" , label: "File Input" },
    { id: 9, type: "range", value: "range", label: "Range Input"  },
    { id: 10, type: "color", value: "color", label: "Color Input"  },
    { id: 11, type: "tel", value: "tel", label: "Telephone Input"  },
    { id: 12, type: "select", value: "url", label: "Select Input"  },
    { id: 13, type: "time", value: "time" , label: "Time Input"  }, 
    { id: 14, type: "textarea", value: "textarea", label: "Textarea Input"  },
  ],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
    setItem(state, action) {
      return { ...state, items:[...action.payload,...state]}
    },
    addItem(state, action) {
      state.items.push(action.payload);
      return state;
    }
  },
});

export const { setTitle } = appSlice.actions;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export default store;
