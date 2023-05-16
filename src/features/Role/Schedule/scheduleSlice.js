import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../../lib/customAPI";

//날짜에 맞는 일정 가져오기
export const getSchedule = createAsyncThunk(
  "schedule/getSchedule",
  async (roomId, date) => {
    try {
      const res = await tokenApi.get(
        `api/room/${roomId}/schedule?date=${date}`
      );
      return res.data;
    } catch (error) {
      console.log("서버에러입니다");
    }
  }
);

//일정 추가하기
export const addSchedule = createAsyncThunk(
  "schedule/addSchedule",
  async (roomId, scheduleData, thunkAPI) => {
    try {
      await tokenApi.post(`api/room/${roomId}/board`, scheduleData);
    } catch (error) {
      console.log(error);
    }
  }
);

//일정 삭제하기
export const delSchedule = createAsyncThunk(
  "schedule/delSchedule",
  async (roomId, id, thunkAPI) => {
    try {
      await tokenApi.delete(`api/room/${roomId}/schedule?ids=${id}`);
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  isScheduleLoading: false,
  scheduleList: [],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSchedule.pending, (state) => {
        state.isScheduleLoading = true;
      })
      .addCase(addSchedule.fulfilled, (state, action) => {
        state.isScheduleLoading = false;
      })
      .addCase(addSchedule.rejected, (state, action) => {
        state.isScheduleLoading = false;
      })
      .addCase(delSchedule.pending, (state) => {
        state.isScheduleLoading = true;
      })
      .addCase(delSchedule.fulfilled, (state, action) => {
        state.isScheduleLoading = false;
      })
      .addCase(delSchedule.rejected, (state, action) => {
        state.isScheduleLoading = false;
      })
      .addCase(getSchedule.pending, (state) => {
        state.isScheduleLoading = true;
      })
      .addCase(getSchedule.fulfilled, (state, action) => {
        state.isWantPlaceLoading = false;
        state.isScheduleLoading = action.payload;
      })
      .addCase(getSchedule.rejected, (state, action) => {
        state.isScheduleLoading = false;
      });
  },
});

export default scheduleSlice.reducer;
