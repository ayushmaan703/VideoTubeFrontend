import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosinstance";
const initialState = {
  loading: false,
  likedVideos: [],
};
export const videoLikeToggle = createAsyncThunk(
  "videoLikeToggle",
  async (videoId) => {
    try {
      const response = await axiosInstance.post(`/likes/toggle/v/${videoId}`);
      toast.success("Video liked succesfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const commentLikeToggle = createAsyncThunk(
  "videoLikeToggle",
  async (commentId) => {
    try {
      const response = await axiosInstance.post(`/likes/toggle/c/${commentId}`);
      toast.success("Comment liked succesfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const tweetLikeToggle = createAsyncThunk(
  "videoLikeToggle",
  async (tweetId) => {
    try {
      const response = await axiosInstance.post(`/likes/toggle/t/${tweetId}`);
      toast.success("Tweet liked succesfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const getLikedVideos = createAsyncThunk("getLikedVideos", async () => {
  try {
    const response = await axiosInstance.get("/likes/videos");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});
const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLikedVideos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLikedVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.likedVideos = action.payload;
    });
  },
});
export default likeSlice.reducer;
