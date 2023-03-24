import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import counterReducer from "../features/counter/counterSlice";
import signReducer from "../features/Sign/signSlice";
import authReducer from "../features/Login/authSlice";

axios.defaults.baseURL = "api주소";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sign: signReducer,
    auth: authReducer,
  },
});
