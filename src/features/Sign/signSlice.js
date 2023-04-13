import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../lib/customAPI";
import { toast } from "react-toastify";

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
      await authApi.post("auth/signup", userData);
      return thunkAPI.fulfillWithValue(true);
      // if (response.status === 200) {
      //   const loginResponse = await authApi.post(
      //     "auth/login",
      //     { email: email, password: password },
      //     {
      //       withCredentials: true,
      //     }
      //   );
      //   const { accessToken } = loginResponse.data;
      //   localStorage.setItem("accessToken", accessToken);

      // }
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isSignLoading = true;
        state.hasError = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isSignLoading = false;
        state.hasError = false;
        state.signUpSuccess = action.payload;
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

export default signSlice.reducer;
