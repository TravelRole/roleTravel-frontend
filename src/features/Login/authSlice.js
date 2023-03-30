import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import tokenApi from "../../lib/customAPI";
import { getUserInfo } from "../Landing/userSlice";

const cookies = new Cookies();

const initialState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: null,
  accessToken: null,
};

//로그인
export const login = createAsyncThunk("auth/login", async (userData) => {
  await axios
    .post("auth/login", userData, { withCredentials: true })
    .then((res) => {
      const { accessToken } = res.data;

      // 로컬스토리지에 accessToken 저장
      localStorage.setItem("accessToken", accessToken);
      window.location.replace("/landing");
      return accessToken;
    });
});

export const testAsync = createAsyncThunk("auth/test", async () => {
  try {
    const response = await tokenApi.get("test");

    return response.data;
  } catch (error) {
    throw error;
  }
});

export const refreshTokenAsync = createAsyncThunk(
  "auth/refreshToken",
  async ({ accessToken }) => {
    try {
      const response = await axios.post(
        "auth/refresh",
        {
          accessToken: accessToken,
        },
        {
          withCredentials: true,
        }
      );

      const newAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);

      return newAccessToken;
    } catch (error) {
      throw error;
    }
  }
);

//로그아웃
export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  try {
    await tokenApi.get(`auth/logout`);
    localStorage.removeItem("userId");
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
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuth = false;
        state.accessToken = null;
        state.error = action.payload;
      })
      .addCase(refreshTokenAsync.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(refreshTokenAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.accessToken = null;
        state.user = null;
        state.isAuth = false;
        window.location.replace("/login");
      });
  },
});

export default authSlice.reducer;
