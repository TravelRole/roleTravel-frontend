import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../../lib/customAPI";

//날짜에 맞는 회계내역 조회
export const getAllAmount = createAsyncThunk(
  "amount/getAllAmount",
  async (roomId) => {
    try {
      const res = await tokenApi.get(`/api/room/${roomId}/expenses`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//예약정보 수정
export const editReserveInfo = createAsyncThunk(
  "reservation/editReserveInfo",
  async (payload, thunkAPI) => {
    try {
      await tokenApi.patch(
        `api/room/${payload.roomId}/board/book`,
        payload.requestEditInfo
      );
    } catch (error) {
      console.log(error);
    }
  }
);

//예약 완료로 패치
export const bookedReserveList = createAsyncThunk(
  "reservation/delSchedule",
  async (payload, thunkAPI) => {
    try {
      await tokenApi.patch(
        `api/room/${payload.roomId}/board/booked`,
        payload.bookInfo
      );
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  isAmountLoading: false,
  amountTotal: 0,
};

const amountSlice = createSlice({
  name: "amount",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editReserveInfo.pending, (state) => {
        state.isAmountLoading = true;
      })
      .addCase(editReserveInfo.fulfilled, (state, action) => {
        state.isAmountLoading = false;
      })
      .addCase(editReserveInfo.rejected, (state, action) => {
        state.isAmountLoading = false;
      })
      .addCase(bookedReserveList.pending, (state) => {
        state.isAmountLoading = true;
      })
      .addCase(bookedReserveList.fulfilled, (state, action) => {
        state.isAmountLoading = false;
      })
      .addCase(bookedReserveList.rejected, (state, action) => {
        state.isAmountLoading = false;
      })
      .addCase(getAllAmount.pending, (state) => {
        state.isAmountLoading = true;
      })
      .addCase(getAllAmount.fulfilled, (state, action) => {
        state.isAmountLoading = false;
        state.amountTotal = action.payload;
      })
      .addCase(getAllAmount.rejected, (state, action) => {
        state.isAmountLoading = false;
      });
  },
});

export default amountSlice.reducer;
