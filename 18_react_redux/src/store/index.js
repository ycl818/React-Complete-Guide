import { createSlice, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/authSlice";

const initialState = { counter: 0, showCounter: true };
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    authentication: authReducer,
  },
}); // wants a pointer at reducer

export * from "./slice/authSlice";
export const counterActions = counterSlice.actions;
export default store;
