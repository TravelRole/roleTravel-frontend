import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tokenApi from "../../lib/customAPI";

const initialState = {
  isTravelLoading: false,
  currentTravelingList: [],
  currentEndTravelList: [],
  error: null,
};

export const addTravel = createAsyncThunk(
  "travel/add",
  async (travelData, thunkAPI) => {
    try {
      await tokenApi.post("api/room", travelData);
      // 이때 보내고 전송 받는 데이터는 모든 방 데이터가 되어야할 것 같음.
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("여행을 생성하지 못했습니다.");
      }
      return thunkAPI.rejectWithValue("네트워크가 불안정합니다.");
    }
  }
);

export const getTravelList = createAsyncThunk("travel/get", async () => {
  try {
    const res = await tokenApi.get("api/room");
    console.log(res);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간 정보를 0으로 설정
    // 여행이 완료된 것을 필터링 해주는 쪽
    const endTravelList = res?.data?.filter((list) => {
      const formatEndDate = new Date(list.endDate);
      formatEndDate.setHours(0, 0, 0, 0); // 시간 정보를 0으로 설정
      return formatEndDate < today;
    });

    // 여행 진행중인 (당일 포함) 리스트를 알아내는 쪽
    const travelingList = res?.data?.filter((list) => {
      const formatEndDate = new Date(list.endDate);
      formatEndDate.setHours(0, 0, 0, 0); // 시간 정보를 0으로 설정
      return formatEndDate >= today;
    });
    return { endTravelList, travelingList };
  } catch (error) {
    console.log(error);
    return error;
  }
});

const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTravel.pending, (state) => {
        state.isTravelLoading = true;
      })
      .addCase(addTravel.fulfilled, (state, action) => {
        state.isTravelLoading = false;
      })
      .addCase(addTravel.rejected, (state, action) => {
        state.isTravelLoading = false;
      })
      .addCase(getTravelList.pending, (state) => {
        state.isTravelLoading = true;
      })
      .addCase(getTravelList.fulfilled, (state, action) => {
        state.isTravelLoading = false;
        state.currentEndTravelList = action.payload.endTravelList;
        state.currentTravelingList = action.payload.travelingList;
      })
      .addCase(getTravelList.rejected, (state, action) => {
        state.isTravelLoading = false;
        state.error = action.payload;
      });
  },
});

export default travelSlice.reducer;
