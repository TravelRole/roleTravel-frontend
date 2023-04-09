import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import tokenApi, { authApi } from "../../lib/customAPI";
import { toast } from "react-toastify";

const initialState = {
  isAuth: localStorage.getItem("accessToken") ? true : false,
  isLoading: false,
  error: null,
};

//로그인
export const login = createAsyncThunk("auth/login", async (userData) => {
  const res = await authApi.post("auth/login", userData, {
    withCredentials: true,
  });

  const { accessToken } = res.data;

  // 로컬스토리지에 accessToken 저장
  localStorage.setItem("accessToken", accessToken);
});

//로그아웃
export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  try {
    await tokenApi.post(`auth/logout`);
    localStorage.removeItem("accessToken");
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        toast.success("로그인이 되었습니다!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        window.location.replace("/login");
      });
  },
});

export default authSlice.reducer;
