import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../lib/customAPI";

const initialState = {
  userInfo: null,
  isAuth: false,
  isLoading: false,
  error: null,
};

export const getLoggedInfo = createAsyncThunk("api/users", async () => {
  await tokenApi.get("api/users")
  .then((res) => console.log('Success', res.data))
  .catch((err) => {throw err});
  // error.respone.status == 400 {
    //rejectWithValue~~
  // }
});

export const updateLoggedInfo = createAsyncThunk("api/users", async () => {
    await tokenApi.put(`api/users`)
    .then((res) => console.log('Success', res.data))
    .catch((err) => {throw err});
});

export const changePasword = createAsyncThunk("api/users/password", async () => {
    await tokenApi.put(`api/users/password`)
    .then((res) => console.log('Success', res.data))
    .catch((err) => {throw err});
});

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState: initialState,
  reducers: {},
});

export default loggedUserSlice.reducer;
