import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tokenApi from "../../lib/customAPI";

const initialState = {
  isTravelLoading: false,
  currentTravelList: [],
};

export const addTravel = createAsyncThunk(
  "travel/add",
  async (travelData, thunkAPI) => {
    try {
      await tokenApi.post("api/room", travelData);
      // 이때 보내고 전송 받는 데이터는 모든 방 데이터가 되어야할 것 같음.
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("여행을 생성하지 못했습니다.");
      }
      return thunkAPI.rejectWithValue("네트워크가 불안정합니다.");
    }
  }
);

export const getTravelList = createAsyncThunk(
  "travel/get",
  async (data, thunkAPI) => {
    try {
      const res = await tokenApi.get("api/room");
      return res.data;
      // 이때 보내고 전송 받는 데이터는 모든 방 데이터가 되어야할 것 같음.
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("여행을 불러오지 못했습니다.");
      }
      return thunkAPI.rejectWithValue("네트워크가 불안정합니다.");
    }
  }
);

const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTravel.pending, (state) => {
        state.isTravelLoading = true;
      })
      .addCase(addTravel.fulfilled, (state, action) => {
        state.isTravelLoading = false;
      })
      .addCase(addTravel.rejected, (state, action) => {
        state.isTravelLoading = false;
      })
      .addCase(getTravelList.pending, (state) => {
        state.isTravelLoading = true;
      })
      .addCase(getTravelList.fulfilled, (state, action) => {
        state.isTravelLoading = false;
        state.currentTravelList = action.payload;
      })
      .addCase(getTravelList.rejected, (state, action) => {
        state.isTravelLoading = false;
      });
  },
});

export default travelSlice.reducer;