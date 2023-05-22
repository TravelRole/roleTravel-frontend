import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../../lib/customAPI";

//날짜에 맞는 예약리스트 가져오기
export const getReserveList = createAsyncThunk(
  "reservation/getReserveList",
  async (payload) => {
    try {
      const res = await tokenApi.get(
        `api/room/${payload.roomId}/board/book/?date=${payload.date}`
      );
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
      console.log(payload)
      await tokenApi.patch(`api/room/${payload.roomId}/board/book` , payload.requestEditInfo );
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
  isReservationLoading: false,
  reservationList: [],
};

const reservationSlice = createSlice({
  name: "schedule",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editReserveInfo.pending, (state) => {
        state.isReservationLoading = true;
      })
      .addCase(editReserveInfo.fulfilled, (state, action) => {
        state.isReservationLoading = false;
      })
      .addCase(editReserveInfo.rejected, (state, action) => {
        state.isReservationLoading = false;
      })
      .addCase(bookedReserveList.pending, (state) => {
        state.isReservationLoading = true;
      })
      .addCase(bookedReserveList.fulfilled, (state, action) => {
        state.isReservationLoading = false;
      })
      .addCase(bookedReserveList.rejected, (state, action) => {
        state.isReservationLoading = false;
      })
      .addCase(getReserveList.pending, (state) => {
        state.isReservationLoading = true;
      })
      .addCase(getReserveList.fulfilled, (state, action) => {
        state.isWantPlaceLoading = false;
        state.reservationList = action.payload;
      })
      .addCase(getReserveList.rejected, (state, action) => {
        state.isReservationLoading = false;
      });
  },
});

export default reservationSlice.reducer;
