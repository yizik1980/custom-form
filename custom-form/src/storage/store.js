import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "Hello ",
  inputs: [],
  users:[]
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
      return state;
    },
    setUsers(state, action) {
      return { ...state, users: [...action.payload] };
    },
    setItems(state, action) {
      return { ...state, inputs: [...action.payload] };
    },
    addItem(state, action) {
      return { ...state, inputs: [...state.inputs, action.payload] };
    },
    removeItem(state, action) {
      return {
        ...state,
        inputs: state.inputs.filter((input) => input._id !== action.payload),
      };
    },
  },
});

export const { setTitle, setItems, addItem, removeItem, setUsers } = appSlice.actions;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export default store;
