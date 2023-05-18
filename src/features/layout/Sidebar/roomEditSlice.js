import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tokenApi from "../../../lib/customAPI";

const initialState = {
  invitationCode: null,
};

export const editRoomInfo = createAsyncThunk(
  "roomEdit/edit",
  async (data, thunkAPI) => {
    try {
      const { roomId, formData } = data;
      await tokenApi.put(`api/room/${roomId}`, {
        roomName: formData.roomName,
        endDate: formData.endDate,
        startDate: formData.startDate,
        location: formData.location,
        roles: formData.roles,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const roomEditSlice = createSlice({
  name: "roomEdit",
  initialState: initialState,
  reducers: {},
});

export default roomEditSlice.reducer;
