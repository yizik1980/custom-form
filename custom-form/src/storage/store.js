import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "Hello from Redux",
  inputs: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
      return state;
    },
    setItems(state, action) {
      console.log("Setting items in store:", action.payload);
      return { ...state, inputs: [...action.payload] };
    },
    addItem(state, action) {
      return { ...state, inputs: [...state.inputs, action.payload] };
    },
  },
});

export const { setTitle, setItems, addItem } = appSlice.actions;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export default store;
