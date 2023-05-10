import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../../lib/customAPI";

const initialState = {
  allPlanList: null,
  allPlanListLoading: false,
  allPlanListError: null,
};

export const getAllPlanList = createAsyncThunk(
  "allPlan/getAllPlanList",
  async (inviteCode, thunkAPI) => {
    try {
      const res = await tokenApi.get(`api/check-room/${inviteCode}`);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const allPlanSlice = createSlice({
  name: "allPlan",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlanList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPlanList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getAllPlanList.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default allPlanSlice.reducer;
