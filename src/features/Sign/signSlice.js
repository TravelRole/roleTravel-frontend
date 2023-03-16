import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  // 아래의 값들은 임시적으로 사용하기 위해 저장할 State
  formData: {
    name: "",
    y: "",
    m: "",
    d: "",
    id: "",
    pw: "",
    email: "",
    phoneNumber: "",
    authNumber: "",
    createDt: "",
    updateDt: "",
  },
  // 이용동의와, 개인 정보 유효기간 선택에 대해서 데이터를 어떻게 할 것인지 잘 모르겠음.

  // 비동기적으로 바뀔 값들 (아직 추가 안함)
  //   isJoined: false,
  //   isJoining: false,
  //   joinUser: null,
  //   joinRejectReason: ""
};

// 아래는 API 주소가 있을 때 회원가입 비동기 액션
// joinUser에 데이터를 다 넣을 것

export const join = createAsyncThunk("user/join", async (data, thunkAPI) => {
  const result = await axios.post("회원가입 API 주소", {
    formData: data.formData,
  });
  return result;
});

export const signSlice = createSlice({
  name: "sign",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.formData.name = action.payload;
    },
    setUserY: (state, action) => {
      state.formData.y = action.payload;
    },
    setUserM: (state, action) => {
      state.formData.m = action.payload;
    },
    setUserD: (state, action) => {
      state.formData.d = action.payload;
    },
    setUserId: (state, action) => {
      state.formData.id = action.payload;
    },
    setUserPw: (state, action) => {
      state.formData.pw = action.payload;
    },
    setUserEmail: (state, action) => {
      state.formData.email = action.payload;
    },
    setUserPhoneNumber: (state, action) => {
      state.formData.phoneNumber = action.payload;
    },
    setUserAuthNumber: (state, action) => {
      state.formData.authNumber = action.payload;
    },
  },
  // 아래는 API가 만들어졌을 떄, 비동기적인 동작들
  // extraReducers: (builder) => {
  //     builder.addCase(join.pending, (state, action) => {
  //         state.isJoining = true;
  //     })
  //     .addCase(join.fulfilled, (state, action) => {
  //         state.isJoined = true;
  //         state.isJoining = false;
  //         state.joinUser = action.payload.config.data;
  //         state.joinRejectReason = "";
  //       })
  //       .addCase(join.rejected, (state, action) => {
  //         state.isJoining = false;
  //         state.joinRejectReason = action.error;
  //       });
  // }
});

export const {
  setUserName,
  setUserY,
  setUserD,
  setUserM,
  setUserId,
  setUserPw,
  setUserEmail,
  setUserPhoneNumber,
  setUserAuthNumber,
} = signSlice.actions;

export default signSlice.reducer;
