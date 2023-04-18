import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../lib/customAPI";
import dog from "../../assets/images/dog.jpeg";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const getUserInfo = createAsyncThunk("auth/userInfo", async () => {
  const response = await tokenApi.get("api/basic-profile");
  const { name, email, profile } = response.data;
  const userInfo = {
    name: name,
    email: email,
    profile: profile === null ? dog : profile,
  };
  return userInfo;
});

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
