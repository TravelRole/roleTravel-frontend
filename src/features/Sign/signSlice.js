import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isLoading: false,
  hasError: false,
  errorMessage: "",
};

export const signUp = createAsyncThunk("auth/signup", async (userData) => {
  const response = await axios.post("/signup", userData);
  return response.data;
});

const signSlice = createSlice({
  name: "sign",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.hasError = true;
      state.errorMessage = action.payload;
    },
    resetError: (state) => {
      state.hasError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUser, setLoading, setError, resetError } = signSlice.actions;

export default signSlice.reducer;
