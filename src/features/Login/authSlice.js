import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import tokenApi from "../../lib/customAPI";
import dog from "../../assets/images/dog.jpeg";

const initialState = {
  user: null,
  isAuth: localStorage.getItem("accessToken") ? true : false,
  isLoading: false,
  error: null,
  accessToken: null,
};

//로그인
export const login = createAsyncThunk("auth/login", async (userData) => {
  const res = await axios.post("auth/login", userData, {
    withCredentials: true,
  });

  const { accessToken } = res.data;

  // 로컬스토리지에 accessToken 저장
  localStorage.setItem("accessToken", accessToken);

  return accessToken;
});

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
        },
        {
          XMLHttpRequest: true,
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
    await tokenApi.post(`auth/logout`);
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
        state.isAuth = false;
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
        state.isLoading = false;
      })
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
