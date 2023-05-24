import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tokenApi from "../../../../lib/customAPI";
import { toast } from "react-toastify";

const initialState = {
  invitationLink: null,
};

export const getInvitationCode = createAsyncThunk(
  "invitationCode/get",
  async (roomId, thunkAPI) => {
    try {
      const domain = window.location.href.split("/").slice(0, 3).join("/");
      const res = await tokenApi.get(`api/room/invite-code/${roomId}`);
      const invitationLink = `${domain}/invitation/${res.data}`;
      return invitationLink;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const invitationCodeSlice = createSlice({
  name: "invitationCode",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInvitationCode.pending, (state) => {})
      .addCase(getInvitationCode.fulfilled, (state, action) => {
        state.invitationLink = action.payload;
      })
      .addCase(getInvitationCode.rejected, (state, action) => {});
  },
});

export default invitationCodeSlice.reducer;
