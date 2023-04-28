import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../lib/customAPI";

const initialState = {
  loggedInfo: null,
  presignedUrl: '',
  error: false,
};

export const getLoggedInfo = createAsyncThunk("api/users", async () => {
  const res = await tokenApi.get("api/users")
  return res.data;
});

export const updateLoggedInfo = createAsyncThunk("api/users", async (updatedData, thunkAPI) => {
    await tokenApi.put(`api/users`, updatedData)
    .then((res) => console.log(res.data))
    .catch((err) => {
      throw err;
    });
});

export const changePasword = createAsyncThunk("api/users/password", async (pwData, thunkAPI) => {
    await tokenApi.put(`api/users/password`, pwData)
    .then((res) => console.log(res.data))
    .catch((err) => {
      if (err.response && err.response.status === 400) {
        return thunkAPI.rejectWithValue('비밀번호가 일치하지 않습니다.');
      }
    });
});

export const deleteProfileImage = createAsyncThunk("api/users/image", async () => {
  try {
    await tokenApi.delete(`api/users/image`);
    dispatchEvent(getLoggedInfo())
  } catch (err) {
    throw err;
  }
});

export const changeProfileImage = createAsyncThunk("api/users/image", async () => {
    await tokenApi.put(`api/users/image`)
    .then((res) => console.log(res.data))
    .catch((err) => {
      throw err;
    });
});

export const getPresignedUrl = createAsyncThunk("api/users/image", async () => {
  const res = await tokenApi.get("api/users/image/presigned-url")
  return res.data;
});

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedInfo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getLoggedInfo.fulfilled, (state, action) => {
        state.loggedInfo = action.payload;
      })
      .addCase(getPresignedUrl.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getPresignedUrl.fulfilled, (state, action) => {
        state.presignedUrl = action.payload;
      })
    }
});

export default loggedUserSlice.reducer;
