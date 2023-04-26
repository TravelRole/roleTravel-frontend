import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../lib/customAPI";
import dog from "../../assets/images/dog.jpeg";
import { useNavigate } from "react-router-dom";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const getUserInfo = createAsyncThunk("user/userInfo", async () => {
  const response = await tokenApi.get("api/basic-profile");
  const { name, email, profile } = response.data;
  const userInfo = {
    name: name,
    email: email,
    profile: profile === null ? dog : profile,
  };
  return userInfo;
});

export const checkInvitationCode = createAsyncThunk(
  "user/checkCode",
  async (inviteCode, thunkAPI) => {
    try {
      await tokenApi.get(`api/check-room/${inviteCode}`);
    } catch (error) {
      return error;
    }
  }
);

export const setUserRole = createAsyncThunk(
  "user/userRole",
  async ({ selectRole, invitationCode }, thunkAPI) => {
    try {
      console.log(selectRole, invitationCode);
      await tokenApi
        .post(`api/room/${invitationCode}`, selectRole)
        .then((res) => {
          return res.data;
        });
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
