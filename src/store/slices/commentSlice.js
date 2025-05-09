import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosinstance";
import { baseUrl } from "../../cosntants";
const initialState = {
  loading: false,
  comment: [],
  totalComments: null,
  hasNextPage: false,
};
export const addComment = createAsyncThunk(
  "addComment",
  async ({ content, videoId }) => {
    try {
      const response = await axiosInstance.post(
        `/comment/add-comment/${videoId}`,
        { content }
      );
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const editComment = createAsyncThunk(
  "editComment",
  async ({ commentId, content }) => {
    try {
      const response = await axiosInstance.patch(
        `/comment/update-comment/${commentId}     `,
        { content }
      );
      toast.success("Comment updated sucessfully");
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const deleteComment = createAsyncThunk(
  "deleteComment",
  async (commentId) => {
    try {
      const response = await axiosInstance.delete(
        `/comment/delete-comment/${commentId}`
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const getVideoComment = createAsyncThunk(
  "getVideoComment",
  async ({ videoId, page, limit }) => {
    const url = new URL(`${baseUrl}/comment/${videoId}`);
    if (page) url.searchParams.set("page", page);
    if (limit) url.searchParams.set("limit", limit);

    try {
      const response = await axiosInstance.get(url);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    cleanUpComments: (state) => {
      state.comment = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVideoComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideoComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comment = [...state.comment, ...action.payload.docs];
      state.totalComments = action.payload.totalDocs;
      state.hasNextPage = action.payload.hasNextPage;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comment.unshift(action.payload);
      state.totalComments++;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comment = state.comment.filter(
        (comment) => comment._id !== action.payload.commentId
      );
      state.totalComments--;
    });
  },
});
export const { cleanUpComments } = commentSlice.actions;

export default commentSlice.reducer;
