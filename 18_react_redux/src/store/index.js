import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/authSlice";
import { counterReducer } from "./slice/counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    authentication: authReducer,
  },
}); // wants a pointer at reducer

export * from "./slice/counterSlice";
export * from "./slice/authSlice";

export default store;
