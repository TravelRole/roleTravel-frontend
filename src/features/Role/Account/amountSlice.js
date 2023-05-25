import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../../lib/customAPI";

//공동경비 조회
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

//공동경비 수정
export const editAllAmount = createAsyncThunk(
  "amount/editAllAmount",
  async (payload, thunkAPI) => {
    console.log(payload)
    try {
      await tokenApi.put(`/api/room/${payload.roomId}/expenses` ,{expenses : payload.shareAmount});
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
      .addCase(editAllAmount.pending, (state) => {
        state.isAmountLoading = true;
      })
      .addCase(editAllAmount.fulfilled, (state, action) => {
        state.isAmountLoading = false;
      })
      .addCase(editAllAmount.rejected, (state, action) => {
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
