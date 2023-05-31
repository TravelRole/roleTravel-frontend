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

//회계지출 내역 수정
export const editAccountList = createAsyncThunk(
  "account/editAccountList",
  async (payload, thunkAPI) => {
    try {
      await tokenApi.put(`api/room/${payload.roomId}/accounting/${payload.accountingId}` , payload.editaccountData);
    } catch (error) {
      console.log(error);
    }
  }
);

//회계내역 삭제
export const delAccountList = createAsyncThunk(
  "account/delAccountList",
  async (payload, thunkAPI) => {
    try {
      await tokenApi.delete(
        `api/room/${payload.roomId}/accounting/${payload.accountingId}`
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
      .addCase(delAccountList.pending, (state) => {
        state.isAccountLoading = true;
      })
      .addCase(delAccountList.fulfilled, (state, action) => {
        state.isAccountLoading = false;
      })
      .addCase(delAccountList.rejected, (state, action) => {
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
