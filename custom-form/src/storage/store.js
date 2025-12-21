import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "Hello ",
  inputs: [],
  users: [],
  usersObject: {},
  calendarDays:[]
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
      return {
        ...state,
        users: [...action.payload],
        usersObject: action.payload.reduce(
          (obj, user) => ({ ...obj, [user._id]: user }),
          {}
        ),
      };
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
      return state;
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
    removeUser(state, action) {
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    },
    addUser(state, action) {
      return { ...state, users: [...state.users, action.payload] };
    },
    updateUser(state, action) {
      const updatedUsers = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      return { ...state, users: updatedUsers };
    },
  },
});

export const { setTitle, setItems, setSelectedUser,
  addItem, removeItem, setUsers, removeUser, addUser, updateUser } =
  appSlice.actions;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export default store;
