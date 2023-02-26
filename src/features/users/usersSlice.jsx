import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Marko Nikolic" },
  { id: "1", name: "Milos Rajic" },
  { id: "2", name: "Djordje Vasilevski" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
