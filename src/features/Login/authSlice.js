import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import tokenApi, { authApi } from "../../lib/customAPI";
import { toast } from "react-toastify";

const initialState = {
  isAuth: localStorage.getItem("accessToken") ? true : false,
};

//로그인
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const res = await authApi.post("api/login", userData, {
        withCredentials: true,
      });

      const { accessToken } = res.data;

      // 로컬스토리지에 accessToken 저장
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return thunkAPI.rejectWithValue(
          <p>
            회원정보를 잘못 입력했습니다
            <br />
            입력하신 내용을 다시 확인해주세요.
          </p>
        );
      }
      return thunkAPI.rejectWithValue("네트워크가 불안정합니다.");
    }
  }
);

//로그아웃
export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  try {
    await tokenApi.post(`api/logout`);
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
        state.isAuth = false;
      })
      .addCase(login.fulfilled, (state, action) => {
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
        toast.error(action.payload, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
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
