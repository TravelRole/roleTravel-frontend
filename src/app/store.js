import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import counterReducer from "../features/counter/counterSlice";
import signReducer from "../features/Sign/signSlice";
import authReducer from "../features/Login/authSlice";
import userReducer from "../features/Landing/userSlice";
import searchReducer from "../features/SearchIDPW/searchSlice";
import travelReducer from "../features/SpaceList/travelSlice";
import loggedUserReducer from "../features/UserAccount/LoggedUserSlice";
import invitationCodeReducer from "../features/layout/invitationCodeSlice";
import essentialsReducer from '../features/Role/Essentials/EssentialsSlice'
import wantPlaceReducer from "../features/Role/Schedule/wantPlaceSlice"
import scheduleReducer from "../features/Role/Schedule/scheduleSlice"
import allPlanReducer from "../features/Role/Allplan/allPlanSlice";
import commentReducer from "../features/Role/Allplan/commentSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sign: signReducer,
    auth: authReducer,
    user: userReducer,
    search: searchReducer,
    travel: travelReducer,
    loggedInUser: loggedUserReducer,
    invitationCode: invitationCodeReducer,
    essentials: essentialsReducer,
    wantPlace : wantPlaceReducer,
    schedule : scheduleReducer,
    allPlan: allPlanReducer,
    comment: commentReducer,
  },
});
