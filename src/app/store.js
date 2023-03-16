import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import signReducer from "../features/Sign/signSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sign: signReducer,
  },
});
