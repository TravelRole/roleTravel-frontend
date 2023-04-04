import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../lib/customAPI";

const initialState = {
  userInfo: null,
  isAuth: false,
  isLoading: false,
  error: null,
};

export const getUserInfo = createAsyncThunk("user/info", async () => {
  try {
    await tokenApi.get("info").then((res) => {
      if (res.data) {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        return res.data;
      }
    });
    return JSON.parse(localStorage.getItem("userInfo"));
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLoading = false;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
