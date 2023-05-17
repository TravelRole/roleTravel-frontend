import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../../lib/customAPI";

const initialState = {
  allPlanList: null,
  allPlanListLoading: false,
  allPlanListError: null,
  roomData: null,
  roomDataLoading: false,
  roomDataError: null,
};

export const getAllPlanList = createAsyncThunk(
  "allPlan/getAllPlanList",
  async (roomId, thunkAPI) => {
    try {
      const res = await tokenApi.get(`api/room/${roomId}/all-plan`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getRoomData = createAsyncThunk(
  "allPlan/getRoomData",
  async (roomId, thunkAPI) => {
    try {
      console.log(roomId);
      const res = await tokenApi.get(`api/room/${roomId}`);
      return res.data;
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
        state.allPlanListLoading = true;
      })
      .addCase(getAllPlanList.fulfilled, (state, action) => {
        state.allPlanListLoading = false;
        state.allPlanList = action.payload;
      })
      .addCase(getAllPlanList.rejected, (state, action) => {
        state.allPlanListError = action.payload;
        state.allPlanListLoading = false;
      })
      .addCase(getRoomData.pending, (state) => {
        state.roomDataLoading = true;
      })
      .addCase(getRoomData.fulfilled, (state, action) => {
        state.roomDataLoading = false;
        state.roomData = action.payload;
      })
      .addCase(getRoomData.rejected, (state, action) => {
        state.roomDataError = action.payload;
        state.roomDataLoading = false;
      });
  },
});

export default allPlanSlice.reducer;
