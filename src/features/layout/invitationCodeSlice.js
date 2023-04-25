import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tokenApi from "../../lib/customAPI";
import { toast } from "react-toastify";

const initialState = {
  invitationCode: null,
};

//로그아웃
export const getInvitationCode = createAsyncThunk(
  "invitationCode/get",
  async (roomId, thunkAPI) => {
    try {
      const domain = window.location.href.split("/").slice(0, 3).join("/");
      await tokenApi.get(`api/room/invite-code/${roomId}`).then((res) => {
        const invitationLink = `${domain}/${res.data}`;
        navigator.clipboard
          .writeText(invitationLink)
          .then(() => {
            toast.success("초대링크를 복사되었습니다.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          })
          .catch((error) => {
            toast.error("초대링크를 복사하는 과정에서 오류가 생겼습니다.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          });
      });
    } catch (error) {
      toast.error("초대링크를 복사하는 과정에서 오류가 생겼습니다.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
);

const invitationCodeSlice = createSlice({
  name: "invitationCode",
  initialState: initialState,
  reducers: {},
});

export default invitationCodeSlice.reducer;
