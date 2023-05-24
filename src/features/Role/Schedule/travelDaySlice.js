import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../../lib/customAPI";

//여행 날짜 불러오기
export const getTravelDay = createAsyncThunk(
  "travelDay/getTravelDay",
  async (roomId, date) => {
    try {
      const res = await tokenApi.get(
        `api/room/day?roomId=${roomId}`
      );
      return res.data;
    } catch (error) {
      console.log("서버에러입니다");
    }
  }
);

const initialState = {
  istravelDayLoading: false,
  travelDayList: [],
};

const travelDaySlice = createSlice({
  name: "travelDay",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTravelDay.pending, (state) => {
        state.istravelDayLoading = true;
      })
      .addCase(getTravelDay.fulfilled, (state, action) => {
        state.isWantPlaceLoading = false;
        state.travelDayList = action.payload;
      })
      .addCase(getTravelDay.rejected, (state, action) => {
        state.istravelDayLoading = false;
      });
  },
});

export default travelDaySlice.reducer;
