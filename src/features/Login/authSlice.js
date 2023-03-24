import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const API_URL = "http://localhost:8000/api/auth";

const initialState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: null,
  accessToken: null,
};

//로그인
export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      const { accessToken, refreshToken, user } = response.data;

      cookies.set("refreshToken", refreshToken, { path: "/" });

      return { accessToken, user };
    } catch (error) {
      throw error.response.data;
    }
  }
);

//토큰 갱신
export const refreshTokenAsync = createAsyncThunk(
  "auth/refreshToken",
  async () => {
    try {
      const refreshToken = cookies.get("refreshToken");

      const response = await axios.post(`${API_URL}/refresh-token`, {
        refreshToken,
      });
      const { accessToken } = response.data;

      return accessToken;
    } catch (error) {
      throw error.response.data;
    }
  }
);

//로그아웃
export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  try {
    const refreshToken = cookies.get("refreshToken");

    // cookie에서 refreshToken 삭제

    cookies.remove("refreshToken", { path: "/" });

    await axios.post(`${API_URL}/logout`, { refreshToken });
  } catch (error) {
    throw error.response.data;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isAuth = false;
        state.accessToken = null;
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
      })
      .addCase(refreshTokenAsync.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        state.isLoading = false;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(refreshTokenAsync.rejected, (state, action) => {
        state.accessToken = null;
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const api = axios.create({
  baseURL: `api주소`,
});

api.interceptors.request.use(async (config) => {
  //쿠키에서 accessToken 가져오기
  const { accessToken, refreshToken } = cookies;
  config.headers.Authorization = `Bearer ${accessToken}`;

  try {
    const response = await axios.get("/api/auth/validate", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return config;
  } catch (error) {
    if (error.response.status === 401) {
      try {
        const response = await axios.post("/api/auth/refresh", {
          refreshToken,
        });
        const newAccessToken = response.data.accessToken;
        cookies.set("accessToken", newAccessToken);

        //이전 요청 재시도
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return config;
      } catch (error) {
        console.error("로그인이 필요합니다.");
        throw error;
      }
    } else {
      throw error;
    }
  }
});

export default authSlice.reducer;
