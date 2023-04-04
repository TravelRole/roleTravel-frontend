import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isSignLoading: false, // 회원가입 로딩 여부
  hasError: false, // 에러 여부
  errorMessage: "", // 에러 메세지가 있다면 에러 메세지 담을 곳
};

export const signUp = createAsyncThunk("auth/signup", async (userData) => {
  const response = await axios.post("auth/signup", userData);
  return response.data;
});

const signSlice = createSlice({
  name: "sign",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isSignLoading = true;
        state.hasError = false;
        state.errorMessage = "";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isSignLoading = false;
        state.hasError = false;
        state.errorMessage = "";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isSignLoading = false;
        state.hasError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export default signSlice.reducer;
