import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import signReducer from "../features/Sign/signSlice";
import authReducer from "../features/Login/authSlice";
import userReducer from "../features/Landing/userSlice";
import searchReducer from "../features/SearchIDPW/searchSlice";
import travelReducer from "../features/SpaceList/travelSlice";
import loggedUserReducer from "../features/UserAccount/LoggedUserSlice";
import invitationCodeReducer from "../features/layout/Sidebar/Invitation/invitationCodeSlice";
import essentialsReducer from "../features/Role/Essentials/EssentialsSlice";
import wantPlaceReducer from "../features/Role/Schedule/wantPlaceSlice";
import travelDayReducer from "../features/Role/Schedule/travelDaySlice";
import allPlanReducer from "../features/Role/AllPlan/allPlanSlice";
import commentReducer from "../features/Role/AllPlan/commentSlice";
import scheduleReducer from "../features/Role/Schedule/scheduleSlice";
import reserveReducer from "../features/Role/Reservation/reserveSlice";
import accountReducer from "../features/Role/Account/accountSlice";
import ammountReducer from "../features/Role/Account/amountSlice";
import sidebarReducer from "../features/layout/Sidebar/sidebarSlice";

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
    wantPlace: wantPlaceReducer,
    travelDay: travelDayReducer,
    allPlan: allPlanReducer,
    comment: commentReducer,
    schedule: scheduleReducer,
    reserveList: reserveReducer,
    accountList: accountReducer,
    amountTotal: ammountReducer,
    sidebar: sidebarReducer,
  },
});
