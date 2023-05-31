import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../lib/customAPI";
import { toast } from "react-toastify";
import dog from "../../assets/images/dog.jpeg";

const initialState = {
  changePassword: null,
  loggedInfo: null,
  presignedUrl: null,
  error: false,
};

export const getLoggedInfo = createAsyncThunk("api/users", async () => {
  const res = await tokenApi.get("api/users");
  const { name, email, profile, birth, userId } = res?.data;
  const loggedInfo = {
    userId: userId,
    name: name,
    email: email,
    birth: birth,
    profile: profile === null ? dog : profile,
  };
  console.log('Profile', profile)
  return loggedInfo;
});

export const updatedInfo = createAsyncThunk("api/users", async (updatedData, thunkAPI) => {
    await tokenApi.put(`api/users`, updatedData)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      if (err.response && err.response.status === 400) {
        return thunkAPI.rejectWithValue('이름 또는 생년월일의 형식이 올바르지 않습니다.');
      }
    });
});

export const changePassword = createAsyncThunk("api/users/password", async (pwData, thunkAPI) => {
    await tokenApi.put(`api/users/password`, pwData)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      if (err.response && err.response.status === 400) {
        return thunkAPI.rejectWithValue('비밀번호가 일치하지 않습니다.');
      }
    });
});

export const changeProfileImage = createAsyncThunk("api/users/image", async (imageData, thunkAPI) => {
    await tokenApi.put(`api/users/image`, imageData)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err;
    });
});

export const deleteProfileImage = createAsyncThunk("api/users/image", async () => {
  await tokenApi.delete('api/users/image')
    .then((res) => 'Deleted!')
    .catch((err) => {
      throw err;
    })
});

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedInfo.fulfilled, (state, action) => {
        state.loggedInfo = action.payload;
      })
      .addCase(getLoggedInfo.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.changePassword = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.payload;
      })
    }
});

export default loggedUserSlice.reducer;
