import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import counterReducer from "../features/counter/counterSlice";
import signReducer from "../features/Sign/signSlice";
import authReducer from "../features/Login/authSlice";
import userReducer from "../features/Landing/userSlice";
import searchReducer from "../features/SearchIDPW/searchSlice";
import travelReducer from "../features/SpaceList/travelSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sign: signReducer,
    auth: authReducer,
    user: userReducer,
    search: searchReducer,
    travel: travelReducer,
  },
});
