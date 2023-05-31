import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../../lib/customAPI";

//총 지출 금액 조회
export const getAllexpenses = createAsyncThunk(
  "expenses/getAllexpenses",
  async (roomId) => {
    try {
      const res = await tokenApi.get(`/api/room/${roomId}/accounting/total`);
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

const initialState = {
  isexpensesLoading: false,
  expensesTotal: 0,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllexpenses.pending, (state) => {
        state.isexpensesLoading = true;
      })
      .addCase(getAllexpenses.fulfilled, (state, action) => {
        state.isexpensesLoading = false;
        state.expensesTotal = action.payload;
      })
      .addCase(getAllexpenses.rejected, (state, action) => {
        state.isexpensesLoading = false;
      });
  },
});

export default expensesSlice.reducer;
