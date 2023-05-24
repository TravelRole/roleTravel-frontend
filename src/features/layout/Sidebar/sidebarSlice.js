import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tokenApi from "../../../lib/customAPI";

const initialState = {
  sidebarData: null,
};

export const editRoomInfo = createAsyncThunk(
  "sidebar/editRoom",
  async (data, thunkAPI) => {
    try {
      const { roomId, formData } = data;
      const res = await tokenApi.put(`api/room/${roomId}`, {
        roomName: formData.roomName,
        endDate: formData.endDate,
        startDate: formData.startDate,
        location: formData.location,
        userRoles: formData.roles,
      });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSidebarData = createAsyncThunk(
  "sidebar/getSidebarData",
  async (roomId, thunkAPI) => {
    try {
      const res = await tokenApi.get(`api/room/${roomId}/sidebar`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSidebarData.pending, (state) => {})
      .addCase(getSidebarData.fulfilled, (state, action) => {
        state.sidebarData = action.payload;
      })
      .addCase(getSidebarData.rejected, (state, action) => {});
  },
});

export default sidebarSlice.reducer;
