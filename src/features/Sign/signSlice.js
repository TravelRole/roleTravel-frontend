import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../Login/authSlice";
import { authApi } from "../../lib/customAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
  signUpSuccess: false,
  isSignLoading: false, // 회원가입 로딩 여부
  hasError: false, // 에러 여부
  errorMessage: "", // 에러 메세지가 있다면 에러 메세지 담을 곳
};

export const signUp = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const { email, password } = userData;

      const response = await authApi.post("auth/signup", userData);

      if (response.status === 200) {
        const loginResponse = await authApi.post(
          "auth/login",
          { email: email, password: password },
          {
            withCredentials: true,
          }
        );
        const { accessToken } = loginResponse.data;
        localStorage.setItem("accessToken", accessToken);
        const navigate = useNavigate();
        navigate("/:userid");
        return { success: true };
      } else {
        return response.status;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("회원가입에 실패했습니다.");
      }
      return thunkAPI.rejectWithValue("네트워크가 불안정합니다.");
    }
  }
);

const signSlice = createSlice({
  name: "sign",
  initialState,
  reducers: {
    resetSignUpSuccess(state) {
      state.signUpSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isSignLoading = true;
        state.hasError = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isSignLoading = false;
        state.hasError = false;
        state.signUpSuccess = action.payload.success;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isSignLoading = false;
        state.hasError = true;
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
        // window.alert(action.payload);
      });
  },
});

export const { resetSignUpSuccess } = signSlice.actions;

export default signSlice.reducer;
