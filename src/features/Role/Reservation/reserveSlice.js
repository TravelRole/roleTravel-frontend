import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../../lib/customAPI";

//날짜에 맞는 예약리스트 가져오기
export const getReserveList = createAsyncThunk(
  "reservation/getReserveList",
  async (roomId, date) => {
    try {
      const res = await tokenApi.get(
        `api/room/${roomId}/board/book/?date=${date}`
      );
      return res.data;
    } catch (error) {
      console.log("서버에러입니다");
    }
  }
);

//예약정보 수정
export const addReserveList = createAsyncThunk(
  "reservation/addReserveList",
  async (roomId, thunkAPI) => {
    try {
      await tokenApi.patch(`api/room/${roomId}/board/book`);
    } catch (error) {
      console.log(error);
    }
  }
);

//예약 완료
export const bookedReserveList = createAsyncThunk(
  "reservation/delSchedule",
  async (roomId, thunkAPI) => {
    try {
      await tokenApi.delete(`api/room/${roomId}/board/booked`);
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
      .addCase(addReserveList.pending, (state) => {
        state.isReservationLoading = true;
      })
      .addCase(addReserveList.fulfilled, (state, action) => {
        state.isReservationLoading = false;
      })
      .addCase(addReserveList.rejected, (state, action) => {
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
