import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../lib/customAPI";
import userProfile from "../../assets/images/userProfile.png";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const getUserInfo = createAsyncThunk("user/userInfo", async () => {
  const response = await tokenApi.get("api/basic-profile");
  const { name, email, profile, userId } = response?.data;
  const userInfo = {
    userId: userId,
    name: name,
    email: email,
    profile: profile === null ? userProfile : profile,
  };
  return userInfo;
});

export const checkInvitationCode = createAsyncThunk(
  "user/checkCode",
  async (inviteCode, thunkAPI) => {
    try {
      const res = await tokenApi.get(`api/check-room/${inviteCode}`);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const setUserRole = createAsyncThunk(
  "user/userRole",
  async ({ selectRole, invitationCode }, thunkAPI) => {
    try {
      const res = await tokenApi.post(`api/room/${invitationCode}`, selectRole);
      return res.data.roomId;
    } catch (error) {}
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
