import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from '../../../lib/customAPI'

const initialState = {
  essentials: {},
  check: null,
  isLoading: false,
  error: null,
};

export const getEssentials = createAsyncThunk("api/room/room_id/essentials", async (id) => {
  const res = await tokenApi.get(`api/room/${id}/essentials`)
  return res.data;
});

export const createEssentials = createAsyncThunk("api/room/room_id/essentials", async (createItemData, thunkAPI) => {
  await tokenApi.post(`api/room/${createItemData[0]}/essentials`, createItemData[1])
  try {
    dispatchEvent(getEssentials(createItemData[0]))
  } catch (err) {
    console.log(err)
    if (err.response && err.response.status === 400) {
      return thunkAPI.rejectWithValue('카테고리명이 올바른 형식이 아니거나 존재하지 않는 방입니다.');
    }
    return thunkAPI.rejectWithValue(err)
  }
});

export const deleteEssentials = createAsyncThunk("api/room/room_id/essentials", async (deleteData) => {
  await tokenApi.delete(`api/room/${deleteData[0]}/essentials`, { data: {...deleteData[1]}})
  try {
    dispatchEvent(getEssentials(deleteData[0]))
  } catch (err) {
    console.log(err)
  }
});

export const patchChecks = createAsyncThunk("api/room/room_id/essentials/check", async (checkData) => {
  await tokenApi.patch(`api/room/${checkData[0]}/essentials/check`, checkData[1]);
  try {
    dispatchEvent(getEssentials(checkData[0]))
  } catch (err) {
    console.log(err)  
  }
});

const essentialsSlice = createSlice({
  name: "essentialsList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEssentials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.essentials = action.payload;
      })
      .addCase(getEssentials.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getEssentials.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(patchChecks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.check = action.payload;
      })
      .addCase(patchChecks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(patchChecks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
    }
});

export default essentialsSlice.reducer;
