import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../../lib/customAPI";

const initialState = {
  essentials: {},
  check: null,
  isLoading: false,
  error: null,
};

export const getEssentials = createAsyncThunk(
  "api/room/room_id/essentials",
  async (id) => {
    const res = await tokenApi.get(`api/room/${id}/essentials`);
    const arr = {
      "필수 준비물": [],
      "의류": [],
      "세면 용품": [],
      "상비약": [],
      "계절 용품": [],
      "조리 용품": [],
      "기타 용품": [],
    };
    Object.keys(res.data).map((el) => {
      switch (el) {
        case "ESSENTIAL":
          return (arr["필수 준비물"] = res.data[el]);
        case "CLOTHES":
          return (arr["의류"] = res.data[el]);
        case "TOILETRIES":
          return (arr["세면 용품"] = res.data[el]);
        case "MEDICINE":
          return (arr["상비약"] = res.data[el]);
        case "SEASONAL":
          return (arr["계절 용품"] = res.data[el]);
        case "COOKWARE":
          return (arr["조리 용품"] = res.data[el]);
        case "ETC":
          return (arr["기타 용품"] = res.data[el]);
        default:
          return "";
      }
    });
    return arr;
  }
);

export const createEssentials = createAsyncThunk(
  "api/room/room_id/essentials",
  async (createItemData, thunkAPI) => {
    await tokenApi.post(
      `api/room/${createItemData[0]}/essentials`,
      createItemData[1]
    );
    try {
      console.log("생성되었습니다.");
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 400) {
        return thunkAPI.rejectWithValue(
          "카테고리명이 올바른 형식이 아니거나 존재하지 않는 방입니다."
        );
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteEssentials = createAsyncThunk(
  "api/room/room_id/essentials",
  async (deleteData) => {
    await tokenApi.delete(`api/room/${deleteData[0]}/essentials`, {
      data: { ...deleteData[1] },
    });
    try {
      console.log("삭제되었습니다.");
    } catch (err) {
      console.log(err);
    }
  }
);

export const patchChecks = createAsyncThunk(
  "api/room/room_id/essentials/check",
  async (checkData) => {
    await tokenApi.patch(
      `api/room/${checkData[0]}/essentials/check`,
      checkData[1]
    );
    try {
      console.log("체크되었습니다.");
    } catch (err) {
      console.log(err);
    }
  }
);

const essentialsSlice = createSlice({
  name: "essentialsList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEssentials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.essentials = action.payload;
      })
      .addCase(getEssentials.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getEssentials.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(patchChecks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.check = action.payload;
      })
      .addCase(patchChecks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default essentialsSlice.reducer;
