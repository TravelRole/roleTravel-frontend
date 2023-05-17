import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import signReducer from "../features/Sign/signSlice";
import authReducer from "../features/Login/authSlice";
import userReducer from "../features/Landing/userSlice";
import searchReducer from "../features/SearchIDPW/searchSlice";
import travelReducer from "../features/SpaceList/travelSlice";
import loggedUserReducer from "../features/UserAccount/LoggedUserSlice";
import invitationCodeReducer from "../features/layout/invitationCodeSlice";
import essentialsReducer from '../features/Role/Essentials/EssentialsSlice'
import wantPlaceReducer from "../features/Role/Schedule/WantPlaceSlice"
import allPlanReducer from "../features/Role/AllPlan/allPlanSlice";
import commentReducer from "../features/Role/AllPlan/commentSlice";

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
    allPlan: allPlanReducer,
    comment: commentReducer,
  },
});
