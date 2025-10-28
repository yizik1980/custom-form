import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: 'Hello from Redux',
  items: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
      return state;
    },
    setItems(state, action) {
      console.log("Setting items in store:", action.payload);
      return {...state, items: [...action.payload]};
    },
    addItem(state, action) {
      state.items.push(action.payload);
      return state;
    }
  },
});

export const { setTitle, setItems } = appSlice.actions;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export default store;
