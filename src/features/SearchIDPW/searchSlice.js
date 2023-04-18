import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../lib/customAPI";

const initialState = {
  searchUserInfo: null,
  isLoading: false,
};

export const searchUserId = createAsyncThunk(
  "search/id",
  async (data, thunkAPI) => {
    try {
      const { name, birth } = data;

      const res = await authApi.post("auth/find-id", { name, birth });
      const { email, createdAt } = res.data;
      const userInfo = {
        email: email,
        createdAt: createdAt,
      };
      return userInfo;
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("네트워크가 불안정합니다.");
    }
  }
);

export const searchUserPw = createAsyncThunk(
  "search/pw",
  async (data, thunkAPI) => {
    try {
      const { email, name, birth } = data;

      await authApi.post("auth/new-password", { email, name, birth });
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("네트워크가 불안정합니다.");
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchUserId.fulfilled, (state, action) => {
        state.searchUserInfo = action.payload;
      })
      .addCase(searchUserId.rejected, (state, action) => {
        console.log(action.payload);
        window.alert(action.payload);
      })
      .addCase(searchUserPw.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        window.alert(`이메일로 임시 비밀번호를 전송했습니다.`);
      })
      .addCase(searchUserPw.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        window.alert(action.payload);
      });
  },
});

export default searchSlice.reducer;
