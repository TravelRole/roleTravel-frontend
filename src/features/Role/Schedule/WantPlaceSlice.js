import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../../lib/customAPI";

//팀원들이 찜해놓은 장소 가져오기
export const getWantPlace = createAsyncThunk(
  "wantplace/getWantPlace",
  async () => {
    try {
      const res = await tokenApi.get(`api/want-place`);
      return res;
    } catch (error) {
      console.log("서버에러입니다");
    }
  }
);

//찜 장소 추가하기
export const addWantPlace = createAsyncThunk(
  "wantplace/addWantPlace",
  async (placeData, thunkAPI) => {
    try {
      await tokenApi.post(`api/want-place`, placeData);
      dispatchEvent(getWantPlace());
    } catch (error) {
      console.log(error)
    }
  }
);

//찜 장소 삭제하기
export const delWantPlace = createAsyncThunk(
  "wantplace/delWantPlace",
  async (delpayload, thunkAPI) => {
    try {
      await tokenApi.delete(`api/want-place`, delpayload);
      dispatchEvent(getWantPlace());
    } catch (error) {
      console.log(error)
    }
  }
);

const initialState = {
  isWantPlaceLoading: false,
  wantPlaceList: [],
};

const wantPlaceSlice = createSlice({
  name: "wantplace",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWantPlace.pending, (state) => {
        state.isWantPlaceLoading = true;
      })
      .addCase(addWantPlace.fulfilled, (state, action) => {
        state.isWantPlaceLoading = false;
      })
      .addCase(addWantPlace.rejected, (state, action) => {
        state.isWantPlaceLoading = false;
      })
      .addCase(delWantPlace.pending, (state) => {
        state.isWantPlaceLoading = true;
      })
      .addCase(delWantPlace.fulfilled, (state, action) => {
        state.isWantPlaceLoading = false;
      })
      .addCase(delWantPlace.rejected, (state, action) => {
        state.isWantPlaceLoading = false;
      })
      .addCase(getWantPlace.pending, (state) => {
        state.isWantPlaceLoading = true;
      })
      .addCase(getWantPlace.fulfilled, (state, action) => {
        state.isWantPlaceLoading = false;
        state.wantPlaceList = action.payload.wantPlaceList;
      })
      .addCase(getWantPlace.rejected, (state, action) => {
        state.isWantPlaceLoading = false;
      });
  },
});

export default wantPlaceSlice.reducer;
