import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenApi from "../../../lib/customAPI";

const initialState = {
  commentList: null,
  pageInfo: null,
  commentListLoading: false,
  commentListError: null,
};

export const getCommentList = createAsyncThunk(
  "comment/getCommentList",
  async (data, thunkAPI) => {
    try {
      const { roomId, page } = data;

      const res = await tokenApi.get(
        `api/room/${roomId}/comments?page=${page}`
      );
      const { contents, pageInfo } = res.data;
      return { contents, pageInfo };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addParentComment = createAsyncThunk(
  "comment/addParentComment",
  async (data, thunkAPI) => {
    try {
      const { roomId, content } = data;

      const res = await tokenApi.post(`api/room/${roomId}/comments`, {
        content,
      });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addChildComment = createAsyncThunk(
  "comment/addChildComment",
  async (data, thunkAPI) => {
    try {
      const { roomId, parentId, content } = data;

      const res = await tokenApi.post(
        `api/room/${roomId}/comments/${parentId}`,
        {
          content,
        }
      );
      console.log(res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (data, thunkAPI) => {
    try {
      const { roomId, commentId } = data;

      const res = await tokenApi.delete(
        `api/room/${roomId}/comments/${commentId}`
      );
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editComment = createAsyncThunk(
  "comment/editComment",
  async (data, thunkAPI) => {
    try {
      const { roomId, commentId, content } = data;

      const res = await tokenApi.put(
        `api/room/${roomId}/comments/${commentId}`,
        { content }
      );
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addParentComment.pending, (state) => {
        state.commentListLoading = true;
      })
      .addCase(addParentComment.fulfilled, (state, action) => {
        state.commentListLoading = false;
      })
      .addCase(addParentComment.rejected, (state, action) => {
        state.commentListError = action.payload;
      })
      .addCase(getCommentList.pending, (state) => {
        state.commentListLoading = true;
      })
      .addCase(getCommentList.fulfilled, (state, action) => {
        state.commentListLoading = false;
        state.commentList = action.payload.contents;
        state.pageInfo = action.payload.pageInfo;
      })
      .addCase(getCommentList.rejected, (state, action) => {
        state.commentListError = action.payload;
      })
      .addCase(addChildComment.pending, (state) => {
        state.commentListLoading = true;
      })
      .addCase(addChildComment.fulfilled, (state, action) => {
        state.commentListLoading = false;
      })
      .addCase(addChildComment.rejected, (state, action) => {
        state.commentListError = action.payload;
      });
  },
});

export default commentSlice.reducer;
