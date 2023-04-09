import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../lib/customAPI";

const initialState = {
  userId: null,
  isLoading: false,
  error: null,
};

export const searchUserId = createAsyncThunk("search/id", async (data) => {
  try {
    const { name, birth } = data;

    const res = await authApi.post("auth/find-id", { name, birth });
    const { email } = res.data;
    return email;
  } catch (error) {
    throw error;
  }
});

export const searchUserPw = createAsyncThunk("search/pw", async (data) => {
  try {
    const { email, name, birth } = data;

    await authApi.post("auth/new-password", { email, name, birth });
  } catch (error) {
    return error;
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchUserId.fulfilled, (state, action) => {
        state.userId = action.payload;
        state.isLoading = false;
        state.error = null;
        window.alert(`찾으시는 아이디는 ${action.payload} 입니다.`);
      })
      .addCase(searchUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(searchUserPw.fulfilled, (state, action) => {
        state.userId = action.payload;
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
