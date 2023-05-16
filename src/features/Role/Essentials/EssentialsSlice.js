import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from '../../../lib/customAPI'

const initialState = {
  essentials: {},
  checked: null,
  isLoading: false,
  error: null,
};

export const getEssentials = createAsyncThunk("api/room/room_id/essentials", async (id) => {
  const res = await tokenApi.get(`api/room/${id}/essentials`)
  return res.data;
});

export const createEssentials = createAsyncThunk("api/room/room_id/essentials", async (createItemData, thunkAPI) => {
    await tokenApi.post(`api/room/${createItemData[0]}/essentials`, createItemData[1])
    .then((res) => console.log('준비물을 생성하였습니다.'))
    .catch((err) => {
      if (err.response && err.response.status === 400) {
        return thunkAPI.rejectWithValue('카테고리명이 올바른 형식이 아니거나 존재하지 않는 방입니다.');
      }
      return thunkAPI.rejectWithValue(err)
    });
});

export const deleteEssentials = createAsyncThunk("api/room/room_id/essentials", async (deleteData, thunkAPI) => {
  await tokenApi.delete(`api/room/${deleteData[0]}/essentials`, deleteData[1])
    .then((res) => console.log('Deleted!'))
    .catch((err) => {
      if (err.response && err.response.status === 400) {
        return thunkAPI.rejectWithValue('존재하지 않는 방이거나 참여하지 않은 방 입니다.');
      }
      return thunkAPI.rejectWithValue(err)
    })
});

export const patchChecks = createAsyncThunk("api/room/room_id/essentials/check", async (checkData, thunkAPI) => {
    await tokenApi.post(`api/room/${checkData[0]}/essentials/check`, checkData[1])
    .then((res) => console.log('Created!', checkData[1]))
    .catch((err) => {
      if (err.response && err.response.status === 400) {
        return thunkAPI.rejectWithValue('존재하지 않는 방이거나 참여하지 않은 방 입니다.');
      }
      return thunkAPI.rejectWithValue(err)
    });
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
      .addCase(patchChecks.rejected, (state, action) => {
        state.error = action.payload;
      })
    }
});

export default essentialsSlice.reducer;
