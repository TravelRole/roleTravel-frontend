import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../../lib/customAPI";

//날짜에 맞는 회계내역 조회
export const getAccountList = createAsyncThunk(
  "account/getAccountList",
  async (payload) => {
    try {
      const res = await tokenApi.get(
        `api/room/${payload.roomId}/accounting?date=${payload.date}&paymentMethod=${payload.feeMethod&&payload.feeMethod}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//회계지출 내역 추가
export const addAccountList = createAsyncThunk(
  "account/addAccountList",
  async (payload, thunkAPI) => {
    try {
      await tokenApi.post(`api/room/${payload.roomId}/accounting` , payload.accountData);
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
  isAccountLoading: false,
  accountList: [],
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAccountList.pending, (state) => {
        state.isAccountLoading = true;
      })
      .addCase(addAccountList.fulfilled, (state, action) => {
        state.isAccountLoading = false;
      })
      .addCase(addAccountList.rejected, (state, action) => {
        state.isAccountLoading = false;
      })
      .addCase(bookedReserveList.pending, (state) => {
        state.isAccountLoading = true;
      })
      .addCase(bookedReserveList.fulfilled, (state, action) => {
        state.isAccountLoading = false;
      })
      .addCase(bookedReserveList.rejected, (state, action) => {
        state.isAccountLoading = false;
      })
      .addCase(getAccountList.pending, (state) => {
        state.isAccountLoading = true;
      })
      .addCase(getAccountList.fulfilled, (state, action) => {
        state.isAccountLoading = false;
        state.accountList = action.payload;
      })
      .addCase(getAccountList.rejected, (state, action) => {
        state.isAccountLoading = false;
      });
  },
});

export default accountSlice.reducer;