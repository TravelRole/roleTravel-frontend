import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../Login/authSlice";
import { authApi } from "../../lib/customAPI";

const initialState = {
  isSignLoading: false, // 회원가입 로딩 여부
  hasError: false, // 에러 여부
  errorMessage: "", // 에러 메세지가 있다면 에러 메세지 담을 곳
};

export const signUp = createAsyncThunk("auth/signup", async (userData) => {
  try {
    const { email, password } = userData;

    const response = await authApi.post("auth/signup", userData);
    window.alert("회원가입이 완료되었습니다!");
    if (response.status === 200) {
      const loginResponse = await authApi.post(
        "auth/login",
        { email: email, password: password },
        {
          withCredentials: true,
        }
      );
      const { accessToken } = loginResponse.data;

      // 로컬스토리지에 accessToken 저장
      localStorage.setItem("accessToken", accessToken);
    } else {
      throw new Error("로그인에 실패하였습니다.");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
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
        window.location.replace("/:userid");
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isSignLoading = false;
        state.hasError = true;
        state.errorMessage = action.error;
      });
  },
});

export default signSlice.reducer;
